"use client";

import { CaseStudyMedia } from "./CaseStudyMedia";
import { WordReveal } from "./CaseStudyText";
import { getAdjacent } from "@/lib/caseStudies";

/**
 * CaseStudyStepper — prev/next case study navigation at the bottom.
 *
 * Uses native <a> tags (full page reload) instead of Next.js Link.
 * This guarantees the new page starts at the top with a fresh Lenis
 * instance — no scroll-position-stuck-mid-page bugs from client-side
 * navigation racing with Lenis's cached state.
 */
export function CaseStudyStepper({ slug }: { slug: string }) {
  const adjacent = getAdjacent(slug);
  if (!adjacent) return null;
  const { prev, next } = adjacent;

  return (
    <nav className="mt-32 grid grid-cols-1 gap-12 border-t border-ink/10 pt-16 md:mt-40 md:grid-cols-2 md:gap-16 md:pt-24">
      {/* Previous */}
      <a href={`/work/${prev.slug}`} className="group block">
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink-muted">
          ← Previous project
        </p>
        <div className="mt-6 transition-transform duration-700 group-hover:scale-[1.02]">
          <CaseStudyMedia src={prev.coverImage} alt={prev.title} aspect="4/3" />
        </div>
        <WordReveal
          as="h3"
          className="mt-6 font-serif text-2xl leading-tight transition-colors md:text-4xl"
        >
          {prev.title}
        </WordReveal>
        <p className="mt-2 text-xs uppercase tracking-widest text-ink-muted">
          {prev.client} · {prev.year}
        </p>
      </a>

      {/* Next */}
      <a href={`/work/${next.slug}`} className="group block md:text-right">
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink-muted">
          Next project →
        </p>
        <div className="mt-6 transition-transform duration-700 group-hover:scale-[1.02]">
          <CaseStudyMedia src={next.coverImage} alt={next.title} aspect="4/3" />
        </div>
        <WordReveal
          as="h3"
          className="mt-6 font-serif text-2xl leading-tight transition-colors md:text-4xl"
        >
          {next.title}
        </WordReveal>
        <p className="mt-2 text-xs uppercase tracking-widest text-ink-muted">
          {next.client} · {next.year}
        </p>
      </a>
    </nav>
  );
}
