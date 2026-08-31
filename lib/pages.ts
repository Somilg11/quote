/**
 * Client-side page creation.
 *
 * Notion creates a page the moment you click "New page" and drops you straight into
 * it, so there is no intermediate form. Everything is renamed in place afterwards.
 */

export interface CreatedPage {
  id: string;
  title: string;
  icon: string | null;
  workspaceId: string;
}

export async function createPage(
  workspaceId: string,
  options: { parentId?: string; title?: string; icon?: string } = {}
): Promise<CreatedPage> {
  const response = await fetch(`/api/workspaces/${workspaceId}/pages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: options.title ?? "Untitled",
      icon: options.icon,
      parentId: options.parentId,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Could not create the page");

  return data.page as CreatedPage;
}

export const pageHref = (workspaceId: string, pageId: string) =>
  `/workspaces/${workspaceId}/pages/${pageId}`;
