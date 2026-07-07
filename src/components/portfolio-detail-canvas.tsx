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
    bidirectional: true,
  },
  {
    id: "fastapi-to-qdrant",
    from: { nodeId: "fastapi", side: "bottom" },
    to: { nodeId: "qdrant", side: "top" },
    bidirectional: true,
  },
  {
    id: "sqlalchemy-to-database",
    from: { nodeId: "sqlalchemy", side: "bottom" },
    to: { nodeId: "database", side: "top" },
    bidirectional: true,
  },
  {
    id: "mcp-clients-to-mcp",
    from: { nodeId: "mcp-clients-section", side: "left" },
    to: { nodeId: "mcp", side: "right" },
    bidirectional: true,
  },
  {
    id: "application-to-deploy",
    from: { nodeId: "application-section", side: "bottom" },
    to: { nodeId: "deploy-section", side: "top" },
    directed: true,
  },
  {
    id: "hatch-to-local",
    from: { nodeId: "hatch-script", side: "bottom" },
    to: { nodeId: "local-build", side: "top" },
    directed: true,
  },
  {
    id: "hatch-to-github-actions",
    from: { nodeId: "hatch-script", side: "bottom" },
    to: { nodeId: "github-actions", side: "top" },
    directed: true,
  },
  {
    id: "local-to-docker-image",
    from: { nodeId: "local-build", side: "bottom" },
    to: { nodeId: "docker-image", side: "top" },
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
  const detailCanvas = getProjectDetailCanvas(project);

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

function getProjectDetailCanvas(project: Project): {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
} {
  if (project.slug === "hippobox") {
    return getHippoBoxDetailCanvas(project);
  }

  if (project.slug === "blueprint4agent") {
    return getBlueprint4AgentDetailCanvas(project);
  }

  if (project.slug === "say-it-its-ok") {
    return getSayItOkDetailCanvas(project);
  }

  if (project.slug === "today-in-tech") {
    return getTodayInTechDetailCanvas(project);
  }

  return getDefaultProjectDetailCanvas(project);
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

function getBlueprint4AgentDetailCanvas(project: Project): {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
} {
  const architectureOrigin = { x: 13, y: 58 };
  const architectureX = (x: number) => architectureOrigin.x + x;
  const architectureY = (y: number) => architectureOrigin.y + y;
  const featuresOrigin = { x: 88, y: 58 };
  const featuresX = (x: number) => featuresOrigin.x + x;
  const featuresY = (y: number) => featuresOrigin.y + y;
  const outcomeOrigin = { x: 13, y: 146 };
  const outcomeX = (x: number) => outcomeOrigin.x + x;
  const outcomeY = (y: number) => outcomeOrigin.y + y;

  const nodes: CanvasNode[] = [
    {
      id: "project-icon",
      kind: "note",
      appearance: "transparent",
      excludeFromSequence: true,
      x: 13,
      y: 7,
      width: 11,
      image: {
        src: "/b4a.svg",
        alt: "Blueprint4Agent icon",
        width: 120,
        height: 120,
        frame: "plain",
      },
      markdown: "",
    },
    {
      id: "summary",
      kind: "note",
      appearance: "transparent",
      order: 1,
      x: 26,
      y: 8,
      width: 50,
      markdown:
        "**Blueprint4Agent는 에이전틱 코딩 기반으로 애플리케이션을 빠르게 시작하고 운영하기 위한 프로젝트 블루프린트입니다.**\n\nFastAPI 기반 풀스택 서버 템플릿인 **B4FastAPI**와 GitHub 저장소 관리 자동화를 위한 **B4Bot**을 통해 인증, 배포, 문서화, 테스트, CI, 저장소 운영 흐름을 표준화했습니다.\n\n반복적으로 필요한 기반 구조를 미리 갖춘 상태에서 **AI Agent와 개발자가 기능 구현에 집중할 수 있는 환경**을 목표로 구성했습니다.",
    },
    {
      id: "info",
      title: "Info",
      kind: "note",
      order: 2,
      x: 79,
      y: 10,
      width: 24,
      markdown: [
        "- :calendar: 2026.2 ~ In Progress",
        "- :stack: `FastAPI` `React` `TypeScript` `Docker` `GitHub Actions`",
        "",
        `- :github: [GitHub|Blueprint4Agent GitHub 조직으로 이동](${project.href})`,
        "- :website: [Docs|Blueprint4Agent 문서 사이트로 이동](https://blueprint4agent.github.io/)",
      ].join("\n"),
    },
    {
      id: "project-goals",
      kind: "note",
      appearance: "transparent",
      order: 3,
      x: 13,
      y: 34,
      width: 47,
      markdown:
        "# Project Goals\n\n**AI Agent가 코드를 잘 작성하려면 프로젝트의 기반 구조가 먼저 안정적이어야 합니다.**\n\n에이전틱 코딩을 반복적으로 활용하다 보면 인증, 배포, 테스트, 문서화, API 타입 생성, 저장소 규칙 같은 기반 작업을 매번 다시 구성해야 하는 문제가 생깁니다.\n\nBlueprint4Agent는 이런 반복 작업을 줄이기 위해 시작한 프로젝트입니다. FastAPI 기반 서버 템플릿과 GitHub 자동화 도구를 통해 프로젝트 시작 단계부터 운영 가능한 구조를 제공하고, AI Agent가 일관된 규칙 안에서 작업할 수 있는 환경을 목표로 합니다.",
    },
    {
      id: "goals-list",
      title: "Goals",
      kind: "note",
      order: 4,
      x: 64,
      y: 41,
      width: 30,
      markdown: [
        "",
        "- FastAPI 풀스택 템플릿 제공",
        "- 인증·배포·문서화 표준화",
        "- OpenAPI 기반 타입 흐름 구성",
        "- GitHub Actions 기반 운영 자동화",
        "- Agent가 작업하기 쉬운 저장소 규칙 제공",
      ].join("\n"),
    },
    {
      id: "quick-start",
      title: "Quick Start",
      kind: "note",
      order: 5,
      x: 100,
      y: 17,
      width: 40,
      markdown:
        "## B4FastAPI\n\n```bash\nmake init\nmake backend-install\nmake backend-dev\nmake frontend-install\nmake frontend-dev\n```\n\n## B4Bot\n\n```bash\nnpm install\nnpm run typecheck\nnpm run build\n```\n\n```yaml\n- uses: Blueprint4Agent/B4Bot@v1\n  with:\n    config-path: \".github/b4bot.yml\"\n```",
    },
    {
      id: "architecture-title",
      kind: "note",
      appearance: "transparent",
      order: 6,
      x: architectureX(0),
      y: architectureY(0),
      width: 34,
      markdown: "# System Architecture",
    },
    {
      id: "application-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/application.svg", alt: "Application" },
      excludeFromSequence: true,
      x: architectureX(0),
      y: architectureY(5),
      width: 60,
      height: 480,
      markdown: "## Application",
    },
    {
      id: "backend-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/backend.svg", alt: "Backend" },
      excludeFromSequence: true,
      x: architectureX(3),
      y: architectureY(14),
      width: 25,
      height: 230,
      markdown: "## Backend",
    },
    {
      id: "frontend-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/frontend.svg", alt: "Frontend" },
      excludeFromSequence: true,
      x: architectureX(32),
      y: architectureY(14),
      width: 25,
      height: 230,
      markdown: "## Frontend",
    },
    {
      id: "fastapi",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/fastapi.svg", alt: "FastAPI" },
      order: 7,
      x: architectureX(5),
      y: architectureY(25),
      width: 10,
      markdown: "**FastAPI**",
    },
    {
      id: "sqlalchemy",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/sqlalchemy.svg", alt: "SQLAlchemy" },
      order: 8,
      x: architectureX(16),
      y: architectureY(25),
      width: 10,
      markdown: "**SQLAlchemy**",
    },
    {
      id: "react",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/react.svg", alt: "React" },
      order: 9,
      x: architectureX(34),
      y: architectureY(25),
      width: 10,
      markdown: "**React**",
    },
    {
      id: "typescript",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/typescript.svg", alt: "TypeScript" },
      order: 10,
      x: architectureX(45),
      y: architectureY(25),
      width: 10,
      markdown: "**TypeScript**",
    },
    {
      id: "automation-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/tech/github-actions.svg", alt: "Automation" },
      excludeFromSequence: true,
      x: architectureX(0),
      y: architectureY(43),
      width: 60,
      height: 240,
      markdown: "## Automation & Deploy",
    },
    {
      id: "github-actions",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/github-actions.svg", alt: "GitHub Actions" },
      order: 11,
      x: architectureX(5),
      y: architectureY(54),
      width: 13,
      markdown: "**GitHub Actions**",
    },
    {
      id: "docker",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/docker.svg", alt: "Docker" },
      order: 12,
      x: architectureX(20),
      y: architectureY(54),
      width: 10,
      markdown: "**Docker**",
    },
    {
      id: "b4bot",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/github.svg", alt: "B4Bot" },
      order: 13,
      x: architectureX(33),
      y: architectureY(54),
      width: 10,
      markdown: "**B4Bot**",
    },
    {
      id: "docusaurus",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/docusaurus.svg", alt: "Docusaurus" },
      order: 14,
      x: architectureX(45),
      y: architectureY(54),
      width: 12,
      markdown: "**Docs**",
    },
    {
      id: "features-title",
      kind: "note",
      appearance: "transparent",
      order: 15,
      x: featuresX(0),
      y: featuresY(0),
      width: 30,
      markdown: "# Features",
    },
    ...[
      ["feature-blueprint", "Full-stack FastAPI Blueprint", "FastAPI, SQLAlchemy, Alembic, Redis 기반 백엔드와 React, TypeScript, OpenAPI 타입 생성 기반 프론트엔드를 포함한 **풀스택 템플릿**입니다."],
      ["feature-foundation", "Auth / Settings Foundation", "로그인, OAuth, refresh token, profile, settings, API key 같은 **반복적인 서비스 기반 기능**을 미리 포함합니다."],
      ["feature-deploy", "Docker / CI Workflow", "Docker 기반 로컬 배포, GHCR 이미지 배포, GitHub Actions build pipeline, desktop build workflow를 제공합니다."],
      ["feature-agent", "Agentic Repository Automation", "B4Bot을 통해 저장소를 주기적으로 점검하고 feature, error, refactor, secure 범위의 관리 이슈를 생성합니다."],
    ].map(([id, title, body], index) => ({
      id,
      kind: "note" as const,
      appearance: "feature" as const,
      order: 16 + index,
      x: featuresX(index % 2 === 0 ? 0 : 42),
      y: featuresY(10 + Math.floor(index / 2) * 22),
      width: 38,
      markdown: `## ${title}\n\n${body}`,
    })),
    {
      id: "results",
      kind: "note",
      appearance: "transparent",
      order: 20,
      x: outcomeX(0),
      y: outcomeY(0),
      width: 40,
      markdown:
        "# Results\n\n**반복적인 초기 설정 없이 바로 기능 개발을 시작할 수 있는 기반을 만들었습니다.**\n\nB4FastAPI를 통해 인증, API 구조, 프론트엔드 타입 생성, Docker 배포, CI, 문서화 규칙을 하나의 템플릿으로 정리했고, B4Bot을 통해 저장소 운영 이슈를 자동으로 생성하는 Agent 기반 관리 흐름을 구성했습니다.\n\n결과적으로 에이전틱 코딩을 위한 프로젝트 시작점과 저장소 운영 자동화 기반을 함께 갖춘 구조가 되었습니다.",
    },
    {
      id: "lessons",
      kind: "note",
      appearance: "transparent",
      order: 21,
      x: outcomeX(44),
      y: outcomeY(4),
      width: 40,
      markdown:
        "# Lessons Learned\n\n**에이전틱 코딩에서 중요한 것은 AI가 안정적으로 작업할 수 있는 프로젝트 구조와 규칙을 먼저 제공하는 것이었습니다.**\n\n이 프로젝트를 통해 FastAPI 기반 풀스택 템플릿, Docker/GitHub Actions 배포 흐름, OpenAPI 기반 프론트엔드 타입 생성, Docusaurus 문서화 구조, GitHub Action 기반 Agent 자동화 구성을 정리할 수 있었습니다.",
    },
  ];

  return {
    nodes,
    edges: [
      {
        id: "backend-to-frontend",
        from: { nodeId: "backend-section", side: "right" },
        to: { nodeId: "frontend-section", side: "left" },
        bidirectional: true,
      },
      {
        id: "application-to-automation",
        from: { nodeId: "application-section", side: "bottom" },
        to: { nodeId: "automation-section", side: "top" },
        directed: true,
      },
      {
        id: "b4bot-to-actions",
        from: { nodeId: "b4bot", side: "left" },
        to: { nodeId: "github-actions", side: "right" },
        bidirectional: true,
      },
    ],
  };
}

