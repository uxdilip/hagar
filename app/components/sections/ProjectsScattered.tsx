"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/**
 * ProjectsScattered — "Selected Work" section.
 *
 * Adapted from StringTune's reveal-on-scroll tutorial.
 * Scattered masonry grid on a 14-col layout. Each image reveals with
 * scale (2→1) + opacity (0→1) + clip-path (center → full rectangle)
 * over 1.5s with `cubic-bezier(0.86, 0, 0.31, 1)`.
 *
 * Animation plays forward on scroll-in AND reverses on scroll-out, so
 * scrolling up/down re-triggers the reveal each time (matches tutorial).
 *
 * Grid is laid out as pair+single+single across 3 rows, with per-item
 * margin-top offsets for asymmetric rhythm without huge vertical gaps.
 */

type Project = {
  slug: string;
  name: string;
  year: string;
  tags: string[];
  image: string;
  slot: 1 | 2 | 3 | 4;
};

const projects: Project[] = [
  {
    slug: "fintech-dashboard",
    name: "FinTech Dashboard",
    year: "2024",
    tags: ["Dashboard", "Data Viz"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    slot: 1,
  },
  {
    slug: "healthcare-app",
    name: "Healthcare Mobile App",
    year: "2024",
    tags: ["Mobile", "Accessibility"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=1000&fit=crop",
    slot: 2,
  },
  {
    slug: "elearning-platform",
    name: "E-Learning Platform",
    year: "2024",
    tags: ["EdTech", "Web App"],
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop",
    slot: 3,
  },
  {
    slug: "design-system",
    name: "Design System",
    year: "2024",
    tags: ["Design System", "Tokens"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
    slot: 4,
  },
];

export function ProjectsScattered() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header word reveal (title — plays once, feels like a section intro)
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: "words" });
        if (split.words) {
          gsap.set(split.words, {
            autoAlpha: 0,
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          });
          ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(split.words!, {
                autoAlpha: 1,
                clipPath: "polygon(0% 0%, 110% 0%, 100% 100%, 0% 100%)",
                duration: 0.5,
                ease: "power1.out",
                stagger: 0.04,
              });
            },
          });
        }
      }

      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // Scattered image reveals — bidirectional.
      // toggleActions: onEnter, onLeave, onEnterBack, onLeaveBack
      // "play reverse play reverse" = replay on every re-entry.
      const figures = gsap.utils.toArray<HTMLElement>(".scattered-figure");
      figures.forEach((figure) => {
        const img = figure.querySelector<HTMLImageElement>("img");
        const caption = figure.parentElement?.querySelector<HTMLElement>(
          ".scattered-caption",
        );
        if (!img) return;

        gsap.set(img, {
          scale: 2,
          opacity: 0,
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        });

        if (caption) {
          gsap.set(caption, { autoAlpha: 0, y: 8 });
        }

        gsap.to(img, {
          scale: 1,
          opacity: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "cubic-bezier(0.86, 0, 0.31, 1)",
          scrollTrigger: {
            trigger: figure,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        });

        if (caption) {
          gsap.to(caption, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: figure,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative px-4 py-32 md:px-16 md:py-40 xl:px-24"
    >
      {/* Section header */}
      <div className="mx-auto mb-20 w-full max-w-[1600px]">
        <span
          ref={labelRef}
          className="block text-[11px] uppercase tracking-[0.3em] text-ink-muted"
        >
          · Selected Work · 2024
        </span>
        <h2
          ref={titleRef}
          className="mt-6 font-serif text-[clamp(64px,14vw,11rem)] font-normal leading-[0.9] tracking-tight text-ink"
        >
          Recent work.
        </h2>
      </div>

      {/* Scattered grid */}
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="scattered-grid">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              data-name="view"
              data-text="View"
              className={`scattered-item scattered-item--${project.slot}`}
            >
              <figure className="scattered-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={project.name} loading="lazy" />
              </figure>
              <figcaption className="scattered-caption">
                <span className="scattered-caption__name">{project.name}</span>
                <span className="scattered-caption__meta">
                  {project.tags.map((t) => `[ ${t} ]`).join(" ")}
                  <span className="scattered-caption__year">{project.year}</span>
                </span>
              </figcaption>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .scattered-grid {
          display: grid;
          grid-template-columns: repeat(14, 1fr);
          grid-auto-rows: min-content;
          align-items: start;
          column-gap: 0.4rem;
          row-gap: clamp(2rem, 4vw, 3rem);
        }

        .scattered-item {
          display: block;
          text-decoration: none;
          color: inherit;
          pointer-events: all;
        }

        .scattered-figure {
          overflow: hidden;
          margin: 0;
          background: color-mix(in srgb, var(--color-ink) 4%, transparent);
          aspect-ratio: 4 / 3;
        }
        .scattered-figure img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform, clip-path, opacity;
        }

        .scattered-caption {
          margin-top: 12px;
          font-family: var(--font-nunito), sans-serif;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-ink);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .scattered-caption__name {
          font-weight: 500;
        }
        .scattered-caption__meta {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          font-size: 0.7rem;
          color: var(--color-ink-muted);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: 0.04em;
        }
        .scattered-caption__year {
          white-space: nowrap;
        }

        /* Mobile: single column, stacked */
        .scattered-item {
          grid-column: 1 / 15;
        }

        /* Tablet & up: scattered grid (3 rows, pair + single + single) */
        @media (min-width: 768px) {
          .scattered-item--1 {
            grid-row: 1;
            grid-column: 2 / 8;
          }
          .scattered-item--1 .scattered-figure {
            aspect-ratio: 4 / 3;
          }

          .scattered-item--2 {
            grid-row: 1;
            grid-column: 10 / 14;
            margin-top: 4rem;
          }
          .scattered-item--2 .scattered-figure {
            aspect-ratio: 4 / 5;
          }

          .scattered-item--3 {
            grid-row: 2;
            grid-column: 3 / 10;
          }
          .scattered-item--3 .scattered-figure {
            aspect-ratio: 16 / 10;
          }

          .scattered-item--4 {
            grid-row: 3;
            grid-column: 8 / 14;
          }
          .scattered-item--4 .scattered-figure {
            aspect-ratio: 4 / 3;
          }
        }

        /* Hover scale */
        @media (hover: hover) {
          .scattered-figure img {
            transition: transform 0.9s cubic-bezier(0.2, 0.9, 0.3, 1);
          }
          .scattered-item:hover .scattered-figure img {
            transform: scale(1.04);
          }
        }
      `}</style>
    </section>
  );
}
