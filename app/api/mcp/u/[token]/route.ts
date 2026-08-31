import { authenticateRawToken } from "@/lib/mcp/auth";
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

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const identity = await authenticateRawToken(decodeURIComponent(token));
  if (!identity) return withPrivateHeaders(unauthorized(originFrom(request)));
  return withPrivateHeaders(await handleMcpPost(request, identity));
}

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const identity = await authenticateRawToken(decodeURIComponent(token));
  if (!identity) return withPrivateHeaders(unauthorized(originFrom(request)));
  return withPrivateHeaders(handleMcpGet());
}

export async function OPTIONS() {
  return handleMcpOptions();
}
