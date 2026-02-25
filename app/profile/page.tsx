import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { levelFromXp, xpProgressInLevel, getLevelTitle } from "@/lib/xp";
import { BADGES } from "@/lib/xp";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      lessonProgress: true,
      quizAttempts: { orderBy: { completedAt: "desc" } },
      userBadges: { include: { badge: true } },
      xpLogs: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  });

  if (!user) redirect("/login");

  const level = levelFromXp(user.totalXP);
  const { current, needed, percent } = xpProgressInLevel(user.totalXP);
  const title = getLevelTitle(level);
  const earnedBadgeIds = new Set(user.userBadges.map((ub) => ub.badge.name));
  const passedQuizzes = user.quizAttempts.filter((a) => a.passed).length;
  const avgScore = user.quizAttempts.length
    ? Math.round(user.quizAttempts.reduce((sum, a) => sum + a.score, 0) / user.quizAttempts.length)
    : 0;

  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2d42] bg-[#080c10]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_12px_#00e5ff] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <Link href="/dashboard" className="text-[#6b7d95] hover:text-white text-sm transition-colors">← Dashboard</Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6 max-w-3xl mx-auto">
        {/* Profile hero */}
        <div className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00e5ff] via-[#7c3aed] to-[#00e5ff]" />
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#7c3aed]/20 border-2 border-[#00e5ff]/40 flex items-center justify-center text-3xl font-black text-[#00e5ff]">
              {user.name?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-black">{user.name ?? "Player"}</h1>
              <p className="text-[#6b7d95] text-sm">{user.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-mono px-2 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff]">
                  Level {level} · {title}
                </span>
                <span className="text-xs font-mono text-[#6b7d95]">
                  Member since {new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2 text-xs font-mono text-[#6b7d95]">
              <span>{current} / {needed} XP to Level {level + 1}</span>
              <span>{user.totalXP.toLocaleString()} total XP</span>
            </div>
            <div className="h-3 bg-[#080c10] rounded-full border border-[#1e2d42] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total XP", value: user.totalXP.toLocaleString(), icon: "⚡", color: "text-[#00e5ff]" },
            { label: "Lessons Done", value: user.lessonProgress.filter(p => p.completed).length, icon: "📚", color: "text-[#7c3aed]" },
            { label: "Quizzes Passed", value: passedQuizzes, icon: "✅", color: "text-emerald-400" },
            { label: "Avg Quiz Score", value: `${avgScore}%`, icon: "🎯", color: "text-yellow-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#0e1420] border border-[#1e2d42] rounded-xl p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[#6b7d95] text-xs font-mono mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-6 mb-6">
          <h2 className="font-black text-lg mb-5">🏅 Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BADGES.map((badge) => {
              const earned = earnedBadgeIds.has(badge.name);
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl p-4 text-center border transition-all ${earned ? "bg-[#080c10] border-[#00e5ff]/20" : "opacity-30 bg-[#080c10] border-[#1e2d42]"}`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="text-xs font-bold">{badge.name}</div>
                  <div className="text-[#6b7d95] text-xs mt-1">{badge.description}</div>
                  {earned && <div className="text-[#00e5ff] text-xs mt-2 font-mono">✓ Earned</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* XP History */}
        <div className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-6">
          <h2 className="font-black text-lg mb-5">⚡ XP History</h2>
          {user.xpLogs.length === 0 ? (
            <p className="text-[#6b7d95] text-sm">No XP earned yet — start a lesson!</p>
          ) : (
            <div className="space-y-2">
              {user.xpLogs.map((log) => (
                <div key={log.id} className="flex justify-between items-center py-2 border-b border-[#1e2d42] last:border-0">
                  <span className="text-sm text-[#b8c5d6]">{log.reason}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#00e5ff] font-mono font-bold text-sm">+{log.amount} XP</span>
                    <span className="text-[#3a4a5c] text-xs font-mono">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
