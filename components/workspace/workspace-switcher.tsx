"use client";

import Link from "next/link";
import type { Workspace } from "@/lib/prisma-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus, SquarePen } from "lucide-react";

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  currentWorkspaceId: string;
}

export function WorkspaceSwitcher({
  workspaces,
  currentWorkspaceId,
}: WorkspaceSwitcherProps) {
  const currentWorkspace = workspaces.find((w) => w.id === currentWorkspaceId);
  const initial = (currentWorkspace?.name || "Quote").charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-11 w-full justify-between rounded-md px-2 text-[#f1f1ef] transition-all duration-200 hover:bg-[#2f2f2f]"
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#4a4a4a] text-xs font-semibold text-white shadow-sm">
              {initial}
            </span>
            <span className="truncate text-sm font-semibold">{currentWorkspace?.name || "Quote"}</span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-[#9b9b9b]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-lg border-[#3f3f3f] bg-[#252525] p-1 text-[#f1f1ef] shadow-xl" align="start">
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-[#9b9b9b]">
          Switch workspace
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#3a3a3a]" />
        {workspaces.map((workspace) => (
          <DropdownMenuItem key={workspace.id} asChild className="rounded-md focus:bg-[#333333] focus:text-[#f7f7f5]">
            <Link href={`/workspaces/${workspace.id}`} className="flex cursor-pointer items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded bg-[#3a3a3a] text-xs font-semibold">
                {workspace.name.charAt(0).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1 truncate">{workspace.name}</span>
              {workspace.id === currentWorkspaceId && <Check className="h-4 w-4 text-[#9b9b9b]" />}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-[#3a3a3a]" />
        <DropdownMenuItem asChild className="rounded-md focus:bg-[#333333] focus:text-[#f7f7f5]">
          <Link href="/workspaces" className="cursor-pointer flex items-center gap-2">
            <SquarePen className="h-4 w-4" />
            All workspaces
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-md focus:bg-[#333333] focus:text-[#f7f7f5]">
          <Link href="/workspaces/new" className="cursor-pointer flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New workspace
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
