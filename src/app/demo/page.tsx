"use client";

import { useState } from "react";
import {
  ApiError,
  buildNutritionGenerationPayload,
  buildProfilePayload,
  buildWorkoutGenerationPayload,
  createProfile,
  FullNutritionPlan,
  FullWorkoutPlan,
  generateNutrition,
  generateWorkout,
  getMe,
  login,
  resendVerification,
  saveNutrition,
  saveWorkout,
  signup,
} from "@/lib/api";
import { PlanPreferences, ProfileAnswers } from "@/lib/types";
import { profileSteps, planSteps, Step } from "@/components/demo/steps";
import StepShell from "@/components/demo/StepShell";
import ContinueButton from "@/components/demo/ContinueButton";
import AssessmentStep from "@/components/demo/AssessmentStep";
import TrainingSetupStep from "@/components/demo/TrainingSetupStep";
import AccountStep from "@/components/demo/AccountStep";
import VerifyStep from "@/components/demo/VerifyStep";
import GeneratingStep from "@/components/demo/GeneratingStep";
import ProfileReadyStep from "@/components/demo/ProfileReadyStep";
import PlanTypeChoiceStep from "@/components/demo/PlanTypeChoiceStep";
import ResultsStep from "@/components/demo/ResultsStep";
import FeedbackStep from "@/components/demo/FeedbackStep";

type Phase =
  | "profile"
  | "account"
  | "verify"
  | "creatingProfile"
  | "profileReady"
  | "planTypeChoice"
  | "planPrefs"
  | "generatingPlans"
  | "results"
  | "feedback";

type PlanTypeChoice = "workout" | "nutrition" | "both" | "";

const defaultProfileAnswers: Partial<ProfileAnswers> = {
  weightKg: 70,
  heightCm: 170,
  age: 25,
  fitnessLevel: 3,
  physicalLimitations: [],
  allergies: [],
  supplements: [],
};

const defaultPlanAnswers: Partial<PlanPreferences> = {
  durationWeeks: 4,
  daysPerWeek: 3,
  sessionDurationMinutes: 45,
  mealsPerDay: 4,
  excludeIngredients: [],
};

const PROFILE_TOTAL_STEPS = profileSteps.length + 1; // +1 for account creation
const PLAN_TOTAL_STEPS = planSteps.length + 1; // +1 for the workout/nutrition/both choice

function nextValidIndex(steps: Step[], from: number, dir: 1 | -1, answers: Record<string, unknown>) {
  let i = from + dir;
  while (i >= 0 && i < steps.length && steps[i].skipIf?.(answers)) i += dir;
  return i;
}

