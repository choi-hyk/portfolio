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

const hippoboxArchitectureEdges: CanvasEdge[] = [
  {
    id: "frontend-to-fastapi",
    from: { nodeId: "frontend-section", side: "right" },
    to: { nodeId: "fastapi", side: "left" },
    directed: true,
  },
  {
    id: "fastapi-to-qdrant",
    from: { nodeId: "fastapi", side: "bottom" },
    to: { nodeId: "qdrant", side: "top" },
    directed: true,
  },
  {
    id: "sqlalchemy-to-database",
    from: { nodeId: "sqlalchemy", side: "bottom" },
    to: { nodeId: "database", side: "top" },
    directed: true,
  },
  {
    id: "mcp-clients-to-mcp",
    from: { nodeId: "mcp-clients-section", side: "left" },
    to: { nodeId: "mcp", side: "right" },
    directed: true,
  },
  {
    id: "backend-to-github-actions",
    from: { nodeId: "backend-section", side: "bottom" },
    to: { nodeId: "github-actions", side: "top" },
    directed: true,
  },
  {
    id: "github-actions-to-pypi",
    from: { nodeId: "github-actions", side: "bottom" },
    to: { nodeId: "pypi", side: "top" },
    directed: true,
  },
  {
    id: "github-actions-to-ghcr",
    from: { nodeId: "github-actions", side: "bottom" },
    to: { nodeId: "ghcr", side: "top" },
    directed: true,
  },
];

type ProjectDetailCanvasProps = {
  project: Project;
  canvasLabels: WorkflowCanvasLabels;
};

type ProjectOverviewCanvasProps = {
  projects: Project[];
  projectsPage: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
  };
  canvasLabels: WorkflowCanvasLabels;
};

type ProjectOverviewMeta = {
  subtitle: string;
  summary: string;
  highlights: string[];
  period: string;
  stack: string[];
  icon: {
    src: string;
    alt: string;
  };
  pypiHref?: string;
  websiteHref?: string;
};

const projectOverviewMeta: Record<string, ProjectOverviewMeta> = {
  hippobox: {
    subtitle: "Knowledge Management Platform",
    summary:
      "HippoBox는 로컬 환경에서 개인 지식을 저장하고 AI Agent가 활용할 수 있도록 설계한 Knowledge Management Platform입니다.\n\nMarkdown 기반 지식을 관리하며, MCP(Model Context Protocol)를 통해 Claude, Cursor, Codex 등 다양한 AI 개발 도구에서 동일한 지식을 조회하고 활용할 수 있습니다.",
    highlights: ["Local-first", "MCP Integration", "RAG Search"],
    period: "2025.11 ~ 2026.2",
    stack: ["FastAPI", "TypeScript", "MCP", "Qdrant"],
    icon: {
      src: "/hippobox.svg",
      alt: "HippoBox icon",
    },
    pypiHref: "https://pypi.org/project/hippobox/",
  },
  "say-it-its-ok": {
    subtitle: "Voice Kiosk Service",
    summary:
      "말하면 OK는 실제 직원처럼 사용자의 자연어 요청을 이해하고 응답하는 AI Voice Kiosk입니다.\n\nSTT(Speech-to-Text)부터 의도 분석, 주문·추천·안내, TTS(Text-to-Speech) 응답까지 하나의 AI 파이프라인으로 구성하여 사람과 대화하듯 자연스러운 키오스크 경험을 제공합니다.",
    highlights: ["STT Pipeline", "TTS Response", "Natural Language Actions"],
    period: "2025.3 ~ 2025.6",
    stack: ["React", "Node.js", "FastAPI", "OpenAI"],
    icon: {
      src: "/say-it-ok.png",
      alt: "말하면 OK icon",
    },
  },
  blueprint4agent: {
    subtitle: "FastAPI Agent Template",
    summary:
      "Blueprint4Agent는 에이전틱 코딩 기반으로 애플리케이션을 빠르게 구축하기 위해 설계한 FastAPI 기반 프로젝트 블루프린트입니다.\n\n인증, 프로젝트 구조, Docker, GitHub Actions, 문서화 등 반복적으로 필요한 개발 환경을 표준화하여 새로운 프로젝트를 일관된 구조로 시작할 수 있도록 구성했습니다.",
    highlights: ["Auth Flow", "Deploy Flow", "Agent-ready Structure"],
    period: "2026.2 ~ In Progress",
    stack: ["FastAPI", "GitHub Actions", "Docker"],
    icon: {
      src: "/b4a.svg",
      alt: "Blueprint4Agent icon",
    },
  },
  "today-in-tech": {
    subtitle: "AI Tech News Curation",
    summary:
      "Today in Tech는 AI가 기술 뉴스와 공식 기술 블로그를 선별하고 아카이빙하는 기술 뉴스 큐레이션 플랫폼입니다.\n\nPython 기반 자동화 파이프라인을 통해 최신 기술 콘텐츠를 수집하고, AI가 핵심 내용을 정리하여 Docusaurus 기반 문서 사이트에 지속적으로 배포합니다.",
    highlights: ["AI Curation", "Docusaurus Archive", "Automation"],
    period: "2026.5 ~ In Progress",
    stack: ["Python", "OpenAI", "Docusaurus", "GitHub Actions"],
    icon: {
      src: "/today-in-tech.svg",
      alt: "Today in Tech icon",
    },
    websiteHref: "https://todayintech.github.io/todayintech/",
  },
};

