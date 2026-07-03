"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001,
  });

  const opacity = useTransform(springProgress, [0, 0.02, 1], [0, 1, 1]);

  if (reducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[1.5px] origin-left"
      style={{
        scaleX: springProgress,
        opacity,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: DURATION.page,
        ease: EASE.out,
        delay: 0.4,
      }}
    >
      <div className="h-full w-full bg-gradient-to-r from-transparent via-foreground/25 to-foreground/40" />
    </motion.div>
  );
}
