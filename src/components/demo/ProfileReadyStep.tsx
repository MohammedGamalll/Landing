"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function ProfileReadyStep({
  onGeneratePlan,
}: {
  onGeneratePlan: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/15 text-brand">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
          Your FitMind profile is ready!
        </h1>
        <p className="max-w-sm text-sm text-muted">
          We&apos;ve saved your profile to your account. Want a real, AI-generated
          workout and nutrition plan based on it right now?
        </p>

        <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
          <button
            onClick={onGeneratePlan}
            className="flex items-center justify-center gap-2 rounded-full bg-brand py-4 font-semibold text-background transition-transform hover:scale-[1.02]"
          >
            <Sparkles size={16} />
            Generate my plan now
          </button>
          <Link
            href="/"
            className="rounded-full border border-border py-3.5 font-semibold text-muted transition-colors hover:border-brand/40 hover:text-foreground"
          >
            Maybe later
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
