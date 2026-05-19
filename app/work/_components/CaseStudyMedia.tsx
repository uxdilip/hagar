"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CaseStudyMedia — single image with Thomas-style ken burns reveal.
 *
 * Animation:
 *  - Container: opacity 0→1 + scale 1.05→1 when entering viewport (300ms)
 *  - Inner <img>: scrubbed scale 1.2 → 1 as you scroll past (scrub: 1.5)
 *
 * Together they create a calm, cinematic reveal that's tied to scroll progress.
 */
export function CaseStudyMedia({
  src,
  alt = "",
  aspect,
  caption,
  className = "",
}: {
  src: string;
  alt?: string;
  aspect?: string;
  caption?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const img = container.querySelector<HTMLImageElement>("img");
    if (!img) return;

    const ctx = gsap.context(() => {
      gsap.set(container, { opacity: 0, scale: 1.05, force3D: true });

      gsap.to(container, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          end: "top 35%",
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
        },
      });

      gsap.fromTo(
        img,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "top 20%",
            scrub: 1.5,
            fastScrollEnd: true,
          },
        },
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <figure className={className}>
      <div
        ref={containerRef}
        className="cs-media-wrap overflow-hidden"
        style={aspect ? { aspectRatio: aspect } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs uppercase tracking-widest text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
