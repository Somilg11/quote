import { ChevronRight, ChevronsUpDown, LayoutPanelTop, Plus, Search, Settings, Users } from "lucide-react";
import { SiModelcontextprotocol } from "react-icons/si";
import { LogoMark } from "@/components/brand/logo";
import { ActivityRow } from "@/components/landing/figures";

type Icon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

const workspaceNav: { icon: Icon; name: string; active?: boolean }[] = [
  { icon: LayoutPanelTop, name: "Overview", active: true },
  { icon: Users, name: "Members" },
  { icon: Plus, name: "New page" },
];

const pageTree = [
  { emoji: "🚀", name: "Product roadmap", depth: 0, open: true, parent: true },
  { emoji: "📐", name: "Specs", depth: 1 },
  { emoji: "🗓", name: "Q4 planning", depth: 1 },
  { emoji: "📓", name: "Engineering notes", depth: 0, parent: true },
  { emoji: "📎", name: "Meeting notes", depth: 0 },
];

const stats = [
  { value: "24", label: "Pages" },
  { value: "3", label: "Collaborators" },
  { value: "12", label: "Agent edits" },
];

const steps = ["Create an access token", "Add Quote to your assistant", "Write your first page"];

function Mark({ className }: { className: string }) {
  return (
    <span aria-hidden className={`absolute -translate-x-1/2 -translate-y-1/2 select-none text-sm font-light leading-none text-zinc-600 ${className}`}>
      +
    </span>
  );
}

/**
 * Product shot for the hero: the workspace overview, drawn as markup so it stays
 * sharp at any density and reflows on small screens.
 */
export function AppMock() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#1f1f1f] shadow-[0_60px_120px_-60px_rgba(0,0,0,1)] sm:rounded-2xl">
      <div className="grid sm:grid-cols-[230px_1fr] lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-white/[0.07] bg-[#1b1b1b] p-2.5 sm:block">
          <div className="mb-3 flex items-center gap-2.5 px-1.5 py-1">
            <LogoMark className="h-6 w-6 rounded-md" />
            <span className="text-sm font-medium text-zinc-100">Acme workspace</span>
            <ChevronsUpDown className="ml-auto h-3.5 w-3.5 text-zinc-600" />
          </div>
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-white/[0.07] bg-[#202020] px-2.5 py-2 text-xs text-zinc-500">
            <Search className="h-3.5 w-3.5" />
            Search pages
            <kbd className="ml-auto rounded border border-white/10 px-1 text-[9px] text-zinc-600">⌘K</kbd>
          </div>

          <p className="px-2.5 pb-1.5 pt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">Workspace</p>
          {workspaceNav.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                item.active ? "bg-white/[0.07] text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" : "text-zinc-400"
              }`}
            >
              <item.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
              {item.name}
            </div>
          ))}

          <p className="flex items-center justify-between px-2.5 pb-1.5 pt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">
            Pages
            <Plus className="h-3 w-3" />
          </p>
          {pageTree.map((page) => (
            <div
              key={page.name}
              style={{ paddingLeft: page.depth * 14 + 4 }}
              className="flex items-center gap-1.5 rounded-lg py-1.5 pr-2 text-[13px] text-zinc-400"
            >
              <ChevronRight className={`h-3 w-3 shrink-0 text-zinc-600 ${page.open ? "rotate-90" : ""} ${page.parent ? "" : "opacity-0"}`} />
              <span className="text-sm">{page.emoji}</span>
              <span className="truncate">{page.name}</span>
            </div>
          ))}

          <p className="px-2.5 pb-1.5 pt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">Connect</p>
          <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-zinc-400">
            <SiModelcontextprotocol className="h-3.5 w-3.5 shrink-0" />
            MCP connection
          </div>
          <p className="px-2.5 pb-1.5 pt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">Account</p>
          <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-zinc-400">
            <Settings className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
            Settings
          </div>
        </aside>

        <div className="relative min-w-0 sm:px-8">
          <span aria-hidden className="absolute inset-y-0 left-5 hidden border-l border-dotted border-white/[0.12] sm:block" />
          <span aria-hidden className="absolute inset-y-0 right-5 hidden border-r border-dotted border-white/[0.12] sm:block" />

          <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-12">
            <div>
              <h3 className="text-2xl font-normal leading-[1.05] tracking-[-0.04em] text-zinc-100 sm:text-4xl">
                Good morning, Maya.
                <br />
                <span className="text-zinc-500">Your notes, carried forward.</span>
              </h3>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-zinc-500">
                Every page, edit and agent action in this workspace, in one place.
              </p>
            </div>
            <span className="inline-flex h-9 w-fit shrink-0 items-center rounded-lg bg-zinc-100 px-4 text-[13px] text-zinc-900 shadow-[inset_0_1px_0_#fff]">
              New page +
            </span>
          </div>

          <div className="relative border-t border-white/[0.07]">
            <Mark className="-left-5 top-0 hidden sm:block" />
            <Mark className="-right-5 top-0 hidden sm:block" />
            <div className="grid gap-6 p-5 sm:grid-cols-[180px_1fr] sm:px-10 sm:py-9">
              <div>
                <p className="text-sm text-zinc-100">Agent activity</p>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                  What your assistants just did, as it happens.
                </p>
              </div>
              <div className="space-y-2.5">
                <ActivityRow kind="claude" action="updated a page" target="Product roadmap" time="now" className="!shadow-none" />
                <ActivityRow kind="chatgpt" action="searched pages" target="“Q4 planning”" time="12s" className="hidden !shadow-none sm:flex" />
              </div>
            </div>
          </div>

          <div className="relative border-t border-white/[0.07]">
            <Mark className="-left-5 top-0 hidden sm:block" />
            <Mark className="-right-5 top-0 hidden sm:block" />
            <div className="grid gap-5 p-5 sm:grid-cols-[180px_1fr] sm:px-10 sm:py-9">
              <div>
                <p className="text-sm text-zinc-100">Overview</p>
                <p className="mt-1.5 text-xs text-zinc-500">Live counts for this workspace.</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div key={stat.label} className={i > 0 ? "border-l border-white/[0.07] pl-4" : ""}>
                    <p className="text-2xl font-light tracking-[-0.03em] text-zinc-100 sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden border-t border-white/[0.07] sm:block">
            <div className="grid grid-cols-[180px_1fr] gap-6 px-10 py-9">
              <div>
                <p className="text-sm text-zinc-100">Get set up</p>
                <p className="mt-1.5 text-xs text-zinc-500">Three steps to your first handoff.</p>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-4 py-2.5 text-[13px] text-zinc-300">
                    <span className="font-mono text-[11px] text-zinc-600">0{i + 1}</span>
                    {step}
                    <span className="ml-auto text-zinc-600">+</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
