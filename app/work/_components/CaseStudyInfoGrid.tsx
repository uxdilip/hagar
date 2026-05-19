"use client";

import { WordReveal } from "./CaseStudyText";

/**
 * CaseStudyInfoGrid — 2-col layout with Challenge/Perspective on the left
 * and a metadata box on the right (Client / Year / Role / etc.).
 *
 * All text uses word-by-word fade. Meta items fade in with stagger.
 *
 * Mobile: stacks vertically, meta becomes a compact list above the body.
 */
export function CaseStudyInfoGrid({
  challenge,
  perspective,
  meta,
}: {
  challenge: string;
  perspective: string;
  meta: { label: string; value: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
      <div className="md:col-span-2">
        <WordReveal
          as="h2"
          className="font-serif text-3xl leading-tight md:text-5xl"
        >
          Challenge
        </WordReveal>
        <WordReveal
          as="p"
          className="mt-4 text-lg leading-relaxed text-ink-muted md:text-xl"
        >
          {challenge}
        </WordReveal>

        <WordReveal
          as="h2"
          className="mt-12 font-serif text-3xl leading-tight md:text-5xl md:mt-16"
        >
          Perspective
        </WordReveal>
        <WordReveal
          as="p"
          className="mt-4 text-lg leading-relaxed text-ink-muted md:text-xl"
        >
          {perspective}
        </WordReveal>
      </div>

      <dl className="space-y-5 border-t border-ink/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="text-[11px] uppercase tracking-[0.25em] text-ink-muted">
              {m.label}
            </dt>
            <dd className="mt-1.5 text-base text-ink">{m.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
