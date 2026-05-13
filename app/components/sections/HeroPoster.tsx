"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function HeroPoster() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img) return;

    const ctx = gsap.context(() => {
      // Parallax on bg image
      gsap.to(img, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Split char animation on all .title elements
      const titles = el.querySelectorAll<HTMLElement>(".title");
      titles.forEach((title) => {
        const split = new SplitType(title, { types: "chars" });
        if (!split.chars) return;
        gsap.set(split.chars, { yPercent: 120 });
        ScrollTrigger.create({
          trigger: title,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(split.chars!, {
              yPercent: 0,
              duration: 0.9,
              ease: "cubic-bezier(0.86, 0, 0.31, 1)",
              stagger: { each: 0.03, from: "start" },
            });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="-w" ref={ref}>
        <div className="poster">
          <figure className="image-bg">
            <img
              ref={imgRef}
              src="https://picsum.photos/1200/800"
              alt=""
            />
          </figure>
          <span className="-m top-center">01</span>
          <span className="-m bottom-center">02</span>
          <div className="-m decorative">
            <span>Details</span>
            <span>Structure</span>
            <span>Essence</span>
          </div>
          <p className="-m caption">Where clarity meets creativity</p>

          <span className="-m decorative-1">Lines &amp; Shapes</span>
          <span className="-m decorative-2">Type &amp; Form</span>

          <span className="title shaping">Shaping</span>
          <span className="title a-word">A</span>
          <span className="title distinct">Distinct</span>
          <span className="title identity">Identity</span>
          <span className="title through">Through</span>
          <span className="title form">Form</span>
          <span className="title and">&amp;</span>
          <span className="title colour">Colour</span>

          <p className="-m description">
            Exploring the balance between bold visuals and subtle details,
            crafting layouts that resonate.
          </p>

          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
          <span className="line line-4"></span>
          <span className="line line-5"></span>
          <span className="line line-6"></span>
          <span className="line line-7"></span>
        </div>
      </div>

      <style>{`
        .-w {
          margin-left: 0.8rem;
          margin-right: 0.8rem;
          display: grid;
          grid-template-columns: repeat(14, 1fr);
          column-gap: 0.4rem;
        }
        @media (min-width: 1024px) {
          .-w { margin-left: 1.6rem; margin-right: 1.6rem; }
        }

        .poster {
          grid-column-start: 1;
          grid-column-end: 15;
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          column-gap: 0.4rem;
          align-items: start;
          margin-top: 70svh;
          margin-bottom: 6rem;
          color: #D7BDC9;
          position: relative;
        }
        @media (min-width: 1024px) {
          .poster {
            grid-column-start: 3;
            grid-column-end: 13;
            margin-top: 55svh;
          }
        }
        .poster * { position: relative; }

        .image-bg {
          grid-column: 1 / 11;
          grid-row: 1 / 18;
          position: absolute;
          inset: 0;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
        }
        .image-bg img {
          width: 100%;
          height: 120%;
          object-fit: cover;
        }

        .-m { font-size: 0.64rem; }
        @media (max-width: 1024px) { .-m { font-size: 0.5rem; } }

        .top-center {
          grid-column: 1 / 11;
          grid-row: 1 / 2;
          justify-content: center;
          text-align: center;
          margin-top: 20vw;
        }
        @media (min-width: 1024px) { .top-center { margin-top: 5vw; } }

        .bottom-center {
          grid-column: 1 / 11;
          grid-row: 17 / 18;
          justify-content: center;
          text-align: center;
          margin-bottom: 20vw;
        }
        @media (min-width: 1024px) { .bottom-center { margin-bottom: 5vw; } }

        .decorative {
          grid-column: 1 / 11;
          grid-row: 1 / 2;
          display: flex;
          gap: 0.4rem;
          margin-top: 20vw;
          margin-left: 1rem;
        }
        @media (min-width: 1024px) {
          .decorative { gap: 1rem; margin-top: 5vw; }
        }

        .caption {
          grid-column: 8 / 10;
          grid-row: 2 / 3;
          max-width: 7rem;
          margin-top: 40vw;
          margin-bottom: 20vw;
        }
        @media (min-width: 1024px) {
          .caption { margin-top: 10vw; margin-bottom: 5vw; }
        }

        .decorative-1 {
          grid-column: 1 / 11;
          grid-row: 10 / 11;
          align-self: center;
          justify-self: left;
          margin-left: 1rem;
        }
        .decorative-2 {
          grid-column: 6 / 11;
          grid-row: 12 / 13;
          align-self: center;
          justify-self: left;
        }

        .description {
          grid-column: 4 / 8;
          grid-row: 16 / 17;
          text-align: center;
          margin-top: 20vw;
          margin-bottom: 20vw;
        }
        @media (min-width: 1024px) {
          .description { margin-top: 5vw; margin-bottom: 5vw; }
        }

        .title {
          font-family: var(--font-cormorant), Arial, sans-serif;
          text-transform: uppercase;
          font-size: calc(1vw * 11);
          line-height: 0.8;
          color: #E6DFE4;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .title { font-size: calc(1vw * 9); }
        }

        .shaping {
          grid-column: 1 / 11;
          grid-row: 4 / 5;
          justify-self: start;
          color: #FF5A37;
          margin-left: 1rem;
        }
        .a-word {
          grid-column: 1 / 11;
          grid-row: 6 / 7;
          justify-self: start;
          color: #000000;
          margin-left: 1rem;
        }
        .distinct {
          grid-column: 1 / 11;
          grid-row: 6 / 7;
          justify-self: right;
          text-align: right;
          margin-right: 1rem;
        }
        .identity {
          grid-column: 1 / 11;
          grid-row: 8 / 9;
          justify-self: left;
          margin-left: 1rem;
        }
        .through {
          grid-column: 1 / 10;
          grid-row: 10 / 11;
          justify-self: right;
          text-align: right;
          margin-right: 1rem;
        }
        .form {
          grid-column: 1 / 11;
          grid-row: 12 / 13;
          justify-self: left;
          margin-left: 1rem;
        }
        .and {
          grid-column: 1 / 10;
          grid-row: 12 / 13;
          justify-self: right;
          text-align: right;
          margin-right: 1rem;
        }
        .colour {
          grid-column: 1 / 11;
          grid-row: 14 / 15;
          justify-self: right;
          text-align: right;
          color: #000000;
          margin-right: 1rem;
        }

        @media (min-width: 1024px) {
          .title [data-char]:hover {
            background-color: #000000;
            color: #E6DFE4;
          }
        }

        .line {
          grid-column: 1 / 11;
          border-bottom: 1px solid #E6DFE4;
          height: 0;
          margin-left: 1rem;
          margin-right: 1rem;
        }
        .line-1 { grid-row: 3 / 4; }
        .line-2 { grid-row: 5 / 6; }
        .line-3 { grid-row: 7 / 8; }
        .line-4 { grid-row: 9 / 10; }
        .line-5 { grid-row: 11 / 12; }
        .line-6 { grid-row: 13 / 14; }
        .line-7 { grid-row: 15 / 16; }
      `}</style>
    </>
  );
}
