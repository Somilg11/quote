import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { generateShareToken } from "@/lib/security";
import { editablePageSelect } from "@/lib/types";

/**
 * Strips collaboration internals before a page crosses an HTTP boundary.
 * `ydoc` is Bytes and `ydocSeq` is a BigInt - neither survives JSON.stringify.
 */
function serializePage(page: Record<string, unknown>) {
  const { ydoc, ydocSeq, workspace, ...rest } = page;
  void ydoc;
  void ydocSeq;
  void workspace;
  return rest;
}

const patchSchema = z.object({
  title: z.string().max(200).optional(),
  content: z.string().max(2_000_000).optional(),
  shareType: z.enum(["private", "workspace", "global"]).optional(),
  icon: z.string().max(16).nullable().optional(),
  coverImage: z
    .string()
    .max(2048)
    .refine(
      (value) =>
        value === "" || /^gradient:[a-z0-9_-]{1,40}$/i.test(value) || /^https:\/\/[^\s]+$/i.test(value),
      "Cover must be an https URL or a built-in gradient"
    )
    .nullable()
    .optional(),
  source: z.string().max(40).optional(),
});

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
    const parsed = patchSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }
    const { title, content, shareType, icon, coverImage, source } = parsed.data;

    const page = await prisma.page.findUnique({
      where: { id: pageId },
      select: {
        id: true,
        content: true,
        shareToken: true,
        shareType: true,
        createdById: true,
        workspace: {
          select: {
            members: {
              where: { userId: session.user.id },
              select: { role: true },
            },
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    const member = page.workspace.members[0];

    if (!member) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const isOwnerOrCreator = member.role === "owner" || page.createdById === session.user.id;

    // Private pages are editable only by their creator or a workspace owner.
    if (page.shareType === "private" && !isOwnerOrCreator) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Only the creator or a workspace owner may publish a page to the web.
    if (shareType === "global" && !isOwnerOrCreator) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Generate share token if switching to global share
    let shareToken = page.shareToken;
    if (shareType === "global" && !shareToken) {
      shareToken = generateShareToken();
    }

    // Content written by anything other than the live editor (the REST API, an MCP
    // client) bumps `version`, which is how open editors learn to offer a refresh.
    const isExternalContentWrite = content !== undefined && source !== "editor";
    // Bodies can be rendered on a public share page, so they are sanitised on write.
    const safeContent = content === undefined ? undefined : sanitizeHtml(String(content));

    const updatedPage = await prisma.page.update({
      where: { id: pageId },
      data: {
        ...(title && { title }),
        ...(safeContent !== undefined && { content: safeContent }),
        ...(shareType && { shareType }),
        ...(shareToken && { shareToken }),
        // `null` clears these, so an explicit undefined check is required.
        ...(icon !== undefined && { icon: icon || null }),
        ...(coverImage !== undefined && { coverImage: coverImage || null }),
        ...(isExternalContentWrite && { version: { increment: 1 } }),
      },
      // `ydoc`/`ydocSeq` are Bytes and BigInt: not JSON-serialisable, and of no use
      // to an HTTP client.
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

    const userId = (session?.user as { id?: string } | undefined)?.id;

    const page = await prisma.page.findUnique({
      where: { id: pageId },
      select: {
        ...editablePageSelect,
        // Only the caller's own membership: every other row carries a password hash
        // and none of it is needed to answer this request.
        workspace: {
          select: {
            members: userId
              ? { where: { userId }, select: { role: true } }
              : { where: { userId: "" }, select: { role: true } },
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    // If page is globally shared, allow access without authentication
    if (page.shareType === "global") {
      return NextResponse.json({ page: serializePage(page), isReadOnly: true }, { status: 200 });
    }

    // For workspace or private sharing, require authentication
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const member = page.workspace.members[0];

    if (!member) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Determine if user can edit (workspace members can edit)
    const isReadOnly = page.shareType === "private" && member.role !== "owner";

    return NextResponse.json({ page: serializePage(page), isReadOnly }, { status: 200 });
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
      select: {
        id: true,
        createdById: true,
        shareType: true,
        workspace: {
          select: {
            members: { where: { userId: session.user.id }, select: { role: true } },
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    const member = page.workspace.members[0];

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
