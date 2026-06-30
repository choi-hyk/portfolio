"use client";

import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  type WheelEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Building2, Code2, GraduationCap } from "lucide-react";
import Image from "next/image";
import { Tooltip } from "@/components/tooltip";

type CanvasPoint = {
  x: number;
  y: number;
};

type CanvasSize = {
  width: number;
  height: number;
};

export type CanvasNodeKind = "note" | "code" | "mermaid" | "mention";

export type CanvasNode = {
  id: string;
  kind: CanvasNodeKind;
  appearance?: "default" | "transparent";
  icon?: {
    src: string;
    alt: string;
  };
  markdown: string;
  excludeFromSequence?: boolean;
  order?: number;
  x: number;
  y: number;
  width: number;
};

export type CanvasNodeSide = "top" | "right" | "bottom" | "left";

type CanvasEdgeEndpoint = {
  nodeId: string;
  side: CanvasNodeSide;
};

type CanvasNodeHeights = Record<string, number>;

export type CanvasEdge = {
  id: string;
  from: CanvasEdgeEndpoint;
  to: CanvasEdgeEndpoint;
  directed?: boolean;
};

export type CanvasShell = {
  border: string;
  panel: string;
  editor: string;
  accent: string;
  accentBg: string;
  muted: string;
  strong: string;
};

export type WorkflowCanvasLabels = {
  previousNode: string;
  nextNode: string;
  focusPreviousNode: string;
  focusNextNode: string;
  moveViewport: string;
  focusNode: string;
};

type WorkflowCanvasProps = {
  label: string;
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  shell: CanvasShell;
  labels?: WorkflowCanvasLabels;
  occludedLeft?: number;
};

const BASE_CANVAS_SIZE = {
  width: 2000,
  height: 1400,
};
const CANVAS_EXPANSION_PADDING = 160;
const NODE_REVEAL_STEP_MS = 260;
const EDGE_REVEAL_STEP_MS = 120;
const EDGE_REVEAL_OFFSET_MS = 320;
const defaultCanvasLabels: WorkflowCanvasLabels = {
  previousNode: "Previous node",
  nextNode: "Next node",
  focusPreviousNode: "Focus previous node",
  focusNextNode: "Focus next node",
  moveViewport: "Move canvas viewport",
  focusNode: "Focus {node} node",
};

