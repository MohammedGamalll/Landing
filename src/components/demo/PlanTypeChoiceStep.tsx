import { Dumbbell, Salad, Sparkles } from "lucide-react";

type Choice = "workout" | "nutrition" | "both";

const options: { value: Choice; label: string; description: string; icon: typeof Dumbbell }[] = [
  {
    value: "both",
    label: "Both",
    description: "A full workout split and a nutrition plan, generated together.",
    icon: Sparkles,
  },
  {
    value: "workout",
    label: "Workout plan only",
    description: "Just the training split — no meal plan.",
    icon: Dumbbell,
  },
  {
    value: "nutrition",
    label: "Nutrition plan only",
    description: "Just the meal plan — no workout split.",
    icon: Salad,
  },
];

export default function PlanTypeChoiceStep({
  value,
  onChange,
}: {
  value: Choice | "";
  onChange: (choice: Choice) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const Icon = opt.icon;
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
              selected ? "border-brand bg-brand/10" : "border-border bg-surface hover:border-brand/40"
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Icon size={18} />
            </span>
            <span>
              <p className="font-display font-bold">{opt.label}</p>
              <p className="mt-0.5 text-xs text-muted">{opt.description}</p>
            </span>
          </button>
        );
      })}
    </div>
  );
}
