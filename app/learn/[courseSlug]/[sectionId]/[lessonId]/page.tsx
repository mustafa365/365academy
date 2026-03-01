"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getCourse, getLesson } from "@/lib/courseData";
import { EXERCISES } from "@/lib/sqlExercises";
import dynamic from "next/dynamic";

const SqlEditor = dynamic(() => import("@/components/SqlEditor"), { ssr: false });

// ─── Course Timer ──────────────────────────────────────────────────────────────

function CourseTimer({ courseSlug }: { courseSlug: string }) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const key = `course_start_${courseSlug}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, Date.now().toString());
    }

    const update = () => {
      const start = parseInt(localStorage.getItem(key) || "0");
      const diff = Date.now() - start;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      if (hours > 0) {
        setElapsed(`${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setElapsed(`${minutes}m ${seconds}s`);
      } else {
        setElapsed(`${seconds}s`);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [courseSlug]);

  if (!elapsed) return null;

  return (
    <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#3f3f50]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-pulse inline-block" />
      {elapsed} in course
    </div>
  );
}

// ─── Markdown renderer ────────────────────────────────────────────────────────

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-[#0a0a0f] border border-[#1c1c2a] text-[#a78bfa] px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trimStart().startsWith("```")) {
      const lang = line.trim().replace(/^```/, "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={`code-${i}`} className="my-5">
          {lang && (
            <div className="flex items-center gap-2 bg-[#0a1219] border border-[#1c1c2a] border-b-0 rounded-t-xl px-4 py-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[#3f3f50] text-xs font-mono ml-1">{lang}</span>
            </div>
          )}
          <pre
            className={`bg-[#060a0e] border border-[#1c1c2a] ${
              lang ? "rounded-b-xl rounded-tr-xl" : "rounded-xl"
            } p-5 overflow-x-auto`}
          >
            <code className="text-[#a8d8ea] font-mono text-sm leading-relaxed whitespace-pre">
              {codeLines.join("\n")}
            </code>
          </pre>
        </div>
      );
      continue;
    }

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-2xl font-black text-white mt-8 mb-3 first:mt-0">
          {line.slice(2)}
        </h1>
      );
      i++;
      continue;
    }
    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-[#fafafa] mt-6 mb-2 border-b border-[#1c1c2a] pb-2">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }
    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-base font-bold text-[#a78bfa] mt-4 mb-1">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---" || line.trim() === "***") {
      elements.push(<hr key={i} className="border-[#1c1c2a] my-5" />);
      i++;
      continue;
    }

    // Markdown table
    if (line.includes("|") && lines[i + 1]?.includes("---")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0]
        .split("|")
        .map((h) => h.trim())
        .filter(Boolean);
      const rows = tableLines.slice(2).map((row) =>
        row
          .split("|")
          .map((c) => c.trim())
          .filter(Boolean)
      );
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#1c1c2a]">
                {headers.map((h, hi) => (
                  <th
                    key={hi}
                    className="text-left py-2 px-3 text-[#a78bfa] font-mono text-xs uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-[#1c1c2a]/50 hover:bg-[#0a0a0f]/50 transition-colors"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="py-2 px-3 text-[#b8c5d6]"
                      dangerouslySetInnerHTML={{ __html: renderInline(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Bullet list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("- ") || lines[i].startsWith("* "))
      ) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-3 space-y-1.5">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-2.5 text-sm text-[#b8c5d6]">
              <span className="text-[#a78bfa] mt-0.5 flex-shrink-0 font-bold">•</span>
              <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-3 space-y-1.5">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-2.5 text-sm text-[#b8c5d6]">
              <span className="text-[#7c3aed] font-mono font-bold flex-shrink-0 min-w-[1.2rem]">
                {li + 1}.
              </span>
              <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-[#7c3aed]/50 pl-4 my-3 italic text-[#71717a] text-sm"
        >
          {line.slice(2)}
        </blockquote>
      );
      i++;
      continue;
    }

    // Empty line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p
        key={i}
        className="text-sm text-[#b8c5d6] leading-relaxed my-2"
        dangerouslySetInnerHTML={{ __html: renderInline(line) }}
      />
    );
    i++;
  }

  return <div className="space-y-1">{elements}</div>;
}

// ─── Page Component ───────────────────────────────────────────────────────────

type Tab = "learn" | "practice" | "realworld";

export default function LessonPage({
  params,
}: {
  params: { courseSlug: string; sectionId: string; lessonId: string };
}) {
  const { data: session, status } = useSession();
  const [completed, setCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [tab, setTab] = useState<Tab>("learn");

  const course = getCourse(params.courseSlug);
  const result = getLesson(params.courseSlug, params.lessonId);

  useEffect(() => {
    if (!session?.user?.id || !result) return;
    fetch(`/api/progress?lessonId=${params.lessonId}`)
      .then((r) => r.json())
      .then((d) => setCompleted(d.completed ?? false));
  }, [session, params.lessonId, result]);

  const handleComplete = useCallback(async () => {
    if (!result) return;
    setCompleting(true);
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: result.lesson.id, xp: result.lesson.xp }),
    });
    if (res.ok) {
      setCompleted(true);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 3000);
    }
    setCompleting(false);
  }, [result]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
      </div>
    );
  }

  if (!course || !result) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-[#71717a]">Lesson not found.</p>
          <Link href="/dashboard" className="text-[#a78bfa] text-sm mt-3 block hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { lesson, section } = result;
  const hasExercises = !!EXERCISES[lesson.id];
  const hasRealWorld = !!lesson.realWorld;

  const allLessons = course.sections.flatMap((s) =>
    s.lessons.map((l) => ({ ...l, section: s }))
  );
  const currentIdx = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = allLessons[currentIdx + 1];
  const isLastInSection =
    section.lessons[section.lessons.length - 1]?.id === lesson.id;

  const tabs: { id: Tab; label: string; icon: string; available: boolean }[] = [
    { id: "learn", label: "Learn", icon: "📖", available: true },
    { id: "practice", label: "Practice", icon: "💻", available: hasExercises },
    { id: "realworld", label: "Real World", icon: "🌍", available: hasRealWorld },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#fafafa]">
      {showXP && (
        <div className="fixed top-24 right-6 z-50 bg-[#7c3aed] text-white font-black px-6 py-3 rounded-xl shadow-lg animate-bounce">
          +{lesson.xp} XP! 🎉
        </div>
      )}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#1c1c2a] bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-2 text-[#71717a] hover:text-white text-sm transition-colors"
          >
            ← {course.title}
          </Link>
          <div className="flex items-center gap-4">
            <CourseTimer courseSlug={course.slug} />
            <div className="text-[#71717a] text-xs font-mono hidden md:block">
              {section.title}
            </div>
            <div
              className="text-xs font-mono px-2 py-1 rounded border"
              style={{
                color: course.color,
                borderColor: course.color + "40",
                background: course.color + "10",
              }}
            >
              +{lesson.xp} XP
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-24 px-4 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {lesson.readingTime && (
              <div className="text-xs font-mono px-3 py-1 rounded-full border text-[#a78bfa] bg-[#7c3aed]/10 border-[#7c3aed]/30">
                ⏱ {lesson.readingTime} read
              </div>
            )}
            {!lesson.readingTime && (
              <div className="text-xs font-mono px-3 py-1 rounded-full border text-[#a78bfa] bg-[#7c3aed]/10 border-[#7c3aed]/30">
                ⏱ {lesson.duration}
              </div>
            )}
            {completed && (
              <div className="text-xs font-mono px-3 py-1 rounded-full border text-emerald-400 bg-emerald-400/10 border-emerald-400/30">
                ✓ Completed
              </div>
            )}
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">{lesson.title}</h1>
          <p className="text-[#71717a]">{lesson.description}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[#0d0d15] border border-[#1c1c2a] rounded-xl p-1">
          {tabs.filter((t) => t.available).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t.id
                  ? "bg-[#7c3aed] text-white"
                  : "text-[#71717a] hover:text-white"
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab: Learn */}
        {tab === "learn" && (
          <div className="bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl p-6 md:p-8 mb-8">
            <MarkdownContent content={lesson.content} />
          </div>
        )}

        {/* Tab: Practice */}
        {tab === "practice" && hasExercises && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 rounded-full bg-[#7c3aed]" />
              <h2 className="text-lg font-black tracking-tight">Practice Exercises</h2>
            </div>
            <SqlEditor
              lessonExercises={EXERCISES[lesson.id]}
              onAllComplete={() => {
                if (!completed) handleComplete();
              }}
            />
          </div>
        )}

        {/* Tab: Real World */}
        {tab === "realworld" && hasRealWorld && (
          <div className="mb-8">
            <div className="bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#001a2e] to-[#002a3e] border-b border-[#1c1c2a] px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center text-sm">
                  {course.slug === "azure" ? "👩‍💼" : "👨‍💻"}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {course.slug === "azure" ? "Sarah — Azure Admin at Contoso Bank" : "Alex — Data Engineer at Meta"}
                  </div>
                  <div className="text-xs text-[#71717a] font-mono">Real world scenario</div>
                </div>
                <div className="ml-auto">
                  <span className="text-xs font-mono px-2 py-1 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-[#a78bfa]">
                    // MySQL
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-6 md:p-8">
                <MarkdownContent content={lesson.realWorld!} />
              </div>
            </div>
            <p className="text-xs text-[#3f3f50] font-mono mt-3 text-center">
              {course.slug === "azure" ? "Sarah is a fictional character used to illustrate real-world Azure concepts" : "Alex is a fictional character used to illustrate real-world SQL concepts"}
            </p>
          </div>
        )}

        {/* Complete button */}
        <div className="flex items-center gap-3">
          {!session?.user?.id ? (
            <Link
              href="/login"
              className="flex-1 bg-[#0d0d15] border border-[#1c1c2a] text-[#fafafa] font-semibold py-4 rounded-xl hover:border-[#7c3aed]/40 hover:text-white transition-all text-sm text-center"
            >
              Sign in to save your progress and XP →
            </Link>
          ) : !completed ? (
            <button
              onClick={handleComplete}
              disabled={completing}
              className="flex-1 bg-[#7c3aed] text-white font-bold py-4 rounded-xl hover:bg-[#6d28d9] transition-all disabled:opacity-50 text-base"
            >
              {completing ? "Saving..." : `✓ Mark Complete (+${lesson.xp} XP)`}
            </button>
          ) : (
            <div className="flex-1 bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 font-bold py-4 rounded-xl text-center text-base">
              ✓ Lesson Complete!
            </div>
          )}
        </div>

        {/* Navigation after complete */}
        {completed && (
          <div className="mt-4 space-y-3">
            {isLastInSection && (
              <Link
                href={`/quiz/${section.quiz.id}?course=${course.slug}&section=${section.id}`}
                className="w-full flex items-center justify-center gap-2 bg-[#7c3aed] text-white font-bold py-3.5 rounded-xl hover:bg-[#6d28d9] transition-all"
              >
                🎯 Take Section Quiz →
              </Link>
            )}
            {nextLesson && !isLastInSection && (
              <Link
                href={`/learn/${course.slug}/${nextLesson.section.id}/${nextLesson.id}`}
                className="w-full flex items-center justify-center gap-2 text-black font-bold py-3.5 rounded-xl transition-all hover:opacity-90"
                style={{ background: course.color }}
              >
                Next: {nextLesson.title} →
              </Link>
            )}
            {nextLesson && isLastInSection && (
              <Link
                href={`/learn/${course.slug}/${nextLesson.section.id}/${nextLesson.id}`}
                className="w-full flex items-center justify-center gap-2 border border-[#1c1c2a] text-[#71717a] font-medium py-3 rounded-xl hover:border-[#7c3aed]/40 hover:text-white transition-all text-sm"
              >
                Skip to next section →
              </Link>
            )}
            {!nextLesson && (
              <Link
                href={`/courses/${course.slug}`}
                className="w-full flex items-center justify-center gap-2 bg-[#7c3aed] text-white font-bold py-3.5 rounded-xl hover:bg-[#6d28d9] transition-all"
              >
                🎉 Back to Course Overview →
              </Link>
            )}
          </div>
        )}

        {/* Section lesson list */}
        <div className="mt-10 pt-6 border-t border-[#1c1c2a]">
          <p className="text-xs font-mono text-[#71717a] mb-3">// {section.title}</p>
          <div className="space-y-1">
            {section.lessons.map((l, li) => (
              <Link
                key={l.id}
                href={`/learn/${course.slug}/${section.id}/${l.id}`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  l.id === lesson.id
                    ? "bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#a78bfa]"
                    : "hover:bg-[#0d0d15] text-[#71717a] hover:text-white"
                }`}
              >
                <span className="font-mono text-xs w-4">{li + 1}</span>
                <span className="flex-1">{l.title}</span>
                {l.readingTime && (
                  <span className="text-xs font-mono text-[#3f3f50]">{l.readingTime}</span>
                )}
                <span
                  className="text-xs font-mono"
                  style={{ color: course.color }}
                >
                  +{l.xp} XP
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
