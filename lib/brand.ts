/**
 * Single source of truth for Quote's brand + site metadata.
 * Everything user-visible (logo, favicon, OG image, SEO) reads from here.
 */

/**
 * The canonical production origin. Marketing copy always advertises this, even when
 * the page is rendered from localhost during development.
 */
const PRODUCTION_URL = "https://quotemini.vercel.app";

/**
 * Public origin of this deployment, in priority order:
 * NEXT_PUBLIC_SITE_URL, NEXTAUTH_URL, the Vercel-provided host, then localhost.
 * Blank or malformed values are ignored so the build never sees an invalid URL.
 */
function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXTAUTH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim().replace(/\/$/, "");
    if (!value) continue;
    try {
      return new URL(value).origin;
    } catch {
      // Ignore anything that isn't a usable absolute URL.
    }
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Quote",
  tagline: "A calm, connected workspace for your notes",
  description:
    "Quote is a minimal Notion-style workspace: nested pages, real-time collaborative editing, and a built-in MCP server so Claude Code, ChatGPT, and Gemini can read and write your notes.",
  shortDescription:
    "Minimal collaborative notes with a built-in MCP server for Claude, ChatGPT, and Gemini.",
  url: resolveSiteUrl(),
  /** Fixed production origin, for copy that should never say "localhost". */
  productionUrl: PRODUCTION_URL,
  ogImage: "/opengraph-image",
  keywords: [
    "notion alternative",
    "collaborative notes",
    "real-time editor",
    "team wiki",
    "MCP server",
    "Model Context Protocol",
    "Claude Code",
    "ChatGPT connector",
    "Gemini",
    "open source notes app",
    "markdown workspace",
  ],
  author: "Quote",
} as const;

/**
 * Brand palette: neutral greys and paper white, like the app itself.
 * Keep in sync with the tokens in app/globals.css.
 */
export const brand = {
  /** The logo tile: paper on dark, so it reads on any browser tab. */
  mark: "#F7F7F5",
  markGlyph: "#191919",
  /** Emphasis colour. Neutral by design - contrast carries the hierarchy. */
  accent: "#F1F1EF",
  accentMuted: "#8F8F8F",
  ink: "#0F0F10",
  surface: "#191919",
  surfaceRaised: "#202020",
  border: "#2F2F2F",
  text: "#F1F1EF",
  textMuted: "#B8B8B8",
} as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Same as absoluteUrl, but always against the production origin.
 * Use for anything a visitor might copy and run elsewhere.
 */
export function productionUrl(path = "/") {
  return `${PRODUCTION_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
