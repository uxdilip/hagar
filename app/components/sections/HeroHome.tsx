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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    if (!section || !header || !title || !desc) return;

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
      const setupWordReveal = (
        el: HTMLElement,
        delay: number,
      ): (() => void) => {
        const split = new SplitType(el, { types: "words" });
        if (!split.words || split.words.length === 0) return () => {};
        gsap.set(split.words, {
          autoAlpha: 0,
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        });
        const tween = gsap.to(split.words, {
          autoAlpha: 1,
          clipPath: "polygon(0% 0%, 110% 0%, 100% 100%, 0% 100%)",
          delay,
          duration: 0.4,
          ease: "power1.out",
          stagger: 0.03,
        });
        return () => {
          tween.kill();
          split.revert();
        };
      };

      const cleanupTitle = setupWordReveal(title, 3.4);
      const cleanupDesc = setupWordReveal(desc, 3.7);

      return () => {
        cleanupTitle();
        cleanupDesc();
      };
    }, section);

    return () => ctx.revert();
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
            ref={titleRef}
            className="m-0 font-sans text-[clamp(54px,8vw,120px)] font-medium leading-[1.1] text-ink"
          >
            UI/UX Designer
          </h1>
          <p
            ref={descRef}
            className="mt-4 font-sans text-[clamp(16px,1.6vw,24px)] font-normal leading-[1.5] text-ink"
          >
            I craft digital experiences that feel natural and delightful —
            combining research, strategy, and visual design to solve real
            problems.
          </p>
        </div>
      </div>
    </section>
  );
}
