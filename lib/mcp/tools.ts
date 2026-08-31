import { prisma } from "@/lib/prisma";
import { clearDoc } from "@/lib/collab/store";
import { htmlToMarkdown, htmlToText, markdownToHtml } from "@/lib/mcp/markdown";
import { absoluteUrl } from "@/lib/brand";
import { generateShareToken, isValidEmail } from "@/lib/security";
import { sendInviteEmail } from "@/lib/email";
import { randomBytes } from "crypto";
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

/** Slug uniqueness inside a transaction, used when a whole subtree changes workspace. */
async function uniqueSlugIn(
  tx: Pick<typeof prisma, "page">,
  workspaceId: string,
  title: string
) {
  const base =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "untitled";

  let slug = base;
  let counter = 1;
  while (await tx.page.findUnique({ where: { workspaceId_slug: { workspaceId, slug } } })) {
    slug = `${base}-${counter++}`;
  }
  return slug;
}

/** Every page beneath `rootId`, breadth-first, excluding the root itself. */
async function collectSubtree(rootId: string) {
  const collected: Array<{ id: string; title: string }> = [];
  let frontier = [rootId];

  // Bounded by depth so a corrupt parent cycle cannot spin forever.
  for (let depth = 0; frontier.length > 0 && depth < 100; depth += 1) {
    const children = await prisma.page.findMany({
      where: { parentId: { in: frontier } },
      select: { id: true, title: true },
    });
    if (children.length === 0) break;
    collected.push(...children);
    frontier = children.map((child) => child.id);
  }
  return collected;
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

/** Loads the caller's membership row, or throws. */
async function requireMembership(identity: McpIdentity, workspaceId: string) {
  const membership = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId: identity.userId, workspaceId } },
    select: { role: true },
  });
  if (!membership) throw new McpError("This token cannot access that workspace.");
  return membership;
}

/** Owner-only actions -- invites, removals, renames, deletion. */
async function requireOwner(identity: McpIdentity, workspaceId: string) {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: { id: true, name: true, slug: true, ownerId: true },
  });
  if (!workspace) throw new McpError("No such workspace.");
  if (workspace.ownerId !== identity.userId) {
    throw new McpError("Only the workspace owner can do that.");
  }
  return workspace;
}

/**
 * Workspace slugs are unique across every account, so a collision with a
 * stranger's slug suffixes rather than fails -- same rule the web app uses.
 */
