import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";

export const TOKEN_PREFIX = "qt_";
/** Access tokens minted by the OAuth flow, distinct from personal API tokens. */
export const OAUTH_TOKEN_PREFIX = "qo_";

export interface McpIdentity {
  userId: string;
  tokenId: string;
  tokenName: string;
  /** OAuth scopes. Personal API tokens are unscoped and get everything. */
  scopes: string[];
}

export const FULL_SCOPES = ["mcp:read", "mcp:write"];

/** Creates a token. The plaintext is returned once and never stored. */
export function generateToken() {
  const secret = randomBytes(32).toString("base64url");
  const token = `${TOKEN_PREFIX}${secret}`;
  return {
    token,
    tokenHash: hashToken(token),
    // Enough to recognise a token in a list, not enough to use it.
    prefix: token.slice(0, TOKEN_PREFIX.length + 6),
  };
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

/** Constant-time compare so a hash can't be probed byte by byte. */
function hashesEqual(a: string, b: string) {
  const bufferA = Buffer.from(a, "hex");
  const bufferB = Buffer.from(b, "hex");
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

/**
 * Resolves an `Authorization: Bearer <token>` header to a user.
 * Returns null for missing, malformed, revoked, or expired tokens.
 */
export async function authenticateToken(header: string | null): Promise<McpIdentity | null> {
  if (!header) return null;

  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim();
  if (!token) return null;

  // OAuth access tokens (browser chats) and personal API tokens (terminal
  // clients) arrive the same way, so try each in turn.
  return (await authenticateOAuthToken(token)) ?? authenticateRawToken(token);
}

/**
 * Same checks as `authenticateToken`, but for a token that arrived somewhere
 * other than the Authorization header -- browser chat clients (claude.ai,
 * ChatGPT, the Gemini app) only accept a bare URL, so the token rides in the
 * path there.
 */
export async function authenticateRawToken(
  token: string | undefined | null
): Promise<McpIdentity | null> {
  if (!token || !token.startsWith(TOKEN_PREFIX)) return null;

  const tokenHash = hashToken(token);

  const record = await prisma.apiToken.findUnique({
    where: { tokenHash },
    select: {
      id: true,
      name: true,
      userId: true,
      tokenHash: true,
      revokedAt: true,
      expiresAt: true,
    },
  });

  if (!record) return null;
  if (!hashesEqual(record.tokenHash, tokenHash)) return null;
  if (record.revokedAt) return null;
  if (record.expiresAt && record.expiresAt.getTime() < Date.now()) return null;

  // Best-effort usage stamp; never block the request on it.
  prisma.apiToken
    .update({ where: { id: record.id }, data: { lastUsedAt: new Date() } })
    .catch(() => undefined);

  return {
    userId: record.userId,
    tokenId: record.id,
    tokenName: record.name,
    scopes: FULL_SCOPES,
  };
}

/** Resolves an OAuth access token issued by Quote's authorization server. */
export async function authenticateOAuthToken(token: string): Promise<McpIdentity | null> {
  if (!token.startsWith(OAUTH_TOKEN_PREFIX)) return null;

  const record = await prisma.oAuthToken.findUnique({
    where: { accessTokenHash: hashToken(token) },
    select: {
      id: true,
      userId: true,
      scopes: true,
      revokedAt: true,
      expiresAt: true,
      client: { select: { name: true } },
    },
  });

  if (!record) return null;
  if (record.revokedAt) return null;
  if (record.expiresAt.getTime() < Date.now()) return null;

  prisma.oAuthToken
    .update({ where: { id: record.id }, data: { lastUsedAt: new Date() } })
    .catch(() => undefined);

  return {
    userId: record.userId,
    tokenId: record.id,
    tokenName: record.client.name,
    scopes: record.scopes,
  };
}