export function ProjectOverviewCanvas({
  projects,
  projectsPage,
  canvasLabels,
}: ProjectOverviewCanvasProps) {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);
  const projectNodes: CanvasNode[] = featuredProjects.map((project, index) => {
    const meta = projectOverviewMeta[project.slug] ?? {
      subtitle: project.type,
      summary: project.description,
      highlights: project.stack.slice(0, 3),
      period: "In Progress",
      stack: project.stack,
      icon: {
        src: "/file.svg",
        alt: `${project.title} icon`,
      },
    };

    return {
      id: `project-${project.slug}`,
      kind: "note",
      title: project.title,
      titleHref: `/projects/${project.slug}`,
      titleTooltip: `${project.title} 상세 페이지로 이동`,
      icon: meta.icon,
      order: 2 + index,
      x: index % 2 === 0 ? 13 : 47,
      y: 35 + Math.floor(index / 2) * 38,
      width: 31,
      markdown: [
        `**${meta.subtitle}**`,
        "",
        meta.summary,
        "",
        "### Highlights",
        ...meta.highlights.map((highlight) => `- ${highlight}`),
        "",
        `- :calendar: ${meta.period}`,
        `- :stack: ${meta.stack.map((item) => `\`${item}\``).join(" ")}`,
        "",
        `- :github: [GitHub](${project.href})`,
        ...(meta.pypiHref ? [`- :package: [PyPI](${meta.pypiHref})`] : []),
        ...(meta.websiteHref ? [`- :website: [Website](${meta.websiteHref})`] : []),
      ].join("\n"),
    };
  });
  const nodes: CanvasNode[] = [
    {
      id: "projects-summary",
      kind: "note",
      appearance: "transparent",
      order: 1,
      x: 13,
      y: 7,
      width: 46,
      markdown: [
        `# ${projectsPage.eyebrow}`,
        "",
        projectsPage.title,
        "",
        projectsPage.description,
        "",
        projectsPage.note,
      ].join("\n"),
    },
    ...projectNodes,
  ];
  const edges: CanvasEdge[] = [];

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
  const detailCanvas =
    project.slug === "hippobox"
      ? getHippoBoxDetailCanvas(project)
      : getDefaultProjectDetailCanvas(project);

  return (
    <WorkflowCanvas
      label={`${project.title} project canvas`}
      nodes={detailCanvas.nodes}
      edges={detailCanvas.edges}
      shell={canvasShell}
      labels={canvasLabels}
    />
  );
}

function getDefaultProjectDetailCanvas(project: Project): {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
} {
  return {
    nodes: [
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
    ],
    edges: detailEdges,
  };
}

