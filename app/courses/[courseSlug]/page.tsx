import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCourse } from "@/lib/courseData";
import Link from "next/link";

export default async function CourseDetailPage({
  params,
}: {
  params: { courseSlug: string };
}) {
  const session = await auth();

  const course = getCourse(params.courseSlug);
  if (!course) notFound();

  let completedLessonIds = new Set<string>();
  let passedQuizIds = new Set<string>();

  if (session?.user?.id) {
    const progress = await prisma.lessonProgress.findMany({
      where: { userId: session.user.id },
    });

    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { userId: session.user.id },
    });

    completedLessonIds = new Set(
      progress.filter((p) => p.completed).map((p) => p.lessonId)
    );

    passedQuizIds = new Set(
      quizAttempts.filter((a) => a.passed).map((a) => a.quizId)
    );
  }

  function isSectionUnlocked(_sectionIndex: number): boolean {
    return true; // temporarily unlocked
  }

  const totalLessons = course.sections.flatMap((s) => s.lessons).length;
  const completedCount = course.sections.flatMap((s) => s.lessons).filter((l) => completedLessonIds.has(l.id)).length;
  const pct = Math.round((completedCount / totalLessons) * 100);

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
            <Link href="/dashboard" className="text-[#71717a] hover:text-white text-sm transition-colors">Dashboard</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{course.icon}</span>
            <div>
              <div className="text-[#71717a] text-xs font-mono mb-1">// Course</div>
              <h1 className="text-3xl font-black tracking-tight">{course.title}</h1>
              <p className="text-[#71717a] mt-1">{course.description}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-[#0d0d15] border border-[#1c1c2a] rounded-xl p-5 mt-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-mono text-[#71717a]">Your Progress</span>
              <span className="font-mono font-bold" style={{ color: course.color }}>{pct}%</span>
            </div>
            <div className="h-3 bg-[#0a0a0f] rounded-full border border-[#1c1c2a] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${pct}%`, background: course.color }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#71717a] font-mono">
              <span>{completedCount} lessons done</span>
              <span>{totalLessons} total · {course.totalXP} XP available</span>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {course.sections.map((section, si) => {
            const unlocked = isSectionUnlocked(si);
            const sectionLessons = section.lessons;
            const sectionDone = sectionLessons.filter((l) => completedLessonIds.has(l.id)).length;
            const quizPassed = passedQuizIds.has(section.quiz.id);

            return (
              <div
                key={section.id}
                className={`bg-[#0d0d15] border rounded-2xl overflow-hidden transition-all ${unlocked ? "border-[#1c1c2a]" : "border-[#1c1c2a] opacity-60"}`}
              >
                {/* Section header */}
                <div className="p-6 flex items-center justify-between border-b border-[#1c1c2a]">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                      style={{
                        background: unlocked ? `${course.color}20` : "#1c1c2a",
                        border: `1px solid ${unlocked ? course.color + "40" : "#1c1c2a"}`,
                        color: unlocked ? course.color : "#71717a",
                      }}
                    >
                      {unlocked ? si + 1 : "🔒"}
                    </div>
                    <div>
                      <h2 className="font-black text-lg">{section.title}</h2>
                      <p className="text-[#71717a] text-sm">{section.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-[#71717a]">{sectionDone}/{sectionLessons.length} done</div>
                    {quizPassed && <div className="text-xs text-emerald-400 font-mono mt-1">✓ Quiz passed</div>}
                  </div>
                </div>

                {/* Lessons */}
                {unlocked && (
                  <div className="divide-y divide-[#1c1c2a]">
                    {section.lessons.map((lesson, li) => {
                      const done = completedLessonIds.has(lesson.id);
                      return (
                        <Link
                          key={lesson.id}
                          href={`/learn/${course.slug}/${section.id}/${lesson.id}`}
                          className="flex items-center gap-4 px-6 py-4 hover:bg-[#0a0a0f] transition-colors group"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${done ? "bg-emerald-400/10 border border-emerald-400/30 text-emerald-400" : "bg-[#0a0a0f] border border-[#1c1c2a] text-[#71717a]"}`}
                          >
                            {done ? "✓" : li + 1}
                          </div>
                          <div className="flex-1">
                            <div className={`font-semibold text-sm group-hover:text-[#a78bfa] transition-colors ${done ? "text-[#b8c5d6]" : ""}`}>
                              {lesson.title}
                            </div>
                            <div className="text-[#71717a] text-xs">{lesson.description}</div>
                          </div>
                          <div className="flex items-center gap-3 text-xs font-mono text-[#71717a]">
                            <span>{lesson.duration}</span>
                            <span style={{ color: course.color }}>+{lesson.xp} XP</span>
                          </div>
                        </Link>
                      );
                    })}

                    {/* Quiz button */}
                    <div className="px-6 py-4 bg-[#0a0a0f]/50">
                      {sectionDone === sectionLessons.length ? (
                        <Link
                          href={`/quiz/${section.quiz.id}?course=${course.slug}&section=${section.id}`}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${quizPassed ? "bg-emerald-400/10 border border-emerald-400/30 text-emerald-400" : "bg-[#7c3aed] text-white hover:bg-[#6d28d9]"}`}
                        >
                          {quizPassed ? "✓ Quiz Complete — Retake?" : "🎯 Take Section Quiz"}
                        </Link>
                      ) : (
                        <div className="text-[#71717a] text-xs font-mono">
                          Complete all lessons to unlock the quiz
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!unlocked && (
                  <div className="px-6 py-8 text-center">
                    <div className="text-4xl mb-2">🔒</div>
                    <p className="text-[#71717a] text-sm">
                      Pass the <span className="text-white font-medium">&quot;{course.sections[si - 1]?.title}&quot;</span> quiz to unlock this section
                    </p>
                    <p className="text-[#3f3f50] text-xs mt-1">Minimum 70% required</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
