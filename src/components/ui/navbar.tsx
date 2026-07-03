"use client";

import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MagneticLink } from "@/components/ui/magnetic-button";
import { useMobileMenu } from "@/components/providers/app-provider";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { menuPanel, navbarSlide, instantVisible } from "@/lib/motion";
import { DURATION, EASE } from "@/lib/motion";

function openCommandPalette() {
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true })
  );
}

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Projects", href: "#project-1" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const reducedMotion = useReducedMotion();
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;

      if (
        menuRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }

      closeMenu();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen, closeMenu]);

  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.header
      variants={reducedMotion ? instantVisible : navbarSlide}
      initial="hidden"
      animate="visible"
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="pointer-events-none absolute inset-0 bg-background/80 backdrop-blur-md"
      />
      <motion.div
        style={{ opacity: borderOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 hairline"
      />

      <nav
        aria-label="Primary"
        className="section-padding relative mx-auto flex h-16 max-w-6xl items-center justify-between md:h-[4.5rem]"
      >
        <MagneticLink
          href="#"
          strength="subtle"
          className="group flex items-center gap-2.5 text-sm font-medium tracking-tight text-foreground"
        >
          <span className="font-mono text-[10px] text-muted" aria-hidden>
            ◆
          </span>
          {siteConfig.name}
        </MagneticLink>

        <ul className="hidden items-center gap-10 md:flex" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="focus-ring interactive relative rounded-sm px-1 py-0.5 text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <MagneticLink
            href={`mailto:${siteConfig.email}`}
            strength="subtle"
            className="text-sm text-muted-foreground hover:text-foreground link-underline"
          >
            Get in touch
          </MagneticLink>
          <button
            type="button"
            onClick={openCommandPalette}
            className="focus-ring interactive flex items-center gap-2 rounded-md border border-border-subtle px-3 py-1.5 text-xs text-muted-foreground hover:border-border hover:bg-surface/80"
          >
            <span className="hidden sm:inline">Search</span>
            <kbd className="rounded border border-border-subtle bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>
        </div>

        <button
          type="button"
          ref={buttonRef}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={toggleMenu}
          className="focus-ring interactive flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground md:hidden"
        >
          <span className="flex w-4 flex-col gap-1" aria-hidden>
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE.out }}
              className="block h-px w-full bg-current"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: DURATION.hover, ease: EASE.out }}
              className="block h-px w-full bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE.out }}
              className="block h-px w-full bg-current"
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
          ref={menuRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={reducedMotion ? instantVisible : menuPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-6 top-full mt-2 rounded-lg border border-border bg-surface p-2 shadow-2xl md:hidden"
          >
            <ul role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="focus-ring interactive block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="my-1 hairline" aria-hidden />
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={closeMenu}
              className="focus-ring interactive block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
            >
              Get in touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
