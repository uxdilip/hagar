"use client";

import { WordReveal } from "./CaseStudyText";

/**
 * ProposalFeatureText — matches Figma node 12340:3927 exactly.
 *
 * Structure:
 * - Centered header: tagline (16px semibold) + H2 (48px bold), both #213F31
 * - Alternating horizontal rows: image (fill, 640px h) + text (H3 40px + body 18px)
 *   with 80px gap between them. Rows alternate image side.
 *
 * Colors: text is always #213F31 on #E1F6ED background (handled by parent wrapper).
 */
export function ProposalFeatureText({
  heading,
  tagline,
  items,
}: {
  heading: string;
  tagline?: string;
  headerBody?: string;
  bg?: "dark" | "light";
  items: {
    eyebrow: string;
    body: string;
    image: string;
    imageOnRight?: boolean;
  }[];
}) {
  return (
    <div className="space-y-20">
      {/* Centered header */}
      <div className="flex flex-col items-center gap-4 text-center">
        {tagline && (
          <p className="text-base font-semibold text-[#213F31]">{tagline}</p>
        )}
        <WordReveal
          as="h2"
          className="font-serif text-4xl leading-[1.2] tracking-tight text-[#213F31] md:text-5xl"
        >
          {heading}
        </WordReveal>
      </div>

      {/* Alternating rows */}
      {items.map((item, i) => {
        const imgRight = item.imageOnRight ?? i % 2 === 1;
        return (
          <div
            key={i}
            className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20"
          >
            {/* Image */}
            <div className={imgRight ? "order-2 md:order-2" : "order-2 md:order-1"}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.eyebrow}
                className="h-auto w-full rounded-none object-cover md:h-[640px]"
                loading="lazy"
              />
            </div>
            {/* Text */}
            <div className={`space-y-6 ${imgRight ? "order-1 md:order-1" : "order-1 md:order-2"}`}>
              <WordReveal
                as="h3"
                className="font-sans text-3xl font-bold leading-[1.2] text-[#213F31] md:text-[40px]"
              >
                {item.eyebrow}
              </WordReveal>
              <WordReveal
                as="p"
                className="text-base leading-[1.5] text-[#213F31] md:text-lg"
              >
                {item.body}
              </WordReveal>
            </div>
          </div>
        );
      })}
    </div>
  );
}
