"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Page, Workspace } from "@/lib/prisma-client";
import { Button } from "@/components/ui/button";
import { FileText, Home, MoreHorizontal, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import { WorkspaceSwitcher } from "@/components/workspace/workspace-switcher";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  workspaceId: string;
  workspaces: Workspace[];
  pages: Page[];
  onNewPage?: () => void;
}

export function Sidebar({
  workspaceId,
  workspaces,
  pages,
  onNewPage,
}: SidebarProps) {
  const params = useParams<{ pageId?: string }>();
  const router = useRouter();
  const currentPageId = params?.pageId;
  const [query, setQuery] = useState("");
  const [deletingPageId, setDeletingPageId] = useState<string | null>(null);
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);
  const filteredPages = useMemo(
    () =>
      pages.filter((page) =>
        page.title.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [pages, query]
  );

  const deletePage = async () => {
    if (!pageToDelete) return;
    const pageId = pageToDelete.id;
    setDeletingPageId(pageId);

    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete page");
      }

      if (currentPageId === pageId) {
        router.push(`/workspaces/${workspaceId}`);
      }
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete page");
    } finally {
      setDeletingPageId(null);
      setPageToDelete(null);
    }
  };

  return (
    <aside className="flex max-h-80 w-full shrink-0 flex-col border-b border-[#2f2f2f] bg-[#202020] text-[#f1f1ef] md:h-screen md:max-h-none md:w-64 md:border-b-0 md:border-r">
      <div className="p-2">
        <WorkspaceSwitcher workspaces={workspaces} currentWorkspaceId={workspaceId} />
      </div>

      <div className="px-2 pb-2 space-y-1 text-sm text-[#b8b8b8]">
        <label className="flex w-full items-center gap-2 rounded-md bg-[#2a2a2a] px-2 py-1.5 transition-all duration-200 focus-within:bg-[#333333]">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages"
            className="min-w-0 flex-1 bg-transparent text-sm text-[#f1f1ef] placeholder:text-[#858585] outline-none"
          />
        </label>
        <Link 
          href={`/workspaces/${workspaceId}`}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-all duration-200 hover:bg-[#2f2f2f] hover:text-[#f7f7f5]"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
      </div>

      <div className="px-2 py-2">
        <Button
          onClick={onNewPage}
          asChild={!onNewPage}
          className="h-8 w-full justify-start gap-2 rounded-md bg-transparent px-2 text-sm font-medium text-[#b8b8b8] shadow-none transition-all duration-200 hover:bg-[#2f2f2f] hover:text-[#f7f7f5]"
          size="sm"
        >
          {onNewPage ? (
            <>
              <Plus className="h-4 w-4" />
              New page
            </>
          ) : (
            <Link href={`/workspaces/${workspaceId}/pages/new`}>
              <Plus className="h-4 w-4" />
              New page
            </Link>
          )}
        </Button>
      </div>

      <div className="px-4 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wide text-[#858585]">
        Private
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {filteredPages.length === 0 ? (
          <div className="mx-2 mt-4 rounded-md border border-dashed border-[#3f3f3f] bg-[#252525] px-3 py-5 text-center">
            <Sparkles className="h-5 w-5 text-[#858585] mx-auto mb-2" />
            <p className="text-sm text-[#9b9b9b]">{query ? "No matching pages" : "No pages yet"}</p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {filteredPages.map((page) => (
              <Link
                key={page.id}
                href={`/workspaces/${workspaceId}/pages/${page.id}`}
                className={`group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-all duration-200 ${
                  currentPageId === page.id
                    ? "bg-[#333333] text-[#f7f7f5]"
                    : "text-[#b8b8b8] hover:bg-[#2f2f2f] hover:text-[#f7f7f5]"
                }`}
              >
                <span className="grid h-5 w-5 place-items-center text-base">{page.icon || <FileText className="h-4 w-4" />}</span>
                <span className="min-w-0 flex-1 truncate">{page.title || "Untitled"}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(event) => event.preventDefault()}>
                    <button className="grid h-6 w-6 place-items-center rounded opacity-0 transition-all hover:bg-[#454545] group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44 rounded-lg border-[#3f3f3f] bg-[#252525] p-1 text-[#f1f1ef] shadow-xl" align="start">
                    <DropdownMenuItem
                      className="gap-2 rounded-md text-[#ff7369] focus:bg-[#3a2928] focus:text-[#ff8a82]"
                      disabled={deletingPageId === page.id}
                      onClick={(event) => {
                        event.preventDefault();
                        setPageToDelete(page);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingPageId === page.id ? "Deleting..." : "Delete page"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Link>
            ))}
          </div>
        )}
      </nav>
      <AlertDialog open={!!pageToDelete} onOpenChange={(open) => !open && setPageToDelete(null)}>
        <AlertDialogContent className="border-[#3f3f3f] bg-[#252525] text-[#f1f1ef]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this page?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#b8b8b8]">
              “{pageToDelete?.title || "Untitled"}” will be permanently deleted. This action cannot be undone.
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
              {deletingPageId ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  );
}
