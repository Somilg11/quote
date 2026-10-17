import { cn } from "@/lib/utils";

/**
 * One row of a settings page: a label column on the left, content on the right.
 * Every tab is built from these so spacing, rules and widths stay identical.
 */
export function SettingsSection({
  title,
  hint,
  children,
  className,
}: {
  title: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className="border-t border-white/[0.07] first:border-t-0">
      <div className="grid gap-5 px-5 py-8 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8 sm:px-14 sm:py-10">
        <div>
          <h2 className="text-sm text-zinc-100">{title}</h2>
          {hint && <div className="mt-1.5 text-xs leading-relaxed text-zinc-500">{hint}</div>}
        </div>
        <div className={cn("min-w-0 max-w-2xl", className)}>{children}</div>
      </div>
    </section>
  );
}
