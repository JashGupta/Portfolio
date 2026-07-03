"use client";

import {
  motion,
  type MotionValue,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ParallaxLayerProps = {
  progress: MotionValue<number>;
  /** How far the layer travels (px) across the section scroll */
  distance?: number;
  className?: string;
  children?: ReactNode;
};

/** Soft parallax layer — subtle Y shift tied to section scroll. */
export function ParallaxLayer({
  progress,
  distance = 40,
  className,
  children,
}: ParallaxLayerProps) {
  const reducedMotion = useReducedMotion();
  const y = useTransform(progress, [0, 1], [distance, -distance]);

  if (reducedMotion) {
    return (
      <div className={cn("pointer-events-none absolute inset-0", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      style={{ y }}
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {children}
    </motion.div>
  );
}

type SectionBleedProps = {
  /** Gradient tint for chapter transition */
  tint?: "blue" | "purple" | "emerald" | "neutral";
  className?: string;
};

const tintMap = {
  blue: "from-blue-500/[0.04] via-transparent to-transparent",
  purple: "from-purple-500/[0.04] via-transparent to-transparent",
  emerald: "from-emerald-500/[0.04] via-transparent to-transparent",
  neutral: "from-foreground/[0.02] via-transparent to-transparent",
};

/** Top gradient bleed — soft chapter transition from previous section. */
export function SectionBleedTop({ tint = "neutral", className }: SectionBleedProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b md:h-48",
        tintMap[tint],
        className
      )}
    />
  );
}

/** Bottom gradient bleed — leads into the next chapter. */
export function SectionBleedBottom({ tint = "neutral", className }: SectionBleedProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t md:h-48",
        tintMap[tint],
        className
      )}
    />
  );
}

type ScrollScaleProps = {
  progress: MotionValue<number>;
  /** Scale range across full section scroll */
  scaleRange?: [number, number, number];
  className?: string;
  children: ReactNode;
};

/** Subtle scale shift while scrolling — Apple product-page feel. */
export function ScrollScale({
  progress,
  scaleRange = [0.96, 1, 0.96],
  className,
  children,
}: ScrollScaleProps) {
  const reducedMotion = useReducedMotion();
  const scale = useTransform(progress, [0, 0.5, 1], scaleRange);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ scale }} className={className}>
      {children}
    </motion.div>
  );
}