function getHippoBoxDetailCanvas(project: Project): {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
} {
  const architectureNodes: CanvasNode[] = [
    {
      id: "architecture-title",
      kind: "note",
      appearance: "transparent",
      order: 2,
      x: 13,
      y: 32,
      width: 30,
      markdown: "# 시스템 아키텍처",
    },
    {
      id: "frontend-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/frontend.svg", alt: "Frontend" },
      excludeFromSequence: true,
      x: 6.5,
      y: 40,
      width: 27,
      height: 260,
      markdown: "## Frontend",
    },
    {
      id: "react",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/react.svg", alt: "React" },
      order: 3,
      x: 8.5,
      y: 49,
      width: 11,
      markdown: "**React**",
    },
    {
      id: "typescript",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/typescript.svg", alt: "TypeScript" },
      order: 4,
      x: 21,
      y: 49,
      width: 11,
      markdown: "**TypeScript**",
    },
    {
      id: "backend-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/backend.svg", alt: "Backend" },
      excludeFromSequence: true,
      x: 36.5,
      y: 40,
      width: 27,
      height: 500,
      markdown: "## Backend",
    },
    {
      id: "fastapi",
      kind: "note",
      icon: { src: "/icons/tech/fastapi.svg", alt: "FastAPI" },
      layer: "background",
      order: 5,
      x: 38,
      y: 48,
      width: 24,
      height: 230,
      markdown: "**FastAPI**\n\n지식 관리 API",
    },
    {
      id: "mcp",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/mcp.svg", alt: "Model Context Protocol" },
      order: 7,
      x: 50.5,
      y: 57,
      width: 11,
      markdown: "**MCP Server**\n\nFastAPI-MCP",
    },
    {
      id: "sqlalchemy",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/sqlalchemy.svg", alt: "SQLAlchemy" },
      order: 6,
      x: 38.5,
      y: 57,
      width: 11,
      markdown: "**SQLAlchemy**\n\n데이터 액세스 및 ORM",
    },
    {
      id: "qdrant",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/qdrant.svg", alt: "Qdrant" },
      order: 9,
      x: 50.5,
      y: 69,
      width: 11,
      markdown: "**Qdrant**\n\n벡터 검색 및 인덱싱",
    },
    {
      id: "database",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/database.svg", alt: "Database" },
      order: 8,
      x: 38.5,
      y: 69,
      width: 11,
      markdown: "**Database**\n\n지식 메타데이터 저장",
    },
    {
      id: "mcp-clients-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/tech/mcp.svg", alt: "MCP Clients" },
      excludeFromSequence: true,
      x: 66.5,
      y: 40,
      width: 27,
      height: 260,
      markdown: "## MCP Clients",
    },
    {
      id: "claude",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/claude.svg", alt: "Claude" },
      order: 10,
      x: 68,
      y: 49,
      width: 7.5,
      markdown: "**Claude**",
    },
    {
      id: "cursor",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/cursor.svg", alt: "Cursor" },
      order: 11,
      x: 76.75,
      y: 49,
      width: 7.5,
      markdown: "**Cursor**",
    },
    {
      id: "openai",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/openai.svg", alt: "OpenAI Codex" },
      order: 12,
      x: 85.5,
      y: 49,
      width: 7.5,
      markdown: "**OpenAI Codex**",
    },
    {
      id: "deploy-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/deploy.svg", alt: "Deploy" },
      excludeFromSequence: true,
      x: 36.5,
      y: 79,
      width: 27,
      height: 430,
      markdown: "## Deploy",
    },
    {
      id: "github-actions",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/github-actions.svg", alt: "GitHub Actions" },
      order: 13,
      x: 41,
      y: 87,
      width: 18,
      markdown: "**GitHub Actions**\n\nRelease Workflow",
    },
    {
      id: "pypi",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/pypi.svg", alt: "PyPI" },
      order: 14,
      x: 38.5,
      y: 99,
      width: 11,
      markdown: "**PyPI**\n\nPython Package",
    },
    {
      id: "ghcr",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/github.svg", alt: "GitHub Container Registry" },
      order: 15,
      x: 51,
      y: 99,
      width: 11,
      markdown: "**GHCR**\n\nContainer Image",
    },
  ];

  return {
    nodes: [
      {
        id: "summary",
        kind: "note",
        appearance: "transparent",
        order: 1,
        x: 13,
        y: 7,
        width: 50,
        markdown: [
          `# ${project.title}`,
          "",
          "**로컬 환경에서 개인 지식을 저장하고 AI Agent가 활용할 수 있도록 설계한 Knowledge Management Platform입니다.**",
          "",
          "Markdown 기반 지식을 관리하며, MCP(Model Context Protocol)를 통해 Claude, Cursor, Codex 등 다양한 AI 개발 도구에서 동일한 지식을 조회하고 활용할 수 있습니다.",
        ].join("\n"),
      },
      ...architectureNodes,
    ],
    edges: hippoboxArchitectureEdges,
  };
}
