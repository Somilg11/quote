import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: workspaceId } = await params;
    const { title, icon, parentId } = await request.json();

    // Verify user has access to this workspace
    const member = await prisma.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: session.user.id,
          workspaceId,
        },
      },
    });

    if (!member) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Generate a unique slug
    const baseSlug = (title || "untitled").toLowerCase().replace(/\s+/g, "-");
    let slug = baseSlug;
    let count = 1;

    while (
      await prisma.page.findUnique({
        where: { workspaceId_slug: { workspaceId, slug } },
      })
    ) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    // A parent must live in the same workspace, or the tree could span workspaces.
    if (parentId) {
      const parent = await prisma.page.findUnique({
        where: { id: parentId },
        select: { workspaceId: true },
      });
      if (!parent || parent.workspaceId !== workspaceId) {
        return NextResponse.json({ message: "Invalid parent page" }, { status: 400 });
      }
    }

    const page = await prisma.page.create({
      data: {
        title: title || "Untitled",
        slug,
        icon: icon || "📄",
        workspaceId,
        createdById: session.user.id,
        parentId: parentId ?? null,
        content: "",
      },
      // `ydoc`/`ydocSeq` are collaboration internals: Bytes and BigInt, neither of
      // which JSON can serialise. They are never useful to an HTTP client.
      select: {
        id: true,
        title: true,
        slug: true,
        icon: true,
        coverImage: true,
        content: true,
        parentId: true,
        shareType: true,
        shareToken: true,
        version: true,
        workspaceId: true,
        createdById: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    console.error("[pages]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
