import { ExperienceOverviewCanvas } from "@/components/portfolio-detail-canvas";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function ExperiencePage() {
  const dictionary = getDictionary(defaultLocale);

  return (
    <main className="min-h-screen bg-white text-zinc-700">
      <ExperienceOverviewCanvas experiences={dictionary.experience.items} />
    </main>
  );
}
