import { prisma } from "@/lib/prisma";
import { clearDoc } from "@/lib/collab/store";
import { htmlToMarkdown, htmlToText, markdownToHtml } from "@/lib/mcp/markdown";
import { absoluteUrl } from "@/lib/brand";
import { generateShareToken } from "@/lib/security";
import type { McpIdentity } from "@/lib/mcp/auth";

export interface McpTool {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  /** Advertised as read-only so clients can auto-approve safe calls. */
  readOnly?: boolean;
  destructive?: boolean;
  handler: (args: any, identity: McpIdentity) => Promise<unknown>;
}

class McpError extends Error {}

/** Resolves a workspace by id or slug, but only among the caller's workspaces. */
async function resolveWorkspace(identity: McpIdentity, ref?: string) {
  const memberships = await prisma.workspace.findMany({
    where: { members: { some: { userId: identity.userId } } },
    select: { id: true, name: true, slug: true },
    orderBy: { updatedAt: "desc" },
  });

  if (memberships.length === 0) {
    throw new McpError("This account has no workspaces yet. Create one in the Quote app first.");
  }

  if (!ref) {
    if (memberships.length > 1) {
      throw new McpError(
        `Specify a workspace. Available: ${memberships.map((w) => `${w.name} (${w.slug})`).join(", ")}`
      );
    }
    return memberships[0];
  }

  const found = memberships.find(
    (workspace) =>
      workspace.id === ref ||
      workspace.slug === ref ||
      workspace.name.toLowerCase() === ref.toLowerCase()
  );

  if (!found) throw new McpError(`No workspace matching "${ref}" is available to this token.`);
  return found;
}

/** Loads a page and asserts the caller is a member of its workspace. */
async function resolvePage(identity: McpIdentity, pageId: string) {
  const page = await prisma.page.findUnique({
    where: { id: pageId },
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
          slug: true,
          members: { where: { userId: identity.userId }, select: { role: true } },
        },
      },
    },
  });

  if (!page) throw new McpError(`No page with id "${pageId}".`);
  if (page.workspace.members.length === 0) {
    throw new McpError("This token cannot access that page.");
  }
  return page;
}

async function uniqueSlug(workspaceId: string, title: string) {
  const base =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "untitled";

  let slug = base;
  let counter = 1;
  while (await prisma.page.findUnique({ where: { workspaceId_slug: { workspaceId, slug } } })) {
    slug = `${base}-${counter++}`;
  }
  return slug;
}

const pageUrl = (workspaceId: string, pageId: string) =>
  absoluteUrl(`/workspaces/${workspaceId}/pages/${pageId}`);

