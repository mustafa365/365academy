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
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}