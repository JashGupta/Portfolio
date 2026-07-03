"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { BrowserMockup } from "@/components/ui/browser-mockup";
import { ProjectScreenshot } from "@/components/ui/project-screenshots";
import { MagneticLink } from "@/components/ui/magnetic-button";
import {
  SectionBleedBottom,
  SectionBleedTop,
  ScrollScale,
} from "@/components/ui/scroll-linked";
import { FeaturedProject, statusStyles } from "@/lib/projects";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const tintByIndex = ["blue", "purple", "emerald"] as const;

type ProjectProps = {
  project: FeaturedProject;
  index: number;
  reversed?: boolean;
};

export function Project({
  project,
  index,
  reversed = false,
}: ProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const titleOpacity = useTransform(
    springScrollY,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );
  const titleY = useTransform(
    springScrollY,
    [0, 0.15, 0.85, 1],
    [30, 0, 0, -30],
  );

  const descriptionOpacity = useTransform(
    springScrollY,
    [0.1, 0.25, 0.8, 1],
    [0, 1, 1, 0],
  );
  const descriptionY = useTransform(
    springScrollY,
    [0.1, 0.25, 0.8, 1],
    [30, 0, 0, -30],
  );

  const architectureOpacity = useTransform(
    springScrollY,
    [0.2, 0.35, 0.75, 1],
    [0, 1, 1, 0],
  );
  const architectureY = useTransform(
    springScrollY,
    [0.2, 0.35, 0.75, 1],
    [30, 0, 0, -30],
  );

  const stackOpacity = useTransform(
    springScrollY,
    [0.3, 0.45, 0.7, 1],
    [0, 1, 1, 0],
  );
  const stackY = useTransform(
    springScrollY,
    [0.3, 0.45, 0.7, 1],
    [30, 0, 0, -30],
  );

  const buttonsOpacity = useTransform(
    springScrollY,
    [0.35, 0.5, 0.85, 1],
    [0, 1, 1, 0],
  );
  const buttonsY = useTransform(
    springScrollY,
    [0.35, 0.5, 0.85, 1],
    [30, 0, 0, -30],
  );

  const browserScale = useTransform(
    springScrollY,
    [0, 0.5, 1],
    [0.95, 1, 0.95],
  );
  const browserY = useTransform(springScrollY, [0, 0.5, 1], [50, 0, -50]);

  const status = statusStyles[project.status];
  const tint = tintByIndex[(index - 1) % tintByIndex.length];

  return (
    <section
      ref={containerRef}
      id={`project-${index}`}
      className="relative min-h-[140vh] md:min-h-[170vh] lg:min-h-[200vh]"
      aria-label={`Project: ${project.title}`}
    >
      <div className="absolute inset-x-0 top-0 h-px animated-divider" />
      <SectionBleedTop tint={tint} />
      <SectionBleedBottom tint={tint} />

      <div className="relative lg:sticky lg:top-8 flex lg:h-screen items-center">
        <div
          className={cn(
            "section-padding container-wide grid w-full gap-12 py-12 md:py-16 lg:grid-cols-2 lg:items-center lg:justify-between lg:gap-28 xl:gap-40",
            reversed && "lg:[direction:rtl] lg:*:[direction:ltr]",
          )}
        >
          <motion.div
            style={
              reducedMotion ? undefined : { scale: browserScale, y: browserY }
            }
            className="w-full order-2 lg:order-0 mt-10 lg:mt-0"
          >
            <ScrollScale
              progress={springScrollY}
              scaleRange={[0.96, 1.05, 0.96]}
            >
              <BrowserMockup domain={project.domain}>
                <ProjectScreenshot project={project} />
              </BrowserMockup>
            </ScrollScale>
          </motion.div>

          <div className="flex flex-col">
            <motion.div
              style={
                reducedMotion ? undefined : { opacity: titleOpacity, y: titleY }
              }
              className="mb-5 flex flex-wrap items-center gap-3"
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-border-subtle px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em]",
                  status.badge,
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                {project.status}
              </span>
            </motion.div>

            <motion.h3
              style={
                reducedMotion ? undefined : { opacity: titleOpacity, y: titleY }
              }
              className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight"
            >
              {project.title}
            </motion.h3>

            <motion.p
              style={
                reducedMotion ? undefined : { opacity: titleOpacity, y: titleY }
              }
              className="mt-3 text-lg text-muted-foreground"
            >
              {project.tagline}
            </motion.p>

            <motion.p
              style={
                reducedMotion
                  ? undefined
                  : { opacity: descriptionOpacity, y: descriptionY }
              }
              className="mt-6 max-w-lg text-[15px] leading-[1.75] text-muted-foreground md:text-base"
            >
              {project.description}
            </motion.p>

            <motion.div
              style={
                reducedMotion
                  ? undefined
                  : { opacity: architectureOpacity, y: architectureY }
              }
              className="mt-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Architecture
              </p>
              <ul className="mt-3 space-y-2.5">
                {project.architecture.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border-subtle" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              style={
                reducedMotion ? undefined : { opacity: stackOpacity, y: stackY }
              }
              className="mt-10"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Tech Stack
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border-subtle bg-surface/80 px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border hover:bg-surface"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              style={
                reducedMotion
                  ? undefined
                  : { opacity: buttonsOpacity, y: buttonsY }
              }
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              <MagneticLink
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                strength="medium"
                className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 shadow-lg shadow-black/20"
              >
                Live Demo
              </MagneticLink>
              <MagneticLink
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                strength="subtle"
                className="rounded-full border border-border-subtle px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-surface/80"
              >
                GitHub
              </MagneticLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
