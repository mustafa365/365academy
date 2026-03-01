"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getCourse, getSection } from "@/lib/courseData";

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course") ?? "";
  const sectionId = searchParams.get("section") ?? "";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);

  const course = getCourse(courseSlug);
  const section = getSection(courseSlug, sectionId);

  if (!course || !section) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        Quiz not found.{" "}
        <Link href="/dashboard" className="text-[#a78bfa] ml-2">Go to Dashboard</Link>
      </div>
    );
  }

  const quiz = section.quiz;
  const questions = quiz.questions;

  async function handleSubmit() {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);

    const correct = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const pct = Math.round((correct / questions.length) * 100);
    const pass = pct >= 70;
    const xpEarned = pass ? 200 : 50;

    setScore(pct);
    setPassed(pass);
    setSubmitted(true);
    setSubmitting(false);

    // Save to DB only if logged in
    if (session?.user) {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: quiz.id,
          score: pct,
          passed: pass,
          xpEarned,
          answers: questions.map((q) => ({
            questionId: q.id,
            answer: answers[q.id] ?? "",
            isCorrect: answers[q.id] === q.correctAnswer,
          })),
        }),
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#fafafa]">
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#1c1c2a] bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/courses/${courseSlug}`} className="text-[#71717a] hover:text-white text-sm transition-colors">
            ← Back to {course.title}
          </Link>
          <div className="text-[#71717a] text-xs font-mono">Section Quiz</div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6 max-w-3xl mx-auto">
        {/* Quiz header */}
        <div className="mb-8">
          <div className="text-[#71717a] text-xs font-mono mb-2">{course.title} · {section.title}</div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Section Quiz</h1>
          <p className="text-[#71717a] text-sm">{questions.length} questions · Minimum 70% to pass · Unlock next section</p>
        </div>

        {/* Score result */}
        {submitted && (
          <div className={`rounded-2xl p-8 mb-8 text-center border ${passed ? "bg-emerald-400/5 border-emerald-400/30" : "bg-red-400/5 border-red-400/30"}`}>
            <div className="text-6xl mb-4">{passed ? "🎉" : "😤"}</div>
            <div className={`text-5xl font-black mb-2 ${passed ? "text-emerald-400" : "text-red-400"}`}>{score}%</div>
            <div className="font-bold text-xl mb-2">{passed ? "You passed! 🚀" : "Not quite — try again!"}</div>
            <p className="text-[#71717a] text-sm mb-4">
              {passed
                ? `You earned +200 XP and unlocked the next section!`
                : `You need 70% to pass. You scored ${score}%. Keep studying!`}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => setShowExplanations(!showExplanations)}
                className="px-5 py-2.5 border border-[#1c1c2a] rounded-xl text-sm font-medium hover:border-[#7c3aed]/40 transition-colors"
              >
                {showExplanations ? "Hide" : "Show"} Explanations
              </button>
              {!passed && (
                <button
                  onClick={() => { setSubmitted(false); setAnswers({}); }}
                  className="px-5 py-2.5 bg-[#7c3aed] text-white rounded-xl text-sm font-bold hover:bg-[#6d28d9] transition-colors"
                >
                  Retry Quiz
                </button>
              )}
              {passed && (
                <Link
                  href={`/courses/${courseSlug}`}
                  className="px-5 py-2.5 bg-[#7c3aed] text-white rounded-xl text-sm font-bold hover:bg-[#6d28d9] transition-colors"
                >
                  Continue Course →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, qi) => {
            const selected = answers[q.id];
            const isCorrect = selected === q.correctAnswer;

            return (
              <div key={q.id} className="bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center text-[#a78bfa] font-mono text-xs font-bold flex-shrink-0 mt-0.5">
                    {qi + 1}
                  </div>
                  <p className="font-semibold leading-relaxed">{q.question}</p>
                </div>

                <div className="space-y-3 mb-4">
                  {q.options?.map((option) => {
                    const isSelected = selected === option;
                    const showResult = submitted || showExplanations;
                    const isRight = option === q.correctAnswer;

                    let style = "border-[#1c1c2a] text-[#b8c5d6] hover:border-[#7c3aed]/40";
                    if (isSelected && !showResult) style = "border-[#7c3aed]/60 text-white bg-[#7c3aed]/5";
                    if (showResult && isRight) style = "border-emerald-400/40 text-emerald-400 bg-emerald-400/5";
                    if (showResult && isSelected && !isRight) style = "border-red-400/40 text-red-400 bg-red-400/5";

                    return (
                      <button
                        key={option}
                        onClick={() => !submitted && setAnswers((prev) => ({ ...prev, [q.id]: option }))}
                        disabled={submitted}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {submitted && showExplanations && (
                  <div className="bg-[#0a0a0f] border border-[#1c1c2a] rounded-xl p-4">
                    <div className={`text-xs font-mono mb-1 ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                      {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                    </div>
                    <p className="text-[#71717a] text-sm">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit */}
        {!submitted && (
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              disabled={submitting || Object.keys(answers).length < questions.length}
              className="w-full bg-[#7c3aed] text-white font-bold py-4 rounded-xl hover:bg-[#6d28d9] transition-all disabled:opacity-50 text-lg"
            >
              {submitting
                ? "Grading..."
                : `Submit Quiz (${Object.keys(answers).length}/${questions.length} answered)`}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
