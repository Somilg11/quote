import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { ActivityRow } from "@/components/landing/figures";

export const authInputClass =
  "h-11 rounded-xl border-white/10 bg-[#202020] text-[15px] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-white/30 focus-visible:ring-white/5";

export const authLabelClass = "mb-1.5 block text-[13px] text-zinc-400";

export const authButtonClass =
  "h-11 w-full rounded-full bg-zinc-100 text-sm font-normal text-zinc-900 shadow-[0_10px_30px_-12px_rgba(255,255,255,0.2)] hover:bg-white";

/** Split layout shared by sign in and sign up: brand panel + quiet form. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-[#191919] font-[family-name:var(--font-poppins)] text-zinc-100 antialiased lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-[#1c1c1c] border-r border-white/[0.07] lg:block">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(45%_40%_at_85%_20%,rgba(255,255,255,0.07),transparent),radial-gradient(40%_40%_at_10%_90%,rgba(255,255,255,0.05),transparent)]"
        />
        <Link href="/" className="absolute left-12 top-10 rounded-md">
          <Logo wordClassName="text-zinc-100 font-medium" />
        </Link>
        <div className="absolute inset-x-0 top-1/2 -translate-y-[42%] px-10">
          <p className="mb-5 text-center text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Every edit, in one place
          </p>
          <div className="mx-auto max-w-sm space-y-3">
            <ActivityRow kind="claude" action="updated a page" target="Product roadmap" time="now" />
            <ActivityRow kind="chatgpt" action="searched pages" target="“Q4 planning”" time="12s" className="ml-6" />
            <ActivityRow kind="cursor" action="created a page" target="Specs / Auth flow" time="1m" className="ml-12" />
          </div>
          <p className="mx-auto mt-5 max-w-sm text-center text-[15px] text-zinc-400">
            Your notes, and everything your assistants do with them.
          </p>
        </div>
      </aside>

      <main className="relative flex flex-col px-6 py-8 sm:px-12">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1.5 text-[13px] text-zinc-400 transition-colors hover:text-zinc-100"
        >
          <ChevronLeft className="h-4 w-4" />
          Home
        </Link>

        <div className="mx-auto flex w-full max-w-[340px] flex-1 flex-col justify-center py-10">
          <LogoMark className="mx-auto h-11 w-11 rounded-xl shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]" />
          <h1 className="mt-6 text-center text-[1.75rem] font-normal tracking-[-0.045em] text-zinc-100">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-center text-sm text-zinc-400">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-zinc-400">{footer}</div>}
        </div>
      </main>
    </div>
  );
}
