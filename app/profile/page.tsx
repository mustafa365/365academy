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
    <main className="min-h-screen bg-[#0a0a0f] text-[#fafafa]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1c1c2a] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#7c3aed] shadow-[0_0_12px_#7c3aed] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <Link href="/dashboard" className="text-[#71717a] hover:text-white text-sm transition-colors">← Dashboard</Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6 max-w-3xl mx-auto">
        {/* Profile hero */}
        <div className="bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#7c3aed]" />
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7c3aed]/20 to-[#a855f7]/20 border-2 border-[#7c3aed]/40 flex items-center justify-center text-3xl font-black text-[#a78bfa]">
              {user.name?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-black">{user.name ?? "Player"}</h1>
              <p className="text-[#71717a] text-sm">{user.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-mono px-2 py-1 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#a78bfa]">
                  Level {level} · {title}
                </span>
                <span className="text-xs font-mono text-[#71717a]">
                  Member since {new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2 text-xs font-mono text-[#71717a]">
              <span>{current} / {needed} XP to Level {level + 1}</span>
              <span>{user.totalXP.toLocaleString()} total XP</span>
            </div>
            <div className="h-3 bg-[#0a0a0f] rounded-full border border-[#1c1c2a] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total XP", value: user.totalXP.toLocaleString(), icon: "⚡", color: "text-[#a78bfa]" },
            { label: "Lessons Done", value: user.lessonProgress.filter(p => p.completed).length, icon: "📚", color: "text-[#7c3aed]" },
            { label: "Quizzes Passed", value: passedQuizzes, icon: "✅", color: "text-emerald-400" },
            { label: "Avg Quiz Score", value: `${avgScore}%`, icon: "🎯", color: "text-yellow-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#0d0d15] border border-[#1c1c2a] rounded-xl p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[#71717a] text-xs font-mono mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl p-6 mb-6">
          <h2 className="font-black text-lg mb-5">🏅 Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BADGES.map((badge) => {
              const earned = earnedBadgeIds.has(badge.name);
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl p-4 text-center border transition-all ${earned ? "bg-[#0a0a0f] border-[#7c3aed]/20" : "opacity-30 bg-[#0a0a0f] border-[#1c1c2a]"}`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="text-xs font-bold">{badge.name}</div>
                  <div className="text-[#71717a] text-xs mt-1">{badge.description}</div>
                  {earned && <div className="text-[#a78bfa] text-xs mt-2 font-mono">✓ Earned</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* XP History */}
        <div className="bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl p-6">
          <h2 className="font-black text-lg mb-5">⚡ XP History</h2>
          {user.xpLogs.length === 0 ? (
            <p className="text-[#71717a] text-sm">No XP earned yet — start a lesson!</p>
          ) : (
            <div className="space-y-2">
              {user.xpLogs.map((log) => (
                <div key={log.id} className="flex justify-between items-center py-2 border-b border-[#1c1c2a] last:border-0">
                  <span className="text-sm text-[#b8c5d6]">{log.reason}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#a78bfa] font-mono font-bold text-sm">+{log.amount} XP</span>
                    <span className="text-[#3f3f50] text-xs font-mono">
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
