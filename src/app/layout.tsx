import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Fraunces } from "next/font/google";
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

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://dhanush.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dhanush Shankar — full-stack agent engineer",
    template: "%s · Dhanush Shankar",
  },
  description:
    "I build the AI. I break the AI. I ship with the AI. Full-stack agent engineer — Anthropic SDK, MCP servers, red-team labs. Five products live, one active ~/.claude/ folder.",
  keywords: [
    "agent engineer",
    "AI engineer",
    "LLM security",
    "MCP",
    "Claude",
    "prompt injection",
    "red team",
    "portfolio",
  ],
  authors: [{ name: "Dhanush Shankar" }],
  creator: "Dhanush Shankar",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dhanush Shankar — full-stack agent engineer",
    description:
      "I build the AI. I break the AI. I ship with the AI. Five products live, one active ~/.claude/ folder.",
    url: SITE_URL,
    siteName: "dhanush.dev",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhanush Shankar — full-stack agent engineer",
    description:
      "I build the AI. I break the AI. I ship with the AI.",
    creator: "@danushankar3",
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dhanush Shankar",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Full-stack agent engineer",
  description:
    "Final-year engineering student in Bangalore. Builds and red-teams LLM agents. Ships with Claude + MCP.",
  email: "mailto:danushankar3@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/Danush-Aries",
    "https://linkedin.com/in/dhanush-shankar",
    "https://x.com/danushankar3",
  ],
  knowsAbout: [
    "Large language models",
    "Anthropic Claude SDK",
    "Model Context Protocol",
    "Prompt injection",
    "LLM red teaming",
    "Next.js",
    "React Three Fiber",
    "Full-stack engineering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="noise min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-[color:var(--accent)] focus:bg-[color:var(--surface)] focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-[color:var(--accent)]"
        >
          skip to content
        </a>
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
