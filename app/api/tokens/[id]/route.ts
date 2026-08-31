import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** Revoking keeps the row so `lastUsedAt` history survives an audit. */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const token = await prisma.apiToken.findUnique({ where: { id }, select: { userId: true } });
  if (!token || token.userId !== userId) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  await prisma.apiToken.update({ where: { id }, data: { revokedAt: new Date() } });
  return NextResponse.json({ revoked: true });
}
