"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { TerminalText } from "@/components/ui/TerminalText";

// Split the 3D bundle: DOM paints instantly, HeroGraph loads client-side only.
const HeroGraph = dynamic(
  () => import("@/components/scene/HeroGraph").then((m) => m.HeroGraph),
  { ssr: false, loading: () => null }
);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Static poster shows immediately while the 3D bundle downloads.
          HeroGraph unmounts it once ready. Both live under a Suspense so the DOM
          text (the LCP element) is never blocked by shader compile. */}
      <div
        className="absolute inset-0 opacity-70"
        aria-hidden
        style={{
          backgroundImage: "url(/hero-poster.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Suspense fallback={null}>
        <HeroGraph />
      </Suspense>

      {/* Foreground DOM — this is the LCP element. Real text, no canvas. */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-20">
        <div className="md:col-span-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--accent)]/80">
            <span className="opacity-60">//</span> attack-surface · live
          </div>

          <h1
            className="mt-4 font-display text-[52px] font-bold leading-[0.95] tracking-[-0.02em] md:text-[92px]"
            style={{
              fontFamily: "var(--font-display), system-ui",
              textWrap: "balance",
            }}
          >
            I build the AI.
            <br />
            <span className="text-[color:var(--danger)]">I break the AI.</span>
            <br />
            <span className="text-[color:var(--accent)]">I ship with</span> the AI.
          </h1>

          <div className="mt-8 max-w-[46ch] font-mono text-base text-[color:var(--text)] md:text-lg">
            <span className="text-[color:var(--accent)]">&gt; </span>
            <TerminalText
              text="Dhanush Shankar — full-stack agent engineer, Bangalore."
              speed={30}
              startDelay={300}
            />
          </div>

          <p className="mt-6 max-w-[54ch] text-[15px] leading-[1.65] text-[color:var(--muted)] md:text-base">
            Final-year engineering student. Five solo AI products live, one
            adversarial LLM lab, and a very active{" "}
            <span className="font-mono text-[color:var(--accent2)]">~/.claude/</span>{" "}
            folder. Above is the actual attack surface I model against every day
            — MCP tools, models, and the trust boundaries between them.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 border border-[color:var(--accent)]/60 bg-[color:var(--accent)]/[0.05] px-5 py-3 font-mono text-sm text-[color:var(--accent)] transition-all hover:bg-[color:var(--accent)] hover:text-[color:var(--bg)] glow-mint"
            >
              <span>&gt; view work.log</span>
              <span className="inline-block translate-y-px transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-[color:var(--muted)]/40 bg-transparent px-5 py-3 font-mono text-sm text-[color:var(--text)] transition-all hover:border-[color:var(--accent2)] hover:text-[color:var(--accent2)]"
            >
              <span>&gt; cat contact.md</span>
              <span className="inline-block translate-y-px transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Legend chip bottom-right */}
      <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden font-mono text-[11px] text-[color:var(--muted)] md:block">
        <div className="flex flex-col gap-1 border border-[color:var(--muted)]/25 bg-[color:var(--surface)]/70 px-3 py-2 backdrop-blur">
          <div className="text-[color:var(--muted)]/80">// legend</div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "#7CFFB0" }}
            />
            model
            <span
              className="ml-3 inline-block h-2 w-2 rounded-full"
              style={{ background: "#5AB0FF" }}
            />
            MCP
            <span
              className="ml-3 inline-block h-2 w-2 rounded-full"
              style={{ background: "#FF6B6B" }}
            />
            hostile
          </div>
          <div className="text-[color:var(--muted)]/70">
            height &asymp; risk score · hover a node
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
          scroll &darr;
        </span>
        <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--accent)] pulse-dot" />
      </div>
    </section>
  );
}
