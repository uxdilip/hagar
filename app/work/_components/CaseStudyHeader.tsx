"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import SplitType from "split-type";
import { CaseStudyMedia } from "./CaseStudyMedia";
import type { MetaItem } from "@/lib/caseStudies";

/**
 * CaseStudyHeader — top of every case study page.
 *
 * If `meta[]` is provided (Timeline / Role / Tools / Platform), renders a
 * 4-up strip beneath the cover image (Figma-spec layout for sama-ai-listing).
 * Otherwise falls back to the small "client · year" line above the title.
 */
export function CaseStudyHeader({
  title,
  client,
  year,
  tagline,
  coverImage,
  meta,
}: {
  title: string;
  client: string;
  year: string;
  tagline: string;
  coverImage: string;
  meta?: MetaItem[];
}) {
  const rootRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLAnchorElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleInnerRef = useRef<HTMLSpanElement>(null);
  const taglineInnerRef = useRef<HTMLSpanElement>(null);
  const metaStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleEl = titleInnerRef.current;
    const taglineEl = taglineInnerRef.current;
    if (!titleEl || !taglineEl) return;

    const titleSplit = new SplitType(titleEl, { types: "words" });
    if (titleSplit.words) {
      gsap.set(titleSplit.words, {
        autoAlpha: 0,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      });
    }

    const taglineSplit = new SplitType(taglineEl, { types: "words" });
    if (taglineSplit.words) {
      gsap.set(taglineSplit.words, { opacity: 0 });
    }

    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(
      backRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    )
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      )
      .to(
        titleSplit.words ?? [],
        {
          autoAlpha: 1,
          clipPath: "polygon(0% 0%, 110% 0%, 100% 100%, 0% 100%)",
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .to(
        taglineSplit.words ?? [],
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "power1.inOut",
        },
        "-=0.4",
      );

    // Meta strip — staggered fade-in on scroll
    if (metaStripRef.current) {
      const items = metaStripRef.current.querySelectorAll<HTMLElement>(
        ".meta-strip-item",
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: metaStripRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    return () => {
      tl.kill();
      titleSplit.revert();
      taglineSplit.revert();
      if (backRef.current) gsap.set(backRef.current, { opacity: 1, y: 0, clearProps: "transform" });
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, y: 0, clearProps: "transform" });
    };
  }, []);

  return (
    <header ref={rootRef} className="pb-16 pt-24 md:pb-24 md:pt-40">
      <Link
        ref={backRef}
        href="/#work"
        className="mb-8 inline-block text-xs uppercase tracking-[0.3em] text-ink-muted hover:text-ink md:mb-12"
        data-name="link"
        data-text="Back"
      >
        ← Back to work
      </Link>

      <p
        ref={eyebrowRef}
        className="text-xs uppercase tracking-[0.3em] text-ink-muted"
      >
        {client} · {year}
      </p>

      <h1 className="mt-6 font-serif text-[clamp(40px,7vw,8rem)] font-normal leading-[0.95] tracking-tight text-ink">
        <span ref={titleInnerRef} className="inline-block">
          {title}
        </span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
        <span ref={taglineInnerRef} className="inline-block">
          {tagline}
        </span>
      </p>

      <div className="mt-16 md:mt-24">
        <CaseStudyMedia src={coverImage} alt={title} aspect="16/9" />
      </div>

      {/* 4-up meta strip — Timeline / Role / Tools / Platform */}
      {meta && meta.length > 0 && (
        <div
          ref={metaStripRef}
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 md:mt-16 md:grid-cols-4"
        >
          {meta.map((m) => (
            <div key={m.label} className="meta-strip-item">
              <p className="text-[11px] uppercase tracking-[0.25em] text-ink-muted">
                {m.label}
              </p>
              <p className="mt-2 text-base text-ink md:text-lg">{m.value}</p>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
