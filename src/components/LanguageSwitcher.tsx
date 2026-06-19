"use client";

import { Globe } from "lucide-react";
import { useLang } from "@/lib/lang-context";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-colors hover:border-brand/40"
      aria-label="Switch language"
    >
      <Globe size={14} className="text-brand" />
      {lang === "en" ? "العربية" : "English"}
    </button>
  );
}
