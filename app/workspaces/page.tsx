import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AccountMenu } from "@/components/workspace/account-menu";
import { Plus } from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { WorkspacesDashboard } from "@/components/workspace/workspaces-dashboard";
import { NewWorkspaceDialog } from "@/components/workspace/new-workspace-dialog";
import { greeting, relativeTime } from "@/lib/format";

/** Pages edited in the last seven days count as "this week". */
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export default async function WorkspacesPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const userId = (session.user as { id: string }).id;

  const workspaces = await prisma.workspace.findMany({
    where: { members: { some: { userId } } },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { pages: true, members: true } },
      members: {
        take: 4,
        orderBy: { joinedAt: "asc" },
        include: { user: { select: { id: true, name: true, email: true } } },
      },
    },
  });

  if (workspaces.length === 0) {
    return (
      <div className="min-h-screen bg-[#191919] text-[#f1f1ef]">
        <header className="flex h-14 items-center justify-between border-b border-[#2f2f2f] px-4">
          <Link href="/" className="rounded-md transition-opacity hover:opacity-80">
            <Logo />
          </Link>
          <AccountMenu user={session.user} />
        </header>
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
          <div className="max-w-sm text-center">
            <LogoMark className="mx-auto mb-5 h-14 w-14" />
            <h1 className="mb-2 text-3xl font-semibold">Create your first workspace</h1>
            <p className="mb-7 text-sm leading-6 text-[#b8b8b8]">
              A workspace holds your pages, your teammates, and the AI connections that read
              them.
            </p>
            <NewWorkspaceDialog>
              <Button className="rounded-md bg-[#f1f1ef] text-[#202020] transition-colors hover:bg-white">
                <Plus className="mr-2 h-4 w-4" />
                New workspace
              </Button>
            </NewWorkspaceDialog>
          </div>
        </div>
      </div>
    );
  }

  const workspaceIds = workspaces.map((workspace) => workspace.id);
  const now = new Date();

  const [recentPages, totalPages, editedThisWeek, publicPages, tokenCount] = await Promise.all([
    prisma.page.findMany({
      where: { workspaceId: { in: workspaceIds } },
      orderBy: { updatedAt: "desc" },
      take: 6,
      select: {
        id: true,
        title: true,
        icon: true,
        updatedAt: true,
        shareType: true,
        workspaceId: true,
      },
    }),
    prisma.page.count({ where: { workspaceId: { in: workspaceIds } } }),
    prisma.page.count({
      where: {
        workspaceId: { in: workspaceIds },
        updatedAt: { gte: new Date(now.getTime() - WEEK_MS) },
      },
    }),
    prisma.page.count({
      where: { workspaceId: { in: workspaceIds }, shareType: "global" },
    }),
    prisma.apiToken.count({ where: { userId, revokedAt: null } }),
  ]);

  // Collaborators across every workspace, counted once each. `distinct` pushes the
  // de-duplication into Postgres instead of streaming every membership row back.
  const distinctMembers = await prisma.workspaceMember.findMany({
    where: { workspaceId: { in: workspaceIds } },
    select: { userId: true },
    distinct: ["userId"],
  });
  const collaborators = distinctMembers.length;

  const workspaceNames = new Map(workspaces.map((workspace) => [workspace.id, workspace.name]));

  return (
    <WorkspacesDashboard
      user={session.user}
      greeting={greeting(now)}
      stats={{
        workspaces: workspaces.length,
        pages: totalPages,
        collaborators,
        editedThisWeek,
        publicPages,
        tokens: tokenCount,
      }}
      recentPages={recentPages.map((page) => ({
        id: page.id,
        title: page.title,
        icon: page.icon,
        workspaceId: page.workspaceId,
        workspaceName: workspaceNames.get(page.workspaceId) ?? "Workspace",
        shareType: page.shareType,
        updatedLabel: relativeTime(page.updatedAt, now),
      }))}
      workspaces={workspaces.map((workspace) => ({
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        pageCount: workspace._count.pages,
        memberCount: workspace._count.members,
        isOwner: workspace.ownerId === userId,
        updatedLabel: relativeTime(workspace.updatedAt, now),
        members: workspace.members.map((member) => ({
          id: member.user.id,
          label: (member.user.name || member.user.email || "U").charAt(0).toUpperCase(),
          name: member.user.name || member.user.email || "Collaborator",
        })),
      }))}
    />
  );
}
