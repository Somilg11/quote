import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MembersManager } from "@/components/workspace/members-manager";

export const metadata: Metadata = {
  title: "Members",
  robots: { index: false, follow: false },
};

export default async function MembersPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/auth/signin");

  const { id: workspaceId } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: {
      id: true,
      name: true,
      ownerId: true,
      members: {
        select: { userId: true, role: true, joinedAt: true, user: { select: { name: true, email: true } } },
        orderBy: { joinedAt: "asc" },
      },
    },
  });
  if (!workspace || !workspace.members.some((m) => m.userId === userId)) redirect("/workspaces");

  const isOwner = workspace.ownerId === userId;
  // Invite emails are only shown to the owner, who is the one who can act on them.
  const invites = isOwner
    ? await prisma.workspaceInvite.findMany({
        where: { workspaceId, expiresAt: { gt: new Date() } },
        select: { id: true, email: true, expiresAt: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <MembersManager
      workspace={{ id: workspace.id, name: workspace.name }}
      currentUserId={userId}
      isOwner={isOwner}
      members={workspace.members.map((m) => ({
        userId: m.userId,
        role: m.userId === workspace.ownerId ? "owner" : m.role,
        name: m.user.name,
        email: m.user.email,
        joinedAt: m.joinedAt.toISOString(),
      }))}
      invites={invites.map((i) => ({ id: i.id, email: i.email, expiresAt: i.expiresAt.toISOString() }))}
    />
  );
}
