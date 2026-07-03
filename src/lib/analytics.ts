import { prisma } from "@/lib/prisma";

// ── Model registry ──────────────────────────────────────────────────────
// Maps the OpenRouter model IDs stored in Feedback.chosenModelId to
// human-readable labels and chart colors.

const MODEL_REGISTRY: Record<string, { label: string; color: string }> = {
  "qwen/qwen3-235b-a22b-2507": { label: "Qwen 3 235B", color: "#ff6a1a" },
  "deepseek/deepseek-chat":    { label: "DeepSeek Chat", color: "#3b6fed" },
  "openai/gpt-4o-mini":        { label: "GPT-4o Mini",   color: "#8fd13f" },
};

const ALL_MODEL_IDS = Object.keys(MODEL_REGISTRY);

// ── Exported types ──────────────────────────────────────────────────────

export interface ModelStats {
  modelId: string;
  label: string;
  color: string;
  selectionCount: number;
  winRate: number;
  avgRating: number;
  avgClarity: number;
  avgPersonalization: number;
  wouldFollowRate: number;
  helpfulRate: number;
  compositeScore: number;
  feedbackCount: number;
}

export interface TrendPoint {
  date: string;   // YYYY-MM-DD
  count: number;
}

export interface AnalyticsSummary {
  totalFeedbacks: number;
  modelsWithFeedback: number;
  globalAvgRating: number;
  globalWouldFollowRate: number;
  bestModel: ModelStats | null;
  models: ModelStats[];
  recentTrend: TrendPoint[];
  ratingDistribution: number[]; // index 1-5 → count
}

// ── Helpers ─────────────────────────────────────────────────────────────

function safeAvg(values: (number | null | undefined)[]): number {
  const nums = values.filter((v): v is number => typeof v === "number");
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function boolRate(values: (boolean | null | undefined)[]): number {
  const defined = values.filter((v): v is boolean => typeof v === "boolean");
  if (defined.length === 0) return 0;
  return (defined.filter(Boolean).length / defined.length) * 100;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// Composite score: weighted combination, normalised to 0-100.
// Weights reflect business importance.
function computeComposite(s: {
  avgRating: number;
  avgClarity: number;
  avgPersonalization: number;
  wouldFollowRate: number;
  helpfulRate: number;
}): number {
  const ratingNorm   = (s.avgRating / 5) * 100;
  const clarityNorm  = (s.avgClarity / 5) * 100;
  const persNorm     = (s.avgPersonalization / 5) * 100;

  const composite =
    ratingNorm       * 0.30 +
    clarityNorm      * 0.15 +
    persNorm         * 0.25 +
    s.wouldFollowRate * 0.15 +
    s.helpfulRate     * 0.15;

  return round2(composite);
}

// ── Main query ──────────────────────────────────────────────────────────

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  // Single query — pull all feedback rows at once.
  // For a landing page with up to a few thousand rows this is fine.
  const allFeedback = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalFeedbacks = allFeedback.length;

  if (totalFeedbacks === 0) {
    return {
      totalFeedbacks: 0,
      modelsWithFeedback: 0,
      globalAvgRating: 0,
      globalWouldFollowRate: 0,
      bestModel: null,
      models: [],
      recentTrend: [],
      ratingDistribution: [0, 0, 0, 0, 0, 0],
    };
  }

  // ── Per-model aggregation ───────────────────────────────────────────

  const models: ModelStats[] = ALL_MODEL_IDS.map((modelId) => {
    const reg = MODEL_REGISTRY[modelId];
    const rows = allFeedback.filter((f) => f.chosenModelId === modelId);
    const count = rows.length;

    const avgRating          = round2(safeAvg(rows.map((r) => r.rating)));
    const avgClarity         = round2(safeAvg(rows.map((r) => r.planClarity)));
    const avgPersonalization = round2(safeAvg(rows.map((r) => r.planPersonalization)));
    const wouldFollowRate    = round2(boolRate(rows.map((r) => r.wouldFollowPlan)));
    const helpfulRate        = round2(boolRate(rows.map((r) => r.foundPlanHelpful)));

    const compositeScore = computeComposite({
      avgRating,
      avgClarity,
      avgPersonalization,
      wouldFollowRate,
      helpfulRate,
    });

    return {
      modelId,
      label: reg.label,
      color: reg.color,
      selectionCount: count,
      winRate: totalFeedbacks > 0 ? round2((count / totalFeedbacks) * 100) : 0,
      avgRating,
      avgClarity,
      avgPersonalization,
      wouldFollowRate,
      helpfulRate,
      compositeScore,
      feedbackCount: count,
    };
  });

  // ── Global KPIs ─────────────────────────────────────────────────────

  const globalAvgRating = round2(safeAvg(allFeedback.map((f) => f.rating)));
  const globalWouldFollowRate = round2(
    boolRate(allFeedback.map((f) => f.wouldFollowPlan))
  );
  const modelsWithFeedback = models.filter((m) => m.feedbackCount > 0).length;
  const bestModel =
    models.filter((m) => m.feedbackCount > 0)
      .sort((a, b) => b.compositeScore - a.compositeScore)[0] ?? null;

  // ── Rating distribution (1-5 histogram) ─────────────────────────────

  const ratingDistribution = [0, 0, 0, 0, 0, 0]; // index 0 unused
  for (const f of allFeedback) {
    if (f.rating >= 1 && f.rating <= 5) ratingDistribution[f.rating]++;
  }

  // ── Trend: last 7 days ──────────────────────────────────────────────

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const dayBuckets = new Map<string, number>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    dayBuckets.set(d.toISOString().slice(0, 10), 0);
  }

  for (const f of allFeedback) {
    const key = f.createdAt.toISOString().slice(0, 10);
    if (dayBuckets.has(key)) {
      dayBuckets.set(key, dayBuckets.get(key)! + 1);
    }
  }

  const recentTrend: TrendPoint[] = Array.from(dayBuckets.entries()).map(
    ([date, count]) => ({ date, count })
  );

  return {
    totalFeedbacks,
    modelsWithFeedback,
    globalAvgRating,
    globalWouldFollowRate,
    bestModel,
    models,
    recentTrend,
    ratingDistribution,
  };
}
