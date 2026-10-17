import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { isValidEmail } from "@/lib/security";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/** bcrypt work factor. Chosen on the server so a client cannot weaken it. */
const BCRYPT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 8;
// bcrypt silently ignores everything past 72 bytes, so refuse longer passwords outright.
const MAX_PASSWORD_BYTES = 72;
const MAX_NAME_LENGTH = 80;

export async function POST(request: Request) {
  const limited = rateLimit(`signup:ip:${clientIp(request)}`, 5, 60 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { message: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
    );
  }

  try {
    const { name, email, password } = await request.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Enter a valid email address" }, { status: 400 });
    }

    if (typeof name === "string" && name.length > MAX_NAME_LENGTH * 4) {
      return NextResponse.json({ message: "Name is too long" }, { status: 400 });
    }

    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES) {
      return NextResponse.json(
        { message: `Password must be at most ${MAX_PASSWORD_BYTES} bytes` },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    // Hashing belongs on the server: a client-side hash lets the caller pick the
    // work factor, and the value it sends becomes the password equivalent.
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name: typeof name === "string" ? name.trim().slice(0, MAX_NAME_LENGTH) || null : null,
        email: normalizedEmail,
        password: passwordHash,
      },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("[signup]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
