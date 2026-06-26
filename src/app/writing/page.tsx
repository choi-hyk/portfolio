import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function WritingPage() {
  const dictionary = getDictionary(defaultLocale);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-12 sm:px-8 lg:px-10">
      <SectionHeading
        eyebrow={dictionary.writingPage.eyebrow}
        title={dictionary.writingPage.title}
        description={dictionary.writingPage.description}
      />
      <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
        {dictionary.writings.map((writing) => (
          <a
            key={writing.title}
            href={writing.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-start justify-between gap-6 py-5"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
                {writing.category}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-zinc-950">
                {writing.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {writing.description}
              </p>
            </div>
            <ArrowUpRight className="mt-1 shrink-0 text-zinc-500" size={18} />
          </a>
        ))}
      </div>
    </main>
  );
}
