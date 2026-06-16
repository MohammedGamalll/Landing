import { Camera, Mic, Bot, CalendarRange, Activity, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: Camera,
    title: "Meal Scanner",
    description:
      "Snap a photo of any meal and get an instant calorie, macro, and ingredient breakdown.",
  },
  {
    icon: Mic,
    title: "Voice Tracker",
    description:
      "Just say what you ate or which exercises you did — it's matched and logged automatically.",
  },
  {
    icon: Bot,
    title: "Virtual AI Coach",
    description: "Ask questions, get adjustments, and stay accountable with a coach that's always on.",
  },
  {
    icon: CalendarRange,
    title: "Personalized Plans",
    description:
      "Workout and nutrition plans generated from your goals, schedule, and limitations — not a template.",
  },
  {
    icon: Activity,
    title: "Score & Analytics",
    description: "Track strength, agility, and endurance over time with a single fitness score.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-Aware",
    description:
      "Plans are checked against your injuries and conditions before they ever reach you.",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <h2 className="font-display text-center text-3xl font-extrabold sm:text-4xl">
          Everything your coach would do.
          <span className="text-gradient-brand"> Without the wait.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-brand/50">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-background">
                  <Icon size={20} />
                </div>
                <h3 className="font-display mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
