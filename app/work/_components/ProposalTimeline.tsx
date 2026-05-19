"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordReveal } from "./CaseStudyText";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function ProposalTimeline({
  tagline,
  heading,
  headerBody,
  steps,
}: {
  tagline: string;
  heading: string;
  headerBody?: string;
  steps: { date: string; heading: string; body: string }[];
}) {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];
    stepsRef.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 40 });
      const tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      tweens.push(tween);
    });
    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-12 md:flex-row md:gap-4">
      {/* Left: sticky header */}
      <div className="md:w-[576px] md:flex-shrink-0">
        <div className="space-y-4 md:sticky md:top-32">
          <p className="text-base font-semibold text-white">{tagline}</p>
          <WordReveal
            as="h2"
            className="font-serif text-4xl leading-[1.2] tracking-tight text-[#6CD3A5] md:text-5xl"
          >
            {heading}
          </WordReveal>
          {headerBody && (
            <p className="text-base leading-relaxed text-white md:text-lg">
              {headerBody}
            </p>
          )}
        </div>
      </div>

      {/* Right: timeline */}
      <div className="flex-1">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => { stepsRef.current[i] = el; }}
            className="flex gap-4"
          >
            {/* Vertical progress line + dot */}
            <div className="flex flex-col items-center">
              <div className="h-6 w-[3px] bg-[#6CD3A5]/40" />
              <div className="h-[15px] w-[15px] flex-shrink-0 rounded-full border-[3px] border-[#6CD3A5] bg-[#213F31]" />
              {i < steps.length - 1 && (
                <div className="w-[3px] flex-1 bg-[#6CD3A5]/40" />
              )}
            </div>
            {/* Content */}
            <div className="space-y-4 pb-10 pt-4">
              <div className="space-y-4">
                <p className="text-2xl font-medium text-white/60 md:text-3xl">
                  {step.date}
                </p>
                <h3 className="font-sans text-xl font-bold leading-[1.3] text-[#6CD3A5] md:text-2xl">
                  {step.heading}
                </h3>
              </div>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