export const tools: McpTool[] = [
  {
    name: "list_workspaces",
    title: "List workspaces",
    description:
      "List every Quote workspace this token can access, with page counts. Call this first when the user has not named a workspace.",
    readOnly: true,
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    handler: async (_args, identity) => {
      const workspaces = await prisma.workspace.findMany({
        where: { members: { some: { userId: identity.userId } } },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          _count: { select: { pages: true, members: true } },
        },
        orderBy: { updatedAt: "desc" },
      });

      return {
        workspaces: workspaces.map((workspace) => ({
          id: workspace.id,
          name: workspace.name,
          slug: workspace.slug,
          description: workspace.description,
          pageCount: workspace._count.pages,
          memberCount: workspace._count.members,
        })),
      };
    },
  },

  {
    name: "list_pages",
    title: "List pages",
    description:
      "List pages in a workspace as a tree. Returns ids, titles, icons, and parent relationships without page bodies.",
    readOnly: true,
    inputSchema: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Workspace id, slug, or name. Optional when the token has exactly one workspace." },
        parentId: { type: "string", description: "Only list children of this page." },
        limit: { type: "number", description: "Maximum pages to return (default 100, max 500)." },
      },
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const workspace = await resolveWorkspace(identity, args?.workspace);
      const pages = await prisma.page.findMany({
        where: {
          workspaceId: workspace.id,
          ...(args?.parentId ? { parentId: args.parentId } : {}),
        },
        select: {
          id: true,
          title: true,
          icon: true,
          slug: true,
          parentId: true,
          shareType: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: "desc" },
        take: Math.min(Math.max(Number(args?.limit) || 100, 1), 500),
      });

      return {
        workspace: { id: workspace.id, name: workspace.name, slug: workspace.slug },
        pages: pages.map((page) => ({
          ...page,
          url: pageUrl(workspace.id, page.id),
          updatedAt: page.updatedAt.toISOString(),
        })),
      };
    },
  },

  {
    name: "search_pages",
    title: "Search pages",
    description:
      "Search page titles and bodies across the workspaces this token can access. Returns matching pages with a short snippet.",
    readOnly: true,
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Text to search for." },
        workspace: { type: "string", description: "Restrict the search to one workspace." },
        limit: { type: "number", description: "Maximum results (default 20, max 100)." },
      },
      required: ["query"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const query = String(args?.query ?? "").trim();
      if (!query) throw new McpError("A non-empty `query` is required.");

      const workspaceFilter = args?.workspace
        ? { id: (await resolveWorkspace(identity, args.workspace)).id }
        : { members: { some: { userId: identity.userId } } };

      const pages = await prisma.page.findMany({
        where: {
          workspace: workspaceFilter,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          icon: true,
          content: true,
          updatedAt: true,
          workspace: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { updatedAt: "desc" },
        take: Math.min(Math.max(Number(args?.limit) || 20, 1), 100),
      });

      return {
        query,
        results: pages.map((page) => {
          const text = htmlToText(page.content ?? "");
          const at = text.toLowerCase().indexOf(query.toLowerCase());
          const start = at < 0 ? 0 : Math.max(0, at - 60);
          return {
            id: page.id,
            title: page.title,
            icon: page.icon,
            workspace: page.workspace.name,
            workspaceId: page.workspace.id,
            url: pageUrl(page.workspace.id, page.id),
            snippet: text.slice(start, start + 220) + (text.length > start + 220 ? "…" : ""),
            updatedAt: page.updatedAt.toISOString(),
          };
        }),
      };
    },
  },

  {
    name: "read_page",
    title: "Read page",
    description: "Read a page's full body as Markdown, along with its metadata and child pages.",
    readOnly: true,
    inputSchema: {
      type: "object",
      properties: { pageId: { type: "string", description: "The page id, as returned by list_pages or search_pages." } },
      required: ["pageId"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const page = await resolvePage(identity, String(args?.pageId ?? ""));
      const children = await prisma.page.findMany({
        where: { parentId: page.id },
        select: { id: true, title: true, icon: true },
      });

      return {
        id: page.id,
        title: page.title,
        icon: page.icon,
        workspace: { id: page.workspace.id, name: page.workspace.name },
        url: pageUrl(page.workspace.id, page.id),
        shareType: page.shareType,
        publicUrl: page.shareType === "global" && page.shareToken ? absoluteUrl(`/share/${page.shareToken}`) : null,
        markdown: htmlToMarkdown(page.content ?? ""),
        children,
        updatedAt: page.updatedAt.toISOString(),
      };
    },
  },

  {
    name: "create_page",
    title: "Create page",
    description:
      "Create a new page in a workspace, optionally nested under a parent page. Body content is written as Markdown.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Page title." },
        workspace: { type: "string", description: "Workspace id, slug, or name." },
        markdown: { type: "string", description: "Page body as Markdown." },
        icon: { type: "string", description: "A single emoji used as the page icon." },
        parentId: { type: "string", description: "Create the page as a child of this page." },
      },
      required: ["title"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const title = String(args?.title ?? "").trim();
      if (!title) throw new McpError("A non-empty `title` is required.");

      let workspaceId: string;
      if (args?.parentId) {
        const parent = await resolvePage(identity, String(args.parentId));
        workspaceId = parent.workspaceId;
      } else {
        workspaceId = (await resolveWorkspace(identity, args?.workspace)).id;
      }

      const page = await prisma.page.create({
        data: {
          title,
          slug: await uniqueSlug(workspaceId, title),
          icon: args?.icon || "📄",
          content: markdownToHtml(String(args?.markdown ?? "")),
          workspaceId,
          createdById: identity.userId,
          parentId: args?.parentId ?? null,
        },
        select: { id: true, title: true, icon: true, workspaceId: true },
      });

      return { ...page, url: pageUrl(page.workspaceId, page.id) };
    },
  },

  {
    name: "update_page",
    title: "Update page",
    description:
      "Update a page's title, icon, or body. Use mode 'replace' to overwrite the body, 'append' to add to the end, or 'prepend' to add to the start.",
    inputSchema: {
      type: "object",
      properties: {
        pageId: { type: "string", description: "The page to update." },
        title: { type: "string", description: "New title." },
        icon: { type: "string", description: "New emoji icon." },
        markdown: { type: "string", description: "Markdown body to write." },
        mode: {
          type: "string",
          enum: ["replace", "append", "prepend"],
          description: "How to apply `markdown`. Defaults to 'replace'.",
        },
      },
      required: ["pageId"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const page = await resolvePage(identity, String(args?.pageId ?? ""));
      const mode = args?.mode ?? "replace";

      let content: string | undefined;
      if (typeof args?.markdown === "string") {
        const incoming = markdownToHtml(args.markdown);
        const existing = page.content ?? "";
        content =
          mode === "append" ? existing + incoming : mode === "prepend" ? incoming + existing : incoming;
      }

      const updated = await prisma.page.update({
        where: { id: page.id },
        data: {
          ...(args?.title ? { title: String(args.title) } : {}),
          ...(args?.icon ? { icon: String(args.icon) } : {}),
          ...(content !== undefined ? { content, version: { increment: 1 } } : {}),
        },
        select: { id: true, title: true, icon: true, version: true, workspaceId: true },
      });

      // The collaborative document is rebuilt from this HTML the next time the page
      // is opened; editors that are open right now are offered a refresh.
      if (content !== undefined) await clearDoc(page.id).catch(() => undefined);

      return { ...updated, url: pageUrl(updated.workspaceId, updated.id) };
    },
  },

  {
    name: "delete_page",
    title: "Delete page",
    description: "Permanently delete a page and its child pages. This cannot be undone.",
    destructive: true,
    inputSchema: {
      type: "object",
      properties: { pageId: { type: "string", description: "The page to delete." } },
      required: ["pageId"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const page = await resolvePage(identity, String(args?.pageId ?? ""));
      const isOwner = page.workspace.members.some((member) => member.role === "owner");
      if (!isOwner && page.createdById !== identity.userId) {
        throw new McpError("Only the workspace owner or the page author can delete this page.");
      }

      await prisma.page.delete({ where: { id: page.id } });
      return { deleted: true, id: page.id, title: page.title };
    },
  },

  {
    name: "share_page",
    title: "Share page",
    description:
      "Change a page's visibility: 'private', 'workspace', or 'global' (a public read-only link).",
    inputSchema: {
      type: "object",
      properties: {
        pageId: { type: "string" },
        shareType: { type: "string", enum: ["private", "workspace", "global"] },
      },
      required: ["pageId", "shareType"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const page = await resolvePage(identity, String(args?.pageId ?? ""));
      const shareType = String(args?.shareType);
      if (!["private", "workspace", "global"].includes(shareType)) {
        throw new McpError("`shareType` must be private, workspace, or global.");
      }

      const shareToken =
        shareType === "global" && !page.shareToken ? generateShareToken() : page.shareToken;

      const updated = await prisma.page.update({
        where: { id: page.id },
        data: { shareType, ...(shareToken ? { shareToken } : {}) },
        select: { id: true, shareType: true, shareToken: true },
      });

      return {
        id: updated.id,
        shareType: updated.shareType,
        publicUrl:
          updated.shareType === "global" && updated.shareToken
            ? absoluteUrl(`/share/${updated.shareToken}`)
            : null,
      };
    },
  },
];

export const toolsByName = new Map(tools.map((tool) => [tool.name, tool]));
export { McpError };
