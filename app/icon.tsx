import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
        }}
      >
        <div style={{ display: "flex", gap: 3, transform: "skewX(-10deg)" }}>
          <div style={{ width: 5, height: 15, borderRadius: 3, background: brand.markGlyph }} />
          <div style={{ width: 5, height: 15, borderRadius: 3, background: brand.markGlyph }} />
        </div>
      </div>
    ),
    size
  );
}
