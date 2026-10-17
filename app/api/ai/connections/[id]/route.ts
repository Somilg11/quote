import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isSameOrigin } from "@/lib/rate-limit";

const NO_STORE = { "Cache-Control": "no-store" };

const patchSchema = z.object({
  model: z.string().trim().min(1).max(80).regex(/^[\w.:\-/]+$/).optional(),
  isDefault: z.literal(true).optional(),
});

async function owned(request: Request, params: Promise<{ id: string }>) {
  if (!isSameOrigin(request)) return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE }) };

  const { id } = await params;
  const connection = await prisma.aiConnection.findFirst({ where: { id, userId }, select: { id: true } });
  if (!connection) return { error: NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_STORE }) };
  return { userId, id };
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await owned(request, params);
  if ("error" in ctx) return ctx.error;

  const parsed = patchSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: NO_STORE });

  await prisma.$transaction(async (tx) => {
    if (parsed.data.isDefault) {
      await tx.aiConnection.updateMany({ where: { userId: ctx.userId }, data: { isDefault: false } });
    }
    await tx.aiConnection.update({
      where: { id: ctx.id },
      data: { ...(parsed.data.model ? { model: parsed.data.model } : {}), ...(parsed.data.isDefault ? { isDefault: true } : {}) },
    });
  });

  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await owned(request, params);
  if ("error" in ctx) return ctx.error;

  await prisma.$transaction(async (tx) => {
    const removed = await tx.aiConnection.delete({ where: { id: ctx.id }, select: { isDefault: true } });
    if (removed.isDefault) {
      const next = await tx.aiConnection.findFirst({ where: { userId: ctx.userId }, orderBy: { createdAt: "asc" } });
      if (next) await tx.aiConnection.update({ where: { id: next.id }, data: { isDefault: true } });
    }
  });

  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
