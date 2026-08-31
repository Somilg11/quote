import { LogoMark } from "@/components/brand/logo";

const pageTree = [
  { icon: "🚀", label: "Product roadmap", active: true, depth: 0 },
  { icon: "📐", label: "Specs", depth: 1 },
  { icon: "🗓", label: "Q3 planning", depth: 1 },
  { icon: "📓", label: "Engineering notes", depth: 0 },
  { icon: "📎", label: "Meeting notes", depth: 0 },
];

const collaborators = [
  { initial: "M", tone: "bg-[#4d4d4a]" },
  { initial: "K", tone: "bg-[#3f4448]" },
  { initial: "A", tone: "bg-[#4a4340]" },
];

const checklist = [
  { label: "Nested pages and backlinks", done: true },
  { label: "MCP write access for agents", done: true },
  { label: "Offline-first editing", done: false },
];

/**
 * Static product shot for the hero. Real markup rather than a screenshot, so it
 * stays sharp at any density and reflows cleanly on small screens.
 */
export function AppMock() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#191919] shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)] sm:rounded-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-[#151515] px-3 py-2.5 sm:px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />
        <div className="ml-2 flex min-w-0 items-center gap-1.5 rounded-md bg-[#1f1f1f] px-2 py-1 text-[10px] text-zinc-500 sm:ml-3 sm:text-[11px]">
          <LogoMark className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="truncate">quote.app/acme/product-roadmap</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] lg:grid-cols-[210px_1fr]">
        {/* Sidebar */}
        <div className="hidden flex-col border-r border-white/[0.07] bg-[#1c1c1c] p-2.5 sm:flex">
          <div className="mb-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-zinc-300">
            <span className="grid h-5 w-5 place-items-center rounded bg-[#3a3a38] text-[10px] font-bold text-zinc-100">
              A
            </span>
            <span className="truncate">Acme</span>
          </div>

          <div className="mb-2 flex items-center gap-2 rounded-md bg-[#242424] px-2 py-1.5 text-[11px] text-zinc-500">
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 shrink-0 stroke-current" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            Search
            <kbd className="ml-auto rounded border border-white/10 px-1 text-[9px]">⌘K</kbd>
          </div>

          <div className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
            Pages
          </div>

          {pageTree.map((page) => (
            <div
              key={page.label}
              style={{ paddingLeft: `${page.depth * 12 + 8}px` }}
              className={`flex items-center gap-2 rounded-md py-1.5 pr-2 text-xs ${
                page.active ? "bg-[#2c2c2c] text-zinc-100" : "text-zinc-500"
              }`}
            >
              <span className="text-[11px]">{page.icon}</span>
              <span className="truncate">{page.label}</span>
            </div>
          ))}
        </div>

        {/* Page */}
        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-4 flex items-start justify-between gap-3 sm:mb-5">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <span className="text-xl sm:text-2xl">🚀</span>
              <div className="min-w-0">
                <div className="truncate text-base font-semibold text-zinc-100 sm:text-lg">
                  Product roadmap
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-zinc-500 sm:text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                  3 editing · saved
                </div>
              </div>
            </div>
            <div className="flex shrink-0 -space-x-1.5">
              {collaborators.map((user) => (
                <span
                  key={user.initial}
                  className={`grid h-6 w-6 place-items-center rounded-md border-2 border-[#191919] text-[10px] font-semibold text-zinc-100 sm:h-7 sm:w-7 sm:text-[11px] ${user.tone}`}
                >
                  {user.initial}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 text-[13px] leading-relaxed text-zinc-400 sm:space-y-4 sm:text-sm">
            <p className="text-zinc-300">
              Q3 is about depth, not surface area. Three bets, one owner each.
            </p>

            <div className="space-y-2">
              {checklist.map((item, index) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border ${
                      item.done ? "border-zinc-400 bg-zinc-300" : "border-zinc-600"
                    }`}
                  >
                    {item.done && (
                      <svg viewBox="0 0 10 10" className="h-2 w-2 fill-none stroke-[#191919]" strokeWidth="2">
                        <path d="m1.5 5 2.2 2.2L8.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className={item.done ? "text-zinc-500 line-through decoration-zinc-700" : "text-zinc-300"}>
                    {item.label}
                  </span>
                  {index === 2 && (
                    <span className="relative ml-0.5 hidden h-4 w-px shrink-0 bg-zinc-300 sm:inline-block">
                      <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-zinc-300 px-1.5 py-0.5 text-[10px] font-medium text-[#191919]">
                        Maya
                      </span>
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-md border-l-2 border-zinc-600 bg-white/[0.02] py-2 pl-3 pr-3 text-zinc-400">
              Ship the MCP server before the offline work — it unblocks the agent demo.
            </div>

            <div className="flex items-center gap-2 overflow-x-auto rounded-md border border-white/[0.07] bg-[#1c1c1c] px-3 py-2 font-mono text-[10px] text-zinc-500 sm:text-[11px]">
              <span className="shrink-0 rounded bg-[#2a2a2a] px-1.5 py-0.5 text-zinc-300">claude</span>
              <span className="whitespace-nowrap">update_page(&quot;Product roadmap&quot;)</span>
              <span className="ml-auto shrink-0 text-zinc-400">✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
