"use client";

import { motion, useTransform } from "framer-motion";
import { ChapterShell } from "@/components/sections/chapter-shell";
import { useChapterScroll } from "@/lib/hooks/use-chapter-scroll";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

type Principle = {
  index: string;
  title: string;
  description: string;
};

const PRINCIPLES: Principle[] = [
  {
    index: "01",
    title: "Performance First",
    description:
      "Fast software feels better to use. I focus on efficient rendering, smooth interactions, and optimizing where it has real impact.",
  },
  {
    index: "02",
    title: "Clean Architecture",
    description:
      "Readable code scales better than clever code. I build reusable components and keep projects organized for long-term maintainability.",
  },
  {
    index: "03",
    title: "Accessibility",
    description:
      "Great products should work for everyone. Semantic HTML, keyboard navigation, and reduced-motion support are part of every interface I build.",
  },
  {
    index: "04",
    title: "Developer Experience",
    description:
      "Good tooling makes better software. I value strong typing, reusable patterns, and workflows that make development faster and more reliable.",
  },
  {
    index: "05",
    title: "Scalability",
    description:
      "I design systems that can grow over time, keeping solutions simple today while leaving room for future expansion.",
  },
  {
    index: "06",
    title: "Attention to Detail",
    description:
      "Small details shape the overall experience. From spacing and animations to responsiveness and polish, I care about the finishing touches.",
  },
];

const ITEM_SCROLL_SPAN = 0.5;
const ITEM_SCROLL_OFFSET = 0.2;
const ITEM_REVEAL_WINDOW = 0.12;

export function Skills() {
  const reducedMotion = useReducedMotion() ?? false;
  const { containerRef, progress } = useChapterScroll();
  const backgroundOpacity = useTransform(
    progress,
    [0, 0.4, 0.8, 1],
    [0, 0.4, 0.4, 0],
  );
  const lineScale = useTransform(progress, [0.15, 0.85], [0, 1]);

  return (
    <ChapterShell
      id="skills"
      ariaLabel="How I build software"
      containerRef={containerRef}
      progress={progress}
      reducedMotion={reducedMotion}
      minHeightClass="min-h-[175vh]"
      topTint="purple"
      bottomTint="emerald"
      backgroundClassName="bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent"
      backgroundOpacity={backgroundOpacity}
      parallaxDistance={25}
      parallaxOrbClassName="absolute left-1/4 top-1/2 h-72 w-72 rounded-full bg-purple-500/[0.02] blur-3xl"
    >
      <div className="section-padding py-32">
        <div className="container-wide">
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: DURATION.section,
              ease: EASE.out,
            }}
            className="max-w-3xl"
          >
            {/* heading */}

            <h2 className="text-balance text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-tight text-foreground">
              How I build software.
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-muted-foreground md:text-[17px]">
              Tools change every year. These don't. They're the principles I
              default to before I write a single line of code.
            </p>
          </motion.div>

          <div className="relative mt-20">
            <motion.div
              style={
                reducedMotion ? undefined : { scaleY: lineScale, originY: 0 }
              }
              className="absolute left-0 top-0 h-full w-px bg-border-subtle md:left-[3px]"
            />
            <div>
              {PRINCIPLES.map((principle, i) => (
                <PrincipleRow
                  key={principle.title}
                  principle={principle}
                  index={i}
                  total={PRINCIPLES.length}
                  reducedMotion={reducedMotion}
                  scrollProgress={progress}
                  isLast={i === PRINCIPLES.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ChapterShell>
  );
}

function PrincipleRow({
  principle,
  index,
  total,
  reducedMotion,
  scrollProgress,
  isLast,
}: {
  principle: Principle;
  index: number;
  total: number;
  reducedMotion: boolean;
  scrollProgress: ReturnType<typeof useChapterScroll>["progress"];
  isLast: boolean;
}) {
  const itemStart = ITEM_SCROLL_OFFSET + (index / total) * ITEM_SCROLL_SPAN;
  const itemY = useTransform(
    scrollProgress,
    [itemStart, itemStart + ITEM_REVEAL_WINDOW],
    [16, 0],
  );
  const dotScale = useTransform(
    scrollProgress,
    [itemStart, itemStart + ITEM_REVEAL_WINDOW * 0.8],
    [0, 1],
  );

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: DURATION.section,
        ease: EASE.out,
        delay: index * 0.06,
      }}
      style={reducedMotion ? undefined : { y: itemY }}
      className={`group relative grid grid-cols-1 gap-4 border-t ml-4 border-border-subtle/50 py-8 md:py-10 md:grid-cols-[80px_1fr_1.4fr] md:gap-10 ${
        isLast ? "border-b" : ""
      }`}
    >
      <motion.div
        style={reducedMotion ? undefined : { scale: dotScale }}
        className="absolute left-0 top-12 hidden h-1.5 w-1.5 -translate-x-[15px] rounded-full bg-border-subtle transition-colors group-hover:bg-foreground md:block"
      />

      <span className="font-mono text-sm text-muted-foreground/60">
        {principle.index}
      </span>

      <h3 className="text-xl font-medium tracking-tight text-foreground md:text-2xl">
        {principle.title}
      </h3>

      <p className="max-w-lg text-[15px] leading-[1.75] text-muted-foreground md:text-base">
        {principle.description}
      </p>
    </motion.div>
  );
}
