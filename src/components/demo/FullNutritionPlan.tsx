"use client";

import { useState } from "react";
import { ChevronDown, Salad } from "lucide-react";
import type { FullNutritionPlan as FullNutritionPlanType } from "@/lib/api";

export default function FullNutritionPlan({ plan }: { plan: FullNutritionPlanType }) {
  const [openDay, setOpenDay] = useState<number>(plan.days[0]?.id ?? -1);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
          <Salad size={18} />
        </span>
        <div>
          <p className="font-display font-bold">{plan.plan_name}</p>
          <p className="text-xs text-muted">Nutrition plan</p>
        </div>
      </div>

      {plan.description && <p className="mt-4 text-sm text-muted">{plan.description}</p>}

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <Stat label="Daily calories" value={`${Math.round(plan.daily_calories)} kcal`} />
        <Stat label="Protein" value={`${Math.round(plan.daily_protein_g)}g`} />
        <Stat label="Carbs" value={`${Math.round(plan.daily_carbs_g)}g`} />
        <Stat label="Fats" value={`${Math.round(plan.daily_fats_g)}g`} />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {plan.days.map((day) => {
          const isOpen = openDay === day.id;
          return (
            <div key={day.id} className="overflow-hidden rounded-xl border border-border">
              <button
                onClick={() => setOpenDay(isOpen ? -1 : day.id)}
                className="flex w-full items-center justify-between bg-surface-2 px-4 py-3 text-left"
              >
                <span className="font-display font-semibold">
                  Day {day.day_number} — {day.day_name}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="flex flex-col divide-y divide-border">
                  {day.notes && <p className="px-4 py-3 text-xs text-muted">{day.notes}</p>}
                  {day.meals.map((meal) => (
                    <div key={meal.id} className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">
                          <span className="text-muted">{meal.meal_type}: </span>
                          {meal.meal_name}
                        </p>
                        <span className="text-sm text-brand">{Math.round(meal.calories)} kcal</span>
                      </div>

                      <div className="mt-2 flex gap-4 text-xs text-muted">
                        <span>P {Math.round(meal.protein_g)}g</span>
                        <span>C {Math.round(meal.carbs_g)}g</span>
                        <span>F {Math.round(meal.fats_g)}g</span>
                        {meal.prep_time_minutes != null && <span>Prep {meal.prep_time_minutes}m</span>}
                        {meal.cook_time_minutes != null && <span>Cook {meal.cook_time_minutes}m</span>}
                      </div>

                      {meal.ingredients?.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                          {meal.ingredients.map((ing, i) => (
                            <li
                              key={i}
                              className="rounded-full bg-surface-2 px-2.5 py-1 text-muted"
                            >
                              {ing.food_name} ({Math.round(ing.amount_g)}g)
                            </li>
                          ))}
                        </ul>
                      )}

                      {meal.instructions && (
                        <p className="mt-3 text-xs leading-relaxed text-muted">{meal.instructions}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-2 px-3 py-2.5">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="font-display font-bold">{value}</p>
    </div>
  );
}
