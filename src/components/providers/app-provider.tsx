"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import { ScrollProgress } from "@/components/ui/scroll-progress";

// ---------- Lenis (smooth scroll) ----------

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

function useSmoothScroll() {
  const reducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setLenis(null);
      return;
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisRef.current = instance;
    setLenis(instance);

    let rafId = 0;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reducedMotion]);

  return lenis;
}

// ---------- Mobile gesture / menu ----------

type MobileGestureContextValue = {
  menuOpen: boolean;
  isMobile: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

const MobileGestureContext = createContext<MobileGestureContextValue | null>(null);

export function useMobileMenu() {
  const context = useContext(MobileGestureContext);
  if (!context) {
    throw new Error("useMobileMenu must be used within AppProviders");
  }
  return context;
}

function useMobileGesture() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return useMemo(
    () => ({ menuOpen, isMobile, openMenu, closeMenu, toggleMenu }),
    [menuOpen, isMobile, openMenu, closeMenu, toggleMenu],
  );
}

// ---------- Combined provider ----------

type AppProvidersProps = {
  children: ReactNode;
};

/**
 * Root app shell — composes smooth scroll (Lenis), motion config,
 * scroll progress, cursor spotlight, and mobile gesture context.
 */
export function AppProviders({ children }: AppProvidersProps) {
  const lenis = useSmoothScroll();
  const reducedMotion = useReducedMotion();
  const mobileGesture = useMobileGesture();

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
        <MobileGestureContext.Provider value={mobileGesture}>
          <div data-reduced-motion={reducedMotion ? "true" : "false"} className="contents">
            <ScrollProgress />
            <CursorSpotlight />
            {children}
          </div>
        </MobileGestureContext.Provider>
      </MotionConfig>
    </LenisContext.Provider>
  );
}