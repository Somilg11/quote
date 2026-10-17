import { ImageResponse } from "next/og";
import { qRects } from "@/components/brand/logo";
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
        <svg width={180} height={180} viewBox="0 0 32 32" fill="none">
          {qRects(brand.markGlyph)}
        </svg>
      </div>
    ),
    size
  );
}
