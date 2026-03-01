import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { levelFromXp, getLevelTitle } from "@/lib/xp";

export default async function LeaderboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const users = await prisma.user.findMany({
    orderBy: { totalXP: "desc" },
    take: 20,
    select: {
      id: true,
      name: true,
      totalXP: true,
      level: true,
      _count: { select: { lessonProgress: true } },
    },
  });

  const currentUserId = session.user.id;

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
        <div className="mb-10">
          <div className="text-[#71717a] text-xs font-mono mb-2">// Rankings</div>
          <h1 className="text-4xl font-black tracking-tight">Leaderboard 🏆</h1>
          <p className="text-[#71717a] mt-2">Top learners by XP earned</p>
        </div>

        {/* Top 3 podium */}
        {users.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[1, 0, 2].map((idx) => {
              const u = users[idx];
              if (!u) return null;
              const rank = idx + 1;
              const medals = ["🥇", "🥈", "🥉"];
              const heights = ["h-36", "h-28", "h-24"];
              const isYou = u.id === currentUserId;
              return (
                <div key={u.id} className={`flex flex-col items-center ${idx === 0 ? "order-2" : idx === 1 ? "order-1" : "order-3"}`}>
                  <div className="text-3xl mb-2">{medals[rank - 1]}</div>
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl mb-2 border-2 ${isYou ? "border-[#7c3aed] bg-[#7c3aed]/20 text-[#a78bfa]" : "border-[#1c1c2a] bg-[#0d0d15] text-white"}`}
                  >
                    {u.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="font-bold text-sm text-center truncate w-full px-2">{u.name ?? "Player"}{isYou ? " (you)" : ""}</div>
                  <div className="text-[#a78bfa] font-mono text-xs mt-1">{u.totalXP.toLocaleString()} XP</div>
                  <div className={`mt-2 bg-[#0d0d15] border border-[#1c1c2a] rounded-t-xl w-full ${heights[rank - 1]} flex items-center justify-center`}>
                    <span className="text-[#71717a] text-xs font-mono">#{rank}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Full list */}
        <div className="bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 border-b border-[#1c1c2a] text-xs font-mono text-[#71717a] uppercase tracking-widest">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-3 text-right">XP</div>
            <div className="col-span-3 text-right">Level</div>
          </div>
          {users.map((u, i) => {
            const lvl = levelFromXp(u.totalXP);
            const title = getLevelTitle(lvl);
            const isYou = u.id === currentUserId;
            return (
              <div
                key={u.id}
                className={`grid grid-cols-12 px-6 py-4 border-b border-[#1c1c2a] last:border-0 items-center ${isYou ? "bg-[#7c3aed]/5" : "hover:bg-[#0a0a0f]"} transition-colors`}
              >
                <div className="col-span-1 font-mono font-bold text-[#71717a]">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${isYou ? "border-[#7c3aed]/40 bg-[#7c3aed]/10 text-[#a78bfa]" : "border-[#1c1c2a] bg-[#0a0a0f] text-white"}`}>
                    {u.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{u.name ?? "Player"}{isYou ? <span className="text-[#a78bfa] text-xs ml-2">(you)</span> : null}</div>
                    <div className="text-[#71717a] text-xs">{u._count.lessonProgress} lessons</div>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="font-mono font-bold text-[#a78bfa]">{u.totalXP.toLocaleString()}</div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="font-bold text-sm">{lvl}</div>
                  <div className="text-[#71717a] text-xs">{title}</div>
                </div>
              </div>
            );
          })}

          {users.length === 0 && (
            <div className="py-16 text-center text-[#71717a]">
              <div className="text-4xl mb-3">🏆</div>
              <p>No learners yet — be the first!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
