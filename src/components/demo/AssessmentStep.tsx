"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Check, X } from "lucide-react";
import type { Step, CardOption } from "./steps";
import { useLang } from "@/lib/lang-context";
import { ts } from "@/lib/translations";
import { trStep } from "@/lib/step-translations";

export function CardOptions({
  options,
  value,
  onChange,
}: {
  options: CardOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  const { lang } = useLang();
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors ${
              selected
                ? "border-brand bg-brand/10"
                : "border-border bg-surface hover:border-brand/40"
            }`}
          >
            <span className="flex items-center gap-3 font-medium">
              <span className="text-xl">{opt.emoji}</span>
              {trStep(opt.label, lang)}
            </span>
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                selected ? "border-brand bg-brand" : "border-border"
              }`}
            >
              {selected && <Check size={12} className="text-background" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function CardGrid({
  options,
  value,
  onChange,
}: {
  options: CardOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  const { lang } = useLang();
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-center gap-2 rounded-2xl border px-2 py-4 text-center transition-colors ${
              selected
                ? "border-brand bg-brand/10"
                : "border-border bg-surface hover:border-brand/40"
            }`}
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="text-xs font-medium">{trStep(opt.label, lang)}</span>
          </button>
        );
      })}
    </div>
  );
}

function NumberStepper({
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const { lang } = useLang();
  return (
    <div className="flex flex-col items-center gap-8">
      <p className="font-display text-6xl font-extrabold">
        {value}
        <span className="ml-1 text-2xl text-muted">{unit}</span>
      </p>
      <div className="flex items-center gap-6">
        <button
          aria-label={ts(lang, "ariaDecrease")}
          onClick={() => onChange(Math.max(min, value - step))}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-surface hover:bg-surface-2"
        >
          <Minus size={18} />
        </button>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-40 accent-[#ff6a1a]"
        />
        <button
          aria-label={ts(lang, "ariaIncrease")}
          onClick={() => onChange(Math.min(max, value + step))}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-background hover:bg-brand-light"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}

function FitnessSlider({ value, labels, onChange }: { value: number; labels: string[]; onChange: (v: number) => void }) {
  const { lang } = useLang();
  return (
    <div className="flex flex-col items-center gap-10">
      <p className="font-display text-6xl font-extrabold text-brand">{value}</p>
      <p className="font-display text-lg font-bold">{trStep(labels[value - 1], lang)}</p>
      <input
        type="range"
        min={1}
        max={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#ff6a1a]"
      />
      <div className="flex w-full justify-between text-xs text-muted">
        <span>{trStep(labels[0], lang)}</span>
        <span>{trStep(labels[labels.length - 1], lang)}</span>
      </div>
    </div>
  );
}

function ChipMultiSelect({
  suggestions,
  value,
  onChange,
}: {
  suggestions: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const { lang } = useLang();
  const [custom, setCustom] = useState("");

  function toggle(tag: string) {
    onChange(value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag]);
  }

  function addCustom() {
    const tag = custom.trim();
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setCustom("");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((tag) => {
          const selected = value.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selected
                  ? "border-brand bg-brand text-background"
                  : "border-border bg-surface hover:border-brand/40"
              }`}
            >
              {trStep(tag, lang)}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCustom()}
          placeholder={ts(lang, "stepAddPlaceholder")}
          className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-brand/60"
        />
        <button
          onClick={addCustom}
          className="rounded-xl border border-border px-4 text-sm font-medium hover:border-brand/40"
        >
          {ts(lang, "stepAddButton")}
        </button>
      </div>

      {value.filter((v) => !suggestions.includes(v)).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value
            .filter((v) => !suggestions.includes(v))
            .map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-brand/15 px-3 py-1.5 text-sm text-brand"
              >
                {tag}
                <button onClick={() => toggle(tag)} aria-label={`${ts(lang, "ariaRemove")} ${tag}`}>
                  <X size={12} />
                </button>
              </span>
            ))}
        </div>
      )}

      <button onClick={() => onChange([])} className="self-start text-xs text-muted hover:text-foreground">
        {ts(lang, "stepNoneApply")}
      </button>
    </div>
  );
}

export default function AssessmentStep({
  step,
  value,
  onChange,
}: {
  step: Step;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (v: any) => void;
}) {
  const { lang } = useLang();
  switch (step.kind) {
    case "cards":
      return step.options.length > 5 ? (
        <CardGrid options={step.options} value={value} onChange={onChange} />
      ) : (
        <CardOptions options={step.options} value={value} onChange={onChange} />
      );
    case "number":
      return (
        <NumberStepper
          value={value}
          min={step.min}
          max={step.max}
          step={step.step}
          unit={step.unit}
          onChange={onChange}
        />
      );
    case "slider":
      return <FitnessSlider value={value} labels={step.labels} onChange={onChange} />;
    case "chips":
      return <ChipMultiSelect suggestions={step.suggestions} value={value ?? []} onChange={onChange} />;
    default:
      return (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted">
          {ts(lang, "stepUnsupported")}
        </motion.p>
      );
  }
}
