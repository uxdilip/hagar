"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Preloader — intro animation (Thomas-inspired)
 *
 * Sequence:
 *  1. Circle stroke draws from 0 → full (strokeDashoffset 283 → 0)
 *  2. Percentage number counts 0 → 100 in sync
 *  3. Circle + % fade out
 *  4. "Venice blinds" — 15 vertical slats wipe away from left to right
 *     revealing the page underneath
 *
 * Plays on every page load / reload.
 */

const BLIND_COUNT = 15;
// 2 * π * r, where r=45 on a 100x100 SVG viewBox.
const CIRCLE_CIRCUMFERENCE = 283;

export function Preloader() {
  // Always render server-side to avoid hydration mismatch. Skip animation after first run.
  const [done, setDone] = useState(false);
  const [percent, setPercent] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const percTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Lock scroll while intro plays
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const circle = circleRef.current;
    const percText = percTextRef.current;
    const root = rootRef.current;
    if (!circle || !percText || !root) return;

    // Counter — animate a plain object, read its value into React state each frame
    const counter = { value: 0 };

    // Cache blind elements
    const blinds = gsap.utils.toArray<HTMLElement>(".venice__blind");

    // Set initial states
    gsap.set(circle, {
      strokeDasharray: CIRCLE_CIRCUMFERENCE,
      strokeDashoffset: CIRCLE_CIRCUMFERENCE,
      opacity: 0,
    });
    gsap.set(percText, { opacity: 0 });
    gsap.set(blinds, { scaleX: 1, opacity: 1, transformOrigin: "left center" });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        setDone(true);
      },
    });

    // Draw circle + fade in text
    tl.to(
      [circle, percText],
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      0,
    )
      .to(
        circle,
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.inOut",
        },
        0,
      )
      // Tick the counter, syncing with React state.
      .to(
        counter,
        {
          value: 100,
          duration: 2.2,
          ease: "power2.inOut",
          onUpdate: () => setPercent(Math.round(counter.value)),
        },
        0,
      )
      // Fade out circle + percentage
      .to(
        [circle, percText],
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "+=0.2",
      )
      // Venice blinds wipe — left-to-right stagger, scaleX 1 → 0
      .to(
        blinds,
        {
          scaleX: 0,
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.inOut",
        },
        "-=0.1",
      );

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // After done, remove from DOM entirely so it can't block interaction.
  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[10000] pointer-events-none"
    >
      {/* Circle + percentage — sits above the blinds.
          Colors are INVERTED from the page (ink overlay / bg stroke & text)
          so they read cleanly against the dark blinds behind. */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="h-[100px] w-[100px] -rotate-90"
          fill="none"
        >
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r="45"
            stroke="var(--color-bg)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div
          ref={percTextRef}
          className="mt-6 font-mono text-sm tracking-wider"
          style={{ color: "var(--color-bg)" }}
        >
          {percent}%
        </div>
      </div>

      {/* Venice blinds — 15 vertical ink-colored slats.
          Together they form a full-screen dark overlay that wipes away
          left-to-right, revealing the light page underneath. */}
      <div className="absolute inset-0 z-[1] flex">
        {Array.from({ length: BLIND_COUNT }).map((_, i) => (
          <div
            key={i}
            className="venice__blind h-full flex-1"
            style={{
              marginLeft: i === 0 ? 0 : -1,
              backgroundColor: "var(--color-ink)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
