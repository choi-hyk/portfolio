import {
  type WorkflowCanvasLabels,
  WorkflowCanvas,
} from "@/components/canvas/workflow-canvas";
import { getProjectDetailCanvas } from "@/components/pages/project-detail/definitions";
import type { Project } from "@/types/project";

const projectDetailCanvasShell = {
  border: "border-zinc-200",
  panel: "bg-white",
  editor: "bg-white",
  muted: "text-zinc-500",
  strong: "text-zinc-950",
  accent: "text-teal-800",
  accentBg: "bg-teal-100",
};

type ProjectDetailCanvasProps = {
  project: Project;
  canvasLabels: WorkflowCanvasLabels;
};

export function ProjectDetailCanvas({
  project,
  canvasLabels,
}: ProjectDetailCanvasProps) {
  const detailCanvas = getProjectDetailCanvas(project);

  return (
    <WorkflowCanvas
      label={`${project.title} project canvas`}
      nodes={detailCanvas.nodes}
      edges={detailCanvas.edges}
      shell={projectDetailCanvasShell}
      labels={canvasLabels}
    />
  );
}
