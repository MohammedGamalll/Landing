import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, rating, comments, foundPlanHelpful, assessmentAnswers, generatedPlanSummary } =
    body ?? {};

  if (typeof rating !== "number" || rating < 1 || rating > 5 || !assessmentAnswers) {
    return NextResponse.json(
      { error: "rating (1-5) and assessmentAnswers are required" },
      { status: 400 }
    );
  }

  const feedback = await prisma.feedback.create({
    data: {
      email: email || null,
      rating,
      comments: comments || null,
      foundPlanHelpful: typeof foundPlanHelpful === "boolean" ? foundPlanHelpful : null,
      assessmentAnswers,
      generatedPlanSummary: generatedPlanSummary ?? undefined,
    },
  });

  return NextResponse.json({ id: feedback.id }, { status: 201 });
}
