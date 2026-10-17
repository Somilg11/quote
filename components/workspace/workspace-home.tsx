"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Workspace } from "@/lib/prisma-client";
import type { PageSummary, SafeMember } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorkspaceInviteDialog } from "@/components/workspace/workspace-invite-dialog";
import { FileText, Loader2, LogOut, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { createPage, pageHref } from "@/lib/pages";
import { PagePeek } from "@/components/workspace/page-peek";
import { DeleteWorkspaceDialog } from "@/components/workspace/delete-workspace-dialog";
import { LeaveWorkspaceDialog } from "@/components/workspace/leave-workspace-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WorkspaceHomeProps {
  workspace: Workspace;
  pages: PageSummary[];
  members: SafeMember[];
  currentUser: { id: string };
}

export function WorkspaceHome({ workspace, pages, members, currentUser }: WorkspaceHomeProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [peekPageId, setPeekPageId] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [confirmingLeave, setConfirmingLeave] = useState(false);
  const isOwner = workspace.ownerId === currentUser.id;
  const editedThisWeek = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return pages.filter((page) => new Date(page.updatedAt).getTime() > cutoff).length;
  }, [pages]);

  const addPage = useCallback(async () => {
    if (creating) return;
    setCreating(true);
    try {
      const page = await createPage(workspace.id);
      router.push(pageHref(workspace.id, page.id));
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create the page");
    } finally {
      setCreating(false);
    }
  }, [creating, router, workspace.id]);
  const filteredPages = useMemo(
    () =>
      pages.filter((page) =>
        page.title.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [pages, query]
  );

  return (
    <>
      <div className="relative mx-auto max-w-5xl font-[family-name:var(--font-poppins)] text-zinc-100">
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-3 hidden border-l border-dotted border-white/[0.12] sm:block" />
        <span aria-hidden className="pointer-events-none absolute inset-y-0 right-3 hidden border-r border-dotted border-white/[0.12] sm:block" />

        {/* Hero */}
        <header className="flex flex-col gap-6 px-5 pb-10 pt-10 sm:px-14 sm:pt-16 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h1 className="text-balance text-4xl font-normal leading-[1.02] tracking-[-0.05em] sm:text-6xl">
              <span className="block truncate">{workspace.name}.</span>
              <span className="block text-zinc-500">
                {pages.length === 0 ? "A blank page awaits." : "Everything in one place."}
              </span>
            </h1>
            {workspace.description && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-500">{workspace.description}</p>
            )}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <div className="mr-1 flex -space-x-2" aria-label={`${members.length} collaborators`}>
              {members.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  className="grid h-8 w-8 place-items-center rounded-lg border-2 border-[#191919] bg-[#333333] text-xs font-medium text-zinc-100"
                  title={member.user.email || member.user.name || "Collaborator"}
                >
                  {(member.user.name || member.user.email || "U").charAt(0).toUpperCase()}
                </div>
              ))}
              {members.length > 4 && (
                <div className="grid h-8 w-8 place-items-center rounded-lg border-2 border-[#191919] bg-[#2a2a2a] text-[11px] text-zinc-400">
                  +{members.length - 4}
                </div>
              )}
            </div>
            {isOwner && <WorkspaceInviteDialog workspaceId={workspace.id} />}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Workspace settings"
                  className="grid h-9 w-9 place-items-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 rounded-lg border-[#3f3f3f] bg-[#252525] p-1 text-[#f1f1ef] shadow-xl"
              >
                {isOwner ? (
                  <DropdownMenuItem
                    className="gap-2 rounded-md text-[#ff7369] focus:bg-[#3a2928] focus:text-[#ff8a82]"
                    onSelect={(event) => {
                      event.preventDefault();
                      setConfirmingDelete(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete workspace
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="gap-2 rounded-md text-[#ff7369] focus:bg-[#3a2928] focus:text-[#ff8a82]"
                    onSelect={(event) => {
                      event.preventDefault();
                      setConfirmingLeave(true);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Leave workspace
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => void addPage()}
              disabled={creating}
              className="h-10 rounded-lg bg-gradient-to-b from-zinc-50 to-zinc-300 px-5 text-zinc-900 shadow-[0_0_0_3px_rgba(255,255,255,0.06),inset_0_1px_0_#fff] transition-transform hover:from-white hover:to-zinc-200 active:scale-[0.98]"
            >
              {creating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              New page
            </Button>
          </div>
        </header>

        {/* Overview */}
        <section className="relative border-t border-white/[0.07]">
          <span aria-hidden className="absolute left-3 top-0 hidden -translate-x-1/2 -translate-y-1/2 select-none text-sm font-light leading-none text-zinc-600 sm:block">+</span>
          <span aria-hidden className="absolute right-3 top-0 hidden translate-x-1/2 -translate-y-1/2 select-none text-sm font-light leading-none text-zinc-600 sm:block">+</span>
          <div className="grid gap-5 px-5 py-8 sm:grid-cols-[200px_1fr] sm:px-14 sm:py-10">
            <div>
              <p className="text-sm text-zinc-100">Overview</p>
              <p className="mt-1.5 text-xs text-zinc-500">Live counts for this workspace.</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: pages.length, label: "Pages" },
                { value: members.length, label: "Members" },
                { value: editedThisWeek, label: "Edited this week" },
              ].map((stat, i) => (
                <div key={stat.label} className={i > 0 ? "border-l border-white/[0.07] pl-4 sm:pl-6" : ""}>
                  <p className="text-3xl font-light tabular-nums tracking-[-0.04em] sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pages */}
        <section className="border-t border-white/[0.07]">
          <div className="grid gap-5 px-5 py-8 sm:grid-cols-[200px_1fr] sm:px-14 sm:py-10">
            <div>
              <p className="text-sm text-zinc-100">Pages</p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">Search and open anything here.</p>
            </div>
            <div className="min-w-0">
              <label className="mb-4 flex items-center gap-2 rounded-xl border border-white/10 bg-[#202020] px-3 py-2.5 transition-colors focus-within:border-white/25">
                <Search className="h-4 w-4 text-zinc-500" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search pages in this workspace"
                  className="h-auto border-0 bg-transparent p-0 text-sm text-zinc-100 shadow-none placeholder:text-zinc-500 focus-visible:ring-0"
                />
              </label>

              {filteredPages.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/15 py-14 text-center">
                  <FileText className="mx-auto mb-3 h-6 w-6 text-zinc-600" />
                  <p className="text-sm text-zinc-300">{query ? "No matching pages" : "No pages yet"}</p>
                  <p className="mb-5 mt-1 text-xs text-zinc-500">
                    {query ? "Try a different search term." : "Create your first page to start collaborating."}
                  </p>
                  {!query && (
                    <Button
                      onClick={() => void addPage()}
                      disabled={creating}
                      className="h-9 rounded-lg bg-zinc-100 px-4 text-zinc-900 hover:bg-white"
                    >
                      Create page
                    </Button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-dotted divide-white/[0.12] border-y border-dotted border-white/[0.12]">
                  {filteredPages.map((page) => (
                    <Link
                      key={page.id}
                      href={pageHref(workspace.id, page.id)}
                      onClick={(event) => {
                        // Plain click peeks; modified clicks keep the browser's own
                        // new-tab and new-window behaviour.
                        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                        event.preventDefault();
                        setPeekPageId(page.id);
                      }}
                      className="group flex items-center justify-between gap-4 px-1 py-3 transition-colors duration-150 hover:bg-white/[0.03]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center text-lg">{page.icon}</span>
                        <h3 className="truncate text-sm text-zinc-200">{page.title}</h3>
                      </div>
                      <p className="shrink-0 text-xs text-zinc-500">
                        {new Date(page.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Members */}
        <section className="border-t border-white/[0.07]">
          <div className="grid gap-5 px-5 py-8 sm:grid-cols-[200px_1fr] sm:px-14 sm:py-10">
            <div>
              <p className="text-sm text-zinc-100">Members</p>
              <p className="mt-1.5 text-xs text-zinc-500">Who can open this workspace.</p>
            </div>
            <div className="divide-y divide-dotted divide-white/[0.12] border-y border-dotted border-white/[0.12]">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-3 px-1 py-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#2f2f2f] text-xs font-medium">
                    {(member.user.name || member.user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-zinc-200">{member.user.name || "Unnamed user"}</p>
                    <p className="truncate text-xs text-zinc-500">{member.user.email}</p>
                  </div>
                  <span className="ml-auto text-xs capitalize text-zinc-500">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <PagePeek
        workspace={workspace}
        members={members}
        currentUser={currentUser}
        pageId={peekPageId}
        onClose={() => setPeekPageId(null)}
      />

      <DeleteWorkspaceDialog
        workspace={{
          id: workspace.id,
          name: workspace.name,
          pageCount: pages.length,
          memberCount: members.length,
        }}
        open={confirmingDelete}
        onOpenChange={setConfirmingDelete}
      />

      <LeaveWorkspaceDialog
        workspace={{ id: workspace.id, name: workspace.name }}
        open={confirmingLeave}
        onOpenChange={setConfirmingLeave}
      />
    </>
  );
}
