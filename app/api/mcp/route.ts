import { NextResponse } from "next/server";
import { authenticateToken, type McpIdentity } from "@/lib/mcp/auth";
import { McpError, tools, toolsByName } from "@/lib/mcp/tools";
import { siteConfig } from "@/lib/brand";

/**
 * Quote's MCP server, speaking JSON-RPC 2.0 over streamable HTTP.
 *
 * Any MCP client that can send a bearer token works: Claude Code, Claude Desktop,
 * ChatGPT custom connectors, Gemini CLI, Cursor, VS Code.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PROTOCOL_VERSION = "2025-06-18";
const SUPPORTED_PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, Mcp-Session-Id, MCP-Protocol-Version",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
};

type JsonRpcId = string | number | null;

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id?: JsonRpcId;
  method: string;
  params?: any;
}

const result = (id: JsonRpcId, value: unknown) => ({ jsonrpc: "2.0" as const, id, result: value });

const failure = (id: JsonRpcId, code: number, message: string, data?: unknown) => ({
  jsonrpc: "2.0" as const,
  id,
  error: { code, message, ...(data === undefined ? {} : { data }) },
});

function unauthorized() {
  return NextResponse.json(
    { jsonrpc: "2.0", id: null, error: { code: -32001, message: "Unauthorized: provide a Quote API token as `Authorization: Bearer <token>`." } },
    {
      status: 401,
      headers: {
        ...CORS_HEADERS,
        // Points conformant clients at where a token comes from.
        "WWW-Authenticate": `Bearer realm="${siteConfig.name}", error="invalid_token"`,
      },
    }
  );
}

async function handleRpc(message: JsonRpcRequest, identity: McpIdentity) {
  const id = message.id ?? null;

  switch (message.method) {
    case "initialize": {
      const requested = message.params?.protocolVersion;
      return result(id, {
        protocolVersion: SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
          ? requested
          : PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "quote", title: siteConfig.name, version: "1.0.0" },
        instructions:
          "Quote is the user's personal notes workspace. Call list_workspaces first when no workspace is named, search_pages to find things, and read_page before editing so you preserve existing content. Page bodies are Markdown.",
      });
    }

    case "ping":
      return result(id, {});

    case "tools/list":
      return result(id, {
        tools: tools.map((tool) => ({
          name: tool.name,
          title: tool.title,
          description: tool.description,
          inputSchema: tool.inputSchema,
          annotations: {
            title: tool.title,
            readOnlyHint: Boolean(tool.readOnly),
            destructiveHint: Boolean(tool.destructive),
            idempotentHint: Boolean(tool.readOnly),
            openWorldHint: false,
          },
        })),
      });

    case "tools/call": {
      const tool = toolsByName.get(message.params?.name);
      if (!tool) return failure(id, -32602, `Unknown tool: ${message.params?.name}`);

      try {
        const output = await tool.handler(message.params?.arguments ?? {}, identity);
        return result(id, {
          content: [{ type: "text", text: JSON.stringify(output, null, 2) }],
          structuredContent: output,
          isError: false,
        });
      } catch (error) {
        // Tool failures are reported in-band so the model can recover.
        const messageText =
          error instanceof McpError
            ? error.message
            : "The tool failed. Check the arguments and try again.";
        if (!(error instanceof McpError)) console.error("[mcp:tool]", tool.name, error);
        return result(id, {
          content: [{ type: "text", text: messageText }],
          isError: true,
        });
      }
    }

    // Declared-but-empty capabilities keep strict clients from erroring on discovery.
    case "resources/list":
      return result(id, { resources: [] });
    case "resources/templates/list":
      return result(id, { resourceTemplates: [] });
    case "prompts/list":
      return result(id, { prompts: [] });

    default:
      return failure(id, -32601, `Method not found: ${message.method}`);
  }
}

export async function POST(request: Request) {
  const identity = await authenticateToken(request.headers.get("authorization"));
  if (!identity) return unauthorized();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(failure(null, -32700, "Parse error"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const messages: JsonRpcRequest[] = Array.isArray(body) ? body : [body as JsonRpcRequest];
  const responses = [];

  for (const message of messages) {
    if (!message || message.jsonrpc !== "2.0" || typeof message.method !== "string") {
      responses.push(failure(null, -32600, "Invalid request"));
      continue;
    }
    // Notifications (no id) get no response body.
    if (message.id === undefined) continue;
    responses.push(await handleRpc(message, identity));
  }

  if (responses.length === 0) {
    return new Response(null, { status: 202, headers: CORS_HEADERS });
  }

  return NextResponse.json(Array.isArray(body) ? responses : responses[0], {
    headers: { ...CORS_HEADERS, "Cache-Control": "no-store" },
  });
}

// Clients probe GET for a server-initiated SSE stream. Quote has nothing to push,
// so decline cleanly rather than holding a connection open.
export async function GET(request: Request) {
  const identity = await authenticateToken(request.headers.get("authorization"));
  if (!identity) return unauthorized();

  return new Response("Method Not Allowed", {
    status: 405,
    headers: { ...CORS_HEADERS, Allow: "POST, OPTIONS" },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
