"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { AccountMenu } from "@/components/workspace/account-menu";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { createPage, pageHref } from "@/lib/pages";
import { NewWorkspaceDialog } from "@/components/workspace/new-workspace-dialog";
import { DeleteWorkspaceDialog } from "@/components/workspace/delete-workspace-dialog";
import { LeaveWorkspaceDialog } from "@/components/workspace/leave-workspace-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpRight,
  FileText,
  LogOut,
  MoreHorizontal,
  Trash2,
  Globe,
  LayoutGrid,
  Loader2,
  PenLine,
  Plug,
  Plus,
  Search,
  Users,
} from "lucide-react";

export interface DashboardStats {
  workspaces: number;
  pages: number;
  collaborators: number;
  editedThisWeek: number;
  publicPages: number;
  tokens: number;
}

export interface RecentPage {
  id: string;
  title: string;
  icon: string | null;
  workspaceId: string;
  workspaceName: string;
  shareType: string;
  updatedLabel: string;
}

export interface DashboardWorkspace {
  id: string;
  name: string;
  description: string | null;
  pageCount: number;
  memberCount: number;
  isOwner: boolean;
  updatedLabel: string;
  members: { id: string; label: string; name: string }[];
}

interface WorkspacesDashboardProps {
  user: { name?: string | null; email?: string | null; image?: string | null };
  greeting: string;
  stats: DashboardStats;
  recentPages: RecentPage[];
  workspaces: DashboardWorkspace[];
}

