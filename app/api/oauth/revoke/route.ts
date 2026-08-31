import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "@/lib/oauth/server";

/**
 * RFC 7009 token revocation. Always answers 200, even for an unknown token --
 * the spec requires it, and it keeps this from becoming a token oracle.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: Request) {
  const ok = new Response(null, { status: 200, headers: { ...CORS, "Cache-Control": "no-store" } });

  let token: string | undefined;
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      token = (await request.json())?.token;
    } else {
      token = String((await request.formData()).get("token") ?? "") || undefined;
    }
  } catch {
    return ok;
  }

  if (!token) return ok;

  const tokenHash = hash(token);
  await prisma.oAuthToken
    .updateMany({
      where: {
        revokedAt: null,
        OR: [{ accessTokenHash: tokenHash }, { refreshTokenHash: tokenHash }],
      },
      data: { revokedAt: new Date() },
    })
    .catch(() => undefined);

  return ok;
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
