"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { ModelStats } from "@/lib/analytics";

interface ModelRadarProps {
  models: ModelStats[];
}

export default function ModelRadar({ models }: ModelRadarProps) {
  // Normalise all metrics to 0-100 scale for the radar
  const dimensions = ["Rating", "Clarity", "Personalization", "Would Follow", "Helpful"];

  const data = dimensions.map((dim) => {
    const point: Record<string, string | number> = { dimension: dim };
    for (const m of models) {
      let val = 0;
      switch (dim) {
        case "Rating":
          val = (m.avgRating / 5) * 100;
          break;
        case "Clarity":
          val = (m.avgClarity / 5) * 100;
          break;
        case "Personalization":
          val = (m.avgPersonalization / 5) * 100;
          break;
        case "Would Follow":
          val = m.wouldFollowRate;
          break;
        case "Helpful":
          val = m.helpfulRate;
          break;
      }
      point[m.label] = Math.round(val);
    }
    return point;
  });

  const activeModels = models.filter((m) => m.feedbackCount > 0);

  return (
    <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur-sm p-5">
      <h3 className="font-display text-base font-bold mb-1">
        Model Comparison Radar
      </h3>
      <p className="text-xs text-muted mb-5">
        Holistic comparison across 5 quality dimensions (0–100)
      </p>

      <div className="h-80">
        {activeModels.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fill: "var(--muted)", fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "var(--muted)", fontSize: 10 }}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  color: "var(--foreground)",
                  fontSize: 13,
                }}
              />
              {activeModels.map((m) => (
                <Radar
                  key={m.modelId}
                  name={m.label}
                  dataKey={m.label}
                  stroke={m.color}
                  fill={m.color}
                  fillOpacity={0.15}
                  strokeWidth={2}
                  animationDuration={800}
                />
              ))}
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: "var(--muted)" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Not enough data for radar comparison
          </div>
        )}
      </div>
    </div>
  );
}
