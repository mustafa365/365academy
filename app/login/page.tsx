"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) { setError("Invalid email or password."); } else { router.push("/dashboard"); }
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
          <h1 className="text-3xl font-black tracking-tight mb-2">Welcome back</h1>
          <p className="text-[#6b7d95] text-sm">Sign in to continue your learning journey</p>
        </div>
        <div className="bg-[#0e1420] border border-[#1e2d42] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-[#6b7d95] mb-2 uppercase tracking-widest">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full bg-[#080c10] border border-[#1e2d42] rounded-xl px-4 py-3 text-sm text-[#e2eaf4] placeholder-[#3a4a5c] focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#6b7d95] mb-2 uppercase tracking-widest">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="��������" className="w-full bg-[#080c10] border border-[#1e2d42] rounded-xl px-4 py-3 text-sm text-[#e2eaf4] placeholder-[#3a4a5c] focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
            </div>
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-[#00e5ff] text-black font-bold py-3.5 rounded-xl hover:bg-[#00c4db] transition-all disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In ?"}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-[#1e2d42] text-center">
            <p className="text-[#6b7d95] text-sm">Don&apos;t have an account? <Link href="/register" className="text-[#00e5ff] hover:underline font-medium">Register here</Link></p>
          </div>
        </div>
      </div>
    </main>
  );
}
