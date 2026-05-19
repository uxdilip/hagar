"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const PASSWORD =
  process.env.NEXT_PUBLIC_CASE_STUDY_PASSWORD ?? "hagar2025";

/**
 * Full-viewport overlay that gates access to all case studies.
 *
 * Flow:
 *   - User types password → submit
 *   - Wrong: input shakes (GSAP keyframes), red underline flash
 *   - Right: "Welcome." fades in → overlay slides up off-screen → onUnlock() fires
 *
 * Stored in sessionStorage by parent (CaseStudyView). Once unlocked, all
 * 4 case studies open without re-prompting until the tab closes.
 */
export function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  // Lock body scroll while gate is up
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Entry animation
  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.fromTo(
      overlayRef.current.querySelectorAll(".gate-fade"),
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.2,
      },
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === PASSWORD) {
      // Success: welcome → curtain up
      const tl = gsap.timeline({
        onComplete: () => onUnlock(),
      });
      tl.to(formRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.in",
      })
        .to(
          welcomeRef.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.1",
        )
        .to(welcomeRef.current, {
          opacity: 1,
          duration: 0.4,
        })
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power3.inOut",
        });
    } else {
      // Wrong: shake input + red flash
      setError(true);
      gsap.fromTo(
        formRef.current,
        { x: 0 },
        {
          keyframes: [
            { x: -10 },
            { x: 10 },
            { x: -8 },
            { x: 8 },
            { x: -4 },
            { x: 0 },
          ],
          duration: 0.5,
          ease: "power2.out",
        },
      );
      // Clear and refocus
      setTimeout(() => {
        setValue("");
        inputRef.current?.focus();
        setError(false);
      }, 1200);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink text-white"
    >
      <div className="w-full max-w-md px-6 text-center">
        <p className="gate-fade text-xs uppercase tracking-[0.3em] text-white/60">
          Protected work
        </p>
        <h2 className="gate-fade mt-4 font-serif text-4xl leading-tight md:text-5xl">
          Enter password
        </h2>
        <p className="gate-fade mt-3 text-sm text-white/60">
          Case studies are private. Type the access code to continue.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="gate-fade mt-12 flex flex-col items-stretch gap-6"
        >
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            style={{ caretColor: "white" }}
            className={`border-b ${
              error
                ? "border-red-400 text-red-300 caret-red-300"
                : "border-white/30 text-white caret-white"
            } bg-transparent pb-3 text-center text-xl tracking-[0.2em] outline-none transition-colors duration-300 placeholder:text-white/30 focus:border-white`}
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="rounded-full border border-white/40 px-8 py-3 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-white hover:text-ink"
          >
            Unlock
          </button>
          {error && (
            <p className="text-xs uppercase tracking-widest text-red-400">
              Incorrect password
            </p>
          )}
        </form>
      </div>

      {/* Welcome — full-screen centered, above everything in the overlay */}
      <div
        ref={welcomeRef}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-ink"
        style={{ opacity: 0 }}
      >
        <p className="font-serif text-5xl text-white md:text-6xl">Welcome.</p>
      </div>
    </div>
  );
}
