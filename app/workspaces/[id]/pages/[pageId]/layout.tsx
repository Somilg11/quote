import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RoomProviderWrapper } from "@/components/providers/liveblocks-provider";
import { ReactNode } from "react";

export default async function PageEditorLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string; pageId: string }>;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const userId = (session.user as { id: string }).id;

  const { id: workspaceId, pageId } = await params;

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

  // Verify page belongs to this workspace
  const page = await prisma.page.findUnique({
    where: { id: pageId },
  });

  if (!page || page.workspaceId !== workspaceId) {
    redirect(`/workspaces/${workspaceId}`);
  }

  const roomId = `workspace-${workspaceId}-page-${pageId}`;

  return (
    <RoomProviderWrapper roomId={roomId}>
      {children}
    </RoomProviderWrapper>
  );
}
