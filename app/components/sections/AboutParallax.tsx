"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutParallax — replicates Thomas's ViewParallaxHome.
 * Full viewport, sea-parallax.jpg background that moves slower than scroll,
 * "About" heading + description overlayed with word-by-word reveal.
 */
export function AboutParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    if (!section || !bg || !title || !desc) return;

    const ctx = gsap.context(() => {
      // Background parallax — moves -25vh over the scroll range
      const parallaxDistance = -window.innerHeight * 0.25;
      gsap.to(bg, {
        y: parallaxDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          fastScrollEnd: true,
        },
        force3D: true,
      });

      // Word-reveal on title + description when section enters
      const setupWordReveal = (el: HTMLElement, delay: number) => {
        const split = new SplitType(el, { types: "words" });
        if (!split.words) return () => {};
        gsap.set(split.words, {
          autoAlpha: 0,
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        });
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          once: true,
          onEnter: () => {
            gsap.to(split.words!, {
              autoAlpha: 1,
              clipPath: "polygon(0% 0%, 110% 0%, 100% 100%, 0% 100%)",
              delay,
              duration: 0.4,
              ease: "power1.out",
              stagger: 0.03,
            });
          },
        });
        return () => {
          trigger.kill();
          split.revert();
        };
      };

      const cleanupTitle = setupWordReveal(title, 0);
      const cleanupDesc = setupWordReveal(desc, 0.2);

      return () => {
        cleanupTitle();
        cleanupDesc();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden bg-ink"
      style={{ minHeight: "100dvh" }}
    >
      {/* Parallax background image */}
      <div className="absolute inset-0 overflow-hidden">
        <span
          ref={bgRef}
          className="absolute inset-0 block h-[130vh] w-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/img/sea-parallax.jpg')",
            backgroundPosition: "70% top",
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 w-full px-4 py-16 md:px-16 md:py-32 lg:px-32">
        <div className="w-full md:w-[75%]">
          <h2
            ref={titleRef}
            className="m-0 font-sans text-[clamp(36px,5vw,72px)] font-medium leading-[1.2] text-white"
          >
            About
          </h2>
          <p
            ref={descRef}
            className="mt-6 font-sans text-[clamp(16px,1.4vw,20px)] font-normal leading-[1.6] text-white/90"
          >
            Learn more about my journey and design philosophy — working at the
            intersection of research, interaction, and craft.
          </p>
        </div>
      </div>
    </section>
  );
}
