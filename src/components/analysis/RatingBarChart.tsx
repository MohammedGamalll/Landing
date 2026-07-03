"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { ModelStats } from "@/lib/analytics";

interface RatingBarChartProps {
  models: ModelStats[];
}

export default function RatingBarChart({ models }: RatingBarChartProps) {
  const data = models.map((m) => ({
    name: m.label,
    Rating: m.avgRating,
    Clarity: m.avgClarity,
    Personalization: m.avgPersonalization,
    color: m.color,
  }));

  return (
    <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur-sm p-5">
      <h3 className="font-display text-base font-bold mb-1">
        Average Ratings by Model
      </h3>
      <p className="text-xs text-muted mb-5">
        Rating, clarity & personalization scores (1–5 scale)
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="20%"
            barGap={4}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                color: "var(--foreground)",
                fontSize: 13,
              }}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, color: "var(--muted)" }}
            />

            <Bar dataKey="Rating" radius={[6, 6, 0, 0]} maxBarSize={36}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={1} />
              ))}
            </Bar>
            <Bar dataKey="Clarity" radius={[6, 6, 0, 0]} maxBarSize={36}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.6} />
              ))}
            </Bar>
            <Bar dataKey="Personalization" radius={[6, 6, 0, 0]} maxBarSize={36}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.35} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
