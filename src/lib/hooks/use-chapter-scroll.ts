"use client";

import {
  useScroll,
  useSpring,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { useRef, type RefObject } from "react";

type ScrollOffset = NonNullable<UseScrollOptions["offset"]>;
const SECTION_SPRING = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
} as const;

type ChapterScrollResult = {
  containerRef: RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
  progress: MotionValue<number>;
};

const defaultOffset: ScrollOffset = ["start end", "end start"];

export function useChapterScroll(
  offset: ScrollOffset = defaultOffset
): ChapterScrollResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  const progress = useSpring(scrollYProgress, SECTION_SPRING);

  return { containerRef, scrollYProgress, progress };
}
