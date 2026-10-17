import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decryptSecret } from "@/lib/ai/crypto";
import { runAssistant, type AgentEvent } from "@/lib/ai/agent";
import { ProviderError, isProvider } from "@/lib/ai/providers";
import { isSameOrigin, rateLimit } from "@/lib/rate-limit";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

const bodySchema = z.object({
  workspaceId: z.string().min(1).max(64),
  pageId: z.string().min(1).max(64).optional(),
  connectionId: z.string().min(1).max(64).optional(),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(12_000) }))
    .min(1)
    .max(30),
});

const json = (body: unknown, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...NO_STORE, ...headers } });

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ error: "Forbidden" }, 403);

  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return json({ error: "Unauthorized" }, 401);

  const limited = rateLimit(`ai-chat:${userId}`, 20, 60_000);
  if (!limited.ok) {
    return json({ error: "You're sending messages too fast. Wait a moment." }, 429, {
      "Retry-After": String(limited.retryAfter),
    });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.messages.at(-1)?.role !== "user") {
    return json({ error: "Invalid request." }, 400);
  }
  const { workspaceId, pageId, connectionId, messages } = parsed.data;

  const membership = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId, workspaceId } },
    select: { workspace: { select: { id: true, name: true } } },
  });
  if (!membership) return json({ error: "Not found." }, 404);

  const connection = await prisma.aiConnection.findFirst({
    where: connectionId ? { id: connectionId, userId } : { userId, isDefault: true },
  });
  if (!connection || !isProvider(connection.provider)) {
    return json({ error: "Add an AI key to start chatting.", code: "no_connection" }, 400);
  }

  let apiKey: string;
  try {
    apiKey = decryptSecret(connection.encryptedKey, userId);
  } catch {
    return json({ error: "Your saved key could not be read. Please add it again.", code: "no_connection" }, 400);
  }

  prisma.aiConnection
    .update({ where: { id: connection.id }, data: { lastUsedAt: new Date() } })
    .catch(() => undefined);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: AgentEvent | { type: "done" }) =>
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      try {
        for await (const event of runAssistant({
          userId,
          provider: connection.provider as never,
          apiKey,
          model: connection.model,
          workspace: membership.workspace,
          pageId,
          history: messages,
          signal: request.signal,
        })) {
          send(event);
        }
      } catch (error) {
        if (!request.signal.aborted) {
          send({
            type: "error",
            message: error instanceof ProviderError ? error.message : "Something went wrong. Please try again.",
          });
        }
      } finally {
        // The client may have disconnected, which cancels the stream under us.
        try {
          send({ type: "done" });
          controller.close();
        } catch {
          // already closed
        }
      }
    },
  });

  return new Response(stream, {
    headers: { "content-type": "application/x-ndjson; charset=utf-8", "x-accel-buffering": "no", ...NO_STORE },
  });
}
