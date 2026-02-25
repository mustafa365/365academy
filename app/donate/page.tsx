import Link from "next/link";

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2d42] bg-[#080c10]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_12px_#00e5ff] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/courses" className="text-[#6b7d95] hover:text-white text-sm transition-colors">
              Courses
            </Link>
            <Link href="/login" className="text-sm bg-[#00e5ff] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#00c4db] transition-all hover:-translate-y-0.5">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#00e5ff]/8 border border-[#00e5ff]/20 text-[#00e5ff] px-4 py-1.5 rounded-full text-xs font-mono mb-6">
            ❤️ &nbsp;Keep 365Academy free for everyone
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Support free SQL & Azure education.
          </h1>

          <p className="text-[#6b7d95] text-sm md:text-base leading-relaxed mb-6">
            365Academy is intentionally free of enrollment fees so that anyone, anywhere can learn SQL and Azure without worrying about cost.
            Your donation helps cover hosting, development time, and new content so we can keep this platform free for learners like you.
          </p>

          <p className="text-[#6b7d95] text-sm md:text-base leading-relaxed mb-10">
            If 365Academy has helped you on your journey, please consider making a contribution. Even a small amount makes a real difference.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#f97373] text-black font-bold text-sm md:text-base shadow-[0_0_30px_rgba(248,113,113,0.35)] hover:bg-[#fb7171] transition-transform hover:-translate-y-0.5"
            >
              <span className="text-lg">❤️</span>
              <span>Donate to 365Academy</span>
            </button>
            <span className="text-[11px] text-[#6b7d95] font-mono">
              (Wire this button to your preferred donation platform.)
            </span>
          </div>

          <div className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-[#00e5ff] text-xs font-mono mb-1">// Access</div>
              <p className="text-[#b8c5d6]">Help keep all lessons, quizzes, and practice tools available for free.</p>
            </div>
            <div>
              <div className="text-[#00e5ff] text-xs font-mono mb-1">// Content</div>
              <p className="text-[#b8c5d6]">Support new modules, exercises, and real-world projects for learners.</p>
            </div>
            <div>
              <div className="text-[#00e5ff] text-xs font-mono mb-1">// Community</div>
              <p className="text-[#b8c5d6]">Enable more people with no prior experience to start a tech career.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

