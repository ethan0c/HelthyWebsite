"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Global custom cursor. Two layers:
 *  - `dot`:   tiny lemon dot that snaps to the pointer.
 *  - `ring`:  larger outlined ring that lags behind (smoothed via lerp).
 *
 * Behavior:
 *  - Only rendered on `pointer: fine` (no phones/tablets).
 *  - Hidden until the first real mousemove — avoids flashing in a random
 *    corner before the user has moved.
 *  - Grows over interactive elements (a, button, [role=button], input, etc.).
 *  - Shrinks on mousedown.
 *  - Adds `.custom-cursor-on` to <body> so CSS can hide the native cursor.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-on");
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const target = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let visible = false;
    let isDown = false;
    let isHover = false;
    let raf = 0;

    const setVars = () => {
      // Ease ring toward target; dot snaps.
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;

      const hoverScale = isHover ? 1.6 : 1;
      const downScale = isDown ? 0.75 : 1;
      const ringScale = hoverScale * downScale;

      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%) scale(${isDown ? 0.5 : 1})`;

      raf = requestAnimationFrame(setVars);
    };
    raf = requestAnimationFrame(setVars);

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      // Hover detection — check element under pointer.
      const el = e.target as HTMLElement | null;
      isHover = !!el?.closest(
        'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor-hover]'
      );
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const onDown = () => {
      isDown = true;
    };
    const onUp = () => {
      isDown = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("custom-cursor-on");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1.5px solid rgba(205, 255, 80, 0.85)",
          boxShadow: "0 0 18px -4px rgba(205, 255, 80, 0.55)",
          opacity: 0,
          transition: "opacity 200ms ease-out, border-color 200ms ease-out",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 10000,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#CDFF50",
          boxShadow: "0 0 10px rgba(205, 255, 80, 0.8)",
          opacity: 0,
          transition: "opacity 200ms ease-out",
          willChange: "transform",
        }}
      />
    </>
  );
}
