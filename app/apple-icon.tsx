import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brand.mark,
        }}
      >
        <div style={{ display: "flex", gap: 16, transform: "skewX(-10deg)" }}>
          <div style={{ width: 26, height: 84, borderRadius: 13, background: brand.markGlyph }} />
          <div style={{ width: 26, height: 84, borderRadius: 13, background: brand.markGlyph }} />
        </div>
      </div>
    ),
    size
  );
}
