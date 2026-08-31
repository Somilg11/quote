/**
 * Lean shapes for anything that crosses into a client component.
 *
 * Prisma's generated `User` includes the bcrypt hash, and `Page` includes the
 * document body and the Yjs snapshot. Passing those models straight to a client
 * component serialises them into the RSC payload the browser receives, so every
 * boundary selects the fields it actually needs.
 */

export interface SafeUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface SafeMember {
  id: string;
  userId: string;
  role: string;
  user: SafeUser;
}

/** Enough to render the sidebar tree and the page lists. */
export interface PageSummary {
  id: string;
  title: string;
  icon: string | null;
  parentId: string | null;
  shareType: string;
  createdAt: Date;
  updatedAt: Date;
}

/** What the editor needs: the summary plus the body and share state. */
export interface EditablePage extends PageSummary {
  slug: string;
  content: string | null;
  coverImage: string | null;
  shareToken: string | null;
  version: number;
  workspaceId: string;
  createdById: string | null;
  createdBy: Pick<SafeUser, "id" | "name"> | null;
}

/** Prisma `select` clauses matching the shapes above. */
export const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
} as const;

export const pageSummarySelect = {
  id: true,
  title: true,
  icon: true,
  parentId: true,
  shareType: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const editablePageSelect = {
  ...pageSummarySelect,
  slug: true,
  content: true,
  coverImage: true,
  shareToken: true,
  version: true,
  workspaceId: true,
  createdById: true,
  createdBy: { select: { id: true, name: true } },
} as const;
