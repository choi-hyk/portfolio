import { CanvasLanding } from "@/components/canvas-landing";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Home() {
  const dictionary = getDictionary(defaultLocale);

  return (
    <main className="min-h-screen bg-white text-zinc-700">
      <CanvasLanding profile={dictionary.profile} home={dictionary.home} />
    </main>
  );
}
