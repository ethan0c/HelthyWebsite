import React from "react";

interface LoaderHollowCirclesProps {
  color?: string;     // ring color
  background?: string; // overlay background
  size?: number;      // circle diameter (px)
  border?: number;    // ring thickness (px)
  gap?: number;       // gap between circles (px)
  fade?: number;      // min opacity at peak (0..1)
  durationMs?: number;// animation duration in ms
}

export default function LoaderHollowCircles({
  color = "#111111",
  background = "#ffffff",
  size = 14,
  border = 2,
  gap = 10,
  fade = 0.35,
  durationMs = 2100,
}: LoaderHollowCirclesProps) {
  const style: React.CSSProperties = {
    // CSS variables for the loader
    // Using custom names to avoid collisions
    ["--hl-color" as any]: color,
    ["--hl-bg" as any]: background,
    ["--hl-size" as any]: `${size}px`,
    ["--hl-border" as any]: `${border}px`,
    ["--hl-gap" as any]: `${gap}px`,
    ["--hl-fade" as any]: String(fade),
    ["--hl-duration" as any]: `${durationMs}ms`,
  };

  return (
    <div className="hollow-loader-overlay" style={style} role="status" aria-live="polite" aria-label="Loading">
      <span className="sr-only">Loading…</span>
      <div className="hollow-loader">
        <div className="hollow-dot" />
        <div className="hollow-dot" />
        <div className="hollow-dot" />
        <div className="hollow-dot" />
        <div className="hollow-dot" />
      </div>
    </div>
  );
}
