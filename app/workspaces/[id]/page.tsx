import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { WorkspaceHome } from "@/components/workspace/workspace-home";
import { pageSummarySelect, safeUserSelect } from "@/lib/types";

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

  // Never select `content` or `ydoc` for a list: they are the two largest columns
  // and would be serialised into the payload the browser downloads.
  const pages = await prisma.page.findMany({
    where: { workspaceId },
    select: pageSummarySelect,
    orderBy: { updatedAt: "desc" },
  });

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    select: { id: true, userId: true, role: true, user: { select: safeUserSelect } },
    orderBy: { joinedAt: "asc" },
  });

  return (
    <WorkspaceHome
      workspace={workspace}
      pages={pages}
      members={members}
      currentUser={{ id: (session.user as { id: string }).id }}
    />
  );
}
