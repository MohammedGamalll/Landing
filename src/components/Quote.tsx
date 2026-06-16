import Reveal from "./Reveal";
import { Quote as QuoteIcon } from "lucide-react";

export default function Quote() {
  return (
    <section id="testimonials" className="relative mx-auto max-w-3xl px-6 py-24 text-center">
      <Reveal>
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-background">
          <QuoteIcon size={22} />
        </div>
        <p className="font-display text-2xl font-bold leading-snug sm:text-3xl">
          &ldquo;Physical fitness can neither be acquired by wishful thinking
          nor by outright purchase.&rdquo;
        </p>
        <p className="mt-5 text-sm uppercase tracking-wide text-muted">— Joseph Pilates</p>
      </Reveal>
    </section>
  );
}
