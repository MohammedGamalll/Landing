"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center px-6"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-surface-2 border border-border">
        <BarChart3 size={36} className="text-muted" />
      </div>

      <h2 className="font-display text-xl font-bold">
        No Feedback Data Yet
      </h2>

      <p className="max-w-sm text-sm text-muted leading-relaxed">
        Once users complete the demo flow and submit their feedback, this
        dashboard will display a comprehensive analysis of how the three AI
        models compare.
      </p>

      <Link
        href="/demo"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Try the Demo
      </Link>
    </motion.div>
  );
}
