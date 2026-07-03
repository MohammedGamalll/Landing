import type { Metadata } from "next";
import { ShieldX } from "lucide-react";
import { getAnalyticsSummary } from "@/lib/analytics";
import KpiCards from "@/components/analysis/KpiCards";
import RatingBarChart from "@/components/analysis/RatingBarChart";
import WinRateDonut from "@/components/analysis/WinRateDonut";
import ModelRadar from "@/components/analysis/ModelRadar";
import TrendChart from "@/components/analysis/TrendChart";
import ExportButton from "@/components/analysis/ExportButton";
import EmptyState from "@/components/analysis/EmptyState";

// Force dynamic rendering — never cache, always fetch fresh data
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Model Analysis — FitMind Admin",
  description:
    "Internal dashboard comparing AI model performance based on user feedback.",
  robots: "noindex, nofollow",
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AnalysisPage({ searchParams }: PageProps) {
  // ── Auth gate ────────────────────────────────────────────────────────
  const params = await searchParams;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || params.key !== adminPassword) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
          <ShieldX size={28} className="text-red-400" />
        </div>
        <h1 className="font-display text-2xl font-bold">Access Denied</h1>
        <p className="max-w-sm text-sm text-muted">
          This dashboard is restricted to administrators. Please provide a valid
          access key via the <code className="text-brand">?key=</code> query
          parameter.
        </p>
      </div>
    );
  }

  // ── Fetch data ──────────────────────────────────────────────────────
  const summary = await getAnalyticsSummary();

  if (summary.totalFeedbacks === 0) {
    return (
      <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-7xl">
          <EmptyState />
        </div>
      </div>
    );
  }

  // ── Dashboard ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold">
              AI Models{" "}
              <span className="text-gradient-brand">Analysis</span>
            </h1>
            <p className="mt-1 text-sm text-muted">
              Comparing {summary.modelsWithFeedback} model
              {summary.modelsWithFeedback !== 1 ? "s" : ""} across{" "}
              {summary.totalFeedbacks} user feedback
              {summary.totalFeedbacks !== 1 ? "s" : ""}
            </p>
          </div>

          <ExportButton
            models={summary.models}
            totalFeedbacks={summary.totalFeedbacks}
            globalAvgRating={summary.globalAvgRating}
            globalWouldFollowRate={summary.globalWouldFollowRate}
          />
        </div>

        {/* KPI Cards */}
        <div className="mb-8">
          <KpiCards
            totalFeedbacks={summary.totalFeedbacks}
            globalAvgRating={summary.globalAvgRating}
            globalWouldFollowRate={summary.globalWouldFollowRate}
            bestModel={summary.bestModel}
          />
        </div>

        {/* Charts — Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RatingBarChart models={summary.models} />
          <WinRateDonut
            models={summary.models}
            totalFeedbacks={summary.totalFeedbacks}
          />
        </div>

        {/* Charts — Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <ModelRadar models={summary.models} />
          <TrendChart data={summary.recentTrend} />
        </div>

        {/* Composite score breakdown table */}
        <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur-sm p-5 mb-10 overflow-x-auto">
          <h3 className="font-display text-base font-bold mb-1">
            Composite Score Breakdown
          </h3>
          <p className="text-xs text-muted mb-5">
            Weighted: Rating 30% · Personalization 25% · Clarity 15% · Would Follow 15% · Helpful 15%
          </p>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted uppercase tracking-wide">
                <th className="pb-3 pr-4">Model</th>
                <th className="pb-3 pr-4 text-center">Rating</th>
                <th className="pb-3 pr-4 text-center">Clarity</th>
                <th className="pb-3 pr-4 text-center">Personal.</th>
                <th className="pb-3 pr-4 text-center">Follow %</th>
                <th className="pb-3 pr-4 text-center">Helpful %</th>
                <th className="pb-3 text-center">Score</th>
              </tr>
            </thead>
            <tbody>
              {summary.models
                .slice()
                .sort((a, b) => b.compositeScore - a.compositeScore)
                .map((m) => (
                  <tr key={m.modelId} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4 font-medium">
                      <span className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                          style={{ background: m.color }}
                        />
                        {m.label}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-center">{m.avgRating}</td>
                    <td className="py-3 pr-4 text-center">{m.avgClarity}</td>
                    <td className="py-3 pr-4 text-center">{m.avgPersonalization}</td>
                    <td className="py-3 pr-4 text-center">{m.wouldFollowRate}%</td>
                    <td className="py-3 pr-4 text-center">{m.helpfulRate}%</td>
                    <td className="py-3 text-center">
                      <span className="inline-flex items-center gap-1.5">
                        {/* Mini progress bar */}
                        <span className="relative h-1.5 w-16 rounded-full bg-surface-2 overflow-hidden">
                          <span
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              width: `${m.compositeScore}%`,
                              background: m.color,
                            }}
                          />
                        </span>
                        <span className="font-bold" style={{ color: m.color }}>
                          {m.compositeScore}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
