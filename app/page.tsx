import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4] overflow-x-hidden">

      {/* ANNOUNCEMENT BANNER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0e1420] border-b border-[#1e2d42] py-2 px-4 text-center text-xs text-[#6b7d95] font-mono tracking-wide">
        ✦ &nbsp; 365Academy and all its content is completely free — built to truly serve those willing to learn and grow their tech careers &nbsp; ✦
      </div>

      {/* NAV */}
      <nav className="fixed top-8 left-0 right-0 z-40 border-b border-[#1e2d42] bg-[#080c10]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_12px_#00e5ff] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 text-[#f97373] text-sm font-semibold px-3 py-1.5 rounded-full border border-[#f97373]/40 bg-[#f97373]/10 hover:bg-[#f97373]/20 hover:border-[#f97373]/60 transition-all hover:-translate-y-0.5"
            >
              <span>❤️</span>
              <span>Donate</span>
            </Link>
            <Link href="/courses" className="text-[#6b7d95] hover:text-white text-sm transition-colors">Courses</Link>
            <Link href="/login" className="bg-[#00e5ff] text-black text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#00c4db] transition-all hover:-translate-y-0.5">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 px-6">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-purple-700/10 blur-[80px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-[#00e5ff]/8 border border-[#00e5ff]/20 text-[#00e5ff] px-4 py-1.5 rounded-full text-xs font-mono mb-8">
            ✦ &nbsp;Beginner friendly — no experience needed
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            <span className="text-[#6b7d95] block">Master</span>
            <span className="text-[#00e5ff] block">SQL &</span>
            <span className="text-white block">Azure.</span>
          </h1>

          <p className="text-[#6b7d95] text-lg max-w-lg leading-relaxed mb-10">
            Two career-changing courses taught by Ahmed. Go from zero experience to job-ready skills — at your own pace, with lifetime access.
          </p>

          <div className="flex gap-4 flex-wrap mb-16">
            <Link href="/courses" className="inline-flex items-center gap-2 bg-[#00e5ff] text-black font-semibold px-7 py-3.5 rounded-lg hover:bg-[#00c4db] transition-all hover:-translate-y-0.5 shadow-[0_0_30px_rgba(0,229,255,0.25)]">
              View Courses →
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 border border-[#1e2d42] text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-[#0e1420] transition-all">
              Sign In Free
            </Link>
          </div>

          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-black">2<span className="text-[#00e5ff]">+</span></div>
              <div className="text-[#6b7d95] text-sm mt-1">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#00e5ff]">Free</div>
              <div className="text-[#6b7d95] text-sm mt-1">No enrollment fees</div>
            </div>
            <div>
              <div className="text-3xl font-black"><span className="text-[#00e5ff]">∞</span></div>
              <div className="text-[#6b7d95] text-sm mt-1">Lifetime Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="bg-[#0e1420] border-y border-[#1e2d42] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight mb-2">Courses</h2>
          <p className="text-[#6b7d95] text-sm mb-10">Free. Beginner friendly. No experience needed.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SQL Course */}
            <Link href="/courses/sql" className="group bg-[#080c10] border border-[#1e2d42] rounded-2xl overflow-hidden hover:border-[#00e5ff]/40 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col">
              <div className="h-36 bg-gradient-to-br from-[#001a2e] via-[#002a3e] to-[#00395a] flex items-center justify-center relative">
                <span className="text-6xl">🗄️</span>
                <div className="absolute top-3 right-3 text-xs font-mono font-bold px-3 py-1 rounded-full border text-emerald-400 bg-emerald-400/10 border-emerald-400/30">Beginner</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black mb-2">SQL from Zero to Hero</h3>
                <p className="text-[#6b7d95] text-sm leading-relaxed flex-1">Master SQL from scratch — SELECT, JOIN, GROUP BY, indexes, and real-world database design.</p>
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#1e2d42]">
                  <span className="text-2xl font-black text-[#00e5ff]">Free</span>
                  <span className="bg-[#00e5ff] text-black font-bold px-5 py-2 rounded-lg text-sm group-hover:bg-[#00c4db] transition-colors">Start Learning →</span>
                </div>
              </div>
            </Link>

            {/* Azure Course */}
            <Link href="/courses/azure" className="group bg-[#080c10] border border-[#1e2d42] rounded-2xl overflow-hidden hover:border-[#00e5ff]/40 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col">
              <div className="h-36 bg-gradient-to-br from-[#001020] via-[#001535] to-[#001f4a] flex items-center justify-center relative">
                <span className="text-6xl">☁️</span>
                <div className="absolute top-3 right-3 text-xs font-mono font-bold px-3 py-1 rounded-full border text-emerald-400 bg-emerald-400/10 border-emerald-400/30">Beginner</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black mb-2">Azure Admin Zero to Hero</h3>
                <p className="text-[#6b7d95] text-sm leading-relaxed flex-1">Go from zero cloud experience to managing Azure infrastructure. Full AZ-104 exam prep included.</p>
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#1e2d42]">
                  <span className="text-2xl font-black text-[#00e5ff]">Free</span>
                  <span className="bg-[#00e5ff] text-black font-bold px-5 py-2 rounded-lg text-sm group-hover:bg-[#00c4db] transition-colors">Start Learning →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080c10] border-t border-[#1e2d42] py-10 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="text-[#6b7d95] text-sm font-mono">© 2025 365Academy</div>
          <div className="flex gap-6 text-sm text-[#6b7d95]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
