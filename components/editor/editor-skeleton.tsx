/** Placeholder shown while the cached document and first sync resolve. */
export function EditorSkeleton() {
  const widths = ["100%", "92%", "78%", "96%", "64%", "88%", "72%"];

  return (
    <div className="space-y-4 py-2" aria-hidden>
      <div className="h-7 w-1/3 animate-pulse rounded bg-[#262626]" />
      {widths.map((width, index) => (
        <div
          key={index}
          style={{ width, animationDelay: `${index * 70}ms` }}
          className="h-4 animate-pulse rounded bg-[#232323]"
        />
      ))}
    </div>
  );
}
