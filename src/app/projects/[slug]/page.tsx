import { notFound } from "next/navigation";
import { ProjectDetailCanvas } from "@/components/portfolio-detail-canvas";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDictionary(defaultLocale).projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getDictionary(defaultLocale).projects.find(
    (item) => item.slug === slug,
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-zinc-700">
      <ProjectDetailCanvas project={project} />
    </main>
  );
}
