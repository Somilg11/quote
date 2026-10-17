import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/workspace/sidebar";
import { AiAssistantLazy } from "@/components/workspace/ai-assistant-lazy";
import { StatusBar } from "@/components/workspace/status-bar";
import { Mascot } from "@/components/workspace/mascot";
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

  // The AI table may not be migrated yet; the bar simply shows "Add AI key" then.
  const assistant = await prisma.aiConnection
    .findFirst({ where: { userId, isDefault: true }, select: { model: true } })
    .catch(() => null);
  const workspaceName = workspaces.find((w) => w.id === workspaceId)?.name ?? "Workspace";

  return (
    <div className="flex h-dvh flex-col bg-[#191919] font-[family-name:var(--font-poppins)] text-[#f1f1ef]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">
        <Sidebar workspaceId={workspaceId} workspaces={workspaces} pages={pages} />
        <main className="min-w-0 flex-1 bg-[#191919] md:overflow-y-auto">
          {children}
        </main>
      </div>
      <StatusBar workspaceName={workspaceName} pageCount={pages.length} model={assistant?.model ?? null} />
      <AiAssistantLazy workspaceId={workspaceId} />
      <Mascot />
    </div>
  );
}
