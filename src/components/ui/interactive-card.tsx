"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

type InteractiveCardProps = HTMLMotionProps<"article"> & {
  children: ReactNode;
};

/**
 * Card with refined hover lift and border emphasis.
 * Respects reduced motion — border shift only, no translate.
 */
export function InteractiveCard({
  children,
  className,
  ...props
}: InteractiveCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={
        reducedMotion
          ? { borderColor: "var(--color-border)" }
          : { y: -2, borderColor: "var(--color-border)" }
      }
      transition={{ duration: DURATION.hover, ease: EASE.out }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface",
        "transition-colors duration-150",
        "hover:bg-surface-elevated",
        "focus-within:border-border",
        className
      )}
      {...props}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
    </motion.article>
  );
}
