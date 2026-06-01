"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Page, User, Workspace, WorkspaceMember } from "@/lib/prisma-client";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { WorkspaceInviteDialog } from "@/components/workspace/workspace-invite-dialog";
import { FileText, Plus, Search, Users } from "lucide-react";

type MemberWithUser = WorkspaceMember & { user: User };

interface WorkspaceHomeProps {
  workspace: Workspace;
  pages: Page[];
  members: MemberWithUser[];
}

export function WorkspaceHome({ workspace, pages, members }: WorkspaceHomeProps) {
  const [query, setQuery] = useState("");
  const filteredPages = useMemo(
    () =>
      pages.filter((page) =>
        page.title.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [pages, query]
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-[#f1f1ef] sm:px-8 lg:px-10 lg:py-12">
      <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <div className="mb-4 text-5xl sm:text-6xl">{workspace.name.charAt(0).toUpperCase()}</div>
          <h1 className="truncate text-3xl font-semibold tracking-tight sm:text-4xl">{workspace.name}</h1>
          {workspace.description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#b8b8b8]">{workspace.description}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <HoverCard openDelay={120}>
            <HoverCardTrigger asChild>
              <button className="flex items-center rounded-md px-1.5 py-1 transition-all hover:bg-[#2f2f2f]" aria-label="Show collaborators">
                <div className="flex -space-x-2">
                  {members.slice(0, 5).map((member) => (
                    <div
                      key={member.id}
                      className="grid h-8 w-8 place-items-center rounded-md border-2 border-[#191919] bg-[#333333] text-xs font-semibold text-[#f1f1ef]"
                      title={member.user.email || member.user.name || "Collaborator"}
                    >
                      {(member.user.name || member.user.email || "U").charAt(0).toUpperCase()}
                    </div>
                  ))}
                </div>
                {members.length > 5 && <span className="ml-2 text-xs text-[#b8b8b8]">+{members.length - 5}</span>}
              </button>
            </HoverCardTrigger>
            <HoverCardContent side="bottom" align="end" className="w-80 border-[#3f3f3f] bg-[#252525] p-2 text-[#f1f1ef] shadow-xl">
              <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">
                <Users className="h-4 w-4 text-[#b8b8b8]" />
                Collaborators
              </div>
              <div className="mt-1 max-h-72 overflow-y-auto">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 rounded-md px-2 py-2">
                    <div className="grid h-8 w-8 place-items-center rounded-md bg-[#3a3a3a] text-xs font-semibold">
                      {(member.user.name || member.user.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm">{member.user.name || "Unnamed user"}</p>
                      <p className="truncate text-xs text-[#9b9b9b]">{member.user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
          <WorkspaceInviteDialog workspaceId={workspace.id} />
          <Link href={`/workspaces/${workspace.id}/pages/new`}>
            <Button className="rounded-md bg-[#f1f1ef] text-[#202020] shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              New page
            </Button>
          </Link>
        </div>
      </div>

      <label className="mb-5 flex max-w-xl items-center gap-2 rounded-md border border-[#3f3f3f] bg-[#202020] px-3 py-2 transition-all focus-within:border-[#666666]">
        <Search className="h-4 w-4 text-[#9b9b9b]" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search pages in this workspace"
          className="h-auto border-0 bg-transparent p-0 text-[#f1f1ef] shadow-none placeholder:text-[#858585] focus-visible:ring-0"
        />
      </label>

      {filteredPages.length === 0 ? (
        <div className="rounded-md border border-dashed border-[#3f3f3f] bg-[#252525] py-16 text-center">
          <FileText className="h-12 w-12 text-[#858585] mx-auto mb-4" />
          <h2 className="mb-2 text-xl font-semibold">{query ? "No matching pages" : "No pages yet"}</h2>
          <p className="mb-6 text-sm text-[#b8b8b8]">
            {query ? "Try a different search term." : "Create your first page to start collaborating"}
          </p>
          {!query && (
            <Link href={`/workspaces/${workspace.id}/pages/new`}>
              <Button className="rounded-md bg-[#f1f1ef] text-[#202020] shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Create page
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-1">
          {filteredPages.map((page) => (
            <Link
              key={page.id}
              href={`/workspaces/${workspace.id}/pages/${page.id}`}
              className="group flex items-center justify-between gap-4 rounded-md px-3 py-2 transition-all duration-200 hover:bg-[#2f2f2f]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center text-xl">{page.icon}</span>
                <h3 className="truncate text-sm font-medium">{page.title}</h3>
              </div>
              <p className="shrink-0 text-xs text-[#858585]">
                {new Date(page.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
