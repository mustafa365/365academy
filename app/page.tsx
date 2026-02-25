import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4] overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2d42] bg-[#080c10]/80 backdrop-blur-xl">
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
      <section className="relative min-h-screen flex items-center pt-16 px-6">
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
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-[#00e5ff] text-xs font-mono tracking-widest uppercase mb-4">
            <div className="w-6 h-px bg-[#00e5ff]" /> Our Courses
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-12">Two courses. <span className="text-[#00e5ff]">Two careers.</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SQL Course */}
            <Link href="/courses/sql" className="group bg-[#080c10] border border-[#1e2d42] rounded-2xl overflow-hidden hover:border-[#00e5ff]/40 transition-all hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col">
              <div className="h-48 bg-gradient-to-br from-[#001a2e] via-[#002a3e] to-[#00395a] flex items-center justify-center relative">
                <span className="text-7xl">🗄️</span>
                <div className="absolute top-4 right-4 text-xs font-mono font-bold px-3 py-1 rounded-full border text-emerald-400 bg-emerald-400/10 border-emerald-400/30">Beginner</div>
                <div className="absolute bottom-4 left-4 text-xs font-mono text-[#00e5ff]">// SQL</div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-2xl font-black mb-3">SQL from Zero to Hero</h3>
                <p className="text-[#6b7d95] leading-relaxed mb-6 flex-1">
                  Start with zero database knowledge and master SQL from the ground up. Learn SELECT, JOIN, GROUP BY, indexes, and real-world database design.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Follow a step-by-step path from basics to advanced",
                    "Solve interactive SQL exercises directly in your browser",
                    "Design and optimize real databases used in companies",
                    "Build portfolio-ready projects and prepare for interviews",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#b8c5d6]">
                      <span className="text-[#00e5ff] text-xs">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-5 border-t border-[#1e2d42]">
                  <div>
                    <div className="text-3xl font-black text-[#00e5ff]">Free</div>
                    <div className="text-[#6b7d95] text-xs mt-0.5">Donation-supported</div>
                  </div>
                  <div className="bg-[#00e5ff] text-black font-bold px-6 py-2.5 rounded-lg group-hover:bg-[#00c4db] transition-colors">
                    Start Learning →
                  </div>
                </div>
              </div>
            </Link>

            {/* Azure Course */}
            <Link href="/courses/azure" className="group bg-[#080c10] border border-[#1e2d42] rounded-2xl overflow-hidden hover:border-[#00e5ff]/40 transition-all hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col">
              <div className="h-48 bg-gradient-to-br from-[#001020] via-[#001535] to-[#001f4a] flex items-center justify-center relative">
                <span className="text-7xl">☁️</span>
                <div className="absolute top-4 right-4 text-xs font-mono font-bold px-3 py-1 rounded-full border text-emerald-400 bg-emerald-400/10 border-emerald-400/30">Beginner</div>
                <div className="absolute bottom-4 left-4 text-xs font-mono text-[#00e5ff]">// Azure</div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-2xl font-black mb-3">Azure Admin Zero to Hero</h3>
                <p className="text-[#6b7d95] leading-relaxed mb-6 flex-1">
                  Go from no cloud experience to managing Azure infrastructure like a pro. Covers VMs, networking, storage, security, and the AZ-104 exam prep.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Follow a complete AZ-104 aligned roadmap from zero",
                    "Practice real-world admin tasks step by step",
                    "Work through checklists, diagrams and command cheat-sheets",
                    "Prepare confidently for Azure admin jobs and certifications",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#b8c5d6]">
                      <span className="text-[#00e5ff] text-xs">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-5 border-t border-[#1e2d42]">
                  <div>
                    <div className="text-3xl font-black text-[#00e5ff]">Free</div>
                    <div className="text-[#6b7d95] text-xs mt-0.5">Donation-supported</div>
                  </div>
                  <div className="bg-[#00e5ff] text-black font-bold px-6 py-2.5 rounded-lg group-hover:bg-[#00c4db] transition-colors">
                    Start Learning →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-[#00e5ff] text-xs font-mono tracking-widest uppercase mb-4">
            <div className="w-6 h-px bg-[#00e5ff]" /> Why 365Academy
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-12">What you get with <span className="text-[#00e5ff]">every course</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "🎬", title: "YouTube Video Lessons", desc: "High quality video lessons you can watch at your own pace, rewind, and rewatch as many times as you need." },
              { icon: "♾️", title: "Lifetime Access", desc: "Always free to access. Course materials and any new lessons added in the future — all included." },
              { icon: "🏆", title: "Beginner Friendly", desc: "No prior experience needed. Ahmed explains everything from scratch in a clear, easy to understand way." },
              { icon: "💼", title: "Career Focused", desc: "SQL and Azure are two of the most in-demand tech skills. Everything you learn applies directly to real jobs." },
              { icon: "📋", title: "Cert Prep Included", desc: "The Azure course covers everything for the AZ-104 exam. The SQL course prepares you for real interviews." },
              { icon: "🔐", title: "Secure Account", desc: "Your progress is saved. Pick up exactly where you left off on any device, any time." },
            ].map((f) => (
              <div key={f.title} className="group bg-[#0e1420] border border-[#1e2d42] rounded-xl p-6 relative overflow-hidden hover:border-[#00e5ff]/30 transition-all">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/8 border border-[#00e5ff]/15 flex items-center justify-center text-lg mb-4">{f.icon}</div>
                <div className="font-bold mb-2">{f.title}</div>
                <div className="text-[#6b7d95] text-sm leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING PATH SECTION */}
      <section className="py-20 px-6 border-t border-[#1e2d42] bg-[#080c10]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 text-[#00e5ff] text-xs font-mono tracking-widest uppercase mb-4">
              <div className="w-6 h-px bg-[#00e5ff]" /> Your learning journey
            </div>
            <h2 className="text-3xl font-black tracking-tight mb-6">
              From complete beginner to confident SQL & Azure pro.
            </h2>
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-xs font-bold text-[#00e5ff]">
                  1
                </span>
                <div>
                  <div className="font-semibold mb-1">Watch clear, beginner‑friendly lessons</div>
                  <p className="text-[#6b7d95]">
                    Start with no experience. Ahmed explains every concept from scratch using simple language and real examples.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-xs font-bold text-[#00e5ff]">
                  2
                </span>
                <div>
                  <div className="font-semibold mb-1">Practice inside the website</div>
                  <p className="text-[#6b7d95]">
                    Use the built‑in SQL practice lab and Python playground to write real queries and code directly in your browser — no installs needed.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-xs font-bold text-[#00e5ff]">
                  3
                </span>
                <div>
                  <div className="font-semibold mb-1">Test yourself with quizzes</div>
                  <p className="text-[#6b7d95]">
                    Reinforce every section with carefully designed quizzes — including real SQL questions — so you know you truly understand.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-xs font-bold text-[#00e5ff]">
                  4
                </span>
                <div>
                  <div className="font-semibold mb-1">Track progress & level up</div>
                  <p className="text-[#6b7d95]">
                    Earn XP, level up in the dashboard, and climb the leaderboard as you complete lessons, exercises, and quizzes.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-6 md:p-7">
            <div className="text-xs font-mono text-[#6b7d95] mb-2">// One‑stop learning hub</div>
            <h3 className="text-xl font-black mb-3">Everything you need in one place</h3>
            <p className="text-[#6b7d95] text-sm leading-relaxed mb-5">
              365Academy is designed so that someone with zero SQL or Azure experience can land here and slowly become an expert — without
              jumping between different websites, tools, or random tutorials.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#080c10] border border-[#1e2d42] rounded-xl p-3">
                <div className="font-semibold mb-1">Structured curriculum</div>
                <p className="text-[#6b7d95]">
                  4+ sections per course, dozens of lessons, and a clear order to follow.
                </p>
              </div>
              <div className="bg-[#080c10] border border-[#1e2d42] rounded-xl p-3">
                <div className="font-semibold mb-1">Hands‑on practice</div>
                <p className="text-[#6b7d95]">
                  Interactive SQL exercises, Python playground, and realistic Azure tasks.
                </p>
              </div>
              <div className="bg-[#080c10] border border-[#1e2d42] rounded-xl p-3">
                <div className="font-semibold mb-1">Progress & motivation</div>
                <p className="text-[#6b7d95]">
                  XP system, levels, quizzes, and a leaderboard to keep you engaged.
                </p>
              </div>
              <div className="bg-[#080c10] border border-[#1e2d42] rounded-xl p-3">
                <div className="font-semibold mb-1">Lifetime access</div>
                <p className="text-[#6b7d95]">
                  Come back any time to review, practice, and refresh your knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-[#0e1420] border-t border-[#1e2d42]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Ready to start your<br /><span className="text-[#00e5ff]">tech career?</span>
          </h2>
          <p className="text-[#6b7d95] mb-10 text-lg leading-relaxed">Join students already learning SQL and Azure with Ahmed. 365Academy is free to access, supported by donations from learners like you.</p>
          <Link href="/courses" className="inline-flex items-center gap-2 bg-[#00e5ff] text-black font-semibold px-10 py-4 rounded-lg text-lg hover:bg-[#00c4db] transition-all hover:-translate-y-0.5 shadow-[0_0_30px_rgba(0,229,255,0.25)]">
            Browse Free Courses →
          </Link>
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