export default function DemoPage() {
  const [phase, setPhase] = useState<Phase>("account");

  const [profileIndex, setProfileIndex] = useState(0);
  const [profileAnswers, setProfileAnswers] = useState<Partial<ProfileAnswers>>(defaultProfileAnswers);

  const [planTypeChoice, setPlanTypeChoice] = useState<PlanTypeChoice>("");
  const [planIndex, setPlanIndex] = useState(0);
  const [planAnswers, setPlanAnswers] = useState<Partial<PlanPreferences>>(defaultPlanAnswers);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);

  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [genError, setGenError] = useState<string | null>(null);

  const [workoutFull, setWorkoutFull] = useState<FullWorkoutPlan | null>(null);
  const [nutritionFull, setNutritionFull] = useState<FullNutritionPlan | null>(null);

  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const currentProfileStep = profileSteps[profileIndex];
  const currentPlanStep = planSteps[planIndex];

  function setProfileAnswer<K extends keyof ProfileAnswers>(key: K, value: ProfileAnswers[K]) {
    setProfileAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function setPlanAnswer<K extends keyof PlanPreferences>(key: K, value: PlanPreferences[K]) {
    setPlanAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function isProfileStepValid(): boolean {
    const value = (profileAnswers as Record<string, unknown>)[currentProfileStep.key];
    if (currentProfileStep.kind === "cards") return typeof value === "string" && value.length > 0;
    return true;
  }

  function isPlanStepValid(): boolean {
    if (currentPlanStep.kind === "training-setup") {
      return Boolean(planAnswers.workoutLocation && planAnswers.equipmentAvailability);
    }
    const value = (planAnswers as Record<string, unknown>)[currentPlanStep.key];
    if (currentPlanStep.kind === "cards") return typeof value === "string" && value.length > 0;
    return true;
  }

  function goProfileNext() {
    const next = nextValidIndex(profileSteps, profileIndex, 1, profileAnswers as Record<string, unknown>);
    if (next < profileSteps.length) setProfileIndex(next);
    else if (token) runProfileCreation(token);
  }

  function goProfileBack() {
    const prev = nextValidIndex(profileSteps, profileIndex, -1, profileAnswers as Record<string, unknown>);
    if (prev >= 0) setProfileIndex(prev);
  }

  function goPlanNext() {
    const next = nextValidIndex(planSteps, planIndex, 1, planAnswers as Record<string, unknown>);
    if (next < planSteps.length) setPlanIndex(next);
    else runPlanGeneration();
  }

  function goPlanBack() {
    const prev = nextValidIndex(planSteps, planIndex, -1, planAnswers as Record<string, unknown>);
    if (prev >= 0) setPlanIndex(prev);
  }

  async function runProfileCreation(userToken: string) {
    setProfileError(null);
    setPhase("creatingProfile");
    try {
      const me = await getMe(userToken);
      await createProfile(userToken, buildProfilePayload(profileAnswers as ProfileAnswers, me.id));
      setPhase("profileReady");
    } catch (err) {
      setProfileError(
        err instanceof ApiError ? err.message : "Couldn't create your profile. Please try again."
      );
    }
  }

  async function runPlanGeneration() {
    if (!token) return;
    setGenError(null);
    setPhase("generatingPlans");
    try {
      const prefs = planAnswers as PlanPreferences;

      const [workoutDraft, nutritionDraft] = await Promise.all([
        prefs.wantsWorkout ? generateWorkout(token, buildWorkoutGenerationPayload(prefs)) : null,
        prefs.wantsNutrition ? generateNutrition(token, buildNutritionGenerationPayload(prefs)) : null,
      ]);

      const [savedWorkout, savedNutrition] = await Promise.all([
        workoutDraft ? saveWorkout(token, workoutDraft) : null,
        nutritionDraft ? saveNutrition(token, nutritionDraft) : null,
      ]);

      setWorkoutFull(savedWorkout);
      setNutritionFull(savedNutrition);
      setPhase("results");
    } catch (err) {
      setGenError(
        err instanceof ApiError ? err.message : "Couldn't generate your plan. Please try again."
      );
    }
  }

  function handlePlanTypeContinue() {
    if (!planTypeChoice) return;
    setPlanAnswers((prev) => ({
      ...prev,
      wantsWorkout: planTypeChoice === "workout" || planTypeChoice === "both",
      wantsNutrition: planTypeChoice === "nutrition" || planTypeChoice === "both",
    }));
    setPlanIndex(0);
    setPhase("planPrefs");
  }

  async function handleAccountSubmit(name: string, emailInput: string, passwordInput: string) {
    setAccountLoading(true);
    setAccountError(null);
    try {
      await signup(name, emailInput, passwordInput);
      setEmail(emailInput);
      setPassword(passwordInput);
      setPhase("verify");
    } catch (err) {
      setAccountError(
        err instanceof ApiError ? err.message : "Couldn't create your account. Please try again."
      );
    } finally {
      setAccountLoading(false);
    }
  }

  async function handleVerifyContinue() {
    setVerifyLoading(true);
    setVerifyError(null);
    try {
      const { token: newToken } = await login(email, password);
      setToken(newToken);
      setPhase("profile");
    } catch {
      setVerifyError("Your email isn't verified yet. Check your inbox, then try again.");
    } finally {
      setVerifyLoading(false);
    }
  }

  async function handleResend() {
    setResending(true);
    try {
      await resendVerification(email);
    } finally {
      setResending(false);
    }
  }

  async function handleFeedbackSubmit(
    rating: number,
    foundPlanHelpful: boolean | null,
    comments: string
  ) {
    setFeedbackSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          rating,
          comments,
          foundPlanHelpful,
          assessmentAnswers: { profile: profileAnswers, planPreferences: planAnswers },
          generatedPlanSummary: {
            workout: workoutFull
              ? { planName: workoutFull.plan_name, dayCount: workoutFull.workout_days.length }
              : null,
            nutrition: nutritionFull
              ? { planName: nutritionFull.plan_name, dailyCalories: nutritionFull.daily_calories }
              : null,
          },
        }),
      });
      setFeedbackSubmitted(true);
    } finally {
      setFeedbackSubmitting(false);
    }
  }

  if (phase === "account") {
    return (
      <AccountStep
        stepNumber={1}
        totalSteps={PROFILE_TOTAL_STEPS}
        onSubmit={handleAccountSubmit}
        loading={accountLoading}
        error={accountError}
      />
    );
  }

  if (phase === "verify") {
    return (
      <VerifyStep
        stepNumber={1}
        totalSteps={PROFILE_TOTAL_STEPS}
        email={email}
        onContinue={handleVerifyContinue}
        onResend={handleResend}
        loading={verifyLoading}
        resending={resending}
        error={verifyError}
      />
    );
  }

  if (phase === "creatingProfile") {
    return (
      <GeneratingStep
        error={profileError}
        onRetry={() => token && runProfileCreation(token)}
      />
    );
  }

  if (phase === "profileReady") {
    return <ProfileReadyStep onGeneratePlan={() => setPhase("planTypeChoice")} />;
  }

  if (phase === "planTypeChoice") {
    return (
      <StepShell
        stepKey="planType"
        stepNumber={1}
        totalSteps={PLAN_TOTAL_STEPS}
        title="What would you like generated?"
        footer={<ContinueButton onClick={handlePlanTypeContinue} disabled={!planTypeChoice} />}
      >
        <PlanTypeChoiceStep value={planTypeChoice} onChange={setPlanTypeChoice} />
      </StepShell>
    );
  }

  if (phase === "generatingPlans") {
    return <GeneratingStep error={genError} onRetry={runPlanGeneration} />;
  }

  if (phase === "results") {
    return (
      <ResultsStep
        workout={workoutFull}
        nutrition={nutritionFull}
        onContinue={() => setPhase("feedback")}
      />
    );
  }

  if (phase === "feedback") {
    return (
      <FeedbackStep
        onSubmit={handleFeedbackSubmit}
        submitting={feedbackSubmitting}
        submitted={feedbackSubmitted}
      />
    );
  }

  if (phase === "planPrefs") {
    return (
      <StepShell
        stepKey={currentPlanStep.key}
        stepNumber={planIndex + 2}
        totalSteps={PLAN_TOTAL_STEPS}
        title={currentPlanStep.title}
        onBack={planIndex > 0 ? goPlanBack : () => setPhase("planTypeChoice")}
        footer={<ContinueButton onClick={goPlanNext} disabled={!isPlanStepValid()} />}
      >
        {currentPlanStep.kind === "training-setup" ? (
          <TrainingSetupStep
            location={planAnswers.workoutLocation ?? ""}
            equipment={planAnswers.equipmentAvailability ?? ""}
            onLocationChange={(v) => setPlanAnswer("workoutLocation", v as PlanPreferences["workoutLocation"])}
            onEquipmentChange={(v) =>
              setPlanAnswer("equipmentAvailability", v as PlanPreferences["equipmentAvailability"])
            }
          />
        ) : (
          <AssessmentStep
            step={currentPlanStep}
            value={(planAnswers as Record<string, unknown>)[currentPlanStep.key]}
            onChange={(v) => setPlanAnswer(currentPlanStep.key as keyof PlanPreferences, v)}
          />
        )}
      </StepShell>
    );
  }

  return (
    <StepShell
      stepKey={currentProfileStep.key}
      stepNumber={profileIndex + 2}
      totalSteps={PROFILE_TOTAL_STEPS}
      title={currentProfileStep.title}
      onBack={profileIndex > 0 ? goProfileBack : undefined}
      footer={<ContinueButton onClick={goProfileNext} disabled={!isProfileStepValid()} />}
    >
      <AssessmentStep
        step={currentProfileStep}
        value={(profileAnswers as Record<string, unknown>)[currentProfileStep.key]}
        onChange={(v) => setProfileAnswer(currentProfileStep.key as keyof ProfileAnswers, v)}
      />
    </StepShell>
  );
}
