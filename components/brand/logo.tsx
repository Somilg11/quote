import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  /** Renders the mark without its filled tile - useful on coloured surfaces. */
  bare?: boolean;
}

/**
 * The Quote mark: a blocky "Q" built from five rounded bars, with the square tail
 * at bottom right. Coordinates are on a 32px grid and sized for the logo tile;
 * the bars overlap slightly at the corners so they read as one stepped shape.
 */
export const Q_RECTS = [
  { x: 9.6, y: 7, width: 12.8, height: 3.2 },
  { x: 7, y: 9, width: 3.8, height: 13.6 },
  { x: 21.2, y: 9, width: 3.8, height: 6.8 },
  { x: 9.6, y: 21.4, width: 6.3, height: 3.6 },
  { x: 18.3, y: 18.3, width: 6.7, height: 6.7 },
] as const;

export const Q_RADIUS = 0.8;

/**
 * The mark's bars as plain elements. Image routes (icon, OG) render through satori,
 * which only understands raw SVG nodes, so they call this rather than <QShape>.
 */
export function qRects(fill: string) {
  return Q_RECTS.map((r, i) => <rect key={i} {...r} rx={Q_RADIUS} fill={fill} />);
}

/** The mark's bars, for any in-app SVG. */
export function QShape({ fill, transform }: { fill: string; transform?: string }) {
  return (
    <g fill={fill} transform={transform}>
      {Q_RECTS.map((r, i) => (
        <rect key={i} {...r} rx={Q_RADIUS} />
      ))}
    </g>
  );
}

export function LogoMark({ className, bare = false }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="Quote"
      className={cn("h-7 w-7 shrink-0", className)}
    >
      {!bare && <rect width="32" height="32" rx="6" fill="var(--brand-mark, #F7F7F5)" />}
      <QShape fill={bare ? "currentColor" : "var(--brand-mark-glyph, #111111)"} />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
  /** Hides the wordmark, leaving only the tile. */
  markOnly?: boolean;
}

/** Mark + wordmark lockup. Use this anywhere the product is named. */
export function Logo({
  className,
  markClassName,
  wordClassName,
  markOnly = false,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={markClassName} />
      {!markOnly && (
        <span
          className={cn(
            "text-[17px] font-medium tracking-[-0.03em] leading-none",
            wordClassName
          )}
        >
          quote
        </span>
      )}
    </span>
  );
}

/**
 * The assistant mark: the bare Quote "Q", no tile. Drawn without a tile
 * so it can sit on the light floating button or a dark header chip.
 */
export function AssistantMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("h-6 w-6", className)}>
      <QShape fill="currentColor" />
    </svg>
  );
}
