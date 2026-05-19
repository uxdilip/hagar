"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * CaseStudyLottie — renders a Lottie animation with the Thomas-style ken
 * burns reveal + smoothness optimisations + watermark masking.
 *
 * Design choices:
 *  - JSON is fetched on mount only after the container enters viewport (perf).
 *  - Plays only when in view (IntersectionObserver pauses when offscreen).
 *  - Strips `meta.g` from the JSON to neutralise any player branding.
 *  - Bottom-right corner is masked with a div tinted to the page background
 *    — this hides the Jitter free-tier watermark.
 *  - Container fades + scales in like CaseStudyMedia (visual consistency).
 */
export function CaseStudyLottie({
  src,
  aspect = "4/3",
  caption,
  /** Width of bottom-right mask as a CSS length. */
  maskWidth = "26%",
  /** Height of bottom-right mask as a CSS length. */
  maskHeight = "9%",
  className = "",
}: {
  src: string;
  aspect?: string;
  caption?: string;
  maskWidth?: string;
  maskHeight?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<unknown>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Lazy-load JSON when container is near the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fetch JSON, strip meta, store
  useEffect(() => {
    if (!shouldLoad || animationData) return;
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        // Strip metadata that some players use to inject branding.
        if (data && typeof data === "object" && "meta" in data) {
          delete (data as { meta?: unknown }).meta;
        }
        setAnimationData(data);
      })
      .catch(() => {
        // silently fail — Lottie just won't render
      });
    return () => {
      cancelled = true;
    };
  }, [shouldLoad, animationData, src]);

  // Pause when offscreen, resume when onscreen — saves CPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !animationData) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ref = lottieRef.current;
          if (!ref) return;
          if (entry.isIntersecting) ref.play();
          else ref.pause();
        });
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animationData]);

  // Container reveal animation (matches CaseStudyMedia)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 35%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <figure className={className}>
      <div
        ref={containerRef}
        className="cs-lottie-wrap relative overflow-hidden"
        style={{
          aspectRatio: aspect,
          willChange: "transform, opacity",
        }}
      >
        {animationData ? (
          <>
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop
              autoplay
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
                progressiveLoad: false,
                hideOnTransparent: true,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            {/* Watermark mask — covers bottom-right corner with page background */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 bg-bg"
              style={{
                width: maskWidth,
                height: maskHeight,
              }}
            />
          </>
        ) : (
          // Skeleton while loading
          <div className="h-full w-full animate-pulse bg-ink/[0.04]" />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs uppercase tracking-widest text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
