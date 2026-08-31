"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PageSummary } from "@/lib/types";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { FileText, LayoutGrid, Plug, Plus } from "lucide-react";

interface CommandPaletteProps {
  workspaceId: string;
  pages: PageSummary[];
  workspaces: { id: string; name: string }[];
  onNewPage: () => void;
  onNewWorkspace: () => void;
}

/** ⌘K / Ctrl+K quick switcher for pages, workspaces, and common actions. */
export function CommandPalette({
  workspaceId,
  pages,
  workspaces,
  onNewPage,
  onNewWorkspace,
}: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Quick switcher"
      description="Jump to a page, switch workspace, or start something new"
    >
      <CommandInput placeholder="Search pages, workspaces, actions…" />
      <CommandList>
        <CommandEmpty>Nothing matches that.</CommandEmpty>

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(onNewPage)}>
            <Plus className="mr-2 h-4 w-4" />
            New page
          </CommandItem>
          <CommandItem onSelect={() => run(onNewWorkspace)}>
            <LayoutGrid className="mr-2 h-4 w-4" />
            New workspace
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/settings/connections"))}>
            <Plug className="mr-2 h-4 w-4" />
            Connections &amp; API tokens
          </CommandItem>
        </CommandGroup>

        {pages.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Pages">
              {pages.map((page) => (
                <CommandItem
                  key={page.id}
                  value={`${page.title} ${page.id}`}
                  onSelect={() =>
                    run(() => router.push(`/workspaces/${workspaceId}/pages/${page.id}`))
                  }
                >
                  <span className="mr-2 w-4 text-center">
                    {page.icon || <FileText className="h-4 w-4" />}
                  </span>
                  {page.title || "Untitled"}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {workspaces.length > 1 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Workspaces">
              {workspaces
                .filter((workspace) => workspace.id !== workspaceId)
                .map((workspace) => (
                  <CommandItem
                    key={workspace.id}
                    value={`workspace ${workspace.name}`}
                    onSelect={() => run(() => router.push(`/workspaces/${workspace.id}`))}
                  >
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    {workspace.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
