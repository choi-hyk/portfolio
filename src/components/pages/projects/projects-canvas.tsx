import {
  type WorkflowCanvasLabels,
  WorkflowCanvas,
} from "@/components/canvas/workflow-canvas";
import { getProjectsCanvasDefinition } from "@/components/pages/projects/canvas-definition";
import type { Project } from "@/types/project";

const projectCanvasShell = {
  border: "border-zinc-200",
  panel: "bg-white",
  editor: "bg-white",
  muted: "text-zinc-500",
  strong: "text-zinc-950",
  accent: "text-teal-800",
  accentBg: "bg-teal-100",
};

type ProjectsCanvasProps = {
  projects: Project[];
  projectsPage: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
  };
  canvasLabels: WorkflowCanvasLabels;
};

export function ProjectsCanvas({
  projects,
  projectsPage,
  canvasLabels,
}: ProjectsCanvasProps) {
  const canvas = getProjectsCanvasDefinition({ projects, projectsPage });

  return (
    <WorkflowCanvas
      label="Projects overview canvas"
      nodes={canvas.nodes}
      edges={canvas.edges}
      shell={projectCanvasShell}
      labels={canvasLabels}
    />
  );
}
