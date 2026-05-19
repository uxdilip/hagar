"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CaseStudyMedia } from "./CaseStudyMedia";
import { WordReveal } from "./CaseStudyText";

type Step = {
  num: string;
  heading: string;
  body: string;
  image?: string;
};

/**
 * CaseStudySolutionShowcase — large image + 3 numbered steps.
 *
 * Two display modes:
 *  1. Static (when no per-step images): single image + steps with all bodies visible.
 *  2. Accordion (when steps have `image`): only the active step's body is shown,
 *     and the image cross-fades + scales to match the active step on click.
 *
 * Animation:
 *  - Image swap: stacked imgs with GSAP opacity + scale (premium ken-burns feel).
 *  - Accordion height: CSS grid-template-rows trick (0fr → 1fr) — pure CSS, smooth.
 */
export function CaseStudySolutionShowcase({
  tagline,
  heading,
  body,
  image,
  imagePosition = "left",
  steps,
}: {
  tagline: string;
  heading: string;
  body: string;
  image: string;
  imagePosition?: "left" | "right";
  steps: Step[];
}) {
  const imageOnRight = imagePosition === "right";

  // Detect accordion mode — at least one step has its own image
  const isAccordion = steps.some((s) => s.image);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Animate image swap when activeIndex changes (accordion mode only)
  useEffect(() => {
    if (!isAccordion) return;
    imageRefs.current.forEach((img, i) => {
      if (!img) return;
      const isActive = i === activeIndex;
      gsap.to(img, {
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.96,
        duration: 0.55,
        ease: "power2.out",
      });
    });
  }, [activeIndex, isAccordion]);

  return (
    <div>
      {/* Intro */}
      <div className="mb-12 max-w-3xl space-y-6 md:mb-16">
        <WordReveal
          as="p"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted"
        >
          {tagline}
        </WordReveal>
        <WordReveal
          as="h2"
          className="font-serif text-3xl leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
        >
          {heading}
        </WordReveal>
        <WordReveal
          as="p"
          className="text-lg leading-relaxed text-ink-muted md:text-xl"
        >
          {body}
        </WordReveal>
      </div>

      {/* Image + steps */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
        {/* Image side */}
        <div
          className={
            imageOnRight ? "order-1 md:order-2" : "order-1 md:order-1"
          }
        >
          {isAccordion ? (
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-[#F8F9FC]">
              {steps.map((step, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  ref={(el) => {
                    imageRefs.current[i] = el;
                  }}
                  src={step.image ?? image}
                  alt={step.heading}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain p-6 md:p-12"
                  style={{
                    opacity: i === activeIndex ? 1 : 0,
                    transform: i === activeIndex ? "scale(1)" : "scale(0.96)",
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-[#F8F9FC] p-6 md:p-12">
              <CaseStudyMedia src={image} alt={heading} aspect="3/4" />
            </div>
          )}
        </div>

        {/* Steps side */}
        <div
          className={
            imageOnRight ? "order-2 md:order-1" : "order-2 md:order-2"
          }
        >
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {steps.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={s.num}>
                  {isAccordion ? (
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      data-name="link"
                      data-text="Step"
                      className="group flex w-full cursor-pointer items-start gap-6 py-6 text-left transition-colors duration-300 md:gap-8"
                    >
                      <span
                        className={`font-sans text-2xl font-bold leading-none transition-colors duration-300 md:text-3xl ${
                          isActive ? "text-ink" : "text-ink-muted/60"
                        }`}
                      >
                        {s.num}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={`font-sans text-xl font-bold leading-tight transition-colors duration-300 md:text-2xl ${
                            isActive
                              ? "text-ink"
                              : "text-ink-muted/70 group-hover:text-ink"
                          }`}
                        >
                          {s.heading}
                        </h3>
                        {/* Body — CSS grid-rows accordion (0fr ↔ 1fr) */}
                        <div
                          className="grid transition-[grid-template-rows] duration-500 ease-out"
                          style={{
                            gridTemplateRows: isActive ? "1fr" : "0fr",
                          }}
                        >
                          <div className="overflow-hidden">
                            <p
                              className={`pt-3 text-sm leading-relaxed text-ink-muted transition-opacity duration-300 md:text-base ${
                                isActive ? "opacity-100" : "opacity-0"
                              }`}
                            >
                              {s.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  ) : (
                    <div className="flex gap-6 py-6 md:gap-8">
                      <span className="font-sans text-2xl font-bold leading-none md:text-3xl">
                        {s.num}
                      </span>
                      <div className="flex-1 space-y-3">
                        <h3 className="font-sans text-xl font-bold leading-tight md:text-2xl">
                          {s.heading}
                        </h3>
                        <p className="text-sm leading-relaxed text-ink-muted md:text-base">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
