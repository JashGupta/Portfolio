import type { Variants } from "framer-motion";

export const DURATION = {
  /** Hover states — 150ms */
  hover: 0.15,
  /** Fast interactions — 180–220ms */
  fast: 0.2,
  /** Section transitions — 500–700ms */
  section: 0.6,
  /** Page-level entrance */
  page: 0.5,
  /** Navbar entrance */
  navbar: 0.55,
} as const;

export const EASE = {
  /** Primary deceleration curve */
  out: [0.16, 1, 0.3, 1] as const,
  /** Symmetric transitions */
  inOut: [0.65, 0, 0.35, 1] as const,
} as const;

export const OFFSET = {
  reveal: 20,
  navbar: -12,
  section: 24,
} as const;

export const navbarSlide: Variants = {
  hidden: { opacity: 0, y: OFFSET.navbar },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.navbar, ease: EASE.out, delay: 0.1 },
  },
};

export const menuPanel: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fast, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: DURATION.fast, ease: EASE.out },
  },
};

/** Reduced-motion: instant visible state */
export const instantVisible: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};
