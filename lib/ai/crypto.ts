import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from "crypto";

/**
 * Encryption for user-supplied AI provider keys.
 *
 * AES-256-GCM with a key derived (HKDF-SHA256) from AI_KEY_ENCRYPTION_SECRET, or
 * NEXTAUTH_SECRET when that is not set. The owning user id is bound in as
 * additional authenticated data, so a ciphertext copied onto another user's row
 * fails to decrypt.
 */
const VERSION = "v1";

function masterKey() {
  const secret = process.env.AI_KEY_ENCRYPTION_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "Set AI_KEY_ENCRYPTION_SECRET (or NEXTAUTH_SECRET) to a long random value to store AI keys."
    );
  }
  return Buffer.from(hkdfSync("sha256", secret, "quote-ai-keys", "aes-256-gcm", 32));
}

export function encryptSecret(plaintext: string, userId: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", masterKey(), iv);
  cipher.setAAD(Buffer.from(userId));
  const body = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return [VERSION, iv.toString("base64url"), cipher.getAuthTag().toString("base64url"), body.toString("base64url")].join(".");
}

export function decryptSecret(payload: string, userId: string) {
  const [version, iv, tag, body] = payload.split(".");
  if (version !== VERSION || !iv || !tag || !body) throw new Error("Unreadable stored key.");
  const decipher = createDecipheriv("aes-256-gcm", masterKey(), Buffer.from(iv, "base64url"));
  decipher.setAAD(Buffer.from(userId));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([decipher.update(Buffer.from(body, "base64url")), decipher.final()]).toString("utf8");
}
