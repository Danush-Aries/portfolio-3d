import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CursorTrail } from "@/components/ui/CursorTrail";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Dhanush Shankar — agent engineer",
  description:
    "I build the AI. I break the AI. I ship with the AI. Full-stack agent engineer — Anthropic SDK, MCP servers, red-team labs.",
  metadataBase: new URL("https://dhanush.dev"),
  openGraph: {
    title: "Dhanush Shankar — agent engineer",
    description:
      "Full-stack agent engineer. Five products live, zero job history, one AI co-developer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="noise min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
