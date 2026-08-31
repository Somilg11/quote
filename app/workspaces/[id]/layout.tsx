import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/workspace/sidebar";
import { pageSummarySelect } from "@/lib/types";
import { ReactNode } from "react";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const userId = (session.user as { id: string }).id;

  const { id: workspaceId } = await params;

  // Verify user has access to this workspace
  const member = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
  });

  if (!member) {
    redirect("/workspaces");
  }

  const pages = await prisma.page.findMany({
    where: { workspaceId },
    select: pageSummarySelect,
    orderBy: { updatedAt: "desc" },
  });

  const workspaces = await prisma.workspace.findMany({
    where: { members: { some: { userId } } },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#191919] text-[#f1f1ef] md:h-screen md:flex-row">
      <Sidebar workspaceId={workspaceId} workspaces={workspaces} pages={pages} />
      <main className="min-w-0 flex-1 overflow-y-auto bg-[#191919]">
        {children}
      </main>
    </div>
  );
}
