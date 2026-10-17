import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rate-limit";

/** Compared against when no user exists, so response time doesn't reveal which emails are registered. */
// Precomputed bcrypt(cost 12) of a throwaway string; hashing at import time would block cold starts.
const DUMMY_HASH = "$2b$12$Ch/bkq.MEUJ4UlRBxgtyRuw.zNTlau3Xh6Cu20iNUY5hKJ9U.QFw6";

const SIGNIN_WINDOW_MS = 15 * 60_000;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        const headers = (req?.headers ?? {}) as Record<string, string | string[] | undefined>;
        const forwarded = headers["x-forwarded-for"];
        const ip =
          (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim() ||
          (headers["x-real-ip"] as string | undefined) ||
          "unknown";

        if (
          !rateLimit(`signin:${ip}:${email}`, 10, SIGNIN_WINDOW_MS).ok ||
          !rateLimit(`signin:ip:${ip}`, 30, SIGNIN_WINDOW_MS).ok
        ) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          // Always run a comparison so unknown users cost the same as wrong passwords.
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user?.password || DUMMY_HASH
          );

          if (!user || !user.password || !isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            // NextAuth's `User` requires a string here; credentials users always have one.
            email: user.email ?? "",
            name: user.name || undefined,
            image: user.image || undefined,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

import { getServerSession } from "next-auth";

export const handler = NextAuth(authOptions);
export const { signIn, signOut } = handler;

// Utility function for getting session in server components/actions
export async function auth() {
  return getServerSession(authOptions);
}
