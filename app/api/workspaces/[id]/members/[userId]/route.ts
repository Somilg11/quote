import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isSameOrigin } from "@/lib/rate-limit";

/** Removes someone from a workspace. Owner only; the owner themselves cannot be removed. */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  if (!isSameOrigin(request)) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const session = await auth();
  const callerId = (session?.user as { id?: string } | undefined)?.id;
  if (!callerId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id: workspaceId, userId } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: { ownerId: true },
  });
  if (!workspace) return NextResponse.json({ message: "Workspace not found" }, { status: 404 });
  if (workspace.ownerId !== callerId) {
    return NextResponse.json({ message: "Only the owner can remove members." }, { status: 403 });
  }
  if (userId === workspace.ownerId) {
    return NextResponse.json({ message: "The owner cannot be removed." }, { status: 400 });
  }

  const removed = await prisma.workspaceMember.deleteMany({ where: { workspaceId, userId } });
  if (removed.count === 0) return NextResponse.json({ message: "Not a member." }, { status: 404 });

  return NextResponse.json({ removed: true });
}
