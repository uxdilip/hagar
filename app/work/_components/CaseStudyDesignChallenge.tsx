"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CaseStudyDesignChallenge — large callout box with quote-style framing.
 * Supports {h1}…{/h1} markup for highlighted phrases.
 *
 * Themes:
 *  - "light" (default): white card on tinted bg, dark text, blue highlights
 *  - "rose": rose-pink card, white text, gold highlights, big quote marks
 */
function renderHighlighted(text: string, highlightColor: string) {
  const parts = text.split(/(\{h1\}[\s\S]*?\{\/h1\})/g);
  return parts.map((part, i) => {
    const m = part.match(/^\{h1\}([\s\S]*?)\{\/h1\}$/);
    if (m) {
      return (
        <span key={i} style={{ color: highlightColor }}>
          {m[1]}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function CaseStudyDesignChallenge({
  label,
  text,
  theme = "light",
}: {
  label: string;
  text: string;
  theme?: "light" | "rose";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const isRose = theme === "rose";

  return (
    <div
      ref={ref}
      className={
        isRose
          ? "relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-8 py-16 shadow-sm md:px-16 md:py-20"
          : "mx-auto max-w-5xl rounded-3xl bg-white px-8 py-12 shadow-sm md:px-16 md:py-16"
      }
      style={isRose ? { backgroundColor: "#B76E79" } : undefined}
    >
      {isRose && (
        <>
          {/* Decorative quote marks */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-8 top-2 font-serif text-[72px] leading-none md:left-16 md:top-6"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            “
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-2 right-8 font-serif text-[72px] leading-none md:bottom-6 md:right-16"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            ”
          </span>
        </>
      )}
      <p
        className={
          isRose
            ? "text-center font-sans text-2xl font-bold leading-[1.4] text-white md:text-3xl lg:text-[36px]"
            : "font-serif text-2xl leading-[1.4] text-[#0F172A] md:text-3xl lg:text-[2rem]"
        }
      >
        {renderHighlighted(text, isRose ? "#D4A574" : "#006AE7")}
      </p>
      <p
        className={
          isRose
            ? "mt-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-white/70"
            : "mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted"
        }
      >
        {label}
      </p>
    </div>
  );
}
