"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export function ProposalHero({
  logo,
  logoLabel,
  heading,
  body,
  heroImage,
  presentedTo,
  presentedBy,
}: {
  logo: string;
  logoLabel: string;
  heading: string;
  body: string;
  heroImage: string;
  presentedTo: { label: string; name: string };
  presentedBy: { label: string; name: string };
}) {
  const headingRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const renderHeading = () => {
    const parts = heading.split(/(\{h1\}.*?\{\/h1\})/g);
    return parts.map((part, i) => {
      const m = part.match(/\{h1\}(.*?)\{\/h1\}/);
      if (m) return <span key={i} className="text-[#6CD3A5]">{m[1]}</span>;
      return <span key={i}>{part}</span>;
    });
  };

  useEffect(() => {
    if (!headingRef.current || !bodyRef.current || !cardRef.current) return;
    const splits: SplitType[] = [];
    const tweens: gsap.core.Tween[] = [];

    [headingRef.current, bodyRef.current].forEach((el, i) => {
      const split = new SplitType(el, { types: "words" });
      splits.push(split);
      gsap.set(split.words, { opacity: 0, y: 20 });
      tweens.push(
        gsap.to(split.words, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.04,
          ease: "power2.out", delay: 0.3 + i * 0.2,
        })
      );
    });

    gsap.set(cardRef.current, { opacity: 0, scale: 0.96 });
    tweens.push(
      gsap.to(cardRef.current, { opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.3 })
    );

    return () => { tweens.forEach(t => t.kill()); splits.forEach(s => s.revert()); };
  }, []);

  return (
    <section className="relative bg-[#213F31] text-white">
      <div className="mx-auto grid min-h-[80vh] max-w-[1440px] grid-cols-1 md:min-h-[900px] md:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col justify-center gap-8 px-6 pt-16 md:px-16 md:pt-0">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt={logoLabel} className="h-10 w-auto md:h-14" />
            <span className="font-sans text-lg font-bold md:text-2xl">{logoLabel}</span>
          </div>
          <div className="space-y-6">
            <h1 className="font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              <span ref={headingRef} className="inline-block">{renderHeading()}</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-white/80 md:text-lg">
              <span ref={bodyRef} className="inline-block">{body}</span>
            </p>
          </div>
        </div>
        {/* Right */}
        <div ref={cardRef} className="relative flex flex-col bg-[#2B5442]">
          <div className="flex-1 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt="Hero" className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center justify-between gap-8 p-6 md:p-8">
            <div>
              <p className="text-base font-bold text-[#6CD3A5]">{presentedTo.label}</p>
              <p className="text-sm text-white">{presentedTo.name}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-[#6CD3A5]">{presentedBy.label}</p>
              <p className="text-sm text-white">{presentedBy.name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
