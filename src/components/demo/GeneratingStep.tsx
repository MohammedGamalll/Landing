"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const messages = [
  "Reading your assessment…",
  "Checking your limitations and goals…",
  "Drafting your workout split…",
  "Balancing your macros…",
  "Running a safety pass…",
  "Double-checking exercise substitutions…",
  "Cross-referencing your injuries against the plan…",
  "Fine-tuning portion sizes…",
  "Almost there…",
];

export default function GeneratingStep({ error, onRetry }: { error: string | null; onRetry: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (error) return;
    const messageInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 6000);
    const clock = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => {
      clearInterval(messageInterval);
      clearInterval(clock);
    };
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      {error ? (
        <div className="flex max-w-sm flex-col items-center gap-5">
          <p className="font-display text-xl font-bold text-red-400">Something went wrong</p>
          <p className="text-sm text-muted">{error}</p>
          <button
            onClick={onRetry}
            className="rounded-full bg-brand px-6 py-3 font-semibold text-background"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <Loader2 size={36} className="animate-spin text-brand" />
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display mt-6 text-lg font-semibold"
          >
            {messages[messageIndex]}
          </motion.p>
          <p className="mt-2 text-sm text-muted">{elapsed}s elapsed</p>
          {elapsed > 45 && (
            <p className="mt-6 max-w-xs text-xs text-muted">
              Plans that account for injuries or limitations go through extra AI
              safety checks — this can take a few minutes. Hang tight, it&apos;s
              still working.
            </p>
          )}
        </>
      )}
    </div>
  );
}
