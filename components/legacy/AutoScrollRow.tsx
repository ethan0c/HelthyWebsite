"use client";
import React, { PropsWithChildren, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * AutoScrollRow — A simple marquee-like continuous scroller.
 * - Duplicates children to create a seamless loop
 * - Linear, slow animation
 */
export default function AutoScrollRow({
  children,
  className,
  speedSeconds = 40,
  gapClass = "gap-6",
}: PropsWithChildren<{ className?: string; speedSeconds?: number; gapClass?: string }>) {
  const groupRef = useRef<HTMLDivElement | null>(null);
  const [distancePx, setDistancePx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (!groupRef.current) return;
      const w = groupRef.current.scrollWidth; // exact pixel width of first group
      setDistancePx(w);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Inline keyframes with CSS var for exact pixel distance */}
      <style>{`
        @keyframes marqueeX { from { transform: translate3d(0,0,0); } to { transform: translate3d(calc(-1 * var(--marquee-distance, 50%)), 0, 0); } }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>

      <div
        className={cn(
          "marquee-track flex flex-nowrap items-stretch w-max will-change-transform",
          gapClass,
          "[animation-name:marqueeX] [animation-timing-function:linear] [animation-iteration-count:infinite]",
        )}
        style={{
          animationDuration: `${speedSeconds}s`,
          // Set exact distance so loop resets seamlessly
          // If not measured yet, the CSS fallback 50% kicks in.
          ...(distancePx ? ({ ["--marquee-distance" as any]: `${distancePx}px` } as React.CSSProperties) : {}),
        }}
      >
        {/* First copy (measured) */}
        <div ref={groupRef} className={cn("flex flex-none items-stretch w-max", gapClass)}>
          {children}
        </div>
        {/* Second copy for seamless loop */}
        <div className={cn("flex flex-none items-stretch w-max", gapClass)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
