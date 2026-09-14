import type { Locale } from "./config";

type EvidenceLink = { label: string; href: string };
export type ExperienceCase = {
  title: string;
  problem: string;
  work: string[];
  outcome: string;
};
export type ProjectStory = Omit<ExperienceCase, "title"> & {
  slug: string;
  title: string;
  period: string;
  subtitle: string;
  summary: string;
  stack: string[];
  href: string;
  evidence: EvidenceLink[];
};
export type ProfessionalContent = {
  labels: Record<
    | "experience"
    | "document"
    | "print"
    | "back"
    | "intro"
    | "projects"
    | "problem"
    | "work"
    | "outcome"
    | "education"
    | "credentials"
    | "writing"
    | "links"
    | "skills"
    | "details"
    | "page"
    | "documentHint",
    string
  >;
  headline: string;
  intro: string;
  focus: string;
  skills: string[];
  company: string;
  position: string;
  period: string;
  experienceSummary: string;
  experience: ExperienceCase[];
  projects: ProjectStory[];
  education: string;
  educationPeriod: string;
  credentials: { title: string; date: string }[];
  writingSummary: string;
  writingLink: EvidenceLink;
};
export const professionalContent: Record<Locale, ProfessionalContent> = {
  ko: {
    labels: {
      experience: "업무 경험",
      document: "문서 / PDF",
      print: "인쇄 / PDF로 저장",
      back: "포트폴리오로 돌아가기",
      intro: "자기소개",
      projects: "주요 프로젝트",
      problem: "문제",
      work: "담당 작업",
      outcome: "변화와 결과",
      education: "학력",
      credentials: "자격증 및 어학",
      writing: "기술 기록",
      links: "관련 링크",
      skills: "주요 기술",
      details: "상세 보기",
      page: "페이지",
      documentHint:
        "업무 경험과 주요 프로젝트를 정리한 문서입니다. 인쇄 메뉴에서 PDF로 저장할 수 있습니다.",
    },
    headline: "AI 활용 방식을 설계하는 개발자",
    intro:
      "FastAPI와 AI를 활용한 서비스 개발을 중심으로, 반복되는 개발 과정을 표준화하고 자동화해 온 최혁입니다. 새로운 기술의 필요성을 검증하고 기존 개발 환경과 서비스 구조에 적용하는 데 집중합니다.",
    focus:
      "실무에서는 서버 부하와 병목을 분석하고 타입 구조·검증 절차·배포 흐름을 개선했습니다. 개인 프로젝트에서는 공통 개발 기반과 지식 접근 인터페이스를 설계하며, 개발자와 AI가 일관된 방식으로 작업할 수 있는 환경을 만들고 있습니다.",
    skills: [
      "Python",
      "FastAPI",
      "TypeScript",
      "React",
      "RAG",
      "MCP",
      "Docker",
      "GitHub Actions",
    ],
    company: "사이냅소프트",
    position: "문서 AI팀 · 사원",
    period: "2025.08.01 – 2026.06.30",
    experienceSummary:
      "약 1년간의 실무는 주니어 개발자로서 개발을 바라보는 기준을 세울 수 있었던 의미 있는 경험이었습니다. 빠르게 변화하는 AI 환경에서 새로운 기술을 단순히 따라가는 것이 아니라, 실제 문제에 필요한지 판단하고 기존 서비스와 개발 환경에 적용하는 과정을 반복해서 경험했습니다. 문서 분석과 RAG를 연결한 B2B 지식 검색·질의응답 시스템을 개발하며 기능 구현뿐 아니라 대량 문서 처리, 프론트엔드 구조, 개발 검증, 배포 환경까지 다뤘고, 그 과정에서 AI와 함께 개발하기 위해 필요한 작업 방식과 문제를 구조적으로 개선하는 태도를 익힐 수 있었습니다.",
    experience: [
      {
        title: "Agentic Coding을 위한 개발 구조 정비",
        problem:
          "AI Agent 기능을 개발하면서 Agent마다 프롬프트·컨텍스트 구성, Tool 호출 방식, 실행 규칙이 달라질수록 개발과 검증 기준을 유지하기 어렵다는 문제를 경험했습니다.",
        work: [
          "Langflow와 OpenAI Agents SDK를 활용한 기능 개발을 바탕으로 Agent 실행 규칙, 프롬프트·컨텍스트, Tool 인터페이스와 실행 로그 구조를 공통화하는 AI Harness를 구성했습니다. 프론트엔드에서도 전역 타입과 인터페이스 구조를 함께 정비해 개발자와 AI Agent가 동일한 구조와 규칙을 기준으로 작업할 수 있도록 했습니다.",
        ],
        outcome:
          "Agentic Coding을 단순한 코드 생성이 아니라 일관된 기준으로 구현하고 검증할 수 있는 개발 방식으로 적용했습니다.",
      },
      {
        title: "문서 처리 병목과 서버 부하 개선",
        problem:
          "대량 문서를 임베딩하고 색인하는 과정에서 PostgreSQL 작업이 병목이 되면서 서버 부하가 증가하는 문제를 분석했습니다. 문서 처리 흐름과 DB 접근 패턴을 추적해 특정 Worker와 쿼리에 부하가 집중되는 지점을 확인했습니다.",
        work: [
          "작업 처리 구조와 데이터베이스 접근 방식을 개선하고, Python·FastAPI·PostgreSQL 기반 처리 구조뿐 아니라 Qdrant와 Elasticsearch를 사용하는 검색 흐름까지 함께 점검했습니다.",
        ],
        outcome:
          "검색 정확도와 응답 품질을 개선하고, 운영 문제의 원인을 서비스 전체 처리 흐름에서 찾아 개선하는 경험을 쌓았습니다.",
      },
      {
        title: "Linux 기반 빌드·배포 환경 개선",
        problem:
          "Linux 환경에서 Docker 기반 서비스 배포를 운영하며 개발 결과가 서버 환경에서도 동일하게 실행될 수 있도록 빌드와 배포 구조를 정비했습니다.",
        work: [
          "컨테이너 레지스트리와 배포 파이프라인을 연결해 반복적인 수동 배포 과정을 줄였습니다. Python 패키지를 Cython으로 .so 파일로 빌드하는 과정에서 CPython 버전과 빌드 환경에 따라 실행 여부가 달라지는 환경 의존 문제도 분석하고 해결했습니다.",
        ],
        outcome:
          "런타임과 빌드 환경까지 고려해야 안정적인 배포가 가능하다는 점을 실무에서 경험했습니다.",
      },
      {
        title: "B2B RAG 지식 서비스 개발과 운영",
        problem:
          "문서 분석 솔루션의 결과를 Qdrant·Elasticsearch 기반 RAG와 연결해 기업 문서를 검색하고 질의응답에 활용하는 B2B AI 서비스를 개발하고 유지보수했습니다.",
        work: [
          "문서 임베딩·색인부터 검색, 답변 생성까지 이어지는 흐름을 다루며 실제 기업 환경에서 사용할 수 있는 지식 서비스로 고도화했습니다. 운영 과정에서는 AES-256 기반 민감 데이터 암호화를 적용하고, QA 및 보안 인증 과정에서 관련 부서와 이슈를 조율하며 수정과 재검증을 반복했습니다.",
        ],
        outcome:
          "성능·보안·품질 검증까지 경험하며 서비스를 개발하는 것과 실제 운영 가능한 상태로 만드는 것의 차이를 배웠습니다.",
      },
    ],
    projects: [
      {
        slug: "blueprint4agent",
        title: "Blueprint4Agent",
        period: "2026.02 – 진행 중",
        subtitle: "반복되는 개발 과정을 재사용 가능한 환경으로",
        summary:
          "인증·테스트·문서화·배포 설정과 AI Coding Agent별 작업 방식의 편차를 줄이기 위한 개발 환경 표준화 프로젝트입니다.",
        problem:
          "새 프로젝트마다 기반 기능과 도구 설정을 반복하고, 개발자와 AI Agent가 서로 다른 기준으로 작업하는 문제를 줄이고자 했습니다.",
        work: [
          "FastAPI·React 기반 인증·API·환경설정을 공통화하고, OpenAPI 기반 클라이언트 생성으로 API 명세를 공유하도록 구성했습니다.",
          "GitHub Actions로 테스트·빌드·배포 흐름을 연결하고, 개발 규칙과 검증 절차를 Harness로 구조화했습니다.",
          "문서화·Observability·Web/Desktop 환경을 공통 개발 흐름에 포함했습니다.",
        ],
        outcome:
          "반복 설정을 하나의 기반으로 통합하여 새로운 프로젝트에서 같은 개발·검증 절차를 재사용할 수 있도록 했습니다.",
        stack: ["FastAPI", "React", "TypeScript", "Docker", "GitHub Actions"],
        href: "https://github.com/B4FastAPI",
        evidence: [
          {
            label: "Documentation",
            href: "https://blueprint4agent.github.io/",
          },
        ],
      },
      {
        slug: "hippobox",
        title: "HippoBox",
        period: "2025.11 – 2026.02",
        subtitle: "도구가 바뀌어도 재사용할 수 있는 프로젝트 지식",
        summary:
          "사람이 관리하는 지식을 여러 AI Agent에서 함께 활용하도록 만든 Local-first Knowledge Platform입니다.",
        problem:
          "AI 도구가 달라질 때마다 프로젝트 지식과 컨텍스트를 반복해서 전달해야 했습니다.",
        work: [
          "FastAPI 기반 Knowledge API와 MCP Server를 구성해 공통 지식 접근 인터페이스를 제공했습니다.",
          "Qdrant 기반 임베딩 검색으로 저장된 지식을 의미 기반으로 탐색하도록 구성했습니다.",
          "React·TypeScript 관리 UI와 MCP 인터페이스를 같은 지식 저장소에 연결했습니다.",
        ],
        outcome:
          "하나의 Knowledge Layer를 사람이 관리하고 여러 AI 도구가 재사용할 수 있는 구조를 구현했습니다.",
        stack: ["FastAPI", "React", "TypeScript", "MCP", "Qdrant"],
        href: "https://github.com/HippoBox/hippobox",
        evidence: [
          {
            label: "PyPI",
            href: "https://pypi.org/project/hippobox/",
          },
        ],
      },
      {
        slug: "today-in-tech",
        title: "Today in Tech",
        period: "2026.05 – 진행 중",
        subtitle: "콘텐츠 수집부터 배포까지 이어지는 자동화",
        summary:
          "공식 기술 블로그와 뉴스를 수집·선별하고, AI로 문서를 생성해 배포하는 기술 콘텐츠 아카이브입니다.",
        problem:
          "여러 정보원을 반복적으로 확인하고 콘텐츠를 선별·정리하는 작업을 지속해야 했습니다.",
        work: [
          "수집·중복 제거·전처리를 단계별 파이프라인으로 분리해 정보원과 처리 방식의 확장이 가능하도록 구성했습니다.",
          "LLM과 News Editor Agent를 활용해 콘텐츠 선별·정리 작업을 자동화했습니다.",
          "GitHub Actions와 Docusaurus를 연결해 문서 생성부터 배포까지 자동화하고 처리 과정을 Trace로 기록했습니다.",
        ],
        outcome:
          "수집부터 배포까지의 반복 작업을 다시 실행하고 추적할 수 있는 워크플로우로 전환했습니다.",
        stack: ["Python", "OpenAI API", "Docusaurus", "GitHub Actions"],
        href: "https://github.com/TodayInTech/todayintech",
        evidence: [
          {
            label: "Website",
            href: "https://todayintech.github.io/todayintech/",
          },
        ],
      },
      {
        slug: "say-it-its-ok",
        title: "말하면 OK!",
        period: "2025.09 – 2025.11",
        subtitle: "자연어로 요청하는 AI Voice Kiosk",
        summary:
          "음성 요청을 메뉴 탐색·추천·주문으로 연결하고, 처리 결과를 화면과 음성으로 전달하는 팀 프로젝트입니다.",
        problem:
          "기존 키오스크는 사용자가 화면 구조와 조작법을 익혀야 했습니다. 메뉴를 찾고 주문하는 과정을 자연어 대화로 단순화할 필요가 있었습니다.",
        work: [
          "React 화면과 Node.js 주문 API를 연결해 메뉴·추천·장바구니 흐름을 구성했습니다.",
          "FastAPI NLP 서버에서 OpenAI를 활용해 음성 요청을 실제 키오스크 동작으로 변환했습니다.",
          "Google Cloud STT와 TTS를 연결해 입력부터 화면·음성 응답까지 이어지는 흐름을 구현했습니다.",
        ],
        outcome:
          "사용자가 직원에게 말하듯 요청하고, 시스템이 주문 행동과 안내로 응답하는 AI Voice Kiosk 경험을 구현했습니다.",
        stack: ["React", "Node.js", "FastAPI", "OpenAI", "STT", "TTS"],
        href: "https://github.com/Say-It-It-s-OK",
        evidence: [
          {
            label: "Demo",
            href: "https://www.youtube.com/shorts/QMuGDGB1Jsw",
          },
        ],
      },
    ],
    education: "명지대학교 · 컴퓨터공학과",
    educationPeriod: "2020.02 – 2026.02 · 졸업",
    credentials: [
      {
        title: "정보처리기사",
        date: "2026.09",
      },
      {
        title: "OPIc IM2",
        date: "2026.08",
      },
    ],
    writingSummary:
      "개발 과정에서 생긴 의문과 해결 과정을 Velog에 기록합니다. 프로젝트 코드와 함께 기술적 배경을 확인할 수 있습니다.",
    writingLink: {
      label: "Velog · 개발 기록",
      href: "https://velog.io/@choi-hyk/posts",
    },
  },
  en: {
    labels: {
      experience: "Experience",
      document: "Document / PDF",
      print: "Print / Save as PDF",
      back: "Back to portfolio",
      intro: "About",
      projects: "Selected projects",
      problem: "Problem",
      work: "Work",
      outcome: "Outcome",
      education: "Education",
      credentials: "Certifications & language",
      writing: "Writing",
      links: "Related links",
      skills: "Core skills",
      details: "View details",
      page: "Page",
      documentHint:
        "A document covering professional experience and selected projects. Save a PDF from the print dialog.",
    },
    headline: "Designing how AI fits into development",
    intro:
      "I am Choi Hyuk. I build services with FastAPI and AI, and standardize and automate recurring development tasks. I evaluate where new technology is useful and integrate it into existing development environments and services.",
    focus:
      "At work, I analyzed server load and bottlenecks and improved type structures, validation procedures, and deployment workflows. In my projects, I build reusable development foundations and knowledge interfaces for consistent collaboration between developers and AI.",
    skills: [
      "Python",
      "FastAPI",
      "TypeScript",
      "React",
      "RAG",
      "MCP",
      "Docker",
      "GitHub Actions",
    ],
    company: "Synapsoft",
    position: "Document AI Team · Software Developer",
    period: "2025.08.01 – 2026.06.30",
    experienceSummary:
      "Over a period that felt both short and substantial, I built a B2B knowledge search and question-answering service connecting document analysis with RAG. Alongside feature development, I experienced the full path from large-document processing and frontend type structure to validation and automated deployment.",
    experience: [
      {
        title: "Consistent types and development validation",
        problem:
          "Frontend interfaces and AI-assisted development needed consistent working conventions.",
        work: [
          "Reorganized global frontend type definitions.",
          "Structured development rules and validation procedures into a harness for agentic coding.",
        ],
        outcome:
          "Improved interface consistency and reproducibility in AI-assisted development and validation.",
      },
      {
        title: "Document processing bottlenecks and server load",
        problem:
          "Large document embedding and indexing workloads encountered worker bottlenecks and server load.",
        work: [
          "Analyzed bottlenecks in document processing and database access.",
          "Improved processing structure and database access patterns.",
        ],
        outcome: "Improved stability when processing large document workloads.",
      },
      {
        title: "Automated deployment workflow",
        problem:
          "Repeated manual deployments needed a more consistent delivery process.",
        work: [
          "Built an automated deployment pipeline using a container registry.",
          "Connected development outputs to deployment in the server environment.",
        ],
        outcome: "Reduced recurring manual deployment steps.",
      },
      {
        title: "Connecting document analysis with knowledge search",
        problem:
          "Enterprise documents needed to be searchable and usable by AI for question answering.",
        work: [
          "Developed an AI agent system connecting document analysis with RAG.",
          "Connected document embedding and indexing with search and question-answering workflows.",
        ],
        outcome:
          "Organized enterprise documents into a knowledge service usable by AI.",
      },
    ],
    projects: [
      {
        slug: "blueprint4agent",
        title: "Blueprint4Agent",
        period: "2026.02 – In progress",
        subtitle: "Reusable foundations for recurring development tasks",
        summary:
          "A project standardizing development environments to reduce repeated authentication, testing, documentation, deployment setup, and differences between coding agents.",
        problem:
          "Each new project repeated foundation setup, while developers and coding agents worked with different conventions.",
        work: [
          "Shared authentication, API, and configuration foundations across FastAPI and React, with OpenAPI-generated clients sharing the API contract.",
          "Connected tests, builds, and deployments through GitHub Actions and structured development and validation rules into a harness.",
          "Included documentation, observability, and Web/Desktop environments in a common workflow.",
        ],
        outcome:
          "Consolidated recurring setup so new projects can reuse the same development and validation procedures.",
        stack: ["FastAPI", "React", "TypeScript", "Docker", "GitHub Actions"],
        href: "https://github.com/Blueprint4Agent",
        evidence: [
          {
            label: "B4FastAPI",
            href: "https://github.com/Blueprint4Agent/B4FastAPI",
          },
          {
            label: "Documentation",
            href: "https://blueprint4agent.github.io/",
          },
        ],
      },
      {
        slug: "hippobox",
        title: "HippoBox",
        period: "2025.11 – 2026.02",
        subtitle: "Project knowledge that survives a change of tools",
        summary:
          "A local-first knowledge platform where people manage knowledge that multiple AI agents can reuse.",
        problem:
          "Switching AI tools required repeatedly supplying project knowledge and context.",
        work: [
          "Built a FastAPI Knowledge API and MCP server as shared interfaces for accessing knowledge.",
          "Implemented embedding search with Qdrant to find stored knowledge by meaning.",
          "Connected a React and TypeScript management UI and MCP tools to the same knowledge store.",
        ],
        outcome:
          "Built one knowledge layer that people maintain and multiple AI tools can reuse.",
        stack: ["FastAPI", "React", "TypeScript", "MCP", "Qdrant"],
        href: "https://github.com/HippoBox/hippobox",
        evidence: [
          {
            label: "PyPI",
            href: "https://pypi.org/project/hippobox/",
          },
        ],
      },
      {
        slug: "today-in-tech",
        title: "Today in Tech",
        period: "2026.05 – In progress",
        subtitle: "Automating content collection through publication",
        summary:
          "A technical archive that collects and selects official blogs and news, generates documents with AI, and publishes them.",
        problem:
          "Checking multiple sources and selecting and organizing content required continuous repetitive work.",
        work: [
          "Separated collection, deduplication, and preprocessing into extensible pipeline stages.",
          "Automated selection and organization with an LLM and a News Editor Agent.",
          "Connected GitHub Actions and Docusaurus to automate generation and publication, recording processing traces.",
        ],
        outcome:
          "Turned recurring collection and publication tasks into a repeatable, traceable workflow.",
        stack: ["Python", "OpenAI API", "Docusaurus", "GitHub Actions"],
        href: "https://github.com/TodayInTech/todayintech",
        evidence: [
          {
            label: "Website",
            href: "https://todayintech.github.io/todayintech/",
          },
        ],
      },
      {
        slug: "say-it-its-ok",
        title: "Say It, It's OK",
        period: "2025.09 – 2025.11",
        subtitle: "An AI voice kiosk for natural-language requests",
        summary:
          "A team project connecting voice requests to menu browsing, recommendations, and ordering, with visual and spoken feedback.",
        problem:
          "Traditional kiosks require users to learn the screen structure and controls. The project explored simplifying menu discovery and ordering through natural conversation.",
        work: [
          "Connected the React interface and Node.js order API for menu, recommendation, and cart flows.",
          "Used OpenAI in a FastAPI NLP server to translate spoken requests into kiosk actions.",
          "Connected Google Cloud STT and TTS so input, screen state, and spoken feedback formed one flow.",
        ],
        outcome:
          "Implemented an AI voice kiosk experience where users can speak naturally and receive order actions and guidance.",
        stack: ["React", "Node.js", "FastAPI", "OpenAI", "STT", "TTS"],
        href: "https://github.com/Say-It-It-s-OK",
        evidence: [
          {
            label: "Demo",
            href: "https://www.youtube.com/shorts/QMuGDGB1Jsw",
          },
        ],
      },
    ],
    education: "Myongji University · Computer Engineering",
    educationPeriod: "2020.02 – 2026.02 · Graduated",
    credentials: [
      {
        title: "Engineer Information Processing",
        date: "2026.09",
      },
      {
        title: "OPIc IM2",
        date: "2026.08",
      },
    ],
    writingSummary:
      "I document questions and solutions from development on Velog, providing technical context alongside project code.",
    writingLink: {
      label: "Velog · Development notes",
      href: "https://velog.io/@choi-hyk/posts",
    },
  },
};
