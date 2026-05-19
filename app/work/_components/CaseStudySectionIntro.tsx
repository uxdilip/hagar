"use client";

import { WordReveal } from "./CaseStudyText";

/**
 * CaseStudySectionIntro — small tagline + large heading + lede paragraph.
 *
 * Tagline and body are both optional. `align` controls horizontal alignment
 * — "center" matches Figma's centered H2 variant used in sections like
 * "Defining the Problem", "Our Users", "Iterations & Fixes".
 */
export function CaseStudySectionIntro({
  tagline,
  heading,
  body,
  align = "left",
}: {
  tagline?: string;
  heading: string;
  body?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div
      className={
        isCenter
          ? "mx-auto max-w-3xl space-y-6 text-center"
          : "space-y-6"
      }
    >
      {tagline && (
        <WordReveal
          as="p"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted"
        >
          {tagline}
        </WordReveal>
      )}
      <WordReveal
        as="h2"
        className="font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
      >
        {heading}
      </WordReveal>
      {body && (
        <WordReveal
          as="p"
          className={
            isCenter
              ? "mx-auto max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
              : "max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl"
          }
        >
          {body}
        </WordReveal>
      )}
    </div>
  );
}
