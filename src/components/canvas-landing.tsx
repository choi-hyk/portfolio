import {
  type CanvasEdge,
  type CanvasNode,
  WorkflowCanvas,
} from "@/components/canvas/workflow-canvas";

type CanvasLandingProps = {
  profile: {
    name: string;
    role: string;
    email: string;
    links: {
      github: string;
      velog: string;
    };
  };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    github: string;
    velog: string;
    email: string;
    stats: string[];
    flow: Array<{
      label: string;
      title: string;
      description: string;
    }>;
    ide: {
      explorer: string;
      terminal: string;
      theme: string;
      light: string;
      dark: string;
      activeFile: string;
      terminalCommand: string;
      terminalStatus: string;
      folders: {
        root: string;
        source: string;
        content: string;
      };
    };
  };
};

export function CanvasLanding({ profile, home }: CanvasLandingProps) {
  const shell = {
    page: "bg-white text-zinc-700",
    border: "border-zinc-200",
    panel: "bg-white",
    editor: "bg-white",
    muted: "text-zinc-500",
    strong: "text-zinc-950",
    accent: "text-teal-800",
    accentBg: "bg-teal-100",
  };
  const canvasNodes: CanvasNode[] = [
    {
      id: "intro",
      kind: "note",
      x: 14,
      y: 6,
      width: 32,
      markdown: [
        `# ${profile.name}`,
        home.subtitle,
        "",
        `- Role: ${profile.role}`,
        "- Focus: `FastAPI` `RAG` `MCP`",
        "- Output: 서비스 구조, 자동화 도구, 기술 기록",
      ].join("\n"),
    },
    {
      id: "problem",
      kind: "note",
      x: 51,
      y: 6,
      width: 28,
      markdown: [
        `## ${home.flow[0]?.title ?? "문제 정의"}`,
        home.flow[0]?.description ?? "",
        "",
        "AI 기능은 데모 화면보다 운영 흐름, 응답 품질, 유지보수 가능한 API 경계가 더 중요하다고 봅니다.",
      ].join("\n"),
    },
    {
      id: "code",
      kind: "code",
      x: 49,
      y: 34,
      width: 31,
      markdown: [
        "```ts",
        'const stack = ["FastAPI", "RAG", "MCP", "Automation"];',
        "",
        "export function buildService(problem: string) {",
        "  return connect(problem, stack);",
        "}",
        "```",
      ].join("\n"),
    },
    {
      id: "mermaid",
      kind: "mermaid",
      x: 16,
      y: 42,
      width: 27,
      markdown: [
        "```mermaid",
        "flowchart LR",
        "  problem --> api",
        "  api --> rag",
        "  rag --> product",
        "```",
      ].join("\n"),
    },
    {
      id: "proof",
      kind: "mention",
      x: 58,
      y: 66,
      width: 31,
      markdown: [
        `## ${home.flow[2]?.title ?? "증거 확인"}`,
        "@HippoBox @Blueprint4Agent @말하면OK @Velog",
        "",
        "조직 프로젝트와 개인 기록을 통해 구현 과정과 학습 밀도를 함께 보여줍니다.",
      ].join("\n"),
    },
  ];
  const canvasEdges: CanvasEdge[] = [
    {
      id: "intro-to-problem",
      from: { nodeId: "intro", side: "right" },
      to: { nodeId: "problem", side: "left" },
      directed: true,
    },
    {
      id: "problem-to-code",
      from: { nodeId: "problem", side: "bottom" },
      to: { nodeId: "code", side: "top" },
      directed: true,
    },
    {
      id: "intro-to-mermaid",
      from: { nodeId: "intro", side: "bottom" },
      to: { nodeId: "mermaid", side: "top" },
      directed: false,
    },
    {
      id: "code-to-proof",
      from: { nodeId: "code", side: "bottom" },
      to: { nodeId: "proof", side: "top" },
      directed: true,
    },
    {
      id: "mermaid-to-proof",
      from: { nodeId: "mermaid", side: "right" },
      to: { nodeId: "proof", side: "left" },
      directed: true,
    },
  ];

  return (
    <WorkflowCanvas
      label={home.title}
      nodes={canvasNodes}
      edges={canvasEdges}
      shell={shell}
    />
  );
}
