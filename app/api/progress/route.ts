import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { levelFromXp } from "@/lib/xp";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const lessonId = req.nextUrl.searchParams.get("lessonId");
  if (!lessonId) return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
  const progress = await prisma.lessonProgress.findUnique({ where: { userId_lessonId: { userId: session.user.id, lessonId } } });
  return NextResponse.json({ completed: progress?.completed ?? false });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { lessonId, xp } = await req.json();
  if (!lessonId) return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
  const existing = await prisma.lessonProgress.findUnique({ where: { userId_lessonId: { userId: session.user.id, lessonId } } });
  if (existing?.completed) return NextResponse.json({ alreadyCompleted: true });
  const xpReward = xp ?? 50;
  await prisma.$transaction([
    prisma.lessonProgress.upsert({ where: { userId_lessonId: { userId: session.user.id, lessonId } }, create: { userId: session.user.id, lessonId, completed: true, completedAt: new Date() }, update: { completed: true, completedAt: new Date() } }),
    prisma.user.update({ where: { id: session.user.id }, data: { totalXP: { increment: xpReward } } }),
    prisma.xPLog.create({ data: { userId: session.user.id, amount: xpReward, reason: "Completed lesson" } }),
  ]);
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user) {
    const newLevel = levelFromXp(user.totalXP);
    if (newLevel !== user.level) await prisma.user.update({ where: { id: user.id }, data: { level: newLevel } });
  }
  return NextResponse.json({ success: true, xpEarned: xpReward });
}
