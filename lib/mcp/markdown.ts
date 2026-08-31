/**
 * Small, dependency-free conversions between the HTML TipTap stores and the
 * Markdown MCP clients prefer to read and write. It only needs to understand the
 * subset of HTML this editor produces.
 */

const decodeEntities = (value: string) =>
  value
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export function htmlToMarkdown(html: string): string {
  if (!html) return "";

  let out = html;

  // Block level, outermost first.
  out = out.replace(/<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi, (_, code) => `\n\`\`\`\n${decodeEntities(code).trim()}\n\`\`\`\n`);
  out = out.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n# ${inline(t)}\n`);
  out = out.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n## ${inline(t)}\n`);
  out = out.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n### ${inline(t)}\n`);
  out = out.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `\n#### ${inline(t)}\n`);
  out = out.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, body) =>
    `\n${stripTags(body)
      .split("\n")
      .filter(Boolean)
      .map((line) => `> ${line}`)
      .join("\n")}\n`
  );
  out = out.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, body) => `\n${listItems(body).map((item) => `- ${item}`).join("\n")}\n`);
  out = out.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, body) => `\n${listItems(body).map((item, i) => `${i + 1}. ${item}`).join("\n")}\n`);
  out = out.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, body) => `\n${table(body)}\n`);
  out = out.replace(/<hr\s*\/?>/gi, "\n---\n");
  out = out.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `\n${inline(t)}\n`);
  out = out.replace(/<br\s*\/?>/gi, "\n");

  out = inline(out);

  return out.replace(/\n{3,}/g, "\n\n").trim();
}

function listItems(body: string) {
  return [...body.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((match) =>
    inline(match[1]).replace(/\n+/g, " ").trim()
  );
}

function table(body: string) {
  const rows = [...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((match) =>
    [...match[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((cell) =>
      inline(cell[1]).replace(/\n+/g, " ").trim()
    )
  );
  if (rows.length === 0) return "";

  const [header, ...rest] = rows;
  return [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...rest.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function inline(value: string) {
  return decodeEntities(
    value
      .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**")
      .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, "_$2_")
      .replace(/<(s|del)[^>]*>([\s\S]*?)<\/\1>/gi, "~~$2~~")
      .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
      .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
      .replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, "![]($1)")
      .replace(/<[^>]+>/g, "")
  );
}

function stripTags(value: string) {
  return inline(value).trim();
}

export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let inCode = false;
  let codeBuffer: string[] = [];
  let paragraph: string[] = [];

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p>${inlineMd(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`);
        codeBuffer = [];
        inCode = false;
      } else {
        flushParagraph();
        closeList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      closeList();
      html.push(`<h${heading[1].length}>${inlineMd(heading[2])}</h${heading[1].length}>`);
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushParagraph();
      closeList();
      html.push("<hr>");
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      closeList();
      html.push(`<blockquote><p>${inlineMd(quote[1])}</p></blockquote>`);
      continue;
    }

    const bullet = line.match(/^\s*[-*+]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      flushParagraph();
      const wanted = bullet ? "ul" : "ol";
      if (listType !== wanted) {
        closeList();
        html.push(`<${wanted}>`);
        listType = wanted;
      }
      html.push(`<li><p>${inlineMd((bullet ?? numbered)![1])}</p></li>`);
      continue;
    }

    paragraph.push(line.trim());
  }

  if (inCode && codeBuffer.length) {
    html.push(`<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`);
  }
  flushParagraph();
  closeList();

  return html.join("");
}

function inlineMd(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")
    .replace(/~~([^~]+)~~/g, "<s>$1</s>")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

/** Plain text, for search snippets. */
export function htmlToText(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}
