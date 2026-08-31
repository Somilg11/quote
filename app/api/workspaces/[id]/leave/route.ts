import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Removes the caller from a workspace.
 *
 * The owner cannot leave: doing so would strand the workspace with no one able
 * to manage or delete it. They delete it instead.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id: workspaceId } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: { id: true, name: true, ownerId: true },
  });

  if (!workspace) {
    return NextResponse.json({ message: "Workspace not found" }, { status: 404 });
  }

  if (workspace.ownerId === userId) {
    return NextResponse.json(
      { message: "The owner cannot leave. Delete the workspace instead." },
      { status: 400 }
    );
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId, workspaceId } },
    select: { id: true },
  });

  if (!membership) {
    return NextResponse.json({ message: "You are not a member" }, { status: 404 });
  }

  await prisma.workspaceMember.delete({ where: { id: membership.id } });

  // Pages the person authored stay put: `Page.createdById` is nullable and set
  // to null only when the account itself is deleted.
  return NextResponse.json({ left: true, id: workspace.id, name: workspace.name });
}
