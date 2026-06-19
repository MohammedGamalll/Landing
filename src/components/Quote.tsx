"use client";

import Reveal from "./Reveal";
import { Quote as QuoteIcon } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { ts } from "@/lib/translations";

export default function Quote() {
  const { lang } = useLang();

  return (
    <section id="testimonials" className="relative mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24 text-center">
      <Reveal>
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-background">
          <QuoteIcon size={22} />
        </div>
        <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-snug">
          {ts(lang, "quote")}
        </p>
        <p className="mt-5 text-sm uppercase tracking-wide text-muted">
          {ts(lang, "quoteAuthor")}
        </p>
      </Reveal>
    </section>
  );
}
