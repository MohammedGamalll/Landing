"use client";

import { Mail } from "lucide-react";
import StepShell from "./StepShell";
import ContinueButton from "./ContinueButton";

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
  return (
    <StepShell
      stepKey="verify"
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      title="Check your email"
      footer={
        <ContinueButton onClick={onContinue} loading={loading} label="I've verified — continue" />
      }
    >
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-brand">
          <Mail size={26} />
        </span>
        <p className="text-sm text-muted">
          We sent a verification link to <span className="text-foreground">{email}</span>. Click
          it, then come back here to continue.
        </p>
        <button
          onClick={onResend}
          disabled={resending}
          className="text-sm font-semibold text-brand hover:underline disabled:opacity-50"
        >
          {resending ? "Sending…" : "Resend verification email"}
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </StepShell>
  );
}
