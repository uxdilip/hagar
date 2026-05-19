"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CaseStudyFeatureCards — 3-up grid of cards with SVG icon + heading + body.
 * Used in Overview section (Soum / Sama AI / iOS Mobile App).
 *
 * Mobile: stacks single column.
 */
export function CaseStudyFeatureCards({
  cards,
}: {
  cards: { icon: string; heading: string; body: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".feature-card");

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8"
    >
      {cards.map((c) => (
        <div key={c.heading} className="feature-card flex flex-col gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.icon}
            alt=""
            aria-hidden
            className="h-12 w-12"
          />
          <div>
            <h3 className="font-serif text-2xl leading-tight md:text-3xl">
              {c.heading}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-lg">
              {c.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
