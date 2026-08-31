import type { McpClientConfig } from "@/components/landing/mcp-setup";

export const MCP_TOKEN_PLACEHOLDER = "qt_your_token_here";

/**
 * Copy-paste setup for every MCP client we support.
 *
 * Two shapes, because clients split cleanly in two:
 *   - Terminal/editor clients send `Authorization: Bearer <token>` to `endpoint`.
 *   - Browser chats (claude.ai, ChatGPT, Gemini) have no header field at all --
 *     they take a bare URL -- so they get `endpoint/u/<token>`.
 */
export function mcpClientConfigs(
  endpoint: string,
  token: string = MCP_TOKEN_PLACEHOLDER
): McpClientConfig[] {
  // Browser chats sign in with OAuth against the plain endpoint. The
  // token-in-URL form stays as a fallback for clients that refuse OAuth.
  const browserUrl = endpoint;
  const tokenUrl = `${endpoint.replace(/\/$/, "")}/u/${token}`;

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
      id: "claude-web",
      label: "Claude (browser)",
      group: "browser",
      hint: "claude.ai ▸ Settings ▸ Connectors ▸ Add custom connector",
      language: "text",
      snippet: `Remote MCP server URL:

${browserUrl}

No token to paste -- Quote runs an OAuth server, so Claude registers
itself and sends you here to approve the connection.

Pro / Max
  1. claude.ai ▸ sidebar ▸ Settings ▸ Connectors
     (also reachable as Customize ▸ Connectors)
  2. "+ Add custom connector"
  3. Remote MCP server URL: the URL above
  4. Leave Advanced settings (OAuth client ID / secret) empty --
     Quote supports dynamic client registration, so Claude fills them
     in for itself.
  5. Add, then Connect. Quote asks you to sign in and shows what the
     connector will be allowed to do. Approve it once.

Team / Enterprise
  1. An Owner adds it once: Organization settings ▸ Connectors
     ▸ Add ▸ hover Custom ▸ Web ▸ paste the URL ▸ Add.
  2. Each member: Customize ▸ Connectors ▸ Quote ▸ Connect, then
     approves their own consent screen. Grants are per person.

Then in a chat, open the tools/attachments menu and switch Quote on.

Access tokens last an hour and refresh silently. Revoke a connection
any time under Settings ▸ Connections ▸ Connected apps.`,
    },
    {
      id: "chatgpt",
      label: "ChatGPT (browser)",
      group: "browser",
      hint: "chatgpt.com ▸ Settings ▸ Apps ▸ Advanced ▸ Developer mode",
      language: "text",
      snippet: `MCP server URL:

${browserUrl}

There is no plain "Connectors" page any more -- that is why you could
not find it. Custom MCP servers now live behind Developer mode.

Before you start
  • Web only. Create it on chatgpt.com; the desktop and mobile apps
    only sync what you added on the web.
  • Plan gated. Business, Enterprise and Edu get full tool access.
    Pro is limited to read/search-style actions. Free cannot do it.
    On Business/Enterprise an admin may have to allow it first under
    Workspace settings ▸ Permissions & Roles ▸ Connected Data.

  1. Settings ▸ Apps ▸ Advanced ▸ turn on Developer mode.
     The section has been renamed more than once -- older builds show
     it as Connectors ▸ Advanced or Plugins, and some personal accounts
     put the toggle under Settings ▸ Security and login ▸ Developer
     mode. Same setting whichever label you see.
  2. Back in Settings ▸ Apps, choose Create.
  3. Name:              Quote
     MCP server URL:    the URL above
     Authentication:    OAuth
     Tick the box confirming you trust this server.
  4. Create. ChatGPT reads Quote's OAuth metadata, registers itself,
     and opens a Quote page where you sign in and approve.
  5. In a chat: + ▸ More ▸ Developer mode, then enable Quote.

If you saw "does not implement OAuth" before: that was the old
token-in-URL setup. Use the bare URL above instead -- ChatGPT probes
/.well-known/oauth-protected-resource and refuses anything without it.`,
    },
    {
      id: "gemini-web",
      label: "Gemini (browser)",
      group: "browser",
      hint: "gemini.google.com ▸ Settings & help ▸ Connected Apps",
      language: "text",
      snippet: `MCP server URL:

${browserUrl}

Before you start -- Google gates this tightly:
  • Needs Gemini Spark access.
  • Personal Google Account only. Work and school accounts cannot add
    custom apps; those go through Gemini Enterprise instead.
  • 18+, United States, and "Keep Activity" turned on.

  1. gemini.google.com ▸ Settings & help ▸ Connected Apps
     (on some accounts, click Personal Intelligence first).
  2. Under "Custom apps for Spark", choose Add a custom app.
  3. MCP server URL: the URL above.
  4. Leave the credentials under Advanced features ▸ Show more empty.
     They are only for servers without dynamic client registration;
     Quote supports it, so Gemini registers itself.
  5. Next, sign in to Quote and approve the consent screen.
  6. In a Spark task, type @ and pick Quote so Gemini actually uses it.

Set it up on the web once; it then works in the mobile app too.

Work/school account? Use Gemini Enterprise ▸ custom MCP server data
store instead. It speaks Streamable HTTP only and can authenticate
with a GCP service-account access token.`,
    },
    {
      id: "claude-code",
      label: "Claude Code",
      group: "terminal",
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
      group: "terminal",
      hint: "claude_desktop_config.json",
      language: "json",
      snippet: remoteJson(),
    },
    {
      id: "gemini-cli",
      label: "Gemini CLI",
      group: "terminal",
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
      group: "terminal",
      hint: ".cursor/mcp.json or .vscode/mcp.json",
      language: "json",
      snippet: remoteJson(),
    },
    {
      id: "token-url",
      label: "Token in URL",
      group: "terminal",
      hint: "Fallback for clients with no OAuth and no header field",
      language: "text",
      snippet: `${tokenUrl}

Use this only when a client can neither run OAuth nor set an
Authorization header. Everything else should use OAuth (browser chats)
or the bearer header (terminal and editor clients).

The URL is the credential: it lands in browser history and proxy logs.
Give each client its own token and revoke it above the moment it leaks.`,
    },
    {
      id: "curl",
      label: "Raw HTTP",
      group: "terminal",
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
