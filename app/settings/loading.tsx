export default function SettingsLoading() {
  return (
    <div className="grid gap-5 px-5 py-8 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8 sm:px-14 sm:py-10" aria-busy>
      <div className="space-y-2">
        <div className="h-4 w-24 animate-pulse rounded bg-white/[0.06]" />
        <div className="h-3 w-36 animate-pulse rounded bg-white/[0.04]" />
      </div>
      <div className="max-w-2xl space-y-3">
        <div className="h-14 animate-pulse rounded-xl bg-white/[0.04]" />
        <div className="h-14 animate-pulse rounded-xl bg-white/[0.04]" />
        <div className="h-14 animate-pulse rounded-xl bg-white/[0.04]" />
      </div>
    </div>
  );
}
