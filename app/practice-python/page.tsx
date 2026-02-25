"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

type OutputLine = {
  type: "stdout" | "stderr" | "info";
  text: string;
};

const STARTER_CODE = `# Welcome to the Python Playground!
# Write any Python code here and click Run (or Ctrl+Enter)

name = "Ahmed"
greeting = f"Hello, {name}!"
print(greeting)

# Try a loop
for i in range(1, 6):
    print(f"  {i} × {i} = {i * i}")
`;

const EXAMPLES = [
  {
    label: "Hello World",
    code: `print("Hello, World!")
print("Welcome to Python!")`,
  },
  {
    label: "List & Loop",
    code: `fruits = ["apple", "banana", "cherry", "mango"]

for i, fruit in enumerate(fruits, 1):
    print(f"{i}. {fruit.upper()}")

print(f"\\nTotal: {len(fruits)} fruits")`,
  },
  {
    label: "Functions",
    code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

for n in range(1, 8):
    print(f"{n}! = {factorial(n)}")`,
  },
  {
    label: "Dictionary",
    code: `student = {
    "name": "Ahmed",
    "scores": [88, 92, 75, 96, 83],
}

avg = sum(student["scores"]) / len(student["scores"])
print(f"Student: {student['name']}")
print(f"Scores:  {student['scores']}")
print(f"Average: {avg:.1f}")
print(f"Grade:   {'A' if avg >= 90 else 'B' if avg >= 80 else 'C'}")`,
  },
  {
    label: "Classes",
    code: `class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}!"

animals = [
    Animal("Dog", "Woof"),
    Animal("Cat", "Meow"),
    Animal("Cow", "Moo"),
]

for animal in animals:
    print(animal.speak())`,
  },
];

export default function PracticePythonPage() {
  const [code, setCode] = useState(STARTER_CODE);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [runCount, setRunCount] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pyodideRef = useRef<any>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Load Pyodide on mount
  useEffect(() => {
    async function loadPyodide() {
      try {
        setOutput([{ type: "info", text: "Loading Python runtime (Pyodide)…" }]);

        // Inject the Pyodide script tag dynamically
        await new Promise<void>((resolve, reject) => {
          if (document.getElementById("pyodide-script")) {
            resolve();
            return;
          }
          const script = document.createElement("script");
          script.id = "pyodide-script";
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Pyodide script"));
          document.head.appendChild(script);
        });

        // @ts-expect-error – Pyodide loaded globally
        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        });

        pyodideRef.current = pyodide;
        setPyodideReady(true);
        setOutput([{ type: "info", text: "Python 3.11 ready. Click Run or press Ctrl+Enter to execute." }]);
      } catch (e) {
        setLoadError(String(e));
        setOutput([{ type: "stderr", text: `Failed to load Python: ${e}` }]);
      }
    }

    loadPyodide();
  }, []);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const runCode = useCallback(async () => {
    if (!pyodideRef.current || !code.trim() || running) return;

    setRunning(true);
    setRunCount((c) => c + 1);

    const lines: OutputLine[] = [];

    try {
      // Redirect stdout/stderr
      pyodideRef.current.runPython(`
import sys
import io
_stdout_capture = io.StringIO()
_stderr_capture = io.StringIO()
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture
      `);

      // Run user code
      await pyodideRef.current.runPythonAsync(code);

      // Collect output
      const stdout: string = pyodideRef.current.runPython("_stdout_capture.getvalue()");
      const stderr: string = pyodideRef.current.runPython("_stderr_capture.getvalue()");

      if (stdout) {
        stdout.split("\n").forEach((line) => {
          if (line !== "" || stdout.endsWith("\n")) {
            lines.push({ type: "stdout", text: line });
          }
        });
      }
      if (stderr) {
        stderr.split("\n").forEach((line) => {
          if (line) lines.push({ type: "stderr", text: line });
        });
      }
      if (!stdout && !stderr) {
        lines.push({ type: "info", text: "(no output)" });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      // Clean up the Pyodide traceback noise
      const clean = msg.split("\n").filter((l) => !l.includes("at pyodide")).join("\n");
      lines.push({ type: "stderr", text: clean || String(e) });
    } finally {
      // Restore stdout/stderr
      try {
        pyodideRef.current.runPython("sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__");
      } catch {
        // ignore
      }
      setRunning(false);
    }

    setOutput(lines);
  }, [code, running]);

  // Ctrl+Enter to run
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
      // Tab inserts 4 spaces
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = e.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newVal = code.substring(0, start) + "    " + code.substring(end);
        setCode(newVal);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 4;
        });
      }
    },
    [runCode, code]
  );

  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4] flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2d42] bg-[#080c10]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#3dd68c] shadow-[0_0_12px_#3dd68c] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/courses" className="text-[#6b7d95] hover:text-white text-sm transition-colors">← Courses</Link>
            <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg border border-[#3dd68c]/30 bg-[#3dd68c]/10 text-[#3dd68c]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3dd68c] animate-pulse" />
              {pyodideReady ? "Python 3.11 Ready" : "Loading…"}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex flex-col flex-1">
        {/* Header strip */}
        <div className="border-b border-[#1e2d42] bg-[#0e1420] px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🐍</span>
              <div>
                <h1 className="text-xl font-black tracking-tight">Python Playground</h1>
                <p className="text-[#6b7d95] text-xs font-mono">Runs entirely in your browser — no server, no install</p>
              </div>
            </div>

            {/* Example snippets */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#6b7d95] font-mono mr-1">Examples:</span>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => { setCode(ex.code); setOutput([]); }}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[#1e2d42] text-[#6b7d95] hover:border-[#3dd68c]/40 hover:text-[#3dd68c] transition-all"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editor + Output */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor panel */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs font-mono text-[#3a4a5c]">main.py</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setCode(""); setOutput([]); }}
                  className="text-xs font-mono text-[#6b7d95] hover:text-white px-3 py-1 rounded-lg border border-[#1e2d42] hover:border-[#3a4a5c] transition-all"
                >
                  Clear
                </button>
                <button
                  onClick={runCode}
                  disabled={!pyodideReady || running || !code.trim()}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#3dd68c] text-[#080c10] text-sm font-black hover:bg-[#34c47e] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  {running ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#080c10]/40 border-t-[#080c10] rounded-full animate-spin" />
                      Running…
                    </>
                  ) : (
                    <>▶ Run</>
                  )}
                </button>
              </div>
            </div>

            <div className="relative flex-1">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                placeholder="# Write your Python code here…"
                className="w-full h-full min-h-[480px] bg-[#060a0e] border border-[#1e2d42] rounded-xl px-5 py-4 font-mono text-sm text-[#e2eaf4] placeholder-[#3a4a5c] resize-none outline-none transition-all focus:border-[#3dd68c]/40 focus:shadow-[0_0_12px_#3dd68c18] leading-relaxed"
                style={{ tabSize: 4 }}
              />
              <div className="absolute bottom-3 right-3 text-[10px] text-[#3a4a5c] font-mono select-none pointer-events-none">
                Ctrl+Enter to run · Tab to indent
              </div>
            </div>
          </div>

          {/* Output panel */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#6b7d95]">Output</span>
                {runCount > 0 && (
                  <span className="text-[10px] font-mono text-[#3a4a5c]">
                    Run #{runCount}
                  </span>
                )}
              </div>
              {output.length > 0 && (
                <button
                  onClick={() => setOutput([])}
                  className="text-xs font-mono text-[#3a4a5c] hover:text-[#6b7d95] transition-colors"
                >
                  Clear output
                </button>
              )}
            </div>

            <div
              ref={outputRef}
              className="flex-1 min-h-[480px] bg-[#060a0e] border border-[#1e2d42] rounded-xl p-5 font-mono text-sm overflow-y-auto"
            >
              {output.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-[#3a4a5c]">
                  <span className="text-4xl">▶</span>
                  <span className="text-xs">Run your code to see output here</span>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {output.map((line, i) => (
                    <div
                      key={i}
                      className={`leading-relaxed whitespace-pre-wrap break-all ${
                        line.type === "stderr"
                          ? "text-red-400"
                          : line.type === "info"
                          ? "text-[#6b7d95] italic"
                          : "text-[#e2eaf4]"
                      }`}
                    >
                      {line.type === "stderr" && (
                        <span className="text-red-500 mr-1 not-italic">✗</span>
                      )}
                      {line.text}
                    </div>
                  ))}
                  {!running && output.some(l => l.type === "stdout") && (
                    <div className="mt-3 pt-3 border-t border-[#1e2d42] text-[10px] text-[#3a4a5c] font-mono">
                      ── process exited ──
                    </div>
                  )}
                </div>
              )}

              {running && (
                <div className="flex items-center gap-2 text-[#3dd68c] text-xs mt-2">
                  <span className="w-3 h-3 border-2 border-[#3dd68c]/40 border-t-[#3dd68c] rounded-full animate-spin" />
                  Executing…
                </div>
              )}
            </div>

            {loadError && (
              <div className="mt-3 text-xs text-red-400 font-mono bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {loadError}
              </div>
            )}
          </div>
        </div>

        {/* Footer hint */}
        <div className="border-t border-[#1e2d42] bg-[#0e1420] px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-6 flex-wrap text-[10px] font-mono text-[#3a4a5c]">
            <span>🐍 Powered by Pyodide (CPython 3.11 in WebAssembly)</span>
            <span>⌨️ Ctrl+Enter to run</span>
            <span>⇥ Tab to indent</span>
            <span>🔒 Runs 100% in your browser — no code sent to any server</span>
          </div>
        </div>
      </div>
    </main>
  );
}
