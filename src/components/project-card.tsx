import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  variant?: "light" | "dark";
};

export function ProjectCard({ project, variant = "light" }: ProjectCardProps) {
  const isDark = variant === "dark";

  return (
    <article
      className={
        isDark
          ? "rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-teal-700/40 hover:bg-zinc-50"
          : "rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={
              isDark
                ? "text-xs font-semibold uppercase tracking-[0.16em] text-teal-700"
                : "text-xs font-semibold uppercase tracking-[0.16em] text-rose-700"
            }
          >
            {project.type}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950">
            <Link
              href={`/projects/${project.slug}`}
              className="transition hover:text-teal-800"
            >
              {project.title}
            </Link>
          </h2>
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} repository`}
          className={
            isDark
              ? "rounded-md border border-zinc-300 p-2 text-zinc-600 transition hover:border-teal-700 hover:text-teal-800"
              : "rounded-md border border-zinc-200 p-2 text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950"
          }
        >
          <ArrowUpRight size={18} />
        </a>
      </div>
      <p
        className={
          isDark
            ? "mt-4 text-sm leading-6 text-zinc-600"
            : "mt-4 text-sm leading-6 text-zinc-600"
        }
      >
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className={
              isDark
                ? "rounded-md bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-800"
                : "rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
