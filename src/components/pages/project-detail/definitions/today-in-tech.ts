import type { CanvasEdge, CanvasNode } from "@/components/canvas/workflow-canvas";
import type { Project } from "@/types/project";
import type { ProjectDetailCanvasDefinition } from "./types";

export function getTodayInTechDetailCanvas(project: Project): ProjectDetailCanvasDefinition {
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
