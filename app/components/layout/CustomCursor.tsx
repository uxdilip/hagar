"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * CustomCursor — "Jelly Blob"
 *
 * A translucent, backdrop-blurred disc that follows the mouse with slight lag,
 * squash-stretches based on velocity, and expands to show contextual text
 * when hovering interactive targets.
 *
 * Mark any interactive surface with:
 *   <a className="action" data-name="proj" data-text="View">…</a>
 *
 * Supported data-name values:
 *   - "view"  : 80px, shows data-text (e.g. "View", "Open")
 *   - "menu"  : 70px, shows data-text (e.g. "Open", "Close")
 *   - "link"  : 50px, shows data-text (small)
 *   - (none)  : default 16px dot
 *
 * Auto-disabled on touch devices.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoverState, setHoverState] = useState<{
    name: string;
    text: string;
  } | null>(null);

  const shapeRef = useRef<HTMLDivElement>(null);
  // `pos` = lagging position that we animate toward the mouse. `vel` = difference → stretch factor.
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  // Enable only on pointer:fine + hover devices (desktop).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mql.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  // Attach mouse + action hover listeners.
  useEffect(() => {
    if (!enabled) return;

    const shape = shapeRef.current;
    if (!shape) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Tween `pos` toward the mouse. GSAP re-uses the same tween if called repeatedly.
      gsap.to(posRef.current, {
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        duration: 0.2,
        ease: "power4.out",
        onUpdate: () => {
          velRef.current.x = mouseRef.current.x - posRef.current.x;
          velRef.current.y = mouseRef.current.y - posRef.current.y;
        },
      });
    };

    const loop = () => {
      if (!shape) return;
      const dx = velRef.current.x;
      const dy = velRef.current.y;
      const distance = Math.hypot(dx, dy);
      // Cap squash to avoid jelly going wild.
      const stretch = Math.min(distance / 60, 0.22);
      const rect = shape.getBoundingClientRect();

      gsap.set(shape, {
        x: Math.round(posRef.current.x - rect.width / 2),
        y: Math.round(posRef.current.y - rect.height / 2),
        scaleX: 1 + stretch,
        scaleY: 1 - stretch,
        force3D: true,
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    const onEnterAction = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      setHoverState({
        name: el.dataset.name || "",
        text: el.dataset.text || "",
      });
    };
    const onLeaveAction = () => setHoverState(null);

    // Delegate action hover via a single document listener using event.target closest().
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        "[data-name], a, button, [role='button']",
      ) as HTMLElement | null;
      if (!target) {
        setHoverState(null);
        return;
      }
      // If the element explicitly provides a data-name, use it; otherwise default to "link".
      if (target.dataset.name) {
        setHoverState({
          name: target.dataset.name,
          text: target.dataset.text || "",
        });
      } else {
        setHoverState({ name: "link", text: "" });
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      // If still over some interactive ancestor, keep the state.
      if (related && related.closest("[data-name], a, button, [role='button']")) {
        return;
      }
      setHoverState(null);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Silence ignored vars
      void onEnterAction;
      void onLeaveAction;
    };
  }, [enabled]);

  if (!enabled) return null;

  // Size map based on hover state
  const sizeClass = (() => {
    const n = hoverState?.name;
    if (n === "view" || n === "proj") return "h-20 w-20 text-[13px]";
    if (n === "menu") return "h-[70px] w-[70px] text-[13px]";
    if (n === "link") return "h-12 w-12 text-[11px]";
    return "h-4 w-4";
  })();

  const showText = Boolean(
    hoverState?.text &&
      (hoverState.name === "view" ||
        hoverState.name === "proj" ||
        hoverState.name === "menu" ||
        hoverState.name === "link"),
  );

  return (
    <div
      aria-hidden
      ref={shapeRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9000] flex items-center justify-center rounded-full border border-white/10 bg-white mix-blend-difference font-sans font-medium tracking-wide uppercase text-ink shadow-[0_4px_24px_rgba(0,0,0,0.18)] transition-[width,height,font-size] duration-300 ease-[cubic-bezier(0.075,0.82,0.165,1)] ${sizeClass}`}
      style={{
        willChange: "transform, width, height",
      }}
    >
      {showText && <span className="whitespace-nowrap">{hoverState?.text}</span>}
    </div>
  );
}
