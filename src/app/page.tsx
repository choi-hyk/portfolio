import { ArrowUpRight, Code2, Mail, NotebookText } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Home() {
  const dictionary = getDictionary(defaultLocale);
  const { profile } = dictionary;
  const featuredProjects = dictionary.projects.filter((project) => project.featured);

  return (
    <main className="min-h-screen">
      <section className="border-b border-zinc-200 bg-zinc-950 text-zinc-50">
        <div className="mx-auto flex min-h-[74vh] max-w-6xl flex-col justify-between px-5 py-8 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between text-sm text-zinc-300">
            <span className="font-medium text-zinc-50">{profile.name}</span>
            <div className="flex items-center gap-4">
              <Link href="/projects" className="hover:text-white">
                {dictionary.nav.projects}
              </Link>
              <Link href="/writing" className="hover:text-white">
                {dictionary.nav.writing}
              </Link>
            </div>
          </nav>

          <div className="max-w-4xl py-16">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-amber-300">
              {dictionary.home.eyebrow}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {dictionary.home.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-4 text-sm font-medium text-zinc-950 transition hover:bg-amber-200"
              >
                <Code2 size={18} />
                {dictionary.home.github}
              </a>
              <a
                href={profile.links.velog}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-zinc-700 px-4 text-sm font-medium text-zinc-50 transition hover:border-zinc-400"
              >
                <NotebookText size={18} />
                {dictionary.home.velog}
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-md border border-zinc-700 px-4 text-sm font-medium text-zinc-50 transition hover:border-zinc-400"
              >
                <Mail size={18} />
                {dictionary.home.email}
              </a>
            </div>
          </div>

          <div className="grid gap-4 border-t border-zinc-800 pt-6 text-sm text-zinc-300 sm:grid-cols-3">
            {dictionary.home.stats.map((stat) => (
              <p key={stat}>{stat}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow={dictionary.home.selectedProjects.eyebrow}
          title={dictionary.home.selectedProjects.title}
          description={dictionary.home.selectedProjects.description}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-950"
        >
          {dictionary.home.selectedProjects.cta}
          <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
