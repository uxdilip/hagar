"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CaseStudyResultCards — "Results & Impact" stat cards.
 *
 * Rounded white cards with subtle 1px border, 24px radius. Inside each card:
 *  - Big right-aligned number (80px serif)
 *  - 1px full-width divider
 *  - Right-aligned label (16px regular)
 *
 * Numbers count up on scroll-in. Cards stagger fade-up.
 *
 * Layout: 3-up row on desktop, 1-col stack on mobile.
 */
export function CaseStudyResultCards({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".result-card");
    const numbers = el.querySelectorAll<HTMLElement>(".result-number");

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
    <div
      ref={ref}
      className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="result-card flex flex-col gap-12 rounded-3xl border border-ink/[0.05] bg-white p-8 md:p-10"
        >
          <p
            className="result-number text-right font-serif text-6xl font-bold leading-none md:text-7xl lg:text-[80px]"
            data-value={item.value}
          >
            {item.value}
          </p>
          <div className="flex flex-col gap-4">
            <div className="h-px w-full bg-ink" />
            <p className="text-right text-sm leading-relaxed text-ink md:text-base">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
