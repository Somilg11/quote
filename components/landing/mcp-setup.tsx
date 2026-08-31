"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface McpClientConfig {
  id: string;
  label: string;
  /** Browser chats take a URL only; terminal/editor clients send a header. */
  group: "browser" | "terminal";
  hint: string;
  language: string;
  snippet: string;
}

const GROUP_LABELS: Record<McpClientConfig["group"], string> = {
  browser: "In the browser",
  terminal: "Terminal & editors",
};

interface McpSetupProps {
  clients: McpClientConfig[];
}

/** Tabbed, copyable setup snippets for each MCP client. */
export function McpSetup({ clients }: McpSetupProps) {
  const [active, setActive] = useState(clients[0]?.id);
  const [copied, setCopied] = useState(false);
  const current = clients.find((client) => client.id === active) ?? clients[0];

  // Preserve the order the configs arrive in rather than hard-coding it.
  const groups = clients.reduce<McpClientConfig["group"][]>((seen, client) => {
    if (!seen.includes(client.group)) seen.push(client.group);
    return seen;
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(current.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the snippet is still selectable.
    }
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#141414]">
      <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 bg-[#191919] p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {groups.map((group, index) => (
          <div key={group} className="flex shrink-0 items-center gap-1">
            {index > 0 && <span aria-hidden className="mx-1 h-4 w-px bg-white/10" />}
            <span className="shrink-0 whitespace-nowrap pl-1 pr-0.5 text-[10px] uppercase tracking-wide text-zinc-600">
              {GROUP_LABELS[group]}
            </span>
            {clients
              .filter((client) => client.group === group)
              .map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => {
                    setActive(client.id);
                    setCopied(false);
                  }}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    client.id === current.id
                      ? "bg-[#2c2c2c] text-white"
                      : "text-zinc-500 hover:text-zinc-200"
                  )}
                >
                  {client.label}
                </button>
              ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5 sm:px-4">
        <span className="flex min-w-0 items-center gap-2 text-[11px] text-zinc-500">
          <Terminal className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{current.hint}</span>
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[#2F9E6E]" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="max-h-64 overflow-auto p-3 text-[11px] leading-relaxed text-zinc-300 sm:max-h-72 sm:p-4 sm:text-[12px]">
        <code className="font-mono">{current.snippet}</code>
      </pre>
    </div>
  );
}
