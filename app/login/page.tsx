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
    <main className="min-h-screen bg-[#0a0a0f] text-[#fafafa] flex items-center justify-center px-6">
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#7c3aed] shadow-[0_0_12px_#7c3aed] animate-pulse" />
            <span className="font-bold text-lg tracking-tight">365Academy</span>
          </Link>
          <h1 className="text-3xl font-black tracking-tight mb-2">Welcome back</h1>
          <p className="text-[#71717a] text-sm">Sign in to continue your learning journey</p>
        </div>
        <div className="bg-[#0d0d15] border border-[#1c1c2a] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-[#71717a] mb-2 uppercase tracking-widest">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full bg-[#0a0a0f] border border-[#1c1c2a] rounded-xl px-4 py-3 text-sm text-[#fafafa] placeholder-[#3f3f50] focus:outline-none focus:border-[#7c3aed]/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#71717a] mb-2 uppercase tracking-widest">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-[#0a0a0f] border border-[#1c1c2a] rounded-xl px-4 py-3 text-sm text-[#fafafa] placeholder-[#3f3f50] focus:outline-none focus:border-[#7c3aed]/50 transition-colors" />
            </div>
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-[#7c3aed] text-white font-bold py-3.5 rounded-xl hover:bg-[#6d28d9] transition-all disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-[#1c1c2a] text-center">
            <p className="text-[#71717a] text-sm">Don&apos;t have an account? <Link href="/register" className="text-[#a78bfa] hover:underline font-medium">Register here</Link></p>
          </div>
        </div>
      </div>
    </main>
  );
}
