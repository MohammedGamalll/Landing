-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "rating" INTEGER NOT NULL,
    "comments" TEXT,
    "foundPlanHelpful" BOOLEAN,
    "assessmentAnswers" JSONB NOT NULL,
    "generatedPlanSummary" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
