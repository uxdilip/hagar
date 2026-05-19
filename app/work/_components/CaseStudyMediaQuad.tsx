"use client";

import { CaseStudyMedia } from "./CaseStudyMedia";

/**
 * CaseStudyMediaQuad — 2×2 image grid where only the OUTER corners are
 * rounded (top-left, top-right, bottom-left, bottom-right of the whole grid),
 * giving the impression of a single rounded block split into 4 panes.
 *
 * Used in Mirror's "Research" section (4 inspiration / market images).
 *
 * Mobile: stacks 2x2 with all corners flat for cleaner stacking.
 */
export function CaseStudyMediaQuad({
  images,
}: {
  images: { src: string; alt?: string }[];
}) {
  // Expects exactly 4 images.
  const [tl, tr, bl, br] = images;

  return (
    <div className="grid grid-cols-2 gap-0">
      <div className="overflow-hidden md:rounded-tl-[64px]">
        <CaseStudyMedia src={tl.src} alt={tl.alt} aspect="1/1" />
      </div>
      <div className="overflow-hidden md:rounded-tr-[64px]">
        <CaseStudyMedia src={tr.src} alt={tr.alt} aspect="1/1" />
      </div>
      <div className="overflow-hidden md:rounded-bl-[64px]">
        <CaseStudyMedia src={bl.src} alt={bl.alt} aspect="1/1" />
      </div>
      <div className="overflow-hidden md:rounded-br-[64px]">
        <CaseStudyMedia src={br.src} alt={br.alt} aspect="1/1" />
      </div>
    </div>
  );
}
