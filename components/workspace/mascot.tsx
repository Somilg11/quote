"use client";

import { useEffect, useRef, useState } from "react";
import { assistantCommand } from "@/components/workspace/status-bar";
import { cn } from "@/lib/utils";

type Mood =
  | "idle"
  | "look"
  | "wink"
  | "happy"
  | "fascinated"
  | "thinking"
  | "suggest"
  | "surprised"
  | "bored"
  | "sleep";

const TIPS = [
  "⌘J opens me",
  "want me to draft that?",
  "try /help",
  "I can summarize this page",
  "need a project plan?",
  "ask me to find something",
];
const BAR_HEIGHT = 28;
const BORED_AFTER = 40_000;
const SLEEP_AFTER = 90_000;

const INK = "#18181b";

/** Eyes for each mood. `look` nudges the pupils toward the cursor. */
export function Face({ mood, look, blink }: { mood: Mood; look: { x: number; y: number }; blink: boolean }) {
  const L = 17.5;
  const R = 26;
  const Y = 24;

  if (mood === "sleep") {
    return (
      <g stroke={INK} strokeWidth="1.3" fill="none" strokeLinecap="round">
        <path d={`M${L - 2} ${Y + 0.5}q2 1.4 4 0`} />
        <path d={`M${R - 2} ${Y + 0.5}q2 1.4 4 0`} />
      </g>
    );
  }

  if (mood === "happy") {
    return (
      <g stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d={`M${L - 2} ${Y + 0.8}q2 -2.6 4 0`} />
        <path d={`M${R - 2} ${Y + 0.8}q2 -2.6 4 0`} />
      </g>
    );
  }

  if (mood === "wink") {
    return (
      <g>
        <ellipse cx={L + look.x} cy={Y + look.y} rx="1.8" ry="2.4" fill={INK} />
        <path d={`M${R - 2} ${Y + 0.6}q2 -2 4 0`} stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    );
  }

  if (mood === "fascinated" || mood === "surprised") {
    const big = mood === "fascinated" ? { rx: 2.7, ry: 3.3 } : { rx: 2.5, ry: 2.5 };
    return (
      <g>
        {[L, R].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx + look.x * 0.6} cy={Y + look.y * 0.6} rx={big.rx} ry={big.ry} fill={INK} />
            <circle cx={cx + look.x * 0.6 + 0.9} cy={Y + look.y * 0.6 - 1.2} r="0.9" fill="#fff" />
            <circle cx={cx + look.x * 0.6 - 0.8} cy={Y + look.y * 0.6 + 1} r="0.45" fill="#fff" opacity="0.8" />
          </g>
        ))}
      </g>
    );
  }

  if (mood === "bored") {
    // Heavy lids: only the lower half of each eye shows.
    return (
      <g>
        {[L, R].map((cx) => (
          <g key={cx}>
            <path d={`M${cx - 1.9} ${Y + 0.3}a1.9 1.9 0 0 0 3.8 0Z`} fill={INK} />
            <path d={`M${cx - 2.4} ${Y + 0.3}h4.8`} stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
          </g>
        ))}
      </g>
    );
  }

  // idle, look, thinking, suggest: round pupils whose direction carries the mood.
  const offset =
    mood === "thinking" ? { x: 1.2, y: -1.4 } : mood === "suggest" ? { x: -1.2, y: -0.9 } : look;
  return (
    <g className={cn(blink && "mascot-blinking")}>
      <ellipse className="mascot-eye" cx={L + offset.x} cy={Y + offset.y} rx="1.8" ry="2.4" fill={INK} />
      <ellipse className="mascot-eye" cx={R + offset.x} cy={Y + offset.y} rx="1.8" ry="2.4" fill={INK} />
    </g>
  );
}

/**
 * Qubit, the little "q" that lives in the corner of every workspace. It watches
 * the cursor, gets wide-eyed while you type, thinks while the assistant works,
 * gets bored and dozes off when nothing happens, and opens the console on click.
 */
