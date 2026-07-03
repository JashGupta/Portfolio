"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

type BrowserMockupProps = {
  domain: string;
  children: ReactNode;
  className?: string;
};

export function BrowserMockup({ domain, children, className }: BrowserMockupProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -8,
              boxShadow:
                "0 0 0 1px rgba(250,250,250,0.12), 0 0 60px rgba(250,250,250,0.06), 0 40px 80px -20px rgba(0,0,0,0.7)",
            }
      }
      transition={{ duration: DURATION.fast, ease: EASE.out }}
      className={cn(
        "overflow-hidden rounded-2xl border border-border-subtle bg-[#0c0c0e]",
        "shadow-[0_0_0_1px_rgba(250,250,250,0.06),0_32px_64px_-16px_rgba(0,0,0,0.6)]",
        "transition-[box-shadow,border-color,transform] duration-300",
        "hover:border-border",
        className
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-border-subtle bg-[#141416] px-4 py-3">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/75" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/75" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/75" />
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border-subtle bg-[#0a0a0b] px-3 py-1.5">
          <svg
            aria-hidden
            className="h-3 w-3 shrink-0 text-muted"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 1a5 5 0 0 0-5 5v1H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1V6a5 5 0 0 0-5-5Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <span className="truncate font-mono text-[11px] text-muted-foreground">
            {domain}
          </span>
        </div>
      </div>

      {/* Screenshot viewport with reveal effect */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0b]">
        <motion.div
          initial={reducedMotion ? undefined : { scale: 1.1, opacity: 0 }}
          animate={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: DURATION.section, ease: EASE.out }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
        
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}
