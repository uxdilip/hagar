"use client";

import { WordReveal } from "./CaseStudyText";

/**
 * CaseStudyTextColumns — multi-column text grid.
 * Each column has an optional small tagline + heading + body paragraph.
 *
 * Used for:
 *  - Target Audience (B2C / B2B)
 *  - Goals (Business Goals / User Goals sub-blocks)
 *  - Research sub-sections (Competitor Analysis / Indirect Competitors)
 *  - Site Maps sub-block
 *
 * Mobile: stacks single column.
 */
type Column = {
  tagline?: string;
  heading: string;
  body: string;
};

export function CaseStudyTextColumns({
  heading,
  tagline,
  body,
  columns,
  cols = 2,
  align = "left",
}: {
  heading?: string;
  tagline?: string;
  body?: string;
  columns: Column[];
  cols?: 1 | 2 | 3;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  const wrapClass = isCenter ? "mx-auto max-w-3xl" : "";
  const gridClass =
    cols === 3
      ? "grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16"
      : cols === 2
        ? "grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16"
        : "space-y-8";

  return (
    <div className={`${wrapClass} space-y-6`}>
      {tagline && (
        <WordReveal
          as="p"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted"
        >
          {tagline}
        </WordReveal>
      )}
      {heading && (
        <WordReveal
          as="h2"
          className="font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
        >
          {heading}
        </WordReveal>
      )}
      {body && (
        <WordReveal
          as="p"
          className="text-base leading-relaxed text-ink-muted md:text-lg"
        >
          {body}
        </WordReveal>
      )}
      <div className={gridClass}>
        {columns.map((c, i) => (
          <div key={i} className="space-y-4">
            {c.tagline && (
              <WordReveal
                as="p"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted"
              >
                {c.tagline}
              </WordReveal>
            )}
            <WordReveal
              as="h3"
              className="font-sans text-xl font-bold leading-tight md:text-2xl"
            >
              {c.heading}
            </WordReveal>
            <WordReveal
              as="p"
              className="text-base leading-relaxed text-ink-muted md:text-lg"
            >
              {c.body}
            </WordReveal>
          </div>
        ))}
      </div>
    </div>
  );
}
