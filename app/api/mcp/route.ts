import { authenticateToken } from "@/lib/mcp/auth";
import {
  handleMcpGet,
  handleMcpOptions,
  handleMcpPost,
  unauthorized,
} from "@/lib/mcp/server";

/**
 * Header-authenticated MCP endpoint, for clients that can set request headers:
 * Claude Code, Claude Desktop, Gemini CLI, Cursor, VS Code, raw HTTP.
 *
 * Browser chats cannot set headers -- they use /api/mcp/u/<token> instead.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const identity = await authenticateToken(request.headers.get("authorization"));
  if (!identity) return unauthorized();
  return handleMcpPost(request, identity);
}

export async function GET(request: Request) {
  const identity = await authenticateToken(request.headers.get("authorization"));
  if (!identity) return unauthorized();
  return handleMcpGet();
}

export async function OPTIONS() {
  return handleMcpOptions();
}
