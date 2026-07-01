export type SkillGroup = {
  label: string;
  code: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "AI / Agents",
    code: "ai.agents",
    items: [
      "Claude SDK (Python + TS)",
      "MCP servers + clients",
      "Tool-use + structured output",
      "Prompt caching",
      "Computer-use loops",
      "Multi-provider routing",
      "Agent memory + state",
      "OpenAI / Ollama / local LLMs",
    ],
  },
  {
    label: "Security",
    code: "sec.offense",
    items: [
      "LLM red-team + prompt injection",
      "Jailbreak taxonomies",
      "OSINT + breach intel",
      "CVE triage (NVD, EPSS, CWE)",
      "Web app pentest basics",
      "Metasploit + Burp",
      "Recon automation",
      "Threat modeling",
    ],
  },
  {
    label: "Web / Systems",
    code: "web.systems",
    items: [
      "Python + FastAPI",
      "TypeScript + Next.js",
      "React + R3F",
      "PostgreSQL + Redis",
      "Docker + Compose",
      "Playwright / browser automation",
      "Bash + Linux",
      "Git + GitHub Actions",
    ],
  },
];
