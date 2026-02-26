import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { quizId, score, passed, xpEarned } = await req.json();
  if (!quizId) return NextResponse.json({ error: "Missing quizId" }, { status: 400 });

  const xp = xpEarned ?? (passed ? 200 : 50);

  await prisma.$transaction([
    prisma.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId,
        score,
        passed,
        xpEarned: xp,
      },
    }),
    prisma.user.update({
      where: { id: session.user.id },
      data: { totalXP: { increment: xp } },
    }),
    prisma.xPLog.create({
      data: {
        userId: session.user.id,
        amount: xp,
        reason: `${passed ? "Passed" : "Attempted"} quiz with ${Math.round(score)}%`,
      },
    }),
  ]);

  return NextResponse.json({ success: true, xpEarned: xp });
}
