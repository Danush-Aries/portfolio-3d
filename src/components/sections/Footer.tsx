export function Footer() {
  return (
    <footer className="border-t border-[color:var(--muted)]/15 bg-[color:var(--surface)]/40">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 font-mono text-[12px] text-[color:var(--muted)] md:flex-row md:items-center md:px-20">
        <span>
          <span className="text-[color:var(--accent)]">◆</span> build.a1c9f0
          &nbsp;·&nbsp; last-updated {new Date().getFullYear()}
        </span>
        <span>
          crafted with{" "}
          <span className="text-[color:var(--accent)]">three.js</span> +{" "}
          <span className="text-[color:var(--accent2)]">claude</span>
        </span>
        <span>
          &copy; {new Date().getFullYear()} Dhanush Shankar — no rights
          reserved
        </span>
      </div>
    </footer>
  );
}
