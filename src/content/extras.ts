// Extended profile facts — certs, education, languages, quick facts.
// Rendered by the Credentials section between About and Now.

export const CERTS = [
  { issuer: "EC-Council", name: "Ethical Hacking Essentials (EHE)", year: "2025" },
  { issuer: "EC-Council", name: "SQL Injection Attacks", year: "2025" },
  { issuer: "EC-Council", name: "In-House Pentesting Lab", year: "2025" },
  { issuer: "Cisco NetAcad", name: "Ethical Hacker", year: "2024" },
  { issuer: "Cisco NetAcad", name: "Network Defense", year: "2024" },
  { issuer: "AICTE × Palo Alto Networks", name: "Network Security Fundamentals", year: "2024" },
  { issuer: "University of Michigan (Coursera)", name: "Python for Everybody", year: "2023" },
  { issuer: "University of Michigan (Coursera)", name: "Data Structures", year: "2023" },
] as const;

export const EDUCATION = {
  school: "GITAM University, Bengaluru",
  degree: "B.Tech, Computer Science and Engineering",
  dates: "2022 — 2026",
  cgpa: "6.66 / 10",
  focus: "AI, security, systems programming",
} as const;

export const LANGUAGES = [
  { name: "English", level: "Professional" },
  { name: "Hindi", level: "Conversational" },
  { name: "Telugu", level: "Native" },
] as const;

export const PROFILE_FACTS = [
  { label: "Location", value: "Bangalore, India" },
  { label: "Timezone", value: "IST (UTC+5:30)" },
  { label: "Available", value: "AI, LLM/agent, AI security, red team internships" },
  { label: "Active on", value: "TryHackMe · HackTheBox · PortSwigger" },
  { label: "Shipping cadence", value: "5 solo AI products live, 200+ Claude Code skills" },
] as const;
