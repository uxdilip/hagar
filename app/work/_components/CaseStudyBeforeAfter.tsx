"use client";

import { CaseStudyMedia } from "./CaseStudyMedia";
import { WordReveal } from "./CaseStudyText";

type Item = {
  image: string;
  /** Heading shown next to the image */
  heading: string;
  /** Bulleted list of changes shown with check icons */
  points: string[];
  /** Whether image is on left or right (alternates by index in the list) */
  imagePosition?: "left" | "right";
};

/**
 * CaseStudyBeforeAfter — image with Before/After tags + checklist of changes.
 * Used in Mirror's "Iterations & Fixes" section.
 *
 * Layout:
 *  - Image (with small "Before" + "After" tags overlaid)
 *  - Content: heading + bulleted list with check icons
 *
 * Items alternate left/right when rendered as a list.
 *
 * Mobile: stacks (image above content).
 */
export function CaseStudyBeforeAfterRow({
  image,
  heading,
  points,
  imagePosition = "left",
}: Item) {
  const imageOnRight = imagePosition === "right";

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
      {/* Image with Before/After tags */}
      <div
        className={
          imageOnRight ? "order-1 md:order-2" : "order-1 md:order-1"
        }
      >
        {/* Outer relative wrapper does NOT clip — tags can sit slightly above
            the image edge to match Figma's overflow design. The inner div
            handles the rounded clipping. */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <CaseStudyMedia src={image} alt={heading} aspect="1/1" />
          </div>
          {/* Before tag — over the LEFT phone, just inside the top */}
          <span className="absolute left-[14%] top-3 z-10 rounded-md bg-[#EEEEEE] px-2 py-1 text-xs font-semibold text-ink shadow-sm">
            Before
          </span>
          {/* After tag — over the RIGHT phone, peeking slightly above the
              image edge (matches Figma's design where it sits at -15px y) */}
          <span className="absolute right-[14%] top-[-12px] z-10 rounded-md bg-[#EEEEEE] px-2 py-1 text-xs font-semibold text-ink shadow-sm">
            After
          </span>
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
        <WordReveal
          as="h3"
          className="font-serif text-3xl leading-[1.1] tracking-tight md:text-4xl"
        >
          {heading}
        </WordReveal>
        <ul className="space-y-3">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/work/mirror-booking/icons/check-circle.svg"
                alt=""
                aria-hidden
                className="mt-1 h-4 w-4 flex-shrink-0"
              />
              <span className="text-base leading-relaxed text-ink-muted md:text-lg">
                {p}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CaseStudyBeforeAfter({ items }: { items: Item[] }) {
  return (
    <div className="space-y-24 md:space-y-32">
      {items.map((it, i) => (
        <CaseStudyBeforeAfterRow
          key={i}
          {...it}
          imagePosition={i % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
}
