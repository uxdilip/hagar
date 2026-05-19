"use client";

import { CaseStudyMedia } from "./CaseStudyMedia";
import { WordReveal } from "./CaseStudyText";

type Item = {
  image: string;
  /** Small label above heading (e.g. "Problem #1", "IMPROVEMENT #1"). */
  tagline?: string;
  heading: string;
  body: string;
  /** Image aspect ratio (CSS aspect-ratio value). Defaults to 1/1. */
  aspect?: string;
  /** Optional sub-block (e.g. "The Problem" details, JTBD quote). */
  subBlock?: {
    tagline?: string;
    heading?: string;
    body: string;
  };
};

/**
 * CaseStudyAlternatingRows — alternating left/right image+text rows.
 *
 * More flexible than CaseStudyPersonas — supports an optional top tagline
 * and an optional sub-block (with its own tagline + heading). Used for:
 *  - Mirror's Problem cards (tagline only, no sub-block)
 *  - Mirror's Improvement cards (heading is "IMPROVEMENT #X", sub-block is "The Problem")
 *
 * Mobile: stacks (image always above text).
 */
export function CaseStudyAlternatingRows({ items }: { items: Item[] }) {
  return (
    <div className="space-y-24 md:space-y-32">
      {items.map((p, i) => {
        const imageOnRight = i % 2 === 1;
        return (
          <div
            key={i}
            className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16"
          >
            {/* Image */}
            <div
              className={
                imageOnRight
                  ? "order-1 md:order-2"
                  : "order-1 md:order-1"
              }
            >
              <div className="overflow-hidden rounded-3xl">
                <CaseStudyMedia
                  src={p.image}
                  alt={p.heading}
                  aspect={p.aspect ?? "1/1"}
                />
              </div>
            </div>

            {/* Content */}
            <div
              className={
                imageOnRight
                  ? "order-2 flex flex-col justify-center gap-6 md:order-1"
                  : "order-2 flex flex-col justify-center gap-6 md:order-2"
              }
            >
              {p.tagline && (
                <WordReveal
                  as="p"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted"
                >
                  {p.tagline}
                </WordReveal>
              )}
              <WordReveal
                as="h3"
                className="font-serif text-3xl leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
              >
                {p.heading}
              </WordReveal>
              <WordReveal
                as="p"
                className="text-base leading-relaxed text-ink-muted md:text-lg"
              >
                {p.body}
              </WordReveal>

              {p.subBlock && (
                <div className="mt-4 space-y-3 border-t border-ink/10 pt-6">
                  {p.subBlock.tagline && (
                    <WordReveal
                      as="p"
                      className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted"
                    >
                      {p.subBlock.tagline}
                    </WordReveal>
                  )}
                  {p.subBlock.heading && (
                    <WordReveal
                      as="p"
                      className="font-sans text-lg font-bold md:text-xl"
                    >
                      {p.subBlock.heading}
                    </WordReveal>
                  )}
                  <WordReveal
                    as="p"
                    className="text-base leading-relaxed text-ink md:text-lg"
                  >
                    {p.subBlock.body}
                  </WordReveal>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
