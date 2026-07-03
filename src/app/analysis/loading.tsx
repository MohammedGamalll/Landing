export default function AnalysisLoading() {
  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-64 rounded-lg bg-surface-2 animate-pulse" />
            <div className="h-4 w-48 rounded-lg bg-surface-2 animate-pulse mt-2" />
          </div>
          <div className="h-10 w-32 rounded-xl bg-surface-2 animate-pulse" />
        </div>

        {/* KPI cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface/60 p-5 flex flex-col gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-surface-2 animate-pulse" />
              <div className="h-3 w-24 rounded bg-surface-2 animate-pulse" />
              <div className="h-7 w-20 rounded bg-surface-2 animate-pulse" />
              <div className="h-3 w-32 rounded bg-surface-2 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Charts skeleton — 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface/60 p-5"
            >
              <div className="h-5 w-48 rounded bg-surface-2 animate-pulse mb-2" />
              <div className="h-3 w-64 rounded bg-surface-2 animate-pulse mb-5" />
              <div className="h-72 rounded-xl bg-surface-2 animate-pulse" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface/60 p-5"
            >
              <div className="h-5 w-48 rounded bg-surface-2 animate-pulse mb-2" />
              <div className="h-3 w-64 rounded bg-surface-2 animate-pulse mb-5" />
              <div className="h-72 rounded-xl bg-surface-2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