export function WorkflowCanvas({
  label,
  nodes,
  edges,
  shell,
  labels = defaultCanvasLabels,
  occludedLeft = 0,
}: WorkflowCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{
    pointerX: number;
    pointerY: number;
    panX: number;
    panY: number;
  } | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 1, height: 1 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodeHeights, setNodeHeights] = useState<CanvasNodeHeights>({});
  const contentSize = useMemo(
    () => getCanvasContentSize(nodes, nodeHeights),
    [nodes, nodeHeights],
  );
  const boundedPan = clampPan(pan, canvasSize, occludedLeft, contentSize);
  const nodeAnimationOrder = getCanvasRenderOrder(nodes);
  const orderedNodes = getCanvasOrderedNodes(nodes);
  const edgeAnimationBaseDelay =
    nodes.length * NODE_REVEAL_STEP_MS + EDGE_REVEAL_OFFSET_MS;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isEditableTarget(event.target)) {
        event.preventDefault();
        setIsSpacePressed(true);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setIsSpacePressed(false);
        setIsPanning(false);
        dragStartRef.current = null;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleNodeResize = useCallback((nodeId: string, height: number) => {
    setNodeHeights((current) =>
      current[nodeId] === height ? current : { ...current, [nodeId]: height },
    );
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setCanvasSize({
        width: Math.max(1, entry.contentRect.width),
        height: Math.max(1, entry.contentRect.height),
      });
    });

    observer.observe(canvasRef.current);

    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!isSpacePressed) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      panX: boundedPan.x,
      panY: boundedPan.y,
    };
    setIsPanning(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) {
      return;
    }

    event.preventDefault();
    const nextPan = clampPan(
      {
        x: dragStartRef.current.panX + event.clientX - dragStartRef.current.pointerX,
        y: dragStartRef.current.panY + event.clientY - dragStartRef.current.pointerY,
      },
      canvasSize,
      occludedLeft,
      contentSize,
    );

    setPan(nextPan);
    setSelectedNodeId(
      getViewportFocusedNodeId(nodes, nextPan, canvasSize, occludedLeft, nodeHeights),
    );
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStartRef.current = null;
    setIsPanning(false);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPan((current) => {
      const nextPan = clampPan(
        {
          x: current.x - event.deltaX,
          y: current.y - event.deltaY,
        },
        canvasSize,
        occludedLeft,
        contentSize,
      );

      setSelectedNodeId(
        getViewportFocusedNodeId(nodes, nextPan, canvasSize, occludedLeft, nodeHeights),
      );

      return nextPan;
    });
  };
  const handleMiniMapNavigate = (point: CanvasPoint) => {
    const effectiveLeft = Math.min(occludedLeft, canvasSize.width);
    const effectiveWidth = Math.max(1, canvasSize.width - effectiveLeft);
    const nextPan = {
      x: effectiveLeft - point.x * contentSize.width + effectiveWidth / 2,
      y: -point.y * contentSize.height + canvasSize.height / 2,
    };

    const boundedNextPan = clampPan(nextPan, canvasSize, occludedLeft, contentSize);

    setPan(boundedNextPan);
    setSelectedNodeId(
      getViewportFocusedNodeId(
        nodes,
        boundedNextPan,
        canvasSize,
        occludedLeft,
        nodeHeights,
      ),
    );
  };
  const handleNodeFocus = (node: CanvasNode) => {
    if (isSpacePressed || isPanning) {
      return;
    }

    const nodeBox = getNodeBox(node, nodeHeights);
    const nodeCenter = {
      x: nodeBox.x + nodeBox.width / 2,
      y: nodeBox.y + nodeBox.height / 2,
    };
    const nextPan = {
      x: canvasSize.width / 2 - nodeCenter.x,
      y: canvasSize.height / 2 - nodeCenter.y,
    };

    setSelectedNodeId(node.id);
    setPan(clampPan(nextPan, canvasSize, occludedLeft, contentSize));
  };
  const handleStepFocus = (direction: "previous" | "next") => {
    const currentNodeId =
      selectedNodeId ??
      getViewportFocusedNodeId(
        nodes,
        boundedPan,
        canvasSize,
        occludedLeft,
        nodeHeights,
      ) ??
      orderedNodes[0]?.id;
    const currentIndex = orderedNodes.findIndex((node) => node.id === currentNodeId);
    const fallbackIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex =
      direction === "previous"
        ? Math.max(0, fallbackIndex - 1)
        : Math.min(orderedNodes.length - 1, fallbackIndex + 1);
    const nextNode = orderedNodes[nextIndex];

    if (nextNode) {
      handleNodeFocus(nextNode);
    }
  };

  return (
    <div
      ref={canvasRef}
      id="profile-canvas"
      aria-label={label}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onWheel={handleWheel}
      className={[
        `workflow-canvas relative overflow-hidden border-0 ${shell.border} ${shell.editor}`,
        isSpacePressed || isPanning ? "cursor-grab active:cursor-grabbing" : "",
      ].join(" ")}
      style={{
        backgroundPosition: `${boundedPan.x}px ${boundedPan.y}px`,
      }}
    >
      <div
        className={[
          "absolute left-0 top-0",
          isPanning
            ? ""
            : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        ].join(" ")}
        style={{
          width: contentSize.width,
          height: contentSize.height,
          transform: `translate3d(${boundedPan.x}px, ${boundedPan.y}px, 0)`,
        }}
      >
        <CanvasEdges
          edges={edges}
          nodes={nodes}
          nodeHeights={nodeHeights}
          canvasSize={contentSize}
          animationBaseDelay={edgeAnimationBaseDelay}
        />

        <div className="relative z-10 h-full w-full space-y-4 p-4 md:block md:space-y-0 md:p-0">
          {nodes.map((node) => (
            <MarkdownNode
              key={node.id}
              node={node}
              shell={shell}
              animationOrder={nodeAnimationOrder.get(node.id)}
              selected={selectedNodeId === node.id}
              onFocus={() => handleNodeFocus(node)}
              onResize={handleNodeResize}
              labels={labels}
            />
          ))}
        </div>
      </div>

      <CanvasMiniMap
        nodes={nodes}
        nodeHeights={nodeHeights}
        pan={boundedPan}
        viewportSize={canvasSize}
        canvasSize={contentSize}
        occludedLeft={occludedLeft}
        onNavigate={handleMiniMapNavigate}
        labels={labels}
      />
      <CanvasStepControls
        currentIndex={Math.max(
          0,
          orderedNodes.findIndex((node) => node.id === selectedNodeId),
        )}
        total={orderedNodes.length}
        onPrevious={() => handleStepFocus("previous")}
        onNext={() => handleStepFocus("next")}
        labels={labels}
      />
    </div>
  );
}

