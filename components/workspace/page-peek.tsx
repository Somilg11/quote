"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Workspace } from "@/lib/prisma-client";
import type { EditablePage, SafeMember } from "@/lib/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { PageEditor } from "@/components/workspace/page-editor";
import { EditorSkeleton } from "@/components/editor/editor-skeleton";
import { pageHref } from "@/lib/pages";

interface PagePeekProps {
  workspace: Workspace;
  members: SafeMember[];
  currentUser: { id: string };
  /** The page to peek at, or null when the panel is closed. */
  pageId: string | null;
  onClose: () => void;
}

/**
 * Notion's peek view: opening a page from a list slides it in beside the list
 * instead of navigating away, with an escape hatch to the full page.
 * The editor inside is the real one, so edits sync exactly as they do full screen.
 */
export function PagePeek({ workspace, members, currentUser, pageId, onClose }: PagePeekProps) {
  const router = useRouter();
  const [page, setPage] = useState<EditablePage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pageId) {
      setPage(null);
      setError(null);
      return;
    }

    let cancelled = false;
    setPage(null);
    setError(null);

    fetch(`/api/pages/${pageId}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Could not open that page");
        if (!cancelled) setPage(data.page as EditablePage);
      })
      .catch((cause) => {
        if (!cancelled) setError(cause instanceof Error ? cause.message : "Could not open that page");
      });

    return () => {
      cancelled = true;
    };
  }, [pageId]);

  const openFullPage = () => {
    if (!pageId) return;
    onClose();
    router.push(pageHref(workspace.id, pageId));
  };

  return (
    <Sheet open={!!pageId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full gap-0 border-l-[#2f2f2f] bg-[#191919] p-0 text-[#f1f1ef] sm:max-w-[720px] lg:max-w-[840px]"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{page?.title || "Page"}</SheetTitle>
          <SheetDescription>
            Peek view. Edits save exactly as they do on the full page.
          </SheetDescription>
        </SheetHeader>

        {error ? (
          <div className="grid h-full place-items-center px-6 text-center">
            <div>
              <p className="text-sm text-[#b8b8b8]">{error}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 text-xs text-[#8f8f8f] underline underline-offset-4 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        ) : !page ? (
          <div className="px-6 py-10">
            <EditorSkeleton />
          </div>
        ) : (
          <PageEditor
            workspace={workspace}
            page={page}
            members={members}
            currentUser={currentUser}
            variant="peek"
            onOpenFullPage={openFullPage}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
