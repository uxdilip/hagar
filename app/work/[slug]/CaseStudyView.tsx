"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "@/lib/caseStudies";
import { PasswordGate } from "../_components/PasswordGate";
import { ScrollProgress } from "../_components/ScrollProgress";
import { CaseStudyHeader } from "../_components/CaseStudyHeader";
import { CaseStudyStepper } from "../_components/CaseStudyStepper";
import { SectionRenderer } from "../_components/SectionRenderer";

gsap.registerPlugin(ScrollTrigger);

const AUTH_KEY = "caseStudyAuth";

/**
 * Renders a single case study with a password gate overlay.
 *
 * Permanent scroll-stuck fix: a ResizeObserver watches the article element
 * for ANY height change (image load, font swap, layout shift) and refreshes
 * ScrollTrigger so trigger positions stay in sync with actual page height.
 * This solves the recurring "can't scroll past section X" issue caused by
 * images loading async on long pages.
 */
export function CaseStudyView({ study }: { study: CaseStudy }) {
  const articleRef = useRef<HTMLElement>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem(AUTH_KEY, "1");
    setAuthed(true);
  };

  // Watch the article for height changes and refresh ScrollTrigger
  // each time the layout shifts. Debounced to avoid thrashing.
  useEffect(() => {
    if (authed !== true) return; // only after gate dismissed
    const el = articleRef.current;
    if (!el) return;

    let lastHeight = 0;
    let timeoutId: number | undefined;
    const debouncedRefresh = () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const lenis = (window as unknown as { __lenis?: unknown }).__lenis as { resize?: () => void } | undefined;
        if (lenis?.resize) lenis.resize();
        ScrollTrigger.refresh(true);
      }, 200);
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.contentRect.height;
        if (Math.abs(h - lastHeight) < 2) continue;
        lastHeight = h;
        debouncedRefresh();
      }
    });
    ro.observe(el);

    // Safety nets for slow-loading images
    const t1 = window.setTimeout(() => debouncedRefresh(), 3000);
    const t2 = window.setTimeout(() => debouncedRefresh(), 6000);

    return () => {
      ro.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [authed]);

  // Avoid flashing locked content before sessionStorage check completes
  if (authed === null) {
    return <div className="min-h-screen bg-bg" />;
  }

  return (
    <>
      <ScrollProgress />
      {!authed && <PasswordGate onUnlock={handleUnlock} />}

      {study.layout === "proposal" ? (
        <article ref={articleRef} className="min-h-screen bg-[#213F31]">
          {study.sections.map((section, i) => {
            const bg = (section as { bg?: string }).bg;
            const sectionBg =
              bg === "light" ? "bg-[#E1F6ED]" : "bg-[#213F31]";
            if (section.type === "proposal-hero") {
              return <SectionRenderer key={i} section={section} />;
            }
            return (
              <section key={i} className={`${sectionBg} px-6 py-20 md:px-16 md:py-28`}>
                <div className="mx-auto max-w-[1312px]">
                  <SectionRenderer section={section} />
                </div>
              </section>
            );
          })}
          <div className="bg-bg px-6 py-8 md:px-16">
            <div className="mx-auto max-w-[1312px]">
              <CaseStudyStepper slug={study.slug} />
            </div>
          </div>
        </article>
      ) : (
        <article ref={articleRef} className="min-h-screen bg-bg">
          <div className="mx-auto max-w-[1460px] px-4 md:px-16">
            <CaseStudyHeader
              title={study.title}
              client={study.client}
              year={study.year}
              tagline={study.tagline}
              coverImage={study.coverImage}
              meta={study.meta}
            />

            {/* Sections */}
            <div className="space-y-24 pb-16 md:space-y-56 md:pb-28">
              {study.sections.map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}
            </div>

            <CaseStudyStepper slug={study.slug} />
          </div>
        </article>
      )}
    </>
  );
}
