"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { LessonExercises, Exercise } from "@/lib/sqlExercises";

// ─── Types ─────────────────────────────────────────────────────────────────

type QueryResult = {
  columns: string[];
  rows: (string | number | null)[][];
};

type Status = "idle" | "success" | "error" | "running";

// ─── Helpers ───────────────────────────────────────────────────────────────

function normalizeResults(results: QueryResult[]): string {
  if (!results || results.length === 0) return "__empty__";
  const r = results[results.length - 1];
  const sorted = [...r.rows].sort((a, b) =>
    JSON.stringify(a).localeCompare(JSON.stringify(b))
  );
  return JSON.stringify({ columns: r.columns, rows: sorted });
}

// ─── Component ─────────────────────────────────────────────────────────────

interface SqlEditorProps {
  lessonExercises: LessonExercises;
  onAllComplete?: () => void;
}

export default function SqlEditor({ lessonExercises, onAllComplete }: SqlEditorProps) {
  const [dbReady, setDbReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sql, setSql] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [results, setResults] = useState<QueryResult | null>(null);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const dbRef = useRef<unknown>(null);
  const sqlJsRef = useRef<unknown>(null);

  const exercises: Exercise[] = lessonExercises.exercises;
  const currentExercise: Exercise = exercises[exerciseIdx];

  // ── Load sql.js + init DB ────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function initDb() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const initSqlJs = (await import("sql.js") as any).default;
        const SQL = await initSqlJs({ locateFile: () => "/sql-wasm.wasm" });
        if (cancelled) return;
        sqlJsRef.current = SQL;

        // Create fresh DB and run schema + seed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const db = new (SQL as any).Database();
        db.run(lessonExercises.database);
        dbRef.current = db;
        setDbReady(true);
      } catch (e) {
        if (!cancelled) setLoadError(String(e));
      }
    }

    initDb();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonExercises.database]);

  // ── Reset state on exercise change ───────────────────────────────────────
  useEffect(() => {
    setSql("");
    setResults(null);
    setStatus("idle");
    setErrorMsg("");
    setShowHint(false);
    setAttempts(0);
    setShowAnswer(false);
  }, [exerciseIdx]);

  // ── Execute SQL ──────────────────────────────────────────────────────────
  const runQuery = useCallback(
    (query: string): QueryResult[] | null => {
      if (!dbRef.current) return null;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawResults = (dbRef.current as any).exec(query);
        if (!rawResults || rawResults.length === 0) return [];
        return rawResults.map((r: { columns: string[]; values: (string | number | null)[][] }) => ({
          columns: r.columns,
          rows: r.values,
        }));
      } catch {
        return null;
      }
    },
    []
  );

  const handleRun = useCallback(() => {
    if (!dbReady || !sql.trim()) return;
    setStatus("running");
    setErrorMsg("");

    setTimeout(() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawResults = (dbRef.current as any).exec(sql);
        const queryResult: QueryResult =
          rawResults && rawResults.length > 0
            ? { columns: rawResults[0].columns, rows: rawResults[0].values }
            : { columns: [], rows: [] };

        setResults(queryResult);
        setAttempts((a) => a + 1);

        // Validate against reference answer
        const userOut = normalizeResults(
          rawResults?.map((r: { columns: string[]; values: (string | number | null)[][] }) => ({
            columns: r.columns,
            rows: r.values,
          })) ?? []
        );

        const refResults = runQuery(currentExercise.checkSql);
        const refOut = normalizeResults(refResults ?? []);

        if (userOut === refOut && userOut !== "__error__") {
          setStatus("success");
          setCelebrating(true);
          setCompletedExercises((prev) => {
            const next = new Set(prev);
            next.add(currentExercise.id);
            return next;
          });
          setTimeout(() => setCelebrating(false), 2000);

          // Auto-advance after 1.5s if not last
          if (exerciseIdx < exercises.length - 1) {
            setTimeout(() => {
              setExerciseIdx((i) => i + 1);
            }, 1500);
          } else {
            onAllComplete?.();
          }
        } else {
          setStatus("error");
          setErrorMsg("Not quite — your results don't match the expected output. Try again!");
        }
      } catch (e) {
        setStatus("error");
        setErrorMsg(String(e));
        setResults(null);
      }
    }, 50);
  }, [dbReady, sql, currentExercise, exerciseIdx, exercises.length, onAllComplete, runQuery]);

  // ── Keyboard shortcut: Ctrl+Enter / Cmd+Enter ────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    },
    [handleRun]
  );

  // ── Loading state ────────────────────────────────────────────────────────
  if (loadError) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-400 text-sm font-mono">
        Failed to load SQL engine: {loadError}
      </div>
    );
  }

  if (!dbReady) {
    return (
      <div className="rounded-2xl border border-[#1e2d42] bg-[#0e1420] p-8 flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-[#6b7d95] text-sm font-mono">Loading SQL engine…</p>
      </div>
    );
  }

  const allDone = completedExercises.size === exercises.length;

  return (
    <div className="rounded-2xl border border-[#1e2d42] bg-[#0e1420] overflow-hidden">
      {/* ── Exercise progress bar ─────────────────────────────────────── */}
      <div className="px-5 pt-4 pb-3 border-b border-[#1e2d42] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {exercises.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => setExerciseIdx(i)}
              className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all border ${
                completedExercises.has(ex.id)
                  ? "bg-emerald-400/15 border-emerald-400/40 text-emerald-400"
                  : i === exerciseIdx
                  ? "bg-[#00e5ff]/15 border-[#00e5ff]/40 text-[#00e5ff]"
                  : "bg-[#080c10] border-[#1e2d42] text-[#6b7d95] hover:border-[#3a4a5c]"
              }`}
            >
              {completedExercises.has(ex.id) ? "✓" : i + 1}
            </button>
          ))}
        </div>
        <span className="text-xs font-mono text-[#6b7d95] flex-shrink-0">
          {completedExercises.size}/{exercises.length} solved
        </span>
      </div>

      {/* ── Exercise prompt ───────────────────────────────────────────── */}
      <div
        className={`px-5 py-4 border-b border-[#1e2d42] transition-all duration-300 ${
          celebrating ? "bg-emerald-400/5" : "bg-[#080c10]/40"
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0 mt-0.5">
            {completedExercises.has(currentExercise.id) ? "✅" : "🎯"}
          </span>
          <div className="flex-1">
            <div className="text-xs font-mono text-[#6b7d95] mb-1">
              Exercise {exerciseIdx + 1} of {exercises.length}
            </div>
            <p className="text-[#e2eaf4] text-sm leading-relaxed font-medium">
              {currentExercise.prompt}
            </p>
          </div>
        </div>

        {/* Hint / Answer reveal */}
        <div className="mt-3 flex gap-3 flex-wrap">
          {currentExercise.hint && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="text-xs text-[#6b7d95] hover:text-[#00e5ff] font-mono transition-colors underline underline-offset-2"
            >
              💡 Show hint
            </button>
          )}
          {showHint && currentExercise.hint && (
            <span className="text-xs text-amber-400/80 font-mono bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20">
              💡 {currentExercise.hint}
            </span>
          )}
          {attempts >= 3 && !showAnswer && (
            <button
              onClick={() => setShowAnswer(true)}
              className="text-xs text-[#6b7d95] hover:text-purple-400 font-mono transition-colors underline underline-offset-2"
            >
              👁 Reveal answer
            </button>
          )}
          {showAnswer && (
            <span className="text-xs text-purple-400/80 font-mono bg-purple-400/10 px-3 py-1.5 rounded-lg border border-purple-400/20 break-all">
              {currentExercise.checkSql}
            </span>
          )}
        </div>
      </div>

      {/* ── SQL Editor ────────────────────────────────────────────────── */}
      <div className="p-4 border-b border-[#1e2d42]">
        <div className="relative">
          <textarea
            value={sql}
            onChange={(e) => {
              setSql(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            onKeyDown={handleKeyDown}
            placeholder="-- Write your SQL query here…"
            spellCheck={false}
            rows={5}
            className={`w-full bg-[#080c10] border rounded-xl px-4 py-3 font-mono text-sm text-[#e2eaf4] placeholder-[#3a4a5c] resize-none outline-none transition-all ${
              status === "success"
                ? "border-emerald-400/50 shadow-[0_0_16px_#34d39920]"
                : status === "error"
                ? "border-red-400/50"
                : "border-[#1e2d42] focus:border-[#00e5ff]/40 focus:shadow-[0_0_12px_#00e5ff18]"
            }`}
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-[#3a4a5c] font-mono select-none pointer-events-none">
            Ctrl+Enter to run
          </div>
        </div>
      </div>

      {/* ── Action bar ────────────────────────────────────────────────── */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-[#1e2d42]">
        <button
          onClick={handleRun}
          disabled={!sql.trim() || status === "running"}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00e5ff] text-[#080c10] text-sm font-black hover:bg-[#00c8e0] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          {status === "running" ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-[#080c10]/40 border-t-[#080c10] rounded-full animate-spin" />
              Running…
            </>
          ) : (
            <>▶ Run Query</>
          )}
        </button>

        <button
          onClick={() => {
            setSql("");
            setResults(null);
            setStatus("idle");
            setErrorMsg("");
          }}
          className="px-4 py-2 rounded-xl border border-[#1e2d42] text-[#6b7d95] text-sm hover:border-[#3a4a5c] hover:text-[#e2eaf4] transition-all"
        >
          Clear
        </button>

        {exerciseIdx > 0 && (
          <button
            onClick={() => setExerciseIdx((i) => i - 1)}
            className="ml-auto px-3 py-2 rounded-xl border border-[#1e2d42] text-[#6b7d95] text-xs hover:border-[#3a4a5c] hover:text-[#e2eaf4] transition-all"
          >
            ← Prev
          </button>
        )}
        {exerciseIdx < exercises.length - 1 && (
          <button
            onClick={() => setExerciseIdx((i) => i + 1)}
            className={`${exerciseIdx > 0 ? "" : "ml-auto"} px-3 py-2 rounded-xl border text-xs transition-all ${
              completedExercises.has(currentExercise.id)
                ? "border-[#1e2d42] text-[#6b7d95] hover:border-[#3a4a5c] hover:text-[#e2eaf4]"
                : "border-[#1e2d42] text-[#3a4a5c] cursor-not-allowed opacity-50"
            }`}
            disabled={!completedExercises.has(currentExercise.id)}
          >
            Next →
          </button>
        )}
      </div>

      {/* ── Status banner ─────────────────────────────────────────────── */}
      {status === "success" && (
        <div className="px-5 py-3 bg-emerald-400/10 border-b border-emerald-400/20 flex items-center gap-3">
          <span className="text-xl">{celebrating ? "🎉" : "✅"}</span>
          <div>
            <span className="text-emerald-400 font-bold text-sm">
              {celebrating ? "Correct! Well done!" : "Already solved!"}
            </span>
            {exerciseIdx < exercises.length - 1 && celebrating && (
              <span className="text-emerald-400/60 text-xs font-mono ml-2">Next exercise loading…</span>
            )}
          </div>
        </div>
      )}

      {status === "error" && errorMsg && (
        <div className="px-5 py-3 bg-red-500/10 border-b border-red-500/20 flex items-start gap-3">
          <span className="text-lg flex-shrink-0">❌</span>
          <span className="text-red-400 text-xs font-mono leading-relaxed">{errorMsg}</span>
        </div>
      )}

      {/* ── Results table ─────────────────────────────────────────────── */}
      {results && (
        <div className="overflow-x-auto">
          {results.columns.length === 0 ? (
            <div className="px-5 py-4 text-[#6b7d95] text-xs font-mono">
              Query executed successfully (no rows returned)
            </div>
          ) : (
            <>
              <div className="px-5 pt-3 pb-1 flex items-center justify-between">
                <span className="text-xs font-mono text-[#6b7d95]">
                  {results.rows.length} row{results.rows.length !== 1 ? "s" : ""}
                </span>
              </div>
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1e2d42]">
                    {results.columns.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-2 text-left text-[#00e5ff] font-bold tracking-wider uppercase text-[10px]"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.rows.slice(0, 50).map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-b border-[#1e2d42]/50 hover:bg-[#080c10]/50 transition-colors"
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="px-4 py-2 text-[#b8c5d6] max-w-[280px] truncate"
                        >
                          {cell === null ? (
                            <span className="text-[#3a4a5c] italic">NULL</span>
                          ) : (
                            String(cell)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {results.rows.length > 50 && (
                <div className="px-5 py-2 text-[#3a4a5c] text-[10px] font-mono">
                  Showing first 50 of {results.rows.length} rows
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── All done banner ───────────────────────────────────────────── */}
      {allDone && (
        <div className="px-5 py-5 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 border-t border-emerald-400/20 text-center">
          <div className="text-2xl mb-1">🏆</div>
          <p className="text-emerald-400 font-black text-sm">All exercises complete!</p>
          <p className="text-[#6b7d95] text-xs font-mono mt-1">
            Great work — you&apos;ve mastered this lesson&apos;s exercises.
          </p>
        </div>
      )}
    </div>
  );
}
