import { useId } from "react";
import type { PdfArchitectureContent } from "@/i18n/pdf-architecture-content";
import {
  pdfArchitectureDefinitions,
  type PdfArchitectureEdge,
  type PdfArchitectureNode,
} from "./architecture-definition";

type Point = { x: number; y: number };
function endpoint(
  node: Pick<PdfArchitectureNode, "x" | "y" | "width" | "height">,
  side: PdfArchitectureEdge["fromSide"],
): Point {
  return {
    x: node.x + (side === "left" ? 0 : side === "right" ? node.width : node.width / 2),
    y:
      node.y + (side === "top" ? 0 : side === "bottom" ? node.height : node.height / 2),
  };
}
function edgePath(from: Point, to: Point, vertical: boolean) {
  if (from.x === to.x || from.y === to.y) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }
  if (vertical) {
    const middle = (from.y + to.y) / 2;
    return `M ${from.x} ${from.y} V ${middle} H ${to.x} V ${to.y}`;
  }
  const middle = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} H ${middle} V ${to.y} H ${to.x}`;
}

export function PdfArchitecture({
  slug,
  title,
  content,
}: {
  slug: string;
  title: string;
  content: PdfArchitectureContent;
}) {
  const id = useId().replace(/:/g, "");
  const definition = pdfArchitectureDefinitions[slug];
  if (!definition) return null;
  const nodesById = new Map(definition.nodes.map((node) => [node.id, node]));
  const groups = definition.groups.map((group) => {
    const members = group.members.map((member) => nodesById.get(member)!);
    const x = Math.min(...members.map((node) => node.x)) - 10;
    const y = Math.min(...members.map((node) => node.y)) - 36;
    const width = Math.max(...members.map((node) => node.x + node.width)) - x + 10;
    const height = Math.max(...members.map((node) => node.y + node.height)) - y + 12;
    return { ...group, x, y, width, height };
  });
  const groupsById = new Map(groups.map((group) => [group.id, group]));

  return (
    <section className="pdf-architecture" aria-label={title}>
      <svg
        className="pdf-architecture-diagram"
        viewBox="0 0 1100 416"
        role="img"
        aria-labelledby={`${id}-title ${id}-description`}
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-description`}>
          {content.notes.map((note) => `${note.title}: ${note.body}`).join(" ")}
        </desc>
        <defs>
          <marker
            id={`${id}-arrow`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 1 1 L 9 5 L 1 9 Z" fill="#27272a" />
          </marker>
        </defs>
        {groups.map((group) => {
          const { x, y, width, height } = group;
          return (
            <g key={group.id} role="group" aria-label={content.groups[group.id]}>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx="12"
                fill="#fafafa"
                stroke="#a1a1aa"
                strokeWidth="1"
              />
              {group.icon && (
                <image
                  href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${group.icon}`}
                  x={x + 12}
                  y={y + 6}
                  width="24"
                  height="24"
                  className="pdf-architecture-group-icon"
                />
              )}
              <text
                x={x + (group.icon ? 44 : 12)}
                y={y + 23}
                className="pdf-architecture-group-title"
              >
                {content.groups[group.id]}
              </text>
            </g>
          );
        })}
        {definition.edges.map((edge) => {
          const from = (nodesById.get(edge.from) ?? groupsById.get(edge.from))!;
          const to = (nodesById.get(edge.to) ?? groupsById.get(edge.to))!;
          return (
            <path
              key={`${edge.from}-${edge.to}`}
              d={edgePath(
                endpoint(from, edge.fromSide),
                endpoint(to, edge.toSide),
                edge.fromSide === "top" || edge.fromSide === "bottom",
              )}
              fill="none"
              stroke="#27272a"
              strokeWidth="2"
              strokeLinejoin="round"
              markerEnd={`url(#${id}-arrow)`}
            />
          );
        })}
        {definition.nodes.map((node) => {
          const copy = content.nodes[node.id];
          return (
            <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
              <rect
                width={node.width}
                height={node.height}
                rx="10"
                fill="#fff"
                stroke="#27272a"
                strokeWidth="1.5"
              />
              <image
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${node.icon}`}
                x="16"
                y="14"
                width="44"
                height="44"
                className="pdf-architecture-icon"
              />
              <text x="72" y="43" className="pdf-architecture-node-title">
                {copy.title}
              </text>
              {copy.lines.map((line, index) => (
                <text
                  key={line}
                  x="16"
                  y={88 + index * 24}
                  className="pdf-architecture-node-detail"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <div className="pdf-architecture-notes">
        {content.notes.map((note) => (
          <section key={note.title}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
          </section>
        ))}
      </div>
    </section>
  );
}
