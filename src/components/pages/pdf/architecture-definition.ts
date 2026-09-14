export type PdfArchitectureNode = {
  id: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Side = "top" | "right" | "bottom" | "left";
export type PdfArchitectureEdge = {
  from: string;
  to: string;
  fromSide: Side;
  toSide: Side;
};

export type PdfArchitectureDefinition = {
  groups: { id: string; members: string[]; icon?: string }[];
  nodes: PdfArchitectureNode[];
  edges: PdfArchitectureEdge[];
};

const node = (
  id: string,
  icon: string,
  column: number,
  row: number,
): PdfArchitectureNode => ({
  id,
  icon: icon.startsWith("/") ? icon : `/icons/tech/${icon}.svg`,
  x: 12 + column * 284,
  y: 44 + row * 220,
  width: 224,
  height: 132,
});
const edge = (
  from: string,
  to: string,
  fromSide: Side = "right",
  toSide: Side = "left",
): PdfArchitectureEdge => ({ from, to, fromSide, toSide });

// PDF uses its own slide-sized coordinates and intentionally independent node ids.
export const pdfArchitectureDefinitions: Record<string, PdfArchitectureDefinition> = {
  blueprint4agent: {
    groups: [
      { id: "frontend", icon: "/icons/sections/frontend.svg", members: ["client"] },
      { id: "backend", icon: "/icons/sections/backend.svg", members: ["api", "orm"] },
      { id: "storage", members: ["data"] },
      {
        id: "deploy",
        icon: "/icons/sections/deploy.svg",
        members: ["build", "ci", "release"],
      },
      { id: "observability", members: ["monitor"] },
    ],
    nodes: [
      node("client", "react", 0, 0),
      node("api", "fastapi", 1, 0),
      node("orm", "sqlalchemy", 2, 0),
      node("data", "database", 3, 0),
      node("build", "hatch", 0, 1),
      node("ci", "github-actions", 1, 1),
      node("release", "docker", 2, 1),
      node("monitor", "opentelemetry", 3, 1),
    ],
    edges: [
      edge("client", "api"),
      edge("api", "orm"),
      edge("orm", "data"),
      edge("backend", "observability", "bottom", "top"),
      edge("build", "ci"),
      edge("ci", "release"),
    ],
  },
  hippobox: {
    groups: [
      { id: "frontend", icon: "/icons/sections/frontend.svg", members: ["ui"] },
      { id: "clients", members: ["clients"] },
      {
        id: "backend",
        icon: "/icons/sections/backend.svg",
        members: ["api", "orm", "mcp", "vectors"],
      },
      { id: "storage", members: ["data"] },
      { id: "deploy", icon: "/icons/sections/deploy.svg", members: ["release"] },
    ],
    nodes: [
      node("ui", "react", 0, 0),
      node("api", "fastapi", 1, 0),
      node("orm", "sqlalchemy", 2, 0),
      node("data", "database", 3, 0),
      node("clients", "claude", 0, 1),
      node("mcp", "mcp", 1, 1),
      node("vectors", "qdrant", 2, 1),
      node("release", "docker", 3, 1),
    ],
    edges: [
      edge("ui", "api"),
      edge("api", "orm"),
      edge("orm", "data"),
      edge("clients", "mcp"),
      edge("mcp", "api", "top", "bottom"),
      edge("api", "vectors", "bottom", "top"),
    ],
  },
  "today-in-tech": {
    groups: [
      { id: "sources", members: ["sources"] },
      {
        id: "pipeline",
        icon: "/icons/sections/backend.svg",
        members: ["collector", "evidence", "writer"],
      },
      {
        id: "publish",
        icon: "/icons/sections/deploy.svg",
        members: ["pages", "ci", "archive"],
      },
      { id: "records", members: ["trace"] },
    ],
    nodes: [
      node("sources", "/globe.svg", 0, 0),
      node("collector", "/icons/sections/backend.svg", 1, 0),
      node("evidence", "database", 2, 0),
      node("writer", "openai", 3, 0),
      node("pages", "github", 1, 1),
      node("ci", "github-actions", 2, 1),
      node("archive", "docusaurus", 3, 1),
      node("trace", "database", 0, 1),
    ],
    edges: [
      edge("sources", "collector"),
      edge("collector", "evidence"),
      edge("collector", "records", "bottom", "top"),
      edge("evidence", "writer"),
      edge("writer", "archive", "bottom", "top"),
      edge("archive", "ci", "left", "right"),
      edge("ci", "pages", "left", "right"),
    ],
  },
  "say-it-its-ok": {
    groups: [
      { id: "frontend", icon: "/icons/sections/frontend.svg", members: ["client"] },
      { id: "voice", members: ["stt", "tts"] },
      { id: "nlp", icon: "/icons/sections/backend.svg", members: ["nlp", "model"] },
      { id: "api", icon: "/icons/sections/backend.svg", members: ["api", "data"] },
    ],
    nodes: [
      node("client", "react", 0, 0),
      node("stt", "google-cloud", 1, 0),
      node("nlp", "fastapi", 2, 0),
      node("model", "openai", 3, 0),
      node("tts", "google-cloud", 1, 1),
      node("api", "nodejs", 2, 1),
      node("data", "mongodb", 3, 1),
    ],
    edges: [
      edge("client", "stt"),
      edge("stt", "nlp"),
      edge("nlp", "model"),
      edge("nlp", "api", "bottom", "top"),
      edge("api", "data"),
      edge("api", "tts", "left", "right"),
      edge("tts", "client", "top", "bottom"),
    ],
  },
};