export function Mascot({
  variant = "workspace",
  onActivate,
  tips = TIPS,
  hoverLabel = "open assistant",
  size = 52,
}: {
  /** "workspace" floats in the corner and drives the console; "inline" sits in normal flow. */
  variant?: "workspace" | "inline";
  onActivate?: () => void;
  tips?: string[];
  hoverLabel?: string;
  size?: number;
} = {}) {
  const inline = variant === "inline";
  const [mood, setMood] = useState<Mood>("idle");
  const [motion, setMotion] = useState<"none" | "hop" | "wiggle">("none");
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [tip, setTip] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [consoleState, setConsoleState] = useState({ open: false, height: 360, busy: false });

  const ref = useRef<HTMLButtonElement>(null);
  const lastActivity = useRef(Date.now());
  const typingUntil = useRef(0);
  const transientUntil = useRef(0);
  const wasBusy = useRef(false);
  const reduced = useRef(false);

  const flash = (next: Mood, ms: number, move: "none" | "hop" | "wiggle" = "none") => {
    transientUntil.current = Date.now() + ms;
    setMood(next);
    if (move !== "none" && !reduced.current) {
      setMotion(move);
      setTimeout(() => setMotion("none"), 1100);
    }
  };

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onState = (event: Event) => {
      const d = (event as CustomEvent).detail ?? {};
      const busy = Boolean(d.busy);
      // The assistant just finished: celebrate a little.
      if (wasBusy.current && !busy) flash("happy", 2200, "hop");
      wasBusy.current = busy;
      setConsoleState({ open: Boolean(d.open), height: Number(d.height) || 360, busy });
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.key.length > 1) return;
      lastActivity.current = Date.now();
      typingUntil.current = Date.now() + 1400;
    };

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      lastActivity.current = Date.now();
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        const box = el.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 260) * 1.6;
        setLook({ x: (dx / dist) * reach, y: (dy / dist) * reach });
      });
    };

    window.addEventListener("quote:assistant-state", onState);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("quote:assistant-state", onState);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  // The mood loop: busy > transient reactions > typing > idle time > random fidgets.
  useEffect(() => {
    let nextFidget = Date.now() + 6000 + Math.random() * 6000;
    const tick = setInterval(() => {
      const now = Date.now();
      if (consoleState.busy) return setMood("thinking");
      if (now < transientUntil.current) return;
      if (now < typingUntil.current) return setMood("fascinated");
      if (hover) return setMood("happy");

      const quiet = now - lastActivity.current;
      if (quiet > SLEEP_AFTER) return setMood("sleep");
      if (quiet > BORED_AFTER) return setMood("bored");

      if (now > nextFidget && !reduced.current) {
        nextFidget = now + 6000 + Math.random() * 7000;
        const roll = Math.random();
        if (roll < 0.25) flash("look", 1800);
        else if (roll < 0.45) flash("wink", 900);
        else if (roll < 0.65 && !consoleState.open) {
          flash("suggest", 2800, "wiggle");
          setTip(tips[Math.floor(Math.random() * tips.length)]);
          setTimeout(() => setTip(null), 2800);
        } else if (roll < 0.8) flash("surprised", 1000, "hop");
        else flash("happy", 1200);
        return;
      }
      setMood("idle");
    }, 250);
    return () => clearInterval(tick);
  }, [consoleState.busy, consoleState.open, hover]);

  const bottom = consoleState.open ? BAR_HEIGHT + consoleState.height - 10 : BAR_HEIGHT + 14;
  const bubble = consoleState.busy
    ? "thinking…"
    : mood === "sleep"
      ? null
      : hover && !consoleState.open
        ? hoverLabel
        : tip;

  return (
    <div
      className={cn(
        "pointer-events-none",
        inline
          ? "relative inline-block"
          : "fixed right-4 z-[55] transition-[bottom] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:right-6"
      )}
      style={inline ? undefined : { bottom }}
    >
      {bubble && (
        <div className="absolute bottom-full right-0 mb-1 whitespace-nowrap rounded-lg border border-white/10 bg-[#202020] px-2 py-1 font-[family-name:var(--font-geist-mono)] text-[11px] text-zinc-300 shadow-lg animate-in fade-in slide-in-from-bottom-1 duration-200">
          {bubble}
        </div>
      )}
      <button
        ref={ref}
        type="button"
        aria-label="Open assistant"
        title="Assistant (⌘J)"
        onClick={() => {
          lastActivity.current = Date.now();
          flash("surprised", 700, "hop");
          if (onActivate) onActivate();
          else assistantCommand(consoleState.open ? "toggle" : "open");
        }}
        onPointerEnter={() => {
          setHover(true);
          lastActivity.current = Date.now();
        }}
        onPointerLeave={() => setHover(false)}
        className="pointer-events-auto block cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <svg
          viewBox="0 0 48 48"
          width={size}
          height={size}
          className={cn("mascot overflow-visible", `mascot-mood-${mood}`, motion !== "none" && `mascot-${motion}`)}
          aria-hidden
        >
          <defs>
            <linearGradient id="mascot-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fafafa" />
              <stop offset="1" stopColor="#c9c9cd" />
            </linearGradient>
          </defs>
          <ellipse className="mascot-shadow" cx="22" cy="43.5" rx="10" ry="1.8" fill="#000" opacity="0.45" />
          <g className="mascot-body">
            <circle cx="22" cy="25.5" r="12.5" fill="url(#mascot-body)" />
            <circle cx="14.5" cy="28.5" r="1.5" fill="#f9a8b4" opacity={mood === "happy" || mood === "fascinated" ? 0.8 : 0.5} />
            <circle cx="29" cy="28.5" r="1.5" fill="#f9a8b4" opacity={mood === "happy" || mood === "fascinated" ? 0.8 : 0.5} />
            <Face mood={mood} look={look} blink={mood === "idle" || mood === "look"} />
          </g>
          {mood === "sleep" && (
            <g className="mascot-zzz" fill="#a1a1aa" fontFamily="monospace">
              <text x="33" y="13" fontSize="7">z</text>
              <text x="38" y="7" fontSize="5">z</text>
            </g>
          )}
          {mood === "thinking" && (
            <g className="mascot-dots" fill="#a1a1aa">
              <circle cx="35" cy="11" r="1.3" />
              <circle cx="38.5" cy="8" r="1.3" />
              <circle cx="42" cy="5" r="1.3" />
            </g>
          )}
        </svg>
      </button>
    </div>
  );
}
