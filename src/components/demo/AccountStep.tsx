"use client";

import { useState } from "react";
import StepShell from "./StepShell";
import ContinueButton from "./ContinueButton";
import { useLang } from "@/lib/lang-context";
import { ts } from "@/lib/translations";

export default function AccountStep({
  stepNumber,
  totalSteps,
  onSubmit,
  onLogin,
  loading,
  error,
}: {
  stepNumber: number;
  totalSteps: number;
  onSubmit: (name: string, email: string, password: string) => void;
  onLogin: (email: string, password: string) => void;
  loading: boolean;
  error: string | null;
}) {
  const { lang } = useLang();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupValid = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email) && password.length >= 6;
  const loginValid = /\S+@\S+\.\S+/.test(email) && password.length >= 6;
  const valid = mode === "signup" ? signupValid : loginValid;

  return (
    <StepShell
      stepKey="account"
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      title={mode === "signup" ? ts(lang, "accountTitle") : ts(lang, "accountLoginTitle")}
      footer={
        <ContinueButton
          onClick={() =>
            mode === "signup"
              ? onSubmit(name, email, password)
              : onLogin(email, password)
          }
          disabled={!valid}
          loading={loading}
          label={mode === "signup" ? ts(lang, "accountCreate") : ts(lang, "accountLogin")}
        />
      }
    >
      <p className="text-sm text-muted">
        {mode === "signup" ? ts(lang, "accountSub") : ts(lang, "accountLoginSub")}
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {mode === "signup" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={ts(lang, "accountName")}
            className="rounded-xl border border-border bg-surface px-4 py-3.5 outline-none focus:border-brand/60"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={ts(lang, "accountEmail")}
          className="rounded-xl border border-border bg-surface px-4 py-3.5 outline-none focus:border-brand/60"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder={ts(lang, "accountPassword")}
          className="rounded-xl border border-border bg-surface px-4 py-3.5 outline-none focus:border-brand/60"
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <p className="mt-6 text-center text-sm text-muted">
        {mode === "signup" ? (
          <>
            {ts(lang, "accountHaveAccount")}{" "}
            <button onClick={() => setMode("login")} className="font-semibold text-brand hover:underline">
              {ts(lang, "accountLogin")}
            </button>
          </>
        ) : (
          <>
            {ts(lang, "accountNoAccount")}{" "}
            <button onClick={() => setMode("signup")} className="font-semibold text-brand hover:underline">
              {ts(lang, "accountSignUp")}
            </button>
          </>
        )}
      </p>
    </StepShell>
  );
}
