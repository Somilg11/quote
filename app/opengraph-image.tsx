import { ImageResponse } from "next/og";
import { brand, siteConfig } from "@/lib/brand";

export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brand.ink,
          padding: 72,
          color: brand.text,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: "#FFFFFF",
            opacity: 0.06,
            }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: brand.mark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", gap: 6, transform: "skewX(-10deg)" }}>
              <div style={{ width: 9, height: 30, borderRadius: 5, background: brand.markGlyph }} />
              <div style={{ width: 9, height: 30, borderRadius: 5, background: brand.markGlyph }} />
            </div>
          </div>
          <div style={{ fontSize: 38, fontWeight: 600, letterSpacing: -1 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: -2.4, lineHeight: 1.05, maxWidth: 900 }}>
            {siteConfig.tagline}
          </div>
          <div style={{ fontSize: 28, color: brand.textMuted, maxWidth: 860, lineHeight: 1.4 }}>
            Nested pages, real-time collaboration, and an MCP server your AI tools can plug into.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 22, color: brand.textMuted }}>
          <span>Claude Code</span>
          <span>·</span>
          <span>ChatGPT</span>
          <span>·</span>
          <span>Gemini</span>
        </div>
      </div>
    ),
    size
  );
}
