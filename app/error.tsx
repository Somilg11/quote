"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[quote]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#191919] px-6 text-center text-[#f1f1ef]">
      <Logo markClassName="h-9 w-9" wordClassName="text-xl" />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Something broke</h1>
        <p className="mt-2 text-sm text-[#8f8f8f]">
          The page failed to load. Trying again usually fixes it.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-[11px] text-[#5f5f5f]">ref {error.digest}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button onClick={reset} className="bg-[#f1f1ef] text-[#202020] hover:bg-white">
          Try again
        </Button>
        <Link href="/workspaces">
          <Button variant="outline" className="border-[#3f3f3f] bg-transparent text-[#f1f1ef] hover:bg-[#2a2a2a]">
            Your workspaces
          </Button>
        </Link>
      </div>
    </div>
  );
}
