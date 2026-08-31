import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, slug, description } = await request.json();

    if (!name || !slug) {
      return NextResponse.json(
        { message: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Slugs are unique across every account, but a user only ever sees their own
    // workspaces -- so a collision with a stranger's slug must not block them.
    // Suffix until free instead of rejecting.
    const baseSlug = slug.slice(0, 40);
    let uniqueSlug = baseSlug;
    let suffix = 1;
    while (
      await prisma.workspace.findUnique({
        where: { slug: uniqueSlug },
        select: { id: true },
      })
    ) {
      suffix += 1;
      uniqueSlug = `${baseSlug}-${suffix}`;
    }

    // Create workspace
    const workspace = await prisma.workspace.create({
      data: {
        name,
        slug: uniqueSlug,
        description,
        ownerId: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: "owner",
          },
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json({ workspace }, { status: 201 });
  } catch (error) {
    // Concurrent creates can still lose the race on the unique slug index.
    if (
      typeof error === "object" &&
      error !== null &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { message: "That URL was just taken. Try again." },
        { status: 409 }
      );
    }
    console.error("[workspaces]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
