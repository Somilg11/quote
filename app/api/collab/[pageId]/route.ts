import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  appendUpdates,
  loadSnapshot,
  loadUpdatesSince,
  maybeCompact,
  syncPresence,
} from "@/lib/collab/store";

export const dynamic = "force-dynamic";

/** Confirms the signed-in user may edit this page, returning their identity. */
async function authorize(pageId: string) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };

  const page = await prisma.page.findUnique({
    where: { id: pageId },
    select: {
      id: true,
      version: true,
      workspace: { select: { members: { where: { userId }, select: { id: true } } } },
    },
  });

  if (!page) return { error: NextResponse.json({ message: "Page not found" }, { status: 404 }) };
  if (page.workspace.members.length === 0) {
    return { error: NextResponse.json({ message: "Forbidden" }, { status: 403 }) };
  }

  return {
    userId,
    name: session?.user?.name || session?.user?.email || "Anonymous",
    version: page.version,
  };
}

/** Deterministic per-user presence colour so avatars stay stable across sessions. */
function colorFor(userId: string) {
  const palette = ["#4D4D4A", "#3F4448", "#4A4340", "#43483F", "#484049", "#3E4744"];
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = (hash * 31 + userId.charCodeAt(i)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

// Initial document load, and the polling read path.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  const { pageId } = await params;
  const access = await authorize(pageId);
  if ("error" in access) return access.error;

  const url = new URL(request.url);
  const sinceParam = url.searchParams.get("since");

  if (sinceParam === null) {
    const snapshot = await loadSnapshot(pageId);
    if (!snapshot) return NextResponse.json({ message: "Page not found" }, { status: 404 });
    return NextResponse.json(snapshot);
  }

  const since = BigInt(sinceParam);
  const updates = await loadUpdatesSince(pageId, since);

  return NextResponse.json({
    seq: updates.length ? updates[updates.length - 1].seq : sinceParam,
    updates,
    version: access.version,
  });
}

// Write path: push local updates, refresh presence, and pull anything new in the
// same round trip so an active editor needs one request per cycle.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  const { pageId } = await params;
  const access = await authorize(pageId);
  if ("error" in access) return access.error;

  const body = await request.json().catch(() => null);
  if (!body || typeof body.clientId !== "string") {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const updates: string[] = Array.isArray(body.updates) ? body.updates.slice(0, 200) : [];

  if (updates.length > 0) {
    await appendUpdates(pageId, body.clientId, updates);
    // Opportunistic compaction: cheap check, rare write.
    await maybeCompact(pageId).catch(() => undefined);
  }

  const peers = body.presence
    ? await syncPresence(pageId, {
        id: access.userId,
        name: access.name,
        color: colorFor(access.userId),
      })
    : [];

  const since = typeof body.since === "string" ? BigInt(body.since) : BigInt(0);
  const fresh = await loadUpdatesSince(pageId, since);
  // The client already has its own edits applied locally.
  const remote = fresh.filter((row) => row.clientId !== body.clientId);

  return NextResponse.json({
    seq: fresh.length ? fresh[fresh.length - 1].seq : since.toString(),
    updates: remote,
    peers,
    version: access.version,
  });
}
