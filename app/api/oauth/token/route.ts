import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  hash,
  hashesEqual,
  issueTokens,
  originFrom,
  pruneExpired,
  resourceUrl,
  verifyPkce,
} from "@/lib/oauth/server";

/**
 * OAuth 2.1 token endpoint: authorization_code (with PKCE) and refresh_token.
 *
 * Clients post form-encoded bodies here; a few send JSON, so both are accepted.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, MCP-Protocol-Version",
};

const NO_STORE = { ...CORS, "Cache-Control": "no-store", Pragma: "no-cache" };

const fail = (error: string, description: string, status = 400) =>
  NextResponse.json({ error, error_description: description }, { status, headers: NO_STORE });

/** Accepts form-encoded (the spec) or JSON (what a few clients actually send). */
async function readParams(request: Request): Promise<Record<string, string>> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    return Object.fromEntries(
      Object.entries(body as Record<string, unknown>).map(([key, value]) => [key, String(value)])
    );
  }
  const form = await request.formData();
  return Object.fromEntries(Array.from(form.entries()).map(([key, value]) => [key, String(value)]));
}

export async function POST(request: Request) {
  let params: Record<string, string>;
  try {
    params = await readParams(request);
  } catch {
    return fail("invalid_request", "Could not parse the request body.");
  }

  // Public clients may also present client_id via HTTP Basic. Read it either way.
  const basic = request.headers.get("authorization")?.match(/^Basic\s+(.+)$/i)?.[1];
  const basicClientId = basic
    ? Buffer.from(basic, "base64").toString("utf8").split(":")[0]
    : undefined;
  const clientId = params.client_id || basicClientId;

  if (!clientId) return fail("invalid_client", "client_id is required.");

  const client = await prisma.oAuthClient.findUnique({ where: { clientId } });
  if (!client) return fail("invalid_client", "Unknown client_id.", 401);

  const origin = originFrom(request);
  pruneExpired();

  if (params.grant_type === "authorization_code") {
    if (!params.code) return fail("invalid_request", "code is required.");
    if (!params.code_verifier) return fail("invalid_request", "code_verifier is required.");

    const record = await prisma.oAuthAuthorizationCode.findUnique({
      where: { codeHash: hash(params.code) },
    });

    if (!record || !hashesEqual(record.codeHash, hash(params.code))) {
      return fail("invalid_grant", "That code is not valid.");
    }
    if (record.clientId !== clientId) {
      return fail("invalid_grant", "That code was issued to a different client.");
    }
    if (record.consumedAt) {
      // A replayed code means the first one may have been stolen. Burn the
      // whole grant rather than quietly handing out a second token.
      await prisma.oAuthToken.updateMany({
        where: { clientId, userId: record.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      return fail("invalid_grant", "That code was already used.");
    }
    if (record.expiresAt.getTime() < Date.now()) {
      return fail("invalid_grant", "That code has expired. Start the connection again.");
    }
    if (params.redirect_uri && params.redirect_uri !== record.redirectUri) {
      return fail("invalid_grant", "redirect_uri does not match the authorization request.");
    }
    if (!verifyPkce(record.codeChallenge, record.codeChallengeMethod, params.code_verifier)) {
      return fail("invalid_grant", "PKCE verification failed.");
    }

    await prisma.oAuthAuthorizationCode.update({
      where: { id: record.id },
      data: { consumedAt: new Date() },
    });

    const tokens = await issueTokens({
      clientId,
      userId: record.userId,
      scopes: record.scopes,
      resource: record.resource ?? resourceUrl(origin),
    });

    return NextResponse.json(tokens, { headers: NO_STORE });
  }

  if (params.grant_type === "refresh_token") {
    if (!params.refresh_token) return fail("invalid_request", "refresh_token is required.");

    const grant = await prisma.oAuthToken.findUnique({
      where: { refreshTokenHash: hash(params.refresh_token) },
    });

    if (!grant || grant.clientId !== clientId) {
      return fail("invalid_grant", "That refresh token is not valid.");
    }
    if (grant.revokedAt) return fail("invalid_grant", "That grant was revoked.");
    if (grant.refreshExpiresAt && grant.refreshExpiresAt.getTime() < Date.now()) {
      return fail("invalid_grant", "That refresh token has expired. Reconnect to continue.");
    }

    const tokens = await issueTokens({
      clientId,
      userId: grant.userId,
      // A refresh may narrow scope, never widen it.
      scopes: params.scope
        ? grant.scopes.filter((scope) => params.scope.split(/\s+/).includes(scope))
        : grant.scopes,
      resource: grant.resource,
      replaceTokenId: grant.id,
    });

    return NextResponse.json(tokens, { headers: NO_STORE });
  }

  return fail("unsupported_grant_type", `Unsupported grant_type: ${params.grant_type ?? "(none)"}`);
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
