import {
  type CanvasEdge,
  type CanvasNode,
  WorkflowCanvas,
} from "@/components/canvas/workflow-canvas";

type CanvasLandingProps = {
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
    projectSectionTitle: string;
    featuredProjects: Array<{
      title: string;
      description: string;
      highlights: string[];
      stack: string[];
      iconSrc: string;
      iconAlt: string;
    }>;
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

export function CanvasLanding({ home }: CanvasLandingProps) {
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
      id: "slogan",
      kind: "note",
      appearance: "transparent",
      x: 13,
      y: 7,
      width: 38,
      markdown: [
        `# ${home.title}`,
        "",
        home.slogan.emphasis,
        "",
        home.slogan.body,
        "",
        home.slogan.action,
        "",
        home.slogan.closing,
        "",
        home.slogan.final,
      ].join("\n"),
    },
    {
      id: "profile",
      kind: "note",
      x: 50,
      y: 10,
      width: 26,
      markdown: [
        `## ${home.profileCard.koreanName} ${home.profileCard.englishName}`,
        ...home.profileCard.experiences.map(
          (experience) =>
            `- :${experience.icon}: **${experience.title}** / ${experience.detail} / ${experience.period}`,
        ),
        "",
        `- :stack: ${home.profileCard.skills.map((skill) => `\`${skill}\``).join(" ")}`,
      ].join("\n"),
    },
    {
      id: "projects-heading",
      kind: "note",
      appearance: "transparent",
      x: 13,
      y: 30,
      width: 28,
      markdown: [`# ${home.projectSectionTitle}`].join("\n"),
    },
    ...home.featuredProjects.map((project, index) => ({
      id: `project-${index + 1}`,
      kind: "note" as const,
      icon: {
        src: project.iconSrc,
        alt: project.iconAlt,
      },
      x: 13,
      y: 36 + index * 17,
      width: 31,
      markdown: [
        `## ${project.title}`,
        project.description,
        "",
        ...project.highlights.map((highlight) => `- ${highlight}`),
        "",
        project.stack.map((stack) => `\`${stack}\``).join(" "),
      ].join("\n"),
    })),
  ];
  const canvasEdges: CanvasEdge[] = [];

  return (
    <WorkflowCanvas
      label={home.title}
      nodes={canvasNodes}
      edges={canvasEdges}
      shell={shell}
      labels={home.canvas}
    />
  );
}
