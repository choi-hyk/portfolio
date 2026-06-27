import { notFound } from "next/navigation";
import { ExperienceDetailCanvas } from "@/components/portfolio-detail-canvas";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDictionary(defaultLocale).experience.items.map((experience) => ({
    slug: experience.slug,
  }));
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = getDictionary(defaultLocale).experience.items.find(
    (item) => item.slug === slug,
  );

  if (!experience) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-zinc-700">
      <ExperienceDetailCanvas experience={experience} />
    </main>
  );
}
