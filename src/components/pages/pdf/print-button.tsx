"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center rounded-md border border-teal-200 bg-white/90 px-3 text-sm font-medium text-zinc-700 shadow-md shadow-teal-900/10 backdrop-blur transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-800"
      onClick={() => window.print()}
    >
      {label}
    </button>
  );
}
