"use client";

import { WordReveal } from "./CaseStudyText";

/**
 * CaseStudyQuote — large centered pull quote.
 * Quote text uses word-by-word fade. Author fades in below.
 */
export function CaseStudyQuote({
  text,
  author,
}: {
  text: string;
  author?: string;
}) {
  return (
    <blockquote className="mx-auto max-w-4xl text-center">
      <WordReveal
        as="p"
        className="font-serif text-3xl leading-[1.2] tracking-tight md:text-5xl lg:text-6xl"
      >
        {`"${text}"`}
      </WordReveal>
      {author && (
        <footer className="mt-8">
          <WordReveal
            as="span"
            className="text-xs uppercase tracking-[0.3em] text-ink-muted"
          >
            {`— ${author}`}
          </WordReveal>
        </footer>
      )}
    </blockquote>
  );
}
