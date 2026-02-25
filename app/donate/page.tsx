"use client";
import { useState } from "react";
import Link from "next/link";

const PRESET_AMOUNTS = [5, 10, 25, 50];

export default function DonatePage() {
  const [selected, setSelected] = useState<number | null>(10);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amount = custom ? parseInt(custom) : selected;

  async function handleDonate() {
    if (!amount || amount < 1) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4] flex items-center justify-center px-6">
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_12px_#00e5ff] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <div className="text-4xl mb-3">❤️</div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Support 365Academy</h1>
          <p className="text-[#6b7d95] text-sm leading-relaxed">
            365Academy is completely free. Your donation helps keep it running and growing for everyone.
          </p>
        </div>

        <div className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-8">
          <p className="text-xs font-mono text-[#6b7d95] uppercase tracking-widest mb-4">Choose an amount</p>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {PRESET_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => { setSelected(a); setCustom(""); }}
                className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                  selected === a && !custom
                    ? "bg-[#00e5ff] text-black border-[#00e5ff]"
                    : "bg-[#080c10] border-[#1e2d42] text-[#e2eaf4] hover:border-[#00e5ff]/40"
                }`}
              >
                ${a}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-xs font-mono text-[#6b7d95] mb-2 uppercase tracking-widest">Custom amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7d95]">$</span>
              <input
                type="number"
                min="1"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                placeholder="Enter amount"
                className="w-full bg-[#080c10] border border-[#1e2d42] rounded-xl pl-8 pr-4 py-3 text-sm text-[#e2eaf4] placeholder-[#3a4a5c] focus:outline-none focus:border-[#00e5ff]/50 transition-colors"
              />
            </div>
          </div>

          <button
            onClick={handleDonate}
            disabled={!amount || amount < 1 || loading}
            className="w-full bg-[#f97373] hover:bg-[#f85555] text-white font-black py-4 rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 text-lg"
          >
            {loading ? "Redirecting..." : `Donate ${amount ? "$" + amount : ""} ❤️`}
          </button>

          {error && (
            <p className="text-center text-xs text-red-400 font-mono mt-3">{error}</p>
          )}
          <p className="text-center text-xs text-[#3a4a5c] font-mono mt-4">
            Secured by Stripe · No account needed
          </p>
        </div>

        <p className="text-center text-xs text-[#3a4a5c] mt-6">
          <Link href="/" className="hover:text-[#6b7d95] transition-colors">← Back to home</Link>
        </p>
      </div>
    </main>
  );
}
