"use client";

import { motion } from "framer-motion";
import { BarChart3, Crown, Star, UserCheck } from "lucide-react";
import type { ModelStats } from "@/lib/analytics";

interface KpiCardsProps {
  totalFeedbacks: number;
  globalAvgRating: number;
  globalWouldFollowRate: number;
  bestModel: ModelStats | null;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface CardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent: string; // gradient "from" color
}

function Card({ icon, label, value, sub, accent }: CardProps) {
  return (
    <motion.div
      variants={item}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 backdrop-blur-sm p-5 flex flex-col gap-3"
    >
      {/* Gradient glow behind icon */}
      <div
        className="absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-15 blur-2xl"
        style={{ background: accent }}
      />

      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: `${accent}18` }}
      >
        {icon}
      </div>

      <p className="text-xs font-medium tracking-wide text-muted uppercase">
        {label}
      </p>

      <p className="font-display text-2xl font-extrabold leading-none">
        {value}
      </p>

      {sub && (
        <p className="text-xs text-muted">{sub}</p>
      )}
    </motion.div>
  );
}

export default function KpiCards({
  totalFeedbacks,
  globalAvgRating,
  globalWouldFollowRate,
  bestModel,
}: KpiCardsProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <Card
        icon={<BarChart3 size={20} className="text-brand" />}
        label="Total Feedbacks"
        value={totalFeedbacks.toLocaleString()}
        sub="All time submissions"
        accent="#ff6a1a"
      />

      <Card
        icon={<Crown size={20} className="text-[#3b6fed]" />}
        label="Leading Model"
        value={bestModel?.label ?? "—"}
        sub={bestModel ? `Score: ${bestModel.compositeScore}/100` : "No data yet"}
        accent="#3b6fed"
      />

      <Card
        icon={<Star size={20} className="text-[#f59e0b]" />}
        label="Avg Rating"
        value={globalAvgRating > 0 ? `${globalAvgRating} / 5` : "—"}
        sub="Across all models"
        accent="#f59e0b"
      />

      <Card
        icon={<UserCheck size={20} className="text-[#8fd13f]" />}
        label="Would Follow Plan"
        value={globalWouldFollowRate > 0 ? `${globalWouldFollowRate}%` : "—"}
        sub="User commitment rate"
        accent="#8fd13f"
      />
    </motion.div>
  );
}
