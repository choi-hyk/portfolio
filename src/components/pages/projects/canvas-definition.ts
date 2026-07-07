import type {
  CanvasEdge,
  CanvasNode,
} from "@/components/canvas/workflow-canvas";
import type { Project } from "@/types/project";

type ProjectOverviewPage = {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
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

type ProjectsCanvasDefinition = {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
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

export function getProjectsCanvasDefinition({
  projects,
  projectsPage,
}: {
  projects: Project[];
  projectsPage: ProjectOverviewPage;
}): ProjectsCanvasDefinition {
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

  return {
    edges: [],
    nodes: [
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
    ],
  };
}
