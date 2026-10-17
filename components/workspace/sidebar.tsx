"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { PageSummary } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, LayoutPanelTop, Loader2, MoreHorizontal, Plus, Search, Settings, Trash2, Users } from "lucide-react";
import { SiModelcontextprotocol } from "react-icons/si";
import { createPage, pageHref } from "@/lib/pages";
import { NewWorkspaceDialog } from "@/components/workspace/new-workspace-dialog";
import { WorkspaceSwitcher } from "@/components/workspace/workspace-switcher";
import { CommandPalette } from "@/components/workspace/command-palette";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  workspaceId: string;
  workspaces: { id: string; name: string }[];
  pages: PageSummary[];
  onPagesChange?: (pages: PageSummary[]) => void;
}

type PageNode = PageSummary & { children: PageNode[] };

export function Sidebar({
  workspaceId,
  workspaces,
  pages: initialPages,
  onPagesChange,
}: SidebarProps) {
  const params = useParams<{ pageId?: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const currentPageId = params?.pageId;

  const [query, setQuery] = useState("");
  const [deletingPageId, setDeletingPageId] = useState<string | null>(null);
  const [pageToDelete, setPageToDelete] = useState<PageSummary | null>(null);
  const [pages, setPages] = useState(initialPages);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [creating, setCreating] = useState(false);
  const [newWorkspaceOpen, setNewWorkspaceOpen] = useState(false);

  useEffect(() => setPages(initialPages), [initialPages]);
  useEffect(() => onPagesChange?.(pages), [pages, onPagesChange]);

  const { roots, parentOf } = useMemo(() => {
    const map = new Map<string, PageNode>();
    const parentOf = new Map<string, string>();
    const roots: PageNode[] = [];

    pages.forEach((page) => map.set(page.id, { ...page, children: [] } as PageNode));
    pages.forEach((page) => {
      const node = map.get(page.id)!;
      if (page.parentId && map.has(page.parentId)) {
        map.get(page.parentId)!.children.push(node);
        parentOf.set(page.id, page.parentId);
      } else {
        roots.push(node);
      }
    });

    return { roots, parentOf };
  }, [pages]);

  // Keep the path to the open page unfolded without fighting manual toggles.
  useEffect(() => {
    if (!currentPageId) return;
    setExpanded((previous) => {
      const next = new Set(previous);
      let cursor = parentOf.get(currentPageId);
      while (cursor) {
        next.add(cursor);
        cursor = parentOf.get(cursor);
      }
      return next;
    });
  }, [currentPageId, parentOf]);

  /**
   * Notion creates the page immediately and drops you into it - the title and icon
   * are set in place afterwards, so there is no form to fill in first.
   */
  const addPage = useCallback(
    async (parentId?: string) => {
      if (creating) return;
      setCreating(true);
      try {
        const page = await createPage(workspaceId, { parentId });
        if (parentId) setExpanded((previous) => new Set(previous).add(parentId));
        router.push(pageHref(workspaceId, page.id));
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Could not create the page");
      } finally {
        setCreating(false);
      }
    },
    [creating, router, workspaceId]
  );

  const toggle = useCallback((pageId: string) => {
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(pageId)) next.delete(pageId);
      else next.add(pageId);
      return next;
    });
  }, []);

  const filteredPages = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return pages;
    return pages.filter((page) => page.title.toLowerCase().includes(needle));
  }, [pages, query]);

  const deletePage = async () => {
    if (!pageToDelete) return;
    const { id: pageId, title } = pageToDelete;
    setDeletingPageId(pageId);

    try {
      const response = await fetch(`/api/pages/${pageId}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to delete page");
      }

      setPages((previous) => previous.filter((page) => page.id !== pageId));
      if (currentPageId === pageId) router.push(`/workspaces/${workspaceId}`);
      router.refresh();
      toast.success(`Deleted “${title || "Untitled"}”`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete page");
    } finally {
      setDeletingPageId(null);
      setPageToDelete(null);
    }
  };

  const renderPage = (page: PageNode, depth = 0) => {
    const hasChildren = page.children.length > 0;
    const isOpen = expanded.has(page.id);
    const isActive = currentPageId === page.id;

    return (
      <div key={page.id}>
        <div
          className={`group flex items-center rounded-lg pr-1 transition-colors duration-150 ${
            isActive ? "bg-white/[0.07] text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" : "text-zinc-400 hover:bg-white/[0.04]"
          }`}
          style={{ paddingLeft: `${depth * 14 + 4}px` }}
        >
          {hasChildren ? (
            <button
              type="button"
              aria-label={isOpen ? `Collapse ${page.title}` : `Expand ${page.title}`}
              aria-expanded={isOpen}
              onClick={() => toggle(page.id)}
              className="grid h-5 w-5 shrink-0 place-items-center rounded text-[#8a8a8a] transition-colors hover:bg-[#3a3a3a] hover:text-white"
            >
              <ChevronRight
                className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              />
            </button>
          ) : (
            <span className="h-5 w-5 shrink-0" />
          )}

          <Link
            href={`/workspaces/${workspaceId}/pages/${page.id}`}
            className="flex min-w-0 flex-1 items-center gap-2 py-1.5 text-sm outline-none"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center text-base">
              {page.icon || <FileText className="h-4 w-4" />}
            </span>
            <span className="min-w-0 flex-1 truncate">{page.title || "Untitled"}</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label={`Actions for ${page.title || "Untitled"}`}
                className="grid h-6 w-6 shrink-0 place-items-center rounded text-[#9b9b9b] opacity-0 transition-all duration-150 hover:bg-[#454545] hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 rounded-lg border-[#3f3f3f] bg-[#252525] p-1 text-[#f1f1ef] shadow-xl"
              align="start"
            >
              <DropdownMenuItem
                className="gap-2 rounded-md focus:bg-[#333333] focus:text-white"
                onClick={() => void addPage(page.id)}
              >
                <Plus className="h-4 w-4" />
                Add sub-page
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#3a3a3a]" />
              <DropdownMenuItem
                className="gap-2 rounded-md text-[#ff7369] focus:bg-[#3a2928] focus:text-[#ff8a82]"
                disabled={deletingPageId === page.id}
                onClick={() => setPageToDelete(page)}
              >
                <Trash2 className="h-4 w-4" />
                {deletingPageId === page.id ? "Deleting…" : "Delete page"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {hasChildren && isOpen && (
          <div className="animate-slide-in">
            {page.children.map((child) => renderPage(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="flex max-h-80 w-full shrink-0 flex-col border-b border-white/[0.07] bg-[#1b1b1b] text-[#f1f1ef] md:h-full md:max-h-none md:w-64 md:border-b-0 md:border-r">
      <CommandPalette
        workspaceId={workspaceId}
        pages={pages}
        workspaces={workspaces}
        onNewPage={() => void addPage()}
        onNewWorkspace={() => setNewWorkspaceOpen(true)}
      />

      <NewWorkspaceDialog open={newWorkspaceOpen} onOpenChange={setNewWorkspaceOpen} />

      <div className="p-2">
        <WorkspaceSwitcher workspaces={workspaces} currentWorkspaceId={workspaceId} />
      </div>

      <div className="space-y-1 px-2 pb-2 text-sm text-[#b8b8b8]">
        <label className="flex w-full items-center gap-2 rounded-lg border border-white/[0.07] bg-[#202020] px-2.5 py-2 transition-colors duration-150 focus-within:border-white/20">
          <Search className="h-4 w-4 shrink-0" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages"
            className="min-w-0 flex-1 bg-transparent text-sm text-[#f1f1ef] outline-none placeholder:text-[#858585]"
          />
          <kbd className="hidden shrink-0 rounded border border-[#3f3f3f] px-1 text-[10px] text-[#7a7a7a] sm:block">
            ⌘K
          </kbd>
        </label>

      </div>

      <div className="px-2">
        <p className="px-2.5 pb-1.5 pt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">Workspace</p>
        <Link
          href={`/workspaces/${workspaceId}`}
          className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors duration-150 ${
            !currentPageId && !pathname?.endsWith("/members") ? "bg-white/[0.07] text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100"
          }`}
        >
          <LayoutPanelTop className="h-3.5 w-3.5" strokeWidth={1.6} />
          Overview
        </Link>
        <Link
          href={`/workspaces/${workspaceId}/members`}
          className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors duration-150 ${
            pathname?.endsWith("/members") ? "bg-white/[0.07] text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100"
          }`}
        >
          <Users className="h-3.5 w-3.5" strokeWidth={1.6} />
          Members
        </Link>
        <button
          type="button"
          onClick={() => void addPage()}
          disabled={creating}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-zinc-400 transition-colors duration-150 hover:bg-white/[0.05] hover:text-zinc-100 disabled:opacity-60"
        >
          {creating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" strokeWidth={1.6} />}
          New page
        </button>
      </div>

      <div className="flex items-center justify-between px-4 pb-1.5 pt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">
        {query ? "Results" : "Pages"}
        <button
          type="button"
          aria-label="New page"
          title="New page"
          onClick={() => void addPage()}
          className="grid h-5 w-5 place-items-center rounded transition-colors hover:bg-[#2f2f2f] hover:text-white"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {(query ? filteredPages : roots).length === 0 ? (
          <div className="mx-2 mt-3 rounded-md border border-dashed border-[#3f3f3f] bg-[#252525] px-3 py-6 text-center">
            <FileText className="mx-auto mb-2 h-5 w-5 text-[#858585]" />
            <p className="text-sm text-[#9b9b9b]">
              {query ? "No matching pages" : "No pages yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {query
              ? filteredPages.map((page) => (
                  <Link
                    key={page.id}
                    href={`/workspaces/${workspaceId}/pages/${page.id}`}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors duration-150 ${
                      currentPageId === page.id
                        ? "bg-white/[0.07] text-zinc-100"
                        : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
                    }`}
                  >
                    <span className="grid h-5 w-5 place-items-center text-base">
                      {page.icon || <FileText className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{page.title || "Untitled"}</span>
                  </Link>
                ))
              : roots.map((page) => renderPage(page))}
          </div>
        )}
      </nav>

      <div className="hidden border-t border-white/[0.07] px-2 pb-3 md:block">
        <p className="px-2.5 pb-1.5 pt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">Connect</p>
        <Link
          href="/settings/connections"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-100"
        >
          <SiModelcontextprotocol className="h-3.5 w-3.5" />
          MCP connection
        </Link>
        <p className="px-2.5 pb-1.5 pt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">Account</p>
        <Link
          href="/settings/appearance"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-100"
        >
          <Settings className="h-3.5 w-3.5" strokeWidth={1.6} />
          Settings
        </Link>
      </div>

      <AlertDialog open={!!pageToDelete} onOpenChange={(open) => !open && setPageToDelete(null)}>
        <AlertDialogContent className="border-[#3f3f3f] bg-[#252525] text-[#f1f1ef]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this page?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#b8b8b8]">
              “{pageToDelete?.title || "Untitled"}” and any sub-pages will be permanently
              deleted. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#3f3f3f] bg-transparent text-[#f1f1ef] hover:bg-[#333333] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deletePage}
              className="bg-[#ff7369] text-[#191919] hover:bg-[#ff8a82]"
            >
              {deletingPageId ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  );
}
