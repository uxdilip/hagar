"use client";

import { WordReveal } from "./CaseStudyText";

/**
 * CaseStudyTextList — grouped vertical list.
 *
 * Figma spec: gap 24px between all elements (heading, tagline, items).
 * Each item: H5 heading + body paragraph, gap 16px between them.
 * Groups separated by 24px (same as everything else in the column).
 */
export function CaseStudyTextList({
  heading,
  groups,
}: {
  heading?: string;
  groups: {
    tagline: string;
    items: { heading: string; body: string }[];
  }[];
}) {
  return (
    <div className="space-y-6">
      {heading && (
        <WordReveal
          as="h2"
          className="font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
        >
          {heading}
        </WordReveal>
      )}
      {groups.map((g, gi) => (
        <div key={gi} className="space-y-6">
          <WordReveal
            as="p"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted"
          >
            {g.tagline}
          </WordReveal>
          {g.items.map((it, ii) => (
            <div key={ii} className="space-y-4">
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
          ))}
        </div>
      ))}
    </div>
  );
}
