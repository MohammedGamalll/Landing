"use client";

import { Mail } from "lucide-react";
import StepShell from "./StepShell";
import ContinueButton from "./ContinueButton";
import { useLang } from "@/lib/lang-context";
import { ts } from "@/lib/translations";

export default function VerifyStep({
  stepNumber,
  totalSteps,
  email,
  onContinue,
  onResend,
  loading,
  resending,
  error,
}: {
  stepNumber: number;
  totalSteps: number;
  email: string;
  onContinue: () => void;
  onResend: () => void;
  loading: boolean;
  resending: boolean;
  error: string | null;
}) {
  const { lang } = useLang();
  return (
    <StepShell
      stepKey="verify"
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      title={ts(lang, "verifyTitle")}
      footer={
        <ContinueButton onClick={onContinue} loading={loading} label={ts(lang, "verifyContinue")} />
      }
    >
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-brand">
          <Mail size={26} />
        </span>
        <p className="text-sm text-muted">
          {ts(lang, "verifyEmailPrefix")} <span className="text-foreground">{email}</span>.{" "}
          {ts(lang, "verifyEmailSuffix")}
        </p>
        <button
          onClick={onResend}
          disabled={resending}
          className="text-sm font-semibold text-brand hover:underline disabled:opacity-50"
        >
          {resending ? ts(lang, "verifySending") : ts(lang, "verifyResend")}
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </StepShell>
  );
}
