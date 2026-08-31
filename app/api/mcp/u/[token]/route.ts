import { authenticateRawToken, authenticateToken } from "@/lib/mcp/auth";
import { originFrom } from "@/lib/oauth/server";
import {
  handleMcpGet,
  handleMcpOptions,
  handleMcpPost,
  unauthorized,
} from "@/lib/mcp/server";

/**
 * URL-authenticated MCP endpoint: POST /api/mcp/u/<token>
 *
 * Browser chat clients -- claude.ai custom connectors, ChatGPT developer-mode
 * apps, and Gemini custom apps -- only accept a bare server URL. None of them
 * expose a custom-header field, so a header-only endpoint is unreachable from
 * them. The token therefore rides in the path.
 *
 * That makes the URL itself the credential: it can land in browser history,
 * proxy logs, and screenshots. Treat one of these links like a password, give
 * each browser client its own token, and revoke it in Settings > Connections
 * the moment it leaks. Header auth (/api/mcp) stays the default everywhere the
 * client can send headers.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Keeps the secret out of search indexes and shared caches. */
const PRIVATE_HEADERS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };

const withPrivateHeaders = (response: Response) => {
  for (const [key, value] of Object.entries(PRIVATE_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
};

/**
 * Resolve the caller from the path token, falling back to the Authorization
 * header.
 *
 * The fallback matters: a client pointed at this URL with a stale path token
 * gets a 401, follows it into the OAuth flow, and then retries *this same URL*
 * carrying a valid bearer token. Without the fallback it would 401 forever and
 * report "authorized, but no MCP server found".
 */
async function resolve(request: Request, token: string) {
  return (
    (await authenticateRawToken(decodeURIComponent(token))) ??
    authenticateToken(request.headers.get("authorization"))
  );
}

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const identity = await resolve(request, token);
  if (!identity) return withPrivateHeaders(unauthorized(originFrom(request)));
  return withPrivateHeaders(await handleMcpPost(request, identity));
}

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const identity = await resolve(request, token);
  if (!identity) return withPrivateHeaders(unauthorized(originFrom(request)));
  return withPrivateHeaders(handleMcpGet());
}

export async function OPTIONS() {
  return handleMcpOptions();
}