function getSayItOkDetailCanvas(project: Project): {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
} {
  const architectureOrigin = { x: 13, y: 62 };
  const architectureX = (x: number) => architectureOrigin.x + x;
  const architectureY = (y: number) => architectureOrigin.y + y;
  const featuresOrigin = { x: 88, y: 62 };
  const featuresX = (x: number) => featuresOrigin.x + x;
  const featuresY = (y: number) => featuresOrigin.y + y;
  const outcomeOrigin = { x: 13, y: 150 };
  const outcomeX = (x: number) => outcomeOrigin.x + x;
  const outcomeY = (y: number) => outcomeOrigin.y + y;

  const nodes: CanvasNode[] = [
    {
      id: "project-icon",
      kind: "note",
      appearance: "transparent",
      excludeFromSequence: true,
      x: 13,
      y: 7,
      width: 10,
      image: {
        src: "/say-it-ok.png",
        alt: "말하면 OK icon",
        width: 120,
        height: 120,
        frame: "plain",
      },
      markdown: "",
    },
    {
      id: "summary",
      kind: "note",
      appearance: "transparent",
      order: 1,
      x: 26,
      y: 8,
      width: 50,
      markdown:
        "**말하면 OK는 실제 직원처럼 사용자의 자연어 요청을 이해하고 응답하는 AI Voice Kiosk입니다.**\n\nSTT(Speech-to-Text)부터 의도 분석, 주문·추천·안내, TTS(Text-to-Speech) 응답까지 하나의 AI 파이프라인으로 구성하여 사람과 대화하듯 자연스러운 키오스크 경험을 제공합니다.",
    },
    {
      id: "info",
      title: "Info",
      kind: "note",
      order: 2,
      x: 79,
      y: 10,
      width: 24,
      markdown: [
        "- :calendar: 2025.3 ~ 2025.6",
        "- :stack: `React` `Node.js` `FastAPI` `OpenAI` `STT` `TTS`",
        "",
        `- :github: [GitHub|말하면 OK GitHub 조직으로 이동](${project.href})`,
      ].join("\n"),
    },
    {
      id: "project-goals",
      kind: "note",
      appearance: "transparent",
      order: 3,
      x: 13,
      y: 35,
      width: 47,
      markdown:
        "# Project Goals\n\n**사용자가 키오스크를 조작법이 아니라 자연어 대화로 사용할 수 있어야 합니다.**\n\n기존 키오스크는 화면 구조를 알고 직접 탐색해야 하지만, 말하면 OK는 직원에게 말하듯 요청하면 주문, 추천, 안내 같은 행동으로 이어지는 경험을 목표로 했습니다.\n\n음성 입력을 텍스트로 바꾸고, 자연어 의도를 분석한 뒤, 키오스크 API와 TTS 응답으로 연결하는 end-to-end 파이프라인을 구성했습니다.",
    },
    {
      id: "goals-list",
      title: "Goals",
      kind: "note",
      order: 4,
      x: 64,
      y: 42,
      width: 30,
      markdown: [
        "",
        "- 음성 기반 키오스크 인터랙션",
        "- STT 기반 자연어 입력 처리",
        "- OpenAI 기반 의도 분석",
        "- 주문·추천·안내 API 연동",
        "- TTS 기반 응답 경험",
      ].join("\n"),
    },
    {
      id: "quick-start",
      title: "Quick Start",
      kind: "note",
      order: 5,
      x: 100,
      y: 16,
      width: 40,
      markdown:
        "## Client / STT\n\n```bash\nnpm install\nnpm run dev\n```\n\n## API Server\n\n```bash\nnpm install\nnpm run dev\nnode app.js\n```\n\n## NLP Server\n\n```bash\npython3 -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\nuvicorn app.main:app --reload --port=3002\n```",
    },
    {
      id: "architecture-title",
      kind: "note",
      appearance: "transparent",
      order: 6,
      x: architectureX(0),
      y: architectureY(0),
      width: 34,
      markdown: "# System Architecture",
    },
    {
      id: "client-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/frontend.svg", alt: "Client" },
      excludeFromSequence: true,
      x: architectureX(0),
      y: architectureY(7),
      width: 24,
      height: 250,
      markdown: "## Client",
    },
    {
      id: "server-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/backend.svg", alt: "Server" },
      excludeFromSequence: true,
      x: architectureX(30),
      y: architectureY(7),
      width: 26,
      height: 330,
      markdown: "## API / NLP",
    },
    {
      id: "voice-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/tech/google-cloud.svg", alt: "Voice" },
      excludeFromSequence: true,
      x: architectureX(61),
      y: architectureY(7),
      width: 23,
      height: 250,
      markdown: "## Voice / AI",
    },
    {
      id: "react",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/react.svg", alt: "React" },
      order: 7,
      x: architectureX(3),
      y: architectureY(20),
      width: 10,
      markdown: "**React**",
    },
    {
      id: "typescript",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/typescript.svg", alt: "TypeScript" },
      order: 8,
      x: architectureX(14),
      y: architectureY(20),
      width: 8,
      markdown: "**TS**",
    },
    {
      id: "node-api",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/nodejs.svg", alt: "Node.js" },
      order: 9,
      x: architectureX(33),
      y: architectureY(20),
      width: 10,
      markdown: "**Node API**",
    },
    {
      id: "fastapi-nlp",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/fastapi.svg", alt: "FastAPI" },
      order: 10,
      x: architectureX(44),
      y: architectureY(20),
      width: 10,
      markdown: "**FastAPI NLP**",
    },
    {
      id: "database",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/database.svg", alt: "MongoDB" },
      order: 11,
      x: architectureX(38),
      y: architectureY(37),
      width: 10,
      markdown: "**MongoDB**",
    },
    {
      id: "stt",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/google-cloud.svg", alt: "STT" },
      order: 12,
      x: architectureX(63),
      y: architectureY(20),
      width: 9,
      markdown: "**STT**",
    },
    {
      id: "openai",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/openai.svg", alt: "OpenAI" },
      order: 13,
      x: architectureX(73),
      y: architectureY(20),
      width: 9,
      markdown: "**OpenAI**",
    },
    {
      id: "tts",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/google-cloud.svg", alt: "TTS" },
      order: 14,
      x: architectureX(68),
      y: architectureY(37),
      width: 9,
      markdown: "**TTS**",
    },
    {
      id: "features-title",
      kind: "note",
      appearance: "transparent",
      order: 15,
      x: featuresX(0),
      y: featuresY(0),
      width: 30,
      markdown: "# Features",
    },
    ...[
      ["feature-stt", "STT Pipeline", "사용자의 음성 요청을 텍스트로 변환하고, 이후 자연어 처리 서버가 이해할 수 있는 입력으로 전달합니다."],
      ["feature-intent", "Intent Analysis", "OpenAI 기반 NLP 서버가 주문, 추천, 안내 같은 사용자의 의도를 분석하고 API 서버로 전달합니다."],
      ["feature-kiosk", "Kiosk Actions", "Node.js API 서버가 메뉴 조회, 추천, 주문, 장바구니 변경 같은 키오스크 행동을 수행합니다."],
      ["feature-tts", "TTS Response", "처리 결과를 음성 응답으로 다시 전달해 사용자가 화면을 직접 탐색하지 않아도 대화 흐름을 유지할 수 있게 합니다."],
    ].map(([id, title, body], index) => ({
      id,
      kind: "note" as const,
      appearance: "feature" as const,
      order: 16 + index,
      x: featuresX(index % 2 === 0 ? 0 : 42),
      y: featuresY(10 + Math.floor(index / 2) * 22),
      width: 38,
      markdown: `## ${title}\n\n${body}`,
    })),
    {
      id: "results",
      kind: "note",
      appearance: "transparent",
      order: 20,
      x: outcomeX(0),
      y: outcomeY(0),
      width: 40,
      markdown:
        "# Results\n\n**음성 인식부터 자연어 이해, 키오스크 행동, 음성 응답까지 이어지는 AI Voice Kiosk 흐름을 구현했습니다.**\n\n사용자는 직원에게 말하듯 요청할 수 있고, 시스템은 요청 의도를 분석해 메뉴 추천, 주문, 안내 같은 행동으로 연결합니다. 팀 프로젝트 범위 안에서 프론트엔드, API 서버, NLP 서버, STT/TTS 흐름을 분리해 구성했습니다.",
    },
    {
      id: "lessons",
      kind: "note",
      appearance: "transparent",
      order: 21,
      x: outcomeX(44),
      y: outcomeY(4),
      width: 40,
      markdown:
        "# Lessons Learned\n\n**AI 음성 서비스는 모델 호출보다 입력·상태·응답 흐름을 안정적으로 연결하는 것이 중요했습니다.**\n\n이 프로젝트를 통해 음성 입력 처리, 자연어 의도 분석, API 서버와의 역할 분리, TTS 응답 설계, 키오스크 도메인 행동 모델링을 경험했습니다.",
    },
  ];

  return {
    nodes,
    edges: [
      {
        id: "client-to-server",
        from: { nodeId: "client-section", side: "right" },
        to: { nodeId: "server-section", side: "left" },
        bidirectional: true,
      },
      {
        id: "server-to-voice",
        from: { nodeId: "server-section", side: "right" },
        to: { nodeId: "voice-section", side: "left" },
        bidirectional: true,
      },
      {
        id: "nlp-to-openai",
        from: { nodeId: "fastapi-nlp", side: "right" },
        to: { nodeId: "openai", side: "left" },
        bidirectional: true,
      },
      {
        id: "api-to-database",
        from: { nodeId: "node-api", side: "bottom" },
        to: { nodeId: "database", side: "top" },
        bidirectional: true,
      },
    ],
  };
}

