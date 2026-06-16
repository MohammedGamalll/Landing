"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { FullNutritionPlan as FullNutritionPlanType, FullWorkoutPlan as FullWorkoutPlanType } from "@/lib/api";
import FullNutritionPlan from "./FullNutritionPlan";
import FullWorkoutPlan from "./FullWorkoutPlan";

export default function ResultsStep({
  workout,
  nutrition,
  onContinue,
}: {
  workout: FullWorkoutPlanType | null;
  nutrition: FullNutritionPlanType | null;
  onContinue: () => void;
}) {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="flex items-center gap-2 text-sm text-brand">
            <CheckCircle2 size={16} />
            Saved to your FitMind account
          </p>
          <h1 className="font-display mt-1 text-2xl font-extrabold">Your real plan, in full 🎉</h1>
          <p className="mt-2 text-sm text-muted">
            Take a real look before you rate it — every day, meal, and exercise below
            is exactly what was generated and saved to your account.
          </p>
        </motion.div>

        {nutrition && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <FullNutritionPlan plan={nutrition} />
          </motion.div>
        )}

        {workout && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <FullWorkoutPlan plan={workout} />
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onContinue}
          className="flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-semibold text-background transition-transform hover:scale-[1.02]"
        >
          One quick question
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}
