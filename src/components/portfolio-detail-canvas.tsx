import {
  type CanvasEdge,
  type CanvasNode,
  type WorkflowCanvasLabels,
  WorkflowCanvas,
} from "@/components/canvas/workflow-canvas";
import type { Project } from "@/data/projects";

const canvasShell = {
  border: "border-zinc-200",
  panel: "bg-white",
  editor: "bg-white",
  muted: "text-zinc-500",
  strong: "text-zinc-950",
  accent: "text-teal-800",
  accentBg: "bg-teal-100",
};

const detailEdges: CanvasEdge[] = [
  {
    id: "summary-to-context",
    from: { nodeId: "summary", side: "right" },
    to: { nodeId: "context", side: "left" },
    directed: true,
  },
  {
    id: "summary-to-stack",
    from: { nodeId: "summary", side: "bottom" },
    to: { nodeId: "stack", side: "top" },
    directed: false,
  },
  {
    id: "context-to-evidence",
    from: { nodeId: "context", side: "bottom" },
    to: { nodeId: "evidence", side: "top" },
    directed: true,
  },
  {
    id: "stack-to-evidence",
    from: { nodeId: "stack", side: "right" },
    to: { nodeId: "evidence", side: "left" },
    directed: true,
  },
];

type ProjectDetailCanvasProps = {
  project: Project;
  canvasLabels: WorkflowCanvasLabels;
};

type ProjectOverviewCanvasProps = {
  projects: Project[];
  canvasLabels: WorkflowCanvasLabels;
};

export function ProjectOverviewCanvas({
  projects,
  canvasLabels,
}: ProjectOverviewCanvasProps) {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const positions = [
    { x: 53, y: 7, width: 30 },
    { x: 16, y: 42, width: 31 },
    { x: 56, y: 50, width: 30 },
  ];
  const projectNodes: CanvasNode[] = featuredProjects.map((project, index) => ({
    id: `project-${project.slug}`,
    kind: index === featuredProjects.length - 1 ? "mention" : "note",
    ...positions[index],
    markdown: [
      `## ${project.title}`,
      project.description,
      "",
      `- Type: ${project.type}`,
      `- Stack: ${project.stack.map((item) => `\`${item}\``).join(" ")}`,
    ].join("\n"),
  }));
  const nodes: CanvasNode[] = [
    {
      id: "projects-summary",
      kind: "note",
      x: 14,
      y: 6,
      width: 31,
      markdown: [
        "# Projects",
        "백엔드와 AI 애플리케이션을 실제 서비스 구조로 구현한 프로젝트입니다.",
        "",
        `- Featured: ${featuredProjects.length}`,
        "- Focus: `FastAPI` `RAG` `MCP` `Automation`",
      ].join("\n"),
    },
    ...projectNodes,
  ];
  const firstProjectId = projectNodes[0]?.id;
  const secondProjectId = projectNodes[1]?.id;
  const thirdProjectId = projectNodes[2]?.id;
  const edges: CanvasEdge[] = [];

  if (firstProjectId) {
    edges.push({
      id: "summary-to-first-project",
      from: { nodeId: "projects-summary", side: "right" },
      to: { nodeId: firstProjectId, side: "left" },
      directed: true,
    });
  }

  if (secondProjectId) {
    edges.push({
      id: "summary-to-second-project",
      from: { nodeId: "projects-summary", side: "bottom" },
      to: { nodeId: secondProjectId, side: "top" },
      directed: false,
    });
  }

  if (firstProjectId && thirdProjectId) {
    edges.push({
      id: "first-to-third-project",
      from: { nodeId: firstProjectId, side: "bottom" },
      to: { nodeId: thirdProjectId, side: "top" },
      directed: true,
    });
  }

  if (secondProjectId && thirdProjectId) {
    edges.push({
      id: "second-to-third-project",
      from: { nodeId: secondProjectId, side: "right" },
      to: { nodeId: thirdProjectId, side: "left" },
      directed: true,
    });
  }

  return (
    <WorkflowCanvas
      label="Projects overview canvas"
      nodes={nodes}
      edges={edges}
      shell={canvasShell}
      labels={canvasLabels}
    />
  );
}

export function ProjectDetailCanvas({
  project,
  canvasLabels,
}: ProjectDetailCanvasProps) {
  const nodes: CanvasNode[] = [
    {
      id: "summary",
      kind: "note",
      x: 14,
      y: 6,
      width: 32,
      markdown: [
        `# ${project.title}`,
        project.description,
        "",
        `- Type: ${project.type}`,
        `- Stack: ${project.stack.map((item) => `\`${item}\``).join(" ")}`,
      ].join("\n"),
    },
    {
      id: "context",
      kind: "note",
      x: 53,
      y: 8,
      width: 29,
      markdown: [
        "## Project Context",
        "문제 정의부터 서비스 구조와 구현 결과까지 하나의 흐름으로 연결한 프로젝트입니다.",
        "",
        "포트폴리오에서는 공개 저장소에서 확인 가능한 범위의 구조와 기술 선택을 중심으로 설명합니다.",
      ].join("\n"),
    },
    {
      id: "stack",
      kind: "code",
      x: 16,
      y: 42,
      width: 30,
      markdown: [
        "```ts",
        `const project = "${project.title}";`,
        `const stack = ${JSON.stringify(project.stack)};`,
        "",
        "export const portfolio = { project, stack };",
        "```",
      ].join("\n"),
    },
    {
      id: "evidence",
      kind: "mention",
      x: 57,
      y: 52,
      width: 30,
      markdown: ["## Public Evidence", "@GitHub @Repository", "", project.href].join(
        "\n",
      ),
    },
  ];

  return (
    <WorkflowCanvas
      label={`${project.title} project canvas`}
      nodes={nodes}
      edges={detailEdges}
      shell={canvasShell}
      labels={canvasLabels}
    />
  );
}
