"use client";

import {
  ArrowUpRight,
  BookOpenText,
  Braces,
  BriefcaseBusiness,
  ChevronsLeft,
  Home,
  type LucideIcon,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { GithubIcon } from "@/components/icons/github-icon";
import { PortfolioViewportProvider } from "@/components/portfolio-viewport-context";
import { VelogIcon } from "@/components/icons/velog-icon";
import { Tooltip } from "@/components/tooltip";
import type { Dictionary } from "@/i18n/dictionaries";

type PortfolioShellProps = {
  children: ReactNode;
  navigation: Dictionary["nav"];
  profile: Dictionary["profile"];
  linkLabels: Pick<Dictionary["home"], "github" | "velog" | "email">;
  projects: Dictionary["projects"];
  experiences: Dictionary["experience"]["items"];
};

type SidebarChild = {
  id: string;
  label: string;
  href: string;
};

type SidebarSection = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  children?: SidebarChild[];
};

const sidebarProjectLimit = 3;

export function PortfolioShell({
  children,
  navigation,
  profile,
  linkLabels,
  projects,
  experiences,
}: PortfolioShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <PortfolioViewportProvider>
      <section className="relative min-h-screen bg-white text-zinc-700">
        <aside className="fixed bottom-3 left-3 top-3 z-30 hidden lg:block">
          <PortfolioSidebar
            collapsed={isSidebarCollapsed}
            navigation={navigation}
            profile={profile}
            linkLabels={linkLabels}
            projects={projects}
            experiences={experiences}
            onToggle={() => setIsSidebarCollapsed((value) => !value)}
          />
        </aside>
        <div className="min-w-0">{children}</div>
      </section>
    </PortfolioViewportProvider>
  );
}

type PortfolioSidebarProps = Omit<PortfolioShellProps, "children"> & {
  collapsed: boolean;
  onToggle: () => void;
};

function PortfolioSidebar({
  collapsed,
  navigation,
  profile,
  linkLabels,
  projects,
  experiences,
  onToggle,
}: PortfolioSidebarProps) {
  const pathname = usePathname();
  const experienceChildren = experiences.map((experience) => ({
    id: experience.slug,
    label: experience.company,
    href: `/experience/${experience.slug}`,
  }));
  const projectChildren = projects
    .filter((project) => project.featured)
    .slice(0, sidebarProjectLimit)
    .map((project) => ({
      id: project.slug,
      label: project.title,
      href: `/projects/${project.slug}`,
    }));
  const sections: SidebarSection[] = [
    {
      id: "overview",
      label: navigation.overview,
      href: "/",
      icon: Home,
    },
    {
      id: "experience",
      label: navigation.experience,
      href: "/experience",
      icon: BriefcaseBusiness,
      children: experienceChildren,
    },
    {
      id: "projects",
      label: navigation.projects,
      href: "/projects",
      icon: Braces,
      children: projectChildren,
    },
    {
      id: "writing",
      label: navigation.writing,
      href: "/writing",
      icon: BookOpenText,
    },
  ];
  const links = [
    {
      label: linkLabels.github,
      href: profile.links.github,
      icon: GithubIcon,
    },
    {
      label: linkLabels.velog,
      href: profile.links.velog,
      icon: VelogIcon,
    },
    {
      label: linkLabels.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
  ];
  const railItems = [...sections, ...links];
  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  const isSectionActive = (section: SidebarSection) =>
    isActive(section.href) ||
    Boolean(section.children?.some((child) => isActive(child.href)));

  return (
    <div
      className={[
        "relative h-full overflow-hidden border border-teal-200 bg-white shadow-md shadow-teal-900/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        collapsed ? "w-12 rounded-[1.75rem]" : "w-52 rounded-[1.75rem]",
      ].join(" ")}
    >
      <nav
        aria-label={navigation.collapsedLabel}
        className={[
          "absolute inset-0 flex h-full w-12 flex-col items-center gap-1 px-1.5 py-3 text-zinc-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          collapsed
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-2 opacity-0",
        ].join(" ")}
      >
        <Tooltip content={navigation.expandSidebar} placement="right" className="mb-3">
          <button
            type="button"
            aria-label={navigation.expandSidebar}
            onClick={onToggle}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-800 transition hover:bg-zinc-100"
          >
            <ChevronsLeft size={14} className="rotate-180" />
          </button>
        </Tooltip>
        {railItems.map((item) => {
          const Icon = item.icon;
          const isExternal = item.href.startsWith("http");
          const active =
            "id" in item &&
            typeof item.id === "string" &&
            sections.some(
              (section) => section.id === item.id && isSectionActive(section),
            );
          const RailLink = isExternal || item.href.startsWith("mailto:") ? "a" : Link;

          return (
            <Tooltip key={item.label} content={item.label} placement="right">
              <RailLink
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                aria-label={item.label}
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full transition",
                  active
                    ? "bg-teal-100 text-teal-900 ring-1 ring-teal-200"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950",
                ].join(" ")}
              >
                <Icon size={14} />
              </RailLink>
            </Tooltip>
          );
        })}
      </nav>

      <div
        className={[
          "absolute inset-0 flex h-full w-52 min-h-0 flex-col gap-4 p-3 pt-4 text-[13px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          collapsed
            ? "pointer-events-none translate-x-4 opacity-0"
            : "translate-x-0 scale-100 opacity-100",
        ].join(" ")}
      >
        <div className="px-2 pb-1 pr-9">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
            {navigation.portfolio}
          </p>
          <Tooltip
            content={navigation.collapseSidebar}
            placement="right"
            className="absolute right-3 top-3"
          >
            <button
              type="button"
              aria-label={navigation.collapseSidebar}
              onClick={onToggle}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-teal-200 bg-white text-zinc-500 transition hover:border-teal-300 hover:bg-teal-100 hover:text-teal-900"
            >
              <ChevronsLeft size={15} />
            </button>
          </Tooltip>
        </div>

        <nav
          aria-label={navigation.pagesLabel}
          className="min-h-0 space-y-1 overflow-y-auto"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            const active = isSectionActive(section);
            const hasChildren = Boolean(section.children?.length);

            return (
              <div key={section.id}>
                <Link
                  href={section.href}
                  className={[
                    "relative flex h-8 min-w-0 items-center gap-2 rounded-md px-2 transition",
                    active
                      ? "bg-teal-100 text-teal-950 ring-1 ring-teal-200 before:absolute before:left-0 before:top-1.5 before:h-5 before:w-0.5 before:rounded-full before:bg-teal-700"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
                  ].join(" ")}
                >
                  <Icon size={14} className="shrink-0" />
                  <span className="truncate font-medium">{section.label}</span>
                </Link>
                {hasChildren ? (
                  <div className="ml-5 mt-1 space-y-1 border-l border-zinc-200 pl-2">
                    {section.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        aria-current={isActive(child.href) ? "page" : undefined}
                        className={[
                          "flex min-h-7 items-center rounded-md px-2 py-1 text-xs transition",
                          isActive(child.href)
                            ? "bg-teal-50 font-medium text-teal-900"
                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950",
                        ].join(" ")}
                      >
                        <span className="truncate">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="space-y-1">
          <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
            {navigation.external}
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            const isExternal = link.href.startsWith("http");

            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="flex h-8 items-center justify-between gap-2 rounded-md px-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Icon size={14} className="shrink-0" />
                  <span className="truncate">{link.label}</span>
                </span>
                {isExternal ? <ArrowUpRight size={13} className="shrink-0" /> : null}
              </a>
            );
          })}
        </div>

        <div className="mt-auto" />
      </div>
    </div>
  );
}
