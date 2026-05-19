"use client";

import { CaseStudyMedia } from "./CaseStudyMedia";
import { CaseStudySectionIntro } from "./CaseStudySectionIntro";
import { WordReveal } from "./CaseStudyText";

/**
 * CaseStudyPersonas — alternating left/right rows.
 * Each row: persona image on one side, content on the other.
 * Content: heading + body + JOBS-TO-BE-DONE quote subsection.
 *
 * Mobile: stacks (image always above text, single column).
 */
export function CaseStudyPersonas({
  tagline,
  heading,
  items,
}: {
  tagline: string;
  heading: string;
  items: {
    image: string;
    heading: string;
    body: string;
    jtbd: string;
  }[];
}) {
  return (
    <div className="space-y-24 md:space-y-32">
      <CaseStudySectionIntro tagline={tagline} heading={heading} />

      {items.map((p, i) => {
        const imageOnRight = i % 2 === 1;
        return (
          <div
            key={p.heading}
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
                  aspect="4/5"
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

              <div className="mt-4 space-y-3 border-t border-ink/10 pt-6">
                <WordReveal
                  as="p"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted"
                >
                  Jobs-to-be-done
                </WordReveal>
                <WordReveal
                  as="p"
                  className="text-base leading-relaxed text-ink md:text-lg"
                >
                  {p.jtbd}
                </WordReveal>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
