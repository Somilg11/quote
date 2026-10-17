import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { encryptSecret } from "@/lib/ai/crypto";
import { PROVIDERS, isProvider, verifyKey } from "@/lib/ai/providers";
import { isSameOrigin, rateLimit } from "@/lib/rate-limit";

const NO_STORE = { "Cache-Control": "no-store" };

const publicSelect = {
  id: true,
  provider: true,
  model: true,
  keyHint: true,
  isDefault: true,
  lastUsedAt: true,
} as const;

async function userIdOf() {
  const session = await auth();
  return (session?.user as { id?: string } | undefined)?.id ?? null;
}

export async function GET() {
  const userId = await userIdOf();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });

  const connections = await prisma.aiConnection.findMany({
    where: { userId },
    select: publicSelect,
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ connections }, { headers: NO_STORE });
}

const createSchema = z.object({
  provider: z.string().refine(isProvider, "Unknown provider"),
  apiKey: z.string().trim().min(16).max(400),
  model: z.string().trim().min(1).max(80).regex(/^[\w.:\-/]+$/).optional(),
});

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const userId = await userIdOf();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });

  const limited = rateLimit(`ai-key:${userId}`, 10, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again shortly." },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(limited.retryAfter) } }
    );
  }

  const parsed = createSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Choose a provider and paste a valid API key." }, { status: 400, headers: NO_STORE });
  }
  const provider = parsed.data.provider as keyof typeof PROVIDERS;

  const problem = await verifyKey(provider, parsed.data.apiKey);
  if (problem) return NextResponse.json({ error: problem }, { status: 400, headers: NO_STORE });

  let encryptedKey: string;
  try {
    encryptedKey = encryptSecret(parsed.data.apiKey, userId);
  } catch {
    return NextResponse.json({ error: "Server is not configured to store AI keys." }, { status: 500, headers: NO_STORE });
  }

  const model = parsed.data.model ?? PROVIDERS[provider].defaultModel;
  const hasDefault = (await prisma.aiConnection.count({ where: { userId, isDefault: true } })) > 0;

  const connection = await prisma.aiConnection.upsert({
    where: { userId_provider: { userId, provider } },
    create: {
      userId,
      provider,
      model,
      encryptedKey,
      keyHint: parsed.data.apiKey.slice(-4),
      isDefault: !hasDefault,
    },
    update: { model, encryptedKey, keyHint: parsed.data.apiKey.slice(-4) },
    select: publicSelect,
  });

  return NextResponse.json({ connection }, { status: 201, headers: NO_STORE });
}
