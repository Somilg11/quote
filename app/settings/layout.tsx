import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Logo } from "@/components/brand/logo";
import { AccountMenu } from "@/components/workspace/account-menu";
import { ArrowLeft } from "lucide-react";
import { SettingsTabs } from "@/components/settings/settings-tabs";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  return (
    <div className="min-h-screen bg-[#191919] font-[family-name:var(--font-poppins)] text-[#f1f1ef]">
      <div className="relative mx-auto max-w-5xl">
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-3 hidden border-l border-dotted border-white/[0.12] sm:block" />
        <span aria-hidden className="pointer-events-none absolute inset-y-0 right-3 hidden border-r border-dotted border-white/[0.12] sm:block" />

        <header className="flex h-16 items-center justify-between px-5 sm:px-14">
          <Link href="/workspaces" className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white/40">
            <Logo />
          </Link>
          <AccountMenu user={session.user} />
        </header>

        <div className="px-5 pb-10 pt-8 sm:px-14 sm:pt-12">
          <Link
            href="/workspaces"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to workspaces
          </Link>
          <h1 className="text-balance text-4xl font-normal leading-[1.02] tracking-[-0.05em] sm:text-6xl">
            Settings.
            <span className="block text-zinc-500">Make Quote yours.</span>
          </h1>
        </div>

        <SettingsTabs />

        <div className="border-t border-white/[0.07] pb-16">{children}</div>
      </div>
    </div>
  );
}
