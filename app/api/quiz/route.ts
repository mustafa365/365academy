import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { quizId, score, passed, xpEarned } = await req.json();
  if (passed) {
    await prisma.$transaction([
      prisma.user.update({ where: { id: session.user.id }, data: { totalXP: { increment: xpEarned } } }),
      prisma.xPLog.create({ data: { userId: session.user.id, amount: xpEarned, reason: `Passed quiz with ${Math.round(score)}%` } }),
    ]);
  }
  return NextResponse.json({ success: true });
}