export function WorkspacesDashboard({
  user,
  greeting,
  stats,
  recentPages,
  workspaces,
}: WorkspacesDashboardProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<DashboardWorkspace | null>(null);
  const [pendingLeave, setPendingLeave] = useState<DashboardWorkspace | null>(null);

  const firstName = (user.name || user.email || "there").split(/[\s@]/)[0];

  const filteredWorkspaces = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return workspaces;
    return workspaces.filter((workspace) =>
      `${workspace.name} ${workspace.description ?? ""}`.toLowerCase().includes(needle)
    );
  }, [workspaces, query]);

  const filteredRecents = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return recentPages;
    return recentPages.filter((page) =>
      `${page.title} ${page.workspaceName}`.toLowerCase().includes(needle)
    );
  }, [recentPages, query]);

  /** New pages land in the most recently touched workspace. */
  const quickCreate = useCallback(async () => {
    const target = workspaces[0];
    if (!target || creating) return;
    setCreating(true);
    try {
      const page = await createPage(target.id);
      router.push(pageHref(target.id, page.id));
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create the page");
    } finally {
      setCreating(false);
    }
  }, [workspaces, creating, router]);

  const tiles = [
    { label: "Workspaces", value: stats.workspaces, icon: LayoutGrid },
    { label: "Pages", value: stats.pages, icon: FileText },
    { label: "Collaborators", value: stats.collaborators, icon: Users },
    { label: "Edited this week", value: stats.editedThisWeek, icon: PenLine },
  ];

  return (
    <div className="min-h-screen bg-[#191919] text-[#f1f1ef]">
      <header className="sticky top-0 z-10 border-b border-[#2f2f2f] bg-[#191919]/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" className="shrink-0 rounded-md transition-opacity hover:opacity-80">
            <Logo />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-2">
            <label className="flex h-8 min-w-0 max-w-64 flex-1 items-center gap-2 rounded-md bg-[#202020] px-2 text-[#d4d4d4] ring-1 ring-[#2f2f2f] transition-colors focus-within:ring-[#5a5a5a]">
              <Search className="h-4 w-4 shrink-0 text-[#8f8f8f]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7a7a7a]"
              />
            </label>
            <NewWorkspaceDialog>
              <Button
                size="sm"
                className="hidden rounded-md bg-[#f1f1ef] text-[#202020] transition-colors hover:bg-white sm:inline-flex"
              >
                <Plus className="mr-1.5 h-4 w-4" />
                New workspace
              </Button>
            </NewWorkspaceDialog>
            <AccountMenu user={user} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Greeting + primary actions */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {greeting}, {firstName}
            </h1>
            <p className="mt-1.5 text-sm text-[#9b9b9b]">
              {stats.editedThisWeek > 0
                ? `${stats.editedThisWeek} page${stats.editedThisWeek === 1 ? "" : "s"} changed in the last seven days.`
                : "Nothing has changed this week. A good week to write something."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => void quickCreate()}
              disabled={creating || workspaces.length === 0}
              className="rounded-md bg-[#f1f1ef] text-[#202020] transition-colors hover:bg-white"
            >
              {creating ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <PenLine className="mr-1.5 h-4 w-4" />
              )}
              New page
            </Button>
            <NewWorkspaceDialog>
              <Button
                variant="outline"
                className="rounded-md border-[#3f3f3f] bg-transparent text-[#e8e8e6] hover:bg-[#252525] hover:text-white sm:hidden"
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Workspace
              </Button>
            </NewWorkspaceDialog>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#2f2f2f] bg-[#2f2f2f] lg:grid-cols-4">
          {tiles.map((tile) => (
            <div key={tile.label} className="bg-[#1c1c1c] px-4 py-3.5">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-[#8f8f8f]">
                <tile.icon className="h-3.5 w-3.5" />
                {tile.label}
              </div>
              <div className="mt-1.5 text-2xl font-semibold tabular-nums">{tile.value}</div>
            </div>
          ))}
        </div>

        {/* Connect AI: the feature that is easy to miss otherwise. */}
        <Link
          href="/settings/connections"
          className="group mt-3 flex items-center gap-3 rounded-lg border border-[#2f2f2f] bg-[#1c1c1c] px-4 py-3 transition-colors hover:border-[#3f3f3f] hover:bg-[#212121]"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#2a2a2a] text-[#d4d4d4]">
            <Plug className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">
              {stats.tokens > 0
                ? `${stats.tokens} AI connection${stats.tokens === 1 ? "" : "s"} active`
                : "Connect Claude, ChatGPT or Gemini"}
            </p>
            <p className="truncate text-xs text-[#8f8f8f]">
              {stats.tokens > 0
                ? "Manage or revoke the tokens that can read and write your pages."
                : "Let your assistant search, read and write these pages over MCP."}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#7a7a7a] transition-colors group-hover:text-white" />
        </Link>

        {/* Recently edited */}
        {filteredRecents.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-[#8f8f8f]">
              Jump back in
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRecents.map((page) => (
                <Link
                  key={page.id}
                  href={pageHref(page.workspaceId, page.id)}
                  className="group flex min-w-0 items-start gap-3 rounded-lg border border-[#2f2f2f] bg-[#1c1c1c] px-3.5 py-3 transition-colors hover:border-[#3f3f3f] hover:bg-[#212121]"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#252525] text-lg">
                    {page.icon || <FileText className="h-4 w-4 text-[#8f8f8f]" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium">
                        {page.title || "Untitled"}
                      </span>
                      {page.shareType === "global" && (
                        <Globe className="h-3 w-3 shrink-0 text-[#7a7a7a]" />
                      )}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-[#8f8f8f]">
                      <span className="truncate">{page.workspaceName}</span>
                      <span>·</span>
                      <span className="shrink-0">{page.updatedLabel}</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Workspaces */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-medium uppercase tracking-wide text-[#8f8f8f]">
              Workspaces
            </h2>
            <NewWorkspaceDialog>
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-[#8f8f8f] transition-colors hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
                New
              </button>
            </NewWorkspaceDialog>
          </div>

          {filteredWorkspaces.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#3f3f3f] bg-[#1c1c1c] px-4 py-12 text-center">
              <Search className="mx-auto mb-3 h-5 w-5 text-[#7a7a7a]" />
              <p className="text-sm text-[#b8b8b8]">Nothing matches “{query}”.</p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {filteredWorkspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className="group relative flex flex-col rounded-lg border border-[#2f2f2f] bg-[#1c1c1c] p-4 transition-colors hover:border-[#3f3f3f] hover:bg-[#212121]"
                >
                  {/* The link covers the card so the row menu stays clickable. */}
                  <Link
                    href={`/workspaces/${workspace.id}`}
                    aria-label={`Open ${workspace.name}`}
                    className="absolute inset-0 rounded-lg"
                  />

                  <div className="pointer-events-none flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#333333] text-base font-semibold">
                      {workspace.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium">{workspace.name}</h3>
                      <p className="mt-0.5 line-clamp-2 text-sm leading-5 text-[#9b9b9b]">
                        {workspace.description || "No description yet."}
                      </p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label={`Actions for ${workspace.name}`}
                            className="pointer-events-auto relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-md text-[#7a7a7a] opacity-0 transition-all hover:bg-[#2f2f2f] hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-44 rounded-lg border-[#3f3f3f] bg-[#252525] p-1 text-[#f1f1ef] shadow-xl"
                        >
                          {workspace.isOwner ? (
                            <DropdownMenuItem
                              className="gap-2 rounded-md text-[#ff7369] focus:bg-[#3a2928] focus:text-[#ff8a82]"
                              onSelect={(event) => {
                                event.preventDefault();
                                setPendingDelete(workspace);
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
                                setPendingLeave(workspace);
                              }}
                            >
                              <LogOut className="h-4 w-4" />
                              Leave workspace
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </div>

                  <div className="pointer-events-none mt-4 flex items-center justify-between gap-3 border-t border-[#2a2a2a] pt-3">
                    <div className="flex items-center gap-3 text-xs text-[#8f8f8f]">
                      <span className="flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        {workspace.pageCount}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {workspace.memberCount}
                      </span>
                      <span className="truncate">{workspace.updatedLabel}</span>
                    </div>

                    <div className="flex -space-x-1.5">
                      {workspace.members.slice(0, 3).map((member) => (
                        <span
                          key={member.id}
                          title={member.name}
                          className="grid h-6 w-6 place-items-center rounded-md border-2 border-[#1c1c1c] bg-[#3a3a3a] text-[10px] font-semibold"
                        >
                          {member.label}
                        </span>
                      ))}
                      {workspace.memberCount > 3 && (
                        <span className="grid h-6 w-6 place-items-center rounded-md border-2 border-[#1c1c1c] bg-[#2a2a2a] text-[10px] font-semibold text-[#9b9b9b]">
                          +{workspace.memberCount - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {pendingDelete && (
        <DeleteWorkspaceDialog
          workspace={pendingDelete}
          open
          onOpenChange={(open) => !open && setPendingDelete(null)}
        />
      )}

      {pendingLeave && (
        <LeaveWorkspaceDialog
          workspace={pendingLeave}
          open
          onOpenChange={(open) => !open && setPendingLeave(null)}
        />
      )}
    </div>
  );
}
