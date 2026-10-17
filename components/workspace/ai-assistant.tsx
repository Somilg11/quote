"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Settings2, Trash2 } from "lucide-react";
import { AssistantMark } from "@/components/brand/logo";
import { PROVIDERS } from "@/lib/ai/providers";
import type { Connection } from "@/components/workspace/ai-keys";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  detail: string;
  status: "running" | "ok" | "error";
  summary?: string;
  pages: { id: string; title: string; workspaceId: string }[];
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  steps?: Step[];
  error?: boolean;
  /** Reveal the text with a typewriter effect (only for replies that just arrived). */
  animate?: boolean;
  /** Produced locally (slash commands, notices); never sent to the model. */
  local?: boolean;
}

const COMMANDS = [
  { name: "/clear", hint: "Clear the conversation" },
  { name: "/model", hint: "Switch model, e.g. /model gpt-4o" },
  { name: "/keys", hint: "Add or manage provider keys" },
  { name: "/help", hint: "Show what I can do" },
];

const SUGGESTIONS = [
  "summarize this page",
  "create a project plan with milestones",
  "what did I work on recently?",
  "find pages that mention onboarding",
];

const HEIGHT_KEY = "quote-console-height";
const MAX_CONTENT = 12_000;

/** The last 20 real exchanges: no errors, notices or empty interrupted replies, starting with the user. */
function toModelHistory(messages: ChatMessage[]) {
  const usable = messages
    .filter((m) => !m.error && !m.local && m.content.trim().length > 0)
    .slice(-20)
    .map(({ role, content }) => ({ role, content: content.slice(0, MAX_CONTENT) }));
  while (usable.length > 0 && usable[0].role !== "user") usable.shift();
  return usable;
}
const uid = () => Math.random().toString(36).slice(2, 10);
const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function Spinner({ className }: { className?: string }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % SPINNER.length), 80);
    return () => clearInterval(t);
  }, []);
  return <span className={cn("inline-block w-3 text-center", className)}>{SPINNER[frame]}</span>;
}

/** Reveals text progressively so a reply that arrives at once still reads as it is written. */
function useTypewriter(text: string, enabled: boolean) {
  const [count, setCount] = useState(enabled ? 0 : text.length);
  useEffect(() => {
    if (!enabled) {
      setCount(text.length);
      return;
    }
    let raf = 0;
    let last = performance.now();
    let shown = 0;
    const tick = (now: number) => {
      shown = Math.min(text.length, shown + ((now - last) / 1000) * Math.max(240, text.length * 1.1));
      last = now;
      setCount(Math.floor(shown));
      if (shown < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, enabled]);
  return text.slice(0, count);
}

/** Tiny, safe Markdown renderer: no HTML injection, links limited to http(s) and in-app paths. */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-medium text-white">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="rounded bg-white/10 px-1 py-0.5 text-[12px] text-emerald-300">{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const href = link[2];
      const safe = /^https?:\/\//.test(href) || href.startsWith("/");
      return safe ? (
        <a key={i} href={href} target={href.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
          {link[1]}
        </a>
      ) : (
        <Fragment key={i}>{link[1]}</Fragment>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Markdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="space-y-2 break-words">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
          return (
            <ul key={i} className="space-y-0.5">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-2"><span className="text-zinc-600">-</span><span>{renderInline(l.replace(/^\s*[-*]\s+/, ""))}</span></li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l))) {
          return (
            <ol key={i} className="space-y-0.5">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-2"><span className="text-zinc-600">{j + 1}.</span><span>{renderInline(l.replace(/^\s*\d+[.)]\s+/, ""))}</span></li>
              ))}
            </ol>
          );
        }
        const heading = block.match(/^#{1,4}\s+(.*)$/);
        if (heading) return <p key={i} className="font-medium text-white">{renderInline(heading[1])}</p>;
        return <p key={i}>{lines.map((l, j) => <Fragment key={j}>{j > 0 && <br />}{renderInline(l)}</Fragment>)}</p>;
      })}
    </div>
  );
}

