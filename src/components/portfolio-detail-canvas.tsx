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

const hippoboxDetailEdges: CanvasEdge[] = [
  {
    id: "summary-to-problem",
    from: { nodeId: "summary", side: "bottom" },
    to: { nodeId: "problem", side: "top" },
    directed: true,
  },
  {
    id: "problem-to-solution",
    from: { nodeId: "problem", side: "right" },
    to: { nodeId: "solution", side: "left" },
    directed: true,
  },
  {
    id: "solution-to-architecture",
    from: { nodeId: "solution", side: "bottom" },
    to: { nodeId: "architecture", side: "top" },
    directed: true,
  },
  {
    id: "architecture-to-features",
    from: { nodeId: "architecture", side: "right" },
    to: { nodeId: "features", side: "left" },
    directed: true,
  },
  {
    id: "features-to-references",
    from: { nodeId: "features", side: "bottom" },
    to: { nodeId: "references", side: "top" },
    directed: false,
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
      {
        id: "problem",
        kind: "note",
        order: 2,
        x: 13,
        y: 32,
        width: 31,
        markdown: [
          "## 문제 정의",
          "AI 개발 도구마다 프로젝트 맥락과 개인 지식을 따로 전달해야 하면 지식이 쉽게 흩어집니다.",
          "",
          "- 같은 내용을 Claude, Cursor, Codex에 반복 입력해야 합니다.",
          "- Markdown으로 정리한 지식이 실제 개발 워크플로우와 분리됩니다.",
          "- 검색과 재사용 기준이 없으면 프로젝트가 커질수록 맥락 유지 비용이 증가합니다.",
        ].join("\n"),
      },
      {
        id: "solution",
        kind: "note",
        order: 3,
        x: 50,
        y: 32,
        width: 32,
        markdown: [
          "## 해결 방법",
          "HippoBox는 로컬 지식 저장소를 중심으로 Markdown 지식을 수집하고, MCP 서버를 통해 AI 개발 도구가 같은 지식에 접근하도록 구성합니다.",
          "",
          "- Local-first 방식으로 개인 지식을 저장합니다.",
          "- MCP를 통해 여러 AI 클라이언트에서 동일한 지식을 조회합니다.",
          "- RAG 검색으로 현재 작업에 필요한 맥락을 빠르게 찾습니다.",
        ].join("\n"),
      },
      {
        id: "architecture",
        kind: "code",
        order: 4,
        x: 13,
        y: 62,
        width: 32,
        markdown: [
          "## 시스템 아키텍처",
          "",
          "```txt",
          "Markdown Knowledge",
          "  ↓ ingest / index",
          "Local Knowledge Store",
          "  ↓ retrieval",
          "FastAPI + MCP Server",
          "  ↓ shared context",
          "Claude / Cursor / Codex",
          "```",
        ].join("\n"),
      },
      {
        id: "features",
        kind: "note",
        order: 5,
        x: 50,
        y: 61,
        width: 32,
        markdown: [
          "## 핵심 기능",
          "- Markdown 기반 지식 저장 및 관리",
          "- MCP 호환 클라이언트에서 지식 조회",
          "- RAG 기반 검색으로 관련 맥락 탐색",
          "- 로컬 환경 중심의 개인 지식 워크플로우",
          "",
          `- :stack: ${project.stack.map((item) => `\`${item}\``).join(" ")}`,
        ].join("\n"),
      },
      {
        id: "references",
        kind: "note",
        order: 6,
        x: 50,
        y: 83,
        width: 32,
        markdown: [
          "## 참고 링크",
          "- :github: [GitHub](https://github.com/HippoBox/hippobox)",
          "- :package: [PyPI](https://pypi.org/project/hippobox/)",
          "",
          "구현 세부 내용은 이후 설치 흐름, MCP 도구 설계, 검색 구조, 사용 예시를 중심으로 보강할 수 있습니다.",
        ].join("\n"),
      },
    ],
    edges: hippoboxDetailEdges,
  };
}
