import React, { PropsWithChildren } from "react";
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
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Inline keyframes scoped to this component */}
      <style>{`
        @keyframes marqueeX { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <div
        className={cn(
          "marquee-track flex items-stretch",
          gapClass,
          "[animation-name:marqueeX] [animation-timing-function:linear] [animation-iteration-count:infinite]",
        )}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {/* First copy */}
        <div className={cn("flex items-stretch", gapClass)}>
          {children}
        </div>
        {/* Second copy for seamless loop */}
        <div className={cn("flex items-stretch", gapClass)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
