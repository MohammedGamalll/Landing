"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import GlowBackground from "./GlowBackground";
import PhoneFrame from "./PhoneFrame";
import CalorieStatsCard from "./CalorieStatsCard";

const headline = "Your Personal AI Fitness Coach";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <GlowBackground />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted"
          >
            <Sparkles size={14} className="text-brand" />
            Powered by FitMind&apos;s AI Coach
          </motion.span>

          <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            {headline.split(" ").map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
                className={`inline-block mr-3 ${
                  word === "AI" || word === "Fitness" ? "text-gradient-brand" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-md text-lg text-muted"
          >
            Scan your meals, talk to your tracker, and get workout and nutrition
            plans built around you — not a generic template.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-background transition-transform hover:scale-105"
            >
              Generate my free plan
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#features"
              className="rounded-full border border-border px-7 py-3.5 font-semibold text-foreground transition-colors hover:border-brand/60"
            >
              Explore features
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex items-center gap-6 text-sm text-muted"
          >
            <span>~100K exercises</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>8.7K+ foods recognized</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>Real AI plans, not templates</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <PhoneFrame>
            <CalorieStatsCard />
          </PhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}
