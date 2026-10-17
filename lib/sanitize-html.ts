import sanitize from "sanitize-html";

/**
 * Strict allowlist for page content.
 *
 * Page bodies are authored by TipTap, but they arrive over an API and are rendered
 * on public share pages, so they are sanitised on every write and again on render.
 * Built on a real HTML parser (sanitize-html): unknown tags and attributes, every
 * event handler and any non-allowlisted URL scheme are dropped.
 */

const OPTIONS: sanitize.IOptions = {
  allowedTags: [
    "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "del", "code", "pre",
    "blockquote", "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li", "a", "img",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "colgroup", "col",
  ],
  allowedAttributes: {
    a: ["href", "title", "rel", "target"],
    img: ["src", "alt", "title", "width", "height"],
    code: ["class"],
    ol: ["start"],
    th: ["colspan", "rowspan", "colwidth"],
    td: ["colspan", "rowspan", "colwidth"],
    col: ["style"],
    colgroup: ["style"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: {
    // Raster data: images only; SVG is excluded.
    img: ["http", "https", "data"],
  },
  allowProtocolRelative: false,
  allowedClasses: { code: [/^language-[\w+-]+$/] },
  allowedStyles: {
    "*": { width: [/^[\d.]+(px|%|em|rem)$/], "min-width": [/^[\d.]+(px|%|em|rem)$/] },
  },
  disallowedTagsMode: "discard",
  transformTags: {
    a: (tagName, { target, ...attribs }) => ({
      tagName,
      attribs: {
        ...attribs,
        rel: "noopener noreferrer nofollow",
        // Only new-tab links survive; any other target value is dropped.
        ...(target === "_blank" ? { target: "_blank" } : {}),
      },
    }),
  },
  exclusiveFilter: (frame) =>
    frame.tag === "img" && !/^(https?:\/\/|\/(?!\/)|data:image\/(png|jpe?g|gif|webp);base64,)/i.test(frame.attribs.src ?? ""),
};

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return sanitize(html, OPTIONS);
}
