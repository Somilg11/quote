import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    redirect("/workspaces");
  }

  return (
    <div className="dark min-h-screen bg-zinc-900 text-zinc-100">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-tight text-white">Quote</div>
          <div className="flex gap-4">
            <Link href="/auth/signin">
              <Button variant="outline" className="border-zinc-700 text-zinc-200 hover:bg-zinc-800">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-white text-zinc-900 hover:bg-zinc-100">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400 mb-4">
            Minimal collaborative notes
          </p>
          <h1 className="text-5xl sm:text-6xl font-semibold text-white mb-6 leading-tight">
            A calm space to write together in real time.
          </h1>
          <p className="text-lg text-zinc-300 mb-10">
            Keep ideas organized in shared workspaces, edit pages live, and stay in sync without
            the noise.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100 px-6">
                Start writing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs text-zinc-500">
            Quote — minimalist collaboration for focused teams.
          </p>
        </div>
      </footer>
    </div>
  );
}
