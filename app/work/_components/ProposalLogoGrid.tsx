"use client";

import { WordReveal } from "./CaseStudyText";

/**
 * ProposalLogoGrid — matches Figma node 12340:4044 (Competitive Analysis).
 *
 * Structure:
 * - Left-aligned H2 (mint) + body (white), gap 24px
 * - Flex-wrap row of logo cards, gap 8px
 * - Each card: fixed 296px width, padding 14px, centered, white bg so
 *   black text in the screenshots is visible against the dark section bg.
 */
export function ProposalLogoGrid({
  heading,
  headerBody,
  logos,
}: {
  heading: string;
  headerBody?: string;
  logos: { src: string; alt: string }[];
}) {
  return (
    <div className="space-y-20">
      {/* Left-aligned header */}
      <div className="space-y-6">
        <WordReveal
          as="h2"
          className="font-serif text-4xl leading-[1.2] tracking-tight text-[#6CD3A5] md:text-5xl"
        >
          {heading}
        </WordReveal>
        {headerBody && (
          <p className="max-w-3xl text-base leading-relaxed text-white md:text-lg">
            {headerBody}
          </p>
        )}
      </div>

      {/* Logo grid — 3 columns × 2 rows */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {logos.map((l, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded bg-white/95 p-3.5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={l.src}
              alt={l.alt}
              className="h-auto max-h-[260px] w-auto max-w-[220px] object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
