import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await request.json();

  // Verify user has access to this room
  const [workspaceId, pageId] = room.split("-page-");
  if (!workspaceId || !pageId) {
    return new Response("Invalid room", { status: 400 });
  }

  const cleanWorkspaceId = workspaceId.replace("workspace-", "");
  const cleanPageId = pageId.replace(".yjs", "");

  // Check if user is a member of the workspace
  const member = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: session.user.id,
        workspaceId: cleanWorkspaceId,
      },
    },
  });

  if (!member) {
    return new Response("Forbidden", { status: 403 });
  }

  // Create a Liveblocks access token scoped to this exact page room.
  const liveblocksSession = liveblocks.prepareSession(session.user.id, {
      userInfo: {
        name: session.user.name || "Anonymous",
        avatar: session.user.image || "",
      },
    });
  liveblocksSession.allow(room, liveblocksSession.FULL_ACCESS);

  const { body, status } = await liveblocksSession.authorize();

  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
