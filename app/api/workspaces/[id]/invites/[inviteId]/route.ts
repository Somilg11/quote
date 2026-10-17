import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isSameOrigin } from "@/lib/rate-limit";

/** Revokes a pending invite. Owner only. */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; inviteId: string }> }
) {
  if (!isSameOrigin(request)) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const session = await auth();
  const callerId = (session?.user as { id?: string } | undefined)?.id;
  if (!callerId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id: workspaceId, inviteId } = await params;

  const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId }, select: { ownerId: true } });
  if (!workspace) return NextResponse.json({ message: "Workspace not found" }, { status: 404 });
  if (workspace.ownerId !== callerId) {
    return NextResponse.json({ message: "Only the owner can revoke invites." }, { status: 403 });
  }

  const removed = await prisma.workspaceInvite.deleteMany({ where: { id: inviteId, workspaceId } });
  if (removed.count === 0) return NextResponse.json({ message: "Invite not found." }, { status: 404 });

  return NextResponse.json({ revoked: true });
}
