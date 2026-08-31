import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#191919] px-6 text-center text-[#f1f1ef]">
      <Logo markClassName="h-9 w-9" wordClassName="text-xl" />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">This page isn&apos;t here</h1>
        <p className="mt-2 text-sm text-[#8f8f8f]">
          It may have been deleted, or the link may be private.
        </p>
      </div>
      <div className="flex gap-2">
        <Link href="/">
          <Button variant="outline" className="border-[#3f3f3f] bg-transparent text-[#f1f1ef] hover:bg-[#2a2a2a]">
            Go home
          </Button>
        </Link>
        <Link href="/workspaces">
          <Button className="bg-[#f1f1ef] text-[#202020] hover:bg-white">Your workspaces</Button>
        </Link>
      </div>
    </div>
  );
}
