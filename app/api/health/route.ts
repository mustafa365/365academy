import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const results: Record<string, string> = {};

  // Test DB connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    results.db = "ok";
  } catch (e) {
    results.db = "ERROR: " + (e instanceof Error ? e.message : String(e));
  }

  // Test User table
  try {
    const count = await prisma.user.count();
    results.users = `ok (${count} users)`;
  } catch (e) {
    results.users = "ERROR: " + (e instanceof Error ? e.message : String(e));
  }

  // Test QuizAttempt table (timeSpent issue)
  try {
    const count = await prisma.quizAttempt.count();
    results.quizAttempts = `ok (${count} rows)`;
  } catch (e) {
    results.quizAttempts = "ERROR: " + (e instanceof Error ? e.message : String(e));
  }

  // Test LessonProgress table
  try {
    const count = await prisma.lessonProgress.count();
    results.lessonProgress = `ok (${count} rows)`;
  } catch (e) {
    results.lessonProgress = "ERROR: " + (e instanceof Error ? e.message : String(e));
  }

  return NextResponse.json(results);
}
