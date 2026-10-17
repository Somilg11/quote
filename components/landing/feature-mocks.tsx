import { ChevronRight, Copy, FileText, KeyRound, LayoutPanelTop, Plus, Search, Settings, Users } from "lucide-react";
import { SiModelcontextprotocol } from "react-icons/si";
import { LogoMark } from "@/components/brand/logo";
import { AgentGlyph, Tile } from "@/components/landing/figures";
import { cn } from "@/lib/utils";

/* Product shots for the feature chapters on the landing page. Real markup, so they
   stay sharp at any density; each is cropped by its panel. */

type NavKey = "overview" | "pages" | "mcp";

function MockSidebar({ active, tree }: { active: NavKey; tree?: { emoji: string; name: string; depth: number; on?: boolean; open?: boolean }[] }) {
  const row = (on: boolean) =>
    cn("flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px]", on ? "bg-white/[0.07] text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" : "text-zinc-400");
  const label = "px-2.5 pb-1 pt-3 text-[9.5px] font-medium uppercase tracking-[0.14em] text-zinc-600";
  return (
    <aside className="hidden w-[210px] shrink-0 border-r border-white/[0.07] bg-[#1b1b1b] p-2.5 sm:block">
      <div className="mb-2 flex items-center gap-2 px-1.5 py-1">
        <LogoMark className="h-5 w-5 rounded-md" />
        <span className="text-[13px] font-medium text-zinc-100">Acme workspace</span>
      </div>
      <div className="mb-1 flex items-center gap-2 rounded-lg border border-white/[0.07] bg-[#202020] px-2.5 py-1.5 text-[11.5px] text-zinc-500">
        <Search className="h-3 w-3" /> Search pages
      </div>
      <p className={label}>Workspace</p>
      <div className={row(active === "overview")}><LayoutPanelTop className="h-3.5 w-3.5" strokeWidth={1.6} />Overview</div>
      <div className={row(false)}><Users className="h-3.5 w-3.5" strokeWidth={1.6} />Members</div>
      <div className={row(false)}><Plus className="h-3.5 w-3.5" strokeWidth={1.6} />New page</div>
      <p className={label}>Pages</p>
      {(tree ?? [
        { emoji: "🚀", name: "Product roadmap", depth: 0 },
        { emoji: "📓", name: "Engineering notes", depth: 0 },
        { emoji: "📎", name: "Meeting notes", depth: 0 },
      ]).map((p) => (
        <div
          key={p.name}
          style={{ paddingLeft: p.depth * 12 + 4 }}
          className={cn("flex items-center gap-1.5 rounded-lg py-1.5 pr-2 text-[12.5px]", p.on ? "bg-white/[0.07] text-zinc-100" : "text-zinc-400")}
        >
          <ChevronRight className={cn("h-3 w-3 shrink-0 text-zinc-600", p.open && "rotate-90", p.open === undefined && "opacity-0")} />
          <span>{p.emoji}</span>
          <span className="truncate">{p.name}</span>
        </div>
      ))}
      <p className={label}>Connect</p>
      <div className={row(active === "mcp")}><SiModelcontextprotocol className="h-3 w-3" />MCP connection</div>
      <div className={row(false)}><Settings className="h-3.5 w-3.5" strokeWidth={1.6} />Settings</div>
    </aside>
  );
}

function Window({ children, active, tree }: { children: React.ReactNode; active: NavKey; tree?: Parameters<typeof MockSidebar>[0]["tree"] }) {
  return (
    <div className="flex h-full overflow-hidden rounded-t-2xl border border-b-0 border-white/10 bg-[#1f1f1f] text-left shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.9)]">
      <MockSidebar active={active} tree={tree} />
      <div className="relative min-w-0 flex-1">
        <span aria-hidden className="absolute inset-y-0 left-5 hidden border-l border-dotted border-white/[0.1] sm:block" />
        <span aria-hidden className="absolute inset-y-0 right-5 hidden border-r border-dotted border-white/[0.1] sm:block" />
        {children}
      </div>
    </div>
  );
}

/** Muted color fields for the chapter panels: tinted, never loud, still dark. */
const TONES = {
  sage: {
    base: "#1b2420",
    glow: "radial-gradient(70% 60% at 15% 0%, rgba(160,205,180,0.58), transparent 70%), radial-gradient(55% 60% at 100% 100%, rgba(120,175,150,0.40), transparent 70%), radial-gradient(40% 40% at 85% 10%, rgba(220,235,225,0.10), transparent 70%)",
  },
  dusk: {
    base: "#1c1e29",
    glow: "radial-gradient(70% 60% at 85% 0%, rgba(160,170,240,0.55), transparent 70%), radial-gradient(55% 60% at 0% 100%, rgba(130,120,215,0.38), transparent 70%), radial-gradient(40% 40% at 15% 10%, rgba(225,228,245,0.10), transparent 70%)",
  },
  clay: {
    base: "#251e1a",
    glow: "radial-gradient(70% 60% at 20% 0%, rgba(235,165,120,0.52), transparent 70%), radial-gradient(55% 60% at 100% 100%, rgba(210,130,95,0.36), transparent 70%), radial-gradient(40% 40% at 80% 10%, rgba(245,230,220,0.10), transparent 70%)",
  },
} as const;

