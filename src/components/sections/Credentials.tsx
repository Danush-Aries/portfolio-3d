import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  CERTS,
  EDUCATION,
  LANGUAGES,
  PROFILE_FACTS,
} from "@/content/extras";

export function Credentials() {
  return (
    <section id="credentials" className="relative w-full">
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-20">
        <SectionLabel index="04" label="credentials.log" />
        <h2
          className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display), system-ui" }}
        >
          Paper trail,
          <br />
          <span className="text-[color:var(--accent)]">on record.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Certifications — spans 7 cols */}
          <div className="md:col-span-7">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[color:var(--accent)]">
              certifications
            </div>
            <div className="border border-[color:var(--muted)]/25 bg-[color:var(--surface)]/50">
              <div className="flex items-center justify-between border-b border-[color:var(--muted)]/25 bg-[color:var(--surface)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
                <span>~/dhanush/certs.tsv</span>
                <span className="text-[color:var(--accent)]">
                  {String(CERTS.length).padStart(2, "0")} rows
                </span>
              </div>
              <ul className="divide-y divide-[color:var(--muted)]/20 font-mono text-[13px]">
                {CERTS.map((c) => (
                  <li
                    key={`${c.issuer}-${c.name}`}
                    className="grid grid-cols-[64px_1fr_auto] items-baseline gap-4 px-4 py-3"
                  >
                    <span className="tabular-nums text-[color:var(--accent)]">
                      [{c.year}]
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[color:var(--text)]">{c.name}</span>
                      <span className="text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
                        {c.issuer}
                      </span>
                    </span>
                    <span className="text-[color:var(--accent2)]">&#10003;</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: education + languages + facts */}
          <div className="flex flex-col gap-10 md:col-span-5">
            {/* Education */}
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[color:var(--accent)]">
                education
              </div>
              <div className="border border-[color:var(--muted)]/25 bg-[color:var(--surface)]/40 p-5 font-mono text-[13px]">
                <div
                  className="mb-2 text-lg font-semibold tracking-tight text-[color:var(--text)]"
                  style={{ fontFamily: "var(--font-display), system-ui" }}
                >
                  {EDUCATION.school}
                </div>
                <div className="mb-4 text-[color:var(--text)]/85">
                  {EDUCATION.degree}
                </div>
                <dl className="grid grid-cols-[80px_1fr] gap-y-2 text-[12px]">
                  <dt className="text-[color:var(--muted)]">dates</dt>
                  <dd className="m-0 tabular-nums text-[color:var(--text)]">
                    {EDUCATION.dates}
                  </dd>
                  <dt className="text-[color:var(--muted)]">cgpa</dt>
                  <dd className="m-0 tabular-nums">
                    <span className="text-[color:var(--accent)]">
                      {EDUCATION.cgpa}
                    </span>
                  </dd>
                  <dt className="text-[color:var(--muted)]">focus</dt>
                  <dd className="m-0 text-[color:var(--text)]/85">
                    {EDUCATION.focus}
                  </dd>
                </dl>
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[color:var(--accent)]">
                languages
              </div>
              <ul className="flex flex-wrap gap-2 font-mono text-[13px]">
                {LANGUAGES.map((l) => (
                  <li
                    key={l.name}
                    className="border border-[color:var(--muted)]/30 bg-[color:var(--surface)]/40 px-3 py-1.5"
                  >
                    <span className="text-[color:var(--accent)]">{l.name}</span>
                    <span className="ml-2 text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
                      {l.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Facts */}
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[color:var(--accent)]">
                facts
              </div>
              <dl className="grid grid-cols-[130px_1fr] gap-x-4 gap-y-2 font-mono text-[12.5px]">
                {PROFILE_FACTS.map((f) => (
                  <div key={f.label} className="contents">
                    <dt className="text-[color:var(--muted)]">
                      {f.label.toLowerCase()}
                    </dt>
                    <dd className="m-0 text-[color:var(--text)]/85">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
