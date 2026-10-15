"use client";

import { useEffect, useRef, useState } from "react";
import { SCREENS, WATCH_CANVAS } from "@/components/ui/AppleWatch";

/**
 * One of the live Apple Watch screens from AppleWatch.tsx, scaled to fill
 * whatever box it's in. Used inside DeviceFrame's watch photo, where the
 * box is responsive, so the scale is measured rather than passed in. The
 * canvas sits a little inside the box so the rounded screen corners don't
 * clip the top bar.
 */
export default function WatchScreen({ screen = "workout" }: { screen?: keyof typeof SCREENS }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(width / WATCH_CANVAS.width, height / WATCH_CANVAS.height) * 0.92);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const Screen = SCREENS[screen].render;
  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center"
      style={{ background: WATCH_CANVAS.background }}
    >
      <div
        className="shrink-0"
        style={{
          width: WATCH_CANVAS.width,
          height: WATCH_CANVAS.height,
          transform: `scale(${scale})`,
          visibility: scale ? undefined : "hidden",
        }}
      >
        <Screen />
      </div>
    </div>
  );
}
