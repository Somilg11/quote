import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { productionUrl, siteConfig } from "@/lib/brand";
import { jsonLdPayload } from "@/lib/security";
import { mcpClientConfigs } from "@/lib/mcp/clients";
import { Logo } from "@/components/brand/logo";
import { MemoryHub } from "@/components/landing/figures";
import { CollabChip, CollabMock, FeaturePanel, McpChip, McpMock, PagesChip, PagesMock } from "@/components/landing/feature-mocks";
import { SiClaude, SiCursor, SiGooglegemini, SiModelcontextprotocol, SiWindsurf, SiCline } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { LandingNav } from "@/components/landing/nav";
import { AppMock } from "@/components/landing/app-mock";
import { McpSetup } from "@/components/landing/mcp-setup";
import { AssistantShowcase } from "@/components/landing/assistant-showcase";
import { Reveal } from "@/components/landing/reveal";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const clientLogos = [
  { name: "Claude", Icon: SiClaude },
  { name: "ChatGPT", Icon: RiOpenaiFill },
  { name: "Gemini", Icon: SiGooglegemini },
  { name: "Cursor", Icon: SiCursor },
  { name: "Windsurf", Icon: SiWindsurf },
  { name: "Cline", Icon: SiCline },
  { name: "MCP", Icon: SiModelcontextprotocol },
];

const chapters = [
  {
    title: "Pages inside pages",
    body: "Nest documents as deep as your thinking goes. Breadcrumbs, sub-pages and share settings come with every page.",
    chip: PagesChip,
    mock: PagesMock,
    tone: "sage" as const,
  },
  {
    title: "Edit together, with your agents",
    body: "Edits merge conflict-free. Teammates and assistants can work in the same paragraph without stepping on each other.",
    chip: CollabChip,
    mock: CollabMock,
    tone: "clay" as const,
  },
  {
    title: "Connect Quote through MCP",
    body: "Paste one config block and Claude, Cursor, ChatGPT or Gemini can search, read and write your pages.",
    chip: McpChip,
    mock: McpMock,
    tone: "dusk" as const,
  },
];

