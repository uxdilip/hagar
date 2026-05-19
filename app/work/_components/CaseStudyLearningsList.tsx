"use client";

import { CaseStudySectionIntro } from "./CaseStudySectionIntro";
import { WordReveal } from "./CaseStudyText";

/**
 * CaseStudyLearningsList — 2-column numbered list (2x2 on md+, single col mobile).
 * Each row has top border + big serif number + heading + body.
 *
 * Used for "What I Learned" section.
 */
export function CaseStudyLearningsList({
  tagline,
  heading,
  items,
}: {
  tagline: string;
  heading: string;
  items: { num: string; heading: string; body: string }[];
}) {
  return (
    <div className="space-y-12 md:space-y-16">
      <CaseStudySectionIntro tagline={tagline} heading={heading} />

      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
        {items.map((it) => (
          <div
            key={it.num}
            className="flex gap-8 border-t border-ink/15 pt-8 md:pt-12"
          >
            <span className="font-serif text-3xl leading-none md:text-4xl">
              {it.num}
            </span>
            <div className="flex-1 space-y-3">
              <WordReveal
                as="h3"
                className="font-sans text-xl font-bold leading-tight md:text-2xl"
              >
                {it.heading}
              </WordReveal>
              <WordReveal
                as="p"
                className="text-base leading-relaxed text-ink-muted md:text-lg"
              >
                {it.body}
              </WordReveal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