function AssistantText({ message }: { message: ChatMessage }) {
  const text = useTypewriter(message.content, Boolean(message.animate) && !message.error);
  if (message.error) return <p className="text-red-300">{message.content}</p>;
  return <Markdown text={text} />;
}

export function AiAssistant({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const params = useParams<{ pageId?: string }>();
  const pageId = params?.pageId;

  const [open, setOpen] = useState(false);
  const [connections, setConnections] = useState<Connection[] | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [height, setHeight] = useState(360);
  const [dragging, setDragging] = useState(false);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const consoleRef = useRef<HTMLElement>(null);

  const storageKey = `quote-ai-chat:${workspaceId}`;
  const active = useMemo(() => connections?.find((c) => c.isDefault) ?? connections?.[0] ?? null, [connections]);
  const userHistory = useMemo(() => messages.filter((m) => m.role === "user").map((m) => m.content), [messages]);
  const suggestions = input.startsWith("/") && !input.includes(" ") ? COMMANDS.filter((c) => c.name.startsWith(input)) : [];

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      setMessages(saved ? (JSON.parse(saved) as ChatMessage[]).map((m) => ({ ...m, animate: false })) : []);
      const h = Number(localStorage.getItem(HEIGHT_KEY));
      if (h >= 220) setHeight(h);
    } catch {
      setMessages([]);
    }
  }, [storageKey]);

  useEffect(() => {
    if (streaming) return;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages.slice(-40)));
    } catch {
      // storage can be blocked
    }
  }, [messages, streaming, storageKey]);

  useEffect(() => {
    if (!streaming) return;
    setElapsed(0);
    const started = Date.now();
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 500);
    return () => clearInterval(t);
  }, [streaming]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "j") {
        event.preventDefault();
        setOpen((v) => !v);
      } else if (
        event.key === "Escape" &&
        open &&
        !event.defaultPrevented &&
        consoleRef.current?.contains(document.activeElement)
      ) {
        if (streaming) abortRef.current?.abort();
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, streaming]);

  useEffect(() => {
    const onCommand = (event: Event) => {
      const action = (event as CustomEvent).detail?.action;
      if (action === "toggle") setOpen((v) => !v);
      if (action === "open") setOpen(true);
      if (action === "keys") router.push("/settings/ai?from=assistant");
    };
    window.addEventListener("quote:assistant", onCommand);
    return () => window.removeEventListener("quote:assistant", onCommand);
  }, [router]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("quote:assistant-state", {
        detail: { open, height, busy: streaming, model: connections ? active?.model ?? null : undefined },
      })
    );
  }, [open, connections, active, height, streaming]);

  const loadConnections = useCallback(async () => {
    try {
      const response = await fetch("/api/ai/connections", { cache: "no-store" });
      const data = await response.json();
      setConnections(data.connections ?? []);
      return (data.connections ?? []) as Connection[];
    } catch {
      setConnections([]);
      return [];
    }
  }, []);

  useEffect(() => {
    if (open) void loadConnections();
  }, [open, loadConnections]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && stickRef.current) el.scrollTo({ top: el.scrollHeight });
  }, [messages, open, streaming]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  const startResize = (event: React.PointerEvent) => {
    event.preventDefault();
    setDragging(true);
    const startY = event.clientY;
    const startH = height;
    let latest = startH;
    const move = (e: PointerEvent) => {
      latest = Math.max(220, Math.min(window.innerHeight * 0.85, startH + (startY - e.clientY)));
      setHeight(latest);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      try {
        localStorage.setItem(HEIGHT_KEY, String(Math.round(latest)));
      } catch {
        // ignore
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const push = (m: Omit<ChatMessage, "id">) => setMessages((cur) => [...cur, { id: uid(), ...m }]);

  const runCommand = async (raw: string) => {
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    setInput("");
    if (cmd === "/clear") return setMessages([]);
    if (cmd === "/keys") return router.push("/settings/ai?from=assistant");
    if (cmd === "/help") {
      push({ role: "assistant", local: true, content: `I can search, read, create and edit pages in this workspace.\n\n${COMMANDS.map((c) => `- \`${c.name}\` ${c.hint}`).join("\n")}\n\nPress \`esc\` to interrupt, \`⌘J\` to toggle.`, animate: true });
      return;
    }
    if (cmd === "/model") {
      const model = rest[0];
      if (!active) return router.push("/settings/ai?from=assistant");
      if (!model) return push({ role: "assistant", local: true, content: `Current model: \`${active.model}\` (${PROVIDERS[active.provider].label}).`, animate: true });
      const response = await fetch(`/api/ai/connections/${active.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ model }),
      });
      if (response.ok) {
        await loadConnections();
        push({ role: "assistant", local: true, content: `Model set to \`${model}\`.`, animate: true });
      } else {
        push({ role: "assistant", local: true, content: "That model name was not accepted.", error: true });
      }
      return;
    }
    push({ role: "assistant", local: true, content: `Unknown command \`${cmd}\`. Try \`/help\`.`, animate: true });
  };

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || streaming) return;
      if (content.startsWith("/")) return void runCommand(content);
      if (!active) {
        setInput("");
        push({ role: "assistant", local: true, content: "No AI key yet. First add one in [Settings → AI assistant](/settings/ai?from=assistant), then come back here.", error: false, animate: true });
        return;
      }

      stickRef.current = true;
      setHistoryIndex(null);
      const history = [...messages, { id: uid(), role: "user" as const, content }];
      const reply: ChatMessage = { id: uid(), role: "assistant", content: "", steps: [] };
      setMessages([...history, reply]);
      setInput("");
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;
      const patch = (fn: (m: ChatMessage) => ChatMessage) => setMessages((cur) => cur.map((m) => (m.id === reply.id ? fn(m) : m)));

      try {
        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            workspaceId,
            pageId,
            connectionId: active.id,
            messages: toModelHistory(history),
          }),
        });

        if (!response.ok || !response.body) {
          const data = await response.json().catch(() => ({}));
          if (data?.code === "no_connection") void loadConnections();
          patch((m) => ({ ...m, content: data?.error ?? "Something went wrong.", error: true }));
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            let event: any;
            try {
              event = JSON.parse(line);
            } catch {
              continue;
            }
            if (event.type === "tool_start") {
              patch((m) => ({ ...m, steps: [...(m.steps ?? []), { id: event.id, label: event.label, detail: event.detail, status: "running", pages: [] }] }));
            } else if (event.type === "tool") {
              patch((m) => {
                const steps = m.steps ?? [];
                const update = { status: event.ok ? "ok" : "error", summary: event.summary, pages: event.pages ?? [] } as const;
                return steps.some((s) => s.id === event.id)
                  ? { ...m, steps: steps.map((s) => (s.id === event.id ? { ...s, ...update } : s)) }
                  : { ...m, steps: [...steps, { id: event.id, label: event.label, detail: "", ...update }] };
              });
            } else if (event.type === "text") {
              patch((m) => ({ ...m, content: event.text, animate: true }));
            } else if (event.type === "mutated") {
              router.refresh();
            } else if (event.type === "error") {
              patch((m) => ({ ...m, content: event.message, error: true }));
            }
          }
        }
      } catch (error) {
        if ((error as Error)?.name !== "AbortError") {
          patch((m) => ({ ...m, content: "Could not reach the assistant.", error: true }));
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
        patch((m) => ({
          ...m,
          steps: m.steps?.map((s) => (s.status === "running" ? { ...s, status: "error", summary: "interrupted" } : s)),
          content: m.content || (m.steps?.length ? "" : "Interrupted."),
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, messages, pageId, router, streaming, workspaceId]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (suggestions.length === 1 && suggestions[0].name !== input.trim()) setInput(`${suggestions[0].name} `);
      else void send(input);
    } else if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setInput(`${suggestions[0].name} `);
    } else if (e.key === "ArrowUp" && !input.includes("\n") && userHistory.length > 0) {
      e.preventDefault();
      const next = historyIndex === null ? userHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(userHistory[next]);
    } else if (e.key === "ArrowDown" && historyIndex !== null) {
      e.preventDefault();
      const next = historyIndex + 1;
      if (next >= userHistory.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(userHistory[next]);
      }
    }
  };

  return (
    <>
      <section
        ref={consoleRef}
        role="dialog"
        aria-label="Assistant console"
        aria-hidden={!open}
        inert={!open}
        style={{ height }}
        className={cn(
          "fixed inset-x-0 bottom-7 z-50 flex flex-col border-t border-white/10 bg-[#141414]/95 font-[family-name:var(--font-geist-mono)] text-[13px] leading-relaxed text-zinc-300 shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl md:left-64",
          dragging ? "" : "transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        )}
      >
        <div
          onPointerDown={startResize}
          className="group absolute inset-x-0 -top-1.5 z-10 flex h-3 cursor-row-resize items-center justify-center"
          aria-hidden
        >
          <span className="h-0.5 w-10 rounded-full bg-white/10 transition-colors group-hover:bg-white/30" />
        </div>

        <div className="flex h-10 shrink-0 items-center gap-3 border-b border-white/[0.07] px-4">
          <AssistantMark className="h-4 w-4 text-zinc-100" />
          <span className="text-xs text-zinc-400">
            quote <span className="text-zinc-600">/</span> assistant
          </span>
          {active && (
            <span className="hidden truncate rounded border border-white/10 px-1.5 py-0.5 text-[11px] text-zinc-500 sm:inline">
              {PROVIDERS[active.provider].label.toLowerCase()} · {active.model}
            </span>
          )}
          <div className="ml-auto flex items-center gap-0.5">
            {messages.length > 0 && (
              <HeaderButton label="Clear (/clear)" onClick={() => !streaming && setMessages([])}><Trash2 className="h-3.5 w-3.5" /></HeaderButton>
            )}
            <Link href="/settings/ai?from=assistant" title="Provider keys" aria-label="Provider keys" className="grid h-7 w-7 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-white/[0.07] hover:text-zinc-200">
              <Settings2 className="h-3.5 w-3.5" />
            </Link>
            <HeaderButton label="Minimize (esc)" onClick={() => setOpen(false)}><ChevronDown className="h-4 w-4" /></HeaderButton>
          </div>
        </div>

        <>
            <div
              ref={scrollRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
              }}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6"
            >
              {connections !== null && !active && (
                <div className="animate-in fade-in slide-in-from-bottom-1 duration-500">
                  <p className="text-zinc-100">
                    <span className="text-amber-300">●</span> no AI key configured
                  </p>
                  <p className="mt-1 text-zinc-500">
                    <span className="mr-2 text-zinc-700">⎿</span>
                    The assistant runs on your own Anthropic, OpenAI or Gemini key. First add one here:
                  </p>
                  <Link
                    href="/settings/ai?from=assistant"
                    className="mt-3 inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-1.5 text-xs text-zinc-100 transition-colors hover:border-white/35 hover:bg-white/[0.04]"
                  >
                    → Settings / AI assistant / add key
                  </Link>
                </div>
              )}
              {connections !== null && !active && messages.length === 0 ? null : messages.length === 0 ? (
                <div className="animate-in fade-in slide-in-from-bottom-1 duration-500">
                  <p className="text-zinc-100">
                    <span className="text-emerald-400">●</span> quote assistant <span className="text-zinc-600">ready</span>
                  </p>
                  <p className="mt-1 text-zinc-500">I can search, read, create and edit pages here. Try:</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} type="button" onClick={() => void send(s)} className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:border-white/25 hover:text-zinc-100">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                    {m.role === "user" ? (
                      <p className="whitespace-pre-wrap break-words text-zinc-100">
                        <span className="mr-2 text-emerald-400">❯</span>
                        {m.content}
                      </p>
                    ) : (
                      <div className="space-y-2 pl-4">
                        {m.steps?.map((step) => (
                          <div key={step.id} className="animate-in fade-in duration-200">
                            <p className="flex items-center gap-2">
                              {step.status === "running" ? <Spinner className="text-amber-300" /> : <span className={cn("inline-block w-3 text-center", step.status === "ok" ? "text-emerald-400" : "text-red-400")}>●</span>}
                              <span className="text-zinc-200">{step.label}</span>
                              {step.detail && <span className="truncate text-zinc-500">{step.detail}</span>}
                            </p>
                            {step.status !== "running" && (
                              <p className="pl-5 text-zinc-500">
                                <span className="mr-2 text-zinc-700">⎿</span>
                                <span className={step.status === "error" ? "text-red-300/80" : ""}>{step.summary}</span>
                              </p>
                            )}
                            {step.pages.map((p) => (
                              <p key={p.id} className="pl-5">
                                <span className="mr-2 text-zinc-700">⎿</span>
                                <Link href={`/workspaces/${p.workspaceId}/pages/${p.id}`} className="text-sky-300 underline-offset-2 hover:underline">
                                  ↗ {p.title}
                                </Link>
                              </p>
                            ))}
                          </div>
                        ))}
                        {m.content && <AssistantText message={m} />}
                      </div>
                    )}
                  </div>
                ))
              )}

              {streaming && (
                <p className="pl-4 text-zinc-500 animate-in fade-in">
                  <Spinner className="mr-2 text-zinc-300" />
                  <span className="text-zinc-400">Working…</span> {elapsed}s · esc to interrupt
                </p>
              )}
            </div>

            <div className="relative shrink-0 border-t border-white/[0.07] px-4 py-3 sm:px-6">
              {suggestions.length > 0 && (
                <div className="absolute bottom-full left-4 mb-2 w-72 overflow-hidden rounded-lg border border-white/10 bg-[#1a1a1a] shadow-xl animate-in fade-in slide-in-from-bottom-1 duration-150 sm:left-6">
                  {suggestions.map((c) => (
                    <button key={c.name} type="button" onClick={() => { setInput(`${c.name} `); inputRef.current?.focus(); }} className="flex w-full items-baseline gap-3 px-3 py-1.5 text-left hover:bg-white/[0.06]">
                      <span className="text-zinc-100">{c.name}</span>
                      <span className="truncate text-xs text-zinc-500">{c.hint}</span>
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-start gap-2">
                <span className={cn("mt-px select-none transition-colors", streaming ? "text-zinc-600" : "text-emerald-400")}>❯</span>
                <textarea
                  ref={inputRef}
                  value={input}
                  rows={1}
                  maxLength={8000}
                  spellCheck={false}
                  placeholder={active ? "Ask, or type / for commands" : "Add an API key with /keys to start"}
                  onChange={(e) => { setInput(e.target.value); setHistoryIndex(null); }}
                  onKeyDown={onKeyDown}
                  className="max-h-[120px] min-h-5 flex-1 resize-none bg-transparent text-zinc-100 caret-emerald-400 outline-none placeholder:text-zinc-600"
                />
              </div>
              <p className="mt-1.5 pl-5 text-[11px] text-zinc-600">
                ↵ send · ⇧↵ newline · ↑ history · / commands · ⌘J toggle
              </p>
            </div>
        </>
      </section>

    </>
  );
}

function HeaderButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className="grid h-7 w-7 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-white/[0.07] hover:text-zinc-200">
      {children}
    </button>
  );
}