const details = [
  { title: "Slash commands", body: "Press / for headings, lists, quotes, code, tables, and images." },
  { title: "Instant search", body: "⌘K jumps to any page in any workspace as you type." },
  { title: "Sharing you can reason about", body: "Private, workspace-wide, or a public read-only link. Nothing else." },
  { title: "Offline-tolerant", body: "Your draft lives in the browser first and reconciles when you reconnect." },
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

  const h2 =
    "text-balance text-3xl font-normal leading-[1.05] tracking-[-0.04em] text-zinc-100 sm:text-5xl";
  const rule = "border-t border-dotted border-white/[0.12]";

  return (
    <div className="min-h-screen overflow-x-clip scroll-smooth bg-[#191919] font-[family-name:var(--font-poppins)] text-zinc-100 antialiased selection:bg-white selection:text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdPayload(jsonLd) }}
      />

      <div id="top" className="mx-auto max-w-[1180px] border-x border-dotted border-white/[0.12]">
        <LandingNav />

        {/* Hero */}
        <section className="px-6 pb-16 pt-10 sm:px-12 sm:pb-24 sm:pt-16">
          <Reveal className="max-w-3xl">
            <h1 className="text-balance text-[2.75rem] font-normal leading-[0.98] tracking-[-0.05em] text-zinc-100 sm:text-7xl lg:text-[5.25rem]">
              Notes that your agents{" "}
              <span className="text-zinc-500">can work in.</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-[1.75] text-zinc-400 sm:text-lg">
              Quote is a quiet workspace for nested pages and live collaboration. It ships an MCP
              server, so Claude, ChatGPT and Gemini can read and write your pages, and the next
              session starts where the last one stopped.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                href="/auth/signup"
                className="group inline-flex h-12 items-center gap-2.5 rounded-lg bg-gradient-to-b from-zinc-50 to-zinc-300 px-6 text-[15px] text-zinc-900 shadow-[0_0_0_3px_rgba(255,255,255,0.08),0_14px_30px_-12px_rgba(255,255,255,0.25),inset_0_1px_0_#fff] transition-transform active:scale-[0.98]"
              >
                Get started
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a href="#mcp" className="inline-flex items-center gap-2 text-[15px] text-zinc-400 transition-colors hover:text-zinc-100">
                Explore MCP
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-14 sm:mt-20">
            <AppMock />
          </Reveal>
        </section>

        {/* Clients */}
        <section className={`${rule} px-6 py-14 sm:px-12 sm:py-20`}>
          <Reveal>
            <p className="mx-auto max-w-xl text-center text-base leading-relaxed text-zinc-400 sm:text-lg">
              One shared workspace, available through MCP wherever your agents work.
            </p>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {clientLogos.map(({ name, Icon }) => (
                <div key={name} className="flex items-center justify-center gap-3 text-xl text-zinc-500 sm:text-2xl">
                  <Icon className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                  {name}
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Assistant */}
        <section id="assistant" className={`${rule} scroll-mt-10 px-6 py-16 sm:px-12 sm:py-24`}>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
            <Reveal>
              <h2 className={h2}>
                An assistant that lives{" "}
                <span className="text-zinc-500">in your workspace.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-zinc-400">
                Press ⌘J and a console slides up. Ask for a plan, a summary or a cleanup, and watch
                it search, read and write your pages step by step. Qubit keeps you company in the
                corner while it works.
              </p>
              <ul className="mt-7 space-y-3 text-[15px] text-zinc-400">
                {[
                  "Runs on your own Anthropic, OpenAI or Gemini key",
                  "Keys are encrypted and never sent back to the browser",
                  "Creates and edits pages, never deletes or shares them",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <AssistantShowcase />
            </Reveal>
          </div>
        </section>

        {/* Shared memory */}
        <section id="memory" className={`${rule} scroll-mt-10 px-6 py-16 sm:px-12 sm:py-24`}>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
            <Reveal>
              <h2 className={h2}>
                One workspace for every agent{" "}
                <span className="text-zinc-500">that touches the work.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-zinc-400">
                Decisions, drafts and next steps live in your pages. Any assistant you connect
                picks up exactly where the last one stopped.
              </p>
              <a
                href="/auth/signup"
                className="mt-8 inline-flex items-center gap-2 text-[15px] text-zinc-100 transition-opacity hover:opacity-70"
              >
                Connect an agent
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
            <Reveal delay={100}>
              <MemoryHub />
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section id="features" className={`${rule} scroll-mt-10 px-6 py-16 sm:px-12 sm:py-24`}>
          <Reveal className="max-w-2xl">
            <h2 className={h2}>
              Keep the work connected <span className="text-zinc-500">across every handoff.</span>
            </h2>
          </Reveal>

          <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-28">
            {chapters.map((chapter) => (
              <Reveal key={chapter.title}>
                <div className="mx-auto mb-8 max-w-xl text-center sm:mb-10">
                  <h3 className="text-2xl font-normal tracking-[-0.04em] text-zinc-100 sm:text-4xl">{chapter.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-500">{chapter.body}</p>
                </div>
                <FeaturePanel chip={<chapter.chip />} tone={chapter.tone}>
                  <chapter.mock />
                </FeaturePanel>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid gap-x-10 gap-y-8 border-t border-dotted border-white/[0.12] pt-10 sm:mt-28 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <h3 className="text-sm font-medium text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* MCP */}
        <section id="mcp" className={`${rule} scroll-mt-10 px-6 py-16 sm:px-12 sm:py-24`}>
          <Reveal className="max-w-2xl">
            <h2 className={h2}>
              Your notes, as a tool <span className="text-zinc-500">your assistant can call.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-[1.75] text-zinc-400">
              Generate a personal token, paste one config block, and your assistant can search,
              read and write pages inside the same workspaces your teammates use.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <Reveal className="min-w-0">
              <div className="divide-y divide-dotted divide-white/[0.12] border-y border-dotted border-white/[0.12]">
                {mcpTools.map((tool) => (
                  <div key={tool.name} className="min-w-0 py-4">
                    <code className="break-all font-mono text-[13px] text-zinc-100">{tool.name}</code>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">{tool.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-zinc-500">
                Tokens are hashed at rest, shown once, scoped to your account, and revocable from
                Settings ▸ Connections.
              </p>
            </Reveal>

            <Reveal delay={120} className="min-w-0">
              <McpSetup clients={clients} />
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`${rule} scroll-mt-10 px-6 py-16 sm:px-12 sm:py-24`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
            <Reveal>
              <h2 className={h2}>
                Questions, <span className="text-zinc-500">answered.</span>
              </h2>
            </Reveal>
            <div className="divide-y divide-dotted divide-white/[0.12] border-y border-dotted border-white/[0.12]">
              {faqs.map((faq, index) => (
                <Reveal key={faq.q} delay={index * 50}>
                  <details className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[15px] text-zinc-100">
                      {faq.q}
                      <span className="grid h-6 w-6 shrink-0 place-items-center text-zinc-500 transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">{faq.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className={`${rule} px-6 py-16 sm:px-12 sm:py-24`}>
          <Reveal className="max-w-2xl">
            <h2 className={h2}>
              Start a workspace <span className="text-zinc-500">in about ten seconds.</span>
            </h2>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                href="/auth/signup"
                className="group inline-flex h-12 items-center gap-2.5 rounded-lg bg-gradient-to-b from-zinc-50 to-zinc-300 px-6 text-[15px] text-zinc-900 shadow-[0_0_0_3px_rgba(255,255,255,0.08),0_14px_30px_-12px_rgba(255,255,255,0.25),inset_0_1px_0_#fff] transition-transform active:scale-[0.98]"
              >
                Create your workspace
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="/auth/signin" className="inline-flex items-center gap-2 text-[15px] text-zinc-400 transition-colors hover:text-zinc-100">
                I already have an account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className={`${rule} relative overflow-hidden px-6 pt-12 sm:px-12 sm:pt-14`}>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Logo wordClassName="text-zinc-100 font-medium text-lg" />
              <p className="mt-4 max-w-[16rem] text-[15px] leading-relaxed text-zinc-500">
                {siteConfig.shortDescription}
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px] text-zinc-400">
              <a href="#assistant" className="transition-colors hover:text-zinc-100">Assistant</a>
              <a href="#memory" className="transition-colors hover:text-zinc-100">Memory</a>
              <a href="#features" className="transition-colors hover:text-zinc-100">How it works</a>
              <a href="#mcp" className="transition-colors hover:text-zinc-100">MCP</a>
              <a href="#faq" className="transition-colors hover:text-zinc-100">FAQ</a>
              <Link href="/auth/signin" className="transition-colors hover:text-zinc-100">Sign in</Link>
            </nav>
          </div>
          <div className="mt-14 flex items-center justify-between text-sm text-zinc-600">
            <span>© {new Date().getFullYear()} {siteConfig.name}</span>
            <a href="#top" className="transition-colors hover:text-zinc-300">Back to top ↑</a>
          </div>
          <p
            aria-hidden
            className="pointer-events-none -mb-[0.22em] mt-4 select-none text-center text-[34vw] font-medium leading-[0.8] tracking-[-0.06em] text-white/[0.04] sm:text-[19rem]"
          >
            quote
          </p>
        </footer>
      </div>
    </div>
  );
}
