"use client";

import { CaseStudyMedia } from "./CaseStudyMedia";

/**
 * CaseStudyPrototypeShowcase — image card with a CTA button positioned
 * over the bottom-right corner. Used for "View B2C Prototype" / "View B2B
 * Prototype" cards in Mirror's UI + Prototype section.
 *
 * Mobile: button moves below the image (no overlay).
 */
export function CaseStudyPrototypeShowcase({
  image,
  alt,
  buttonLabel,
  buttonHref,
}: {
  image: string;
  alt?: string;
  buttonLabel: string;
  buttonHref: string;
}) {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <CaseStudyMedia src={image} alt={alt ?? buttonLabel} aspect="16/10" />
      </div>
      <a
        href={buttonHref}
        target="_blank"
        rel="noopener noreferrer"
        data-name="link"
        data-text="Open"
        className="mt-4 inline-flex items-center gap-3 rounded-md border border-ink bg-ink px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-bg hover:text-ink md:absolute md:bottom-6 md:right-6 md:mt-0"
      >
        <span className="underline underline-offset-4">{buttonLabel}</span>
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