async function uniqueWorkspaceSlug(desired: string) {
  const base =
    desired
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "workspace";

  let slug = base;
  let counter = 1;
  while (await prisma.workspace.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${base}-${++counter}`;
  }
  return slug;
}

/** Walks up the parent chain to stop a page being nested inside its own subtree. */
async function isDescendant(candidateId: string, ancestorId: string) {
  let cursor: string | null = candidateId;
  // Depth is bounded in practice; the counter just guarantees termination.
  for (let hops = 0; cursor && hops < 100; hops += 1) {
    if (cursor === ancestorId) return true;
    const parent: { parentId: string | null } | null = await prisma.page.findUnique({
      where: { id: cursor },
      select: { parentId: true },
    });
    cursor = parent?.parentId ?? null;
  }
  return false;
}

/** Cover images are either a URL or one of the built-in `gradient:<id>` tokens. */
const COVER_GRADIENT_IDS = ["slate", "dusk", "moss", "clay", "steel", "sand", "ink", "rose"];

const workspaceUrl = (workspaceId: string) => absoluteUrl(`/workspaces/${workspaceId}`);

const INVITE_EXPIRY_HOURS = 7 * 24;


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
    name: "create_workspace",
    title: "Create workspace",
    description:
      "Create a new workspace owned by this account. The URL slug is derived from the name and suffixed if it is already taken, so this never fails on a name collision.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Workspace name." },
        slug: { type: "string", description: "Preferred URL slug. Derived from the name when omitted." },
        description: { type: "string", description: "What lives in this workspace." },
      },
      required: ["name"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const name = String(args?.name ?? "").trim();
      if (!name) throw new McpError("A non-empty `name` is required.");

      const workspace = await prisma.workspace.create({
        data: {
          name,
          slug: await uniqueWorkspaceSlug(String(args?.slug ?? name)),
          description: String(args?.description ?? "").trim() || null,
          ownerId: identity.userId,
          members: { create: { userId: identity.userId, role: "owner" } },
        },
        select: { id: true, name: true, slug: true, description: true },
      });

      return { ...workspace, role: "owner", url: workspaceUrl(workspace.id) };
    },
  },

  {
    name: "update_workspace",
    title: "Update workspace",
    description: "Rename a workspace or change its description. Owner only.",
    inputSchema: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Workspace id, slug, or name." },
        name: { type: "string", description: "New name." },
        description: { type: "string", description: "New description. Pass an empty string to clear it." },
      },
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const target = await resolveWorkspace(identity, args?.workspace);
      await requireOwner(identity, target.id);

      const name = typeof args?.name === "string" ? args.name.trim() : undefined;
      if (name !== undefined && !name) throw new McpError("`name` cannot be empty.");

      const updated = await prisma.workspace.update({
        where: { id: target.id },
        data: {
          ...(name ? { name } : {}),
          ...(args?.description !== undefined
            ? { description: String(args.description).trim() || null }
            : {}),
        },
        select: { id: true, name: true, slug: true, description: true },
      });

      return { ...updated, url: workspaceUrl(updated.id) };
    },
  },

  {
    name: "delete_workspace",
    title: "Delete workspace",
    description:
      "Permanently delete a workspace and every page, member, and invite in it. Owner only. Requires `confirmName` to exactly match the workspace name, so a mistaken call cannot destroy anything.",
    destructive: true,
    inputSchema: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Workspace id, slug, or name." },
        confirmName: { type: "string", description: "The workspace's exact current name." },
      },
      required: ["workspace", "confirmName"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const target = await resolveWorkspace(identity, args?.workspace);
      const workspace = await requireOwner(identity, target.id);

      if (String(args?.confirmName) !== workspace.name) {
        throw new McpError(
          `\`confirmName\` must exactly match the workspace name ("${workspace.name}") to delete it.`
        );
      }

      const counts = await prisma.page.count({ where: { workspaceId: workspace.id } });
      await prisma.workspace.delete({ where: { id: workspace.id } });

      return { deleted: true, id: workspace.id, name: workspace.name, pagesDeleted: counts };
    },
  },

  {
    name: "leave_workspace",
    title: "Leave workspace",
    description:
      "Remove this account from a workspace it was invited to. The owner cannot leave -- they delete the workspace instead.",
    destructive: true,
    inputSchema: {
      type: "object",
      properties: { workspace: { type: "string", description: "Workspace id, slug, or name." } },
      required: ["workspace"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const target = await resolveWorkspace(identity, args?.workspace);
      const workspace = await prisma.workspace.findUnique({
        where: { id: target.id },
        select: { ownerId: true, name: true },
      });

      if (workspace?.ownerId === identity.userId) {
        throw new McpError("The owner cannot leave. Use delete_workspace instead.");
      }

      await prisma.workspaceMember.delete({
        where: { userId_workspaceId: { userId: identity.userId, workspaceId: target.id } },
      });

      return { left: true, id: target.id, name: workspace?.name ?? target.name };
    },
  },

  {
    name: "list_members",
    title: "List members",
    description: "List a workspace's members and any invites still pending.",
    readOnly: true,
    inputSchema: {
      type: "object",
      properties: { workspace: { type: "string", description: "Workspace id, slug, or name." } },
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const workspace = await resolveWorkspace(identity, args?.workspace);
      await requireMembership(identity, workspace.id);

      const [members, invites] = await Promise.all([
        prisma.workspaceMember.findMany({
          where: { workspaceId: workspace.id },
          select: {
            role: true,
            joinedAt: true,
            user: { select: { id: true, name: true, email: true } },
          },
          orderBy: { joinedAt: "asc" },
        }),
        prisma.workspaceInvite.findMany({
          where: { workspaceId: workspace.id },
          select: { id: true, email: true, expiresAt: true, createdAt: true },
          orderBy: { createdAt: "desc" },
        }),
      ]);

      const now = Date.now();
      return {
        workspace: { id: workspace.id, name: workspace.name },
        members: members.map((member) => ({
          userId: member.user.id,
          name: member.user.name,
          email: member.user.email,
          role: member.role,
          joinedAt: member.joinedAt.toISOString(),
        })),
        pendingInvites: invites.map((invite) => ({
          id: invite.id,
          email: invite.email,
          expiresAt: invite.expiresAt.toISOString(),
          expired: invite.expiresAt.getTime() < now,
        })),
      };
    },
  },

  {
    name: "invite_member",
    title: "Invite member",
    description:
      "Invite someone to a workspace by email. Owner only. Sends the invitation email and returns the link, which is valid for seven days.",
    inputSchema: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Workspace id, slug, or name." },
        email: { type: "string", description: "Who to invite." },
      },
      required: ["email"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const target = await resolveWorkspace(identity, args?.workspace);
      const workspace = await requireOwner(identity, target.id);

      const rawEmail = args?.email;
      if (!isValidEmail(rawEmail)) throw new McpError("`email` is not a valid address.");
      // Invites are matched against the signed-in address on acceptance, so both
      // sides must be normalised the same way.
      const email = rawEmail.trim().toLowerCase();

      const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (existingUser) {
        const member = await prisma.workspaceMember.findUnique({
          where: { userId_workspaceId: { userId: existingUser.id, workspaceId: workspace.id } },
          select: { id: true },
        });
        if (member) throw new McpError(`${email} is already a member of ${workspace.name}.`);
      }

      const token = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + INVITE_EXPIRY_HOURS * 60 * 60 * 1000);

      // Re-inviting refreshes the token and the clock rather than erroring.
      const invite = await prisma.workspaceInvite.upsert({
        where: { email_workspaceId: { email, workspaceId: workspace.id } },
        create: { email, workspaceId: workspace.id, token, expiresAt },
        update: { token, expiresAt },
        select: { id: true, email: true, token: true, expiresAt: true },
      });

      const inviteUrl = absoluteUrl(`/invites/${invite.token}`);
      // A failed send is worth reporting, but the invite link still works.
      const emailed = await sendInviteEmail(email, workspace.name, inviteUrl)
        .then(() => true)
        .catch(() => false);

      return {
        invited: true,
        id: invite.id,
        email: invite.email,
        workspace: workspace.name,
        inviteUrl,
        emailSent: emailed,
        expiresAt: invite.expiresAt.toISOString(),
      };
    },
  },

  {
    name: "revoke_invite",
    title: "Revoke invite",
    description: "Cancel a pending invitation so its link stops working. Owner only.",
    destructive: true,
    inputSchema: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Workspace id, slug, or name." },
        email: { type: "string", description: "The invited address." },
      },
      required: ["email"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const target = await resolveWorkspace(identity, args?.workspace);
      const workspace = await requireOwner(identity, target.id);
      const email = String(args?.email ?? "").trim().toLowerCase();

      const removed = await prisma.workspaceInvite.deleteMany({
        where: { workspaceId: workspace.id, email },
      });

      if (removed.count === 0) throw new McpError(`No pending invite for ${email}.`);
      return { revoked: true, email, workspace: workspace.name };
    },
  },

  {
    name: "remove_member",
    title: "Remove member",
    description:
      "Remove someone from a workspace. Owner only. Pages they wrote stay behind; the owner cannot be removed.",
    destructive: true,
    inputSchema: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Workspace id, slug, or name." },
        userId: { type: "string", description: "The member's user id, from list_members." },
        email: { type: "string", description: "The member's email, if the id is unknown." },
      },
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const target = await resolveWorkspace(identity, args?.workspace);
      const workspace = await requireOwner(identity, target.id);

      const userId =
        String(args?.userId ?? "") ||
        (
          await prisma.user.findUnique({
            where: { email: String(args?.email ?? "").trim().toLowerCase() },
            select: { id: true },
          })
        )?.id;

      if (!userId) throw new McpError("Pass `userId` or the `email` of an existing account.");
      if (userId === workspace.ownerId) {
        throw new McpError("The owner cannot be removed from their own workspace.");
      }

      const removed = await prisma.workspaceMember.deleteMany({
        where: { workspaceId: workspace.id, userId },
      });

      if (removed.count === 0) throw new McpError("That person is not a member of this workspace.");
      return { removed: true, userId, workspace: workspace.name };
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
    name: "get_page_tree",
    title: "Get page tree",
    description:
      "Return a workspace's whole page hierarchy as a nested tree in one call. Use this instead of walking list_pages when you need the shape of everything.",
    readOnly: true,
    inputSchema: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Workspace id, slug, or name." },
        rootId: { type: "string", description: "Start at this page instead of the top level." },
      },
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const workspace = await resolveWorkspace(identity, args?.workspace);
      await requireMembership(identity, workspace.id);

      const pages = await prisma.page.findMany({
        where: { workspaceId: workspace.id },
        select: { id: true, title: true, icon: true, parentId: true, updatedAt: true },
        orderBy: { createdAt: "asc" },
      });

      // One pass to build the index, one to link children: no N+1 queries.
      type Node = {
        id: string;
        title: string;
        icon: string | null;
        url: string;
        updatedAt: string;
        children: Node[];
      };
      const nodes = new Map<string, Node>();
      for (const page of pages) {
        nodes.set(page.id, {
          id: page.id,
          title: page.title,
          icon: page.icon,
          url: pageUrl(workspace.id, page.id),
          updatedAt: page.updatedAt.toISOString(),
          children: [],
        });
      }

      const roots: Node[] = [];
      for (const page of pages) {
        const node = nodes.get(page.id)!;
        const parent = page.parentId ? nodes.get(page.parentId) : undefined;
        if (parent) parent.children.push(node);
        else roots.push(node);
      }

      const rootId = args?.rootId ? String(args.rootId) : null;
      const tree = rootId ? [nodes.get(rootId)].filter(Boolean) : roots;
      if (rootId && tree.length === 0) throw new McpError(`No page "${rootId}" in this workspace.`);

      return {
        workspace: { id: workspace.id, name: workspace.name, slug: workspace.slug },
        pageCount: pages.length,
        tree,
      };
    },
  },

  {
    name: "move_page",
    title: "Move page",
    description:
      "Re-parent a page, move it to the top level (`parentId: null`), or move it into another workspace this token can access. Child pages travel with it.",
    inputSchema: {
      type: "object",
      properties: {
        pageId: { type: "string", description: "The page to move." },
        parentId: {
          type: ["string", "null"],
          description: "New parent page id, or null to move it to the top level.",
        },
        workspace: {
          type: "string",
          description: "Move into this workspace. Only valid together with parentId: null.",
        },
      },
      required: ["pageId"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const page = await resolvePage(identity, String(args?.pageId ?? ""));
      const parentId = args?.parentId === undefined ? undefined : args.parentId;

      let workspaceId = page.workspaceId;
      if (args?.workspace) {
        const destination = await resolveWorkspace(identity, args.workspace);
        workspaceId = destination.id;
        if (workspaceId !== page.workspaceId && parentId) {
          throw new McpError("Moving between workspaces requires parentId: null.");
        }
      }

      if (parentId) {
        const parent = await resolvePage(identity, String(parentId));
        if (parent.workspaceId !== workspaceId) {
          throw new McpError("The new parent is in a different workspace.");
        }
        if (parent.id === page.id) throw new McpError("A page cannot be its own parent.");
        // Re-parenting into your own subtree would orphan the whole branch.
        if (await isDescendant(parent.id, page.id)) {
          throw new McpError("That would nest the page inside its own subtree.");
        }
      }

      const movedWorkspace = workspaceId !== page.workspaceId;
      const descendants = movedWorkspace ? await collectSubtree(page.id) : [];

      const updated = await prisma.$transaction(async (tx) => {
        // A workspace move has to carry the whole subtree, and every slug in it
        // must be re-checked for uniqueness against the destination.
        for (const child of descendants) {
          await tx.page.update({
            where: { id: child.id },
            data: { workspaceId, slug: await uniqueSlugIn(tx, workspaceId, child.title) },
          });
        }

        return tx.page.update({
          where: { id: page.id },
          data: {
            ...(parentId !== undefined ? { parentId: parentId ? String(parentId) : null } : {}),
            ...(movedWorkspace
              ? { workspaceId, slug: await uniqueSlugIn(tx, workspaceId, page.title) }
              : {}),
          },
          select: { id: true, title: true, parentId: true, workspaceId: true },
        });
      });

      return {
        ...updated,
        movedPages: descendants.length + 1,
        url: pageUrl(updated.workspaceId, updated.id),
      };
    },
  },

  {
    name: "duplicate_page",
    title: "Duplicate page",
    description:
      "Copy a page, optionally with its whole subtree, into the same workspace or another one. Useful for reusing a template.",
    inputSchema: {
      type: "object",
      properties: {
        pageId: { type: "string", description: "The page to copy." },
        title: { type: "string", description: "Title for the copy. Defaults to \"<title> (copy)\"." },
        parentId: { type: "string", description: "Put the copy under this page." },
        workspace: { type: "string", description: "Put the copy in this workspace." },
        includeChildren: { type: "boolean", description: "Copy the whole subtree (default true)." },
      },
      required: ["pageId"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const source = await resolvePage(identity, String(args?.pageId ?? ""));
      const includeChildren = args?.includeChildren !== false;

      let workspaceId = source.workspaceId;
      let parentId: string | null = null;

      if (args?.parentId) {
        const parent = await resolvePage(identity, String(args.parentId));
        workspaceId = parent.workspaceId;
        parentId = parent.id;
      } else if (args?.workspace) {
        workspaceId = (await resolveWorkspace(identity, args.workspace)).id;
      }

      let copied = 0;

      // Depth-first so each copy already knows its new parent's id.
      const copyInto = async (sourceId: string, newParentId: string | null, titleOverride?: string) => {
        const original = await prisma.page.findUnique({ where: { id: sourceId } });
        if (!original) return null;

        const title = titleOverride ?? original.title;
        const copy = await prisma.page.create({
          data: {
            title,
            slug: await uniqueSlug(workspaceId, title),
            content: original.content,
            icon: original.icon,
            coverImage: original.coverImage,
            workspaceId,
            createdById: identity.userId,
            parentId: newParentId,
            // A copy is always private: sharing is a decision about the copy.
            shareType: "private",
          },
          select: { id: true, title: true },
        });
        copied += 1;

        if (includeChildren) {
          const children = await prisma.page.findMany({
            where: { parentId: sourceId },
            select: { id: true },
            orderBy: { createdAt: "asc" },
          });
          for (const child of children) await copyInto(child.id, copy.id);
        }
        return copy;
      };

      const root = await copyInto(
        source.id,
        parentId,
        args?.title ? String(args.title) : `${source.title} (copy)`
      );

      return {
        id: root!.id,
        title: root!.title,
        pagesCopied: copied,
        workspaceId,
        url: pageUrl(workspaceId, root!.id),
      };
    },
  },

  {
    name: "create_pages",
    title: "Create pages in bulk",
    description:
      "Create several pages in one call, each optionally with its own children -- the fast way to scaffold a whole section. Every page body is Markdown.",
    inputSchema: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Workspace id, slug, or name." },
        parentId: { type: "string", description: "Nest everything under this existing page." },
        pages: {
          type: "array",
          description: "Pages to create, in order.",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              markdown: { type: "string" },
              icon: { type: "string" },
              children: {
                type: "array",
                description: "Child pages, same shape. Nests one level per array.",
                items: { type: "object" },
              },
            },
            required: ["title"],
          },
        },
      },
      required: ["pages"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const list = Array.isArray(args?.pages) ? args.pages : [];
      if (list.length === 0) throw new McpError("`pages` must be a non-empty array.");

      let workspaceId: string;
      let rootParentId: string | null = null;
      if (args?.parentId) {
        const parent = await resolvePage(identity, String(args.parentId));
        workspaceId = parent.workspaceId;
        rootParentId = parent.id;
      } else {
        workspaceId = (await resolveWorkspace(identity, args?.workspace)).id;
      }

      let created = 0;
      // 200 pages is far past any sane scaffold and keeps one call bounded.
      const LIMIT = 200;

      const createLevel = async (
        entries: any[],
        parentId: string | null
      ): Promise<Array<Record<string, unknown>>> => {
        const results = [];
        for (const entry of entries) {
          if (created >= LIMIT) throw new McpError(`Refusing to create more than ${LIMIT} pages in one call.`);
          const title = String(entry?.title ?? "").trim();
          if (!title) throw new McpError("Every page needs a non-empty `title`.");

          const page = await prisma.page.create({
            data: {
              title,
              slug: await uniqueSlug(workspaceId, title),
              icon: entry?.icon || "📄",
              content: markdownToHtml(String(entry?.markdown ?? "")),
              workspaceId,
              createdById: identity.userId,
              parentId,
            },
            select: { id: true, title: true },
          });
          created += 1;

          const children = Array.isArray(entry?.children)
            ? await createLevel(entry.children, page.id)
            : [];

          results.push({ ...page, url: pageUrl(workspaceId, page.id), children });
        }
        return results;
      };

      const pages = await createLevel(list, rootParentId);
      return { created, workspaceId, pages };
    },
  },

  {
    name: "set_page_cover",
    title: "Set page cover",
    description:
      "Set or clear a page's cover image. Pass an image URL, or one of the built-in gradient names, or null to remove it.",
    inputSchema: {
      type: "object",
      properties: {
        pageId: { type: "string" },
        cover: {
          type: ["string", "null"],
          description:
            "An https image URL, a built-in gradient name (slate, dusk, moss, clay, steel, sand, ink, rose), or null to clear.",
        },
      },
      required: ["pageId"],
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const page = await resolvePage(identity, String(args?.pageId ?? ""));
      const raw = args?.cover;

      let coverImage: string | null = null;
      if (typeof raw === "string" && raw.trim()) {
        const value = raw.trim();
        if (COVER_GRADIENT_IDS.includes(value)) {
          coverImage = `gradient:${value}`;
        } else if (value.startsWith("gradient:") && COVER_GRADIENT_IDS.includes(value.slice(9))) {
          coverImage = value;
        } else if (/^https?:\/\//i.test(value)) {
          coverImage = value;
        } else {
          throw new McpError(
            `\`cover\` must be an http(s) URL or one of: ${COVER_GRADIENT_IDS.join(", ")}.`
          );
        }
      }

      const updated = await prisma.page.update({
        where: { id: page.id },
        data: { coverImage },
        select: { id: true, title: true, coverImage: true },
      });

      return { ...updated, url: pageUrl(page.workspaceId, page.id) };
    },
  },

  {
    name: "list_recent_pages",
    title: "List recent pages",
    description:
      "The most recently edited pages across every workspace this token can access. Good opening move when the user says \"what was I working on\".",
    readOnly: true,
    inputSchema: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Restrict to one workspace." },
        limit: { type: "number", description: "Maximum pages (default 20, max 100)." },
      },
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const workspaceFilter = args?.workspace
        ? { id: (await resolveWorkspace(identity, args.workspace)).id }
        : { members: { some: { userId: identity.userId } } };

      const pages = await prisma.page.findMany({
        where: { workspace: workspaceFilter },
        select: {
          id: true,
          title: true,
          icon: true,
          updatedAt: true,
          workspace: { select: { id: true, name: true } },
        },
        orderBy: { updatedAt: "desc" },
        take: Math.min(Math.max(Number(args?.limit) || 20, 1), 100),
      });

      return {
        pages: pages.map((page) => ({
          id: page.id,
          title: page.title,
          icon: page.icon,
          workspace: page.workspace.name,
          url: pageUrl(page.workspace.id, page.id),
          updatedAt: page.updatedAt.toISOString(),
        })),
      };
    },
  },

  {
    name: "export_workspace",
    title: "Export workspace",
    description:
      "Export every page in a workspace as Markdown in one call, in tree order with heading levels reflecting nesting. Use it to summarise, migrate, or back up a workspace.",
    readOnly: true,
    inputSchema: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Workspace id, slug, or name." },
        rootId: { type: "string", description: "Export only this page and its children." },
        maxPages: { type: "number", description: "Safety cap (default 200, max 500)." },
      },
      additionalProperties: false,
    },
    handler: async (args, identity) => {
      const workspace = await resolveWorkspace(identity, args?.workspace);
      await requireMembership(identity, workspace.id);
      const cap = Math.min(Math.max(Number(args?.maxPages) || 200, 1), 500);

      const pages = await prisma.page.findMany({
        where: { workspaceId: workspace.id },
        select: { id: true, title: true, icon: true, content: true, parentId: true },
        orderBy: { createdAt: "asc" },
      });

      const byParent = new Map<string | null, typeof pages>();
      for (const page of pages) {
        const key = page.parentId;
        byParent.set(key, [...(byParent.get(key) ?? []), page]);
      }

      const documents: Array<{ id: string; title: string; depth: number; markdown: string }> = [];
      let truncated = false;

      const walk = (parentId: string | null, depth: number) => {
        for (const page of byParent.get(parentId) ?? []) {
          if (documents.length >= cap) {
            truncated = true;
            return;
          }
          documents.push({
            id: page.id,
            title: page.title,
            depth,
            markdown: htmlToMarkdown(page.content ?? ""),
          });
          walk(page.id, depth + 1);
        }
      };

      const rootId = args?.rootId ? String(args.rootId) : null;
      if (rootId) {
        const root = pages.find((page) => page.id === rootId);
        if (!root) throw new McpError(`No page "${rootId}" in this workspace.`);
        documents.push({
          id: root.id,
          title: root.title,
          depth: 0,
          markdown: htmlToMarkdown(root.content ?? ""),
        });
        walk(root.id, 1);
      } else {
        walk(null, 0);
      }

      const markdown = documents
        .map((doc) => `${"#".repeat(Math.min(doc.depth + 1, 6))} ${doc.title}\n\n${doc.markdown}`.trim())
        .join("\n\n---\n\n");

      return {
        workspace: { id: workspace.id, name: workspace.name, slug: workspace.slug },
        pageCount: documents.length,
        truncated,
        pages: documents.map(({ id, title, depth }) => ({ id, title, depth })),
        markdown,
      };
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
