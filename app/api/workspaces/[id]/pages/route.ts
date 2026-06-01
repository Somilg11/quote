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
    const { title, icon } = await request.json();

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

    // Create page
    const page = await prisma.page.create({
      data: {
        title: title || "Untitled",
        slug,
        icon: icon || "📄",
        workspaceId,
        createdById: session.user.id,
        content: "",
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
