"use client";

import { Camera, Mic, Bot, CalendarRange, Activity, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import { useLang } from "@/lib/lang-context";
import { ts, TranslationKey } from "@/lib/translations";

const featureKeys: { icon: typeof Camera; title: TranslationKey; desc: TranslationKey }[] = [
  { icon: Camera, title: "featMealScanner", desc: "featMealScannerDesc" },
  { icon: Mic, title: "featVoiceTracker", desc: "featVoiceTrackerDesc" },
  { icon: Bot, title: "featAiCoach", desc: "featAiCoachDesc" },
  { icon: CalendarRange, title: "featPlans", desc: "featPlansDesc" },
  { icon: Activity, title: "featScore", desc: "featScoreDesc" },
  { icon: ShieldCheck, title: "featSafety", desc: "featSafetyDesc" },
];

export default function FeatureGrid() {
  const { lang } = useLang();

  return (
    <section id="features" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <Reveal>
        <h2 className="font-display text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold">
          {ts(lang, "featuresTitle")}
          <span className="text-gradient-brand">{ts(lang, "featuresTitleAccent")}</span>
        </h2>
      </Reveal>

      <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featureKeys.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-5 sm:p-6 transition-colors hover:border-brand/50">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-background">
                  <Icon size={20} />
                </div>
                <h3 className="font-display mt-4 sm:mt-5 text-base sm:text-lg font-bold">
                  {ts(lang, f.title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {ts(lang, f.desc)}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
