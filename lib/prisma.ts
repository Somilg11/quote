import { PrismaClient } from "./prisma-client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

if (!process.env.DATABASE_URL) {
  dotenv.config({ path: ".env.local" });
  dotenv.config();
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and point it at your Postgres database."
    );
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

/**
 * Lazily constructed so importing this module never needs a database.
 * Next.js evaluates route modules during `next build`, where DATABASE_URL may be
 * absent; the connection is only opened on the first actual query.
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const client = (globalForPrisma.prisma ??= createClient());
    const value = Reflect.get(client as object, property, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
