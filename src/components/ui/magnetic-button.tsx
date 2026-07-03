"use client";

import {
  animate,
  motion,
  useMotionValue,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

type MagneticStrength = "subtle" | "medium";

const strengthMap: Record<MagneticStrength, number> = {
  subtle: 0.15,
  medium: 0.25,
};

type MagneticButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  strength?: MagneticStrength;
  radius?: number;
};

/**
 * Button with subtle cursor pull — desktop only, disabled under reduced motion.
 */
export function MagneticButton({
  children,
  className,
  strength = "subtle",
  radius = 120,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const factor = strengthMap[strength];

  const resetPosition = () => {
    if (reducedMotion) return;
    animate(x, 0, { duration: DURATION.fast, ease: EASE.out });
    animate(y, 0, { duration: DURATION.fast, ease: EASE.out });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(event);
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < radius) {
      x.set(distanceX * factor);
      y.set(distanceY * factor);
    } else {
      resetPosition();
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(event);
    resetPosition();
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: DURATION.fast, ease: EASE.out }}
      className={cn("focus-ring interactive", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

type MagneticLinkProps = HTMLMotionProps<"a"> & {
  children: ReactNode;
  strength?: MagneticStrength;
  radius?: number;
};

/** Anchor variant of MagneticButton for navigation CTAs. */
export function MagneticLink({
  children,
  className,
  strength = "subtle",
  radius = 100,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const factor = strengthMap[strength];

  const resetPosition = () => {
    if (reducedMotion) return;
    animate(x, 0, { duration: DURATION.fast, ease: EASE.out });
    animate(y, 0, { duration: DURATION.fast, ease: EASE.out });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onMouseMove?.(event);
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    if (Math.hypot(distanceX, distanceY) < radius) {
      x.set(distanceX * factor);
      y.set(distanceY * factor);
    } else {
      resetPosition();
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onMouseLeave?.(event);
    resetPosition();
  };

  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("focus-ring interactive inline-flex", className)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
