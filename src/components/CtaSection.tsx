import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import GlowBackground from "./GlowBackground";

export default function CtaSection() {
  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface px-6 py-20 text-center my-10">
      <GlowBackground />
      <Reveal className="relative">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          Get your real plan in under two minutes.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          No generic templates. Answer a short assessment and FitMind&apos;s AI
          generates a workout and nutrition plan built around your body, goals,
          and limitations — for free.
        </p>
        <Link
          href="/demo"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-background transition-transform hover:scale-105"
        >
          Start my assessment
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
