import type { Project } from "@/types/project";
import { getBlueprint4AgentDetailCanvas } from "./blueprint4agent";
import { getFallbackProjectDetailCanvas } from "./fallback";
import { getHippoBoxDetailCanvas } from "./hippobox";
import { getSayItOkDetailCanvas } from "./say-it-ok";
import { getTodayInTechDetailCanvas } from "./today-in-tech";
import type { ProjectDetailCanvasDefinition } from "./types";

export function getProjectDetailCanvas(project: Project): ProjectDetailCanvasDefinition {
  if (project.slug === "hippobox") {
    return getHippoBoxDetailCanvas(project);
  }

  if (project.slug === "blueprint4agent") {
    return getBlueprint4AgentDetailCanvas(project);
  }

  if (project.slug === "say-it-its-ok") {
    return getSayItOkDetailCanvas(project);
  }

  if (project.slug === "today-in-tech") {
    return getTodayInTechDetailCanvas(project);
  }

  return getFallbackProjectDetailCanvas(project);
}
