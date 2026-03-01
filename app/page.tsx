"use client";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
  show: { transition: { staggerChildren: 0.13 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 38 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Static data ────────────────────────────────────────────────────────────
const STEPS = [
  { num: "01", title: "Create your free account",  desc: "Sign up in seconds — no credit card needed." },
  { num: "02", title: "Pick your course",           desc: "Start with SQL fundamentals or jump into Azure cloud." },
  { num: "03", title: "Learn & practice",           desc: "Interactive lessons with real exercises in your browser." },
  { num: "04", title: "Earn XP & level up",         desc: "Pass quizzes, earn badges, and track your career progress." },
];

const FEATURES = [
  { icon: "🆓", title: "Free. Forever.",       desc: "No paywalls, no premium tiers, no upsells. Every lesson, quiz, and exercise is free for everyone." },
  { icon: "💻", title: "Interactive Practice", desc: "Run real SQL directly in your browser with our WASM-powered editor. No setup, no accounts, just code." },
  { icon: "🎯", title: "Career Focused",       desc: "Every lesson is built around skills employers hire for — not textbook theory, but real-world application." },
];

const FAQS = [
  { q: "Is 365Academy really free?",                    a: "Yes, completely free. No credit card, no premium tiers, no hidden fees. Every lesson, exercise, and quiz is available to everyone." },
  { q: "Do I need prior experience?",                   a: "No. Both courses start from absolute zero. The SQL course assumes no database knowledge, and the Azure course starts from cloud fundamentals." },
  { q: "Will this help me get a job?",                  a: "Absolutely. The courses are career-focused — built around the skills employers actually hire for, with real-world scenarios from industry professionals." },
  { q: "What is the XP and level system?",              a: "You earn XP by completing lessons and passing quizzes. XP unlocks levels and badges on your profile, and you can compete on the global leaderboard." },
  { q: "What certifications does this prepare me for?", a: "The Azure course covers the full AZ-104 (Azure Administrator) exam syllabus. The SQL course prepares you for database roles and interviews." },
];

// ─── Dashboard Mockup ────────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div className="w-full bg-[#111118] border border-[#1c1c2a] rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.65)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1c1c2a] bg-[#0d0d15]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[10px] text-[#3f3f50] font-mono tracking-wide">
            365academy.vercel.app/dashboard
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Welcome + XP */}
        <div className="mb-5">
          <p className="text-[11px] text-[#71717a] mb-0.5">Welcome back,</p>
          <p className="text-sm font-bold text-[#fafafa] mb-3">Ahmed 👋</p>
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] text-[#71717a] font-mono">Level 4 — SQL Ninja</span>
            <span className="text-[10px] text-[#a78bfa] font-mono">2,400 / 3,500 XP</span>
          </div>
          <div className="h-1.5 bg-[#1c1c2a] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.3, delay: 0.7, ease: springOut }}
            />
          </div>
        </div>

        {/* Course bars */}
        <div className="space-y-2.5 mb-4">
          {[
            { name: "SQL from Zero to Hero",        progress: 72, emoji: "🗄️" },
            { name: "Azure Admin Zero to Hero",     progress: 34, emoji: "☁️" },
          ].map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85 + i * 0.18, duration: 0.45, ease: "easeOut" }}
              className="flex items-center gap-3 bg-[#0d0d15] border border-[#1c1c2a] rounded-xl p-3"
            >
              <span className="text-base">{c.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-[#e8e8f0] truncate mb-1.5">{c.name}</p>
                <div className="h-1 bg-[#1c1c2a] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#7c3aed] to-[#c084fc] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${c.progress}%` }}
                    transition={{ duration: 1.1, delay: 1.05 + i * 0.18, ease: springOut }}
                  />
                </div>
              </div>
              <span className="text-[10px] text-[#71717a] flex-shrink-0 font-mono">{c.progress}%</span>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { val: "24", label: "Lessons" },
            { val: "8",  label: "Quizzes" },
            { val: "#12", label: "Rank"   },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.25 + i * 0.1, duration: 0.4, ease: "easeOut" }}
              className="bg-[#0d0d15] border border-[#1c1c2a] rounded-xl p-3 text-center"
            >
              <div className="text-sm font-black text-[#a78bfa]">{s.val}</div>
              <div className="text-[10px] text-[#71717a] mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Track scroll position to adapt navbar / banner between light hero & dark page
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

  // inHero = still over the light-gradient hero section (approx. top 72% of viewport height)
  const scrolled = scrollY > 24;
  const inHero   = scrollY < viewportH * 0.72;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#e8e8f0] overflow-x-hidden">

      {/* ── Liquid cursor (desktop only, disabled on touch) ────────────── */}
      <LiquidCursor />

      {/* ── ANNOUNCEMENT BANNER ─────────────────────────────────────────── */}
      {/* Transitions between light (hero) and dark (rest of page) */}
      <div
        className="fixed top-0 left-0 right-0 z-50 py-2 px-4 text-center text-xs font-mono tracking-wide border-b backdrop-blur-sm"
        style={{
          backgroundColor:   inHero ? "rgba(255,255,255,0.65)" : "rgba(10,10,15,0.92)",
          borderBottomColor: inHero ? "rgba(230,232,238,0.85)" : "rgba(28,28,42,0.9)",
          color:             inHero ? "#5E6577"                 : "#71717a",
          transition:        "background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease",
        }}
      >
        ✦ &nbsp; 365Academy is completely free — built to help you launch your tech career &nbsp; ✦
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
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.45)"
            : "0 0 0 transparent",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center text-xs font-black text-white transition-transform duration-200 group-hover:scale-110">
              3
            </div>
            <span
              className="font-bold text-base tracking-tight"
              style={{
                color:      inHero && !scrolled ? "#0F1115" : "#fafafa",
                transition: "color 0.4s ease",
              }}
            >
              365Academy
            </span>
          </Link>

          {/* Nav links with animated underline */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Courses",      href: "/courses"      },
              { label: "Leaderboard",  href: "/leaderboard"  },
              { label: "Donate",       href: "/donate"       },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="relative text-sm pb-0.5 group"
                style={{
                  color:      inHero && !scrolled ? "#5E6577" : "#71717a",
                  transition: "color 0.4s ease",
                }}
              >
                {label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#7c3aed] group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
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
                  style={{
                    color:      inHero && !scrolled ? "#5E6577" : "#71717a",
                    transition: "color 0.4s ease",
                  }}
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
        className="relative min-h-screen flex items-center pt-32 pb-20 px-6"
        style={{
          background: "linear-gradient(to bottom, #E9EAED 0%, #B8C0D6 35%, #6F7DB3 60%, #1C2451 80%, #0A0F2A 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left — Text content */}
            <motion.div initial="hidden" animate="show" variants={heroStagger}>

              {/* Badge */}
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
                Free forever · No credit card · No catch
              </motion.div>

              {/* Headline — each line clips upward */}
              <div className="mb-6 space-y-1">
                <div className="overflow-hidden">
                  <motion.h1
                    variants={wordReveal}
                    className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight leading-[1.1]"
                    style={{ color: "#0F1115" }}
                  >
                    The fastest way to
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    variants={wordReveal}
                    className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tight leading-[1.1] bg-gradient-to-r from-[#1C2451] to-[#6F7DB3] bg-clip-text text-transparent"
                  >
                    launch your tech career
                  </motion.h1>
                </div>
              </div>

              {/* Subtext */}
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-10 max-w-lg"
                style={{ color: "#5E6577" }}
              >
                Master SQL and Azure through hands-on lessons, interactive exercises,
                and real-world scenarios — completely free.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
                <Link
                  href={isLoggedIn ? "/dashboard" : "/register"}
                  className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(124,58,237,0.45)]"
                >
                  Start Learning Free <span>→</span>
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.28)",
                    borderColor:     "rgba(28,36,81,0.22)",
                    color:           "#1C2451",
                  }}
                >
                  Browse Courses
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — floating dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: springOut }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              >
                <DashboardMockup />
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
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
            { num: "2",    label: "Courses"            },
            { num: "50+",  label: "Lessons"            },
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

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="py-28 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-[#7c3aed] tracking-widest uppercase mb-4">How it works</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#fafafa]">
            Four steps to your<br />
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">
              first tech job
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              variants={listItem}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
              className="relative bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl p-7 hover:border-[#7c3aed]/40 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)] transition-colors duration-200 group cursor-default"
            >
              <div className="text-xs font-mono text-[#7c3aed]/50 mb-5 tracking-widest">{step.num}</div>
              <h3 className="text-base font-bold text-[#fafafa] mb-2 group-hover:text-[#a78bfa] transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-sm text-[#71717a] leading-relaxed">{step.desc}</p>
              {i < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 z-10 text-[#2d2d3e] text-sm font-black">→</div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── COURSES ─────────────────────────────────────────────────────── */}
      <section className="pb-28 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-[#7c3aed] tracking-widest uppercase mb-4">Courses</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#fafafa]">
            Two courses.<br />
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">
              Two career paths.
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              href: "/courses/sql",   emoji: "🗄️", tag: "SQL",
              title: "SQL from Zero to Hero",
              desc:  "Master databases from scratch. SELECT, JOIN, indexes, views, and real-world database design.",
              badge: "Beginner Friendly",
            },
            {
              href: "/courses/azure", emoji: "☁️", tag: "Azure",
              title: "Azure Admin Zero to Hero",
              desc:  "Go from zero to cloud pro. Full AZ-104 certification prep with hands-on Azure scenarios.",
              badge: "AZ-104 Prep",
            },
          ].map((course, i) => (
            <motion.div
              key={course.tag}
              variants={listItem}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
            >
              <Link
                href={course.href}
                className="group block bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl overflow-hidden hover:border-[#7c3aed]/40 hover:shadow-[0_24px_70px_rgba(124,58,237,0.15)] transition-all duration-300"
              >
                <div
                  className="h-44 relative overflow-hidden flex items-center justify-center"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.14) 0%, transparent 70%), #111118" }}
                >
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: i * 0.6 }}
                    className="text-6xl select-none"
                  >
                    {course.emoji}
                  </motion.span>
                  <div className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full border border-[#7c3aed]/30 text-[#a78bfa] bg-[#7c3aed]/10">
                    {course.badge}
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-xs font-mono text-[#7c3aed] tracking-widest mb-3">// {course.tag}</p>
                  <h3 className="text-xl font-black text-[#fafafa] mb-2 group-hover:text-[#a78bfa] transition-colors duration-200">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#71717a] leading-relaxed mb-7">{course.desc}</p>
                  <div className="flex items-center justify-between pt-5 border-t border-[#1c1c2a]">
                    <span className="text-2xl font-black text-[#7c3aed]">Free</span>
                    <span className="text-sm font-semibold px-4 py-2 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-[#a78bfa] group-hover:bg-[#7c3aed] group-hover:text-white transition-all duration-300">
                      Start Learning →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── WHY 365ACADEMY ──────────────────────────────────────────────── */}
      <section className="pb-28 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-[#7c3aed] tracking-widest uppercase mb-4">Why us</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#fafafa]">
            Built different.<br />
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">
              Built for you.
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {FEATURES.map((feat) => (
            <motion.div
              key={feat.title}
              variants={listItem}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
              className="bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl p-8 hover:border-[#7c3aed]/30 hover:shadow-[0_20px_60px_rgba(124,58,237,0.1)] transition-colors duration-200 group"
            >
              <div className="text-3xl mb-5 inline-block group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-[#fafafa] mb-2 group-hover:text-[#a78bfa] transition-colors duration-200">
                {feat.title}
              </h3>
              <p className="text-sm text-[#71717a] leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="pb-28 px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-[#7c3aed] tracking-widest uppercase mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#fafafa]">Got questions?</h2>
        </motion.div>

        <motion.div
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              variants={listItem}
              className="bg-[#0d0d15] border border-[#1c1c2a] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#111118] transition-colors duration-200 group"
              >
                <span className="text-sm font-semibold text-[#fafafa] group-hover:text-[#a78bfa] transition-colors duration-200">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#7c3aed] text-xl font-light ml-4 flex-shrink-0"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <div className="px-6 pb-5 pt-4 text-sm text-[#71717a] leading-relaxed border-t border-[#1c1c2a]">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
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
            Join thousands learning SQL and Azure for free. No credit card, no commitment.
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
