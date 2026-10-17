import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/brand";

/**
 * Quote's OAuth 2.1 authorization server, scoped to one job: letting an MCP
 * client obtain a token for one user.
 *
 * Browser chat clients -- claude.ai custom connectors, ChatGPT developer-mode
 * apps, Gemini custom apps -- refuse any MCP server that does not advertise
 * OAuth. They discover this server through RFC 9728 protected-resource
 * metadata, register themselves through RFC 7591 dynamic client registration,
 * then run an authorization-code flow with PKCE. No client secret is involved:
 * they are public clients, so PKCE is what binds the code to the client.
 */

export const SCOPES = ["mcp:read", "mcp:write"] as const;
export type Scope = (typeof SCOPES)[number];

export const SCOPE_LABELS: Record<Scope, string> = {
  "mcp:read": "Read your workspaces and pages",
  "mcp:write": "Create and edit pages",
};

const ACCESS_TOKEN_TTL_SECONDS = 60 * 60; // 1 hour
const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 60; // 60 days
const CODE_TTL_SECONDS = 60; // Codes are redeemed immediately or not at all.

export const ACCESS_TOKEN_PREFIX = "qo_";
export const REFRESH_TOKEN_PREFIX = "qr_";

export const hash = (value: string) => createHash("sha256").update(value).digest("hex");

/** Constant-time compare so a stored hash can't be probed byte by byte. */
export function hashesEqual(a: string, b: string) {
  const bufferA = Buffer.from(a, "hex");
  const bufferB = Buffer.from(b, "hex");
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

const secret = (prefix = "") => `${prefix}${randomBytes(32).toString("base64url")}`;

/**
 * The fixed public origin of this deployment (never derived from Host or
 * X-Forwarded-* headers, which a client can spoof to poison cached discovery
 * metadata). The `request` argument is kept so call sites stay unchanged.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function originFrom(_request?: Request) {
  return siteConfig.url;
}

/** The MCP endpoint tokens are good for (RFC 8707 audience). */
export const resourceUrl = (origin: string) => `${origin}/api/mcp`;

/** Keeps unknown or malformed scope strings out of the database. */
export function normalizeScopes(requested: string | string[] | undefined | null): Scope[] {
  const list = Array.isArray(requested) ? requested : (requested ?? "").split(/[\s+]+/);
  const valid = list.filter((scope): scope is Scope => SCOPES.includes(scope as Scope));
  // An unrecognised or empty request gets full access: that is what every MCP
  // client actually asks for, and the consent screen spells it out either way.
  return valid.length > 0 ? Array.from(new Set(valid)) : [...SCOPES];
}

/** Redirect URIs are checked by exact string match against what the client registered. */
export function isRegisteredRedirect(registered: string[], candidate: string) {
  return registered.includes(candidate);
}

/**
 * A registered redirect must be HTTPS, or loopback for local development.
 * claude.ai's `/api/mcp/auth_callback` and its ChatGPT/Gemini equivalents pass;
 * `javascript:` and other schemes never do.
 */
export function isAllowedRedirectUri(value: string) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.hash) return false;
  if (url.protocol === "https:") return true;
  return url.protocol === "http:" && (url.hostname === "localhost" || url.hostname === "127.0.0.1");
}

/** RFC 7636 S256: the verifier must hash to the challenge sent up front. */
export function verifyPkce(codeChallenge: string, method: string, codeVerifier: string) {
  if (method !== "S256") return false;
  const computed = createHash("sha256").update(codeVerifier).digest("base64url");
  const a = Buffer.from(computed);
  const b = Buffer.from(codeChallenge);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Issues a single-use authorization code bound to this user, client, and PKCE challenge. */
export async function issueAuthorizationCode(input: {
  clientId: string;
  userId: string;
  redirectUri: string;
  scopes: Scope[];
  codeChallenge: string;
  codeChallengeMethod: string;
  resource?: string | null;
}) {
  const code = secret();
  await prisma.oAuthAuthorizationCode.create({
    data: {
      codeHash: hash(code),
      clientId: input.clientId,
      userId: input.userId,
      redirectUri: input.redirectUri,
      scopes: input.scopes,
      codeChallenge: input.codeChallenge,
      codeChallengeMethod: input.codeChallengeMethod,
      resource: input.resource ?? null,
      expiresAt: new Date(Date.now() + CODE_TTL_SECONDS * 1000),
    },
  });
  return code;
}

export interface IssuedTokens {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  refresh_token: string;
  scope: string;
}

/** Mints an access/refresh pair. `replaceTokenId` rotates an existing grant in place. */
export async function issueTokens(input: {
  clientId: string;
  userId: string;
  scopes: string[];
  resource?: string | null;
  replaceTokenId?: string;
  /** The refresh hash being rotated out; the swap only applies if it is still current. */
  replaceRefreshHash?: string;
}): Promise<IssuedTokens | null> {
  const accessToken = secret(ACCESS_TOKEN_PREFIX);
  const refreshToken = secret(REFRESH_TOKEN_PREFIX);
  const now = Date.now();

  const data = {
    accessTokenHash: hash(accessToken),
    refreshTokenHash: hash(refreshToken),
    clientId: input.clientId,
    userId: input.userId,
    scopes: input.scopes,
    resource: input.resource ?? null,
    expiresAt: new Date(now + ACCESS_TOKEN_TTL_SECONDS * 1000),
    refreshExpiresAt: new Date(now + REFRESH_TOKEN_TTL_SECONDS * 1000),
    revokedAt: null,
  };

  if (input.replaceTokenId) {
    // Refresh rotation: the previous access and refresh tokens stop working the
    // moment the new pair exists, so a stolen refresh token is good only once.
    const rotated = await prisma.oAuthToken.updateMany({
      where: {
        id: input.replaceTokenId,
        revokedAt: null,
        ...(input.replaceRefreshHash ? { refreshTokenHash: input.replaceRefreshHash } : {}),
      },
      data,
    });
    // Another request already rotated (or revoked) this grant.
    if (rotated.count !== 1) return null;
  } else {
    await prisma.oAuthToken.create({ data });
  }

  return {
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: ACCESS_TOKEN_TTL_SECONDS,
    refresh_token: refreshToken,
    scope: input.scopes.join(" "),
  };
}

/** Drops codes and grants that can no longer be used. Best-effort; never blocks a request. */
export function pruneExpired() {
  const now = new Date();
  void Promise.all([
    prisma.oAuthAuthorizationCode.deleteMany({ where: { expiresAt: { lt: now } } }),
    prisma.oAuthToken.deleteMany({ where: { refreshExpiresAt: { lt: now } } }),
  ]).catch(() => undefined);
}
