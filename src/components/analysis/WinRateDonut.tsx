"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { ModelStats } from "@/lib/analytics";

interface WinRateDonutProps {
  models: ModelStats[];
  totalFeedbacks: number;
}

export default function WinRateDonut({ models, totalFeedbacks }: WinRateDonutProps) {
  const data = models
    .filter((m) => m.selectionCount > 0)
    .map((m) => ({
      name: m.label,
      value: m.selectionCount,
      color: m.color,
      pct: m.winRate,
    }));

  // If nobody has a model selection, show a placeholder
  const hasData = data.length > 0;

  return (
    <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur-sm p-5">
      <h3 className="font-display text-base font-bold mb-1">
        Model Win Rate
      </h3>
      <p className="text-xs text-muted mb-5">
        Which model users chose most often
      </p>

      <div className="h-72 relative">
        {hasData ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                  animationBegin={100}
                  animationDuration={900}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--foreground)",
                    fontSize: 13,
                  }}
                  formatter={(value, name) => [
                    `${value} selections`,
                    `${name}`,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-display text-3xl font-extrabold">
                {totalFeedbacks}
              </span>
              <span className="text-xs text-muted">total</span>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            No model selection data yet
          </div>
        )}
      </div>

      {/* Legend */}
      {hasData && (
        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: d.color }}
              />
              <span className="text-muted">{d.name}</span>
              <span className="font-semibold text-foreground">{d.pct}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
