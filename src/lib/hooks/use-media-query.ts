"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/** Pointer-capable, fine-grained device (mouse/trackpad) — desktop interactions. */
export function useIsPointerFine(): boolean {
  return useMediaQuery("(pointer: fine) and (hover: hover)");
}

/** Touch-primary device — enable gesture layer. */
export function useIsTouchDevice(): boolean {
  return useMediaQuery("(pointer: coarse)");
}
