import { NextResponse } from "next/server";
import type { McpIdentity } from "@/lib/mcp/auth";
import { McpError, tools, toolsByName } from "@/lib/mcp/tools";
import { siteConfig } from "@/lib/brand";

/**
 * Transport-agnostic core of Quote's MCP server: JSON-RPC 2.0 over streamable HTTP.
 *
 * Two routes feed it, differing only in where the token comes from:
 *   POST /api/mcp            -- `Authorization: Bearer <token>` (terminal + desktop clients)
 *   POST /api/mcp/u/<token>  -- token in the path (browser chats, which send no headers)
 */

const PROTOCOL_VERSION = "2025-06-18";
const SUPPORTED_PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, Mcp-Session-Id, MCP-Protocol-Version",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, WWW-Authenticate",
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

/**
 * A 401 that tells the client how to fix itself.
 *
 * The `resource_metadata` link is what turns "unauthorized" into a login
 * button: MCP clients follow it to the protected-resource document, on to the
 * authorization server, and register themselves from there.
 */
export function unauthorized(origin?: string) {
  const base = origin ?? siteConfig.url;
  const metadata = `${base}/.well-known/oauth-protected-resource`;

  return NextResponse.json(
    {
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32001,
        message:
          "Unauthorized: sign in through OAuth, or send a Quote API token as `Authorization: Bearer <token>`.",
      },
    },
    {
      status: 401,
      headers: {
        ...CORS_HEADERS,
        "WWW-Authenticate": `Bearer realm="${siteConfig.name}", error="invalid_token", resource_metadata="${metadata}"`,
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
        instructions: [
          "Quote is the user's notes workspace, and this server can run all of it: workspaces, pages, members, and sharing.",
          "Orient first: call list_workspaces when no workspace is named, list_recent_pages for \"what was I working on\", get_page_tree for the shape of a workspace, and search_pages to find something specific.",
          "Read before you write: read_page returns the current body, and update_page with mode 'replace' overwrites it. Use 'append' or 'prepend' when adding to a page you have not read.",
          "Building something new: create_workspace makes a workspace outright, and create_pages scaffolds a whole nested section in one call -- prefer it over many create_page calls.",
          "Page bodies are Markdown in both directions.",
          "Destructive tools (delete_page, delete_workspace, remove_member, revoke_invite, leave_workspace) are irreversible; delete_workspace additionally requires the workspace's exact name as confirmation. Confirm with the user before calling them.",
        ].join(" "),
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

      // Scopes only ever come from OAuth; a client granted read-only access
      // must not be able to write through a tool call.
      const requiredScope = tool.readOnly ? "mcp:read" : "mcp:write";
      if (!identity.scopes.includes(requiredScope)) {
        return failure(id, -32001, `This connection is missing the ${requiredScope} scope.`);
      }

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

/** Runs one HTTP request against the MCP core for an already-authenticated user. */
export async function handleMcpPost(request: Request, identity: McpIdentity) {
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
export function handleMcpGet() {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: { ...CORS_HEADERS, Allow: "POST, OPTIONS" },
  });
}

export function handleMcpOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
