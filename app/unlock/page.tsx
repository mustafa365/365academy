"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UnlockPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Incorrect password. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4] flex items-center justify-center px-6">
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_12px_#00e5ff] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </div>
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="text-2xl font-black tracking-tight mb-2">Coming Soon</h1>
          <p className="text-[#6b7d95] text-sm">This site is under construction. Enter the password to preview.</p>
        </div>

        <div className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#6b7d95] mb-2 uppercase tracking-widest">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full bg-[#080c10] border border-[#1e2d42] rounded-xl px-4 py-3 text-sm text-[#e2eaf4] placeholder-[#3a4a5c] focus:outline-none focus:border-[#00e5ff]/50 transition-colors"
              />
            </div>
            {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00e5ff] text-black font-black py-3 rounded-xl hover:bg-[#00c4db] transition-all disabled:opacity-50"
            >
              {loading ? "Checking..." : "Enter Site"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
