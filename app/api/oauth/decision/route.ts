import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  isRegisteredRedirect,
  issueAuthorizationCode,
  normalizeScopes,
} from "@/lib/oauth/server";

/**
 * Where the consent screen posts. Turns an Allow into a single-use
 * authorization code and hands the browser back to the client.
 *
 * Every parameter is re-validated here: the form fields came from the browser,
 * so the page having checked them once proves nothing.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const form = await request.formData();
  const field = (name: string) => String(form.get(name) ?? "");

  const clientId = field("client_id");
  const redirectUri = field("redirect_uri");
  const state = field("state");
  const resource = field("resource");
  const codeChallenge = field("code_challenge");
  const codeChallengeMethod = field("code_challenge_method") || "S256";
  const scopes = normalizeScopes(field("scope"));

  const client = clientId
    ? await prisma.oAuthClient.findUnique({ where: { clientId } })
    : null;

  // An unverifiable redirect target is the one error we refuse to redirect to.
  if (!client || !redirectUri || !isRegisteredRedirect(client.redirectUris, redirectUri)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const target = new URL(redirectUri);
  if (state) target.searchParams.set("state", state);

  const bounce = (error: string, description: string) => {
    target.searchParams.set("error", error);
    target.searchParams.set("error_description", description);
    return NextResponse.redirect(target, { status: 303 });
  };

  if (!userId) return bounce("access_denied", "The session expired before approval.");
  if (field("decision") !== "allow") return bounce("access_denied", "The user declined.");
  if (!codeChallenge || codeChallengeMethod !== "S256") {
    return bounce("invalid_request", "PKCE with S256 is required.");
  }

  const code = await issueAuthorizationCode({
    clientId,
    userId,
    redirectUri,
    scopes,
    codeChallenge,
    codeChallengeMethod,
    resource: resource || null,
  });

  target.searchParams.set("code", code);
  return NextResponse.redirect(target, { status: 303 });
}
