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
    const { title, content } = await request.json();

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

    // Update page
    const updatedPage = await prisma.page.update({
      where: { id: pageId },
      data: {
        ...(title && { title }),
        ...(content !== undefined && { content }),
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

    // Verify user has access
    const member = page.workspace.members.find(
      (m) => m.userId === session.user?.id
    );

    if (!member) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ page }, { status: 200 });
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
