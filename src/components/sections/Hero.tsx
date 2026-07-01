"use client";

import dynamic from "next/dynamic";
import { TerminalText } from "@/components/ui/TerminalText";

const HeroCanvas = dynamic(
  () => import("@/components/scene/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      <HeroCanvas />

      {/* Foreground DOM */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-20">
        <div className="md:col-span-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--accent)]/80">
            <span className="opacity-60">//</span> boot — agent online
          </div>
          <h1
            className="mt-4 font-display text-[56px] font-bold leading-[0.95] tracking-[-0.02em] md:text-[96px]"
            style={{ fontFamily: "var(--font-display), system-ui" }}
          >
            Dhanush
            <br />
            <span className="text-[color:var(--accent)]">Shankar.</span>
          </h1>

          <div className="mt-8 max-w-[38ch] font-mono text-lg text-[color:var(--text)] md:text-xl">
            <span className="text-[color:var(--accent)]">&gt; </span>
            <TerminalText
              text="I build the AI. I break the AI. I ship with the AI."
              speed={36}
              startDelay={400}
            />
          </div>

          <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.65] text-[color:var(--muted)] md:text-base">
            Full-stack agent engineer — Anthropic SDK, MCP servers, red-team
            labs. Five products live, zero job history, one AI co-developer.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 border border-[color:var(--accent)]/60 bg-[color:var(--accent)]/[0.05] px-5 py-3 font-mono text-sm text-[color:var(--accent)] transition-all hover:bg-[color:var(--accent)] hover:text-[color:var(--bg)] glow-mint"
            >
              <span>&gt; view work.log</span>
              <span className="inline-block translate-y-px transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-[color:var(--muted)]/40 bg-transparent px-5 py-3 font-mono text-sm text-[color:var(--text)] transition-all hover:border-[color:var(--accent2)] hover:text-[color:var(--accent2)]"
            >
              <span>&gt; cat contact.md</span>
              <span className="inline-block translate-y-px transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* HUD chip bottom-right */}
      <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden font-mono text-[11px] text-[color:var(--muted)] md:block">
        <div className="flex items-center gap-3 border border-[color:var(--muted)]/25 bg-[color:var(--surface)]/60 px-3 py-2 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--accent)] pulse-dot" />
          <span>build.a1c9f0 · 60fps · v0.4</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
          scroll ↓
        </span>
        <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--accent)] pulse-dot" />
      </div>
    </section>
  );
}
