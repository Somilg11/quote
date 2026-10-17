import { SiClaude, SiCursor, SiGooglegemini } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export type AgentKind = "claude" | "chatgpt" | "gemini" | "cursor";

export const agents: Record<AgentKind, { name: string; Icon: React.ComponentType<{ className?: string }>; tone: string }> = {
  claude: { name: "Claude", Icon: SiClaude, tone: "text-[#D97757]" },
  chatgpt: { name: "ChatGPT", Icon: RiOpenaiFill, tone: "text-zinc-100" },
  gemini: { name: "Gemini", Icon: SiGooglegemini, tone: "text-[#8E9BFF]" },
  cursor: { name: "Cursor", Icon: SiCursor, tone: "text-zinc-100" },
};

/** Real brand glyph for an MCP client. */
export function AgentGlyph({ kind, className }: { kind: AgentKind; className?: string }) {
  const { Icon, tone, name } = agents[kind];
  return <Icon aria-label={name} className={cn("h-5 w-5", tone, className)} />;
}

/** A raised app tile holding a logo, or the Quote mark. */
export function Tile({
  kind,
  className,
}: {
  kind: AgentKind | "quote";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-[#303030] to-[#232323] ring-1 ring-white/10 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-[72px] sm:w-[72px] sm:rounded-xl",
        className
      )}
    >
      {kind === "quote" ? (
        <LogoMark className="h-9 w-9 rounded-lg" />
      ) : (
        <AgentGlyph kind={kind} className="h-7 w-7 sm:h-8 sm:w-8" />
      )}
    </span>
  );
}

/** One line of agent activity, as it would appear in the workspace feed. */
export function ActivityRow({
  kind,
  action,
  target,
  time,
  className,
}: {
  kind: AgentKind;
  action: string;
  target: string;
  time: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#262626]/90 px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur",
        className
      )}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#1c1c1c] ring-1 ring-white/[0.06]">
        <AgentGlyph kind={kind} className="h-4 w-4" />
      </span>
      <div className="min-w-0 text-left">
        <p className="truncate text-[13px] text-zinc-200">
          {agents[kind].name} <span className="text-zinc-500">{action}</span>
        </p>
        <p className="truncate text-xs text-zinc-500">{target}</p>
      </div>
      <span className="ml-auto shrink-0 pl-3 text-[11px] text-zinc-600">{time}</span>
    </div>
  );
}

/** Hub figure: each client talks to the workspace through a named MCP tool. */
export function MemoryHub() {
  const spokes = [
    { kind: "claude" as const, x: 12, y: 22, tool: "read_page" },
    { kind: "chatgpt" as const, x: 88, y: 22, tool: "search_pages" },
    { kind: "cursor" as const, x: 12, y: 78, tool: "update_page" },
    { kind: "gemini" as const, x: 88, y: 78, tool: "create_page" },
  ];
  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#232323] to-[#1d1d1d] shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)]">
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(65%_75%_at_50%_50%,#000,transparent)]"
      />
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {spokes.map((s) => (
          <path
            key={s.kind}
            d={`M ${s.x} ${s.y} C ${s.x + (50 - s.x) * 0.55} ${s.y}, ${s.x + (50 - s.x) * 0.45} 50, 50 50`}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {spokes.map((s) => (
        <span
          key={s.kind}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          <Tile kind={s.kind} className="!h-14 !w-14 !rounded-xl sm:!h-[68px] sm:!w-[68px]" />
        </span>
      ))}
      {spokes.map((s) => (
        <span
          key={`${s.kind}-tool`}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#1c1c1c] px-2 py-0.5 font-mono text-[9px] text-zinc-400 sm:px-2.5 sm:text-[11px]"
          style={{ left: `${s.x + (50 - s.x) * 0.5}%`, top: `${s.y + (50 - s.y) * 0.5}%` }}
        >
          {s.tool}
        </span>
      ))}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Tile kind="quote" className="!h-20 !w-20 !rounded-2xl sm:!h-24 sm:!w-24 [&_svg]:!h-11 [&_svg]:!w-11" />
      </span>
    </div>
  );
}

/** Small illustrated panels used at the top of feature cards. */
export function ArtFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-[#232323] to-[#1e1e1e] p-4">
      {children}
    </div>
  );
}

export function TreeArt() {
  const rows = [
    { label: "Roadmap", depth: 0, active: true },
    { label: "Specs", depth: 1 },
    { label: "Q4 planning", depth: 1 },
    { label: "Engineering", depth: 0 },
    { label: "Meeting notes", depth: 1 },
  ];
  return (
    <ArtFrame>
      <div className="mx-auto w-full max-w-[220px] space-y-1 rounded-xl border border-white/[0.07] bg-[#2a2a2a] p-2 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)]">
        {rows.map((r) => (
          <div
            key={r.label}
            style={{ marginLeft: r.depth * 14 }}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1 text-[11px]",
              r.active ? "bg-white/[0.07] text-zinc-100" : "text-zinc-400"
            )}
          >
            <span className="h-2.5 w-2.5 rounded-[3px] border border-white/20 bg-transparent" />
            {r.label}
          </div>
        ))}
      </div>
    </ArtFrame>
  );
}

export function EditArt() {
  return (
    <ArtFrame>
      <div className="relative mx-auto max-w-[240px] rounded-xl border border-white/[0.07] bg-[#2a2a2a] p-3.5 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)]">
        <div className="h-2 w-24 rounded-full bg-zinc-300/80" />
        <div className="mt-3 space-y-2">
          <div className="h-1.5 w-full rounded-full bg-white/10" />
          <div className="h-1.5 w-[86%] rounded-full bg-white/10" />
          <div className="relative h-1.5 w-[64%] rounded-full bg-white/10">
            <span className="absolute -right-0.5 -top-1 h-3.5 w-px bg-[#F26A3B]" />
            <span className="absolute -right-1 -top-[22px] rounded bg-[#F26A3B] px-1.5 py-0.5 text-[9px] font-medium leading-none text-white">
              Claude
            </span>
          </div>
          <div className="relative h-1.5 w-[78%] rounded-full bg-white/10">
            <span className="absolute -right-0.5 -top-1 h-3.5 w-px bg-zinc-300" />
            <span className="absolute -right-1 top-3 rounded bg-zinc-300 px-1.5 py-0.5 text-[9px] font-medium leading-none text-zinc-900">
              Maya
            </span>
          </div>
        </div>
      </div>
    </ArtFrame>
  );
}

export function CallArt() {
  const calls = [
    { name: "search_pages", arg: "“roadmap”" },
    { name: "read_page", arg: "Product roadmap" },
    { name: "update_page", arg: "append notes" },
  ];
  return (
    <ArtFrame>
      <div className="mx-auto max-w-[250px] space-y-1.5">
        {calls.map((c, i) => (
          <div
            key={c.name}
            style={{ marginLeft: i * 10 }}
            className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-[#2a2a2a] px-2.5 py-1.5 font-mono text-[10.5px] shadow-[0_8px_18px_-12px_rgba(0,0,0,0.6)]"
          >
            <span className="text-zinc-100">{c.name}</span>
            <span className="truncate text-zinc-500">{c.arg}</span>
            <svg viewBox="0 0 10 10" className="ml-auto h-2.5 w-2.5 shrink-0 fill-none stroke-emerald-500" strokeWidth="1.6">
              <path d="m1.5 5 2.2 2.2L8.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>
    </ArtFrame>
  );
}
