import type { ReactNode } from "react";
import { PortfolioShell } from "@/components/portfolio-shell";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type PortfolioPageShellProps = {
  children: ReactNode;
};

export function PortfolioPageShell({ children }: PortfolioPageShellProps) {
  const dictionary = getDictionary(defaultLocale);

  return (
    <PortfolioShell
      navigation={dictionary.nav}
      profile={dictionary.profile}
      linkLabels={dictionary.home}
      projects={dictionary.projects}
    >
      {children}
    </PortfolioShell>
  );
}
