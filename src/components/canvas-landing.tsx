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
    techFocus: {
      buildTitle: string;
      buildItems: string[];
      stackTitle: string;
      stacks: string[];
    };
    nodeTitles: {
      profile: string;
      links: string;
      techFocus: string;
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
    projectSectionTitle: string;
    projectLinks: {
      overview: string;
      overviewTooltip: string;
      details: string;
      detailsTooltip: string;
    };
    featuredProjects: Array<{
      slug: string;
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

export function CanvasLanding({ home, profile }: CanvasLandingProps) {
  const formatTags = (tags: string[]) => tags.map((tag) => `\`${tag}\``).join(" ");
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
      id: "profile-title",
      kind: "note",
      appearance: "transparent",
      excludeFromSequence: true,
      order: 2,
      x: 13,
      y: 28,
      width: 14,
      markdown: [`### ${home.nodeTitles.profile}`].join("\n"),
    },
    {
      id: "links-title",
      kind: "note",
      appearance: "transparent",
      excludeFromSequence: true,
      order: 3,
      x: 41,
      y: 28,
      width: 12,
      markdown: [`### ${home.nodeTitles.links}`].join("\n"),
    },
    {
      id: "tech-focus-title",
      kind: "note",
      appearance: "transparent",
      excludeFromSequence: true,
      order: 4,
      x: 57,
      y: 12,
      width: 18,
      markdown: [`### ${home.nodeTitles.techFocus}`].join("\n"),
    },
    {
      id: "tech-focus",
      kind: "note",
      order: 4,
      x: 57,
      y: 15,
      width: 30,
      markdown: [
        `### ${home.techFocus.buildTitle}`,
        ...home.techFocus.buildItems.map((item) => `- ${item}`),
        "",
        `### ${home.techFocus.stackTitle}`,
        formatTags(home.techFocus.stacks),
      ].join("\n"),
    },
    {
      id: "social-links",
      kind: "note",
      order: 3,
      x: 41,
      y: 31,
      width: 10,
      markdown: [
        `- :github: [${home.github}](${profile.links.github})`,
        `- :velog: [${home.velog}](${profile.links.velog})`,
        `- :email: [${home.email}](mailto:${profile.email})`,
      ].join("\n"),
    },
    {
      id: "profile",
      kind: "note",
      order: 2,
      x: 13,
      y: 31,
      width: 26,
      markdown: [
        `## ${home.profileCard.koreanName} ${home.profileCard.englishName}`,
        ...home.profileCard.experiences.map(
          (experience) =>
            `- :${experience.icon}: **${experience.title}** / ${experience.detail} / ${experience.period}`,
        ),
        "",
        `- :stack: ${formatTags(home.profileCard.skills)}`,
      ].join("\n"),
    },
    {
      id: "projects-heading",
      kind: "note",
      appearance: "transparent",
      excludeFromSequence: true,
      order: 5,
      x: 13,
      y: 48,
      width: 36,
      markdown: [
        `# ${home.projectSectionTitle} [${home.projectLinks.overview}|${home.projectLinks.overviewTooltip}](/projects)`,
      ].join("\n"),
    },
    ...home.featuredProjects.map((project, index) => ({
      id: `project-${index + 1}`,
      kind: "note" as const,
      icon: {
        src: project.iconSrc,
        alt: project.iconAlt,
      },
      order: 5 + index,
      x: index % 2 === 0 ? 13 : 47,
      y: 53 + Math.floor(index / 2) * 18,
      width: 33,
      markdown: [
        `## ${project.title}\u00A0\u00A0[${home.projectLinks.details}|${home.projectLinks.detailsTooltip.replace("{project}", project.title)}](/projects/${project.slug})`,
        project.description,
        "",
        ...project.highlights.map((highlight) => `- ${highlight}`),
        "",
        formatTags(project.stack),
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
