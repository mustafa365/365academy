import Link from "next/link";
import { COURSES } from "@/lib/courseData";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2d42] bg-[#080c10]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <Link href="/dashboard" className="text-[#6b7d95] hover:text-white text-sm transition-colors">Dashboard</Link>
        </div>
      </nav>

      <div className="pt-32 pb-16 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-black tracking-tight mb-4">Choose your path</h1>
        <p className="text-[#6b7d95] mb-12">Two courses. Lifetime access. Start free.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COURSES.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`}
              className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-8 hover:border-[#00e5ff]/40 hover:-translate-y-1 transition-all">
              <div className="text-6xl mb-4">{course.icon}</div>
              <h2 className="text-2xl font-black mb-2">{course.title}</h2>
              <p className="text-[#6b7d95] mb-4">{course.description}</p>
              <div className="text-[#00e5ff] font-mono text-sm">Start Learning →</div>
            </Link>
          ))}

          {/* Practice Python card */}
          <Link href="/practice-python"
            className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-8 hover:border-[#3dd68c]/40 hover:-translate-y-1 transition-all group">
            <div className="text-6xl mb-4">🐍</div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-black">PracticePython</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#3dd68c]/30 bg-[#3dd68c]/10 text-[#3dd68c]">FREE</span>
            </div>
            <p className="text-[#6b7d95] mb-4">Write and run Python code directly in your browser. No install, no server — just code and output side by side.</p>
            <div className="text-[#3dd68c] font-mono text-sm group-hover:translate-x-1 transition-transform">Open Playground →</div>
          </Link>
        </div>
      </div>
    </main>
  );
}