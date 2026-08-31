"use client";

import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, Plug } from "lucide-react";

interface AccountMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function AccountMenu({ user }: AccountMenuProps) {
  const fallback = (user.name || user.email || "Q").charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 w-9 rounded-md p-0 transition-all duration-200 hover:bg-[#2f2f2f]"
          aria-label="Open account menu"
        >
          <Avatar className="h-7 w-7 rounded-md">
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback className="rounded-md bg-[#4a4a4a] text-xs font-semibold text-white">
              {fallback}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-lg border-[#3f3f3f] bg-[#252525] p-1 text-[#f1f1ef] shadow-xl">
        <DropdownMenuLabel className="flex items-center gap-2 px-2 py-2">
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback className="rounded-md bg-[#4a4a4a] text-xs font-semibold text-white">
              {fallback}
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">{user.name || "Quote user"}</span>
            <span className="block truncate text-xs font-normal text-[#9b9b9b]">{user.email}</span>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#3a3a3a]" />
        <DropdownMenuItem asChild className="gap-2 rounded-md focus:bg-[#333333] focus:text-white">
          <Link href="/settings/connections">
            <Plug className="h-4 w-4" />
            Connections &amp; API tokens
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 rounded-md text-[#ff7369] focus:bg-[#3a2928] focus:text-[#ff8a82]"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
