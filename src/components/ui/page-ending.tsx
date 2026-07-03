"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

export function PageEnding() {
  const reducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0 }}
      whileInView={reducedMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: DURATION.section, ease: EASE.out, delay: 0.4 }}
      className="relative mt-20 flex flex-col items-center gap-6 pb-16"
    >
      {/* Decorative end line */}
      <div className="flex items-center gap-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-border-subtle" />
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-muted-foreground/40">
          FIN
        </span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-border-subtle" />
      </div>

      <MagneticButton
        strength="subtle"
        onClick={scrollToTop}
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-muted-foreground"
      >
        Start again ↑
      </MagneticButton>

      {/* Bottom fade into void */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-8 h-24 bg-gradient-to-b from-transparent to-background"
      />
    </motion.div>
  );
}