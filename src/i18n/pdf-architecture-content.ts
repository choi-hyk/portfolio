import type { Locale } from "./config";

export type PdfArchitectureContent = {
  groups: Record<string, string>;
  nodes: Record<string, { title: string; lines: string[] }>;
  notes: { title: string; body: string }[];
};

export const pdfArchitectureContent: Record<
  Locale,
  Record<string, PdfArchitectureContent>
> = {
  ko: {
    blueprint4agent: {
      groups: {
        frontend: "Frontend",
        backend: "Backend",
        storage: "Data / Cache",
        deploy: "Deploy",
        observability: "Observability",
      },
      nodes: {
        client: {
          title: "React",
          lines: ["TypeScript · Web / Tauri", "OpenAPI 생성 클라이언트"],
        },
        api: {
          title: "FastAPI",
          lines: ["인증 · OAuth · API Key", "설정과 서비스 API"],
        },
        orm: { title: "SQLAlchemy", lines: ["데이터 접근 계층", "ORM 기반 DB 추상화"] },
        data: { title: "Database", lines: ["영속 데이터 저장", "Redis · 캐시와 세션"] },
        build: { title: "Hatch", lines: ["공통 빌드 명령", "로컬과 CI에서 재사용"] },
        ci: {
          title: "GitHub Actions",
          lines: ["검증 · 빌드 · 배포", "자동화된 릴리스 흐름"],
        },
        release: {
          title: "Docker / GHCR",
          lines: ["컨테이너 이미지 배포", "Tauri 데스크톱 빌드"],
        },
        monitor: {
          title: "OpenTelemetry",
          lines: ["Metrics · Trace 수집", "Prometheus · Grafana"],
        },
      },
      notes: [
        {
          title: "Frontend·Backend를 하나의 API 계약으로 연결",
          body: "React·TypeScript Frontend와 FastAPI Backend가 OpenAPI 명세를 공유하도록 구성했습니다. OpenAPI Generator로 TypeScript API Client를 자동 생성해 인터페이스 불일치를 줄이고, Web과 Tauri Desktop이 동일한 서비스 API를 사용하도록 설계했습니다.",
        },
        {
          title: "서비스 공통 계층과 배포 아키텍처",
          body: "FastAPI, SQLAlchemy, Database, Redis로 Backend 계층을 구성하고 인증·OAuth·API Key 등 반복 기능을 기본 제공했습니다. Hatch와 GitHub Actions를 연결해 로컬부터 Docker Image·GHCR·Tauri 배포까지 동일한 Release Workflow를 사용하도록 구성했습니다.",
        },
        {
          title: "Observability를 포함한 운영 아키텍처",
          body: "OpenTelemetry로 Metrics와 Trace를 수집하고 Prometheus·Grafana와 연결했습니다. 개발부터 운영까지 동일한 Observability 구성을 사용해 서비스 상태와 요청 흐름을 지속적으로 확인할 수 있도록 설계했습니다.",
        },
      ],
    },
    hippobox: {
      groups: {
        frontend: "Frontend",
        clients: "MCP Clients",
        backend: "Backend / Knowledge API",
        storage: "Database",
        deploy: "Deploy",
      },
      nodes: {
        ui: {
          title: "React",
          lines: ["TypeScript 관리 화면", "OpenAPI 생성 클라이언트"],
        },
        api: { title: "FastAPI", lines: ["공통 Knowledge API", "지식 CRUD와 검색"] },
        orm: {
          title: "SQLAlchemy",
          lines: ["데이터 접근 계층", "저장소 인터페이스 분리"],
        },
        data: { title: "Database", lines: ["지식 메타데이터 저장", "ORM을 통한 접근"] },
        clients: {
          title: "AI Clients",
          lines: ["Claude · Cursor · Codex", "MCP 도구 호출"],
        },
        mcp: {
          title: "MCP Server",
          lines: ["FastAPI-MCP", "Knowledge API를 도구로 제공"],
        },
        vectors: {
          title: "Qdrant",
          lines: ["임베딩 벡터 인덱스", "의미 기반 지식 검색"],
        },
        release: {
          title: "Distribution",
          lines: ["Hatch · GitHub Actions", "Docker · PyPI · GHCR"],
        },
      },
      notes: [
        {
          title: "Knowledge API와 MCP를 하나의 인터페이스로 연결",
          body: "React·TypeScript 관리 UI와 Claude·Cursor·Codex가 동일한 FastAPI Knowledge API를 사용하도록 구성했습니다. OpenAPI Generator와 FastAPI-MCP를 활용해 사람과 AI가 같은 인터페이스로 지식을 조회·수정하도록 설계했습니다.",
        },
        {
          title: "저장 계층과 의미 검색 계층 분리",
          body: "SQLAlchemy 기반 Database에는 지식 데이터를 저장하고, Qdrant에는 Embedding Vector Index를 분리해 구성했습니다. 영속 데이터 관리와 의미 기반 검색의 역할을 나눠 각 계층을 독립적으로 확장할 수 있도록 했습니다.",
        },
        {
          title: "AI Client와 지식 저장소를 분리한 배포 구조",
          body: "AI Client가 저장 방식에 직접 의존하지 않고 MCP Server를 통해 Knowledge Layer에 접근하도록 구성했습니다. Hatch와 GitHub Actions를 기반으로 Docker Image·PyPI·GHCR 배포까지 일관된 흐름으로 연결했습니다.",
        },
      ],
    },
    "today-in-tech": {
      groups: {
        sources: "Sources",
        pipeline: "Editorial Pipeline",
        publish: "Archive & Deploy",
        records: "Execution Records",
      },
      nodes: {
        sources: {
          title: "Sources",
          lines: ["공식 기술 채널", "RSS / Atom · Sitemap"],
        },
        collector: {
          title: "Collector",
          lines: ["원문 수집 · 중복 제거", "후보 콘텐츠 전처리"],
        },
        evidence: {
          title: "Evidence",
          lines: ["원문 근거 구조화", "AI Writer 입력 구성"],
        },
        writer: {
          title: "OpenAI Agent",
          lines: ["Editor / Writer", "Markdown 문서 생성"],
        },
        pages: {
          title: "GitHub Pages",
          lines: ["기술 콘텐츠 공개", "누적 아카이브 제공"],
        },
        ci: {
          title: "GitHub Actions",
          lines: ["문서 사이트 빌드", "정적 사이트 배포"],
        },
        archive: {
          title: "Docusaurus",
          lines: ["Markdown 아카이브", "생성 문서 사이트 반영"],
        },
        trace: {
          title: "JSON Store",
          lines: ["raw · processed · trace", "파이프라인 처리 기록"],
        },
      },
      notes: [
        {
          title: "멀티소스 수집과 Editorial Pipeline 분리",
          body: "OpenAI·Anthropic·Google·GitHub·Hacker News의 RSS/Atom Feed와 Sitemap을 수집하고, 중복 제거와 전처리를 거쳐 AI 처리 후보를 분리했습니다. 수집과 문서 생성을 분리해 새로운 정보원이 추가되어도 기존 Pipeline을 재사용할 수 있도록 구성했습니다.",
        },
        {
          title: "Evidence 기반 AI 문서 생성 구조",
          body: "전처리한 원문을 Evidence로 구조화해 OpenAI Agent의 Editor·Writer 입력으로 사용했습니다. 원문 근거를 기반으로 Markdown 문서를 생성하고, raw·processed·trace 데이터를 분리해 처리 과정을 추적할 수 있도록 설계했습니다.",
        },
        {
          title: "생성부터 Archive 배포까지 자동화",
          body: "AI가 생성한 Markdown을 Docusaurus 기반 Archive에 반영하고, GitHub Actions로 빌드와 GitHub Pages 배포를 자동화했습니다. 콘텐츠 생성부터 공개까지 하나의 Workflow로 연결했습니다.",
        },
      ],
    },
    "say-it-its-ok": {
      groups: {
        frontend: "Frontend / Client",
        voice: "STT / TTS",
        nlp: "Backend / NLP Server",
        api: "Backend / API Server",
      },
      nodes: {
        client: {
          title: "React",
          lines: ["TypeScript 키오스크 UI", "화면 조작과 음성 요청"],
        },
        stt: { title: "Google STT", lines: ["음성 → 텍스트", "발화를 서버로 전달"] },
        nlp: {
          title: "FastAPI NLP",
          lines: ["주문 · 추천 의도 분석", "키오스크 행동으로 변환"],
        },
        model: { title: "OpenAI", lines: ["자연어 요청 해석", "의도 분석 지원"] },
        tts: { title: "Google TTS", lines: ["처리 결과 → 음성", "클라이언트 피드백"] },
        api: {
          title: "Node.js API",
          lines: ["메뉴 · 추천 · 주문", "화면·음성 요청 통합"],
        },
        data: {
          title: "MongoDB",
          lines: ["메뉴와 주문 데이터", "API 서버에서 조회·관리"],
        },
      },
      notes: [
        {
          title: "화면과 음성을 하나의 주문 API로 통합",
          body: "React·TypeScript 기반 Client에서 터치 입력과 음성 요청을 모두 지원하고, 두 입력 방식을 Node.js API Server의 메뉴·추천·주문 기능으로 연결했습니다. MongoDB를 공통 데이터 계층으로 사용해 입력 방식과 관계없이 동일한 주문 상태와 메뉴 데이터를 처리하도록 구성했습니다.",
        },
        {
          title: "음성 요청을 키오스크 행동으로 변환",
          body: "Google STT로 변환한 발화를 FastAPI 기반 NLP Server에 전달하고, OpenAI를 활용해 주문·추천·안내 의도를 분석했습니다. 분석 결과를 실제 API 요청으로 변환하여 메뉴 조회·추천·장바구니 수정 등 키오스크의 도메인 동작으로 연결했습니다.",
        },
        {
          title: "STT부터 TTS까지 End-to-End Voice Pipeline 구성",
          body: "Client, STT/TTS, NLP Server, API Server를 역할별로 분리하면서 하나의 Voice Pipeline으로 연결했습니다. 주문 처리 결과를 화면 상태에 반영하고 Google TTS로 음성 피드백을 제공해, 사용자 발화부터 키오스크 동작과 응답까지 전체 흐름을 완성했습니다.",
        },
      ],
    },
  },
  en: {
    blueprint4agent: {
      groups: {
        frontend: "Frontend",
        backend: "Backend",
        storage: "Data / Cache",
        deploy: "Deploy",
        observability: "Observability",
      },
      nodes: {
        client: {
          title: "React",
          lines: ["TypeScript · Web / Tauri", "Generated OpenAPI client"],
        },
        api: {
          title: "FastAPI",
          lines: ["Auth · OAuth · API keys", "Settings and service APIs"],
        },
        orm: {
          title: "SQLAlchemy",
          lines: ["Data access layer", "ORM database abstraction"],
        },
        data: {
          title: "Database",
          lines: ["Persistent storage", "Redis cache and sessions"],
        },
        build: {
          title: "Hatch",
          lines: ["Shared build commands", "Used locally and in CI"],
        },
        ci: {
          title: "GitHub Actions",
          lines: ["Check · Build · Deploy", "Automated releases"],
        },
        release: {
          title: "Docker / GHCR",
          lines: ["Container distribution", "Tauri desktop builds"],
        },
        monitor: {
          title: "OpenTelemetry",
          lines: ["Metrics and traces", "Prometheus · Grafana"],
        },
      },
      notes: [
        {
          title: "A shared API contract",
          body: "Generated OpenAPI clients keep frontend and backend interfaces aligned.",
        },
        {
          title: "Repeatable delivery",
          body: "Hatch and GitHub Actions share the build process from local development to release.",
        },
        {
          title: "Operational visibility",
          body: "OpenTelemetry collects metrics and traces for inspection with Prometheus and Grafana.",
        },
      ],
    },
    hippobox: {
      groups: {
        frontend: "Frontend",
        clients: "MCP Clients",
        backend: "Backend / Knowledge API",
        storage: "Database",
        deploy: "Deploy",
      },
      nodes: {
        ui: {
          title: "React",
          lines: ["TypeScript management UI", "Generated OpenAPI client"],
        },
        api: {
          title: "FastAPI",
          lines: ["Shared Knowledge API", "Knowledge CRUD and search"],
        },
        orm: {
          title: "SQLAlchemy",
          lines: ["Data access layer", "Storage abstraction"],
        },
        data: {
          title: "Database",
          lines: ["Knowledge metadata", "Access through the ORM"],
        },
        clients: {
          title: "AI Clients",
          lines: ["Claude · Cursor · Codex", "MCP tool calls"],
        },
        mcp: { title: "MCP Server", lines: ["FastAPI-MCP", "Knowledge API as tools"] },
        vectors: {
          title: "Qdrant",
          lines: ["Embedding vector index", "Semantic knowledge search"],
        },
        release: {
          title: "Distribution",
          lines: ["Hatch · GitHub Actions", "Docker · PyPI · GHCR"],
        },
      },
      notes: [
        {
          title: "One interface for people and AI",
          body: "The management UI and MCP tools access the same Knowledge API.",
        },
        {
          title: "Separate storage and retrieval",
          body: "A database stores metadata while Qdrant indexes embeddings for semantic search.",
        },
        {
          title: "Knowledge beyond any one tool",
          body: "The knowledge layer is independent of AI clients and distributed as packages and containers.",
        },
      ],
    },
    "today-in-tech": {
      groups: {
        sources: "Sources",
        pipeline: "Editorial Pipeline",
        publish: "Archive & Deploy",
        records: "Execution Records",
      },
      nodes: {
        sources: {
          title: "Sources",
          lines: ["Official tech channels", "RSS / Atom · Sitemap"],
        },
        collector: {
          title: "Collector",
          lines: ["Collect and deduplicate", "Preprocess candidates"],
        },
        evidence: {
          title: "Evidence",
          lines: ["Structure source material", "Prepare AI Writer input"],
        },
        writer: {
          title: "OpenAI Agent",
          lines: ["Editor / Writer", "Generate Markdown"],
        },
        pages: {
          title: "GitHub Pages",
          lines: ["Publish tech content", "Serve the archive"],
        },
        ci: {
          title: "GitHub Actions",
          lines: ["Build the documentation", "Deploy the static site"],
        },
        archive: {
          title: "Docusaurus",
          lines: ["Markdown archive", "Integrate generated docs"],
        },
        trace: {
          title: "JSON Store",
          lines: ["raw · processed · trace", "Pipeline execution records"],
        },
      },
      notes: [
        {
          title: "Start with source material",
          body: "Collect and preprocess multiple channels, then supply structured evidence to the writer.",
        },
        {
          title: "Connect writing to publishing",
          body: "Generated Markdown feeds Docusaurus and is deployed through GitHub Actions.",
        },
        {
          title: "Trace the process",
          body: "Source snapshots, processed results and traces remain in the JSON Store for inspection.",
        },
      ],
    },
    "say-it-its-ok": {
      groups: {
        frontend: "Frontend / Client",
        voice: "STT / TTS",
        nlp: "Backend / NLP Server",
        api: "Backend / API Server",
      },
      nodes: {
        client: {
          title: "React",
          lines: ["TypeScript kiosk UI", "Touch and voice requests"],
        },
        stt: {
          title: "Google STT",
          lines: ["Speech to text", "Forward the transcription"],
        },
        nlp: {
          title: "FastAPI NLP",
          lines: ["Order and recommendation", "Map intent to actions"],
        },
        model: {
          title: "OpenAI",
          lines: ["Interpret natural language", "Support intent analysis"],
        },
        tts: {
          title: "Google TTS",
          lines: ["Result to speech", "Client voice feedback"],
        },
        api: {
          title: "Node.js API",
          lines: ["Menu · Recommend · Order", "Also handles touch input"],
        },
        data: {
          title: "MongoDB",
          lines: ["Menu and order data", "Managed by the API"],
        },
      },
      notes: [
        {
          title: "Different inputs, shared actions",
          body: "Touch and voice requests use the same menu, recommendation and order APIs.",
        },
        {
          title: "Language becomes action",
          body: "FastAPI and OpenAI interpret STT output and pass kiosk actions to the API server.",
        },
        {
          title: "Close the feedback loop",
          body: "The UI reflects the result and Google TTS provides spoken feedback.",
        },
      ],
    },
  },
};
