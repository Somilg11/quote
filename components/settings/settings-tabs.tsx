"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/settings/appearance", label: "Appearance" },
  { href: "/settings/ai", label: "AI assistant" },
  { href: "/settings/connections", label: "MCP connections" },
];

/** Highlights the clicked tab immediately instead of waiting for the next page's data. */
export function SettingsTabs() {
  const pathname = usePathname();
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => setPending(null), [pathname]);

  const current = pending ?? tabs.find((tab) => pathname.startsWith(tab.href))?.href;

  return (
    <nav aria-label="Settings sections" className="flex gap-1 overflow-x-auto border-t border-white/[0.07] px-3 sm:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => {
        const active = current === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            prefetch
            onClick={() => setPending(tab.href)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative shrink-0 px-3 py-3.5 text-sm transition-colors",
              active ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {tab.label}
            {active && <span className="absolute inset-x-3 bottom-0 h-px bg-zinc-100" />}
          </Link>
        );
      })}
    </nav>
  );
}
