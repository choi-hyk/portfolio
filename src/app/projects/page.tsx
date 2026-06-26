import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function ProjectsPage() {
  const dictionary = getDictionary(defaultLocale);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
      <SectionHeading
        eyebrow={dictionary.projectsPage.eyebrow}
        title={dictionary.projectsPage.title}
        description={dictionary.projectsPage.description}
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {dictionary.projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
