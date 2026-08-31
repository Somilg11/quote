import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  /** Renders the mark without its filled tile - useful on coloured surfaces. */
  bare?: boolean;
}

/** The Quote mark: two slanted quotation bars inside a rounded tile. */
export function LogoMark({ className, bare = false }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="Quote"
      className={cn("h-7 w-7 shrink-0", className)}
    >
      {!bare && <rect width="32" height="32" rx="8" fill="var(--brand-mark, #F7F7F5)" />}
      <g
        fill={bare ? "currentColor" : "var(--brand-mark-glyph, #191919)"}
        transform="translate(3.2 0) skewX(-10)"
      >
        <rect x="7.6" y="8.5" width="4.6" height="15" rx="2.3" />
        <rect x="15.4" y="8.5" width="4.6" height="15" rx="2.3" />
      </g>
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
            "text-[17px] font-semibold tracking-[-0.02em] leading-none",
            wordClassName
          )}
        >
          Quote
        </span>
      )}
    </span>
  );
}
