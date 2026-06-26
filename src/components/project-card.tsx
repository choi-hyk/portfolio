import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">
            {project.type}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950">{project.title}</h2>
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} repository`}
          className="rounded-md border border-zinc-200 p-2 text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950"
        >
          <ArrowUpRight size={18} />
        </a>
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-600">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
