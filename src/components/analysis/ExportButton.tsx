"use client";

import type { ModelStats } from "@/lib/analytics";
import { Download } from "lucide-react";

interface ExportButtonProps {
  models: ModelStats[];
  totalFeedbacks: number;
  globalAvgRating: number;
  globalWouldFollowRate: number;
}

export default function ExportButton({
  models,
  totalFeedbacks,
  globalAvgRating,
  globalWouldFollowRate,
}: ExportButtonProps) {
  function handleExport() {
    const headers = [
      "Model",
      "Selections",
      "Win Rate (%)",
      "Avg Rating",
      "Avg Clarity",
      "Avg Personalization",
      "Would Follow (%)",
      "Helpful (%)",
      "Composite Score",
    ];

    const rows = models.map((m) => [
      m.label,
      m.selectionCount,
      m.winRate,
      m.avgRating,
      m.avgClarity,
      m.avgPersonalization,
      m.wouldFollowRate,
      m.helpfulRate,
      m.compositeScore,
    ]);

    // Add a summary row
    rows.push([]);
    rows.push(["--- Summary ---"]);
    rows.push(["Total Feedbacks", totalFeedbacks]);
    rows.push(["Global Avg Rating", globalAvgRating]);
    rows.push(["Global Would Follow (%)", globalWouldFollowRate]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fitmind-analysis-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/80 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 hover:border-brand/40 active:scale-[0.98]"
    >
      <Download size={16} className="text-brand" />
      Export CSV
    </button>
  );
}
