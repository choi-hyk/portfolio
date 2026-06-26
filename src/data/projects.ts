import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export type Project = {
  slug: string;
  title: string;
  type: string;
  description: string;
  href: string;
  stack: string[];
  featured: boolean;
};

export const projects: Project[] = getDictionary(defaultLocale).projects;
