"use client";

import { ReactNode } from "react";
import { LangProvider } from "@/lib/lang-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      {children}
    </LangProvider>
  );
}
