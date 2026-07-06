import {
  type CanvasEdge,
  type CanvasNode,
  WorkflowCanvas,
} from "@/components/canvas/workflow-canvas";

type CanvasLandingProps = {
  profile: {
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

export function CanvasLanding({ home, profile }: CanvasLandingProps) {
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
      order: 1,
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
      id: "social-links",
      kind: "note",
      excludeFromSequence: true,
      x: 78,
      y: 10,
      width: 10,
      markdown: [
        "## Links",
        `- :github: [${home.github}](${profile.links.github})`,
        `- :velog: [${home.velog}](${profile.links.velog})`,
        `- :email: [${home.email}](mailto:${profile.email})`,
      ].join("\n"),
    },
    {
      id: "profile",
      kind: "note",
      order: 2,
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
      id: "overview-summary",
      kind: "note",
      order: 3,
      x: 50,
      y: 30,
      width: 26,
      markdown: [
        `## ${home.overviewSummary.title}`,
        ...home.overviewSummary.items.map((item) => `- ${item}`),
      ].join("\n"),
    },
    {
      id: "projects-heading",
      kind: "note",
      appearance: "transparent",
      excludeFromSequence: true,
      x: 13,
      y: 55,
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
      order: 4 + index,
      x: 13,
      y: 61 + index * 17,
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
    {
      id: "experience-heading",
      kind: "note",
      appearance: "transparent",
      excludeFromSequence: true,
      x: 50,
      y: 62,
      width: 28,
      markdown: [`# ${home.experienceSectionTitle}`].join("\n"),
    },
    {
      id: "experience-synapsoft",
      kind: "note",
      order: 8,
      x: 50,
      y: 68,
      width: 31,
      markdown: [
        `## ${home.featuredExperience.title}`,
        home.featuredExperience.description,
        "",
        ...home.featuredExperience.highlights.map((highlight) => `- ${highlight}`),
        "",
        home.featuredExperience.stack.map((stack) => `\`${stack}\``).join(" "),
      ].join("\n"),
    },
    {
      id: "writing-heading",
      kind: "note",
      appearance: "transparent",
      excludeFromSequence: true,
      x: 82,
      y: 30,
      width: 28,
      markdown: [`# ${home.writingSectionTitle}`].join("\n"),
    },
    {
      id: "writing-velog",
      kind: "note",
      order: 9,
      x: 82,
      y: 36,
      width: 31,
      markdown: [
        `## ${home.featuredWriting.title}`,
        home.featuredWriting.description,
        "",
        ...home.featuredWriting.articles.map((article) => `- ${article}`),
      ].join("\n"),
    },
  ];
  const canvasEdges: CanvasEdge[] = [
    {
      id: "summary-to-projects",
      directed: true,
      from: { nodeId: "overview-summary", side: "left" },
      to: { nodeId: "projects-heading", side: "right" },
    },
    {
      id: "summary-to-experience",
      directed: true,
      from: { nodeId: "overview-summary", side: "bottom" },
      to: { nodeId: "experience-heading", side: "top" },
    },
    {
      id: "summary-to-writing",
      directed: true,
      from: { nodeId: "overview-summary", side: "right" },
      to: { nodeId: "writing-heading", side: "left" },
    },
  ];

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
