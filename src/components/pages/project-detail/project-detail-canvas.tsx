"use client";

import { useMemo } from "react";
import { usePortfolioViewport } from "@/components/shell/viewport-context";
import {
  type CanvasInteractionHint,
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
  interactionHint: CanvasInteractionHint;
};

export function ProjectDetailCanvas({
  project,
  canvasLabels,
  interactionHint,
}: ProjectDetailCanvasProps) {
  const { ready, scrollLayout } = usePortfolioViewport();
  const detailCanvas = useMemo(() => {
    const definition = getProjectDetailCanvas(project);
    if (!ready || !scrollLayout) return definition;

    const hiddenNodeIds = new Set(definition.architectureNodeIds);
    return {
      nodes: definition.nodes.filter((node) => !hiddenNodeIds.has(node.id)),
      edges: definition.edges.filter(
        (edge) =>
          !hiddenNodeIds.has(edge.from.nodeId) && !hiddenNodeIds.has(edge.to.nodeId),
      ),
    };
  }, [project, ready, scrollLayout]);

  return (
    <WorkflowCanvas
      label={`${project.title} project canvas`}
      nodes={detailCanvas.nodes}
      edges={detailCanvas.edges}
      shell={projectDetailCanvasShell}
      labels={canvasLabels}
      interactionHint={interactionHint}
    />
  );
}
