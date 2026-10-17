import { ImageResponse } from "next/og";
import { qRects } from "@/components/brand/logo";
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
          borderRadius: 6,
        }}
      >
        <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
          {qRects(brand.markGlyph)}
        </svg>
      </div>
    ),
    size
  );
}
