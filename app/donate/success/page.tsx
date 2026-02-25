import Link from "next/link";

export default function DonateSuccessPage() {
  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-black tracking-tight mb-4">Thank you!</h1>
        <p className="text-[#6b7d95] leading-relaxed mb-8">
          Your donation means the world to us. It helps keep 365Academy free and growing for students everywhere.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#00e5ff] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[#00c4db] transition-all hover:-translate-y-0.5"
        >
          Back to 365Academy →
        </Link>
      </div>
    </main>
  );
}
