import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { productionUrl, siteConfig } from "@/lib/brand";
import { jsonLdPayload } from "@/lib/security";
import { mcpClientConfigs } from "@/lib/mcp/clients";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { LandingNav } from "@/components/landing/nav";
import { AppMock } from "@/components/landing/app-mock";
import { McpSetup } from "@/components/landing/mcp-setup";
import { Reveal } from "@/components/landing/reveal";
import {
  ArrowRight,
  Blocks,
  Bot,
  FileStack,
  Globe,
  Keyboard,
  Plug,
  Search,
  Share2,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const features = [
  {
    icon: FileStack,
    title: "Pages inside pages",
    body: "Nest documents as deep as your thinking goes. Every page carries its own emoji, children, and share settings.",
  },
  {
    icon: Users,
    title: "Live co-editing",
    body: "Edits merge conflict-free with CRDTs. Two people on the same paragraph stay in sync without stepping on each other.",
  },
  {
    icon: Keyboard,
    title: "Slash commands",
    body: "Press / for headings, lists, quotes, code, tables, images, and dividers. Arrow keys and Enter, nothing else to learn.",
  },
  {
    icon: Search,
    title: "Instant search",
    body: "⌘K jumps to any page in any workspace. Filter as you type; open with Enter.",
  },
  {
    icon: Share2,
    title: "Sharing you can reason about",
    body: "Private, workspace-wide, or a public read-only link. Three states, no permission matrix to decode.",
  },
  {
    icon: Zap,
    title: "Offline-tolerant",
    body: "Your document lives in the browser first and reconciles when the network comes back. Close the laptop mid-sentence.",
  },
];

const mcpTools = [
  { name: "list_workspaces", body: "Enumerate every workspace the token can reach." },
  { name: "search_pages", body: "Full-text search across titles and page bodies." },
  { name: "read_page", body: "Fetch a page as clean Markdown." },
  { name: "create_page", body: "Create a page, optionally nested under a parent." },
  { name: "update_page", body: "Rewrite, append to, or retitle an existing page." },
  { name: "delete_page", body: "Remove a page the token owns." },
];

const faqs = [
  {
    q: "Is Quote a Notion replacement?",
    a: "It is a deliberately small one. Nested pages, a block editor, real-time collaboration, workspaces, invites, and sharing — without databases, formulas, or automations. If you want a fast shared notepad for a team, that gap is the point.",
  },
  {
    q: "How does collaboration work without a realtime server?",
    a: "Documents are Yjs CRDTs. Edits are appended to a log in Postgres and pulled by other clients on a short adaptive interval, so there is no always-on socket to pay for. Expect roughly a second of latency instead of instant, with no lost edits and no merge conflicts.",
  },
  {
    q: "What can an AI assistant actually do with my notes?",
    a: "Everything you can: create and delete workspaces, scaffold nested page trees, search, read, move, duplicate and edit pages, invite or remove members, and change sharing. Twenty-three tools in all. Access is scoped to your account, read-only connections cannot write, and any connection can be revoked at any time.",
  },
  {
    q: "Which AI tools can connect?",
    a: "Any MCP client that speaks streamable HTTP. In the browser: claude.ai custom connectors, ChatGPT developer-mode apps, and Gemini custom apps for Spark. In the terminal and your editor: Claude Code, Claude Desktop, Gemini CLI, Cursor, and VS Code.",
  },
  {
    q: "Where does my data live?",
    a: "In your own Postgres database. Quote is a Next.js app you deploy yourself — there is no vendor in the middle holding your pages.",
  },
];

export default async function HomePage() {
  const session = await auth();
  if (session?.user) redirect("/workspaces");

  // The landing page advertises the hosted endpoint, never the local one.
  const clients = mcpClientConfigs(productionUrl("/api/mcp"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Nested pages",
      "Real-time collaborative editing",
      "Workspaces and invites",
      "Public share links",
      "MCP server for AI assistants",
    ],
  };

  return (
    <div className="min-h-screen overflow-x-clip scroll-smooth bg-[#0F0F10] text-zinc-100 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdPayload(jsonLd) }}
      />

      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.07),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(70%_50%_at_50%_0%,#000,transparent)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <a
              href="#mcp"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-zinc-200">
                <Plug className="h-2.5 w-2.5 text-[#191919]" />
              </span>
              <span className="truncate">Connect Claude, ChatGPT &amp; Gemini over MCP</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
            </a>

            <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              A calm place to write together —{" "}
              <span className="bg-gradient-to-r from-zinc-400 to-zinc-600 bg-clip-text text-transparent">
                and let your AI in
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-400 sm:mt-6 sm:text-lg">
              Quote is a minimal, Notion-style workspace: nested pages, a block editor, and
              live collaboration. It also ships an MCP server, so the assistants you already
              use can read and write your notes directly.
            </p>

            <div className="mt-8 flex w-full flex-col items-stretch gap-2.5 sm:mt-9 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
              <Link href="/auth/signup" className="sm:w-auto">
                <Button
                  size="lg"
                  className="group h-11 w-full bg-white px-6 text-zinc-900 shadow-[0_8px_30px_-8px_rgba(255,255,255,0.25)] transition-all hover:bg-zinc-100 active:scale-[0.98] sm:w-auto"
                >
                  Start writing — free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <a href="#mcp" className="sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 w-full border-white/15 bg-white/[0.03] px-6 text-zinc-200 backdrop-blur transition-colors hover:bg-white/[0.07] hover:text-white sm:w-auto"
                >
                  See the MCP setup
                </Button>
              </a>
            </div>

            <p className="mt-5 text-[11px] text-zinc-600 sm:text-xs">
              No credit card · Self-hostable · Your Postgres, your data
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-10 sm:mt-16 lg:mt-20">
            <AppMock />
          </Reveal>
        </div>
      </section>

      {/* Client strip */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
          <Reveal className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-sm text-zinc-600 sm:gap-x-8 sm:gap-y-3">
            <span className="w-full text-center text-[10px] uppercase tracking-[0.18em] text-zinc-700 sm:w-auto sm:text-xs">
              Speaks MCP with
            </span>
            {["Claude.ai", "ChatGPT", "Gemini", "Claude Code", "Claude Desktop", "Cursor"].map(
              (name) => (
                <span key={name} className="text-xs font-medium text-zinc-500 sm:text-sm">
                  {name}
                </span>
              )
            )}
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-zinc-500">Features</p>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
              Everything a shared notepad owes you. Nothing it doesn&apos;t.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Reveal
                key={feature.title}
                delay={index * 60}
                className="group bg-[#0F0F10] p-6 transition-colors hover:bg-[#151517]"
              >
                <span className="mb-4 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors group-hover:border-white/25 group-hover:text-white">
                  <feature.icon className="h-4 w-4" />
                </span>
                <h3 className="mb-2 font-medium text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{feature.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section id="collaboration" className="scroll-mt-20 border-y border-white/5 bg-white/[0.015] py-16 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-zinc-500">
              Collaboration
            </p>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
              Conflict-free by construction
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">
              Every page is a CRDT. Edits from different people merge deterministically, so
              there is no last-write-wins, no locked documents, and no &quot;someone else is
              editing&quot; dialog. Changes sync over plain HTTP on a short adaptive interval —
              fast when the room is busy, quiet when it isn&apos;t.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-zinc-400">
              {[
                "Edits survive a dropped connection and replay on reconnect",
                "Local-first: your draft is on your machine before it is anywhere else",
                "Presence shows who else has the page open right now",
                "Polling backs off when the tab is hidden, so idle tabs cost nothing",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="rounded-xl border border-white/10 bg-[#141414] p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-600">Live now</span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-400" />
                </span>
                Synced
              </span>
            </div>
            <div className="space-y-3">
              {[
                { who: "Maya", what: "added a heading", tone: "bg-[#4d4d4a]" },
                { who: "Kabir", what: "edited paragraph 3", tone: "bg-[#3f4448]" },
                { who: "Claude", what: "appended notes via MCP", tone: "bg-[#4a4340]" },
              ].map((row) => (
                <div
                  key={row.who}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-[#191919] px-3 py-2.5"
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-[11px] font-semibold text-zinc-100 ${row.tone}`}
                  >
                    {row.who[0]}
                  </span>
                  <span className="shrink-0 text-sm text-zinc-300">{row.who}</span>
                  <span className="truncate text-sm text-zinc-600">{row.what}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MCP */}
      <section id="mcp" className="scroll-mt-20 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
              <Bot className="h-3.5 w-3.5" />
              Model Context Protocol
            </p>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
              Your notes, as a tool your assistant can call
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-400 sm:mt-5 sm:text-base">
              Quote exposes a first-class MCP server over streamable HTTP. Generate a personal
              token, paste one config block, and Claude Code, ChatGPT, or Gemini can search,
              read, and write your pages — inside the same workspaces your teammates use.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8">
            <Reveal className="min-w-0">
              <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
                {mcpTools.map((tool) => (
                  <div key={tool.name} className="min-w-0 bg-[#0F0F10] px-4 py-3.5 sm:px-5 sm:py-4">
                    <code className="break-all font-mono text-[13px] font-medium text-zinc-200 sm:text-sm">
                      {tool.name}
                    </code>
                    <p className="mt-1 text-[13px] leading-relaxed text-zinc-500 sm:text-sm">{tool.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-zinc-600 sm:text-xs">
                <Blocks className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Tokens are hashed at rest, shown once, scoped to your account, and revocable
                from Settings ▸ Connections.
              </p>
            </Reveal>

            <Reveal delay={120} className="min-w-0">
              <McpSetup clients={clients} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-white/5 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
              Questions, answered
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={index * 50}>
                <details className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-zinc-100">
                    {faq.q}
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 text-zinc-500 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-8 sm:pb-24">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#141414] px-5 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]"
          />
          <h2 className="relative text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
            Start a workspace in about ten seconds
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">
            Create an account, make a page, invite whoever needs it. Wire up your AI whenever
            you feel like it.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-2.5 sm:flex-row sm:gap-3">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="group h-11 w-full bg-white px-6 text-zinc-900 transition-all hover:bg-zinc-100 active:scale-[0.98] sm:w-auto"
              >
                Create your workspace
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                size="lg"
                variant="outline"
                className="h-11 w-full border-white/15 bg-transparent px-6 text-zinc-200 hover:bg-white/5 hover:text-white sm:w-auto"
              >
                I already have an account
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <Logo wordClassName="text-white" />
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-zinc-600">
              {siteConfig.shortDescription}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-600">
            <a href="#features" className="transition-colors hover:text-zinc-300">
              Features
            </a>
            <a href="#mcp" className="transition-colors hover:text-zinc-300">
              MCP
            </a>
            <a href="#faq" className="transition-colors hover:text-zinc-300">
              FAQ
            </a>
            <Link href="/auth/signin" className="transition-colors hover:text-zinc-300">
              Sign in
            </Link>
            <span className="flex items-center gap-1.5">
              <Globe className="h-3 w-3" />
              Self-hosted
            </span>
          </div>
        </div>
        <div className="border-t border-white/5 px-4 py-5 sm:px-8">
          <p className="mx-auto max-w-6xl text-[11px] text-zinc-700">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js, Yjs, TipTap and
            Postgres.
          </p>
        </div>
      </footer>
    </div>
  );
}
