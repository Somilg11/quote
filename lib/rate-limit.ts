/**
 * Small in-memory sliding-window limiter.
 *
 * State lives in the server process, so on serverless hosts each instance counts
 * separately. That still blunts brute force and runaway clients; put a shared
 * limiter (Redis, the platform firewall) in front for hard guarantees.
 */
const hits = new Map<string, number[]>();
let lastSweep = 0;

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();

  if (now - lastSweep > 60_000) {
    lastSweep = now;
    for (const [k, times] of hits) {
      if (times.every((t) => now - t > windowMs)) hits.delete(k);
    }
  }

  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false as const, retryAfter: Math.max(1, Math.ceil((windowMs - (now - recent[0])) / 1000)) };
  }
  recent.push(now);
  hits.set(key, recent);
  return { ok: true as const, retryAfter: 0 };
}

/** Best-effort client address behind a proxy. */
export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Rejects cross-site state-changing requests (defence in depth on top of SameSite cookies). */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients
  try {
    return new URL(origin).host === (request.headers.get("host") ?? new URL(request.url).host);
  } catch {
    return false;
  }
}
