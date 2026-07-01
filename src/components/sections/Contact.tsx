"use client";

import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const EMAIL = "danushankar3@gmail.com";
const LINKS = [
  { label: "email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    label: "linkedin",
    value: "linkedin.com/in/dhanush-shankar",
    href: "https://linkedin.com/in/dhanush-shankar",
  },
  {
    label: "github",
    value: "github.com/Danush-Aries",
    href: "https://github.com/Danush-Aries",
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent
    }
  };

  return (
    <section id="contact" className="relative w-full">
      <div className="mx-auto max-w-5xl px-6 py-32 md:px-20">
        <SectionLabel index="06" label="contact.md" />
        <h2
          className="mt-4 text-4xl font-bold tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display), system-ui" }}
        >
          Hire me,
          <br />
          <span className="text-[color:var(--accent)]">or break me.</span>
        </h2>
        <p className="mt-6 max-w-[54ch] text-[15px] leading-[1.65] text-[color:var(--text)]/80">
          I&apos;m looking for AI engineering or AI-security internships.
          Frictionless email path if you&apos;ve already decided.
        </p>

        <div className="mt-12 border border-[color:var(--muted)]/25 bg-[color:var(--surface)]/50">
          <div className="flex items-center justify-between border-b border-[color:var(--muted)]/25 bg-[color:var(--surface)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
            <span>~/dhanush/contact.md</span>
            <span className="text-[color:var(--accent)]">read-only</span>
          </div>
          <div className="p-6 font-mono text-[14px]">
            <div className="mb-4 text-[color:var(--muted)]">
              <span className="text-[color:var(--accent)]">$</span> cat
              contact.md
            </div>
            <ul className="flex flex-col gap-3">
              {LINKS.map((l) => (
                <li key={l.label} className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-[color:var(--muted)]">
                    {l.label}:
                  </span>
                  <a
                    href={l.href}
                    target={l.label === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="text-[color:var(--accent2)] underline-offset-4 hover:text-[color:var(--accent)] hover:underline"
                  >
                    {l.value}
                  </a>
                  {l.label === "email" && (
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email"
                      className="ml-auto inline-flex items-center gap-1.5 border border-[color:var(--muted)]/30 bg-[color:var(--bg)] px-2 py-1 text-[11px] text-[color:var(--muted)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-[color:var(--accent)]"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          copy
                        </>
                      )}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-[color:var(--muted)]">
              <span className="text-[color:var(--accent)]">$</span> _
              <span className="caret" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${EMAIL}?subject=Let%27s%20build%20agents&body=Hi%20Dhanush%2C`}
            className="inline-flex items-center gap-3 border border-[color:var(--accent)]/60 bg-[color:var(--accent)]/[0.08] px-6 py-3 font-mono text-sm text-[color:var(--accent)] transition-all hover:bg-[color:var(--accent)] hover:text-[color:var(--bg)] glow-mint"
          >
            <Mail className="h-4 w-4" />
            <span>&gt; draft an email</span>
          </a>
          <a
            href="https://github.com/Danush-Aries"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[color:var(--muted)]/40 px-6 py-3 font-mono text-sm text-[color:var(--text)] transition-all hover:border-[color:var(--accent2)] hover:text-[color:var(--accent2)]"
          >
            <span>&gt; read the code</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
