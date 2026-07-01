// Source of truth mirrored from /Users/danu/gh-paint/portfolio-editorial-design/content.ts
// The editorial variants render the same 6 projects; the 3D variant renders them differently.

export type Project = {
  index: string;
  slug: string;
  name: string;
  role: string;
  year: number;
  pitch: string;
  detail: string;
  stack: string[];
  url: string;
  accent: "mint" | "cyan" | "red";
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "jarvis",
    name: "jarvis",
    role: "flagship",
    year: 2026,
    pitch:
      "Portable multi-provider AI assistant — voice, web, CLI, macOS daemon.",
    detail:
      "Six LLM backends with auto-fallback, zero-API-key mode via Claude Max OAuth, four specialised sub-agents (engineering, pentest, desktop, autonomous operator), Playwright MCP + OpenClaw desktop control.",
    stack: [
      "Python",
      "Claude Max / API",
      "Ollama",
      "Whisper",
      "MCP",
      "Playwright",
    ],
    url: "https://github.com/Danush-Aries/jarvis",
    accent: "mint",
  },
  {
    index: "02",
    slug: "breachintel",
    name: "breachintel",
    role: "OSINT",
    year: 2026,
    pitch:
      "All-source OSINT terminal — 14 feeds behind one FastAPI, 10-tab military-styled investigator GUI.",
    detail:
      "18 REST endpoints, live ransomware / dark-web monitor, Shodan key-pool rotator, Leaflet geo maps, ~4,200 lines of Python.",
    stack: ["Python", "FastAPI", "Shodan", "Playwright", "Leaflet", "vis-network"],
    url: "https://github.com/Danush-Aries/breachintel",
    accent: "red",
  },
  {
    index: "03",
    slug: "cve-advisor",
    name: "cve-advisor",
    role: "LLM x security",
    year: 2026,
    pitch:
      "LLM-driven CVE triage. Any CVE ID -> a Claude-authored triage report over NVD 2.0 + Exploit-DB.",
    detail:
      "Attack surface, exploitability, PoC links, remediation. Hardened Docker sandbox (cap-drop ALL, non-root, 512 MB, read-only FS), 20 async pytest tests, 7-day cache.",
    stack: ["Python", "FastAPI", "Claude API", "NVD", "Exploit-DB", "Docker"],
    url: "https://github.com/Danush-Aries/cve-advisor",
    accent: "cyan",
  },
  {
    index: "04",
    slug: "llm-fragility-lab",
    name: "llm-fragility-lab",
    role: "red team",
    year: 2026,
    pitch:
      "Adversarial testing lab — probes LLMs for jailbreaks, hallucinations, prompt-injection failure modes.",
    detail:
      "Zero-dep scoring (F1 + Jaccard + bigrams + novel-token + length), 29 tests. Where I go to break the models I use in every other project on this page.",
    stack: ["Python", "Claude", "pytest", "scoring-metrics"],
    url: "https://github.com/Danush-Aries/llm-fragility-lab",
    accent: "red",
  },
  {
    index: "05",
    slug: "computer-use-agent",
    name: "computer-use-agent",
    role: "agent",
    year: 2026,
    pitch:
      "Claude driving a virtual desktop — Streamlit UI, Dockerized Ubuntu+Xvfb+VNC.",
    detail:
      "Screenshot -> plan -> act loop. Prompt caching, image pruning, trajectory recording. An impressive demo of frontier agent capabilities.",
    stack: ["Python", "Claude computer-use", "Streamlit", "Docker", "VNC"],
    url: "https://github.com/Danush-Aries/computer-use-agent",
    accent: "mint",
  },
  {
    index: "06",
    slug: "customer-support-agent",
    name: "customer-support-agent",
    role: "product",
    year: 2026,
    pitch: "Production Next.js 14 chat over a 10-article RAG KB.",
    detail:
      "Inline citations, 3-class mood detector + auto-escalation banner, ephemeral prompt caching, extended-thinking streamed to UI. The cleanest demo of AI product engineering.",
    stack: ["Next.js 14", "TypeScript", "Claude Sonnet", "Tailwind", "Radix"],
    url: "https://github.com/Danush-Aries/customer-support-agent",
    accent: "cyan",
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
