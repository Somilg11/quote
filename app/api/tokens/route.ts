import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/mcp/auth";
import { rateLimit } from "@/lib/rate-limit";

/** Personal API tokens used by MCP clients. */

export async function GET() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const tokens = await prisma.apiToken.findMany({
    where: { userId, revokedAt: null },
    select: { id: true, name: true, prefix: true, createdAt: true, lastUsedAt: true, expiresAt: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ tokens });
}

export async function POST(request: Request) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const limited = rateLimit(`token-create:${userId}`, 10, 60 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { message: "Too many tokens created. Try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
    );
  }

  const body = await request.json().catch(() => ({}));
  const name = String(body?.name ?? "").trim() || "MCP client";
  if (name.length > 80) {
    return NextResponse.json({ message: "Name must be 80 characters or fewer" }, { status: 400 });
  }

  const active = await prisma.apiToken.count({ where: { userId, revokedAt: null } });
  if (active >= 20) {
    return NextResponse.json(
      { message: "Token limit reached. Revoke one before creating another." },
      { status: 400 }
    );
  }

  const rawDays = body?.expiresInDays;
  const hasExpiry = rawDays !== undefined && rawDays !== null && rawDays !== "";
  const days = Number(rawDays);
  if (hasExpiry && (!Number.isInteger(days) || days < 1 || days > 365)) {
    return NextResponse.json({ message: "expiresInDays must be an integer from 1 to 365" }, { status: 400 });
  }
  const expiresAt = hasExpiry ? new Date(Date.now() + days * 86_400_000) : null;

  const { token, tokenHash, prefix } = generateToken();

  const record = await prisma.apiToken.create({
    data: { userId, name, tokenHash, prefix, expiresAt },
    select: { id: true, name: true, prefix: true, createdAt: true, expiresAt: true },
  });

  // The plaintext is returned exactly once, here.
  return NextResponse.json({ token, apiToken: record }, { status: 201 });
}
