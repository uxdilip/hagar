"use client";

import { useEffect, useRef } from "react";

/**
 * AnimWaves — direct port of Thomas's AnimWaves.vue (PixiJS).
 *
 * 6 animated sinus waves rendered with PixiJS. Each wave is a line of
 * connected segments, each segment with its own HSL colour that "travels"
 * along the wave over time (via sin() on light + sat).
 *
 * Light-mode palette: hue 194, base sat 16, base light 65.
 * Pauses via IntersectionObserver when off-screen.
 * Fades in 1.5s after mount to avoid preloader collision.
 */

type Wave = {
  graphics: import("pixi.js").Graphics;
  phase: number;
  amplitude: number;
  frequency: number;
  speed: number;
  colorOffset: number;
  colorSpeed: number;
};

function hslToHex(h: number, s: number, l: number): number {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  const r = f(0);
  const g = f(8);
  const b = f(4);
  return (r << 16) | (g << 8) | b;
}

function getWaveColor(
  waveIndex: number,
  segmentRatio: number,
  time: number,
): number {
  const baseHue = 194;
  const baseSat = 16;
  const baseLight = 65;
  const lightnessOffset = waveIndex * 4;
  const colorSpeed = 0.6 + waveIndex * 0.25;

  const travelingLight =
    baseLight +
    lightnessOffset +
    Math.sin(segmentRatio * Math.PI * 2 + time * colorSpeed) * 16;
  const travelingSat =
    baseSat +
    Math.sin(segmentRatio * Math.PI * 3 + time * colorSpeed * 0.7) * 8;

  const finalLight = Math.max(55, Math.min(85, travelingLight));
  const finalSat = Math.max(10, Math.min(25, travelingSat));

  return hslToHex(baseHue, finalSat, finalLight);
}

export function AnimWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let app: import("pixi.js").Application | null = null;
    let waves: Wave[] = [];
    let rafId = 0;
    let destroyed = false;
    let paused = false;
    let fadeTimeout: ReturnType<typeof setTimeout> | null = null;
    let startTimeout: ReturnType<typeof setTimeout> | null = null;
    let observer: IntersectionObserver | null = null;
    let cachedWidth = 0;
    let cachedHeight = 0;

    const destroyWaves = () => {
      waves.forEach((w) => w.graphics.destroy());
      waves = [];
    };

    const init = async () => {
      const PIXI = await import("pixi.js");
      if (destroyed) return;

      app = new PIXI.Application();
      await app.init({
        backgroundAlpha: 0,
        canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      if (destroyed) {
        app.destroy(true);
        return;
      }

      const createWaves = () => {
        for (let i = 0; i < 6; i++) {
          const graphics = new PIXI.Graphics();
          const wave: Wave = {
            graphics,
            phase: Math.random() * Math.PI * 2,
            amplitude: 50 + Math.random() * 70,
            frequency: 0.005 + Math.random() * 0.01,
            speed: 0.01 + Math.random() * 0.02,
            colorOffset: i * 0.5,
            colorSpeed: 0.3 + Math.random() * 0.4,
          };
          waves.push(wave);
          app!.stage.addChild(graphics);
        }
      };

      const animate = () => {
        if (destroyed || !app || paused) {
          rafId = requestAnimationFrame(animate);
          return;
        }

        const currentTime = Date.now() * 0.001;

        if (
          cachedWidth !== app.screen.width ||
          cachedHeight !== app.screen.height
        ) {
          cachedWidth = app.screen.width;
          cachedHeight = app.screen.height;
        }

        waves.forEach((wave, index) => {
          wave.graphics.clear();
          const centerY = cachedHeight / 2 + (index - 2.5) * 20;
          const segmentSize = 8;

          const points: { x: number; y: number; color: number }[] = [];
          for (let x = 0; x <= cachedWidth; x += segmentSize) {
            const y =
              centerY +
              Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
            const segmentRatio = x / cachedWidth;
            const segmentColor = getWaveColor(
              index,
              segmentRatio,
              currentTime + wave.colorOffset,
            );
            points.push({ x, y, color: segmentColor });
          }

          for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            if (!current || !next) continue;

            wave.graphics.setStrokeStyle({
              width: 4,
              color: current.color,
              alpha: 1,
            });
            wave.graphics.moveTo(current.x, current.y);
            wave.graphics.lineTo(next.x, next.y);
            wave.graphics.stroke();
          }

          wave.phase += wave.speed;
        });

        rafId = requestAnimationFrame(animate);
      };

      const resize = () => {
        if (!app || destroyed) return;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        cachedWidth = 0;
        cachedHeight = 0;
      };

      window.addEventListener("resize", resize);

      // Intersection observer — pause when off-screen
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            paused = !entry.isIntersecting;
          });
        },
        { threshold: 0 },
      );
      observer.observe(canvas);

      createWaves();

      // Delay start so preloader (~3.5s) finishes first
      startTimeout = setTimeout(() => {
        if (!destroyed) rafId = requestAnimationFrame(animate);
      }, 2000);

      // Fade in canvas 1.5s after mount
      canvas.style.opacity = "0";
      canvas.style.transition = "opacity 2s ease";
      fadeTimeout = setTimeout(() => {
        if (!destroyed) canvas.style.opacity = "1";
      }, 1500);

      // Store resize cleanup reference
      (canvas as HTMLCanvasElement & { __resizeHandler?: () => void }).__resizeHandler = resize;
    };

    init();

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (fadeTimeout) clearTimeout(fadeTimeout);
      if (startTimeout) clearTimeout(startTimeout);
      if (observer) observer.disconnect();
      const resizeHandler = (canvas as HTMLCanvasElement & {
        __resizeHandler?: () => void;
      }).__resizeHandler;
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
      destroyWaves();
      if (app) app.destroy(true);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute left-0 top-0 h-full w-full"
      />
    </div>
  );
}
