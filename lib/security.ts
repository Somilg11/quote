import { randomBytes } from "crypto";

/**
 * URL-safe token with 192 bits of entropy, for share links and invites.
 * `Math.random()` is not a CSPRNG - its output is predictable from prior values,
 * which would make "public link" tokens guessable.
 */
export function generateShareToken() {
  return randomBytes(24).toString("base64url");
}

/**
 * Serialises a value for a <script type="application/ld+json"> block.
 *
 * JSON.stringify does not escape `<`, so a page titled `</script><img onerror=…>`
 * would otherwise close the tag and execute. Escaping the three characters that
 * can start a tag or comment keeps the payload inert while staying valid JSON.
 */
export function jsonLdPayload(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/** Escapes interpolated text for an HTML email body. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Deliberately permissive: enough to reject obvious junk, not to police addresses. */
export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}
