"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Something went wrong. Please try again."); } else { router.push("/login"); }
  }

  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4] flex items-center justify-center px-6">
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <h1 className="text-3xl font-black tracking-tight mb-2">Create your account</h1>
          <p className="text-[#6b7d95] text-sm">Start your learning journey today</p>
        </div>
        <div className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-[#6b7d95] mb-2 uppercase tracking-widest">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="w-full bg-[#080c10] border border-[#1e2d42] rounded-xl px-4 py-3 text-sm text-[#e2eaf4] placeholder-[#3a4a5c] focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#6b7d95] mb-2 uppercase tracking-widest">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full bg-[#080c10] border border-[#1e2d42] rounded-xl px-4 py-3 text-sm text-[#e2eaf4] placeholder-[#3a4a5c] focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#6b7d95] mb-2 uppercase tracking-widest">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder="Min 8 characters" className="w-full bg-[#080c10] border border-[#1e2d42] rounded-xl px-4 py-3 text-sm text-[#e2eaf4] placeholder-[#3a4a5c] focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
            </div>
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-[#00e5ff] text-black font-bold py-3.5 rounded-xl hover:bg-[#00c4db] transition-all disabled:opacity-50">
              {loading ? "Creating account..." : "Create Account ?"}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-[#1e2d42] text-center">
            <p className="text-[#6b7d95] text-sm">Already have an account? <Link href="/login" className="text-[#00e5ff] hover:underline font-medium">Sign in</Link></p>
          </div>
        </div>
      </div>
    </main>
  );
}