function getTodayInTechDetailCanvas(project: Project): {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
} {
  const architectureOrigin = { x: 13, y: 62 };
  const architectureX = (x: number) => architectureOrigin.x + x;
  const architectureY = (y: number) => architectureOrigin.y + y;
  const featuresOrigin = { x: 88, y: 62 };
  const featuresX = (x: number) => featuresOrigin.x + x;
  const featuresY = (y: number) => featuresOrigin.y + y;
  const outcomeOrigin = { x: 13, y: 150 };
  const outcomeX = (x: number) => outcomeOrigin.x + x;
  const outcomeY = (y: number) => outcomeOrigin.y + y;

  const nodes: CanvasNode[] = [
    {
      id: "project-icon",
      kind: "note",
      appearance: "transparent",
      excludeFromSequence: true,
      x: 13,
      y: 7,
      width: 10,
      image: {
        src: "/today-in-tech.svg",
        alt: "Today in Tech icon",
        width: 120,
        height: 120,
        frame: "plain",
      },
      markdown: "",
    },
    {
      id: "summary",
      kind: "note",
      appearance: "transparent",
      order: 1,
      x: 26,
      y: 8,
      width: 50,
      markdown:
        "**Today in Tech는 기술 뉴스와 공식 기술 블로그의 중요한 흐름만 선별해 누적하는 AI 기반 큐레이션 아카이브입니다.**\n\nRSS/Atom 피드와 공식 sitemap을 매일 수집하고, AI 기반 News Editor Agent가 의미 있는 글을 선별해 Docusaurus 문서 사이트로 누적 배포하는 구조를 목표로 합니다.",
    },
    {
      id: "info",
      title: "Info",
      kind: "note",
      order: 2,
      x: 79,
      y: 10,
      width: 24,
      markdown: [
        "- :calendar: 2026.5 ~ In Progress",
        "- :stack: `Python 3.14` `OpenAI` `Docusaurus` `GitHub Actions`",
        "",
        `- :github: [GitHub|Today in Tech GitHub 저장소로 이동](${project.href})`,
        "- :website: [Website|Today in Tech 사이트로 이동](https://todayintech.github.io/todayintech/)",
      ].join("\n"),
    },
    {
      id: "project-goals",
      kind: "note",
      appearance: "transparent",
      order: 3,
      x: 13,
      y: 35,
      width: 47,
      markdown:
        "# Project Goals\n\n**매일 쏟아지는 기술 콘텐츠 중 의미 있는 흐름만 남기는 아카이브를 만드는 것이 목표였습니다.**\n\n기술 뉴스와 공식 블로그는 여러 채널에 흩어져 있고, 매일 직접 확인하기 어렵습니다. Today in Tech는 수집, 전처리, 원문 enrichment, Writer Agent, Docusaurus 배포 흐름을 하나의 자동화 파이프라인으로 연결합니다.",
    },
    {
      id: "goals-list",
      title: "Goals",
      kind: "note",
      order: 4,
      x: 64,
      y: 42,
      width: 30,
      markdown: [
        "",
        "- 공식 기술 콘텐츠 수집",
        "- 중복 제거와 후보 전처리",
        "- 원문 enrichment",
        "- AI Writer 기반 문서 생성",
        "- Docusaurus 아카이브 배포",
      ].join("\n"),
    },
    {
      id: "quick-start",
      title: "Quick Start",
      kind: "note",
      order: 5,
      x: 100,
      y: 16,
      width: 40,
      markdown:
        "```bash\npython3 -m venv .venv\n.venv/bin/python -m pip install -e .\nnpm install\n```\n\n```bash\nmake collect\nmake preprocess\nmake enrich\nmake write\nmake build\nmake serve\n```\n\n```bash\nOPENAI_API_KEY=sk-... make generate-openai\nmake deploy\n```",
    },
    {
      id: "architecture-title",
      kind: "note",
      appearance: "transparent",
      order: 6,
      x: architectureX(0),
      y: architectureY(0),
      width: 34,
      markdown: "# System Architecture",
    },
    {
      id: "pipeline-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/application.svg", alt: "Pipeline" },
      excludeFromSequence: true,
      x: architectureX(0),
      y: architectureY(7),
      width: 82,
      height: 450,
      markdown: "## Curation Pipeline",
    },
    ...[
      ["collector", "Collect", "/icons/sections/backend.svg", "RSS / Sitemap"],
      ["preprocess", "Preprocess", "/icons/tech/database.svg", "Deduplicate"],
      ["enrich", "Enrich", "/icons/tech/openai.svg", "Article Evidence"],
      ["writer", "Writer Agent", "/icons/tech/openai.svg", "Markdown Draft"],
      ["docusaurus", "Docusaurus", "/icons/tech/docusaurus.svg", "Archive Site"],
      ["github-actions", "GitHub Actions", "/icons/tech/github-actions.svg", "Deploy"],
    ].map(([id, title, icon, detail], index) => ({
      id,
      kind: "note" as const,
      appearance: "technology" as const,
      icon: { src: icon, alt: title },
      order: 7 + index,
      x: architectureX(4 + index * 12.5),
      y: architectureY(25),
      width: 11,
      markdown: `**${title}**\n\n${detail}`,
    })),
    {
      id: "storage",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/database.svg", alt: "JSON files" },
      order: 13,
      x: architectureX(22),
      y: architectureY(45),
      width: 14,
      markdown: "**JSON Store**\n\nraw / processed / trace",
    },
    {
      id: "website",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/github.svg", alt: "GitHub Pages" },
      order: 14,
      x: architectureX(50),
      y: architectureY(45),
      width: 14,
      markdown: "**GitHub Pages**\n\nPublished Archive",
    },
    {
      id: "features-title",
      kind: "note",
      appearance: "transparent",
      order: 15,
      x: featuresX(0),
      y: featuresY(0),
      width: 30,
      markdown: "# Features",
    },
    ...[
      ["feature-collect", "Multi-source Collector", "Hacker News, GitHub Blog, Google Blog, OpenAI Blog, Anthropic Blog 같은 대상에서 공식 feed와 sitemap 기반으로 원문 후보를 수집합니다."],
      ["feature-preprocess", "Preprocessing", "URL 정규화, 중복 제거, 이미 처리한 글 필터링, 후보 점수화를 통해 Writer Agent 입력을 정리합니다."],
      ["feature-enrich", "Enrichment", "원문 HTML을 heading, paragraph, list, code, table 단위로 추출하고 긴 문서는 근거 chunk를 선택합니다."],
      ["feature-archive", "Docusaurus Archive", "선별된 글을 서비스별 Markdown 문서로 생성하고 Docusaurus 기반 문서 사이트에 누적합니다."],
    ].map(([id, title, body], index) => ({
      id,
      kind: "note" as const,
      appearance: "feature" as const,
      order: 16 + index,
      x: featuresX(index % 2 === 0 ? 0 : 42),
      y: featuresY(10 + Math.floor(index / 2) * 22),
      width: 38,
      markdown: `## ${title}\n\n${body}`,
    })),
    {
      id: "results",
      kind: "note",
      appearance: "transparent",
      order: 20,
      x: outcomeX(0),
      y: outcomeY(0),
      width: 40,
      markdown:
        "# Results\n\n**기술 콘텐츠 수집부터 문서 사이트 배포까지 이어지는 큐레이션 파이프라인의 기본 구조를 만들었습니다.**\n\nMVP 단계에서 서비스별 정보 수집, raw snapshot 저장, 전처리 후보 생성, Writer draft 문서 생성, 운영 trace, Docusaurus 빌드/배포 흐름을 구성했습니다.",
    },
    {
      id: "lessons",
      kind: "note",
      appearance: "transparent",
      order: 21,
      x: outcomeX(44),
      y: outcomeY(4),
      width: 40,
      markdown:
        "# Lessons Learned\n\n**AI 큐레이션은 모델 응답보다 신뢰 가능한 수집·근거·추적 구조가 먼저 필요했습니다.**\n\n이 프로젝트를 통해 collector strategy, 중복 제거, 원문 enrichment, Writer Agent 입력 설계, Docusaurus 배포, 운영 trace 관리 흐름을 정리할 수 있었습니다.",
    },
  ];

  return {
    nodes,
    edges: [
      {
        id: "collector-to-preprocess",
        from: { nodeId: "collector", side: "right" },
        to: { nodeId: "preprocess", side: "left" },
        directed: true,
      },
      {
        id: "preprocess-to-enrich",
        from: { nodeId: "preprocess", side: "right" },
        to: { nodeId: "enrich", side: "left" },
        directed: true,
      },
      {
        id: "enrich-to-writer",
        from: { nodeId: "enrich", side: "right" },
        to: { nodeId: "writer", side: "left" },
        directed: true,
      },
      {
        id: "writer-to-docusaurus",
        from: { nodeId: "writer", side: "right" },
        to: { nodeId: "docusaurus", side: "left" },
        directed: true,
      },
      {
        id: "docusaurus-to-actions",
        from: { nodeId: "docusaurus", side: "right" },
        to: { nodeId: "github-actions", side: "left" },
        directed: true,
      },
      {
        id: "storage-to-website",
        from: { nodeId: "storage", side: "right" },
        to: { nodeId: "website", side: "left" },
        directed: true,
      },
    ],
  };
}

