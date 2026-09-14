import type { Metadata } from "next";
import { PortfolioDocument } from "@/components/pages/pdf/portfolio-document";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "최혁 | Portfolio Slides" };

export default function SlidesPage() {
  return <PortfolioDocument dictionary={getDictionary()} canvasMode />;
}
