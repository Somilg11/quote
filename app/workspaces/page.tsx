import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AccountMenu } from "@/components/workspace/account-menu";
import { Plus, Sparkles } from "lucide-react";
import { WorkspacesDashboard } from "@/components/workspace/workspaces-dashboard";

export default async function WorkspacesPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const userId = (session.user as { id: string }).id;

  const workspaces = await prisma.workspace.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (workspaces.length === 0) {
    return (
      <div className="min-h-screen bg-[#191919] text-[#f1f1ef]">
        <header className="flex h-14 items-center justify-between border-b border-[#2f2f2f] px-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">Quote</Link>
          <AccountMenu user={session.user} />
        </header>
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
          <div className="max-w-sm text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-lg bg-[#2a2a2a]">
              <Sparkles className="h-7 w-7 text-[#9b9b9b]" />
            </div>
            <h1 className="mb-2 text-3xl font-semibold">
              Create your first workspace
          </h1>
            <p className="mb-7 text-sm leading-6 text-[#b8b8b8]">
              Quote keeps pages, ideas, and collaboration tucked into a quiet Notion-style space.
          </p>
          <Link href="/workspaces/new">
              <Button className="rounded-md bg-[#f1f1ef] text-[#202020] shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                New workspace
            </Button>
          </Link>
        </div>
      </div>
      </div>
    );
  }

  return <WorkspacesDashboard workspaces={workspaces} user={session.user} />;
}
