/**
 * Conservative HTML allowlist for page content.
 *
 * Page bodies are authored by TipTap, but they arrive over an API and are rendered
 * on public share pages, so they are sanitised on write and again on render:
 * unknown tags, every event handler, and any non-image `data:`/`javascript:` URL
 * are dropped.
 */

const ALLOWED_TAGS = new Set([
  "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "del", "code", "pre",
  "blockquote", "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "a", "img",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "colgroup", "col",
  "span", "div",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "title", "width", "height"]),
  th: new Set(["colspan", "rowspan", "colwidth"]),
  td: new Set(["colspan", "rowspan", "colwidth"]),
  col: new Set(["style"]),
  colgroup: new Set(["style"]),
};

/** Tags whose entire contents are discarded, not just the tag itself. */
const DROP_WITH_CONTENT = ["script", "style", "iframe", "object", "embed", "noscript", "template"];

const SAFE_URL = /^(https?:|mailto:|tel:|#|\/)/i;
const SAFE_IMAGE_URL = /^(https?:|\/|data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,)/i;
/** Only column widths are worth keeping from inline styles. */
const SAFE_STYLE = /^(width|min-width)\s*:\s*[\d.]+(px|%|em|rem)$/i;

export function sanitizeHtml(html: string): string {
  if (!html) return "";

  let out = html;

  for (const tag of DROP_WITH_CONTENT) {
    out = out.replace(new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`, "gi"), "");
    out = out.replace(new RegExp(`<${tag}\\b[^>]*\\/?>`, "gi"), "");
  }

  // Rewrite every remaining tag through the allowlist.
  out = out.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g, (
    _match,
    slash: string,
    rawName: string,
    rawAttrs: string
  ) => {
    const name = rawName.toLowerCase();
    if (!ALLOWED_TAGS.has(name)) return "";
    if (slash) return `</${name}>`;

    const allowed = ALLOWED_ATTRS[name];
    if (!allowed) return `<${name}>`;

    const attrs: string[] = [];
    const attrPattern = /([a-zA-Z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
    let match: RegExpExecArray | null;

    while ((match = attrPattern.exec(rawAttrs)) !== null) {
      const attr = match[1].toLowerCase();
      const value = (match[2] ?? match[3] ?? "").trim();
      if (!allowed.has(attr)) continue;

      if (attr === "href" && !SAFE_URL.test(value)) continue;
      if (attr === "src" && !SAFE_IMAGE_URL.test(value)) continue;
      if (attr === "style" && !SAFE_STYLE.test(value)) continue;
      if (attr === "target" && value !== "_blank") continue;

      attrs.push(`${attr}="${value.replace(/"/g, "&quot;")}"`);
    }

    // Outbound links open safely.
    if (name === "a" && attrs.some((attr) => attr.startsWith('target="_blank"'))) {
      if (!attrs.some((attr) => attr.startsWith("rel="))) {
        attrs.push('rel="noopener noreferrer"');
      }
    }

    return attrs.length ? `<${name} ${attrs.join(" ")}>` : `<${name}>`;
  });

  return out;
}
