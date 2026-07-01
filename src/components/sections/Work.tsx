"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectPanel } from "./ProjectPanel";

const WorkScene = dynamic(
  () => import("@/components/scene/WorkScene").then((m) => m.WorkScene),
  { ssr: false }
);

export function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="relative w-full">
      <div className="mx-auto max-w-7xl px-6 pt-32 md:px-20">
        <SectionLabel index="02" label="work.log" />
        <h2
          className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display), system-ui" }}
        >
          Six shipped products.
          <br />
          <span className="text-[color:var(--muted)]">
            One repeating pattern.
          </span>
        </h2>
        <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.65] text-[color:var(--text)]/80">
          Design the loop, define the tools, ship the artifact. Every entry
          below is running code, not a slide. Each shard is clickable.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1600px] grid-cols-1 gap-8 px-6 md:grid-cols-12 md:px-20">
        {/* Left: scrolling panels */}
        <div className="md:col-span-5">
          {projects.map((p, i) => (
            <ProjectPanel
              key={p.slug}
              project={p}
              active={i === active}
              onEnter={() => setActive(i)}
            />
          ))}
        </div>

        {/* Right: sticky R3F canvas */}
        <div className="md:col-span-7">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative aspect-square w-full">
              <WorkScene activeIndex={active} onSelect={setActive} />
              <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[11px] text-[color:var(--muted)]">
                <span className="text-[color:var(--accent)]">◆</span>{" "}
                orbit.gallery · click any shard
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
