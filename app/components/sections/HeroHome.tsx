"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { AnimWaves } from "@/app/components/ui/AnimWaves";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroHome — replicates Thomas's ViewHeroHome.
 * Full viewport, animated wave background, title + description pinned
 * to the bottom with word-by-word clip-path reveal. Header parallaxes
 * up slightly on scroll.
 */
export function HeroHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLSpanElement>(null);
  const descInnerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const titleEl = titleInnerRef.current;
    const descEl = descInnerRef.current;
    if (!section || !header || !titleEl || !descEl) return;

    const splits: SplitType[] = [];
    const tweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      // Parallax-lift on the header when user scrolls past the hero
      gsap.to(header, {
        y: -40,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom-=200",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Word reveal on title + description (Thomas's CommonAbstract pattern)
      const setupWordReveal = (el: HTMLElement, delay: number) => {
        const split = new SplitType(el, { types: "words" });
        if (!split.words || split.words.length === 0) return;
        splits.push(split);
        gsap.set(split.words, {
          autoAlpha: 0,
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        });
        tweens.push(
          gsap.to(split.words, {
            autoAlpha: 1,
            clipPath: "polygon(0% 0%, 110% 0%, 100% 100%, 0% 100%)",
            delay,
            duration: 0.4,
            ease: "power1.out",
            stagger: 0.03,
          }),
        );
      };

      setupWordReveal(titleEl, 3.4);
      setupWordReveal(descEl, 3.7);
    }, section);

    return () => {
      tweens.forEach((t) => t.kill());
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden px-4 md:px-16"
      style={{ minHeight: "100dvh" }}
    >
      {/* Animated wave background (PixiJS — direct port of Thomas's AnimWaves) */}
      <AnimWaves />

      {/* Bottom-pinned header */}
      <div
        ref={headerRef}
        className="absolute inset-x-4 bottom-0 z-20 pb-4 md:inset-x-16"
      >
        <div className="w-[80%] lg:w-[70%] xl:w-[55%]">
          <h1
            className="m-0 font-sans text-[clamp(54px,8vw,120px)] font-medium leading-[1.1] text-ink"
          >
            <span ref={titleInnerRef} className="inline-block">
              UI/UX Designer
            </span>
          </h1>
          <p
            className="mt-4 font-sans text-[clamp(16px,1.6vw,24px)] font-normal leading-[1.5] text-ink"
          >
            <span ref={descInnerRef} className="inline-block">
              I craft digital experiences that feel natural and delightful —
              combining research, strategy, and visual design to solve real
              problems.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
