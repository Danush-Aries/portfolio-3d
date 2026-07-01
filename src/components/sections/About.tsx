import { SectionLabel } from "@/components/ui/SectionLabel";
import { skillGroups } from "@/lib/skills";

const AVATAR = `+--------------+
|              |
|    ######    |
|   ##    ##   |
|   ##  DA ##  |
|   ##    ##   |
|    ######    |
|              |
|  agent boot  |
|  ok. ready.  |
+--------------+`;

export function About() {
  return (
    <section id="about" className="relative w-full">
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-20">
        <SectionLabel index="03" label="whoami" />
        <h2
          className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display), system-ui" }}
        >
          Three faces of
          <br />
          <span className="text-[color:var(--accent)]">one skill.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Left: avatar + bio */}
          <div className="md:col-span-5">
            <pre className="whitespace-pre border border-[color:var(--muted)]/30 bg-[color:var(--surface)]/50 p-6 font-mono text-[13px] leading-[1.35] text-[color:var(--accent)] glow-mint">
{AVATAR}
            </pre>
            <p className="mt-8 text-[15px] leading-[1.65] text-[color:var(--text)]/85">
              I&apos;m a final-year B.Tech CSE student who spends every hour
              outside class designing agents that do things in the real world
              &mdash; read files, drive browsers, triage CVEs, run desktops,
              defend LLMs from themselves.
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-[color:var(--text)]/85">
              I work with Claude Code + MCP the way most people work with an
              IDE. Zero job history. Five solo AI products live. One very active{" "}
              <span className="font-mono text-[color:var(--accent2)]">
                ~/.claude/
              </span>{" "}
              folder.
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-[color:var(--text)]/85">
              The AI + cybersec + vibe-coding threads aren&apos;t three careers
              &mdash; they&apos;re three faces of the same skill. Every project
              loops back to Claude + tools + a defined goal.{" "}
              <span className="text-[color:var(--accent)]">
                That&apos;s the job I want.
              </span>
            </p>
          </div>

          {/* Right: skill matrix */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {skillGroups.map((g) => (
                <div
                  key={g.code}
                  className="flex flex-col gap-4 border border-[color:var(--muted)]/25 bg-[color:var(--surface)]/40 p-5"
                >
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--accent)]">
                      {g.code}
                    </div>
                    <div
                      className="mt-1 text-lg font-semibold tracking-tight"
                      style={{ fontFamily: "var(--font-display), system-ui" }}
                    >
                      {g.label}
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2 font-mono text-[13px] text-[color:var(--text)]/80">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className="mt-1 text-[color:var(--accent)]">
                          &#9656;
                        </span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
