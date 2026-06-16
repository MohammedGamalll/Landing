"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Check } from "lucide-react";

export default function FeedbackStep({
  onSubmit,
  submitting,
  submitted,
}: {
  onSubmit: (rating: number, foundPlanHelpful: boolean | null, comments: string) => void;
  submitting: boolean;
  submitted: boolean;
}) {
  const [rating, setRating] = useState(0);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comments, setComments] = useState("");

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-background">
          <Check size={26} />
        </span>
        <h1 className="font-display text-2xl font-extrabold">Thank you!</h1>
        <p className="max-w-sm text-sm text-muted">
          Your feedback helps us make FitMind&apos;s plans more accurate for everyone.
        </p>
        <Link href="/" className="mt-2 text-sm font-semibold text-brand hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 py-12">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <h1 className="font-display text-2xl font-extrabold">How did we do?</h1>
        <p className="mt-2 text-sm text-muted">
          Be honest — this directly shapes how FitMind&apos;s AI generates the next plan.
        </p>

        <div className="mt-8 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} aria-label={`${n} stars`}>
              <Star
                size={32}
                className={n <= rating ? "fill-brand text-brand" : "text-border"}
              />
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm font-semibold">Did this feel personalized to you?</p>
        <div className="mt-3 flex gap-3">
          {[
            { label: "Yes", value: true },
            { label: "Not really", value: false },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => setHelpful(opt.value)}
              className={`flex-1 rounded-2xl border py-3 font-medium transition-colors ${
                helpful === opt.value
                  ? "border-brand bg-brand/10"
                  : "border-border bg-surface hover:border-brand/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm font-semibold">Anything else? (optional)</p>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
          placeholder="What felt off, or what you loved…"
          className="mt-3 rounded-xl border border-border bg-surface p-4 text-sm outline-none focus:border-brand/60"
        />

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onSubmit(rating, helpful, comments)}
          disabled={rating === 0 || submitting}
          className="mt-10 rounded-full bg-brand py-4 font-semibold text-background disabled:opacity-40"
        >
          {submitting ? "Sending…" : "Submit feedback"}
        </motion.button>
      </div>
    </div>
  );
}
