"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import clsx from "clsx";

type Props = {
  project: Project;
  active: boolean;
  onEnter?: () => void;
};

const ACCENT_CLASS: Record<Project["accent"], string> = {
  mint: "text-[color:var(--accent)] border-[color:var(--accent)]/40",
  cyan: "text-[color:var(--accent2)] border-[color:var(--accent2)]/40",
  red: "text-[color:var(--danger)] border-[color:var(--danger)]/40",
};

export function ProjectPanel({ project, active, onEnter }: Props) {
  return (
    <motion.article
      data-project-slug={project.slug}
      onViewportEnter={onEnter}
      viewport={{ amount: 0.6 }}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: active ? 1 : 0.55 }}
      transition={{ duration: 0.35 }}
      className={clsx(
        "relative flex min-h-[75vh] flex-col justify-center gap-6 border-l pl-8 pr-4 py-16 transition-colors",
        active
          ? "border-[color:var(--accent)]/60"
          : "border-[color:var(--muted)]/20"
      )}
    >
      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
        <span
          className={clsx(
            "tabular-nums text-[13px] font-semibold",
            active ? "text-[color:var(--accent)]" : ""
          )}
        >
          {project.index}
        </span>
        <span>&mdash;</span>
        <span className={ACCENT_CLASS[project.accent].split(" ")[0]}>
          {project.slug}.repo
        </span>
        <span className="ml-auto text-[color:var(--muted)]/70">
          {project.role} &middot; {project.year}
        </span>
      </div>

      <h3
        className="text-4xl font-bold tracking-tight md:text-5xl"
        style={{ fontFamily: "var(--font-display), system-ui" }}
      >
        {project.name}
      </h3>

      <p className="font-mono text-sm text-[color:var(--accent)] md:text-[15px]">
        {project.pitch}
      </p>

      <p className="max-w-[58ch] text-[15px] leading-[1.65] text-[color:var(--text)]/85">
        {project.detail}
      </p>

      <div className="flex flex-wrap gap-2 pt-2">
        {project.stack.map((t) => (
          <span
            key={t}
            className="border border-[color:var(--muted)]/25 bg-[color:var(--surface)]/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-[color:var(--muted)]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-4">
        <a
          href={`/work/${project.slug}`}
          className={clsx(
            "group inline-flex items-center gap-2 border px-4 py-2 font-mono text-sm transition-all",
            ACCENT_CLASS[project.accent],
            "hover:bg-[color:var(--surface)]"
          )}
        >
          <span>&gt; cd {project.slug}/</span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </a>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[color:var(--muted)]/30 px-4 py-2 font-mono text-sm text-[color:var(--muted)] transition-all hover:border-[color:var(--accent2)] hover:text-[color:var(--accent2)]"
        >
          <span>github &rarr;</span>
        </a>
      </div>
    </motion.article>
  );
}
