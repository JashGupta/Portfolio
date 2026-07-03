"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useIsPointerFine } from "@/lib/hooks/use-media-query";
import { useReducedMotion } from "framer-motion";

const SPOTLIGHT_SIZE = 500;

export function CursorSpotlight() {
  const isPointerFine = useIsPointerFine();
  const reducedMotion = useReducedMotion();
  const [hasMoved, setHasMoved] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const background = useMotionTemplate`
    radial-gradient(
      ${SPOTLIGHT_SIZE}px circle at ${springX}px ${springY}px,
      rgba(255,255,255,0.04),
      rgba(255,255,255,0.02) 35%,
      transparent 80%
    )
  `;

  useEffect(() => {
    if (!isPointerFine || reducedMotion) return;

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      if (!hasMoved) setHasMoved(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [isPointerFine, reducedMotion, mouseX, mouseY, hasMoved]);

  if (!isPointerFine || reducedMotion || !hasMoved) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ background, willChange: "background" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  );
}