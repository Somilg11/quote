# Quote

> A minimal, Notion-style collaborative workspace — with a built-in MCP server.

Quote is a self-hosted document workspace: nested pages, a block editor, real-time
collaboration, workspaces and invites, and public share links. It also exposes its own
**MCP server**, so Claude Code, Claude Desktop, ChatGPT, Gemini, Cursor, and VS Code can
search, read, and write your pages directly.

Built with Next.js 16, TipTap, Yjs, Prisma 7 and PostgreSQL. No realtime vendor, no
always-on socket server.

---

## Features

### Editor
- TipTap block editor: headings, lists, quotes, code blocks, tables, images, links, dividers
- Slash commands (`/`) with keyboard navigation
- Undo/redo backed by the collaborative document
- Autosaving HTML mirror used by search, share pages, and MCP

### Collaboration without a realtime server
Documents are Yjs CRDTs. Each client appends its local updates to an append-only log in
Postgres and pulls everyone else's on a short adaptive interval:

| State | Poll interval |
| --- | --- |
| Others present, or recent remote activity | 1.2s |
| Solo and idle | 5s |
| Tab hidden | 30s |

- Conflict-free merges — no last-write-wins, no document locking
- Local-first: the page renders from IndexedDB before the network answers
- Queued edits replay after a dropped connection; a final push uses `keepalive` on unload
- The log compacts into a snapshot on `Page.ydoc` once it passes 120 rows
- Presence rows carry a 20s TTL, so no cleanup job is needed

Trade-off: about a second of latency instead of instant, in exchange for zero realtime
infrastructure cost.

### Workspaces and sharing
- Multiple workspaces per user, email invites, member roles
- Nested pages with a collapsible tree
- Three visibility states: private, workspace, and public (read-only link)
- Public pages are server-rendered, indexable, and carry Article JSON-LD

### MCP server
`POST /api/mcp` — JSON-RPC 2.0 over streamable HTTP, authenticated with a bearer token.

| Tool | Purpose |
| --- | --- |
| `list_workspaces` | Workspaces the token can reach |
| `list_pages` | Page tree for a workspace |
| `search_pages` | Full-text search over titles and bodies |
| `read_page` | Page body as Markdown |
| `create_page` | New page, optionally nested |
| `update_page` | Replace, append, or prepend content |
| `delete_page` | Remove a page and its children |
| `share_page` | Change visibility, return the public URL |

Tokens are SHA-256 hashed at rest, shown once at creation, scoped to one account, and
revocable from **Settings ▸ Connections** — which also generates the config block for each
client.

---

## Getting started

```bash
pnpm install
cp .env.example .env      # fill in DATABASE_URL at minimum
pnpm db:migrate           # apply migrations
pnpm dev
```

### Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | Postgres connection string |
| `NEXTAUTH_SECRET` | yes | Session signing — `openssl rand -base64 32` |
| `NEXTAUTH_URL` | yes | Origin NextAuth redirects to |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URLs, OG tags, sitemap, share links, MCP endpoint |
| `GMAIL_EMAIL` / `GMAIL_APP_PASSWORD` | optional | Outbound workspace invites |

### Scripts

| Command | Does |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | `prisma generate` then a production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm db:migrate` | `prisma migrate deploy` |
| `pnpm db:generate` | Regenerate the Prisma client |

---

## Connecting an AI client

Create a token in **Settings ▸ Connections**, then:

```bash
claude mcp add --transport http quote https://your-domain/api/mcp \
  --header "Authorization: Bearer qt_..."
```

Claude Desktop, Cursor, and VS Code take the equivalent JSON; Gemini CLI uses `httpUrl` in
`~/.gemini/settings.json`; ChatGPT takes it as a custom connector with an `Authorization`
header. Every variant is generated for you on the Connections page.

---

## Architecture notes

- `lib/collab/store.ts` — Yjs update log, snapshot compaction, presence
- `components/editor/use-collab.ts` — client sync loop and adaptive polling
- `lib/mcp/` — token auth, tool definitions, Markdown ↔ HTML conversion
- `lib/sanitize-html.ts` — allowlist applied on write and again on render
- `lib/brand.ts` — single source of truth for palette, metadata, and site URL

Pages carry a `version` counter. Writes from the REST API or MCP bump it and clear the
collaborative snapshot, so open editors show a "changed outside the editor" banner rather
than silently overwriting what someone is typing.
