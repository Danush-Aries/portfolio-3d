// The nodes + edges that power the hero LLM attack-surface graph.
// Node kinds map to visual layer; risk drives vertical height; edges color by trust boundary.

export type NodeKind =
  | "model" // LLM itself
  | "mcp" // MCP server / tool
  | "api" // external API called
  | "data" // data source / vector store
  | "shell" // shell / filesystem / OS
  | "user"; // human boundary

export type GraphNode = {
  id: string;
  label: string;
  kind: NodeKind;
  // 0..1 — drives vertical lift and node emissive intensity
  risk: number;
  // planar (x,z) seed — the graph is arranged in a rough disk
  x: number;
  z: number;
  // short threat note revealed on hover
  threat: string;
};

export type EdgeKind =
  | "trusted" // inside the same trust domain
  | "boundary" // crosses a trust boundary — the interesting ones
  | "hostile"; // known-hostile input surface (user, web fetch)

export type GraphEdge = {
  from: string;
  to: string;
  kind: EdgeKind;
};

// Positions are hand-tuned so the graph reads as a diagram, not spaghetti.
// Radial roughly: user/web on outer ring, mcp mid, model center.
export const NODES: GraphNode[] = [
  // core model
  {
    id: "claude",
    label: "claude-sonnet-4.7",
    kind: "model",
    risk: 0.35,
    x: 0,
    z: 0,
    threat: "Prompt injection via tool output. Jailbreak via multi-turn drift.",
  },
  {
    id: "ollama",
    label: "ollama · qwen3",
    kind: "model",
    risk: 0.2,
    x: -1.6,
    z: 0.8,
    threat: "Local model — no network egress, but no safety RL either.",
  },

  // MCP tools ring
  {
    id: "mcp-fs",
    label: "filesystem MCP",
    kind: "mcp",
    risk: 0.75,
    x: 2.4,
    z: -0.4,
    threat:
      "Path traversal on tool arg. Model can read anything under scope root.",
  },
  {
    id: "mcp-shell",
    label: "shell MCP",
    kind: "shell",
    risk: 0.95,
    x: 2.6,
    z: 1.4,
    threat: "Arbitrary command exec. Sandboxing is the only real defense.",
  },
  {
    id: "mcp-browser",
    label: "playwright MCP",
    kind: "mcp",
    risk: 0.7,
    x: 0.9,
    z: 2.7,
    threat:
      "Reads adversarial DOM. Indirect prompt injection surface #1 for agents.",
  },
  {
    id: "mcp-github",
    label: "github MCP",
    kind: "mcp",
    risk: 0.55,
    x: -1.4,
    z: 2.6,
    threat: "PAT-scoped writes. Injected README can steer subsequent tool use.",
  },
  {
    id: "mcp-mem",
    label: "memory MCP",
    kind: "data",
    risk: 0.6,
    x: -2.7,
    z: 1.2,
    threat:
      "Persistent-state poisoning. Bad recall silently steers all future runs.",
  },
  {
    id: "mcp-search",
    label: "web-search MCP",
    kind: "api",
    risk: 0.85,
    x: -2.5,
    z: -1.1,
    threat: "Hostile SERP snippets. Cross-origin instruction injection.",
  },
  {
    id: "mcp-agentdb",
    label: "agentdb",
    kind: "data",
    risk: 0.4,
    x: -0.8,
    z: -2.4,
    threat: "Vector-store poisoning at ingest time.",
  },
  {
    id: "mcp-figma",
    label: "figma MCP",
    kind: "api",
    risk: 0.3,
    x: 1.1,
    z: -2.6,
    threat: "Read-heavy, low blast radius. OAuth-scoped.",
  },
  {
    id: "mcp-supabase",
    label: "supabase MCP",
    kind: "data",
    risk: 0.65,
    x: 2.6,
    z: -2.0,
    threat: "SQL exec via natural-language tool. RLS policy is the only floor.",
  },

  // hostile input boundary
  {
    id: "user",
    label: "user prompt",
    kind: "user",
    risk: 0.5,
    x: 0,
    z: 3.6,
    threat: "Trusted-ish. Still the primary jailbreak vector.",
  },
  {
    id: "web",
    label: "fetched web page",
    kind: "user",
    risk: 0.95,
    x: -3.4,
    z: -0.2,
    threat:
      "Untrusted. Every stray <p> a potential 'ignore previous instructions'.",
  },
  {
    id: "cli",
    label: "shell operator",
    kind: "user",
    risk: 0.25,
    x: 3.5,
    z: 0.5,
    threat: "Human in the loop. Confirms destructive tool calls.",
  },
];

export const EDGES: GraphEdge[] = [
  // user -> model
  { from: "user", to: "claude", kind: "boundary" },
  { from: "cli", to: "claude", kind: "trusted" },

  // model -> mcp
  { from: "claude", to: "mcp-fs", kind: "boundary" },
  { from: "claude", to: "mcp-shell", kind: "boundary" },
  { from: "claude", to: "mcp-browser", kind: "boundary" },
  { from: "claude", to: "mcp-github", kind: "boundary" },
  { from: "claude", to: "mcp-mem", kind: "trusted" },
  { from: "claude", to: "mcp-search", kind: "boundary" },
  { from: "claude", to: "mcp-agentdb", kind: "trusted" },
  { from: "claude", to: "mcp-figma", kind: "trusted" },
  { from: "claude", to: "mcp-supabase", kind: "boundary" },

  // hostile web -> mcp-browser & mcp-search (indirect prompt injection path)
  { from: "web", to: "mcp-browser", kind: "hostile" },
  { from: "web", to: "mcp-search", kind: "hostile" },

  // ollama can talk to memory and agentdb only (local scope)
  { from: "ollama", to: "mcp-mem", kind: "trusted" },
  { from: "ollama", to: "mcp-agentdb", kind: "trusted" },

  // mcp-shell -> local fs (illustrative — same OS domain)
  { from: "mcp-shell", to: "mcp-fs", kind: "trusted" },

  // github reads back into memory (poisoning path)
  { from: "mcp-github", to: "mcp-mem", kind: "boundary" },
];

export const KIND_COLOR: Record<NodeKind, string> = {
  model: "#7CFFB0", // mint — the LLM
  mcp: "#5AB0FF", // cyan — MCP tools
  api: "#B583FF", // violet — external APIs
  data: "#FFD37A", // amber — data stores
  shell: "#FF6B6B", // red — OS/shell reach
  user: "#E6EDE9", // pale — human input
};

export const EDGE_COLOR: Record<EdgeKind, string> = {
  trusted: "#3A6E4E",
  boundary: "#5AB0FF",
  hostile: "#FF6B6B",
};