type CanvasStepControlsProps = {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  labels: WorkflowCanvasLabels;
};

function CanvasStepControls({
  currentIndex,
  total,
  onPrevious,
  onNext,
  labels,
}: CanvasStepControlsProps) {
  const isPreviousDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= total - 1;
  const buttonClass =
    "flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full transition";
  const enabledClass = "text-zinc-600 hover:bg-teal-50 hover:text-teal-900";
  const disabledClass = "cursor-default text-zinc-300 hover:bg-zinc-50";

  return (
    <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-teal-200 bg-white/90 px-2 py-1.5 shadow-md shadow-teal-900/10 backdrop-blur">
      <Tooltip content={labels.previousNode} placement="top">
        <button
          type="button"
          aria-label={labels.focusPreviousNode}
          aria-disabled={isPreviousDisabled}
          onClick={() => {
            if (!isPreviousDisabled) {
              onPrevious();
            }
          }}
          className={`${buttonClass} ${isPreviousDisabled ? disabledClass : enabledClass}`}
        >
          <span aria-hidden="true">←</span>
        </button>
      </Tooltip>
      <span className="min-w-12 text-center text-xs font-medium text-zinc-500">
        {currentIndex + 1}/{total}
      </span>
      <Tooltip content={labels.nextNode} placement="top">
        <button
          type="button"
          aria-label={labels.focusNextNode}
          aria-disabled={isNextDisabled}
          onClick={() => {
            if (!isNextDisabled) {
              onNext();
            }
          }}
          className={`${buttonClass} ${isNextDisabled ? disabledClass : enabledClass}`}
        >
          <span aria-hidden="true">→</span>
        </button>
      </Tooltip>
    </div>
  );
}

type CanvasMiniMapProps = {
  nodes: CanvasNode[];
  nodeHeights: CanvasNodeHeights;
  pan: CanvasPoint;
  viewportSize: {
    width: number;
    height: number;
  };
  canvasSize: {
    width: number;
    height: number;
  };
  occludedLeft: number;
  onNavigate: (point: CanvasPoint) => void;
  labels: WorkflowCanvasLabels;
};

