import Image from "next/image";
import { type FeaturedProject } from "@/lib/projects";

export function ProjectScreenshot({
  project,
}: {
  project: FeaturedProject;
}) {
  return (
    <Image
      src={project.screenshot}
      alt={project.title}
      fill
      priority
      className="object-contain"
      sizes="(max-width:768px) 100vw, 50vw"
    />
  );
}