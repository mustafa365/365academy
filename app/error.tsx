'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-[#080c10] text-[#e2eaf4] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="text-5xl mb-6">⚠️</div>
        <h2 className="text-2xl font-black mb-3">Something went wrong</h2>
        <div className="bg-[#0e1420] border border-red-500/30 rounded-xl p-4 mb-6 text-left">
          <p className="text-red-400 text-xs font-mono break-all">{error.message || "Unknown error"}</p>
          {error.digest && <p className="text-[#3a4a5c] text-xs font-mono mt-2">digest: {error.digest}</p>}
        </div>
        <button
          onClick={() => reset()}
          className="bg-[#00e5ff] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#00c4db] transition-all"
        >
          Try again
        </button>
      </div>
    </main>
  )
}