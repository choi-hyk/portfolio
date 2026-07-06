import type { Project } from "@/data/projects";
import type { Locale } from "./config";

type Writing = {
  title: string;
  category: string;
  description: string;
  href: string;
};

export type Experience = {
  slug: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  stack: string[];
};

type SkillGroup = {
  title: string;
  items: string[];
};

export type Dictionary = {
  profile: {
    name: string;
    role: string;
    email: string;
    summary: string;
    links: {
      github: string;
      velog: string;
    };
  };
  nav: {
    portfolio: string;
    overview: string;
    experience: string;
    projects: string;
    writing: string;
    openSource: string;
    skills: string;
    external: string;
    pagesLabel: string;
    collapsedLabel: string;
    expandSidebar: string;
    collapseSidebar: string;
  };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    slogan: {
      emphasis: string;
      body: string;
      action: string;
      closing: string;
      final: string;
    };
    canvas: {
      previousNode: string;
      nextNode: string;
      focusPreviousNode: string;
      focusNextNode: string;
      moveViewport: string;
      focusNode: string;
      zoomIn: string;
      zoomOut: string;
    };
    profileCard: {
      koreanName: string;
      englishName: string;
      experiences: Array<{
        icon: "school" | "company";
        title: string;
        detail: string;
        period: string;
      }>;
      skills: string[];
    };
    overviewSummary: {
      title: string;
      items: string[];
    };
    projectSectionTitle: string;
    experienceSectionTitle: string;
    writingSectionTitle: string;
    featuredProjects: Array<{
      title: string;
      description: string;
      highlights: string[];
      stack: string[];
      iconSrc: string;
      iconAlt: string;
    }>;
    featuredExperience: {
      title: string;
      description: string;
      highlights: string[];
      stack: string[];
    };
    featuredWriting: {
      title: string;
      description: string;
      articles: string[];
    };
    primaryCta: string;
    secondaryCta: string;
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
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  experience: {
    eyebrow: string;
    title: string;
    items: Experience[];
  };
  skills: {
    eyebrow: string;
    title: string;
    groups: SkillGroup[];
  };
  openSource: {
    eyebrow: string;
    title: string;
    description: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
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
      role: "Backend / AI Application Developer",
      email: "blindlchoil@gmail.com",
      summary:
        "FastAPI와 Python 기반 백엔드 개발을 중심으로 RAG/LLM 서비스, MCP 기반 지식 관리, 개발 자동화 도구를 만들고 있습니다. 사이냅소프트에서 FastAPI와 RAG 기반 서비스 개발을 경험하고 있으며, 개인 및 조직 프로젝트를 통해 AI 애플리케이션을 제품 구조로 구현하는 데 집중하고 있습니다.",
      links: {
        github: "https://github.com/choi-hyk",
        velog: "https://velog.io/@choi-hyk/posts",
      },
    },
    nav: {
      portfolio: "Portfolio",
      overview: "Overview",
      experience: "Experience",
      projects: "Projects",
      writing: "Technical Writing",
      openSource: "Open Source",
      skills: "Skills",
      external: "External",
      pagesLabel: "Portfolio pages",
      collapsedLabel: "Collapsed portfolio navigation",
      expandSidebar: "사이드바 열기",
      collapseSidebar: "사이드바 닫기",
    },
    home: {
      eyebrow: "Backend · RAG · MCP · Agentic Workflow",
      title: "AI 활용 방식을 설계하는 개발자",
      subtitle:
        "저는 AI를 소비하는 개발자가 아니라, AI를 개발 방식으로 만드는 개발자가 되고자 합니다.",
      slogan: {
        emphasis: "새로운 AI 서비스는 계속 등장합니다.",
        body: "하지만 AI 시대의 개발 역량은 새로운 서비스를 만드는 데만 있지 않습니다.",
        action:
          "새로운 기술을 빠르게 이해하고, 검증하고, 기존 개발 환경에 적용하는 것.",
        closing: "AI를 단순히 사용하는 데서 멈추지 않고, AI와 함께 문제를 해결하는 것.",
        final: "그것이 제가 추구하는 AI 시대의 개발 역량입니다.",
      },
      canvas: {
        previousNode: "이전 노드",
        nextNode: "다음 노드",
        focusPreviousNode: "이전 노드로 이동",
        focusNextNode: "다음 노드로 이동",
        moveViewport: "캔버스 보기 영역 이동",
        focusNode: "{node} 노드로 이동",
        zoomIn: "캔버스 확대",
        zoomOut: "캔버스 축소",
      },
      profileCard: {
        koreanName: "최혁",
        englishName: "CHOI HYUK",
        experiences: [
          {
            icon: "school",
            title: "명지대학교",
            detail: "컴퓨터공학과",
            period: "2020 ~ 2026",
          },
          {
            icon: "company",
            title: "Synapsoft",
            detail: "AI Application Developer",
            period: "2025 ~ 2026",
          },
        ],
        skills: ["FastAPI", "RAG", "MCP"],
      },
      overviewSummary: {
        title: "Proof of Work",
        items: [
          ":project: 대표 프로젝트 4개",
          ":company: Synapsoft FastAPI/RAG 서비스 개발",
          ":writing: Velog 기술 글 3개",
        ],
      },
      projectSectionTitle: "Projects",
      experienceSectionTitle: "Experience",
      writingSectionTitle: "Writing",
      featuredProjects: [
        {
          title: "HippoBox",
          description: "MCP 기반 개인 지식 관리 도구입니다.",
          highlights: [
            "지식 항목을 저장하고 검색 가능한 구조로 관리합니다.",
            "Claude, Cursor, Codex 같은 개발 도구와 연결할 수 있습니다.",
          ],
          stack: ["FastAPI", "MCP", "Embedding", "Semantic Search", "CLI"],
          iconSrc: "/hippobox.svg",
          iconAlt: "HippoBox 아이콘",
        },
        {
          title: "말하면 OK",
          description: "음성 인식 기반 키오스크 서비스입니다.",
          highlights: [
            "음성 주문과 추천 흐름을 분리된 서버 구조로 구성했습니다.",
            "React, Node.js, FastAPI NLP 서버를 역할별로 연결했습니다.",
          ],
          stack: ["React", "Node.js", "FastAPI", "OpenAI"],
          iconSrc: "/say-it-ok.png",
          iconAlt: "말하면 OK 아이콘",
        },
        {
          title: "Blueprint4Agent / B4A",
          description:
            "Agentic coding workflow를 위한 FastAPI 풀스택 블루프린트입니다.",
          highlights: [
            "서버 템플릿, 문서, CI, 배포 흐름을 표준화했습니다.",
            "GitHub 자동화와 FastAPI/React 구조를 함께 정리했습니다.",
          ],
          stack: ["FastAPI", "React", "GitHub Actions", "Docker"],
          iconSrc: "/b4a.svg",
          iconAlt: "Blueprint4Agent 아이콘",
        },
        {
          title: "Today in Tech",
          description: "AI 기반 기술 뉴스 큐레이션 아카이브입니다.",
          highlights: [
            "공식 기술 블로그와 뉴스를 수집하고 선별합니다.",
            "Docusaurus 문서 사이트로 누적 배포하는 흐름을 구성했습니다.",
          ],
          stack: ["Python", "OpenAI", "Docusaurus", "GitHub Actions"],
          iconSrc: "/today-in-tech.svg",
          iconAlt: "Today in Tech 아이콘",
        },
      ],
      featuredExperience: {
        title: "Synapsoft",
        description:
          "FastAPI와 RAG 기반 서비스 개발에 참여하며 Python 백엔드와 LLM 기능 흐름을 경험했습니다.",
        highlights: [
          "FastAPI 기반 API 개발 및 유지보수",
          "RAG 기반 기능 개발 참여",
          "LLM 기능의 데이터 처리와 응답 품질 개선 흐름 경험",
        ],
        stack: ["Python", "FastAPI", "RAG", "LLM"],
      },
      featuredWriting: {
        title: "Velog",
        description:
          "프로젝트를 만들며 마주친 문제와 기술 선택 이유를 개발 글로 정리합니다.",
        articles: [
          "HippoBox 시작하기",
          "FastAPI sync/async 구조",
          "Velog Backup 프로그램 만들기",
        ],
      },
      primaryCta: "핵심 프로젝트 보기",
      secondaryCta: "기술 기록 보기",
      flow: [
        {
          label: "Start",
          title: "문제 정의",
          description: "AI 기능을 데모가 아니라 운영 가능한 서비스 문제로 바라봅니다.",
        },
        {
          label: "Build",
          title: "구조 설계",
          description:
            "FastAPI, RAG, MCP, 자동화를 조합해 유지 가능한 구조로 만듭니다.",
        },
        {
          label: "Proof",
          title: "증거 확인",
          description:
            "조직 프로젝트, 공개 도구, 기술 글로 실제 작업 흔적을 보여줍니다.",
        },
      ],
      ide: {
        explorer: "파일 탐색기",
        terminal: "터미널",
        theme: "테마",
        light: "Light",
        dark: "Palenight",
        activeFile: "README.md",
        terminalCommand: "npm run profile",
        terminalStatus:
          "FastAPI / RAG / MCP / Organization Projects / Technical Writing",
        folders: {
          root: "portfolio",
          source: "src",
          content: "content",
        },
      },
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
    about: {
      eyebrow: "About",
      title: "기술을 서비스 구조로 연결하는 백엔드 개발자입니다.",
      paragraphs: [
        "FastAPI와 Python 기반 백엔드 개발을 중심으로 RAG/LLM 서비스, MCP 기반 지식 관리, 개발 자동화 도구를 만들고 있습니다.",
        "실무에서는 FastAPI와 RAG 기반 서비스 개발을 경험하고 있으며, 개인 및 조직 프로젝트에서는 AI 애플리케이션을 실제로 운영 가능한 구조로 만드는 데 집중하고 있습니다.",
        "포트폴리오에서는 화려한 효과보다 프로젝트의 문제 정의, 역할, 기술 선택, 결과를 빠르게 파악할 수 있는 정석적인 구성을 우선합니다.",
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "실무 경험",
      items: [
        {
          slug: "synapsoft",
          company: "Synapsoft",
          role: "Backend / AI Application Developer",
          period: "2025.08 - Present",
          description:
            "FastAPI와 RAG 기반 서비스 개발에 참여하며 Python 백엔드와 LLM 기반 기능 구현 흐름을 경험했습니다.",
          highlights: [
            "FastAPI 기반 서비스 개발 및 유지보수",
            "RAG 기반 기능 개발 참여",
            "Python sync/async, ASGI, blocking/non-blocking 구조 학습 및 적용",
            "LLM 기반 기능의 데이터 처리, API 설계, 응답 품질 개선 흐름 경험",
          ],
          stack: ["Python", "FastAPI", "RAG", "LLM", "Svelte"],
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "주요 기술 스택",
      groups: [
        {
          title: "Backend",
          items: ["Python", "FastAPI", "ASGI", "REST API"],
        },
        {
          title: "AI / LLM",
          items: ["RAG", "LangChain", "OpenAI API", "MCP"],
        },
        {
          title: "Frontend",
          items: ["TypeScript", "React", "Svelte", "Tailwind CSS"],
        },
        {
          title: "Automation / Deploy",
          items: ["GitHub Actions", "PyPI", "Vercel", "GitHub Pages"],
        },
      ],
    },
    openSource: {
      eyebrow: "Open Source",
      title: "조직 프로젝트와 공개 도구를 중심으로 활동합니다.",
      description:
        "HippoBox, Blueprint4Agent, Today in Tech처럼 조직 단위로 분리한 프로젝트를 운영하고, velog-sync처럼 재사용 가능한 공개 도구도 함께 관리합니다.",
    },
    contact: {
      eyebrow: "Contact",
      title: "FastAPI, RAG, MCP 기반 서비스에 관심이 있습니다.",
      description:
        "백엔드와 AI 애플리케이션을 제품 구조로 만드는 일에 관심이 있습니다. 프로젝트, 협업, 채용 관련 연락은 이메일 또는 GitHub를 통해 확인할 수 있습니다.",
      cta: "이메일 보내기",
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
      role: "Backend / AI Application Developer",
      email: "blindlchoil@gmail.com",
      summary:
        "I build FastAPI and Python-based backend services, RAG/LLM applications, MCP-powered knowledge tools, and developer automation. At Synapsoft, I have worked on FastAPI and RAG-based service development, and I focus on turning AI application ideas into product-ready structures through personal and organization projects.",
      links: {
        github: "https://github.com/choi-hyk",
        velog: "https://velog.io/@choi-hyk/posts",
      },
    },
    nav: {
      portfolio: "Portfolio",
      overview: "Overview",
      experience: "Experience",
      projects: "Projects",
      writing: "Technical Writing",
      openSource: "Open Source",
      skills: "Skills",
      external: "External",
      pagesLabel: "Portfolio pages",
      collapsedLabel: "Collapsed portfolio navigation",
      expandSidebar: "Expand sidebar",
      collapseSidebar: "Collapse sidebar",
    },
    home: {
      eyebrow: "Backend · RAG · MCP · Agentic Workflow",
      title: "A Developer Designing How AI Is Applied",
      subtitle:
        "I aim to be a developer who turns AI into a development practice, not just a developer who consumes AI.",
      slogan: {
        emphasis: "New AI services continue to emerge.",
        body: "But development capability in the AI era is not only about creating new services.",
        action:
          "It is about quickly understanding new technologies, validating them, and applying them to existing development environments.",
        closing:
          "Not stopping at simply using AI, but solving problems together with AI.",
        final: "That is the development capability I pursue in the AI era.",
      },
      canvas: {
        previousNode: "Previous node",
        nextNode: "Next node",
        focusPreviousNode: "Focus previous node",
        focusNextNode: "Focus next node",
        moveViewport: "Move canvas viewport",
        focusNode: "Focus {node} node",
        zoomIn: "Zoom in canvas",
        zoomOut: "Zoom out canvas",
      },
      profileCard: {
        koreanName: "최혁",
        englishName: "CHOI HYUK",
        experiences: [
          {
            icon: "school",
            title: "Myongji University",
            detail: "Computer Engineering",
            period: "2020 ~ 2026",
          },
          {
            icon: "company",
            title: "Synapsoft",
            detail: "AI Application Developer",
            period: "2025 ~ 2026",
          },
        ],
        skills: ["FastAPI", "RAG", "MCP"],
      },
      overviewSummary: {
        title: "Proof of Work",
        items: [
          ":project: 4 featured projects",
          ":company: FastAPI/RAG service development at Synapsoft",
          ":writing: 3 technical Velog articles",
        ],
      },
      projectSectionTitle: "Projects",
      experienceSectionTitle: "Experience",
      writingSectionTitle: "Writing",
      featuredProjects: [
        {
          title: "HippoBox",
          description: "An MCP-based personal knowledge management tool.",
          highlights: [
            "Stores knowledge entries in a searchable structure.",
            "Connects with developer tools such as Claude, Cursor, and Codex.",
          ],
          stack: ["FastAPI", "MCP", "Embedding", "Semantic Search", "CLI"],
          iconSrc: "/hippobox.svg",
          iconAlt: "HippoBox icon",
        },
        {
          title: "Say It, It's OK",
          description: "A voice-based kiosk service.",
          highlights: [
            "Supports voice ordering and recommendation flows through separated servers.",
            "Connects a React client, Node.js API server, and FastAPI NLP server.",
          ],
          stack: ["React", "Node.js", "FastAPI", "OpenAI"],
          iconSrc: "/say-it-ok.png",
          iconAlt: "Say It, It's OK icon",
        },
        {
          title: "Blueprint4Agent / B4A",
          description: "A FastAPI full-stack blueprint for agentic coding workflows.",
          highlights: [
            "Standardizes server templates, docs, CI, and deployment flows.",
            "Combines GitHub automation with FastAPI/React project structure.",
          ],
          stack: ["FastAPI", "React", "GitHub Actions", "Docker"],
          iconSrc: "/b4a.svg",
          iconAlt: "Blueprint4Agent icon",
        },
        {
          title: "Today in Tech",
          description: "An AI-powered tech news curation archive.",
          highlights: [
            "Collects and selects official tech blog posts and news.",
            "Publishes the accumulated archive through a Docusaurus documentation site.",
          ],
          stack: ["Python", "OpenAI", "Docusaurus", "GitHub Actions"],
          iconSrc: "/today-in-tech.svg",
          iconAlt: "Today in Tech icon",
        },
      ],
      featuredExperience: {
        title: "Synapsoft",
        description:
          "Worked on FastAPI and RAG-based service development, gaining experience in Python backend systems and LLM feature flows.",
        highlights: [
          "Developed and maintained FastAPI-based APIs",
          "Participated in RAG-based feature development",
          "Worked on LLM data processing and response quality improvement flows",
        ],
        stack: ["Python", "FastAPI", "RAG", "LLM"],
      },
      featuredWriting: {
        title: "Velog",
        description:
          "I document project problems, technical decisions, and implementation notes as technical writing.",
        articles: [
          "Getting started with HippoBox",
          "FastAPI sync/async structure",
          "Building a Velog backup program",
        ],
      },
      primaryCta: "View core projects",
      secondaryCta: "Read technical notes",
      flow: [
        {
          label: "Start",
          title: "Define the problem",
          description: "I frame AI features as service problems, not one-off demos.",
        },
        {
          label: "Build",
          title: "Design the structure",
          description:
            "I combine FastAPI, RAG, MCP, and automation into maintainable systems.",
        },
        {
          label: "Proof",
          title: "Show the evidence",
          description:
            "Organization projects, public tools, and technical writing prove the work.",
        },
      ],
      ide: {
        explorer: "Explorer",
        terminal: "Terminal",
        theme: "Theme",
        light: "Light",
        dark: "Palenight",
        activeFile: "README.md",
        terminalCommand: "npm run profile",
        terminalStatus:
          "FastAPI / RAG / MCP / Organization Projects / Technical Writing",
        folders: {
          root: "portfolio",
          source: "src",
          content: "content",
        },
      },
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
    about: {
      eyebrow: "About",
      title: "A backend developer turning technical ideas into service structures.",
      paragraphs: [
        "I build FastAPI and Python-based backend services, RAG/LLM applications, MCP-powered knowledge tools, and developer automation.",
        "At work, I have experience with FastAPI and RAG-based service development. In personal and organization projects, I focus on shaping AI applications into maintainable product structures.",
        "This portfolio favors a conventional, content-first structure so readers can quickly understand the problems, roles, technical choices, and outcomes behind each project.",
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Work experience",
      items: [
        {
          slug: "synapsoft",
          company: "Synapsoft",
          role: "Backend / AI Application Developer",
          period: "2025.08 - Present",
          description:
            "Worked on FastAPI and RAG-based service development, gaining experience in Python backend systems and LLM-powered feature workflows.",
          highlights: [
            "Developed and maintained FastAPI-based services",
            "Participated in RAG-based feature development",
            "Applied Python sync/async, ASGI, and blocking/non-blocking concepts",
            "Worked on data processing, API design, and response quality improvement for LLM features",
          ],
          stack: ["Python", "FastAPI", "RAG", "LLM", "Svelte"],
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Core technical stack",
      groups: [
        {
          title: "Backend",
          items: ["Python", "FastAPI", "ASGI", "REST API"],
        },
        {
          title: "AI / LLM",
          items: ["RAG", "LangChain", "OpenAI API", "MCP"],
        },
        {
          title: "Frontend",
          items: ["TypeScript", "React", "Svelte", "Tailwind CSS"],
        },
        {
          title: "Automation / Deploy",
          items: ["GitHub Actions", "PyPI", "Vercel", "GitHub Pages"],
        },
      ],
    },
    openSource: {
      eyebrow: "Open Source",
      title: "Organization projects and reusable public tools.",
      description:
        "I manage organization-level projects such as HippoBox, Blueprint4Agent, and Today in Tech, along with reusable public tools like velog-sync.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Interested in FastAPI, RAG, and MCP-based services.",
      description:
        "I am interested in building backend and AI applications as product-ready systems. For projects, collaboration, or hiring, please reach out by email or GitHub.",
      cta: "Send email",
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
