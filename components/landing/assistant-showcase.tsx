"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, Layers, Search, Settings } from "lucide-react";
import { SiModelcontextprotocol } from "react-icons/si";
import { AssistantMark } from "@/components/brand/logo";
import { Mascot } from "@/components/workspace/mascot";

const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

type Line =
  | { kind: "prompt"; text: string }
  | { kind: "tool"; label: string; detail: string; result: string[] }
  | { kind: "text"; text: string };

const SCRIPT: Line[] = [
  { kind: "prompt", text: "turn my meeting notes into a launch plan" },
  { kind: "tool", label: "Search pages", detail: '"meeting notes"', result: ["3 results"] },
  { kind: "tool", label: "Read page", detail: "", result: ["Kickoff notes"] },
  { kind: "tool", label: "Create pages", detail: "4 pages", result: ["↗ Launch plan", "↗ Timeline", "↗ Owners"] },
  {
    kind: "text",
    text: "Done. I drafted Launch plan with a timeline and owners, pulled from your three meeting pages.",
  },
];

function Spinner() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % SPINNER.length), 80);
    return () => clearInterval(t);
  }, []);
  return <span className="inline-block w-3 text-center text-amber-300">{SPINNER[frame]}</span>;
}

const busy = (value: boolean) =>
  window.dispatchEvent(new CustomEvent("quote:assistant-state", { detail: { open: false, busy: value } }));

/**
 * Landing-page demo of the in-app assistant: a replaying console transcript with
 * Qubit perched on top. Clicking Qubit runs it again.
 */
export function AssistantShowcase() {
  // step: how many lines are visible; running: the last tool line is still spinning.
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [typed, setTyped] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const play = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(0);
    setTyped(0);
    setRunning(false);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(SCRIPT.length);
      setTyped(SCRIPT[0].kind === "prompt" ? SCRIPT[0].text.length : 0);
      return;
    }

    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
    const prompt = SCRIPT[0] as { text: string };
    // Type the prompt, then reveal each tool call with a spinner before its result.
    setStep(1);
    for (let i = 1; i <= prompt.text.length; i += 1) at(i * 38, () => setTyped(i));
    let t = prompt.text.length * 38 + 500;
    at(t, () => busy(true));
    for (let i = 1; i < SCRIPT.length; i += 1) {
      const line = SCRIPT[i];
      at(t, () => {
        setStep(i + 1);
        setRunning(line.kind === "tool");
      });
      t += line.kind === "tool" ? 1100 : 400;
      if (line.kind === "tool") at(t, () => setRunning(false));
      t += 250;
    }
    at(t, () => busy(false));
  }, []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          play();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, [play]);

  return (
    <div ref={root} className="relative pt-[82px]">
      <div className="absolute right-8 top-[6px] z-10">
        <Mascot
          variant="inline"
          size={100}
          onActivate={play}
          hoverLabel="watch me again"
          tips={["hi, I'm Qubit", "I live in your workspace", "click me to replay", "bring your own key"]}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141414] font-[family-name:var(--font-geist-mono)] text-[12.5px] leading-relaxed text-zinc-300 shadow-[0_40px_90px_-40px_rgba(0,0,0,1)]">
        <div className="flex h-10 items-center gap-3 border-b border-white/[0.07] px-4">
          <AssistantMark className="h-4 w-4 text-zinc-100" />
          <span className="text-xs text-zinc-400">
            quote <span className="text-zinc-600">/</span> assistant
          </span>
          <span className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[11px] text-zinc-500 sm:inline">
            anthropic · claude-sonnet-5-5
          </span>
        </div>

        <div className="min-h-[248px] space-y-3 px-4 py-4 sm:px-5">
          {SCRIPT.slice(0, step).map((line, i) => {
            const isLast = i === step - 1;
            if (line.kind === "prompt") {
              return (
                <p key={i} className="text-zinc-100">
                  <span className="mr-2 text-emerald-400">❯</span>
                  {line.text.slice(0, typed)}
                  {typed < line.text.length && <span className="ml-px inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-emerald-400" />}
                </p>
              );
            }
            if (line.kind === "tool") {
              const spinning = isLast && running;
              return (
                <div key={i} className="pl-4 animate-in fade-in duration-200">
                  <p className="flex items-center gap-2">
                    {spinning ? <Spinner /> : <span className="inline-block w-3 text-center text-emerald-400">●</span>}
                    <span className="text-zinc-200">{line.label}</span>
                    {line.detail && <span className="text-zinc-500">{line.detail}</span>}
                  </p>
                  {!spinning &&
                    line.result.map((r) => (
                      <p key={r} className="pl-5 text-zinc-500 animate-in fade-in duration-200">
                        <span className="mr-2 text-zinc-700">⎿</span>
                        <span className={r.startsWith("↗") ? "text-sky-300" : ""}>{r}</span>
                      </p>
                    ))}
                </div>
              );
            }
            return (
              <p key={i} className="pl-4 text-zinc-300 animate-in fade-in slide-in-from-bottom-1 duration-300">
                {line.text}
              </p>
            );
          })}
        </div>

        <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
          <p className="text-zinc-600">
            <span className="mr-2 text-emerald-400">❯</span>ask, or type / for commands
          </p>
        </div>

        <div className="flex h-7 items-stretch whitespace-nowrap border-t border-white/[0.07] bg-[#111] font-[family-name:var(--font-poppins)] text-[11px] text-zinc-500">
          <span className="flex items-center px-3"><Settings className="h-3.5 w-3.5" strokeWidth={1.6} /></span>
          <span className="flex items-center gap-1.5 px-2"><SiModelcontextprotocol className="h-3 w-3" />MCP</span>
          <span className="hidden items-center gap-1.5 px-2 xl:flex"><Layers className="h-3.5 w-3.5" strokeWidth={1.6} />Acme workspace</span>
          <span className="hidden items-center gap-1.5 px-2 sm:flex"><FileText className="h-3.5 w-3.5" strokeWidth={1.6} />24</span>
          <span className="hidden items-center gap-1.5 px-2 2xl:flex"><Search className="h-3.5 w-3.5" strokeWidth={1.6} />Search</span>
          <span className="ml-auto flex items-center gap-1.5 px-2">claude-sonnet-5-5</span>
          <span className="flex items-center gap-1.5 bg-zinc-100 px-3 text-zinc-900"><AssistantMark className="h-4 w-4" />Assistant</span>
        </div>
      </div>
    </div>
  );
}
