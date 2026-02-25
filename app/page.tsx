"use client";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const letterReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease } },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4] overflow-x-hidden">

      {/* ANNOUNCEMENT BANNER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0e1420] border-b border-[#1e2d42] py-2 px-4 text-center text-xs text-[#6b7d95] font-mono tracking-wide">
        ✦ &nbsp; 365Academy is completely free — built to serve those willing to learn and grow their tech careers &nbsp; ✦
      </div>

      {/* NAV */}
      <nav className="fixed top-8 left-0 right-0 z-40 border-b border-[#1e2d42] bg-[#080c10]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_12px_#00e5ff] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/donate" className="inline-flex items-center gap-2 text-[#f97373] text-sm font-semibold px-3 py-1.5 rounded-full border border-[#f97373]/40 bg-[#f97373]/10 hover:bg-[#f97373]/20 transition-all">
              ❤️ Donate
            </Link>
            <Link href="/courses" className="text-[#6b7d95] hover:text-white text-sm transition-colors">Courses</Link>
            <Link href="/login" className="bg-[#00e5ff] text-black text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#00c4db] transition-all hover:-translate-y-0.5">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-start justify-center pt-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 30% 50%, black, transparent)",
        }} />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00e5ff]/5 blur-[120px] pointer-events-none" />

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 w-full">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#00e5ff]/8 border border-[#00e5ff]/20 text-[#00e5ff] px-4 py-1.5 rounded-full text-xs font-mono mb-10">
            ✦ &nbsp; Free forever. No credit card. No catch.
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1 variants={letterReveal} className="text-[clamp(4rem,14vw,12rem)] font-black tracking-tighter leading-none text-white">
              LEARN
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1 variants={letterReveal} className="text-[clamp(4rem,14vw,12rem)] font-black tracking-tighter leading-none text-[#00e5ff]">
              SQL &amp;
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h1 variants={letterReveal} className="text-[clamp(4rem,14vw,12rem)] font-black tracking-tighter leading-none text-[#6b7d95]">
              AZURE.
            </motion.h1>
          </div>

          <motion.div variants={fadeUp} className="flex items-center gap-6 flex-wrap">
            <Link href="/courses" className="group relative inline-flex items-center gap-3 bg-[#00e5ff] text-black font-black px-8 py-4 rounded-xl text-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,229,255,0.3)]">
              <span className="relative z-10">Start Learning</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link href="/courses" className="text-[#6b7d95] hover:text-white text-sm font-mono transition-colors underline underline-offset-4">
              Browse courses ↓
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#3a4a5c] text-xs font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[#3a4a5c] to-transparent"
          />
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-[#1e2d42] py-4 overflow-hidden bg-[#0e1420]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {["SQL", "Azure", "Free Forever", "Beginner Friendly", "AZ-104 Prep", "Career Focused", "Interactive Exercises", "Leaderboard"].map((t) => (
                <span key={t} className="text-[#3a4a5c] text-sm font-mono tracking-widest uppercase flex items-center gap-12">
                  {t} <span className="text-[#00e5ff] ml-12">✦</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* COURSES */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-14"
        >
          <p className="text-[#6b7d95] text-xs font-mono tracking-widest uppercase mb-3">// Courses</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">Two courses.<br /><span className="text-[#00e5ff]">Two careers.</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { href: "/courses/sql", emoji: "🗄️", tag: "SQL", title: "SQL from Zero to Hero", desc: "Master databases from scratch. SELECT, JOIN, indexes, and real-world design.", gradient: "from-[#001a2e] via-[#002a3e] to-[#00395a]", glow: "rgba(0,229,255,0.15)" },
            { href: "/courses/azure", emoji: "☁️", tag: "Azure", title: "Azure Admin Zero to Hero", desc: "Go from zero to cloud pro. Full AZ-104 certification prep included.", gradient: "from-[#001020] via-[#001535] to-[#001f4a]", glow: "rgba(0,180,255,0.15)" },
          ].map((course, i) => (
            <motion.div
              key={course.tag}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.2, ease }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <Link href={course.href} className="group block bg-[#0e1420] border border-[#1e2d42] rounded-2xl overflow-hidden relative" style={{ boxShadow: "0 0 0 rgba(0,229,255,0)" }}>
                {/* Glow border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ boxShadow: `0 0 40px ${course.glow}, inset 0 0 40px ${course.glow}` }}
                />

                {/* Card image */}
                <div className={`h-52 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative overflow-hidden`}>
                  {/* Animated background shimmer */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${course.glow} 0%, transparent 70%)` }}
                  />
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: i * 0.5 }}
                    whileHover={{ scale: 1.3, rotate: -8 }}
                    className="text-7xl relative z-10 drop-shadow-lg"
                  >
                    {course.emoji}
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1420]/80 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 + 0.4 }}
                    className="absolute bottom-4 left-6 text-xs font-mono text-[#00e5ff] tracking-widest"
                  >
                    // {course.tag}
                  </motion.div>
                  <div className="absolute top-4 right-4 text-xs font-mono font-bold px-3 py-1 rounded-full border text-emerald-400 bg-emerald-400/10 border-emerald-400/30">
                    Beginner
                  </div>
                </div>

                {/* Card body */}
                <div className="p-8">
                  <motion.h3
                    className="text-2xl font-black mb-3 transition-colors duration-300 group-hover:text-[#00e5ff]"
                  >
                    {course.title}
                  </motion.h3>
                  <p className="text-[#6b7d95] text-sm leading-relaxed mb-8">{course.desc}</p>
                  <div className="flex items-center justify-between border-t border-[#1e2d42] pt-5">
                    <span className="text-3xl font-black text-[#00e5ff]">Free</span>
                    <motion.span
                      className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] group-hover:bg-[#00e5ff] group-hover:text-black transition-all duration-300"
                    >
                      Start Learning
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >→</motion.span>
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1e2d42] py-10 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="text-[#6b7d95] text-sm font-mono">© 2025 365Academy</div>
          <div className="flex gap-6 text-sm text-[#6b7d95]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <Link href="/donate" className="hover:text-white transition-colors">Donate</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
