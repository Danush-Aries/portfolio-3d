import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projectBySlug, projects } from "@/lib/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectShardLoader } from "@/components/scene/ProjectShardLoader";

// Prerender the 6 project pages at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.name} — Dhanush Shankar`,
    description: project.pitch,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — Dhanush Shankar`,
      description: project.pitch,
      url: `/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="relative w-full">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-16">
        <Link
          href="/#work"
          className="font-mono text-[12px] text-[color:var(--muted)] hover:text-[color:var(--accent)]"
        >
          &larr; /work.log
        </Link>

        <div className="mt-8">
          <SectionLabel index={project.index} label={`${project.slug}.repo`} />
        </div>

        <h1
          className="mt-4 text-5xl font-bold tracking-tight md:text-7xl"
          style={{
            fontFamily: "var(--font-display), system-ui",
            textWrap: "balance",
          }}
        >
          {project.name}
        </h1>

        <p className="mt-4 font-mono text-[color:var(--accent)] md:text-lg">
          {project.pitch}
        </p>

        <div className="mt-3 font-mono text-[12px] text-[color:var(--muted)]">
          [ {project.role} &middot; {project.year} ]
        </div>

        {/* R3F shard scene */}
        <div className="mt-12 h-[420px] w-full border border-[color:var(--muted)]/25 bg-[color:var(--surface)]/40 md:h-[520px]">
          <ProjectShardLoader project={project} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--accent)]">
              // what it does
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7] text-[color:var(--text)]/85"
              style={{ textWrap: "pretty" }}
            >
              {project.detail}
            </p>

            <h2 className="mt-12 font-mono text-[11px] uppercase tracking-widest text-[color:var(--accent)]">
              // repo
            </h2>
            <div className="mt-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[color:var(--accent)]/60 px-4 py-2 font-mono text-sm text-[color:var(--accent)] transition-all hover:bg-[color:var(--accent)] hover:text-[color:var(--bg)]"
              >
                <span>{project.url.replace("https://", "")}</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          <aside className="md:col-span-4">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--accent)]">
              // stack
            </h2>
            <ul className="mt-4 flex flex-col gap-2 font-mono text-[13px] text-[color:var(--text)]/80">
              {project.stack.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1 text-[color:var(--accent)]">&#9656;</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <nav className="mt-24 flex items-center justify-between border-t border-[color:var(--muted)]/20 pt-8 font-mono text-sm">
          <Link
            href="/#work"
            className="text-[color:var(--muted)] hover:text-[color:var(--accent)]"
          >
            &larr; back to work.log
          </Link>
          {(() => {
            const idx = projects.findIndex((p) => p.slug === project.slug);
            const next = projects[(idx + 1) % projects.length];
            return (
              <Link
                href={`/work/${next.slug}`}
                className="text-[color:var(--muted)] hover:text-[color:var(--accent)]"
              >
                next: {next.name} &rarr;
              </Link>
            );
          })()}
        </nav>
      </div>
    </main>
  );
}
