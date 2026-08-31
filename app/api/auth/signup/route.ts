import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { isValidEmail } from "@/lib/security";

/** bcrypt work factor. Chosen on the server so a client cannot weaken it. */
const BCRYPT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 8;
/** bcrypt silently truncates beyond 72 bytes, so reject longer input outright. */
const MAX_PASSWORD_LENGTH = 72;

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Enter a valid email address" }, { status: 400 });
    }

    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (password.length > MAX_PASSWORD_LENGTH) {
      return NextResponse.json(
        { message: `Password must be at most ${MAX_PASSWORD_LENGTH} characters` },
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
        name: typeof name === "string" ? name.trim().slice(0, 80) || null : null,
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
