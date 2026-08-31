import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { isAllowedRedirectUri, normalizeScopes, pruneExpired } from "@/lib/oauth/server";

/**
 * RFC 7591 dynamic client registration.
 *
 * MCP clients register themselves unattended -- there is no developer portal
 * for them to visit -- so this endpoint is deliberately open. What keeps that
 * safe is that a registration grants nothing: the client still cannot touch any
 * data until a signed-in human approves it on the consent screen. Registration
 * only reserves a client_id and pins the redirect URIs consent may return to.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, MCP-Protocol-Version",
};

const invalid = (description: string) =>
  NextResponse.json(
    { error: "invalid_client_metadata", error_description: description },
    { status: 400, headers: CORS }
  );

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return invalid("Body must be JSON.");
  }

  const redirectUris = Array.isArray(body.redirect_uris)
    ? body.redirect_uris.filter((uri): uri is string => typeof uri === "string")
    : [];

  if (redirectUris.length === 0) return invalid("redirect_uris is required.");
  if (redirectUris.length > 10) return invalid("Too many redirect_uris.");

  const rejected = redirectUris.find((uri) => !isAllowedRedirectUri(uri));
  if (rejected) {
    return invalid(`redirect_uri must be https (or http on localhost): ${rejected}`);
  }

  const grantTypes = Array.isArray(body.grant_types)
    ? body.grant_types.filter((grant): grant is string => typeof grant === "string")
    : ["authorization_code", "refresh_token"];

  const unsupported = grantTypes.find(
    (grant) => grant !== "authorization_code" && grant !== "refresh_token"
  );
  if (unsupported) return invalid(`Unsupported grant_type: ${unsupported}`);

  const name =
    typeof body.client_name === "string" && body.client_name.trim()
      ? body.client_name.trim().slice(0, 120)
      : "MCP client";

  const client = await prisma.oAuthClient.create({
    data: {
      clientId: `qc_${randomBytes(16).toString("base64url")}`,
      name,
      redirectUris,
      grantTypes,
      scopes: normalizeScopes(typeof body.scope === "string" ? body.scope : null),
      // Public client: PKCE stands in for a secret we would have no safe way to
      // hand a browser-based chat client anyway.
      tokenEndpointAuthMethod: "none",
      clientUri: typeof body.client_uri === "string" ? body.client_uri.slice(0, 500) : null,
      logoUri: typeof body.logo_uri === "string" ? body.logo_uri.slice(0, 500) : null,
    },
  });

  pruneExpired();

  return NextResponse.json(
    {
      client_id: client.clientId,
      client_id_issued_at: Math.floor(client.createdAt.getTime() / 1000),
      client_name: client.name,
      redirect_uris: client.redirectUris,
      grant_types: client.grantTypes,
      response_types: ["code"],
      token_endpoint_auth_method: "none",
      scope: client.scopes.join(" "),
    },
    { status: 201, headers: { ...CORS, "Cache-Control": "no-store" } }
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
