"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText, Layers, Search, Settings } from "lucide-react";
import { SiModelcontextprotocol } from "react-icons/si";
import { AssistantMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

/** Talks to the assistant console without importing it, so the bar renders on the server. */
export function assistantCommand(action: "toggle" | "open" | "keys") {
  window.dispatchEvent(new CustomEvent("quote:assistant", { detail: { action } }));
}

function Item({
  children,
  onClick,
  href,
  title,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  title?: string;
  className?: string;
}) {
  const classes = cn(
    "flex h-full shrink-0 items-center gap-1.5 px-2 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-200",
    className
  );
  return href ? (
    <Link href={href} title={title} className={classes}>
      {children}
    </Link>
  ) : (
    <button type="button" onClick={onClick} title={title} className={classes}>
      {children}
    </button>
  );
}

/** VS Code style status bar along the bottom of a workspace. */
export function StatusBar({
  workspaceName,
  pageCount,
  model,
}: {
  workspaceName: string;
  pageCount: number;
  model: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [liveModel, setLiveModel] = useState<string | null | undefined>(undefined);
  const shownModel = liveModel === undefined ? model : liveModel;

  useEffect(() => {
    const onState = (event: Event) => {
      const detail = (event as CustomEvent).detail ?? {};
      setOpen(Boolean(detail.open));
      // `undefined` means the console has not loaded connections yet; keep the server value.
      if (detail.model !== undefined) setLiveModel(detail.model);
    };
    window.addEventListener("quote:assistant-state", onState);
    return () => window.removeEventListener("quote:assistant-state", onState);
  }, []);

  return (
    <footer className="relative z-[60] flex h-7 shrink-0 items-stretch border-t border-white/[0.07] bg-[#141414] font-[family-name:var(--font-poppins)] text-[11.5px]">
      <div className="flex min-w-0 items-stretch overflow-hidden">
        <Item href="/settings/appearance" title="Settings" className="pl-3">
          <Settings className="h-3.5 w-3.5" strokeWidth={1.6} />
        </Item>
        <Item href="/settings/connections" title="MCP connections">
          <SiModelcontextprotocol className="h-3 w-3" />
          <span className="hidden sm:inline">MCP</span>
        </Item>
        <span aria-hidden className="my-1.5 w-px shrink-0 bg-white/[0.08]" />
        <Item title="Workspace" className="max-w-48">
          <Layers className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
          <span className="truncate">{workspaceName}</span>
        </Item>
        <Item title="Pages in this workspace" className="hidden sm:flex">
          <FileText className="h-3.5 w-3.5" strokeWidth={1.6} />
          {pageCount}
        </Item>
        <Item
          title="Search pages (⌘K)"
          onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true }))}
        >
          <Search className="h-3.5 w-3.5" strokeWidth={1.6} />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden text-[10px] text-zinc-600 md:inline">⌘K</kbd>
        </Item>
      </div>

      <div className="ml-auto flex items-stretch">
        <Item
          onClick={shownModel ? () => assistantCommand("open") : undefined}
          href={shownModel ? undefined : "/settings/ai?from=assistant"}
          title={shownModel ? "Assistant model" : "Add an AI key"}
        >
          
          <span className="max-w-40 truncate">{shownModel ?? "Add AI key"}</span>
        </Item>
        <button
          type="button"
          onClick={() => assistantCommand("toggle")}
          title="Assistant (⌘J)"
          aria-pressed={open}
          className={cn(
            "flex h-full shrink-0 items-center gap-1.5 px-3 transition-colors",
            open ? "bg-zinc-100 text-zinc-900" : "bg-white/[0.08] text-zinc-200 hover:bg-white/[0.14]"
          )}
        >
          <AssistantMark className="h-4 w-4" />
          <span className="hidden sm:inline">Assistant</span>
        </button>
      </div>
    </footer>
  );
}
