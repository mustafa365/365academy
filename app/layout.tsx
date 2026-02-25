import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "365Academy",
  description: "Master SQL and Azure with Ahmed",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="w-full bg-[#00e5ff]/10 border-b border-[#00e5ff]/20 py-2 px-4 text-center text-xs text-[#00e5ff] font-mono tracking-wide">
          ✦ &nbsp; 365Academy and all its content is completely free — built to truly serve those willing to learn and grow their tech careers. &nbsp; ✦
        </div>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}