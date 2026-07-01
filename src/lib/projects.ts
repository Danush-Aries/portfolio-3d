export type Project = {
  index: string;
  slug: string;
  name: string;
  pitch: string;
  blurb: string;
  tech: string[];
  github: string;
  metrics: string[];
  accent: "mint" | "cyan" | "red";
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "jarvis",
    name: "Jarvis",
    pitch: "Portable multi-provider AI assistant with six LLM backends and auto-fallback.",
    blurb:
      "A portable AI assistant that boots on any machine and hot-swaps between six LLM providers when one falls over. MCP server registry, hot-reload sub-agents, persistent memory. My daily driver.",
    tech: ["Python", "Claude SDK", "MCP", "OpenAI", "Ollama", "SQLite"],
    github: "https://github.com/Danush-Aries/jarvis",
    metrics: [
      "6 LLM backends w/ auto-fallback",
      "MCP server registry + hot-reload",
      "Ships with 40+ sub-agents",
    ],
    accent: "mint",
  },
  {
    index: "02",
    slug: "breachintel",
    name: "Breachintel",
    pitch: "Unified OSINT breach-intelligence API stitching 14 feeds behind one FastAPI.",
    blurb:
      "One FastAPI, fourteen breach-intel feeds. Query a domain or email once, get a normalized JSON breach report. Ransomware feed is live-updated every 15 minutes.",
    tech: ["FastAPI", "Python", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/Danush-Aries/breachintel",
    metrics: [
      "14 OSINT sources unified",
      "18 REST endpoints, 4.2K LOC",
      "Live ransomware feed, 15-min refresh",
    ],
    accent: "red",
  },
  {
    index: "03",
    slug: "cve-advisor",
    name: "CVE-Advisor",
    pitch: "LLM-authored triage reports for any CVE, straight from NVD.",
    blurb:
      "Give it a CVE ID. It pulls NVD 2.0, enriches with CWE + EPSS, then has an LLM author a triage report: what it is, who's exposed, how to patch, urgency score. Built for on-call security engineers.",
    tech: ["Python", "Claude SDK", "NVD API", "EPSS", "CWE"],
    github: "https://github.com/Danush-Aries/cve-advisor",
    metrics: [
      "Full NVD 2.0 integration",
      "CWE + EPSS enrichment",
      "LLM-authored triage report",
    ],
    accent: "cyan",
  },
  {
    index: "04",
    slug: "computer-use-agent",
    name: "Computer-Use Agent",
    pitch: "Claude computer-use loops driving a real browser for autonomous recon.",
    blurb:
      "A Claude computer-use agent that drives a real Chromium session to enumerate a target's public attack surface. Screenshots at every step. Currently a lab tool, will graduate to a full recon pipeline.",
    tech: ["Claude SDK", "computer-use", "Playwright", "Python"],
    github: "https://github.com/Danush-Aries/computer-use-agent",
    metrics: [
      "Real browser, real DOM",
      "Screenshot audit log per turn",
      "Modular tool schema",
    ],
    accent: "mint",
  },
  {
    index: "05",
    slug: "customer-support-agent",
    name: "Customer Support Agent",
    pitch: "Production-grade support agent with tools, guardrails, and receipts.",
    blurb:
      "Full-stack customer support agent: tool-use for order lookup, refund initiation, and knowledge-base search. Every tool call is logged. Hardened against prompt injection with input guardrails.",
    tech: ["Claude SDK", "TypeScript", "Next.js", "PostgreSQL"],
    github: "https://github.com/Danush-Aries/customer-support-agent",
    metrics: [
      "Tool-use over real APIs",
      "Full audit log per turn",
      "Prompt-injection guardrails",
    ],
    accent: "cyan",
  },
  {
    index: "06",
    slug: "llm-fragility-lab",
    name: "LLM-Fragility Lab",
    pitch: "Red-team harness that catalogs how frontier LLMs break under adversarial input.",
    blurb:
      "A reproducible harness for measuring where frontier LLMs break: jailbreaks, prompt injection, context-length exploits, tool-call spoofing. Each attack ships with a receipt and a defense hypothesis.",
    tech: ["Python", "Claude SDK", "OpenAI", "Pytest", "Markdown"],
    github: "https://github.com/Danush-Aries/llm-fragility-lab",
    metrics: [
      "12 attack families cataloged",
      "Reproducible receipts",
      "Defense-hypothesis per attack",
    ],
    accent: "red",
  },
];
