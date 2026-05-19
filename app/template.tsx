"use client";

import { useEffect, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page transition wrapper.
 * On mount, refresh Lenis + ScrollTrigger to sync with new page content.
 * Stepper links use full page reload so we don't need fancy transitions.
 */
export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.resize();
    }
    window.scrollTo(0, 0);
    ScrollTrigger.refresh(true);

    // Final refresh after lazy images load
    const t1 = setTimeout(() => {
      if (lenis) lenis.resize();
      ScrollTrigger.refresh(true);
    }, 500);
    const t2 = setTimeout(() => {
      if (lenis) lenis.resize();
      ScrollTrigger.refresh(true);
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return <>{children}</>;
}
