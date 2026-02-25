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
        <div className="mb-10">
          <div className="text-[#6b7d95] text-xs font-mono mb-2">// Rankings</div>
          <h1 className="text-4xl font-black tracking-tight">Leaderboard 🏆</h1>
          <p className="text-[#6b7d95] mt-2">Top learners by XP earned</p>
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
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl mb-2 border-2 ${isYou ? "border-[#00e5ff] bg-[#00e5ff]/20 text-[#00e5ff]" : "border-[#1e2d42] bg-[#0e1420] text-white"}`}
                  >
                    {u.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="font-bold text-sm text-center truncate w-full px-2">{u.name ?? "Player"}{isYou ? " (you)" : ""}</div>
                  <div className="text-[#00e5ff] font-mono text-xs mt-1">{u.totalXP.toLocaleString()} XP</div>
                  <div className={`mt-2 bg-[#0e1420] border border-[#1e2d42] rounded-t-xl w-full ${heights[rank - 1]} flex items-center justify-center`}>
                    <span className="text-[#6b7d95] text-xs font-mono">#{rank}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Full list */}
        <div className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 border-b border-[#1e2d42] text-xs font-mono text-[#6b7d95] uppercase tracking-widest">
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
                className={`grid grid-cols-12 px-6 py-4 border-b border-[#1e2d42] last:border-0 items-center ${isYou ? "bg-[#00e5ff]/5" : "hover:bg-[#080c10]"} transition-colors`}
              >
                <div className="col-span-1 font-mono font-bold text-[#6b7d95]">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${isYou ? "border-[#00e5ff]/40 bg-[#00e5ff]/10 text-[#00e5ff]" : "border-[#1e2d42] bg-[#080c10] text-white"}`}>
                    {u.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{u.name ?? "Player"}{isYou ? <span className="text-[#00e5ff] text-xs ml-2">(you)</span> : null}</div>
                    <div className="text-[#6b7d95] text-xs">{u._count.lessonProgress} lessons</div>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="font-mono font-bold text-[#00e5ff]">{u.totalXP.toLocaleString()}</div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="font-bold text-sm">{lvl}</div>
                  <div className="text-[#6b7d95] text-xs">{title}</div>
                </div>
              </div>
            );
          })}

          {users.length === 0 && (
            <div className="py-16 text-center text-[#6b7d95]">
              <div className="text-4xl mb-3">🏆</div>
              <p>No learners yet — be the first!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
