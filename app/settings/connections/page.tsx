import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productionUrl } from "@/lib/brand";
import { ConnectionsManager } from "@/components/settings/connections-manager";

export const metadata: Metadata = {
  title: "Connections",
  description: "Connect Claude Code, ChatGPT, Gemini, and other MCP clients to your Quote workspaces.",
  robots: { index: false, follow: false },
};

export default async function ConnectionsPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/auth/signin");

  const tokens = await prisma.apiToken.findMany({
    where: { userId, revokedAt: null },
    select: { id: true, name: true, prefix: true, createdAt: true, lastUsedAt: true, expiresAt: true },
    orderBy: { createdAt: "desc" },
  });

  const grants = await prisma.oAuthToken.findMany({
    where: { userId, revokedAt: null, refreshExpiresAt: { gt: new Date() } },
    select: {
      id: true,
      scopes: true,
      createdAt: true,
      lastUsedAt: true,
      client: { select: { name: true, clientUri: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ConnectionsManager
      endpoint={productionUrl("/api/mcp")}
      grants={grants.map((grant) => ({
        id: grant.id,
        name: grant.client.name,
        clientUri: grant.client.clientUri,
        scopes: grant.scopes,
        createdAt: grant.createdAt.toISOString(),
        lastUsedAt: grant.lastUsedAt?.toISOString() ?? null,
      }))}
      tokens={tokens.map((token) => ({
        ...token,
        createdAt: token.createdAt.toISOString(),
        lastUsedAt: token.lastUsedAt?.toISOString() ?? null,
        expiresAt: token.expiresAt?.toISOString() ?? null,
      }))}
    />
  );
}