function CanvasMiniMap({
  nodes,
  nodeHeights,
  pan,
  viewportSize,
  canvasSize,
  occludedLeft,
  onNavigate,
  labels,
}: CanvasMiniMapProps) {
  const miniMapRef = useRef<HTMLDivElement>(null);
  const effectiveLeft = Math.min(occludedLeft, viewportSize.width);
  const effectiveWidth = Math.max(1, viewportSize.width - effectiveLeft);
  const viewportWidth = clamp((effectiveWidth / canvasSize.width) * 100, 8, 100);
  const viewportHeight = clamp((viewportSize.height / canvasSize.height) * 100, 8, 100);
  const viewport = {
    x: clamp(
      ((-pan.x + effectiveLeft) / canvasSize.width) * 100,
      0,
      100 - viewportWidth,
    ),
    y: clamp((-pan.y / canvasSize.height) * 100, 0, 100 - viewportHeight),
    width: viewportWidth,
    height: viewportHeight,
  };

  const navigate = (clientX: number, clientY: number) => {
    if (!miniMapRef.current) {
      return;
    }

    const rect = miniMapRef.current.getBoundingClientRect();
    onNavigate({
      x: clamp((clientX - rect.left) / rect.width, 0, 1),
      y: clamp((clientY - rect.top) / rect.height, 0, 1),
    });
  };

  return (
    <div
      ref={miniMapRef}
      role="button"
      tabIndex={0}
      aria-label={labels.moveViewport}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        navigate(event.clientX, event.clientY);
      }}
      onPointerMove={(event) => {
        if (event.buttons === 1) {
          navigate(event.clientX, event.clientY);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onNavigate({ x: 0.5, y: 0.5 });
        }
      }}
      className="absolute bottom-4 right-4 z-20 h-28 w-40 cursor-pointer rounded-md border border-teal-200 bg-white/90 p-2 shadow-md shadow-teal-900/10 backdrop-blur transition hover:border-teal-300"
    >
      <svg
        aria-hidden="true"
        className="h-full w-full text-teal-700"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          rx="3"
          className="fill-zinc-50 stroke-zinc-200"
          vectorEffect="non-scaling-stroke"
        />
        {nodes.map((node) => {
          const box = getNodeBox(node, nodeHeights);

          return (
            <rect
              key={node.id}
              x={(box.x / canvasSize.width) * 100}
              y={(box.y / canvasSize.height) * 100}
              width={(box.width / canvasSize.width) * 100}
              height={(box.height / canvasSize.height) * 100}
              rx="2"
              className={
                node.kind === "mention"
                  ? "fill-teal-100 stroke-teal-400"
                  : "fill-white stroke-zinc-300"
              }
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        <rect
          x={viewport.x}
          y={viewport.y}
          width={viewport.width}
          height={viewport.height}
          rx="2"
          className="fill-teal-500/15 stroke-teal-800"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

type CanvasEdgesProps = {
  edges: CanvasEdge[];
  nodes: CanvasNode[];
  nodeHeights: CanvasNodeHeights;
  canvasSize: CanvasSize;
  animationBaseDelay: number;
};

function CanvasEdges({
  edges,
  nodes,
  nodeHeights,
  canvasSize,
  animationBaseDelay,
}: CanvasEdgesProps) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full text-teal-700 md:block"
      viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
    >
      <defs>
        <marker
          id="canvas-arrow"
          markerHeight="10"
          markerUnits="userSpaceOnUse"
          markerWidth="10"
          orient="auto"
          refX="9"
          refY="5"
        >
          <path d="M0,0 L10,5 L0,10 Z" className="fill-current" />
        </marker>
      </defs>
      {edges.map((edge, index) => {
        const fromNode = nodes.find((node) => node.id === edge.from.nodeId);
        const toNode = nodes.find((node) => node.id === edge.to.nodeId);

        if (!fromNode || !toNode) {
          return null;
        }

        const path = getEdgePath(
          fromNode,
          edge.from.side,
          toNode,
          edge.to.side,
          nodeHeights,
        );

        return (
          <path
            key={edge.id}
            d={path}
            className={[
              "workflow-edge fill-none",
              edge.directed ? "workflow-edge-directed" : "workflow-edge-undirected",
            ].join(" ")}
            markerEnd={edge.directed ? "url(#canvas-arrow)" : undefined}
            stroke="currentColor"
            pathLength={1}
            strokeLinecap="round"
            strokeWidth="2"
            style={{
              animationDelay: `${animationBaseDelay + index * EDGE_REVEAL_STEP_MS}ms`,
            }}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

function getEdgePath(
  fromNode: CanvasNode,
  fromSide: CanvasNodeSide,
  toNode: CanvasNode,
  toSide: CanvasNodeSide,
  nodeHeights: CanvasNodeHeights,
) {
  const fromBox = getNodeBox(fromNode, nodeHeights);
  const toBox = getNodeBox(toNode, nodeHeights);
  const start = getNodeAnchor(fromBox, fromSide);
  const end = getNodeAnchor(toBox, toSide);
  const controlDistance = Math.max(
    80,
    Math.hypot(end.x - start.x, end.y - start.y) * 0.35,
  );
  const fromDirection = getSideDirection(fromSide);
  const toDirection = getSideDirection(toSide);
  const firstControl = {
    x: start.x + fromDirection.x * controlDistance,
    y: start.y + fromDirection.y * controlDistance,
  };
  const secondControl = {
    x: end.x + toDirection.x * controlDistance,
    y: end.y + toDirection.y * controlDistance,
  };

  return [
    `M ${start.x} ${start.y}`,
    `C ${firstControl.x} ${firstControl.y}, ${secondControl.x} ${secondControl.y}, ${end.x} ${end.y}`,
  ].join(" ");
}

function getNodeAnchor(
  box: ReturnType<typeof getNodeBox>,
  side: CanvasNodeSide,
): CanvasPoint {
  const centerX = box.x + box.width / 2;
  const centerY = box.y + box.height / 2;

  return {
    top: { x: centerX, y: box.y },
    right: { x: box.x + box.width, y: centerY },
    bottom: { x: centerX, y: box.y + box.height },
    left: { x: box.x, y: centerY },
  }[side];
}

function getSideDirection(side: CanvasNodeSide): CanvasPoint {
  return {
    top: { x: 0, y: -1 },
    right: { x: 1, y: 0 },
    bottom: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
  }[side];
}

function getNodeBox(node: CanvasNode, nodeHeights: CanvasNodeHeights = {}) {
  return {
    x: (node.x / 100) * BASE_CANVAS_SIZE.width,
    y: (node.y / 100) * BASE_CANVAS_SIZE.height,
    width: (node.width / 100) * BASE_CANVAS_SIZE.width,
    height: nodeHeights[node.id] ?? getNodeHeight(node),
  };
}

function getCanvasContentSize(
  nodes: CanvasNode[],
  nodeHeights: CanvasNodeHeights,
): CanvasSize {
  return nodes.reduce<CanvasSize>((size, node) => {
    const box = getNodeBox(node, nodeHeights);

    return {
      width: Math.max(
        size.width,
        Math.ceil(box.x + box.width + CANVAS_EXPANSION_PADDING),
      ),
      height: Math.max(
        size.height,
        Math.ceil(box.y + box.height + CANVAS_EXPANSION_PADDING),
      ),
    };
  }, BASE_CANVAS_SIZE);
}

function getNodeHeight(node: CanvasNode) {
  if (node.kind === "code") {
    return 250;
  }

  if (node.kind === "mermaid") {
    return 230;
  }

  if (node.kind === "mention") {
    return 180;
  }

  return node.id === "intro" ? 230 : 185;
}

type MarkdownNodeProps = {
  node: CanvasNode;
  shell: CanvasShell;
  animationOrder?: number;
  selected: boolean;
  onFocus: () => void;
  onResize: (nodeId: string, height: number) => void;
  labels: WorkflowCanvasLabels;
};

function MarkdownNode({
  node,
  shell,
  animationOrder,
  selected,
  onFocus,
  onResize,
  labels,
}: MarkdownNodeProps) {
  const nodeRef = useRef<HTMLElement>(null);
  const variant = {
    note: "border-t-4 border-t-teal-500 bg-white",
    code: "border-t-4 border-t-zinc-700 bg-zinc-950 text-zinc-100",
    mermaid: "border-t-4 border-t-sky-500 bg-sky-50/70",
    mention: "border-t-4 border-t-emerald-500 bg-emerald-50",
  }[node.kind];
  const appearance =
    node.appearance === "transparent"
      ? "border-transparent bg-transparent p-0 shadow-none backdrop-blur-0"
      : `rounded-md border border-zinc-200 p-4 shadow-md shadow-zinc-900/8 backdrop-blur ${variant}`;

  useEffect(() => {
    const element = nodeRef.current;

    if (!element) {
      return;
    }

    const reportHeight = () => onResize(node.id, element.offsetHeight);
    const observer = new ResizeObserver(reportHeight);

    reportHeight();
    observer.observe(element);

    return () => observer.disconnect();
  }, [node.id, onResize]);

  return (
    <article
      ref={nodeRef}
      role="button"
      tabIndex={0}
      aria-label={labels.focusNode.replace("{node}", node.id)}
      data-appearance={node.appearance ?? "default"}
      data-selected={selected}
      onClick={onFocus}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onFocus();
        }
      }}
      className={`workflow-node ${appearance}`}
      style={
        {
          left: (node.x / 100) * BASE_CANVAS_SIZE.width,
          top: (node.y / 100) * BASE_CANVAS_SIZE.height,
          width: (node.width / 100) * BASE_CANVAS_SIZE.width,
          animationDelay:
            animationOrder === undefined
              ? undefined
              : `${animationOrder * NODE_REVEAL_STEP_MS}ms`,
        } as CSSProperties
      }
    >
      <div className={node.icon ? "flex items-start gap-3" : undefined}>
        {node.icon ? (
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-teal-100 bg-white">
            <Image
              src={node.icon.src}
              alt={node.icon.alt}
              width={28}
              height={28}
              unoptimized
              className="h-7 w-7"
            />
          </div>
        ) : null}
        <MarkdownBody
          markdown={node.markdown}
          kind={node.kind}
          shell={shell}
          appearance={node.appearance ?? "default"}
        />
      </div>
    </article>
  );
}

type MarkdownBodyProps = {
  markdown: string;
  kind: CanvasNodeKind;
  shell: CanvasShell;
  appearance: NonNullable<CanvasNode["appearance"]>;
};

function MarkdownBody({ markdown, kind, shell, appearance }: MarkdownBodyProps) {
  const blocks = parseMarkdown(markdown);

  return (
    <div
      className={
        appearance === "transparent"
          ? "space-y-2 text-base leading-7"
          : "space-y-3 text-sm leading-6"
      }
    >
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Heading = block.level === 1 ? "h2" : "h3";

          return (
            <Heading
              key={`${block.raw}-${index}`}
              className={`font-semibold tracking-tight ${getHeadingSize(block.level, appearance)} ${
                kind === "code" ? "text-white" : shell.strong
              }`}
            >
              {renderInline(block.text, shell, kind)}
            </Heading>
          );
        }

        if (block.type === "list") {
          if (
            block.items.some(
              (item) =>
                item.startsWith(":school:") ||
                item.startsWith(":company:") ||
                item.startsWith(":stack:"),
            )
          ) {
            return (
              <ul key={`${block.raw}-${index}`} className="space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex min-h-6 items-center gap-2">
                    {renderInline(item, shell, kind)}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.items.every((item) => item.startsWith("`"))) {
            return (
              <ul key={`${block.raw}-${index}`} className="flex flex-wrap gap-2">
                {block.items.map((item) => (
                  <li key={item}>{renderInline(item, shell, kind)}</li>
                ))}
              </ul>
            );
          }

          return (
            <ul key={`${block.raw}-${index}`} className="space-y-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${shell.accentBg}`}
                  />
                  <span>{renderInline(item, shell, kind)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "code") {
          if (block.language === "profile") {
            const [initials = "", caption = "", meta = ""] = block.text
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean);

            return (
              <div
                key={`${block.raw}-${index}`}
                className="flex items-center gap-4 rounded-md border border-teal-100 bg-teal-50/70 p-4"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-teal-200 bg-white font-mono text-xl font-semibold text-teal-800">
                  {initials}
                </div>
                <div>
                  <p className={`text-sm font-medium ${shell.strong}`}>{caption}</p>
                  <p className={`mt-1 text-xs ${shell.muted}`}>{meta}</p>
                </div>
              </div>
            );
          }

          return (
            <pre
              key={`${block.raw}-${index}`}
              className={`overflow-x-auto rounded-md border p-3 font-mono text-xs leading-5 ${
                block.language === "mermaid"
                  ? `${shell.border} ${shell.panel} ${shell.muted}`
                  : "border-zinc-800 bg-zinc-950 text-zinc-100"
              }`}
            >
              <code>
                {block.language ? (
                  <span className={shell.accent}>
                    {block.language}
                    {"\n"}
                  </span>
                ) : null}
                {block.text}
              </code>
            </pre>
          );
        }

        return (
          <p
            key={`${block.raw}-${index}`}
            className={kind === "code" ? "text-zinc-300" : shell.muted}
          >
            {renderInline(block.text, shell, kind)}
          </p>
        );
      })}
    </div>
  );
}

type MarkdownBlock =
  | {
      type: "heading";
      level: 1 | 2 | 3;
      text: string;
      raw: string;
    }
  | {
      type: "paragraph";
      text: string;
      raw: string;
    }
  | {
      type: "list";
      items: string[];
      raw: string;
    }
  | {
      type: "code";
      language: string;
      text: string;
      raw: string;
    };

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.trim().split("\n");
  const blocks: MarkdownBlock[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let codeLanguage = "";
  let inCode = false;

  const flushList = () => {
    if (list.length > 0) {
      blocks.push({ type: "list", items: list, raw: list.join("\n") });
      list = [];
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("```")) {
      if (inCode) {
        blocks.push({
          type: "code",
          language: codeLanguage,
          text: code.join("\n"),
          raw: code.join("\n"),
        });
        code = [];
        codeLanguage = "";
        inCode = false;
        return;
      }

      flushList();
      codeLanguage = line.replace("```", "").trim();
      inCode = true;
      return;
    }

    if (inCode) {
      code.push(line);
      return;
    }

    if (line.startsWith("- ")) {
      list.push(line.replace("- ", ""));
      return;
    }

    flushList();

    if (line.startsWith("# ")) {
      blocks.push({
        type: "heading",
        level: 1,
        text: line.replace("# ", ""),
        raw: line,
      });
      return;
    }

    if (line.startsWith("### ")) {
      blocks.push({
        type: "heading",
        level: 3,
        text: line.replace("### ", ""),
        raw: line,
      });
      return;
    }

    if (line.startsWith("## ")) {
      blocks.push({
        type: "heading",
        level: 2,
        text: line.replace("## ", ""),
        raw: line,
      });
      return;
    }

    if (line.trim()) {
      blocks.push({ type: "paragraph", text: line, raw: line });
    }
  });

  flushList();

  return blocks;
}

function getHeadingSize(
  level: 1 | 2 | 3,
  appearance: NonNullable<CanvasNode["appearance"]>,
) {
  if (level === 1) {
    return appearance === "transparent"
      ? "text-4xl leading-tight md:text-5xl"
      : "text-xl";
  }

  if (level === 2) {
    return "text-base";
  }

  return appearance === "transparent" ? "text-2xl leading-9 md:text-3xl" : "text-sm";
}

function renderInline(
  text: string,
  shell: CanvasShell,
  kind: CanvasNodeKind,
): ReactNode {
  const parts = text
    .split(/(\*\*[^*]+\*\*|`[^`]+`|@\w[\w-]*|:(?:school|company|stack):)/g)
    .filter(Boolean);

  return parts.map((part, index) => {
    if (part === ":school:" || part === ":company:" || part === ":stack:") {
      const Icon =
        part === ":school:" ? GraduationCap : part === ":company:" ? Building2 : Code2;

      return (
        <Icon
          key={`${part}-${index}`}
          aria-hidden="true"
          size={15}
          className={`mr-1.5 inline-block align-[-2px] ${shell.accent}`}
        />
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className={`rounded px-1.5 py-0.5 font-mono text-xs ${
            kind === "code"
              ? "bg-white/10 text-white"
              : `${shell.accentBg} ${shell.accent}`
          }`}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("@")) {
      return (
        <span
          key={`${part}-${index}`}
          className={`mr-1 inline-flex rounded px-1.5 py-0.5 font-mono text-xs ${shell.accentBg} ${shell.accent}`}
        >
          {part}
        </span>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function clampPan(
  pan: CanvasPoint,
  viewportSize: CanvasSize,
  occludedLeft: number,
  contentSize: CanvasSize,
) {
  const effectiveLeft = Math.min(occludedLeft, viewportSize.width);
  const minX = Math.min(0, viewportSize.width - contentSize.width);
  const maxX = effectiveLeft;
  const minY = Math.min(0, viewportSize.height - contentSize.height);
  const maxY = 0;

  return {
    x: clamp(pan.x, minX, maxX),
    y: clamp(pan.y, minY, maxY),
  };
}

function getCanvasRenderOrder(nodes: CanvasNode[]) {
  return new Map(getCanvasOrderedNodes(nodes).map((node, index) => [node.id, index]));
}

function getCanvasOrderedNodes(nodes: CanvasNode[]) {
  const sequenceNodes = nodes.filter((node) => !node.excludeFromSequence);
  const automaticOrder = new Map(
    [...sequenceNodes]
      .sort(compareByCanvasPosition)
      .map((node, index) => [node.id, index + 1]),
  );

  return [...sequenceNodes].sort((a, b) => {
    const sequenceOrder =
      (a.order ?? automaticOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
      (b.order ?? automaticOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER);

    if (sequenceOrder !== 0) {
      return sequenceOrder;
    }

    if (a.order !== undefined && b.order === undefined) {
      return -1;
    }

    if (a.order === undefined && b.order !== undefined) {
      return 1;
    }

    return compareByCanvasPosition(a, b);
  });
}

function compareByCanvasPosition(a: CanvasNode, b: CanvasNode) {
  const diagonalOrder = a.x + a.y - (b.x + b.y);

  return diagonalOrder || a.y - b.y || a.x - b.x;
}

function getViewportFocusedNodeId(
  nodes: CanvasNode[],
  pan: CanvasPoint,
  viewportSize: { width: number; height: number },
  occludedLeft: number,
  nodeHeights: CanvasNodeHeights,
) {
  const effectiveLeft = Math.min(occludedLeft, viewportSize.width);
  const effectiveWidth = Math.max(1, viewportSize.width - effectiveLeft);
  const viewportCenter = {
    x: -pan.x + effectiveLeft + effectiveWidth / 2,
    y: -pan.y + viewportSize.height / 2,
  };

  return [...nodes]
    .map((node) => {
      const box = getNodeBox(node, nodeHeights);
      const center = {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2,
      };

      return {
        id: node.id,
        distance: Math.hypot(center.x - viewportCenter.x, center.y - viewportCenter.y),
      };
    })
    .sort((a, b) => a.distance - b.distance)[0]?.id;
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest("input, textarea, select, button, a, [contenteditable='true']"),
  );
}
