import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

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

  // Test auth()
  try {
    const session = await auth();
    results.auth = session ? `ok (user: ${session.user?.email})` : "ok (no session)";
  } catch (e) {
    results.auth = "ERROR: " + (e instanceof Error ? e.message : String(e));
  }

  // Check env vars (without exposing values)
  results.AUTH_SECRET = process.env.AUTH_SECRET ? "set" : "MISSING";
  results.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ? "set" : "MISSING";
  results.NEXTAUTH_URL = process.env.NEXTAUTH_URL ?? "MISSING";

  return NextResponse.json(results);
}
