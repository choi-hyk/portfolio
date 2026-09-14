import { Children, type ReactNode } from "react";
import {
  WorkflowCanvas,
  type CanvasInteractionHint,
  type CanvasNode,
  type CanvasShell,
  type WorkflowCanvasLabels,
} from "@/components/canvas/workflow-canvas";
import { SLIDE_HEIGHT } from "./slide-constants";
import { ScaledSlide } from "./scaled-slide";

const shell: CanvasShell = {
  border: "border-zinc-200",
  panel: "bg-white",
  editor: "bg-white",
  muted: "text-zinc-500",
  strong: "text-zinc-950",
  accent: "text-teal-800",
  accentBg: "bg-teal-100",
};

export function SlidesCanvas({
  children,
  canvasMode,
  label,
  labels,
  interactionHint,
}: {
  children: ReactNode;
  canvasMode: boolean;
  label: string;
  labels: WorkflowCanvasLabels;
  interactionHint: CanvasInteractionHint;
}) {
  const slides = Children.toArray(children);
  if (!canvasMode) return <div className="slide-canvas">{slides}</div>;

  const nodes: CanvasNode[] = slides.map((content, index) => ({
    id: `slide-${index + 1}`,
    kind: "note",
    appearance: "transparent",
    markdown: "",
    content: <ScaledSlide>{content}</ScaledSlide>,
    order: index + 1,
    x: 4 + (index % 2) * 66,
    y: 4 + Math.floor(index / 2) * 56,
    width: 60,
    height: SLIDE_HEIGHT,
  }));

  return (
    <>
      <div className="slides-interactive-canvas">
        <WorkflowCanvas
          label={label}
          labels={labels}
          interactionHint={interactionHint}
          nodes={nodes}
          edges={[]}
          shell={shell}
        />
      </div>
      <div className="slides-print-deck">{slides}</div>
    </>
  );
}
