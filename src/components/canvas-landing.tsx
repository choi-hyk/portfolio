"use client";

import {
  ArrowUpRight,
  BookOpenText,
  Braces,
  Code2,
  BriefcaseBusiness,
  ChevronsLeft,
  Home,
  Mail,
} from "lucide-react";
import { useState } from "react";
import {
  type CanvasEdge,
  type CanvasNode,
  WorkflowCanvas,
} from "@/components/canvas/workflow-canvas";

type CanvasLandingProps = {
  profile: {
    name: string;
    role: string;
    email: string;
    links: {
      github: string;
      velog: string;
    };
  };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    github: string;
    velog: string;
    email: string;
    stats: string[];
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
  };
};

export function CanvasLanding({ profile, home }: CanvasLandingProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const shell = {
    page: "bg-white text-zinc-700",
    border: "border-zinc-200",
    panel: "bg-white",
    editor: "bg-white",
    muted: "text-zinc-500",
    strong: "text-zinc-950",
    accent: "text-teal-800",
    accentBg: "bg-teal-100",
  };
  const canvasNodes: CanvasNode[] = [
    {
      id: "intro",
      kind: "note",
      x: 14,
      y: 6,
      width: 32,
      markdown: [
        `# ${profile.name}`,
        home.subtitle,
        "",
        `- Role: ${profile.role}`,
        "- Focus: `FastAPI` `RAG` `MCP`",
        "- Output: 서비스 구조, 자동화 도구, 기술 기록",
      ].join("\n"),
    },
    {
      id: "problem",
      kind: "note",
      x: 51,
      y: 6,
      width: 28,
      markdown: [
        `## ${home.flow[0]?.title ?? "문제 정의"}`,
        home.flow[0]?.description ?? "",
        "",
        "AI 기능은 데모 화면보다 운영 흐름, 응답 품질, 유지보수 가능한 API 경계가 더 중요하다고 봅니다.",
      ].join("\n"),
    },
    {
      id: "code",
      kind: "code",
      x: 49,
      y: 34,
      width: 31,
      markdown: [
        "```ts",
        'const stack = ["FastAPI", "RAG", "MCP", "Automation"];',
        "",
        "export function buildService(problem: string) {",
        "  return connect(problem, stack);",
        "}",
        "```",
      ].join("\n"),
    },
    {
      id: "mermaid",
      kind: "mermaid",
      x: 16,
      y: 42,
      width: 27,
      markdown: [
        "```mermaid",
        "flowchart LR",
        "  problem --> api",
        "  api --> rag",
        "  rag --> product",
        "```",
      ].join("\n"),
    },
    {
      id: "proof",
      kind: "mention",
      x: 58,
      y: 66,
      width: 31,
      markdown: [
        `## ${home.flow[2]?.title ?? "증거 확인"}`,
        "@HippoBox @Blueprint4Agent @말하면OK @Velog",
        "",
        "조직 프로젝트와 개인 기록을 통해 구현 과정과 학습 밀도를 함께 보여줍니다.",
      ].join("\n"),
    },
  ];
  const canvasEdges: CanvasEdge[] = [
    {
      id: "intro-to-problem",
      from: "intro",
      to: "problem",
      directed: true,
      fromPoint: { x: 46, y: 19 },
      toPoint: { x: 51, y: 19 },
    },
    {
      id: "problem-to-code",
      from: "problem",
      to: "code",
      directed: true,
      fromPoint: { x: 65, y: 28 },
      toPoint: { x: 65, y: 34 },
    },
    {
      id: "intro-to-mermaid",
      from: "intro",
      to: "mermaid",
      directed: false,
      fromPoint: { x: 31, y: 28 },
      toPoint: { x: 30, y: 42 },
    },
    {
      id: "code-to-proof",
      from: "code",
      to: "proof",
      directed: true,
      fromPoint: { x: 66, y: 56 },
      toPoint: { x: 74, y: 66 },
    },
    {
      id: "mermaid-to-proof",
      from: "mermaid",
      to: "proof",
      directed: true,
      fromPoint: { x: 43, y: 56 },
      toPoint: { x: 58, y: 76 },
    },
  ];

  return (
    <section className={`relative min-h-screen ${shell.page}`}>
      <aside className="fixed bottom-3 left-3 top-3 z-30 hidden lg:block">
        <Sidebar
          collapsed={isSidebarCollapsed}
          profile={profile}
          home={home}
          onToggle={() => setIsSidebarCollapsed((value) => !value)}
        />
      </aside>

      <div className="min-w-0">
        <WorkflowCanvas
          label={home.title}
          nodes={canvasNodes}
          edges={canvasEdges}
          shell={shell}
        />
      </div>
    </section>
  );
}

