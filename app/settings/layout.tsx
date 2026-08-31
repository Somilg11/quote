import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Logo } from "@/components/brand/logo";
import { AccountMenu } from "@/components/workspace/account-menu";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

const tabs = [{ href: "/settings/connections", label: "Connections" }];

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  return (
    <div className="min-h-screen bg-[#191919] text-[#f1f1ef]">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-[#2f2f2f] bg-[#191919]/90 px-4 backdrop-blur sm:px-6">
        <Link href="/workspaces" className="flex items-center gap-2 rounded-md px-1 py-1 transition-colors hover:bg-[#262626]">
          <Logo />
        </Link>
        <AccountMenu user={session.user} />
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/workspaces"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#8f8f8f] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to workspaces
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>

        <nav className="mt-6 flex gap-1 border-b border-[#2f2f2f]">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="-mb-px border-b-2 border-[#f1f1ef] px-3 py-2 text-sm font-medium text-[#f1f1ef]"
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
