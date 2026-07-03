"use client";

import { motion, useTransform } from "framer-motion";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { ChapterShell } from "@/components/sections/chapter-shell";
import { useChapterScroll } from "@/lib/hooks/use-chapter-scroll";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

export function About() {
  const reducedMotion = useReducedMotion() ?? false;
  const { containerRef, progress } = useChapterScroll();
  const backgroundOpacity = useTransform(
    progress,
    [0, 0.4, 0.8, 1],
    [0, 0.5, 0.5, 0],
  );

  type StatItem = {
    label: string;
    value: string;
  };

  type JourneyItem = {
    phase: string;
    period: string;
    description: string;
  };

  const aboutStats: StatItem[] = [
    {
      value: "8+",
      label: "Projects Built",
    },
    {
      value: "10+",
      label: "Technologies",
    },
    {
      value: "100%",
      label: "Performance Focused",
    },
    {
      value: "∞",
      label: "Always Learning",
    },
  ];

  const journey: JourneyItem[] = [
    {
      phase: "Curiosity & First Steps",
      period: "2023",
      description:
        "Started learning web development during my Computer Science degree at Chitkara University — beginning with HTML, CSS, and JavaScript.",
    },
    {
      phase: "Learning the Fundamentals",
      period: "2023 — 2024",
      description:
        "Picked up React to build modern frontend applications, then moved into backend development with Node.js, Express, MongoDB, and REST APIs.",
    },
    {
      phase: "Building Real Projects",
      period: "2024",
      description:
        "Grew confident building full-stack MERN applications — shipping projects like ExplorX, AstroCRM, AI Virtual Assistant, and an Uber Clone.",
    },
    {
      phase: "Crafting Better Products",
      period: "Present",
      description:
        "Focused on Next.js, TypeScript, Framer Motion, performance, and accessibility — refining the craft behind every product I build.",
    },
  ];

  return (
    <ChapterShell
      id="about"
      ariaLabel="About"
      containerRef={containerRef}
      progress={progress}
      reducedMotion={reducedMotion}
      minHeightClass="min-h-[175vh]"
      topTint="blue"
      bottomTint="purple"
      backgroundClassName="bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent"
      backgroundOpacity={backgroundOpacity}
      parallaxDistance={30}
      parallaxOrbClassName="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-blue-500/[0.02] blur-3xl"
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

            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-tight text-foreground">
              <span className="block italic">I build products.</span>
              <span className="block italic">Then I refine every detail.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-[1.75] text-muted-foreground md:text-[17px]">
              I enjoy turning ideas into full-stack web applications that are
              fast, intuitive, and maintainable. From backend architecture to
              polished frontend interactions — I care about the whole product,
              not just the parts that are easy to notice.
            </p>
          </motion.div>

          <div className="relative mt-20 -mb-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {aboutStats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  index={index}
                  reducedMotion={reducedMotion}
                  scrollProgress={progress}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: DURATION.section,
              ease: EASE.out,
              delay: 0.15,
            }}
            className="relative z-10 mt-32 rounded-2xl border border-border-subtle bg-surface/60 p-8 backdrop-blur-sm md:p-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Journey
            </p>
            <div className="mt-8 space-y-10">
              {journey.map((item, index) => (
                <JourneyStep
                  key={item.phase}
                  item={item}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ChapterShell>
  );
}

function StatCard({
  stat,
  index,
  reducedMotion,
  scrollProgress,
}: {
  stat: { label: string; value: string };
  index: number;
  reducedMotion: boolean;
  scrollProgress: ReturnType<typeof useChapterScroll>["progress"];
}) {
  const cardY = useTransform(
    scrollProgress,
    [0.1 + index * 0.05, 0.4 + index * 0.05],
    [20, -8 * (index % 2 === 0 ? 1 : -1)],
  );
  const cardScale = useTransform(
    scrollProgress,
    [0.1 + index * 0.05, 0.4 + index * 0.05],
    [0.96, 1],
  );

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: DURATION.section,
        ease: EASE.out,
        delay: index * 0.08,
      }}
      style={
        reducedMotion
          ? undefined
          : { y: cardY, scale: cardScale, zIndex: index + 1 }
      }
      className="relative"
    >
      <InteractiveCard className="p-6 md:p-8">
        <p className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          {stat.value}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
      </InteractiveCard>
    </motion.div>
  );
}

function JourneyStep({
  item,
  index,
  reducedMotion,
}: {
  item: { phase: string; period: string; description: string };
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: DURATION.section,
        ease: EASE.out,
        delay: index * 0.1,
      }}
      className="border-l border-border-subtle pl-6"
    >
      <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
      <h3 className="mt-1 text-lg font-medium text-foreground">{item.phase}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </motion.div>
  );
}
