"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/lib/projects";

const ProjectShardScene = dynamic(
  () =>
    import("@/components/scene/ProjectShardScene").then(
      (m) => m.ProjectShardScene
    ),
  { ssr: false, loading: () => null }
);

export function ProjectShardLoader({ project }: { project: Project }) {
  return <ProjectShardScene project={project} />;
}
