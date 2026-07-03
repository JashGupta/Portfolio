"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function ScrollIndicator() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, y: -8 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE.out, delay: 0.3 }}
      className="flex flex-col items-center gap-3 pb-1 pt-6"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
        Scroll
      </span>

      <div className="relative flex h-11 w-6 items-start justify-center rounded-full border border-border/60 p-1">
        <motion.div
          aria-hidden
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0.4, 0, 0.4],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: EASE.inOut,
          }}
          className="absolute inset-0 rounded-full bg-foreground/10"
        />

        <motion.div
          aria-hidden
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, 14, 0],
                  opacity: [1, 0.3, 1],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: EASE.inOut,
          }}
          className="h-1.5 w-1.5 rounded-full bg-foreground/80"
        />
      </div>
    </motion.div>
  );
}