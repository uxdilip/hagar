"use client";

import { CaseStudyMedia } from "./CaseStudyMedia";

/**
 * CaseStudyMediaGrid — 2-column image grid where each image gets its own
 * ken burns animation. Stacks vertically on mobile.
 */
export function CaseStudyMediaGrid({
  images,
}: {
  images: { src: string; alt?: string; aspect?: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      {images.map((img, i) => (
        <CaseStudyMedia
          key={i}
          src={img.src}
          alt={img.alt}
          aspect={img.aspect}
        />
      ))}
    </div>
  );
}