type SidebarProps = {
  collapsed: boolean;
  profile: CanvasLandingProps["profile"];
  home: CanvasLandingProps["home"];
  onToggle: () => void;
};

function Sidebar({ collapsed, profile, home, onToggle }: SidebarProps) {
  const sections = [
    {
      label: "Overview",
      href: "#profile-canvas",
      icon: Home,
      active: true,
    },
    {
      label: "Experience",
      href: "#profile-canvas",
      icon: BriefcaseBusiness,
      active: false,
    },
    {
      label: "Projects",
      href: "#profile-canvas",
      icon: Braces,
      active: false,
    },
    {
      label: "Writing",
      href: "#profile-canvas",
      icon: BookOpenText,
      active: false,
    },
    {
      label: "Contact",
      href: `mailto:${profile.email}`,
      icon: Mail,
      active: false,
    },
  ];

  const links = [
    {
      label: home.github,
      href: profile.links.github,
      icon: Code2,
    },
    {
      label: home.velog,
      href: profile.links.velog,
      icon: BookOpenText,
    },
    {
      label: home.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
  ];

  const railItems = [...sections, ...links];

  return (
    <div
      className={[
        "relative h-full overflow-hidden border border-teal-200 bg-white shadow-md shadow-teal-900/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        collapsed ? "w-12 rounded-[1.75rem]" : "w-52 rounded-[1.75rem]",
      ].join(" ")}
    >
      <nav
        aria-label="Collapsed portfolio navigation"
        className={[
          "absolute inset-0 flex h-full w-12 flex-col items-center gap-1 px-1.5 py-3 text-zinc-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          collapsed
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-2 opacity-0",
        ].join(" ")}
      >
        <button
          type="button"
          title="Expand sidebar"
          aria-label="Expand sidebar"
          onClick={onToggle}
          className="mb-3 flex h-8 w-8 items-center justify-center rounded-full text-zinc-800 transition hover:bg-zinc-100"
        >
          <ChevronsLeft size={14} className="rotate-180" />
        </button>
        {railItems.map((item) => {
          const Icon = item.icon;
          const isExternal = item.href.startsWith("http");

          return (
            <a
              key={item.label}
              href={item.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              title={item.label}
              aria-label={item.label}
              className={[
                "flex h-8 w-8 items-center justify-center rounded-full transition",
                "active" in item && item.active
                  ? "bg-teal-100 text-teal-900 ring-1 ring-teal-200"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950",
              ].join(" ")}
            >
              <Icon size={14} />
            </a>
          );
        })}
      </nav>

      <div
        className={[
          "absolute inset-0 flex h-full w-52 min-h-0 flex-col gap-4 p-3 pt-4 text-[13px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          collapsed
            ? "pointer-events-none translate-x-4 opacity-0"
            : "translate-x-0 scale-100 opacity-100",
        ].join(" ")}
      >
        <div className="px-2 pb-1 pr-9">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
            Portfolio
          </p>
          <button
            type="button"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
            onClick={onToggle}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-teal-200 bg-white text-zinc-500 transition hover:border-teal-300 hover:bg-teal-100 hover:text-teal-900"
          >
            <ChevronsLeft size={15} />
          </button>
        </div>

        <nav aria-label="Portfolio pages" className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <a
                key={section.label}
                href={section.href}
                className={[
                  "relative flex h-8 items-center gap-2 rounded-md px-2 transition",
                  section.active
                    ? "bg-teal-100 text-teal-950 ring-1 ring-teal-200 before:absolute before:left-0 before:top-1.5 before:h-5 before:w-0.5 before:rounded-full before:bg-teal-700"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
                ].join(" ")}
              >
                <Icon size={14} className="shrink-0" />
                <span className="truncate font-medium">{section.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="space-y-1">
          <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
            External
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            const isExternal = link.href.startsWith("http");

            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="flex h-8 items-center justify-between gap-2 rounded-md px-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Icon size={14} className="shrink-0" />
                  <span className="truncate">{link.label}</span>
                </span>
                {isExternal ? <ArrowUpRight size={13} className="shrink-0" /> : null}
              </a>
            );
          })}
        </div>

        <div className="mt-auto" />
      </div>
    </div>
  );
}
