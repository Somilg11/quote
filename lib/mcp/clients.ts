import type { McpClientConfig } from "@/components/landing/mcp-setup";

export const MCP_TOKEN_PLACEHOLDER = "qt_your_token_here";

/**
 * Copy-paste setup for every MCP client we support.
 * `endpoint` is the absolute URL of Quote's MCP route; `token` is a personal API token.
 */
export function mcpClientConfigs(
  endpoint: string,
  token: string = MCP_TOKEN_PLACEHOLDER
): McpClientConfig[] {
  const remoteJson = (indent = 2) =>
    JSON.stringify(
      {
        mcpServers: {
          quote: {
            type: "http",
            url: endpoint,
            headers: { Authorization: `Bearer ${token}` },
          },
        },
      },
      null,
      indent
    );

  return [
    {
      id: "claude-code",
      label: "Claude Code",
      hint: "Run in your terminal",
      language: "bash",
      snippet: `claude mcp add --transport http quote ${endpoint} \\
  --header "Authorization: Bearer ${token}"

# then, inside Claude Code:
#   /mcp            list connected servers
#   "search my Quote notes for the Q3 roadmap"`,
    },
    {
      id: "claude-desktop",
      label: "Claude Desktop",
      hint: "claude_desktop_config.json",
      language: "json",
      snippet: remoteJson(),
    },
    {
      id: "chatgpt",
      label: "ChatGPT",
      hint: "Settings ▸ Connectors ▸ Add custom connector",
      language: "text",
      snippet: `Name:        Quote
MCP server:  ${endpoint}
Auth:        Custom header
Header:      Authorization
Value:       Bearer ${token}

ChatGPT calls tools/list on connect, so search_pages and
read_page show up automatically once the connector saves.`,
    },
    {
      id: "gemini",
      label: "Gemini CLI",
      hint: "~/.gemini/settings.json",
      language: "json",
      snippet: JSON.stringify(
        {
          mcpServers: {
            quote: {
              httpUrl: endpoint,
              headers: { Authorization: `Bearer ${token}` },
              timeout: 30000,
            },
          },
        },
        null,
        2
      ),
    },
    {
      id: "cursor",
      label: "Cursor / VS Code",
      hint: ".cursor/mcp.json or .vscode/mcp.json",
      language: "json",
      snippet: remoteJson(),
    },
    {
      id: "curl",
      label: "Raw HTTP",
      hint: "Any MCP-capable client",
      language: "bash",
      snippet: `curl -sS ${endpoint} \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`,
    },
  ];
}
