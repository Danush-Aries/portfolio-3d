import { SectionLabel } from "@/components/ui/SectionLabel";
import clsx from "clsx";

type Item = {
  status: "shipped" | "iterating" | "exploring";
  date: string;
  text: string;
};

const ITEMS: Item[] = [
  {
    status: "shipped",
    date: "2026-06",
    text: "shipped jarvis v0.4 — MCP server registry + hot-reload sub-agents",
  },
  {
    status: "iterating",
    date: "2026-06",
    text: "iterating on cve-advisor — swapping NVD 2.0 pagination for streaming",
  },
  {
    status: "shipped",
    date: "2026-05",
    text: "breachintel hit 4200 LOC, 18 endpoints, live ransomware feed stable",
  },
  {
    status: "exploring",
    date: "2026-05",
    text: "exploring: Claude computer-use for autonomous pentest recon loops",
  },
];

const GLYPH: Record<Item["status"], string> = {
  shipped: "[+]",
  iterating: "[~]",
  exploring: "[?]",
};

const COLOR: Record<Item["status"], string> = {
  shipped: "text-[color:var(--accent)]",
  iterating: "text-[color:var(--accent2)]",
  exploring: "text-[color:var(--danger)]",
};

export function Now() {
  return (
    <section id="now" className="relative w-full">
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-20">
        <SectionLabel index="05" label="now.log" />
        <h2
          className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display), system-ui" }}
        >
          Shipping this month.
        </h2>
        <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.65] text-[color:var(--muted)]">
          Not a static resume. Updated monthly.
        </p>

        <div className="mt-12 border border-[color:var(--muted)]/25 bg-[color:var(--surface)]/50">
          <div className="flex items-center justify-between border-b border-[color:var(--muted)]/25 bg-[color:var(--surface)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[color:var(--muted)]">
            <span>~/dhanush/now.log</span>
            <span>
              <span className="text-[color:var(--accent)]">●</span>&nbsp; live
            </span>
          </div>
          <ul className="divide-y divide-[color:var(--muted)]/15 font-mono text-[14px]">
            {ITEMS.map((it, i) => (
              <li
                key={i}
                className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-center md:gap-6"
              >
                <span
                  className={clsx(
                    "shrink-0 text-[13px] font-semibold",
                    COLOR[it.status]
                  )}
                >
                  {GLYPH[it.status]}
                </span>
                <span className="shrink-0 tabular-nums text-[color:var(--muted)]">
                  {it.date}
                </span>
                <span className="text-[color:var(--text)]/90">{it.text}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[color:var(--muted)]/25 bg-[color:var(--surface)] px-4 py-2 font-mono text-[11px] text-[color:var(--muted)]">
            <span className="text-[color:var(--accent)]">$</span> tail -f
            now.log &nbsp;
            <span className="caret" />
          </div>
        </div>
      </div>
    </section>
  );
}
