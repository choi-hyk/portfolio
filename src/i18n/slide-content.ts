import type { Locale } from "./config";
export type SlideWritingTopic = {
  category: string;
  title: string;
  href: string;
  summary: string;
};
export type SlideProject = {
  slug: string;
  headline: string;
  problem: string;
  definition: string;
  images: { src: string; width: number; height: number; alt: string }[];
  caption: string;
  decisions: { title: string; body: string }[];
  architectureTakeaway: string;
  question: string;
};
export type SlideContent = {
  kicker: string;
  introTitle: string;
  introBody: string;
  introNote: string;
  introNote2?: string;
  aboutLabel: string;
  skillLabel: string;
  educationLabel: string;
  careerLabel: string;
  skillsTitle: string;
  linksTitle: string;
  skills: string[];
  projectLabel: string;
  detailLabel: string;
  architectureLabel: string;
  designLabel: string;
  implementationLabel: string;
  questionLabel: string;
  experienceTitle: string;
  writingTitle: string;
  writingNote: string;
  writingTopics: SlideWritingTopic[];
  thankYou: string;
  closing: string;
  closingNote: string;
  deckHint: string;
  projects: SlideProject[];
};
export const slideContent: Record<Locale, SlideContent> = {
  ko: {
    kicker: "COVER",
    introTitle: "AI 활용 방식을 설계하는 개발자",
    introBody:
      "안녕하세요, 개인 프로젝트 및 실무와 AI를 활용한 개발을 중심으로 경험을 쌓아온 개발자 최혁입니다.",
    introNote:
      "새로운 AI 서비스는 계속 등장합니다. 하지만 AI 시대의 개발 역량은 새로운 서비스를 만드는 데만 있지 않습니다. 새로운 기술을 빠르게 이해하고, 검증하고, 기존 개발 환경에 적용하는 것. AI를 단순히 사용하는 데서 멈추지 않고, AI와 함께 문제를 해결하는 것. 그것이 제가 추구하는 AI 시대의 개발 역량입니다.",
    introNote2:
      "저는 새로운 기술 자체보다 그것이 실제 개발 과정과 서비스 구조에 어떤 변화를 만들 수 있는지를 고민하며, 반복되는 문제를 구조화하고 자동화해 더 나은 개발 환경을 만드는 개발자를 지향합니다.",
    educationLabel: "학력",
    careerLabel: "경력",
    skillsTitle: "Skill",
    linksTitle: "Link",
    aboutLabel: "ABOUT ME",
    skillLabel: "TECHNICAL TOOLKIT",
    skills: [
      "Python",
      "TypeScript",
      "Linux",
      "FastAPI",
      "React",
      "RAG",
      "MCP",
      "Docker",
      "GitHub Actions",
    ],
    projectLabel: "SELECTED PROJECT",
    detailLabel: "Detail",
    architectureLabel: "SYSTEM ARCHITECTURE",
    designLabel: "설계의 초점",
    implementationLabel: "구현한 연결",
    questionLabel: "내 지식 필요",
    experienceTitle: "서비스를 만드는 일에서 개발 환경을 바꾸는 일까지",
    writingTitle: "Velog를 통한 개발 경험 기록",
    writingNote:
      "개발하면서 생긴 의문과 해결 과정을 그냥 지나치지 않고 기록으로 남기기 위해 2025년부터 Velog에 글을 쓰기 시작했습니다. 문제를 해결한 뒤 글로 다시 정리하다 보면 당시에는 보이지 않았던 원인이나 선택의 근거가 더 명확해졌고, 한 번의 경험을 다음 개발에서도 꺼내 쓸 수 있는 지식으로 남기는 과정이 생각보다 재미있었습니다.\n\n글쓰기가 익숙한 편은 아니어서 처음에는 하나의 글을 완성하는 데도 많은 고민이 필요했습니다. 표현을 다듬고 흐름을 정리하는 과정에서 AI와 여러 번 문장을 주고받으며 씨름하기도 했지만, 오히려 그 과정에서 제가 이해한 내용을 다시 검증하고 더 정확하게 설명하는 방법을 배울 수 있었습니다. 아직 배워가는 과정이지만, 기술을 사용하는 것만큼 제가 경험한 것을 정리하고 공유하는 일도 중요하다고 생각합니다. 앞으로도 개발 과정에서 얻은 문제 해결 경험과 생각을 꾸준히 기록해 나가고자 합니다.",
    writingTopics: [
      {
        category: "DEVELOPMENT",
        title: "Velog Backup 프로그램 만들기",
        href: "https://velog.io/@choi-hyk/Mini-Project-Velog-Backup-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EB%A7%8C%EB%93%A4%EA%B8%B0",
        summary:
          "반복되는 Velog 글 백업 작업을 Python CLI 도구로 만들고 재사용 가능한 흐름으로 정리했습니다.",
      },
      {
        category: "DEVELOPMENT",
        title: "HippoBox 시작하기",
        href: "https://velog.io/@choi-hyk/Project-HippoBox-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0",
        summary:
          "프로젝트 지식을 관리하고 AI Agent가 재사용할 수 있도록 Knowledge Layer와 MCP를 구성한 과정을 기록했습니다.",
      },
      {
        category: "DEVELOPMENT",
        title: "GitHub Pages 디자인 개선 및 서버리스로 변경",
        href: "https://velog.io/@choi-hyk/GitHub-Pages-디자인-개선-및-서버리스로-변경",
        summary:
          "개인 사이트를 개선하고 서버리스 구조로 전환한 과정을 구현 단위로 기록했습니다.",
      },
      {
        category: "AI",
        title: "[LLM] Overview",
        href: "https://velog.io/@choi-hyk/LLM-Overview",
        summary:
          "LLM의 기본 개념과 활용 구조를 정리하며 생성형 AI 기술의 전체 흐름을 이해한 글입니다.",
      },
      {
        category: "AI",
        title: "[LLM] LoRA (Low Rank Adaptation)",
        href: "https://velog.io/@choi-hyk/LLM-LoRA-Low-Rank-Adaptation",
        summary:
          "LLM 파라미터 효율적 튜닝 방식인 LoRA의 원리와 활용 방식을 정리했습니다.",
      },
      {
        category: "AI",
        title: "[LLM] Fine-tuning",
        href: "https://velog.io/@choi-hyk/LLM-Fine-tuning",
        summary:
          "LLM Fine-tuning의 목적과 학습 과정을 정리하고 모델을 서비스에 적용하는 관점을 기록했습니다.",
      },
      {
        category: "CS / ENGINEERING",
        title: "[FastAPI] sync/async 의 논리적 구조",
        href: "https://velog.io/@choi-hyk/Python-syncasync-%EC%9D%98-%EB%85%BC%EB%A6%AC%EC%A0%81-%EA%B5%AC%EC%A1%B0",
        summary:
          "동기·비동기 처리와 동시성의 차이를 정리하며 서버 실행 구조를 이해한 글입니다.",
      },
      {
        category: "CS / ENGINEERING",
        title: "인터페이스 설계 전략 (백엔드)",
        href: "https://velog.io/@choi-hyk/백엔드-인터페이스-설계-전략",
        summary:
          "서비스 경계를 나누고 요청과 응답을 설계하며 시스템을 이해하는 관점을 정리했습니다.",
      },
      {
        category: "CS / ENGINEERING",
        title: "Decorator Pattern",
        href: "https://velog.io/@choi-hyk/Design-Pattern-Decorator-Pattern",
        summary:
          "객체에 동적으로 책임을 추가하는 Decorator Pattern의 구조와 활용을 정리했습니다.",
      },
    ],
    thankYou: "Thank you.",
    closing:
      "새로운 기술을 빠르게 이해하는 데서 그치지 않고,\n실제 문제에 적용해 서비스와 개발 환경을 더 나은 방향으로 바꾸는 개발자가 되고자 합니다.",
    closingNote:
      "지금까지 쌓아온 개발과 서비스 운영 경험을 바탕으로,\n팀이 더 빠르고 안정적으로 문제를 해결할 수 있는 구조를 만드는 데 기여하겠습니다.\n함께 새로운 문제를 고민하고 풀어갈 기회가 있다면 언제든 연락해 주세요.",
    deckHint:
      "16:9 가로 슬라이드 · 인트로, 프로젝트, 업무 경험, 기록과 활동. 인쇄 메뉴에서 PDF로 저장할 수 있습니다.",
    projects: [
      {
        slug: "blueprint4agent",
        headline: "Agentic Coding을 위한 개발 환경 표준화",
        problem:
          "최근 Agentic Coding의 확산으로 다양한 서비스가 빠르게 개발되고 있지만, 실제 프로젝트를 시작할 때마다 인증·로그인, 데이터베이스 구성, UI/UX 설계, API 인터페이스 정의와 같은 기본 구조를 반복해서 설계해야 합니다. 이러한 초기 구성에도 상당한 개발 시간과 AI Agent의 토큰이 소모됩니다.",
        definition:
          "Blueprint4Agent는 공통 개발 환경과 검증 절차를 표준화한 프로젝트입니다. 인증·데이터베이스·API·UI/UX 구조 등 기본 요소가 갖춰진 FastAPI/React 기반 모놀리식 서비스 템플릿을 제공하여, 프로젝트 초기 설정 비용을 줄이고 개발자와 AI Agent가 동일한 규칙으로 작업하고, 새 프로젝트에서도 같은 Workflow를 재사용하도록 구성했습니다.",
        images: [
          {
            src: "/images/b4a-features/showcase.png",
            width: 2448,
            height: 1618,
            alt: "Blueprint4Agent 서비스 화면",
          },
        ],
        caption: "B4FastAPI · 쇼케이스 페이지",
        decisions: [
          {
            title: "반복되는 공통 기능 제공",
            body: "기본적인 인증·API·환경설정을 제공하고, OpenAPI 생성 클라이언트로 React와 FastAPI가 같은 API 명세를 사용하도록 구성했습니다. 또한 기본 UI/UX 컴포넌트를 정의하여 쇼케이스에서 확인 및 수정이 가능하도록 하였습니다. 해당 구조는 하네스 엔지니어링 방식으로 정의되어 있으며, 사용자가 자신의 스타일에 맞게 수정할 수 있습니다.",
          },
          {
            title: "테스트부터 배포까지 자동화",
            body: "하네스 문서 및 GitHub Actions에 테스트·빌드·배포를 연결해 개발 결과를 검증하고 배포하는 과정을 하나의 Workflow로 구성했습니다. 프론트엔드와 백엔드의 최소 테스트 구성을 제공하여, 추후에 기능이 확장되어도 해당 구조를 통해 빠르게 테스트 환경을 구축할 수 있도록 설계하였습니다.",
          },
          {
            title: "Obsservability 및 Web/Desktop 플랫폼 구성",
            body: "OpenTelemetry와 Prometheus 기반 Observability 환경을 구성하고, Tauri를 활용해 Web/Desktop 플랫폼까지 공통 개발 기반으로 확장했습니다. 사용자는 원하는 환경을 선택해 서비스를 빌드하고 배포할 수 있으며, 기본적인 관측 시스템을 통해 개발 환경과 배포 환경에서 서비스 상태를 추적이 가능합니다.",
          },
        ],
        architectureTakeaway:
          "API 명세, 실행 규칙, 검증 흐름을 공유하는 방식으로 프로젝트의 반복 작업을 구조화했습니다.",
        question:
          "실제 적용 프로젝트, 자동 생성 코드의 관리 방식, 초기 설정 전후 변화, 직접 구현한 범위와 팀 규모를 추가해 주세요.",
      },
      {
        slug: "hippobox",
        headline: "AI Agent를 위한 MCP Knowledge Platform",
        problem:
          "Claude, Cursor, Codex와 같은 AI Agent를 활용할 때, 도구마다 필요한 지식을 개별적으로 관리하고 전달해야 하는 문제가 있었습니다. 한 도구에서 정리하거나 추가한 지식이 다른 도구와 자연스럽게 공유되지 않아, 동일한 정보를 반복해서 입력하거나 여러 위치에서 별도로 관리해야 했습니다.",
        definition:
          "HippoBox는 AI가 활용해야 하는 지식을 로컬의 공통 Knowledge Layer에서 관리하고 공유하기 위해 개발한 플랫폼입니다. 지식에 대한 생성·조회·수정·삭제(CRUD) 기능을 제공하고, Model Context Protocol을 통해 Claude, Cursor, Codex 등 MCP를 지원하는 다양한 AI 플랫폼이 동일한 지식 저장소에 접근하고 직접 조회·수정할 수 있도록 구성했습니다.",
        images: [
          {
            src: "/images/hippobox-guide/step-4.png",
            width: 1920,
            height: 1080,
            alt: "HippoBox MCP 연결 화면",
          },
        ],
        caption: "HippoBox · MCP 클라이언트 연결 안내 페이지",
        decisions: [
          {
            title: "API·MCP 기반 공통 지식 인터페이스",
            body: "FastAPI로 Knowledge CRUD API를 구성하고, FastAPI-MCP를 통해 동일한 기능을 MCP Tool로 함께 제공했습니다. 이를 통해 관리 UI와 Claude·Cursor·Codex 같은 AI Agent가 별도 인터페이스 없이 동일한 Knowledge Store에 접근하고 지식을 조회·생성·수정·삭제할 수 있도록 구성했습니다.",
          },
          {
            title: "임베딩 기반 지식 검색과 데이터 계층 구성",
            body: "SQLAlchemy 기반으로 Knowledge Metadata를 관리하고, Qdrant에 임베딩과 Vector Index를 구성해 의미 기반 검색 기능을 구현했습니다. 단순 CRUD뿐 아니라 AI Agent가 필요한 지식을 의미적으로 검색해 활용할 수 있도록 Knowledge API와 Vector Search를 하나의 백엔드에 통합했습니다.",
          },
          {
            title: "단일 애플리케이션 빌드·배포 구조",
            body: "React·TypeScript 프론트엔드와 FastAPI 백엔드를 하나의 모놀리식 애플리케이션으로 구성하고, OpenAPI Generator로 API Client를 자동 생성해 프론트엔드와 백엔드 간 인터페이스를 일관되게 유지했습니다. Hatch와 GitHub Actions를 공통 빌드 파이프라인으로 사용해 Docker Image, PyPI, GHCR 배포까지 자동화했습니다.",
          },
        ],
        architectureTakeaway:
          "접근 도구는 달라도 같은 지식 저장소를 활용합니다. 지식 관리와 검색을 공통 인터페이스로 제공하는 것이 핵심입니다.",
        question:
          "Local-first 선택 이유, 실제 클라이언트 재사용 사례, 검색 평가 기준, 직접 구현한 범위와 팀 규모를 추가해 주세요.",
      },
      {
        slug: "today-in-tech",
        headline: "IT 기술 뉴스 수집·배포 자동화 에이전트 웹 사이트",
        problem:
          "매일 수많은 기술 뉴스와 공식 블로그가 공개되지만, 여러 사이트를 직접 확인하고 중요한 내용을 정리하는 데는 많은 시간이 필요합니다. 시간이 지나면 과거의 기술 흐름을 다시 찾아보거나 특정 기술이 어떻게 발전했는지 추적하는 것도 쉽지 않습니다.",
        definition:
          "Today in Tech는 이러한 문제를 해결하기 위해 시작한 프로젝트입니다. 콘텐츠를 자동으로 수집하고, AI가 의미 있는 글만 선별하여 하나의 기술 아카이브로 축적하는 것을 목표로 했습니다. 단순한 뉴스 요약이 아니라 기술의 흐름을 장기적으로 기록하고 검색할 수 있는 Knowledge Archive를 지향합니다.",
        images: [
          {
            src: "/images/today-in-tech-features/main-page.png",
            width: 2978,
            height: 1636,
            alt: "Today in Tech 메인 화면",
          },
        ],
        caption: "Today in Tech · 생성된 콘텐츠를 읽는 아카이브",
        decisions: [
          {
            title: "확장 가능한 멀티소스 수집 Pipeline",
            body: "OpenAI·Anthropic·Google·GitHub·Hacker News 등 여러 기술 채널의 RSS/Atom Feed와 Sitemap을 하나의 수집 Pipeline으로 통합했습니다. Source Factory와 Collector Strategy를 분리해 새로운 정보원을 추가할 때 기존 처리 흐름을 변경하지 않고 확장할 수 있도록 구성하고, URL 정규화·중복 제거·기수집 콘텐츠 필터링을 통해 AI가 처리할 후보를 선별했습니다.",
          },
          {
            title: "Evidence 기반 AI Editorial Pipeline",
            body: "수집한 원문의 본문 구조를 추출하고 길이에 따라 전체 본문 또는 관련 Chunk를 Evidence로 구성한 뒤 OpenAI 기반 News Editor Agent에 전달하도록 구현했습니다. AI가 원문을 근거로 기술적 의미가 있는 콘텐츠를 선별·작성하도록 하고, 수집·전처리·Enrichment·문서 생성 과정의 Trace를 저장해 콘텐츠가 생성된 과정을 추적하고 검증할 수 있도록 구성했습니다.",
          },
          {
            title: "지속적으로 축적되는 Knowledge Archive",
            body: "AI가 생성한 Markdown 문서를 Docusaurus 기반 기술 아카이브에 누적하고, GitHub Actions를 통해 수집부터 AI 문서 생성·사이트 빌드·GitHub Pages 배포까지 자동화했습니다. 이미 처리한 원문 상태를 함께 관리해 동일한 콘텐츠의 중복 생성을 방지하고, 매 실행 결과가 장기적으로 축적되는 Knowledge Archive 구조를 구성했습니다.",
          },
        ],
        architectureTakeaway:
          "모델 호출을 중심에 두기보다 입력 데이터와 처리 단계를 명시하고, 생성된 문서가 배포되는 과정까지 연결했습니다.",
        question:
          "운영 기간, 실패·재실행 처리, 원문 근거 검증 방식, Trace 활용 사례와 본인 담당 범위를 추가해 주세요.",
      },
      {
        slug: "say-it-its-ok",
        images: [
          {
            src: "/images/say-it-ok-features/menu-browse.png",
            width: 472,
            height: 613,
            alt: "말하면 OK! 메뉴 탐색 화면",
          },
          {
            src: "/images/say-it-ok-features/cart-voice-edit.png",
            width: 514,
            height: 613,
            alt: "말하면 OK! 음성으로 장바구니 수정",
          },
        ],
        headline: "실제 직원에게 말하듯 주문하는 AI Voice Kiosk",
        problem:
          "기존 키오스크는 사용자가 화면 구조와 조작 방식을 이해하고, 원하는 메뉴를 직접 탐색해 주문해야 했습니다. 메뉴가 많거나 여러 옵션을 변경해야 할수록 화면을 반복해서 이동해야 하며, 키오스크 사용에 익숙하지 않거나 손을 사용하기 어려운 사용자에게는 이러한 조작 과정 자체가 주문의 진입 장벽이 될 수 있었습니다.",
        definition:
          "말하면 OK!는 사용자가 직원에게 말하듯 자연어로 요청하면 시스템이 의도를 이해하고 실제 키오스크 동작으로 연결하는 AI Voice Kiosk입니다. 클라이언트, STT 서버, API 서버, NLP 서버를 분리하고 음성 입력부터 Speech-to-Text(STT), 자연어 의도 분석, 메뉴 조회·추천·장바구니 변경, Text-to-Speech(TTS) 응답까지 이어지는 End-to-End Pipeline을 구성했습니다.",
        caption: "말하면 OK! · 메뉴 탐색과 음성 장바구니 수정",
        decisions: [
          {
            title: "화면과 음성을 하나의 주문 API로 통합",
            body: "React 기반 키오스크 화면과 음성 Agent가 동일한 Node.js 주문 API를 사용하도록 구성했습니다. 메뉴 조회·추천·장바구니 수정 등 핵심 기능을 공통 API로 제공하여 화면 조작과 자연어 요청이 동일한 주문 상태를 변경하도록 구현했습니다.",
          },
          {
            title: "자연어 요청을 실제 키오스크 동작으로 변환",
            body: "FastAPI 기반 NLP 서버에서 OpenAI를 활용해 사용자의 발화 의도를 분석하고, 분석 결과를 메뉴 검색·추천·수량 변경·장바구니 수정 등 실제 API 호출로 연결했습니다. 단순 음성 질의응답이 아니라 자연어가 키오스크의 기능 실행으로 이어지도록 구성했습니다.",
          },
          {
            title: "음성 입력부터 응답까지 End-to-End 연결",
            body: "Google Cloud STT를 통해 사용자의 음성을 텍스트로 변환하고, NLP 처리와 주문 API 실행 결과를 화면 상태에 반영한 뒤 TTS로 다시 안내하도록 구성했습니다. 이를 통해 사용자의 발화부터 시스템 동작과 음성 피드백까지 하나의 Voice Interaction Pipeline으로 연결했습니다.",
          },
        ],
        architectureTakeaway:
          "음성 인식, 의도 분석, 주문 API의 역할을 분리하고 하나의 사용자 요청 흐름으로 연결했습니다.",
        question:
          "팀 규모와 본인 구현 범위, 의도 분석 실패 시 처리, 화면·음성 상태 동기화 방식, 사용자 검증 결과를 추가해 주세요.",
      },
    ],
  },
  en: {
    kicker: "DEVELOPER PORTFOLIO",
    introTitle: "Designing how AI works\nand how development starts.",
    introBody:
      "I am Choi Hyuk. Building backend and AI services led me to connect recurring development tasks and knowledge scattered across tools into shared structures.",
    introNote:
      "I address problems found during implementation through interfaces, development rules, and automation.",
    educationLabel: "Education",
    careerLabel: "Experience",
    skillsTitle: "Skill",
    linksTitle: "Link",
    aboutLabel: "ABOUT ME",
    skillLabel: "TECHNICAL TOOLKIT",
    skills: [
      "Python",
      "TypeScript",
      "Linux",
      "FastAPI",
      "React",
      "RAG",
      "MCP",
      "Docker",
      "GitHub Actions",
    ],
    projectLabel: "SELECTED PROJECT",
    detailLabel: "Detail",
    architectureLabel: "SYSTEM ARCHITECTURE",
    designLabel: "Design focus",
    implementationLabel: "Implementation",
    questionLabel: "Your input needed",
    experienceTitle: "From building services\nto improving development.",
    writingTitle: "Document what I build.\nShare what I learn.",
    writingNote:
      "I started writing on Velog in 2025 so questions and solutions from development would not simply pass by undocumented. Rewriting a solved problem made causes and trade-offs clearer, and turning one experience into reusable knowledge became unexpectedly enjoyable.\n\nWriting did not come naturally to me, so finishing a single article initially required a lot of thought. I worked through wording and structure with AI many times, and that process helped me verify what I understood and learn to explain it more precisely.\n\nI am still learning, but I believe organizing and sharing what I experience matters as much as using technology. I will continue recording the problem-solving experiences and ideas I gain through development.",
    writingTopics: [
      {
        category: "DEVELOPMENT",
        title: "Building a Velog Backup Program",
        href: "https://velog.io/@choi-hyk/Mini-Project-Velog-Backup-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EB%A7%8C%EB%93%A4%EA%B8%B0",
        summary:
          "Turning repeated Velog backup work into a reusable Python CLI workflow.",
      },
      {
        category: "DEVELOPMENT",
        title: "Getting Started with HippoBox",
        href: "https://velog.io/@choi-hyk/Project-HippoBox-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0",
        summary:
          "How a Knowledge Layer and MCP made project context reusable across AI agents.",
      },
      {
        category: "DEVELOPMENT",
        title: "Improving GitHub Pages with a Serverless Setup",
        href: "https://velog.io/@choi-hyk/GitHub-Pages-디자인-개선-및-서버리스로-변경",
        summary:
          "A practical record of improving a personal site and moving it to a serverless structure.",
      },
      {
        category: "AI",
        title: "[LLM] Overview",
        href: "https://velog.io/@choi-hyk/LLM-Overview",
        summary:
          "A foundational overview of LLM concepts and generative AI application flows.",
      },
      {
        category: "AI",
        title: "[LLM] LoRA (Low Rank Adaptation)",
        href: "https://velog.io/@choi-hyk/LLM-LoRA-Low-Rank-Adaptation",
        summary:
          "Explaining the principle and use of LoRA for parameter-efficient LLM tuning.",
      },
      {
        category: "AI",
        title: "[LLM] Fine-tuning",
        href: "https://velog.io/@choi-hyk/LLM-Fine-tuning",
        summary: "A practical note on the purpose and process of fine-tuning an LLM.",
      },
      {
        category: "CS / ENGINEERING",
        title: "[FastAPI] The Logic of sync/async",
        href: "https://velog.io/@choi-hyk/Python-syncasync-%EC%9D%98-%EB%85%BC%EB%A6%AC%EC%A0%81-%EA%B5%AC%EC%A1%B0",
        summary:
          "Understanding server execution through synchronous, asynchronous, and concurrent work.",
      },
      {
        category: "CS / ENGINEERING",
        title: "Interface Design Strategy (Backend)",
        href: "https://velog.io/@choi-hyk/백엔드-인터페이스-설계-전략",
        summary:
          "A systems perspective on boundaries, requests, and responses between services.",
      },
      {
        category: "CS / ENGINEERING",
        title: "Decorator Pattern",
        href: "https://velog.io/@choi-hyk/Design-Pattern-Decorator-Pattern",
        summary:
          "The structure and use of adding responsibilities to objects dynamically.",
      },
    ],
    thankYou: "Thank you.",
    closing: "Choi Hyuk — discovering problems and addressing them through structure.",
    closingNote: "I welcome conversations about project design and implementation.",
    deckHint:
      "16:9 landscape slides · Introduction, projects, experience, writing and activities. Save a PDF from the print dialog.",
    projects: [
      {
        slug: "blueprint4agent",
        headline: "A shared development foundation\nfor agentic coding",
        problem:
          "Each project repeated authentication, testing, documentation and deployment setup. Different AI coding agents also followed different practices, making consistent development and validation difficult. Time spent aligning the foundation reduced the time available for solving the actual product problem.",
        definition:
          "Blueprint4Agent standardizes the development environment and validation process. Developers and AI agents share working rules and reuse the same workflow across new projects. It treats recurring setup as a shared starting point so implementation, validation and delivery follow the same baseline.",
        images: [
          {
            src: "/images/b4a-features/showcase.png",
            width: 2448,
            height: 1618,
            alt: "Blueprint4Agent application",
          },
        ],
        caption: "B4FastAPI · Service and development foundations",
        decisions: [
          {
            title: "Standardize recurring foundations",
            body: "Shared authentication, APIs and configuration, with generated OpenAPI clients keeping React and FastAPI aligned.",
          },
          {
            title: "Automate validation and delivery",
            body: "Connected tests, builds and deployment through GitHub Actions into a repeatable delivery workflow.",
          },
          {
            title: "Share rules with AI agents",
            body: "Documented working rules and validation in a harness, including observability and web/desktop environments.",
          },
        ],
        architectureTakeaway:
          "Shared specifications, development rules, and validation workflows structure recurring setup tasks.",
        question:
          "Add real adoption examples, generated-code maintenance, setup changes, your implementation scope, and team size.",
      },
      {
        slug: "hippobox",
        headline: "A local-first knowledge platform\nfor AI agents",
        problem:
          "Switching AI tools meant explaining project knowledge and context again. I wanted to reduce repeated explanations and the effort of managing knowledge across separate tools. When knowledge stays attached to a conversation or tool, decisions and documentation do not become reusable project assets.",
        definition:
          "HippoBox manages knowledge in a shared local layer. MCP gives multiple AI agents access to the knowledge people maintain, so existing context remains reusable when tools change. Storage, management and retrieval form one layer that keeps working context available across tools.",
        images: [
          {
            src: "/images/hippobox-guide/step-4.png",
            width: 1920,
            height: 1080,
            alt: "HippoBox MCP connection",
          },
        ],
        caption: "HippoBox · MCP client setup",
        decisions: [
          {
            title: "A shared knowledge interface",
            body: "Connected a FastAPI Knowledge API and MCP server so the management UI and AI agents access the same knowledge.",
          },
          {
            title: "Embedding-based retrieval",
            body: "Built embedding search and vector indexes with Qdrant and exposed semantic retrieval through the Knowledge API.",
          },
          {
            title: "Connect management and reuse",
            body: "Linked a React/TypeScript UI and MCP tools to the same store, allowing multiple AI tools to reuse maintained knowledge.",
          },
        ],
        architectureTakeaway:
          "Different tools access the same knowledge store through shared management and search interfaces.",
        question:
          "Add the local-first tradeoff, actual client reuse examples, search evaluation, your implementation scope, and team size.",
      },
      {
        slug: "today-in-tech",
        headline: "AI-powered tech content\ncollection and publishing",
        problem:
          "Tech news and official blogs are scattered across sources. Checking for updates, selecting content and organizing it required continuous manual work. Without shared collection criteria and processing history, the same review work had to be repeated and the archive could not grow consistently.",
        definition:
          "Today in Tech connects collection, preprocessing, AI writing and publishing in one pipeline. It turns recurring work into a reproducible workflow and accumulates generated documents in an archive. Each stage has explicit inputs and outputs so new sources can follow the same path to publication.",
        images: [
          {
            src: "/images/today-in-tech-features/main-page.png",
            width: 2978,
            height: 1636,
            alt: "Today in Tech home",
          },
        ],
        caption: "Today in Tech · Published content archive",
        decisions: [
          {
            title: "An extensible collection pipeline",
            body: "Separated RSS/Atom and sitemap collection, deduplication and preprocessing so new sources and processing steps can be added.",
          },
          {
            title: "Generate from source evidence",
            body: "Structured source material as evidence for an LLM and News Editor Agent to automate selection and writing.",
          },
          {
            title: "Connect publishing and tracing",
            body: "Used Docusaurus and GitHub Actions to build and publish, retaining source snapshots, results and traces for inspection.",
          },
        ],
        architectureTakeaway:
          "Explicit inputs and processing stages connect source material to generated and published documents.",
        question:
          "Add operating history, retry behavior, evidence validation, trace examples, and your contribution scope.",
      },
      {
        slug: "say-it-its-ok",
        images: [
          {
            src: "/images/say-it-ok-features/menu-browse.png",
            width: 472,
            height: 613,
            alt: "Say It OK menu browsing",
          },
          {
            src: "/images/say-it-ok-features/cart-voice-edit.png",
            width: 514,
            height: 613,
            alt: "Say It OK voice cart editing",
          },
        ],
        headline: "An AI voice kiosk\nthat turns requests into orders",
        problem:
          "Conventional kiosks require users to learn the interface to find items and place orders. We wanted to reduce navigation and interaction effort by letting users say what they need. Moving through several menu screens can itself become a barrier when the catalog is large or hands-free interaction is preferable.",
        definition:
          "Say It, It’s OK! connects speech to menu browsing, recommendations and orders. Our team linked touch and voice inputs to shared order APIs and returned results through the screen and speech. Natural-language requests are interpreted as kiosk actions and returned through coordinated visual and spoken feedback.",
        caption: "Say It, It's OK! · Menu browsing and voice cart editing",
        decisions: [
          {
            title: "One flow for touch and voice",
            body: "Connected the React UI and voice requests to the same Node.js menu, recommendation and order APIs.",
          },
          {
            title: "Turn language into kiosk actions",
            body: "Used OpenAI in the FastAPI NLP service to map utterances to menu queries, recommendations and cart updates.",
          },
          {
            title: "Connect speech input and feedback",
            body: "Used Google Cloud STT for transcription and TTS for spoken feedback alongside on-screen order results.",
          },
        ],
        architectureTakeaway:
          "Separate speech recognition, intent analysis, and order APIs while connecting them in one request flow.",
        question:
          "Add team size, your implementation scope, intent failure handling, UI and voice synchronization, and user validation results.",
      },
    ],
  },
};
