import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageEditor } from "@/components/workspace/page-editor";
import { editablePageSelect, safeUserSelect } from "@/lib/types";

export default async function PageEditorPage({
  params,
}: {
  params: Promise<{ id: string; pageId: string }>;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const { id: workspaceId, pageId } = await params;

  const page = await prisma.page.findUnique({
    where: { id: pageId },
    select: editablePageSelect,
  });

  if (!page || page.workspaceId !== workspaceId) {
    redirect(`/workspaces/${workspaceId}`);
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
  });

  if (!workspace) {
    redirect("/workspaces");
  }

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    select: { id: true, userId: true, role: true, user: { select: safeUserSelect } },
    orderBy: { joinedAt: "asc" },
  });

  return (
    <PageEditor
      workspace={workspace}
      page={page}
      members={members}
      currentUser={session.user}
    />
  );
}
