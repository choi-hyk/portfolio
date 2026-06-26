type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-zinc-600">{description}</p>
      ) : null}
    </div>
  );
}
