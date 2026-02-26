import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const results: Record<string, string> = {};

  // Test DB connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    results.db = "ok";
  } catch (e: any) {
    results.db = "ERROR: " + e.message;
  }

  // Test User table
  try {
    const count = await prisma.user.count();
    results.users = `ok (${count} users)`;
  } catch (e: any) {
    results.users = "ERROR: " + e.message;
  }

  // Test QuizAttempt table (timeSpent issue)
  try {
    const count = await prisma.quizAttempt.count();
    results.quizAttempts = `ok (${count} rows)`;
  } catch (e: any) {
    results.quizAttempts = "ERROR: " + e.message;
  }

  // Test LessonProgress table
  try {
    const count = await prisma.lessonProgress.count();
    results.lessonProgress = `ok (${count} rows)`;
  } catch (e: any) {
    results.lessonProgress = "ERROR: " + e.message;
  }

  return NextResponse.json(results);
}
