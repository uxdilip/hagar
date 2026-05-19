"use client";

import { WordReveal } from "./CaseStudyText";

export function ProposalContact({
  heading,
  contactLabel,
  email,
  website,
  socials,
  image,
}: {
  heading: string;
  contactLabel: string;
  email: string;
  website: string;
  socials: { label: string; href: string; icon: string }[];
  image: string;
}) {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <WordReveal as="h2" className="font-serif text-3xl leading-[1.1] tracking-tight text-[#6CD3A5] md:text-5xl">
            {heading}
          </WordReveal>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">{contactLabel}</p>
            <a href={`mailto:${email}`} className="block text-sm text-white/80 underline">{email}</a>
            <a href={website} target="_blank" rel="noopener noreferrer" className="block text-sm text-white/80 underline">{website}</a>
          </div>
          <div className="flex gap-3">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt={s.label} className="h-6 w-6 opacity-80 transition-opacity hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Credits" className="w-full object-contain" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
