"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/**
 * Why the inner <span> wrapper?
 *
 * SplitType modifies the DOM by replacing text nodes with <span> elements.
 * If React's tracked children are the text nodes themselves, on unmount/update
 * React tries to removeChild() the original text node — but it has been replaced
 * by SplitType's spans. Result: "Failed to execute 'removeChild' on 'Node'".
 *
 * By wrapping the text in an inner span, React's tracked child of the outer tag
 * is a stable element (the span), and SplitType modifies the span's content. React
 * never sees the swap. Cleanup via split.revert() restores the original text
 * before the wrapper itself unmounts.
 */

// ─── CaseStudyText ────────────────────────────────────────────────────────────
export function CaseStudyText({
  heading,
  body,
  align = "left",
  className = "",
}: {
  heading?: string;
  body: string[];
  align?: "left" | "center";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>(".cs-split-inner");
    const splits: SplitType[] = [];
    const tweens: gsap.core.Tween[] = [];

    targets.forEach((target) => {
      const split = new SplitType(target, { types: "words" });
      if (!split.words) return;
      splits.push(split);

      tweens.push(
        gsap.from(split.words, {
          opacity: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power1.inOut",
          force3D: true,
          scrollTrigger: {
            trigger: target,
            start: "top 90%",
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
          },
        }),
      );
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      splits.forEach((s) => s.revert());
    };
  }, [heading, body]);

  return (
    <div
      ref={ref}
      className={`mx-auto ${
        align === "center" ? "text-center" : ""
      } max-w-3xl ${className}`}
    >
      {heading && (
        <h2 className="mb-6 font-serif text-3xl leading-tight md:text-5xl">
          <span className="cs-split-inner inline-block">{heading}</span>
        </h2>
      )}
      {body.map((p, i) => (
        <p
          key={i}
          className="mb-4 text-lg leading-relaxed text-ink-muted md:text-xl"
        >
          <span className="cs-split-inner">{p}</span>
        </p>
      ))}
    </div>
  );
}

// ─── WordReveal ───────────────────────────────────────────────────────────────
export function WordReveal({
  as: Tag = "div",
  children,
  className = "",
}: {
  as?: keyof React.JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
}) {
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "words" });
    if (!split.words) return;

    const tween = gsap.from(split.words, {
      opacity: 0,
      duration: 0.6,
      stagger: 0.04,
      ease: "power1.inOut",
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [children]);

  return (
    <Tag className={className}>
      <span ref={innerRef} className="inline-block">
        {children}
      </span>
    </Tag>
  );
}
