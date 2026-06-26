import type { Project } from "@/data/projects";
import type { Locale } from "./config";

type Writing = {
  title: string;
  category: string;
  description: string;
  href: string;
};

type Dictionary = {
  profile: {
    name: string;
    email: string;
    summary: string;
    links: {
      github: string;
      velog: string;
    };
  };
  nav: {
    projects: string;
    writing: string;
  };
  home: {
    eyebrow: string;
    title: string;
    github: string;
    velog: string;
    email: string;
    stats: string[];
    selectedProjects: {
      eyebrow: string;
      title: string;
      description: string;
      cta: string;
    };
  };
  projectsPage: {
    eyebrow: string;
    title: string;
    description: string;
  };
  writingPage: {
    eyebrow: string;
    title: string;
    description: string;
  };
  projects: Project[];
  writings: Writing[];
};

export const dictionaries: Record<Locale, Dictionary> = {
  ko: {
    profile: {
      name: "Choi Hyuk",
      email: "blindlchoil@gmail.com",
      summary:
        "FastAPI와 Python 기반 백엔드 개발을 중심으로 RAG/LLM 서비스, MCP 기반 지식 관리, 개발 자동화 도구를 만들고 있습니다. 사이냅소프트에서 FastAPI와 RAG 기반 서비스 개발을 경험하고 있으며, 개인 및 조직 프로젝트를 통해 AI 애플리케이션을 제품 구조로 구현하는 데 집중하고 있습니다.",
      links: {
        github: "https://github.com/choi-hyk",
        velog: "https://velog.io/@choi-hyk/posts",
      },
    },
    nav: {
      projects: "Projects",
      writing: "Writing",
    },
    home: {
      eyebrow: "Backend · RAG · MCP · Agentic Workflow",
      title: "FastAPI와 AI 서비스를 실제 제품 구조로 연결하는 개발자",
      github: "GitHub",
      velog: "Velog",
      email: "Email",
      stats: [
        "Synapsoft · FastAPI/RAG service development",
        "Myongji University · Computer Engineering",
        "Seoul, Korea · Open to backend/AI application roles",
      ],
      selectedProjects: {
        eyebrow: "Selected Projects",
        title: "조직 프로젝트와 개인 도구를 중심으로 구성했습니다.",
        description:
          "HippoBox, Blueprint4Agent, 말하면 OK처럼 FastAPI, MCP, Agent, 음성/NLP 경험을 보여줄 수 있는 프로젝트를 우선 배치합니다.",
        cta: "모든 프로젝트 보기",
      },
    },
    projectsPage: {
      eyebrow: "Projects",
      title: "포트폴리오에 노출할 프로젝트 목록",
      description:
        "각 프로젝트는 문제 정의, 역할, 기술 선택 이유, 결과 화면을 추가하면서 상세 페이지로 확장할 예정입니다.",
    },
    writingPage: {
      eyebrow: "Writing",
      title: "개발 과정에서 남긴 기록",
      description:
        "Velog 글은 실무와 개인 프로젝트에서 마주친 문제를 설명하는 보조 증거로 활용합니다.",
    },
    projects: [
      {
        slug: "hippobox",
        title: "HippoBox",
        type: "Organization",
        description:
          "여러 AI 서비스에서 공통으로 사용할 수 있는 개인 지식 베이스 서비스입니다. FastAPI 기반 API, 임베딩 검색, MCP 연동을 통해 Claude, Cursor, Codex 같은 MCP 호환 클라이언트에서 저장된 지식을 활용할 수 있도록 구성했습니다.",
        href: "https://github.com/HippoBox/hippobox",
        stack: ["FastAPI", "MCP", "Embeddings", "TypeScript"],
        featured: true,
      },
      {
        slug: "blueprint4agent",
        title: "Blueprint4Agent / B4A",
        type: "Organization",
        description:
          "Agentic coding workflow에 맞춘 FastAPI 풀스택 서버 블루프린트와 GitHub 자동화 도구입니다. B4FastAPI와 B4Bot을 통해 서버 템플릿, 문서, CI, 이슈 생성 자동화를 표준화했습니다.",
        href: "https://github.com/Blueprint4Agent",
        stack: ["FastAPI", "React", "GitHub Actions", "Docker"],
        featured: true,
      },
      {
        slug: "say-it-its-ok",
        title: "말하면 OK",
        type: "Team Project",
        description:
          "음성 인식 기반 키오스크 서비스입니다. React 클라이언트, Node.js API 서버, FastAPI NLP 서버가 분리된 구조로 주문 및 추천 흐름을 지원했습니다.",
        href: "https://github.com/Say-It-It-s-OK",
        stack: ["React", "Node.js", "FastAPI", "OpenAI"],
        featured: true,
      },
      {
        slug: "today-in-tech",
        title: "Today in Tech",
        type: "Organization",
        description:
          "기술 뉴스와 공식 기술 블로그를 수집하고 AI Agent로 선별해 Docusaurus 문서 사이트로 누적 배포하는 큐레이션 아카이브입니다.",
        href: "https://github.com/TodayInTech/todayintech",
        stack: ["Python", "OpenAI", "Docusaurus", "GitHub Actions"],
        featured: true,
      },
      {
        slug: "velog-sync",
        title: "velog-sync",
        type: "Open Source",
        description:
          "Velog 글을 GraphQL API로 수집해 시리즈별 Markdown 파일로 백업하는 Python CLI 패키지입니다. PyPI 배포와 GitHub Actions 자동 동기화 예시를 제공합니다.",
        href: "https://github.com/choi-hyk/velog_sync",
        stack: ["Python", "GraphQL", "PyPI", "GitHub Actions"],
        featured: false,
      },
      {
        slug: "note-agent",
        title: "note_agent",
        type: "Personal Project",
        description:
          "FastAPI와 LangServe를 사용해 노트 작성 Agent 서버를 구성한 프로젝트입니다. Swagger와 LangServe Playground를 통해 Agent 실행 환경을 확인할 수 있습니다.",
        href: "https://github.com/choi-hyk/note_agent",
        stack: ["FastAPI", "LangServe", "OpenAI", "Python"],
        featured: false,
      },
    ],
    writings: [
      {
        title: "[HippoBox] HippoBox 시작하기",
        category: "Project",
        description:
          "여러 AI 서비스에서 사용 가능한 지식 베이스 서비스를 만들기 시작한 배경과 FastAPI, MCP 기반 구조 선택을 정리한 글입니다.",
        href: "https://velog.io/@choi-hyk/Project-HippoBox-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0",
      },
      {
        title: "[FastAPI] sync/async 의 논리적 구조",
        category: "FastAPI",
        description:
          "FastAPI에서 동기/비동기 함수가 처리되는 방식과 ASGI, blocking/non-blocking 구조를 정리한 글입니다.",
        href: "https://velog.io/@choi-hyk/posts",
      },
      {
        title: "[Mini Project] Velog Backup 프로그램 만들기",
        category: "Automation",
        description:
          "Velog 글을 Markdown으로 백업하고 자동화하는 도구를 만들며 GraphQL, 패키징, GitHub Actions 흐름을 정리한 글입니다.",
        href: "https://velog.io/@choi-hyk/posts",
      },
    ],
  },
  en: {
    profile: {
      name: "Choi Hyuk",
      email: "blindlchoil@gmail.com",
      summary:
        "I build FastAPI and Python-based backend services, RAG/LLM applications, MCP-powered knowledge tools, and developer automation. At Synapsoft, I have worked on FastAPI and RAG-based service development, and I focus on turning AI application ideas into product-ready structures through personal and organization projects.",
      links: {
        github: "https://github.com/choi-hyk",
        velog: "https://velog.io/@choi-hyk/posts",
      },
    },
    nav: {
      projects: "Projects",
      writing: "Writing",
    },
    home: {
      eyebrow: "Backend · RAG · MCP · Agentic Workflow",
      title: "Connecting FastAPI and AI services into product-ready systems",
      github: "GitHub",
      velog: "Velog",
      email: "Email",
      stats: [
        "Synapsoft · FastAPI/RAG service development",
        "Myongji University · Computer Engineering",
        "Seoul, Korea · Open to backend/AI application roles",
      ],
      selectedProjects: {
        eyebrow: "Selected Projects",
        title: "Focused on organization projects and practical developer tools.",
        description:
          "The portfolio prioritizes projects that show FastAPI, MCP, agent workflows, voice interfaces, and NLP experience.",
        cta: "View all projects",
      },
    },
    projectsPage: {
      eyebrow: "Projects",
      title: "Portfolio project list",
      description:
        "Each project can later expand into a detailed page with problem definition, role, technical choices, and screenshots.",
    },
    writingPage: {
      eyebrow: "Writing",
      title: "Technical notes from development work",
      description:
        "Velog articles support the portfolio by explaining problems encountered in work and personal projects.",
    },
    projects: [
      {
        slug: "hippobox",
        title: "HippoBox",
        type: "Organization",
        description:
          "A personal knowledge base service designed for multiple AI clients. It combines FastAPI APIs, embedding search, and MCP integration for Claude, Cursor, Codex, and other MCP-compatible clients.",
        href: "https://github.com/HippoBox/hippobox",
        stack: ["FastAPI", "MCP", "Embeddings", "TypeScript"],
        featured: true,
      },
      {
        slug: "blueprint4agent",
        title: "Blueprint4Agent / B4A",
        type: "Organization",
        description:
          "A FastAPI full-stack blueprint and GitHub automation foundation for agentic coding workflows. B4FastAPI and B4Bot standardize server templates, docs, CI, and issue generation.",
        href: "https://github.com/Blueprint4Agent",
        stack: ["FastAPI", "React", "GitHub Actions", "Docker"],
        featured: true,
      },
      {
        slug: "say-it-its-ok",
        title: "Say It, It's OK",
        type: "Team Project",
        description:
          "A voice-based kiosk service with a React client, Node.js API server, and FastAPI NLP server supporting order and recommendation flows.",
        href: "https://github.com/Say-It-It-s-OK",
        stack: ["React", "Node.js", "FastAPI", "OpenAI"],
        featured: true,
      },
      {
        slug: "today-in-tech",
        title: "Today in Tech",
        type: "Organization",
        description:
          "An AI-powered tech news curation archive that collects official tech blogs and news, selects meaningful articles, and publishes them to a Docusaurus site.",
        href: "https://github.com/TodayInTech/todayintech",
        stack: ["Python", "OpenAI", "Docusaurus", "GitHub Actions"],
        featured: true,
      },
      {
        slug: "velog-sync",
        title: "velog-sync",
        type: "Open Source",
        description:
          "A Python CLI package that fetches Velog posts through GraphQL and backs them up as Markdown files by series, with PyPI distribution and GitHub Actions automation examples.",
        href: "https://github.com/choi-hyk/velog_sync",
        stack: ["Python", "GraphQL", "PyPI", "GitHub Actions"],
        featured: false,
      },
      {
        slug: "note-agent",
        title: "note_agent",
        type: "Personal Project",
        description:
          "A note-writing agent server built with FastAPI and LangServe, exposing an agent execution environment through Swagger and LangServe Playground.",
        href: "https://github.com/choi-hyk/note_agent",
        stack: ["FastAPI", "LangServe", "OpenAI", "Python"],
        featured: false,
      },
    ],
    writings: [
      {
        title: "[HippoBox] Getting started with HippoBox",
        category: "Project",
        description:
          "A note on why HippoBox started and why FastAPI and MCP were selected for the project structure.",
        href: "https://velog.io/@choi-hyk/Project-HippoBox-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0",
      },
      {
        title: "[FastAPI] Logical structure of sync/async",
        category: "FastAPI",
        description:
          "A note about how sync and async functions are handled in FastAPI with ASGI and blocking/non-blocking behavior.",
        href: "https://velog.io/@choi-hyk/posts",
      },
      {
        title: "[Mini Project] Building a Velog backup program",
        category: "Automation",
        description:
          "A note about building a Markdown backup and automation tool for Velog with GraphQL, packaging, and GitHub Actions.",
        href: "https://velog.io/@choi-hyk/posts",
      },
    ],
  },
};

export function getDictionary(locale: Locale = "ko") {
  return dictionaries[locale];
}
