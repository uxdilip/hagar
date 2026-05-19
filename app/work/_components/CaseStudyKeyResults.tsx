"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordReveal } from "./CaseStudyText";

gsap.registerPlugin(ScrollTrigger);

/**
 * CaseStudyKeyResults — "Key Results at a Glance" style.
 *
 * Each stat is a vertical bar: 1px left border, 32px left padding, centered
 * big number stacked over a centered label. Numbers count up.
 *
 * Layout:
 *  - Optional heading above (H3-style serif)
 *  - 3-up row on desktop, 1-col stack on mobile
 */
export function CaseStudyKeyResults({
  heading,
  items,
}: {
  heading?: string;
  items: { value: string; label: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numbers = el.querySelectorAll<HTMLElement>(".key-result-number");

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
  }, []);

  return (
    <div ref={ref} className="space-y-12 md:space-y-16">
      {heading && (
        <WordReveal
          as="h3"
          className="font-serif text-3xl leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
        >
          {heading}
        </WordReveal>
      )}

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-2 border-l border-ink pl-8"
          >
            <p
              className="key-result-number text-center font-serif text-6xl font-bold leading-none md:text-7xl lg:text-[80px]"
              data-value={item.value}
            >
              {item.value}
            </p>
            <p className="text-center font-sans text-base font-bold uppercase tracking-wide md:text-lg">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
