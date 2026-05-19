"use client";

import { WordReveal } from "./CaseStudyText";

export function ProposalSectionHeader({
  tagline,
  heading,
  body,
  bg = "light",
}: {
  tagline: string;
  heading: string;
  body?: string;
  bg?: "dark" | "light";
}) {
  const isDark = bg === "dark";
  return (
    <div className="mx-auto max-w-3xl space-y-4 text-center">
      <WordReveal as="p" className={`text-sm font-semibold uppercase tracking-[0.2em] ${isDark ? "text-white" : "text-[#213F31]"}`}>
        {tagline}
      </WordReveal>
      <WordReveal as="h2" className={`font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl ${isDark ? "text-[#6CD3A5]" : "text-[#213F31]"}`}>
        {heading}
      </WordReveal>
      {body && (
        <WordReveal as="p" className={`mx-auto max-w-2xl text-base leading-relaxed md:text-lg ${isDark ? "text-white/80" : "text-[#213F31]/80"}`}>
          {body}
        </WordReveal>
      )}
    </div>
  );
}
