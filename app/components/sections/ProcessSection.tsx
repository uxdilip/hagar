"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discover",
    accent: "plum" as const,
    desc: "Research, user interviews, competitive analysis. Understanding the problem space before jumping to solutions.",
    activities: [
      "Stakeholder workshops & user interviews",
      "Heuristic audits & analytics deep-dives",
      "Competitive landscape mapping",
      "Foundational research synthesis",
    ],
  },
  {
    num: "02",
    title: "Define",
    accent: "gold" as const,
    desc: "Synthesize findings into clear problem statements, user personas, and design principles that guide every decision.",
    activities: [
      "Affinity mapping & journey maps",
      "Jobs-to-be-Done frameworks",
      "User personas & problem statements",
      "Prioritized opportunity areas",
    ],
  },
  {
    num: "03",
    title: "Design",
    accent: "plum" as const,
    desc: "Wireframes → prototypes → high-fidelity UI. Iterative design with constant feedback loops and usability testing.",
    activities: [
      "Lo-fi sketches & wireframes",
      "Interactive Figma prototypes",
      "Design tokens & component systems",
      "Usability tests with real users",
    ],
  },
  {
    num: "04",
    title: "Deliver",
    accent: "gold" as const,
    desc: "Polished handoff with specs, design systems, and developer collaboration. The work doesn't end at the mockup.",
    activities: [
      "Annotated specs & dev handoff",
      "Component libraries & Storybook docs",
      "QA reviews & polish passes",
      "Post-launch analytics tracking",
    ],
  },
];

function FlipCard({ step }: { step: (typeof steps)[0] }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    if (!cardRef.current) return;
    const next = !flipped;
    setFlipped(next);
    gsap.to(cardRef.current, {
      rotateY: next ? 180 : 0,
      duration: 0.6,
      ease: "back.out(1.4)",
    });
  };

  const numClass = step.accent === "plum"
    ? "font-serif text-8xl leading-none text-plum/25 transition-colors duration-500 group-hover:text-plum/45"
    : "font-serif text-8xl leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold/45";

  const backNumClass = step.accent === "plum"
    ? "font-serif text-6xl leading-none text-plum/20"
    : "font-serif text-6xl leading-none text-gold/20";

  return (
    <div
      className="process-card group shrink-0 cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1.5"
      style={{ perspective: "1200px", width: "400px", height: "500px" }}
      onClick={handleFlip}
    >
      <div
        ref={cardRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-ink/5 bg-white p-10 shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className={numClass}>{step.num}</span>
          <div>
            <h3 className="relative inline-block font-serif text-3xl">
              {step.title}
              <span aria-hidden className="absolute -bottom-1 left-0 block h-px w-full origin-left scale-x-0 bg-ink/40 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              {step.desc}
            </p>
            <p className="mt-4 text-xs text-ink-muted/60">Click to flip →</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-ink/5 bg-ink p-10 text-white shadow-sm"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className={backNumClass}>{step.num}</span>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/40">What I do</p>
          <ul className="mt-4 space-y-2.5">
            {step.activities.map((activity) => (
              <li key={activity} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                <span aria-hidden className="mt-2.5 inline-block h-px w-3 shrink-0 bg-white/40" />
                <span>{activity}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-white/40">Click to flip back</p>
        </div>
      </div>
    </div>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const titleEl = titleInnerRef.current;
    if (!section || !track || !titleEl) return;

    const mm = gsap.matchMedia();

    // Word-by-word reveal on heading
    let cleanupSplit: (() => void) | null = null;
    import("split-type").then(({ default: SplitType }) => {
      const split = new SplitType(titleEl, { types: "words" });
      if (!split.words) return;
      gsap.set(split.words, {
        autoAlpha: 0,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      });
      const tween = gsap.to(split.words, {
        autoAlpha: 1,
        clipPath: "polygon(0% 0%, 110% 0%, 100% 100%, 0% 100%)",
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
      cleanupSplit = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    });

    mm.add("(min-width: 1024px)", () => {
      // Track has width: max-content, so offsetWidth = full natural width.
      const getScrollAmount = () => track.offsetWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = section.querySelectorAll<HTMLElement>(".process-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    return () => {
      mm.revert();
      cleanupSplit?.();
    };
  }, []);

  return (
    <div>
      <section
        id="process"
        ref={sectionRef}
        className="relative overflow-hidden bg-bg"
      >
      {/* Desktop: full-viewport horizontal track */}
      <div className="hidden h-screen lg:block">
        <div
          ref={trackRef}
          className="flex h-full items-center"
          style={{ width: "max-content" }}
        >
          {/* Heading panel — first item in the track, moves at same speed as cards */}
          <div
            className="flex h-full shrink-0 flex-col justify-center pl-16 pr-24"
            style={{ width: "50vw" }}
          >
            <p className="text-sm uppercase tracking-widest text-ink-muted">
              Process
            </p>
            <h2
              className="mt-2 font-serif text-5xl leading-tight xl:text-7xl"
            >
              <span ref={titleInnerRef} className="inline-block">
                How I Work
              </span>
            </h2>
            <p className="mt-6 max-w-md text-ink-muted">
              A structured yet flexible approach to turning complex problems
              into elegant solutions. Scroll to explore each phase.
            </p>
          </div>

          {/* Cards */}
          <div className="flex shrink-0 items-center gap-8 pr-[15vw]">
            {steps.map((step, i) => (
              <FlipCard key={step.num} step={step} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex flex-col gap-8 px-4 py-24 md:px-16 lg:hidden">
        <div>
          <p className="text-sm uppercase tracking-widest text-ink-muted">
            Process
          </p>
          <h2 className="mt-2 font-serif text-4xl leading-tight md:text-5xl">
            How I Work
          </h2>
          <p className="mt-4 max-w-sm text-ink-muted">
            A structured yet flexible approach to turning complex problems into
            elegant solutions.
          </p>
        </div>
        {steps.map((step) => (
          <div
            key={step.num}
            className="process-card rounded-2xl border border-ink/5 bg-white p-8 shadow-sm"
          >
            <span className={`font-serif text-7xl leading-none ${step.accent === "plum" ? "text-plum/25" : "text-gold/25"}`}>
              {step.num}
            </span>
            <div className="mt-6">
              <h3 className="font-serif text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {step.desc}
              </p>
              <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-ink-muted/70">What I do</p>
              <ul className="mt-3 space-y-2 border-t border-ink/5 pt-4">
                {step.activities.map((activity) => (
                  <li key={activity} className="flex items-start gap-3 text-xs leading-relaxed text-ink-muted">
                    <span aria-hidden className="mt-2 inline-block h-px w-3 shrink-0 bg-ink/30" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
