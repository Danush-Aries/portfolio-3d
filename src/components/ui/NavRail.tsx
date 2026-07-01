"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const SECTIONS = [
  { id: "hero", label: "boot" },
  { id: "work", label: "work.log" },
  { id: "about", label: "whoami" },
  { id: "now", label: "now.log" },
  { id: "contact", label: "contact.md" },
];

export function NavRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <div className="mb-8 font-mono text-xs uppercase tracking-widest text-[color:var(--accent)]">
        <span className="border border-[color:var(--accent)]/30 px-1.5 py-0.5 glow-mint">
          DA
        </span>
      </div>
      <ul className="flex flex-col gap-5">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-3"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={clsx(
                    "block h-2 w-2 rounded-full border transition-all",
                    isActive
                      ? "border-[color:var(--accent)] bg-[color:var(--accent)] glow-mint"
                      : "border-[color:var(--muted)]/60 bg-transparent group-hover:border-[color:var(--accent)]/70"
                  )}
                />
                <span
                  className={clsx(
                    "font-mono text-[11px] tracking-wide transition-colors",
                    isActive
                      ? "text-[color:var(--accent)]"
                      : "text-[color:var(--muted)] opacity-0 group-hover:opacity-100"
                  )}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
