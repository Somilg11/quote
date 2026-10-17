import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";

/** Bare top line: wordmark on the left, one sign-in link on the right. */
export function LandingNav() {
  return (
    <header className="relative z-10">
      <nav className="flex h-20 items-center justify-between px-6 sm:h-24 sm:px-12">
        <Link href="/" className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white/40">
          <Logo wordClassName="text-zinc-100 font-medium text-lg" />
        </Link>
        <Link
          href="/auth/signin"
          className="group inline-flex items-center gap-1.5 text-[15px] text-zinc-100 transition-colors hover:text-white"
        >
          sign in
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </nav>
    </header>
  );
}