export type Tone = keyof typeof TONES;

/** The panel every chapter sits in: a soft color field, a chip on top, a cropped window. */
export function FeaturePanel({ chip, children, tone = "sage" }: { chip: React.ReactNode; children: React.ReactNode; tone?: Tone }) {
  const t = TONES[tone];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.08]" style={{ backgroundColor: t.base }}>
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: t.glow }} />
      {/* Fine dot grid over the color, fading out toward the window. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.22] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:4px_4px] [mask-image:linear-gradient(to_bottom,#000_40%,transparent)]"
      />
      <div className="relative flex justify-center px-4 pt-8 sm:pt-10">{chip}</div>
      <div className="relative mt-8 h-[340px] px-3 sm:h-[420px] sm:px-10">
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{ backgroundImage: `linear-gradient(to top, ${t.base}, transparent)` }}
        />
      </div>
    </div>
  );
}

/** A dashed tray of tiles, used as the chip above a panel. */
export function ChipTray({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl border border-white/15 bg-white/[0.07] p-2 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
      <div aria-hidden className="pointer-events-none absolute inset-1 rounded-lg border border-dashed border-white/[0.14]" />
      <div className="relative flex items-center gap-2 px-1 py-0.5 sm:gap-3">{children}</div>
    </div>
  );
}

export const Arrow = () => <span className="text-xs text-zinc-600">→</span>;

export function EmojiTile({ emoji }: { emoji: string }) {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-b from-[#303030] to-[#232323] text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10">
      {emoji}
    </span>
  );
}

export function PagesMock() {
  return (
    <Window
      active="pages"
      tree={[
        { emoji: "🚀", name: "Product roadmap", depth: 0, open: true },
        { emoji: "📐", name: "Specs", depth: 1, open: true },
        { emoji: "🔐", name: "Auth flow", depth: 2, on: true },
        { emoji: "🗓", name: "Q4 planning", depth: 1 },
        { emoji: "📓", name: "Engineering notes", depth: 0, open: false },
      ]}
    >
      <div className="px-6 py-7 sm:px-12 sm:py-9">
        <p className="flex items-center gap-1.5 text-[11.5px] text-zinc-500">
          🚀 Product roadmap <ChevronRight className="h-3 w-3" /> 📐 Specs <ChevronRight className="h-3 w-3" /> <span className="text-zinc-300">🔐 Auth flow</span>
        </p>
        <p className="mt-5 text-3xl">🔐</p>
        <h4 className="mt-2 text-2xl font-normal tracking-[-0.04em] text-zinc-100 sm:text-3xl">Auth flow</h4>
        <p className="mt-4 max-w-md text-[13px] leading-relaxed text-zinc-400">
          Sessions are short-lived JWTs. Refresh rotates on every use, and reuse revokes the whole grant.
        </p>
        <p className="mt-5 text-[13px] font-medium text-zinc-200">Sub-pages</p>
        <div className="mt-2 max-w-md divide-y divide-dotted divide-white/[0.12] border-y border-dotted border-white/[0.12]">
          {["🪪  Session tokens", "🧭  OAuth scopes", "🧪  Test plan"].map((p) => (
            <p key={p} className="flex items-center gap-2 py-2 text-[13px] text-zinc-300">
              {p}
              <ChevronRight className="ml-auto h-3.5 w-3.5 text-zinc-600" />
            </p>
          ))}
        </div>
      </div>
    </Window>
  );
}

export function CollabMock() {
  return (
    <Window active="overview">
      <div className="px-6 py-7 sm:px-12 sm:py-9">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[11.5px] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> 3 editing · synced
          </p>
          <div className="flex -space-x-1.5">
            {["M", "K"].map((i) => (
              <span key={i} className="grid h-6 w-6 place-items-center rounded-md border-2 border-[#1f1f1f] bg-[#3a3a3a] text-[10px] text-zinc-100">{i}</span>
            ))}
            <span className="grid h-6 w-6 place-items-center rounded-md border-2 border-[#1f1f1f] bg-[#2a2a2a]">
              <AgentGlyph kind="claude" className="h-3 w-3" />
            </span>
          </div>
        </div>
        <p className="mt-5 text-3xl">📝</p>
        <h4 className="mt-2 text-2xl font-normal tracking-[-0.04em] text-zinc-100 sm:text-3xl">Launch notes</h4>
        <div className="mt-5 max-w-lg space-y-3 text-[13px] leading-[1.95] text-zinc-400">
          <p>
            Beta opens to the waitlist on Monday. Pricing stays free for teams under five
            <span className="relative mx-0.5 inline-block h-4 w-px translate-y-0.5 bg-sky-400">
              <span className="absolute -top-4 left-0 whitespace-nowrap rounded bg-sky-400 px-1 text-[9.5px] font-medium leading-4 text-zinc-900">Maya</span>
            </span>
            .
          </p>
          <p>
            The announcement draft lives in marketing, and support macros are ready
            <span className="relative mx-0.5 inline-block h-4 w-px translate-y-0.5 bg-[#D97757]">
              <span className="absolute -top-4 left-0 whitespace-nowrap rounded bg-[#D97757] px-1 text-[9.5px] font-medium leading-4 text-white">Claude</span>
            </span>
          </p>
          <div className="rounded-lg border-l-2 border-[#D97757]/70 bg-white/[0.03] px-3 py-2 text-zinc-300">
            Claude appended a checklist from your meeting notes · via MCP
          </div>
          <div className="space-y-1.5 pt-1">
            {["Send waitlist email", "Publish changelog", "Turn on billing"].map((t, i) => (
              <p key={t} className="flex items-center gap-2.5">
                <span className={cn("grid h-3.5 w-3.5 place-items-center rounded-[4px] border", i === 0 ? "border-zinc-300 bg-zinc-300" : "border-white/25")} />
                <span className={i === 0 ? "text-zinc-500 line-through" : "text-zinc-300"}>{t}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

export function McpMock() {
  return (
    <Window active="mcp">
      <div className="px-6 py-7 sm:px-12 sm:py-9">
        <h4 className="text-2xl font-normal leading-tight tracking-[-0.04em] text-zinc-100 sm:text-3xl">
          MCP connections.
          <span className="block text-zinc-500">One endpoint, every client.</span>
        </h4>
        <div className="mt-6 flex max-w-lg items-center gap-2 rounded-lg border border-white/10 bg-[#191919] px-3 py-2 font-mono text-[11.5px] text-zinc-300">
          <span className="truncate">https://quotemini.vercel.app/api/mcp</span>
          <Copy className="ml-auto h-3.5 w-3.5 shrink-0 text-zinc-500" />
        </div>
        <div className="mt-4 max-w-lg overflow-hidden rounded-xl border border-white/10">
          <div className="flex gap-1 border-b border-white/[0.07] bg-[#1c1c1c] p-1 text-[11px]">
            {["Claude Code", "Cursor", "ChatGPT", "Gemini"].map((c, i) => (
              <span key={c} className={cn("rounded-md px-2.5 py-1", i === 0 ? "bg-[#2c2c2c] text-zinc-100" : "text-zinc-500")}>{c}</span>
            ))}
          </div>
          <pre className="bg-[#171717] p-3 font-mono text-[11px] leading-relaxed text-zinc-400">
{`claude mcp add --transport http quote \\
  https://quotemini.vercel.app/api/mcp \\
  --header "Authorization: Bearer qt_••••"`}
          </pre>
        </div>
        <div className="mt-4 flex max-w-lg items-center gap-3 rounded-xl border border-white/[0.08] px-3 py-2.5 text-[12px]">
          <KeyRound className="h-3.5 w-3.5 text-zinc-500" />
          <span className="text-zinc-200">Claude Code on my laptop</span>
          <span className="font-mono text-zinc-500">qt_8Kd2…</span>
          <span className="ml-auto text-zinc-500">used 2m ago</span>
        </div>
      </div>
    </Window>
  );
}

export function McpChip() {
  return (
    <ChipTray>
      <Tile kind="claude" className="!h-11 !w-11 !rounded-lg [&_svg]:!h-5 [&_svg]:!w-5" />
      <Arrow />
      <Tile kind="quote" className="!h-11 !w-11 !rounded-lg [&_svg]:!h-6 [&_svg]:!w-6" />
      <Arrow />
      <Tile kind="chatgpt" className="!h-11 !w-11 !rounded-lg [&_svg]:!h-5 [&_svg]:!w-5" />
    </ChipTray>
  );
}

export function CollabChip() {
  return (
    <ChipTray>
      {["M", "K"].map((i) => (
        <span key={i} className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] text-sm text-zinc-100 ring-1 ring-white/10">{i}</span>
      ))}
      <Arrow />
      <Tile kind="claude" className="!h-11 !w-11 !rounded-lg [&_svg]:!h-5 [&_svg]:!w-5" />
    </ChipTray>
  );
}

export function PagesChip() {
  return (
    <ChipTray>
      <EmojiTile emoji="🚀" />
      <Arrow />
      <EmojiTile emoji="📐" />
      <Arrow />
      <EmojiTile emoji="🔐" />
      <FileText className="sr-only" />
    </ChipTray>
  );
}
