"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CaseStudyMetrics — outcome stats with a count-up animation when entering view.
 *
 * Each item:
 *  - Number counts up from a base value (parsed from value string) to its target
 *  - Label fades in below
 *
 * Handles weird value strings like "+42%", "−68%", "4.7/5", "12→1" by extracting
 * the leading number, animating the count, and preserving the prefix/suffix.
 */
type Item = { value: string; label: string };

export function CaseStudyMetrics({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const valueEls = root.querySelectorAll<HTMLElement>(".cs-metric-value");
      const labelEls = root.querySelectorAll<HTMLElement>(".cs-metric-label");

      // Parse numeric portion from each value, animate it, preserve the rest
      valueEls.forEach((el) => {
        const final = el.dataset.value ?? "";
        // Extract leading numeric portion (handles "+42%", "-68%", "4.7/5", etc.)
        const match = final.match(/^([+\-−]?)(\d+(?:\.\d+)?)(.*)$/);
        if (!match) {
          // Non-numeric value (e.g. "AAA", "12→1") — just fade in
          gsap.from(el, {
            opacity: 0,
            y: 16,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
          return;
        }

        const [, prefix, num, suffix] = match;
        const target = parseFloat(num);
        const decimals = num.includes(".") ? num.split(".")[1].length : 0;
        const counter = { v: 0 };

        gsap.set(el, { textContent: `${prefix}0${suffix}` });

        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${counter.v.toFixed(decimals)}${suffix}`;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(labelEls, {
        opacity: 0,
        y: 8,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4"
    >
      {items.map((m) => (
        <div key={m.label}>
          <p
            className="cs-metric-value font-serif text-4xl leading-none md:text-6xl lg:text-7xl"
            data-value={m.value}
          >
            {m.value}
          </p>
          <p className="cs-metric-label mt-3 text-[11px] uppercase tracking-[0.25em] text-ink-muted">
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );
}
