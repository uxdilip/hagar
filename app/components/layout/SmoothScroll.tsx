"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll
 * Lenis configured with GSAP ticker sync (Thomas pattern) so cursor,
 * ScrollTrigger, and scroll all share a single animation loop.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const lenis = new Lenis({
      autoRaf: false,
      autoResize: true,
      syncTouch: true,
      touchMultiplier: isMobile ? 1 : 1.2,
      wheelMultiplier: 1,
      duration: isMobile ? 1.4 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Expose globally for nav smooth scroll + template.tsx resize calls
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Connect Lenis scroll events to ScrollTrigger.update
    lenis.on("scroll", ScrollTrigger.update);

    // Unified animation loop via GSAP ticker.
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
