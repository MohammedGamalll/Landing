"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { FullNutritionPlan as FullNutritionPlanType, FullWorkoutPlan as FullWorkoutPlanType } from "@/lib/api";
import FullNutritionPlan from "./FullNutritionPlan";
import FullWorkoutPlan from "./FullWorkoutPlan";
import { useLang } from "@/lib/lang-context";
import { ts } from "@/lib/translations";

export default function ResultsStep({
  workout,
  nutrition,
  onContinue,
}: {
  workout: FullWorkoutPlanType | null;
  nutrition: FullNutritionPlanType | null;
  onContinue: () => void;
}) {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="flex items-center gap-2 text-sm text-brand">
            <CheckCircle2 size={16} />
            {ts(lang, "resultsSaved")}
          </p>
          <h1 className="font-display mt-1 text-xl sm:text-2xl font-extrabold">
            {ts(lang, "resultsTitle")} 🎉
          </h1>
          <p className="mt-2 text-sm text-muted">
            {ts(lang, "resultsSub")}
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
          {ts(lang, "resultsNext")}
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}
