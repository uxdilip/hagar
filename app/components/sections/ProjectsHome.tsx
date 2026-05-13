"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/**
 * ProjectsHome — direct port of Thomas's ViewProjectsHome.
 * - 4 projects, alternating left/right alignment (desktop)
 * - Entrance stagger with rotateY + scale
 * - Desktop hover: 3D tilt + magnetic + image parallax + info lift
 *
 * Uses plain <img> tags (not next/image) so GSAP can transform the img
 * element directly, matching Thomas's DOM structure exactly.
 *
 * Event listeners are stored in a Map keyed by element so they can be
 * removed on cleanup (fixes double-handler bug from StrictMode double-mount).
 */

type Project = {
  slug: string;
  name: string;
  date: string;
  tags: string[];
  coverImage: string;
};

const projects: Project[] = [
  {
    slug: "fintech-dashboard",
    name: "FinTech Dashboard",
    date: "Jan 2024",
    tags: ["Dashboard", "FinTech", "Data Viz", "Design System"],
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
  },
  {
    slug: "healthcare-app",
    name: "Healthcare Mobile App",
    date: "Oct 2024",
    tags: ["Mobile", "Healthcare", "Accessibility"],
    coverImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop",
  },
  {
    slug: "elearning-platform",
    name: "E-Learning Platform",
    date: "Jun 2024",
    tags: ["EdTech", "Web App", "Gamification"],
    coverImage:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop",
  },
  {
    slug: "design-system",
    name: "Design System",
    date: "Mar 2024",
    tags: ["Design System", "Figma", "Documentation"],
    coverImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
  },
];

export function ProjectsHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    type Handlers = {
      enter: () => void;
      leave: () => void;
      move: (e: MouseEvent) => void;
    };
    const hoverHandlers = new Map<HTMLElement, Handlers>();

    const ctx = gsap.context(() => {
      // Header word reveal
      if (headerRef.current) {
        const split = new SplitType(headerRef.current, { types: "words" });
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
                duration: 0.4,
                ease: "power1.out",
                stagger: 0.03,
              });
            },
          });
        }
      }

      const items = gsap.utils.toArray<HTMLElement>(".projects__item");
      const isMobile = window.innerWidth <= 768 || "ontouchstart" in window;

      // Entrance animation per item — alternating from left/right
      items.forEach((item, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.set(item, {
          opacity: 0,
          y: 80,
          x: direction * 60,
          rotateY: direction * 8,
          scale: 0.92,
          transformPerspective: 1000,
        });

        gsap.to(item, {
          opacity: 1,
          y: 0,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: item.parentElement,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // 3D tilt + magnetic on hover (desktop only) — Thomas's exact logic
      if (!isMobile) {
        items.forEach((item) => {
          const imageContainer = item.querySelector<HTMLElement>(
            ".projects__image",
          );
          const image = imageContainer?.querySelector<HTMLImageElement>("img");
          const info = item.querySelector<HTMLElement>(".projects__info");
          if (!imageContainer || !image) return;

          let bounds: DOMRect | null = null;
          let isHovered = false;

          const onEnter = () => {
            isHovered = true;
            bounds = imageContainer.getBoundingClientRect();

            gsap.to(image, {
              scale: 1.08,
              duration: 0.4,
              ease: "elastic.out(1, 0.5)",
            });
            if (info) {
              gsap.to(info, {
                y: -8,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          };

          const onLeave = () => {
            isHovered = false;
            gsap.to(imageContainer, {
              rotateX: 0,
              rotateY: 0,
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.4)",
            });
            gsap.to(image, {
              scale: 1,
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.4)",
            });
            if (info) {
              gsap.to(info, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          };

          const onMove = (e: MouseEvent) => {
            if (!isHovered || !bounds) return;

            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            const normalX = (mouseX / bounds.width) * 2 - 1;
            const normalY = (mouseY / bounds.height) * 2 - 1;

            const rotateX = normalY * -12;
            const rotateY = normalX * 12;
            const magnetX = normalX * 15;
            const magnetY = normalY * 10;

            gsap.to(imageContainer, {
              rotateX,
              rotateY,
              x: magnetX,
              y: magnetY,
              transformPerspective: 800,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(image, {
              x: -normalX * 8,
              y: -normalY * 6,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          imageContainer.addEventListener("mouseenter", onEnter);
          imageContainer.addEventListener("mouseleave", onLeave);
          imageContainer.addEventListener("mousemove", onMove);

          hoverHandlers.set(imageContainer, {
            enter: onEnter,
            leave: onLeave,
            move: onMove,
          });
        });
      }
    }, section);

    return () => {
      // Clean up GSAP
      ctx.revert();
      // Remove all hover event listeners (prevents duplication in StrictMode)
      hoverHandlers.forEach((handlers, el) => {
        el.removeEventListener("mouseenter", handlers.enter);
        el.removeEventListener("mouseleave", handlers.leave);
        el.removeEventListener("mousemove", handlers.move);
      });
      hoverHandlers.clear();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative px-4 py-32 md:px-16 md:py-48 xl:px-32"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-16 w-full sm:w-[90%] md:w-[75%]">
          <h2
            ref={headerRef}
            className="m-0 font-sans text-[clamp(36px,3vw,48px)] font-medium leading-[1.2] text-ink"
          >
            Selected Work
          </h2>
        </div>

        <div className="flex flex-col gap-16 sm:gap-32 xl:gap-64">
          {projects.map((project, i) => (
            <article
              key={project.slug}
              className={`projects__item w-full sm:w-[65%] ${
                i % 2 === 1 ? "sm:self-start" : "sm:self-end"
              }`}
              style={{
                transformStyle: "preserve-3d",
                pointerEvents: "none",
              }}
            >
              <a
                href={`/work/${project.slug}`}
                data-name="view"
                data-text="View"
                className="projects__image relative block aspect-[4/3] overflow-hidden xl:aspect-[16/9]"
                style={{ pointerEvents: "all" }}
              >
                {/* Plain <img> so GSAP can transform it directly */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.coverImage}
                  alt={project.name}
                  className="h-full w-full object-cover object-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                  }}
                />
              </a>
              <div className="projects__info mx-4 mt-4 font-mono uppercase text-ink">
                <div className="mb-0.5 flex items-center justify-between text-[clamp(14px,1vw,16px)] font-medium leading-none">
                  <p className="m-0">{project.name}</p>
                  <p className="m-0">{project.date.split(" ")[1]}</p>
                </div>
                <span className="relative -top-1 text-[clamp(10px,0.7vw,11px)] font-medium">
                  {project.tags.map((t) => `[ ${t} ]`).join(" ")}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
