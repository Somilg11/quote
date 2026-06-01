"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Workspace } from "@/lib/prisma-client";
import { AccountMenu } from "@/components/workspace/account-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Search, Sparkles } from "lucide-react";

interface WorkspacesDashboardProps {
  workspaces: Workspace[];
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function WorkspacesDashboard({ workspaces, user }: WorkspacesDashboardProps) {
  const [query, setQuery] = useState("");
  const filteredWorkspaces = useMemo(
    () =>
      workspaces.filter((workspace) => {
        const text = `${workspace.name} ${workspace.description || ""}`.toLowerCase();
        return text.includes(query.trim().toLowerCase());
      }),
    [workspaces, query]
  );

  return (
    <div className="min-h-screen bg-[#191919] text-[#f1f1ef]">
      <header className="sticky top-0 z-10 flex h-auto flex-col gap-3 border-b border-[#2f2f2f] bg-[#191919]/90 px-4 py-3 backdrop-blur sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:py-0">
        <Link href="/" className="text-lg font-semibold tracking-tight">Quote</Link>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md bg-[#202020] px-2 text-[#d4d4d4] ring-1 ring-[#2f2f2f] transition-all focus-within:ring-[#666666] sm:w-56 sm:flex-none">
            <Search className="h-4 w-4 text-[#9b9b9b]" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search workspaces"
              className="h-auto border-0 bg-transparent p-0 text-sm text-[#f1f1ef] shadow-none placeholder:text-[#858585] focus-visible:ring-0"
            />
          </label>
          <Link href="/workspaces/new">
            <Button size="sm" className="rounded-md bg-[#f1f1ef] text-[#202020] shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              New workspace
            </Button>
          </Link>
          <AccountMenu user={user} />
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium text-[#9b9b9b]">Quote</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your workspaces</h1>
          <p className="mt-2 text-sm text-[#b8b8b8]">
            Pick up where your notes and collaborators left off.
          </p>
        </div>

        {filteredWorkspaces.length === 0 ? (
          <div className="rounded-md border border-dashed border-[#3f3f3f] bg-[#202020] px-4 py-14 text-center">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-[#858585]" />
            <h2 className="mb-2 text-lg font-semibold">No matching workspaces</h2>
            <p className="text-sm text-[#b8b8b8]">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filteredWorkspaces.map((workspace) => (
              <Link key={workspace.id} href={`/workspaces/${workspace.id}`}>
                <div className="group flex min-h-28 cursor-pointer gap-4 rounded-md border border-[#2f2f2f] bg-[#202020] px-4 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3f3f3f] hover:bg-[#252525] hover:shadow-md">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#333333] text-lg font-semibold">
                    {workspace.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{workspace.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#b8b8b8]">
                      {workspace.description || "A clean place for pages, decisions, and drafts."}
                    </p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-[#858585]">
                      <FileText className="h-3.5 w-3.5" />
                      Created {new Date(workspace.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
