"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { MagneticButton, MagneticLink } from "@/components/ui/magnetic-button";
import { ParallaxLayer } from "@/components/ui/scroll-linked";
import { CodeEditor } from "@/components/ui/code-editor";
import { siteConfig } from "@/lib/site";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { useMobileMenu } from "../providers/app-provider";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { isMobile } = useMobileMenu();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const editorOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const editorY = useTransform(scrollYProgress, [0, 0.45], [0, -120]);
  const editorScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.92]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const shouldAnimate = !reducedMotion && !isMobile;

  function scrollToElement(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh]"
      aria-label="Introduction"
    >
      <ParallaxLayer
        progress={scrollYProgress}
        distance={60}
        className="overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/[0.03] blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -right-32 top-1/2 h-[400px] w-[400px] rounded-full bg-purple-500/[0.03] blur-3xl"
        />
      </ParallaxLayer>

      <motion.div
        style={
          shouldAnimate
            ? {
                scale: editorScale,
                y: editorY,
                opacity: editorOpacity,
              }
            : undefined
        }
        className="section-padding flex min-h-[100svh] flex-col justify-center pb-32 pt-28 md:pb-40 md:pt-32"
      >
        <div className="container-wide grid items-center gap-16 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          <div className="flex flex-col">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={reducedMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: DURATION.section, ease: EASE.out }}
              className="mb-10 inline-flex w-fit items-center gap-2.5 rounded-full border border-border-subtle bg-surface/80 px-4 py-2 backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5">
                {!reducedMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40 opacity-75" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Open to Work
              </span>
            </motion.div>

            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={reducedMotion ? false : { opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.section,
                ease: EASE.out,
                delay: 0.1,
              }}
              className="text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em] text-foreground"
            >
              <span className="block">Turning ideas</span>
              <span className="block text-gradient">into real Software.</span>
            </motion.h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={reducedMotion ? false : { opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.section,
                ease: EASE.out,
                delay: 0.2,
              }}
              className="mt-8 max-w-xl text-[14px] text-muted-foreground md:text-[18px]"
            >
              I&apos;m {siteConfig.name}, a software developer based in India
              who enjoys turning ideas into reliable software through clean
              engineering, scalable systems, and thoughtful user experiences.
            </motion.p>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={reducedMotion ? false : { opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.section,
                ease: EASE.out,
                delay: 0.3,
              }}
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                strength="medium"
                onClick={() => scrollToElement("project-1")}
                className="rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90 shadow-lg shadow-black/20"
              >
                View Projects
              </MagneticButton>

              <MagneticLink
                href={siteConfig.links.resume}
                download="Jashan_Gupta_Resume.pdf"
                strength="subtle"
                className="rounded-full border border-border-subtle px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-surface/80"
              >
                Resume
              </MagneticLink>
            </motion.div>
          </div>

          <motion.div
            style={
              shouldAnimate
                ? {
                    scale: editorScale,
                    y: editorY,
                    opacity: editorOpacity,
                  }
                : undefined
            }
            className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none lg:justify-self-end"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-12 rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent blur-3xl"
            />
            <CodeEditor />
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToElement("project-1")}
        style={reducedMotion ? undefined : { opacity: indicatorOpacity }}
        className="absolute inset-x-0 bottom-0 flex justify-center"
        aria-label="Scroll to projects"
      >
        <ScrollIndicator />
      </motion.button>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
