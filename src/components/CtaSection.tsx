"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import GlowBackground from "./GlowBackground";
import { useLang } from "@/lib/lang-context";
import { ts } from "@/lib/translations";

export default function CtaSection() {
  const { lang } = useLang();

  return (
    <section className="relative mx-4 sm:mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface px-4 sm:px-6 py-14 sm:py-20 text-center my-10">
      <GlowBackground />
      <Reveal className="relative">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold">
          {ts(lang, "ctaTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted">
          {ts(lang, "ctaSub")}
        </p>
        <Link
          href="/demo"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-background transition-transform hover:scale-105"
        >
          {ts(lang, "ctaButton")}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
