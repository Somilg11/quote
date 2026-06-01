import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { WorkspaceHome } from "@/components/workspace/workspace-home";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const { id: workspaceId } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
  });

  if (!workspace) {
    redirect("/workspaces");
  }

  const pages = await prisma.page.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
  });

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: { user: true },
    orderBy: { joinedAt: "asc" },
  });

  return <WorkspaceHome workspace={workspace} pages={pages} members={members} />;
}