function getHippoBoxDetailCanvas(project: Project): {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
} {
  const architectureOrigin = { x: 13, y: 84 };
  const architectureX = (x: number) => architectureOrigin.x + x;
  const architectureY = (y: number) => architectureOrigin.y + y;

  // Default system architecture layout pattern for project detail pages.
  // Future project architecture canvases should follow this structure:
  // overview slogan -> sectioned architecture groups -> nearby transparent
  // explanation slogans -> deploy pipeline.
  const architectureNodes: CanvasNode[] = [
    {
      id: "architecture-title",
      kind: "note",
      appearance: "transparent",
      order: 6,
      x: architectureX(0),
      y: architectureY(0),
      width: 30,
      markdown: "# System Architecture",
    },
    {
      id: "application-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/application.svg", alt: "Application" },
      excludeFromSequence: true,
      x: architectureX(0),
      y: architectureY(5),
      width: 56,
      height: 660,
      markdown: "## Application",
    },
    {
      id: "frontend-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/frontend.svg", alt: "Frontend" },
      excludeFromSequence: true,
      x: architectureX(2),
      y: architectureY(14),
      width: 23,
      height: 260,
      markdown: "## Frontend",
    },
    {
      id: "react",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/react.svg", alt: "React" },
      order: 7,
      x: architectureX(4),
      y: architectureY(23),
      width: 9.5,
      markdown: "**React**",
    },
    {
      id: "typescript",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/typescript.svg", alt: "TypeScript" },
      order: 8,
      x: architectureX(14),
      y: architectureY(23),
      width: 9.5,
      markdown: "**TypeScript**",
    },
    {
      id: "frontend-description",
      kind: "note",
      appearance: "transparent",
      order: 9,
      x: architectureX(4),
      y: architectureY(36),
      width: 20,
      markdown:
        "**React와 TypeScript 기반의 모놀리식 프론트엔드입니다.**\n\n**OpenAPI Generator**를 통해 백엔드 API 클라이언트를 자동 생성하여 **프론트엔드와 백엔드 간 인터페이스**를 일관되게 유지했습니다. 배포 시에는 **정적 파일을 모놀리식 애플리케이션에서 함께 제공**하여 단일 서버만으로 서비스를 운영할 수 있도록 구성했습니다.",
    },
    {
      id: "backend-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/backend.svg", alt: "Backend" },
      excludeFromSequence: true,
      x: architectureX(28),
      y: architectureY(14),
      width: 27,
      height: 500,
      markdown: "## Backend",
    },
    {
      id: "fastapi",
      kind: "note",
      icon: { src: "/icons/tech/fastapi.svg", alt: "FastAPI" },
      layer: "background",
      order: 10,
      x: architectureX(29.5),
      y: architectureY(22),
      width: 24,
      height: 230,
      markdown: "**FastAPI**\n\nKnowledge API",
    },
    {
      id: "mcp",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/mcp.svg", alt: "Model Context Protocol" },
      order: 12,
      x: architectureX(42),
      y: architectureY(31),
      width: 11,
      markdown: "**MCP Server**\n\nFastAPI-MCP",
    },
    {
      id: "sqlalchemy",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/sqlalchemy.svg", alt: "SQLAlchemy" },
      order: 11,
      x: architectureX(30),
      y: architectureY(31),
      width: 11,
      markdown: "**SQLAlchemy**\n\nData Access / ORM",
    },
    {
      id: "qdrant",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/qdrant.svg", alt: "Qdrant" },
      order: 14,
      x: architectureX(42),
      y: architectureY(43),
      width: 11,
      markdown: "**Qdrant**\n\nVector Index",
    },
    {
      id: "database",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/database.svg", alt: "Database" },
      order: 13,
      x: architectureX(30),
      y: architectureY(43),
      width: 11,
      markdown: "**Database**\n\nKnowledge Metadata",
    },
    {
      id: "mcp-clients-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/tech/mcp.svg", alt: "MCP Clients" },
      excludeFromSequence: true,
      x: architectureX(57),
      y: architectureY(14),
      width: 25,
      height: 260,
      markdown: "## MCP Clients",
    },
    {
      id: "claude",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/claude.svg", alt: "Claude" },
      order: 15,
      x: architectureX(58.5),
      y: architectureY(23),
      width: 6.8,
      markdown: "**Claude**",
    },
    {
      id: "cursor",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/cursor.svg", alt: "Cursor" },
      order: 16,
      x: architectureX(66.4),
      y: architectureY(23),
      width: 6.8,
      markdown: "**Cursor**",
    },
    {
      id: "openai",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/openai.svg", alt: "OpenAI Codex" },
      order: 17,
      x: architectureX(74.3),
      y: architectureY(23),
      width: 6.8,
      markdown: "**Codex**",
    },
    {
      id: "backend-mcp-description",
      kind: "note",
      appearance: "transparent",
      order: 18,
      x: architectureX(57),
      y: architectureY(36),
      width: 25,
      markdown:
        "**Knowledge CRUD를 제공하는 FastAPI 기반 백엔드입니다.**\n\n**FastAPI-MCP**를 통해 REST API를 **MCP(Model Context Protocol) 도구**로 동시에 제공하여 **AI Agent가 동일한 기능을 직접 호출**할 수 있도록 구성했습니다. 이를 통해 **Claude, Cursor, Codex** 등 MCP를 지원하는 다양한 AI 클라이언트에서 별도의 API 구현 없이 동일한 **Knowledge API**를 활용할 수 있습니다. 또한 **SQLAlchemy** 기반으로 다양한 데이터베이스를 지원하며, **Qdrant**를 활용한 **임베딩 기반 RAG 검색** 기능을 제공합니다.",
    },
    {
      id: "deploy-section",
      kind: "note",
      appearance: "section",
      icon: { src: "/icons/sections/deploy.svg", alt: "Deploy" },
      excludeFromSequence: true,
      x: architectureX(28),
      y: architectureY(58),
      width: 38,
      height: 600,
      markdown: "## Deploy",
    },
    {
      id: "deploy-description",
      kind: "note",
      appearance: "transparent",
      order: 19,
      x: architectureX(4),
      y: architectureY(64),
      width: 22,
      markdown:
        "**로컬 개발 환경과 CI 환경에서 동일한 빌드 과정을 사용할 수 있도록 배포 파이프라인을 구성했습니다.**\n\n**Hatch**를 공통 빌드 엔트리로 사용하여 **Docker 이미지 생성**과 **GitHub Actions 기반 CI**를 일관되게 관리하며, 빌드 결과물은 **Docker Image, PyPI, GitHub Container Registry(GHCR)**에 자동 배포됩니다.",
    },
    {
      id: "hatch-script",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/hatch.svg", alt: "Hatch" },
      order: 20,
      x: architectureX(39.5),
      y: architectureY(65),
      width: 14,
      markdown: "**Hatch Script**\n\nShared Build Entry",
    },
    {
      id: "local-build",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/docker.svg", alt: "Docker" },
      order: 21,
      x: architectureX(31),
      y: architectureY(77),
      width: 14,
      markdown: "**Local Build**\n\nDocker Build",
    },
    {
      id: "github-actions",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/github-actions.svg", alt: "GitHub Actions" },
      order: 22,
      x: architectureX(47),
      y: architectureY(77),
      width: 14,
      markdown: "**GitHub Actions**\n\nCI Build",
    },
    {
      id: "docker-image",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/docker.svg", alt: "Docker image" },
      order: 23,
      x: architectureX(30),
      y: architectureY(89),
      width: 14,
      markdown: "**Docker Image**\n\nLocal",
    },
    {
      id: "pypi",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/pypi.svg", alt: "PyPI" },
      order: 24,
      x: architectureX(45),
      y: architectureY(89),
      width: 9,
      markdown: "**PyPI**\n\nPackage",
    },
    {
      id: "ghcr",
      kind: "note",
      appearance: "technology",
      icon: { src: "/icons/tech/github.svg", alt: "GitHub Container Registry" },
      order: 25,
      x: architectureX(55),
      y: architectureY(89),
      width: 10,
      markdown: "**GHCR**\n\nRegistry",
    },
    {
      id: "quick-start",
      title: "Quick Start",
      kind: "note",
      order: 5,
      x: architectureX(88),
      y: architectureY(-77),
      width: 82,
      markdown:
        "## 실행 방법\n\n### 패키지로 실행\n\n```bash\npip install hippobox\n\n# 기본 실행\nhippobox run\n\n# 호스트와 포트를 지정해서 실행\nhippobox run --host 0.0.0.0 --port 8080\n```\n\n### 소스에서 실행\n\n**1. uv 설치**\n\n```bash\n# macOS / Linux\ncurl -LsSf https://astral.sh/uv/install.sh | sh\n\n# Windows PowerShell\nirm https://astral.sh/uv/install.ps1 | iex\n```\n\n**2. 백엔드 의존성 설치**\n\n```bash\ncd src/backend\nuv sync\n```\n\n**3. 서버 실행**\n\n```bash\ncd src/backend\nuv run uvicorn hippobox.server:app --reload\n```\n\n**4. 프론트엔드 실행 및 빌드**\n\n```bash\ncd src/frontend\nnpm install\nnpm run dev       # backend serving용 dist watch build\nnpm run dev:vite  # Vite 개발 서버, 기본 5173\nnpm run build     # backend serving용 정적 파일 빌드\nnpm run preview   # 빌드 결과 미리보기\n```",
    },
    {
      id: "features-title",
      kind: "note",
      appearance: "transparent",
      order: 26,
      x: architectureX(88),
      y: architectureY(0),
      width: 30,
      markdown: "# Features",
    },
    {
      id: "feature-knowledge-ui",
      kind: "note",
      appearance: "feature",
      order: 28,
      x: architectureX(88),
      y: architectureY(36),
      width: 40,
      markdown:
        "## Knowledge UI\n\nHippoBox는 저장된 지식을 사람이 직접 관리할 수 있는 **Knowledge UI**를 제공합니다. 지식은 **Topic** 단위로 분류되고, 제목·태그·본문을 함께 저장할 수 있으며, 본문은 **Markdown 기반 지식**으로 관리됩니다.",
    },
    {
      id: "feature-knowledge-ui-image",
      kind: "note",
      appearance: "transparent",
      order: 27,
      x: architectureX(88),
      y: architectureY(5),
      width: 40,
      image: {
        src: "/images/hippobox-guide/step-6.png",
        alt: "HippoBox knowledge UI with topic and markdown knowledge entries",
        width: 1920,
        height: 1080,
        frame: "outline",
        frameHeight: 400,
        fit: "cover",
      },
      markdown: "",
    },
    {
      id: "feature-hippo-search",
      kind: "note",
      appearance: "feature",
      order: 30,
      x: architectureX(130),
      y: architectureY(36),
      width: 40,
      markdown:
        "## Hippo Search\n\n**Hippo Search(VDB)**는 저장된 지식을 임베딩한 뒤 의미 기반으로 검색하는 기능입니다. 단순 키워드 매칭이 아니라 질문의 의미와 가까운 지식을 찾아 **AI Agent가 필요한 컨텍스트**를 안정적으로 가져오도록 설계했습니다.",
    },
    {
      id: "feature-hippo-search-image",
      kind: "note",
      appearance: "transparent",
      order: 29,
      x: architectureX(130),
      y: architectureY(5),
      width: 40,
      image: {
        src: "/images/hippobox-guide/step-3.png",
        alt: "Hippo Search vector database search result",
        width: 1278,
        height: 170,
        frame: "outline",
        frameHeight: 400,
        fit: "contain",
      },
      markdown: "",
    },
    {
      id: "feature-mcp-crud",
      kind: "note",
      appearance: "feature",
      order: 32,
      x: architectureX(88),
      y: architectureY(79),
      width: 40,
      markdown:
        "## AI Agent Knowledge CRUD\n\nHippoBox는 **FastAPI-MCP**를 통해 Knowledge CRUD API를 **MCP Tool**로 제공합니다. Claude, Cursor, Codex 같은 MCP 클라이언트는 별도 전용 API 구현 없이 동일한 **Knowledge API**를 호출할 수 있습니다.",
    },
    {
      id: "feature-mcp-crud-image",
      kind: "note",
      appearance: "transparent",
      order: 31,
      x: architectureX(88),
      y: architectureY(48),
      width: 40,
      image: {
        src: "/images/hippobox-guide/step-4.png",
        alt: "HippoBox MCP setup guide for Claude Cursor and Codex",
        width: 1920,
        height: 1080,
        frame: "outline",
        frameHeight: 400,
        fit: "cover",
      },
      markdown: "",
    },
    {
      id: "feature-terminal-crud",
      kind: "note",
      appearance: "feature",
      order: 34,
      x: architectureX(130),
      y: architectureY(79),
      width: 40,
      markdown:
        "## Terminal Workflow\n\nMCP 클라이언트에서 HippoBox 도구를 호출하면 Agent가 Knowledge API를 통해 실제 지식 항목을 생성하고 결과를 반환합니다. 터미널 출력에서는 **Frontend / Backend 지식 항목 생성 흐름**을 확인할 수 있습니다.",
    },
    {
      id: "feature-terminal-crud-image",
      kind: "note",
      appearance: "transparent",
      order: 33,
      x: architectureX(130),
      y: architectureY(48),
      width: 40,
      image: {
        src: "/images/hippobox-guide/step-5_2.png",
        alt: "HippoBox terminal output showing created knowledge entries",
        width: 556,
        height: 119,
        frame: "outline",
        frameHeight: 400,
        fit: "contain",
      },
      markdown: "",
    },
    {
      id: "project-results",
      kind: "note",
      appearance: "transparent",
      order: 35,
      x: architectureX(80),
      y: architectureY(110),
      width: 40,
      markdown:
        "# Results\n\n**사람과 AI가 하나의 Knowledge Base를 함께 사용할 수 있도록 만들었습니다.**\n\nHippoBox는 제가 처음 목표로 했던 **Local-first Knowledge Platform**을 실제로 구현한 프로젝트입니다. **Markdown 기반**으로 지식을 관리하고, **MCP**를 통해 AI Agent와 연결하며, **Semantic Search**를 통해 필요한 지식을 의미 기반으로 찾을 수 있도록 구성했습니다.\n\n사용자는 하나의 **Knowledge Base**만 관리하면 되고, **Claude, Cursor, Codex** 같은 AI Agent는 동일한 **Knowledge API**를 통해 같은 지식을 활용할 수 있습니다. 사람이 관리한 지식을 AI도 자연스럽게 활용하는 환경을 만드는 것이 HippoBox의 가장 큰 결과였습니다.",
    },
    {
      id: "lesson-learned",
      kind: "note",
      appearance: "transparent",
      order: 36,
      x: architectureX(130),
      y: architectureY(110),
      width: 40,
      markdown:
        "# Lessons Learned\n\n**AI 기능을 만드는 것보다 AI가 활용하기 쉬운 구조를 만드는 것이 더 중요했습니다.**\n\nHippoBox를 개발하면서 **FastAPI 기반 백엔드**, **MCP 서버**, 그리고 **RAG 기반 Semantic Search**를 직접 설계하고 구현하며 AI 친화적인 서비스 구조를 고민할 수 있었습니다.\n\n또 하나 크게 느낀 점은 에이전틱 코딩을 반복적으로 활용하려면 프로젝트를 처음부터 다시 만드는 것이 아니라, 인증, 배포, 프로젝트 구조 같은 기반이 미리 준비되어 있어야 한다는 것이었습니다. 그래서 HippoBox에서 얻은 경험을 바탕으로 AI 애플리케이션을 빠르게 시작할 수 있는 **Blueprint4Agent(B4A)** 프로젝트를 이어서 개발하게 되었습니다.",
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
        y: 28,
        width: 50,
        markdown: [
          "**HippoBox는 개인 지식을 체계적으로 관리하고 AI Agent가 활용할 수 있도록 설계한 Knowledge Management Platform입니다.**",
          "",
          "**FastAPI와 FastAPI-MCP**를 기반으로 구축한 통합 지식 관리 서비스로, 지식 항목에 대한 **CRUD(Create, Read, Update, Delete)**, 임베딩 기반 **Semantic Search**, **MCP(Model Context Protocol) Tool Integration**을 제공합니다. 이를 통해 **Claude, Cursor, Codex** 등 MCP를 지원하는 다양한 AI 클라이언트에서 동일한 **Knowledge API**를 일관된 방식으로 활용할 수 있습니다.",
          "",
          "이 페이지에서는 HippoBox를 개발하게 된 목표와 시스템 아키텍처, 주요 기능 및 구현 과정, 그리고 프로젝트를 통해 얻은 결과와 경험을 소개합니다.",
        ].join("\n"),
      },
      {
        id: "hippobox-banner",
        kind: "note",
        appearance: "transparent",
        excludeFromSequence: true,
        x: 13,
        y: 6,
        width: 38,
        image: {
          src: "/images/hippobox-banner.png",
          alt: "HippoBox banner",
          width: 5330,
          height: 1793,
        },
        markdown: "",
      },
      {
        id: "github-status",
        title: "Info",
        kind: "note",
        order: 2,
        x: 65,
        y: 28,
        width: 24,
        markdown: [
          "- :calendar: 2025.11 ~ 2026.2",
          "- :stack: `FastAPI` `TypeScript` `MCP` `Qdrant`",
          "",
          `- :github: [GitHub|HippoBox GitHub 저장소로 이동](${project.href})`,
          "- :package: [PyPI|HippoBox PyPI 패키지로 이동](https://pypi.org/project/hippobox/)",
        ].join("\n"),
      },
      {
        id: "project-goals",
        kind: "note",
        appearance: "transparent",
        order: 3,
        x: 13,
        y: 51,
        width: 43,
        markdown: [
          "# Project Goals",
          "",
          "**AI가 활용할 수 있는 지식은 사람도 쉽게 관리할 수 있어야 합니다.**",
          "",
          "AI 도구가 늘어날수록 지식은 여러 서비스에 분산되고, 같은 내용을 반복해서 관리해야 하는 문제가 발생합니다.",
          "",
          "HippoBox는 하나의 **Knowledge Base**를 중심으로 사람과 AI가 동일한 지식을 함께 활용할 수 있는 환경을 목표로 시작한 프로젝트입니다.",
          "",
          "이를 위해 **FastAPI 기반의 Knowledge CRUD 서비스**를 구축하고, **FastAPI-MCP**를 통해 동일한 기능을 **MCP(Model Context Protocol) Tool**로 제공합니다. 또한 **Qdrant 기반의 임베딩 검색**을 적용하여 AI가 단순 키워드가 아닌 **의미 기반으로 지식을 검색하고 활용**할 수 있도록 설계했습니다.",
        ].join("\n"),
      },
      {
        id: "project-goals-list",
        title: "Goals",
        kind: "note",
        order: 4,
        x: 58,
        y: 58,
        width: 27,
        markdown: [
          "",
          "- Local-first Knowledge Platform",
          "- Markdown 기반 지식 관리",
          "- MCP 기반 AI Agent 연동",
          "- Semantic Search 제공",
          "- 확장 가능한 Backend Architecture",
        ].join("\n"),
      },
      ...architectureNodes,
    ],
    edges: hippoboxArchitectureEdges,
  };
}
