"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordReveal } from "./CaseStudyText";

gsap.registerPlugin(ScrollTrigger);

/**
 * CaseStudyPainPoints — 3-up stat cards with title at top, large number,
 * divider, and description below.
 *
 * Each card has a subtle border + rounded corners. Numbers count up.
 */
export function CaseStudyPainPoints({
  tagline,
  items,
}: {
  tagline: string;
  items: { title: string; value: string; description: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".pain-card");
    const numbers = el.querySelectorAll<HTMLElement>(".pain-number");

    const tween = gsap.fromTo(
      cards,
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

    // Number count-up
    numbers.forEach((numEl) => {
      const final = numEl.dataset.value ?? "";
      const match = final.match(/^([+\-−]?)(\d+(?:\.\d+)?)(.*)$/);
      if (!match) return;
      const [, prefix, num, suffix] = match;
      const target = parseFloat(num);
      const decimals = num.includes(".") ? num.split(".")[1].length : 0;
      const counter = { v: 0 };
      gsap.set(numEl, { textContent: `${prefix}0${suffix}` });
      gsap.to(counter, {
        v: target,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          numEl.textContent = `${prefix}${counter.v.toFixed(decimals)}${suffix}`;
        },
        scrollTrigger: {
          trigger: numEl,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref}>
      <WordReveal
        as="p"
        className="mb-10 text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted md:mb-12"
      >
        {tagline}
      </WordReveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {items.map((it) => (
          <div
            key={it.title}
            className="pain-card flex flex-col gap-12 rounded-3xl border border-ink/[0.05] bg-white p-8 md:p-10"
          >
            <h3 className="font-sans text-lg font-bold leading-tight md:text-xl">
              {it.title}
            </h3>
            <div className="flex flex-col gap-4">
              <p
                className="pain-number text-right font-serif text-6xl font-bold leading-none md:text-7xl lg:text-[80px]"
                data-value={it.value}
              >
                {it.value}
              </p>
              <div className="h-px w-full bg-ink/20" />
              <p className="text-right text-sm leading-relaxed text-ink-muted md:text-base">
                {it.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
