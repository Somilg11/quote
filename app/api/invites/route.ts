import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendInviteEmail } from "@/lib/email";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { isValidEmail } from "@/lib/security";
import { absoluteUrl } from "@/lib/brand";

const INVITE_EXPIRY_HOURS = 7 * 24; // 7 days

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email: rawEmail, workspaceId } = await request.json();

    if (!isValidEmail(rawEmail)) {
      return NextResponse.json({ message: "Enter a valid email address" }, { status: 400 });
    }

    // Invites are matched against the signed-in address on acceptance, so both
    // sides must be normalised the same way.
    const email = rawEmail.trim().toLowerCase();

    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
    });

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found" },
        { status: 404 }
      );
    }

    // Verify user is workspace owner
    if (workspace.ownerId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Check if user already exists and is already a member
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const existingMember = await prisma.workspaceMember.findUnique({
        where: {
          userId_workspaceId: {
            userId: existingUser.id,
            workspaceId,
          },
        },
      });

      if (existingMember) {
        return NextResponse.json(
          { message: "User is already a member" },
          { status: 400 }
        );
      }
    }

    // Check for existing pending invite
    const existingInvite = await prisma.workspaceInvite.findUnique({
      where: {
        email_workspaceId: {
          email,
          workspaceId,
        },
      },
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(
      Date.now() + INVITE_EXPIRY_HOURS * 60 * 60 * 1000
    );

    let invite;
    if (existingInvite) {
      // Update existing invite
      invite = await prisma.workspaceInvite.update({
        where: {
          id: existingInvite.id,
        },
        data: {
          token,
          expiresAt,
        },
      });
    } else {
      // Create new invite
      invite = await prisma.workspaceInvite.create({
        data: {
          email,
          workspaceId,
          token,
          expiresAt,
        },
      });
    }

    // Send email with invite link
    const inviteUrl = absoluteUrl(`/invites/${invite.token}`);
    try {
      await sendInviteEmail(email, workspace.name, inviteUrl);
    } catch (emailError) {
      // The invite row still stands; only delivery failed.
      console.error("[invite] Failed to send email:", emailError);
    }

    // The token is a credential: never log it, and never return it to the caller.
    return NextResponse.json(
      { invite: { id: invite.id, email: invite.email, expiresAt: invite.expiresAt } },
      { status: 201 }
    );
  } catch (error) {
    console.error("[invites]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Token required" }, { status: 400 });
    }

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

    return NextResponse.json(
      {
        invite: {
          id: invite.id,
          email: invite.email,
          expiresAt: invite.expiresAt,
          workspace: { id: invite.workspace.id, name: invite.workspace.name },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[get-invite]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
