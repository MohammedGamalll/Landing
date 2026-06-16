"use client";

import { motion } from "framer-motion";
import { Drumstick, Wheat, Utensils, Droplet } from "lucide-react";

const macros = [
  { label: "Fat", value: 20, grams: "201g", color: "#171311", icon: Droplet },
  { label: "Protein", value: 30, grams: "158g", color: "#ff6a1a", icon: Drumstick },
  { label: "Carbs", value: 40, grams: "11g", color: "#3b6fed", icon: Utensils },
  { label: "Macro", value: 10, grams: "5g", color: "#8fd13f", icon: Wheat },
];

export default function CalorieStatsCard() {
  return (
    <div className="flex h-full w-full flex-col gap-5 bg-surface-2 p-5 text-foreground">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold">Calorie Stats</p>
        <span className="rounded-full bg-surface px-3 py-1 text-xs text-muted">Jan</span>
      </div>

      <div className="flex items-end justify-between gap-3">
        {macros.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative h-32 w-9 overflow-hidden rounded-full bg-surface">
                <motion.div
                  className="absolute bottom-0 w-full rounded-full"
                  style={{ backgroundColor: m.color }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${m.value * 2 + 20}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
                >
                  <Icon size={14} className="absolute top-2 left-1/2 -translate-x-1/2 text-white/90" />
                </motion.div>
              </div>
              <span className="text-xs font-semibold">{m.value}%</span>
            </div>
          );
        })}
      </div>

      <div className="mt-1 flex flex-col gap-2.5 border-t border-border pt-4">
        {macros.map((m) => (
          <div key={m.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: m.color }} />
              {m.label}
            </span>
            <span className="text-muted">{m.grams}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
