"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordReveal } from "./CaseStudyText";

gsap.registerPlugin(ScrollTrigger);

/**
 * CaseStudyPrinciplesGrid — 4-up grid of design principles with SVG icons.
 *
 * Layout:
 *  - Heading at the top
 *  - 4 cards in a 2x2 grid (1-col on mobile, 4-col on lg)
 *  - Each card: dark serif heading + body text + SVG icon
 *
 * Sits inside a tinted background (grey-50) — handled by parent section
 * spacing, this component just renders the grid + heading.
 */
export function CaseStudyPrinciplesGrid({
  heading,
  cards,
}: {
  heading: string;
  cards: { icon: string; heading: string; body: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".principle-card");

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
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
    <div ref={ref} className="rounded-3xl bg-ink/[0.03] p-8 md:p-16">
      <WordReveal
        as="h2"
        className="max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
      >
        {heading}
      </WordReveal>
      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-10">
        {cards.map((c) => (
          <div key={c.heading} className="principle-card flex flex-col gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.icon}
              alt=""
              aria-hidden
              className="h-12 w-12"
            />
            <div>
              <h3 className="font-sans text-xl font-semibold leading-tight md:text-2xl">
                {c.heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                {c.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
