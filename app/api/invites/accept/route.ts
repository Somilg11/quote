import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ message: "Token required" }, { status: 400 });
    }

    // Find the invite
    const invite = await prisma.workspaceInvite.findUnique({
      where: { token },
      include: { workspace: true },
    });

    if (!invite) {
      return NextResponse.json(
        { message: "Invalid invite token" },
        { status: 404 }
      );
    }

    if (new Date() > invite.expiresAt) {
      return NextResponse.json(
        { message: "Invite has expired" },
        { status: 410 }
      );
    }

    // Check if the email matches the current user
    if (invite.email !== session.user.email) {
      return NextResponse.json(
        { message: "This invite is for a different email address" },
        { status: 403 }
      );
    }

    // Check if user is already a member
    const existingMember = await prisma.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: session.user.id,
          workspaceId: invite.workspaceId,
        },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        { message: "Already a member of this workspace" },
        { status: 400 }
      );
    }

    // Add user to workspace
    await prisma.workspaceMember.create({
      data: {
        userId: session.user.id,
        workspaceId: invite.workspaceId,
      },
    });

    // Delete the invite
    await prisma.workspaceInvite.delete({
      where: { id: invite.id },
    });

    console.log(
      `[invite] ${session.user.email} accepted invite to workspace ${invite.workspace.name}`
    );

    return NextResponse.json(
      { message: "Invite accepted successfully", workspaceId: invite.workspaceId },
      { status: 200 }
    );
  } catch (error) {
    console.error("[accept-invite]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
