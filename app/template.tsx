"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page transition wrapper.
 *
 * Shows a brief loading overlay on client-side navigation that:
 * 1. Covers the screen instantly (hides old content)
 * 2. Scrolls to top behind the overlay
 * 3. Fades out to reveal the new page at the top
 *
 * On first load (SSR), skips the overlay entirely.
 */
export default function Template({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isFirstRender] = useState(() => {
    // Check if this is a fresh page load (SSR) vs client navigation
    if (typeof window === "undefined") return true;
    // If the page was already interactive, this is a client nav
    const key = "__pageTransitionReady";
    if ((window as unknown as Record<string, boolean>)[key]) return false;
    (window as unknown as Record<string, boolean>)[key] = true;
    return true;
  });

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;

    // Reset scroll
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.resize();
    }

    if (isFirstRender) {
      // First load — no overlay, just refresh ST
      ScrollTrigger.refresh(true);
      const t = setTimeout(() => {
        if (lenis) lenis.resize();
        ScrollTrigger.refresh(true);
      }, 500);
      return () => clearTimeout(t);
    }

    // Client navigation — fade out the overlay
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Small delay to ensure content is rendered behind overlay
    const timeout = setTimeout(() => {
      if (lenis) lenis.resize();
      ScrollTrigger.refresh(true);

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          overlay.style.display = "none";
        },
      });
    }, 100);

    // Additional refresh for lazy images
    const t2 = setTimeout(() => {
      if (lenis) lenis.resize();
      ScrollTrigger.refresh(true);
    }, 1500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(t2);
    };
  }, [isFirstRender]);

  return (
    <>
      {!isFirstRender && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-ink/40" />
        </div>
      )}
      <div ref={contentRef}>{children}</div>
    </>
  );
}
