import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { COURSES } from "@/lib/courseData";
import { levelFromXp, xpProgressInLevel, getLevelTitle } from "@/lib/xp";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      lessonProgress: { where: { completed: true } },
      quizAttempts: true,
    },
  });

  if (!user) redirect("/login");

  const completedLessonIds = new Set(user.lessonProgress.map((p) => p.lessonId));
  const passedQuizIds = new Set(
    user.quizAttempts.filter((a) => a.passed).map((a) => a.quizId)
  );

  const level = levelFromXp(user.totalXP);
  const { current, needed, percent } = xpProgressInLevel(user.totalXP);
  const title = getLevelTitle(level);

  // Build per-course stats
  const courseStats = COURSES.map((course) => {
    const allLessons = course.sections.flatMap((s) => s.lessons);
    const done = allLessons.filter((l) => completedLessonIds.has(l.id)).length;
    const total = allLessons.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    // Find next lesson to continue
    let nextLesson: { lesson: typeof allLessons[0]; section: (typeof course.sections)[0] } | null = null;
    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        if (!completedLessonIds.has(lesson.id)) {
          nextLesson = { lesson, section };
          break;
        }
      }
      if (nextLesson) break;
    }

    const quizzesPassed = course.sections.filter((s) =>
      passedQuizIds.has(s.quiz.id)
    ).length;

    return { course, done, total, pct, nextLesson, quizzesPassed };
  });

  const totalLessons = COURSES.flatMap((c) => c.sections.flatMap((s) => s.lessons)).length;
  const totalDone = user.lessonProgress.length;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#fafafa]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1c1c2a] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#7c3aed] shadow-[0_0_12px_#7c3aed] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/leaderboard" className="text-[#71717a] hover:text-white text-sm transition-colors">Leaderboard</Link>
            <Link href="/profile" className="text-[#71717a] hover:text-white text-sm transition-colors">Profile</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto">

        {/* Welcome header */}
        <div className="mb-8">
          <p className="text-[#71717a] text-sm font-mono mb-1">// Dashboard</p>
          <h1 className="text-3xl font-black tracking-tight">
            Welcome back, <span className="text-[#a78bfa]">{user.name?.split(" ")[0] ?? "Learner"}</span>
          </h1>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total XP", value: user.totalXP.toLocaleString(), icon: "⚡", color: "text-[#a78bfa]" },
            { label: "Level", value: `${level} · ${title}`, icon: "🏅", color: "text-[#7c3aed]" },
            { label: "Lessons Done", value: `${totalDone} / ${totalLessons}`, icon: "📚", color: "text-emerald-400" },
            { label: "Quizzes Passed", value: user.quizAttempts.filter(a => a.passed).length, icon: "✅", color: "text-yellow-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#0d0d15] border border-[#1c1c2a] rounded-xl p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[#71717a] text-xs font-mono mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* XP progress bar */}
        <div className="bg-[#0d0d15] border border-[#1c1c2a] rounded-xl p-5 mb-8">
          <div className="flex justify-between mb-2 text-xs font-mono text-[#71717a]">
            <span>Level {level} → Level {level + 1}</span>
            <span>{current} / {needed} XP</span>
          </div>
          <div className="h-3 bg-[#0a0a0f] rounded-full border border-[#1c1c2a] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-[#3f3f50] text-xs font-mono mt-2">{percent}% to next level</div>
        </div>

        {/* Courses */}
        <h2 className="text-xl font-black mb-4">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {courseStats.map(({ course, done, total, pct, nextLesson, quizzesPassed }) => (
            <div
              key={course.id}
              className="bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl overflow-hidden hover:border-[#7c3aed]/30 transition-all"
            >
              {/* Color accent top bar */}
              <div className="h-1 w-full" style={{ background: course.color }} />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{course.icon}</span>
                  <div>
                    <h3 className="font-black text-lg leading-tight">{course.title}</h3>
                    <p className="text-[#71717a] text-xs">{course.sections.length} sections · {total} lessons</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#71717a]">{done} / {total} lessons</span>
                    <span style={{ color: course.color }}>{pct}%</span>
                  </div>
                  <div className="h-2 bg-[#0a0a0f] rounded-full border border-[#1c1c2a] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: course.color }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#71717a] font-mono mb-5">
                  <span>✅ {quizzesPassed}/{course.sections.length} quizzes passed</span>
                  <span style={{ color: course.color }}>+{course.totalXP} XP available</span>
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  {nextLesson ? (
                    <Link
                      href={`/learn/${course.slug}/${nextLesson.section.id}/${nextLesson.lesson.id}`}
                      className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold text-black transition-all hover:opacity-90"
                      style={{ background: course.color }}
                    >
                      {done === 0 ? "Start Course →" : "Continue →"}
                    </Link>
                  ) : (
                    <div className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/30">
                      ✓ Course Complete!
                    </div>
                  )}
                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-4 py-2.5 border border-[#1c1c2a] rounded-xl text-sm text-[#71717a] hover:border-[#7c3aed]/40 hover:text-white transition-colors"
                  >
                    Overview
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: "/leaderboard", icon: "🏆", title: "Leaderboard", desc: "See how you rank against other learners" },
            { href: "/profile", icon: "👤", title: "My Profile", desc: "View your badges, XP history, and stats" },
            { href: "/courses", icon: "📋", title: "All Courses", desc: "Browse course structure and syllabus" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-[#0d0d15] border border-[#1c1c2a] rounded-xl p-5 hover:border-[#7c3aed]/30 transition-all group"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="font-bold mb-1 group-hover:text-[#a78bfa] transition-colors">{item.title}</div>
              <div className="text-[#71717a] text-xs">{item.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
