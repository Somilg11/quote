import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Deletes a workspace and, by cascade, its pages, members, invites, collaboration
 * logs, and presence rows. Only the owner may do this.
 */
export async function DELETE(
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

  if (workspace.ownerId !== userId) {
    return NextResponse.json(
      { message: "Only the workspace owner can delete it" },
      { status: 403 }
    );
  }

  await prisma.workspace.delete({ where: { id: workspaceId } });

  return NextResponse.json({ deleted: true, id: workspace.id, name: workspace.name });
}

/** Renames a workspace or updates its description. Owner only. */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id: workspaceId } = await params;
  const body = await request.json().catch(() => ({}));

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: { ownerId: true },
  });

  if (!workspace) {
    return NextResponse.json({ message: "Workspace not found" }, { status: 404 });
  }

  if (workspace.ownerId !== userId) {
    return NextResponse.json(
      { message: "Only the workspace owner can change this" },
      { status: 403 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : undefined;
  if (name !== undefined && !name) {
    return NextResponse.json({ message: "Name cannot be empty" }, { status: 400 });
  }

  const updated = await prisma.workspace.update({
    where: { id: workspaceId },
    data: {
      ...(name ? { name } : {}),
      ...(body.description !== undefined
        ? { description: String(body.description).trim() || null }
        : {}),
    },
    select: { id: true, name: true, description: true, slug: true },
  });

  return NextResponse.json({ workspace: updated });
}
