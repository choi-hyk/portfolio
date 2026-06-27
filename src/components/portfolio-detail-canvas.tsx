import {
  type CanvasEdge,
  type CanvasNode,
  WorkflowCanvas,
} from "@/components/canvas/workflow-canvas";
import type { Project } from "@/data/projects";
import type { Experience } from "@/i18n/dictionaries";

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
};

type ProjectOverviewCanvasProps = {
  projects: Project[];
};

export function ProjectOverviewCanvas({ projects }: ProjectOverviewCanvasProps) {
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
    />
  );
}

export function ProjectDetailCanvas({ project }: ProjectDetailCanvasProps) {
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
    />
  );
}

type ExperienceDetailCanvasProps = {
  experience: Experience;
};

type ExperienceOverviewCanvasProps = {
  experiences: Experience[];
};

export function ExperienceOverviewCanvas({
  experiences,
}: ExperienceOverviewCanvasProps) {
  const primaryExperience = experiences[0];
  const nodes: CanvasNode[] = [
    {
      id: "summary",
      kind: "note",
      x: 14,
      y: 6,
      width: 32,
      markdown: [
        "# Experience",
        "실무에서 담당한 역할과 기술적 기여를 경력 단위로 정리합니다.",
        "",
        `- Companies: ${experiences.length}`,
        "- Focus: `Backend` `AI Application` `Service Development`",
      ].join("\n"),
    },
    {
      id: "context",
      kind: "note",
      x: 53,
      y: 8,
      width: 30,
      markdown: primaryExperience
        ? [
            `## ${primaryExperience.company}`,
            primaryExperience.description,
            "",
            `- Role: ${primaryExperience.role}`,
            `- Period: ${primaryExperience.period}`,
          ].join("\n")
        : "## Experience\n등록된 경력이 없습니다.",
    },
    {
      id: "stack",
      kind: "code",
      x: 16,
      y: 43,
      width: 30,
      markdown: [
        "```ts",
        `const companies = ${JSON.stringify(
          experiences.map((experience) => experience.company),
        )};`,
        `const stack = ${JSON.stringify(primaryExperience?.stack ?? [])};`,
        "```",
      ].join("\n"),
    },
    {
      id: "evidence",
      kind: "mention",
      x: 57,
      y: 53,
      width: 30,
      markdown: [
        "## Career Focus",
        "@FastAPI @RAG @LLM @Backend",
        "",
        "각 회사 하위 페이지에서 담당 업무와 기술 스택을 확인할 수 있습니다.",
      ].join("\n"),
    },
  ];

  return (
    <WorkflowCanvas
      label="Experience overview canvas"
      nodes={nodes}
      edges={detailEdges}
      shell={canvasShell}
    />
  );
}

export function ExperienceDetailCanvas({ experience }: ExperienceDetailCanvasProps) {
  const nodes: CanvasNode[] = [
    {
      id: "summary",
      kind: "note",
      x: 14,
      y: 6,
      width: 32,
      markdown: [
        `# ${experience.company}`,
        experience.description,
        "",
        `- Role: ${experience.role}`,
        `- Period: ${experience.period}`,
      ].join("\n"),
    },
    {
      id: "context",
      kind: "note",
      x: 53,
      y: 8,
      width: 30,
      markdown: [
        "## Responsibilities",
        ...experience.highlights.map((item) => `- ${item}`),
      ].join("\n"),
    },
    {
      id: "stack",
      kind: "code",
      x: 16,
      y: 43,
      width: 30,
      markdown: [
        "```ts",
        `const company = "${experience.company}";`,
        `const stack = ${JSON.stringify(experience.stack)};`,
        "```",
      ].join("\n"),
    },
    {
      id: "evidence",
      kind: "mention",
      x: 57,
      y: 53,
      width: 30,
      markdown: [
        "## Focus",
        "@FastAPI @RAG @LLM",
        "",
        "운영 가능한 AI 백엔드 서비스의 API 구조와 데이터 처리 흐름에 집중합니다.",
      ].join("\n"),
    },
  ];

  return (
    <WorkflowCanvas
      label={`${experience.company} experience canvas`}
      nodes={nodes}
      edges={detailEdges}
      shell={canvasShell}
    />
  );
}
