import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { htmlToText } from "@/lib/mcp/markdown";
import { jsonLdPayload } from "@/lib/security";
import { absoluteUrl, siteConfig } from "@/lib/brand";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";

interface SharePageProps {
  params: Promise<{ token: string }>;
}

/** Public pages are the only user content Quote lets search engines see. */
async function loadSharedPage(token: string) {
  const page = await prisma.page.findUnique({
    where: { shareToken: token },
    include: { workspace: { select: { name: true } }, createdBy: { select: { name: true } } },
  });

  if (!page || page.shareType !== "global") return null;
  return page;
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { token } = await params;
  const page = await loadSharedPage(token);

  if (!page) {
    return { title: "Page not found", robots: { index: false, follow: false } };
  }

  const description =
    htmlToText(page.content ?? "").slice(0, 200) ||
    `A page shared from the ${page.workspace.name} workspace on ${siteConfig.name}.`;

  return {
    title: page.title,
    description,
    alternates: { canonical: `/share/${token}` },
    openGraph: {
      type: "article",
      title: page.title,
      description,
      url: absoluteUrl(`/share/${token}`),
      modifiedTime: page.updatedAt.toISOString(),
    },
    twitter: { card: "summary_large_image", title: page.title, description },
  };
}

export default async function SharedPage({ params }: SharePageProps) {
  const { token } = await params;
  const page = await loadSharedPage(token);
  if (!page) notFound();

  // Server-rendered so the page is readable without JavaScript and by crawlers.
  const html = sanitizeHtml(page.content ?? "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    datePublished: page.createdAt.toISOString(),
    dateModified: page.updatedAt.toISOString(),
    author: page.createdBy?.name ? { "@type": "Person", name: page.createdBy.name } : undefined,
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: absoluteUrl(`/share/${token}`),
  };

  return (
    <div className="min-h-screen bg-[#191919] text-[#f1f1ef]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdPayload(jsonLd) }}
      />

      <header className="sticky top-0 z-10 border-b border-[#2f2f2f] bg-[#191919]/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Logo />
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="h-8 gap-1.5 bg-[#f1f1ef] text-[#202020] hover:bg-white">
              Use {siteConfig.name}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
        <div className="mb-8">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#2f2f2f] bg-[#202020] px-2.5 py-1 text-[11px] text-[#9b9b9b]">
            <Globe className="h-3 w-3" />
            Public page · {page.workspace.name}
          </p>
          <div className="flex items-start gap-3">
            <span className="text-3xl leading-none">{page.icon}</span>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
          </div>
          <p className="mt-3 text-xs text-[#858585]">
            {page.createdBy?.name ? `By ${page.createdBy.name} · ` : ""}
            Updated{" "}
            <time dateTime={page.updatedAt.toISOString()}>
              {page.updatedAt.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        </div>

        {html ? (
          <div
            className="quote-editor"
            dangerouslySetInnerHTML={{ __html: `<div class="ProseMirror">${html}</div>` }}
          />
        ) : (
          <p className="text-sm text-[#858585]">This page is empty.</p>
        )}
      </article>

      <footer className="border-t border-[#2f2f2f]">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-[#6f6f6f] sm:px-8">
          <span>Read-only view. Only the page owner can edit it.</span>
          <Link href="/" className="transition-colors hover:text-[#b8b8b8]">
            Published with {siteConfig.name}
          </Link>
        </div>
      </footer>
    </div>
  );
}
