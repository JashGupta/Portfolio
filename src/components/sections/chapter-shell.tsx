"use client";

import { motion, type MotionValue } from "framer-motion";
import type { ReactNode, RefObject } from "react";
import {
  SectionBleedBottom,
  SectionBleedTop,
  ParallaxLayer,
} from "@/components/ui/scroll-linked";

type SectionTint = "blue" | "purple" | "emerald" | "neutral";

type ChapterShellProps = {
  id?: string;
  ariaLabel: string;
  containerRef: RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  minHeightClass: string;
  topTint: SectionTint;
  bottomTint?: SectionTint;
  backgroundClassName?: string;
  backgroundOpacity?: MotionValue<number>;
  parallaxDistance?: number;
  parallaxOrbClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
};

/** Shared layout scaffold for scroll-driven chapter sections. */
export function ChapterShell({
  id,
  ariaLabel,
  containerRef,
  progress,
  reducedMotion,
  minHeightClass,
  topTint,
  bottomTint,
  backgroundClassName,
  backgroundOpacity,
  parallaxDistance = 25,
  parallaxOrbClassName,
  children,
  footer,
}: ChapterShellProps) {
  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative ${minHeightClass}`}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-x-0 top-0 h-px animated-divider" />
      <SectionBleedTop tint={topTint} />

      {backgroundClassName && (
        <motion.div
          style={
            reducedMotion || !backgroundOpacity
              ? undefined
              : { opacity: backgroundOpacity }
          }
          className={`pointer-events-none absolute inset-0 ${backgroundClassName}`}
        />
      )}

      {parallaxOrbClassName && (
        <ParallaxLayer progress={progress} distance={parallaxDistance}>
          <div aria-hidden className={parallaxOrbClassName} />
        </ParallaxLayer>
      )}

      {children}

      {bottomTint && <SectionBleedBottom tint={bottomTint} />}
      {footer}
    </section>
  );
}
