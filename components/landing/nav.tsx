"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#features", label: "Features" },
  { href: "#collaboration", label: "Collaboration" },
  { href: "#mcp", label: "MCP" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#0F0F10]/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-8">
        <Link href="/" className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white/40">
          <Logo wordClassName="text-white" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/auth/signin">
            <Button variant="ghost" className="text-zinc-300 hover:bg-white/5 hover:text-white">
              Sign in
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-white text-zinc-900 shadow-sm transition-transform hover:bg-zinc-100 active:scale-[0.98]">
              Get started
            </Button>
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-md text-zinc-300 transition-colors hover:bg-white/5 hover:text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-[#0F0F10]/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex gap-2">
            <Link href="/auth/signin" className="flex-1">
              <Button variant="outline" className="w-full border-white/15 bg-transparent text-zinc-200">
                Sign in
              </Button>
            </Link>
            <Link href="/auth/signup" className="flex-1">
              <Button className="w-full bg-white text-zinc-900">Get started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
