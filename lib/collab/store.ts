import * as Y from "yjs";
import { prisma } from "@/lib/prisma";

/**
 * Serverless-friendly Yjs sync.
 *
 * Instead of holding a websocket open, clients append their local Yjs updates to
 * `PageUpdate` and poll for everyone else's. Once the log grows past
 * COMPACT_THRESHOLD we merge it into a single snapshot on `Page.ydoc` and drop the
 * merged rows, so both the table and the initial payload stay small.
 */

/** Log rows for one page before we collapse them into a snapshot. */
const COMPACT_THRESHOLD = 120;

/** Presence rows older than this are treated as gone. */
export const PRESENCE_TTL_MS = 20_000;

export interface CollabUpdate {
  seq: string;
  clientId: string;
  update: string;
}

export interface CollabPeer {
  userId: string;
  name: string;
  color: string;
}

const toBase64 = (bytes: Uint8Array) => Buffer.from(bytes).toString("base64");
const fromBase64 = (value: string) => new Uint8Array(Buffer.from(value, "base64"));

/**
 * Full document state as a single Yjs update, plus the log offset it covers.
 * Used when a client opens a page for the first time.
 */
export async function loadSnapshot(pageId: string) {
  const page = await prisma.page.findUnique({
    where: { id: pageId },
    select: { ydoc: true, ydocSeq: true, version: true },
  });

  if (!page) return null;

  const rows = await prisma.pageUpdate.findMany({
    where: { pageId, seq: { gt: page.ydocSeq } },
    orderBy: { seq: "asc" },
    select: { seq: true, update: true },
  });

  const parts: Uint8Array[] = [];
  if (page.ydoc) parts.push(new Uint8Array(page.ydoc));
  for (const row of rows) parts.push(new Uint8Array(row.update));

  const seq = rows.length ? rows[rows.length - 1].seq : page.ydocSeq;

  return {
    seq: seq.toString(),
    version: page.version,
    // mergeUpdates keeps this cheap: no Y.Doc has to be materialised.
    update: parts.length ? toBase64(Y.mergeUpdates(parts)) : null,
  };
}

/** Everything that landed in the log after `since`. */
export async function loadUpdatesSince(pageId: string, since: bigint) {
  const rows = await prisma.pageUpdate.findMany({
    where: { pageId, seq: { gt: since } },
    orderBy: { seq: "asc" },
    take: 500,
    select: { seq: true, clientId: true, update: true },
  });

  return rows.map<CollabUpdate>((row) => ({
    seq: row.seq.toString(),
    clientId: row.clientId,
    update: toBase64(new Uint8Array(row.update)),
  }));
}

/** Appends a client's updates and returns the new head of the log. */
export async function appendUpdates(
  pageId: string,
  clientId: string,
  updates: string[]
) {
  if (updates.length === 0) return null;

  // One row per push keeps writes cheap; merge locally first.
  const merged = Y.mergeUpdates(updates.map(fromBase64));

  const row = await prisma.pageUpdate.create({
    data: { pageId, clientId, update: Buffer.from(merged) },
    select: { seq: true },
  });

  return row.seq;
}

/**
 * Collapses the update log into `Page.ydoc` when it gets long.
 * Safe to call opportunistically: it is a no-op below the threshold.
 */
export async function maybeCompact(pageId: string) {
  const count = await prisma.pageUpdate.count({ where: { pageId } });
  if (count < COMPACT_THRESHOLD) return;

  const page = await prisma.page.findUnique({
    where: { id: pageId },
    select: { ydoc: true, ydocSeq: true },
  });
  if (!page) return;

  const rows = await prisma.pageUpdate.findMany({
    where: { pageId, seq: { gt: page.ydocSeq } },
    orderBy: { seq: "asc" },
    select: { seq: true, update: true },
  });
  if (rows.length === 0) return;

  const parts: Uint8Array[] = [];
  if (page.ydoc) parts.push(new Uint8Array(page.ydoc));
  for (const row of rows) parts.push(new Uint8Array(row.update));

  const head = rows[rows.length - 1].seq;
  const snapshot = Y.mergeUpdates(parts);

  await prisma.$transaction([
    prisma.page.update({
      where: { id: pageId },
      data: { ydoc: Buffer.from(snapshot), ydocSeq: head },
    }),
    prisma.pageUpdate.deleteMany({ where: { pageId, seq: { lte: head } } }),
  ]);
}

/** Refreshes this user's presence row and returns everyone else who is active. */
export async function syncPresence(
  pageId: string,
  user: { id: string; name: string; color: string }
): Promise<CollabPeer[]> {
  await prisma.pagePresence.upsert({
    where: { pageId_userId: { pageId, userId: user.id } },
    create: { pageId, userId: user.id, name: user.name, color: user.color },
    update: { name: user.name, color: user.color },
  });

  const active = await prisma.pagePresence.findMany({
    where: {
      pageId,
      userId: { not: user.id },
      updatedAt: { gt: new Date(Date.now() - PRESENCE_TTL_MS) },
    },
    select: { userId: true, name: true, color: true },
    take: 20,
  });

  return active;
}

/**
 * Drops the collaborative state for a page so the next client to open it re-seeds
 * from `Page.content`. Used after a write from the REST API or MCP, which produce
 * HTML rather than Yjs updates.
 */
export async function clearDoc(pageId: string) {
  await prisma.$transaction([
    prisma.page.update({
      where: { id: pageId },
      data: { ydoc: null, ydocSeq: BigInt(0) },
    }),
    prisma.pageUpdate.deleteMany({ where: { pageId } }),
  ]);
}
