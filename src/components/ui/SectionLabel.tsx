import clsx from "clsx";

type Props = {
  index: string;
  label: string;
  className?: string;
};

export function SectionLabel({ index, label, className }: Props) {
  return (
    <div
      className={clsx(
        "font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]",
        className
      )}
    >
      <span className="text-[color:var(--accent)]/70">// </span>
      <span className="tabular-nums">{index}</span>
      <span className="mx-1">—</span>
      <span>{label}</span>
    </div>
  );
}
