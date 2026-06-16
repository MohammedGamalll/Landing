"use client";

import { useState } from "react";
import { ChevronDown, Dumbbell } from "lucide-react";
import type { FullWorkoutPlan as FullWorkoutPlanType } from "@/lib/api";

export default function FullWorkoutPlan({ plan }: { plan: FullWorkoutPlanType }) {
  const [openDay, setOpenDay] = useState<number>(plan.workout_days[0]?.id ?? -1);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/15 text-blue">
          <Dumbbell size={18} />
        </span>
        <div>
          <p className="font-display font-bold">{plan.plan_name}</p>
          <p className="text-xs text-muted">Workout plan</p>
        </div>
      </div>

      {plan.description && <p className="mt-4 text-sm text-muted">{plan.description}</p>}

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <Stat label="Frequency" value={plan.frequency ?? "—"} />
        <Stat label="Difficulty" value={plan.difficulty_level ?? "—"} />
        <Stat
          label="Per session"
          value={plan.estimated_duration_per_session ? `${plan.estimated_duration_per_session} min` : "—"}
        />
        <Stat label="Training days" value={`${plan.workout_days.length}`} />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {plan.workout_days.map((day) => {
          const isOpen = openDay === day.id;
          return (
            <div key={day.id} className="overflow-hidden rounded-xl border border-border">
              <button
                onClick={() => setOpenDay(isOpen ? -1 : day.id)}
                className="flex w-full items-center justify-between bg-surface-2 px-4 py-3 text-left"
              >
                <span className="font-display font-semibold">
                  Day {day.day_number} — {day.day_name}
                  {day.focus_area ? ` (${day.focus_area})` : ""}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="flex flex-col divide-y divide-border">
                  {day.notes && <p className="px-4 py-3 text-xs text-muted">{day.notes}</p>}
                  {day.exercises.map((ex) => (
                    <div key={ex.id} className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{ex.central_exercise.name}</p>
                        <span className="text-xs text-muted">
                          {ex.central_exercise.equipment_required}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted">
                        {ex.sets != null && <span>{ex.sets} sets</span>}
                        {ex.reps != null && <span>{ex.reps} reps</span>}
                        {ex.weight_kg != null && <span>{ex.weight_kg}kg</span>}
                        {ex.duration_seconds != null && <span>{ex.duration_seconds}s</span>}
                        {ex.rest_seconds != null && <span>Rest {ex.rest_seconds}s</span>}
                      </div>

                      {ex.central_exercise.instructions && (
                        <p className="mt-3 text-xs leading-relaxed text-muted">
                          {ex.central_exercise.instructions}
                        </p>
                      )}
                      {ex.notes && (
                        <p className="mt-2 text-xs italic leading-relaxed text-brand">{ex.notes}</p>
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
