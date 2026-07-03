"use client";

import { motion, useTransform } from "framer-motion";
import { MagneticLink } from "@/components/ui/magnetic-button";
import { PageEnding } from "@/components/ui/page-ending";
import { ChapterShell } from "@/components/sections/chapter-shell";
import { siteConfig } from "@/lib/site";
import { useChapterScroll } from "@/lib/hooks/use-chapter-scroll";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: DURATION.section, ease: EASE.out, delay },
});

export function Contact() {
  const reducedMotion = useReducedMotion() ?? false;
  const { containerRef, progress } = useChapterScroll(["start end", "end end"]);
  const backgroundOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.6, 0.8]);
  const headingY = useTransform(progress, [0, 0.6], [40, 0]);
  const headingOpacity = useTransform(progress, [0, 0.4], [0, 1]);

  return (
    <ChapterShell
      id="contact"
      ariaLabel="Contact"
      containerRef={containerRef}
      progress={progress}
      reducedMotion={reducedMotion}
      minHeightClass="min-h-[100vh]"
      topTint="neutral"
      backgroundClassName="
bg-gradient-to-b
from-transparent
via-white/[0.015]
to-transparent
"
      backgroundOpacity={backgroundOpacity}
      parallaxDistance={30}
      parallaxOrbClassName="
absolute left-1/2 top-1/3
h-[32rem] w-[32rem]
-translate-x-1/2
rounded-full
bg-white/[0.02]
blur-3xl
"
      footer={
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-background/50 to-background"
        />
      }
    >
      <div className="section-padding flex min-h-[100vh] flex-col justify-center pt-32 pb-16 md:pt-40 md:pb-32">
        <div className="container-wide">
          <motion.div
            style={
              reducedMotion
                ? undefined
                : { y: headingY, opacity: headingOpacity }
            }
            className="max-w-3xl"
          >
            {/* Availability */}
            <motion.div
              {...(reducedMotion ? {} : fadeUp(0))}
              className="flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Open to Software Engineering Opportunities
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h2
              {...(reducedMotion ? {} : fadeUp(0.08))}
              className="text-balance mt-6 text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground"
            >
              Let&apos;s build something
              <br className="hidden sm:block" /> worth shipping.
            </motion.h2>

            {/* Subtext */}
            <motion.p
              {...(reducedMotion ? {} : fadeUp(0.16))}
              className="mt-8 max-w-lg text-[15px] leading-[1.75] text-muted-foreground md:text-[17px]"
            >
              I&apos;m always interested in discussing software engineering, full-stack development, new opportunities, or interesting ideas. If you think we&apos;d be a good fit, let&apos;s connect.
            </motion.p>

            {/* Primary + secondary CTAs */}
            <motion.div
              {...(reducedMotion ? {} : fadeUp(0.24))}
              className="mt-12 flex flex-col gap-6"
            >
              <MagneticLink
                href={`mailto:${siteConfig.email}`}
                strength="medium"
                className="inline-flex w-fit items-center rounded-full bg-foreground px-8 py-4 text-base font-medium text-background shadow-lg shadow-black/20 transition-opacity hover:opacity-90"
              >
                {siteConfig.email}
              </MagneticLink>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
                <MagneticLink
                  href={siteConfig.links.github}
                  strength="subtle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  GitHub
                </MagneticLink>
                <span className="text-border-subtle">/</span>
                <MagneticLink
                  href={siteConfig.links.linkedin}
                  strength="subtle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  LinkedIn
                </MagneticLink>
                <span className="text-border-subtle">/</span>
                <MagneticLink
                  href={siteConfig.links.resume}
                  download="Jashan_Gupta_Resume.pdf"
                  strength="subtle"
                  className="transition-colors hover:text-foreground"
                >
                  Resume
                </MagneticLink>
              </div>
            </motion.div>

            {/* Meta: location + response time */}
            <motion.p
              {...(reducedMotion ? {} : fadeUp(0.32))}
              className="mt-16 font-mono text-xs text-muted-foreground"
            >
              Designed &amp; built by Jashan Gupta.
            </motion.p>

            {/* Signature */}
            <motion.p
              {...(reducedMotion ? {} : fadeUp(0.4))}
              className="mt-3 font-mono text-xs text-muted"
            >
              - Always learning. Always building.
            </motion.p>
          </motion.div>

          <PageEnding />
        </div>
      </div>
    </ChapterShell>
  );
}
