"use client";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { LiquidCursor } from "@/components/LiquidCursor";

// ─── Easings ────────────────────────────────────────────────────────────────
const springOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Variants ───────────────────────────────────────────────────────────────
const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: springOut } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 38 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Course catalogue ────────────────────────────────────────────────────────
type CourseEntry = {
  emoji: string;
  tag: string;
  title: string;
  desc: string;
  badge: string;
  pills: string[];
  href: string;
  live: boolean;
  floatDelay: number;
};

const ALL_COURSES: CourseEntry[] = [
  {
    emoji: "🐍",
    tag: "Python",
    title: "Python Zero to Hero",
    desc: "Go from your first print() to real-world scripts, automation, and data analysis. The most in-demand language for beginners.",
    badge: "Beginner Friendly",
    pills: ["beginner", "scripting", "automation"],
    href: "/courses/python",
    live: false,
    floatDelay: 0,
  },
  {
    emoji: "🗄️",
    tag: "SQL",
    title: "SQL Zero to Hero",
    desc: "Master databases from scratch — SELECT, JOIN, indexes, views, and real-world database design used at top companies.",
    badge: "Beginner Friendly",
    pills: ["beginner", "50+ lessons", "interactive exercises"],
    href: "/courses/sql",
    live: true,
    floatDelay: 0.5,
  },
  {
    emoji: "☁️",
    tag: "Azure",
    title: "Azure Admin Zero to Hero",
    desc: "Go from zero to cloud pro. Full AZ-104 certification prep with hands-on Azure scenarios and real-world case studies.",
    badge: "AZ-104 Prep",
    pills: ["intermediate", "certification", "hands-on labs"],
    href: "/courses/azure",
    live: true,
    floatDelay: 1.0,
  },
  {
    emoji: "🐧",
    tag: "Linux",
    title: "Linux Zero to Hero",
    desc: "Learn the OS that powers the cloud. File systems, permissions, bash scripting, and networking — everything a DevOps engineer needs.",
    badge: "CompTIA Linux+",
    pills: ["intermediate", "bash scripting", "DevOps essential"],
    href: "/courses/linux",
    live: false,
    floatDelay: 1.5,
  },
  {
    emoji: "⚡",
    tag: "PowerShell",
    title: "PowerShell Zero to Hero",
    desc: "Automate Windows and Azure like a pro. Scripts, modules, and pipelines that save hours of manual work — built for admins.",
    badge: "Windows / Azure",
    pills: ["intermediate", "automation", "Azure integration"],
    href: "/courses/powershell",
    live: false,
    floatDelay: 2.0,
  },
  {
    emoji: "🔐",
    tag: "Security",
    title: "Cybersecurity Zero to Hero",
    desc: "Protect systems, detect threats, and think like an attacker. Covers the full CompTIA Security+ syllabus from absolute zero.",
    badge: "Security+",
    pills: ["intermediate", "CompTIA Security+", "threat analysis"],
    href: "/courses/cybersecurity",
    live: false,
    floatDelay: 2.5,
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const [scrollY,   setScrollY]   = useState(0);
  const [viewportH, setViewportH] = useState(800);

  useEffect(() => {
    setViewportH(window.innerHeight);
    const handler = () => {
      setScrollY(window.scrollY);
      setViewportH(window.innerHeight);
    };
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler, { passive: true });
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  const scrolled = scrollY > 24;
  const inHero   = scrollY < viewportH * 0.72;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#e8e8f0] overflow-x-hidden">

      {/* ── Liquid cursor ───────────────────────────────────────────────── */}
      <LiquidCursor />

      {/* ── ANNOUNCEMENT BANNER ─────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 py-2 px-4 text-center text-xs font-mono tracking-wide border-b backdrop-blur-sm"
        style={{
          backgroundColor:   inHero ? "rgba(255,255,255,0.65)" : "rgba(10,10,15,0.92)",
          borderBottomColor: inHero ? "rgba(230,232,238,0.85)" : "rgba(28,28,42,0.9)",
          color:             inHero ? "#5E6577"                 : "#71717a",
          transition:        "background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease",
        }}
      >
        ✦ &nbsp; All courses are completely free — no credit card, no catch &nbsp; ✦
      </div>

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <motion.nav
        className="fixed top-8 left-0 right-0 z-40"
        animate={{
          backgroundColor: scrolled
            ? "rgba(10,10,15,0.92)"
            : inHero ? "rgba(255,255,255,0.12)" : "rgba(10,10,15,0)",
          borderBottomColor: scrolled
            ? "rgba(28,28,42,0.9)"
            : inHero ? "rgba(230,232,238,0.55)" : "rgba(28,28,42,0)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.45)" : "0 0 0 transparent",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center text-xs font-black text-white transition-transform duration-200 group-hover:scale-110">
              3
            </div>
            <span
              className="font-bold text-base tracking-tight"
              style={{ color: inHero && !scrolled ? "#0F1115" : "#fafafa", transition: "color 0.4s ease" }}
            >
              365Academy
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Courses",     href: "/courses"     },
              { label: "Leaderboard", href: "/leaderboard" },
              { label: "Donate",      href: "/donate"      },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="relative text-sm pb-0.5 group"
                style={{ color: inHero && !scrolled ? "#5E6577" : "#71717a", transition: "color 0.4s ease" }}
              >
                {label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#7c3aed] group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_8px_28px_rgba(124,58,237,0.45)]"
              >
                Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm px-3 py-2"
                  style={{ color: inHero && !scrolled ? "#5E6577" : "#71717a", transition: "color 0.4s ease" }}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_8px_28px_rgba(124,58,237,0.45)]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[72vh] flex items-center pt-36 pb-24 px-6"
        style={{
          background: "linear-gradient(to bottom, #E9EAED 0%, #B8C0D6 35%, #6F7DB3 60%, #1C2451 80%, #0A0F2A 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div initial="hidden" animate="show" variants={heroStagger}>

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-xs font-mono mb-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.42)",
                borderColor:     "rgba(28,36,81,0.18)",
                color:           "#1C2451",
                backdropFilter:  "blur(8px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C2451] animate-pulse" />
              6 courses · 100+ lessons · 100% free
            </motion.div>

            <div className="mb-6 space-y-1">
              <div className="overflow-hidden">
                <motion.h1
                  variants={wordReveal}
                  className="text-[clamp(2.6rem,5.5vw,4.4rem)] font-black tracking-tight leading-[1.1]"
                  style={{ color: "#0F1115" }}
                >
                  Choose your path.
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  variants={wordReveal}
                  className="text-[clamp(2.6rem,5.5vw,4.4rem)] font-black tracking-tight leading-[1.1] bg-gradient-to-r from-[#1C2451] to-[#6F7DB3] bg-clip-text text-transparent"
                >
                  Launch your career.
                </motion.h1>
              </div>
            </div>

            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: "#5E6577" }}
            >
              Six zero-to-hero courses built around the skills employers actually
              hire for. Pick one and start today — no credit card, no catch.
            </motion.p>

          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-mono tracking-widest" style={{ color: "#5E6577" }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-7 bg-gradient-to-b from-[#5E6577] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────── */}
      <div className="border-y border-[#1c1c2a] bg-[#0d0d15] py-8">
        <motion.div
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { num: "6",    label: "Courses"            },
            { num: "100+", label: "Lessons"            },
            { num: "100%", label: "Free"               },
            { num: "∞",    label: "Practice exercises" },
          ].map((s) => (
            <motion.div key={s.label} variants={listItem} className="text-center">
              <div className="text-3xl font-black text-[#fafafa] mb-1">{s.num}</div>
              <div className="text-sm text-[#71717a]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── COURSES GRID ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-[#7c3aed] tracking-widest uppercase mb-4">All Courses</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#fafafa]">
            Six courses.<br />
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">
              One career goal.
            </span>
          </h2>
          <p className="text-[#71717a] mt-4 text-sm">
            Live courses are available now. Coming Soon courses are in production — drop your email on the{" "}
            <Link href="/" className="text-[#a78bfa] hover:text-[#7c3aed] transition-colors">homepage</Link>{" "}
            to be notified.
          </p>
        </motion.div>

        <motion.div
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ALL_COURSES.map((course) => {
            const card = (
              <div
                className={`group block bg-[#0d0d15] border rounded-2xl overflow-hidden transition-all duration-300 h-full ${
                  course.live
                    ? "border-[#1c1c2a] hover:border-[#7c3aed]/40 hover:shadow-[0_24px_70px_rgba(124,58,237,0.15)] cursor-pointer"
                    : "border-[#1c1c2a]/60 opacity-75 cursor-default"
                }`}
              >
                {/* Card header */}
                <div
                  className="h-40 relative overflow-hidden flex items-center justify-center"
                  style={{
                    background: course.live
                      ? "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.14) 0%, transparent 70%), #111118"
                      : "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%), #0d0d15",
                  }}
                >
                  <motion.span
                    animate={course.live ? { y: [0, -6, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: course.floatDelay }}
                    className="text-5xl select-none"
                    style={{ opacity: course.live ? 1 : 0.55 }}
                  >
                    {course.emoji}
                  </motion.span>

                  {/* Badge — top right */}
                  {course.live ? (
                    <div className="absolute top-4 right-4 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#7c3aed]/30 text-[#a78bfa] bg-[#7c3aed]/10">
                      {course.badge}
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#f59e0b]/30 text-[#f59e0b] bg-[#f59e0b]/10">
                      Coming Soon
                    </div>
                  )}

                  {/* Live dot — top left */}
                  {course.live && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                      <span className="text-[10px] font-mono text-[#22c55e]">Live</span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col h-[calc(100%-10rem)]">
                  <p className="text-[10px] font-mono text-[#7c3aed] tracking-widest mb-2">// {course.tag}</p>
                  <h3 className={`text-lg font-black mb-2 transition-colors duration-200 ${course.live ? "text-[#fafafa] group-hover:text-[#a78bfa]" : "text-[#6b6b7a]"}`}>
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#71717a] leading-relaxed mb-5 flex-1">{course.desc}</p>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.pills.map((p) => (
                      <span key={p} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1c1c2a] text-[#71717a]">
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1c1c2a]">
                    <span className={`text-xl font-black ${course.live ? "text-[#7c3aed]" : "text-[#3f3f50]"}`}>Free</span>
                    {course.live ? (
                      <span className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-[#a78bfa] group-hover:bg-[#7c3aed] group-hover:text-white transition-all duration-300">
                        Start Learning →
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-[#1c1c2a] border border-[#2d2d3e] text-[#3f3f50]">
                        Notify Me
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div
                key={course.href}
                variants={listItem}
                whileHover={course.live ? { y: -8, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } } : {}}
                className="h-full"
              >
                {course.live ? (
                  <Link href={course.href} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── FOOTER CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] rounded-full bg-[#7c3aed]/10 blur-[80px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 text-[#fafafa]">
            Ready to start your<br />
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">
              tech career?
            </span>
          </h2>
          <p className="text-[#71717a] mb-9 text-lg">
            Pick a course above and go from zero to job-ready — completely free.
          </p>
          <Link
            href={isLoggedIn ? "/dashboard" : "/register"}
            className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-9 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:shadow-[0_20px_60px_rgba(124,58,237,0.5)]"
          >
            {isLoggedIn ? "Go to Dashboard" : "Get Started — It's Free"} <span>→</span>
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1c1c2a] py-10 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center text-xs font-black text-white">
              3
            </div>
            <span className="text-sm font-bold text-[#fafafa]">365Academy</span>
            <span className="text-[#3f3f50] text-sm ml-4">© 2025</span>
          </div>
          <div className="flex gap-6 text-sm text-[#71717a]">
            <a href="#" className="hover:text-[#fafafa] transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-[#fafafa] transition-colors duration-200">Terms</a>
            <Link href="/donate" className="hover:text-[#fafafa] transition-colors duration-200">Donate</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
