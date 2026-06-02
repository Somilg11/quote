import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: pageId } = await params;
    const { title, content, shareType, icon } = await request.json();

    const page = await prisma.page.findUnique({
      where: { id: pageId },
      include: {
        workspace: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    // Verify user has access to this workspace
    const member = page.workspace.members.find(
      (m) => m.userId === session.user?.id
    );

    if (!member) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Generate share token if switching to global share
    let shareToken = page.shareToken;
    if (shareType === "global" && !shareToken) {
      shareToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Update page
    const updatedPage = await prisma.page.update({
      where: { id: pageId },
      data: {
        ...(title && { title }),
        ...(content !== undefined && { content }),
        ...(shareType && { shareType }),
        ...(shareToken && { shareToken }),
        ...(icon && { icon }),
      },
    });

    return NextResponse.json({ page: updatedPage }, { status: 200 });
  } catch (error) {
    console.error("[patch-page]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  try {
    const { id: pageId } = await params;

    const page = await prisma.page.findUnique({
      where: { id: pageId },
      include: {
        workspace: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    // If page is globally shared, allow access without authentication
    if (page.shareType === "global") {
      return NextResponse.json({ page, isReadOnly: true }, { status: 200 });
    }

    // For workspace or private sharing, require authentication
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify user has access
    const member = page.workspace.members.find(
      (m) => m.userId === session.user?.id
    );

    if (!member) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Determine if user can edit (workspace members can edit)
    const isReadOnly = page.shareType === "private" && member.role !== "owner";

    return NextResponse.json({ page, isReadOnly }, { status: 200 });
  } catch (error) {
    console.error("[get-page]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: pageId } = await params;

    const page = await prisma.page.findUnique({
      where: { id: pageId },
      include: {
        workspace: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    const member = page.workspace.members.find(
      (m) => m.userId === session.user?.id
    );

    if (!member) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (member.role !== "owner" && page.createdById !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.page.delete({
      where: { id: pageId },
    });

    return NextResponse.json({ message: "Page deleted" }, { status: 200 });
  } catch (error) {
    console.error("[delete-page]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
