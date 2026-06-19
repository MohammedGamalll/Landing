"use client";

import Reveal from "./Reveal";
import PhoneFrame from "./PhoneFrame";
import ScoreRadar from "./ScoreRadar";
import { useLang } from "@/lib/lang-context";
import { ts, TranslationKey } from "@/lib/translations";

const stepKeys: { title: TranslationKey; desc: TranslationKey }[] = [
  { title: "howStep1", desc: "howStep1Desc" },
  { title: "howStep2", desc: "howStep2Desc" },
  { title: "howStep3", desc: "howStep3Desc" },
  { title: "howStep4", desc: "howStep4Desc" },
];

export default function HowItWorks() {
  const { lang } = useLang();

  return (
    <section id="how-it-works" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              {ts(lang, "howTitle")}
            </h2>
          </Reveal>

          <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-10">
            {stepKeys.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="flex gap-4 sm:gap-5">
                  <span className="font-display text-xl sm:text-2xl font-extrabold text-brand/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold">
                      {ts(lang, s.title)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {ts(lang, s.desc)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
            <PhoneFrame>
              <ScoreRadar />
            </PhoneFrame>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
