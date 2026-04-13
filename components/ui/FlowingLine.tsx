"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { createPortal } from "react-dom";

/**
 * Abstract organic line art that flows down the entire page.
 * Renders into each section's DOM so lines sit between background and content.
 *
 * Usage: Place <FlowingLine /> anywhere. It will:
 * 1. Measure the full page height
 * 2. Find all <section> elements
 * 3. Portal an SVG clip of the full line art into each section
 */

interface Line {
  d: (w: number, h: number) => string;
  strokeWidth: number;
  opacity: number;
}

const LINES: Line[] = [
  {
    d: (w, h) => `M${w * 0.92},${h * -0.01} C${w * 0.7},${h * 0.06} ${w * 0.12},${h * 0.04} ${w * 0.08},${h * 0.14} S${w * 0.55},${h * 0.2} ${w * 0.35},${h * 0.28}`,
    strokeWidth: 1.5,
    opacity: 0.1,
  },
  {
    d: (w, h) => `M${w * -0.05},${h * 0.07} C${w * 0.3},${h * 0.02} ${w * 0.45},${h * 0.15} ${w * 0.2},${h * 0.18} S${w * 0.05},${h * 0.12} ${w * 0.15},${h * 0.22} C${w * 0.4},${h * 0.26} ${w * 0.65},${h * 0.19} ${w * 0.78},${h * 0.25}`,
    strokeWidth: 1,
    opacity: 0.08,
  },
  {
    d: (w, h) => `M${w * 1.05},${h * 0.15} C${w * 0.6},${h * 0.22} ${w * 0.25},${h * 0.18} ${w * -0.05},${h * 0.32}`,
    strokeWidth: 2,
    opacity: 0.06,
  },
  {
    d: (w, h) => `M${w * 0.9},${h * 0.3} C${w * 0.55},${h * 0.28} ${w * 0.3},${h * 0.35} ${w * 0.45},${h * 0.42} S${w * 0.85},${h * 0.38} ${w * 0.7},${h * 0.48} C${w * 0.4},${h * 0.52} ${w * 0.1},${h * 0.44} ${w * 0.05},${h * 0.53}`,
    strokeWidth: 1.2,
    opacity: 0.09,
  },
  {
    d: (w, h) => `M${w * -0.03},${h * 0.46} C${w * 0.2},${h * 0.43} ${w * 0.35},${h * 0.5} ${w * 0.28},${h * 0.56}`,
    strokeWidth: 1.8,
    opacity: 0.07,
  },
  {
    d: (w, h) => `M${w * 1.02},${h * 0.52} C${w * 0.7},${h * 0.58} ${w * 0.2},${h * 0.54} ${w * 0.15},${h * 0.62} S${w * 0.5},${h * 0.68} ${w * 0.85},${h * 0.65} C${w * 1.0},${h * 0.7} ${w * 0.6},${h * 0.76} ${w * 0.3},${h * 0.73}`,
    strokeWidth: 1.3,
    opacity: 0.1,
  },
  {
    d: (w, h) => `M${w * 0.05},${h * 0.72} C${w * 0.35},${h * 0.78} ${w * 0.7},${h * 0.74} ${w * 0.95},${h * 0.82}`,
    strokeWidth: 1,
    opacity: 0.08,
  },
  {
    d: (w, h) => `M${w * -0.02},${h * 0.85} C${w * 0.3},${h * 0.82} ${w * 0.5},${h * 0.9} ${w * 0.75},${h * 0.86} S${w * 0.95},${h * 0.93} ${w * 1.05},${h * 0.96}`,
    strokeWidth: 1.6,
    opacity: 0.09,
  },
  {
    d: (w, h) => `M${w * 0.7},${h * 0.01} C${w * 0.82},${h * 0.05} ${w * 0.88},${h * 0.1} ${w * 0.75},${h * 0.12}`,
    strokeWidth: 0.8,
    opacity: 0.12,
  },
  {
    d: (w, h) => `M${w * 0.1},${h * 0.88} C${w * 0.25},${h * 0.92} ${w * 0.45},${h * 0.87} ${w * 0.55},${h * 0.95}`,
    strokeWidth: 1.4,
    opacity: 0.07,
  },
];

interface SectionInfo {
  el: HTMLElement;
  top: number;
  height: number;
}

export default function FlowingLine() {
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [pageHeight, setPageHeight] = useState(6000);

  useEffect(() => {
    const measure = () => {
      const ph = document.body.scrollHeight;
      setPageHeight(ph);

      const mainEl = document.querySelector("main");
      if (!mainEl) return;
      const mainTop = mainEl.getBoundingClientRect().top + window.scrollY;

      const sectionEls = mainEl.querySelectorAll("section");
      const infos: SectionInfo[] = [];
      sectionEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        infos.push({
          el: el as HTMLElement,
          top: rect.top + window.scrollY - mainTop,
          height: rect.height,
        });
      });
      setSections(infos);
    };

    measure();
    // Re-measure after fonts/images load
    window.addEventListener("load", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("load", measure);
      ro.disconnect();
    };
  }, []);

  const w = 1920;
  const h = pageHeight;

  return (
    <>
      {sections.map((sec, si) => {
        const clipId = `flow-clip-${si}`;
        // The viewBox window for this section: full width, but only the vertical slice
        const viewY = sec.top;
        const viewH = sec.height;

        return createPortal(
          <svg
            key={si}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
            viewBox={`0 ${viewY} ${w} ${viewH}`}
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            {LINES.map((line, i) => (
              <path
                key={i}
                d={line.d(w, h)}
                stroke="#CDFB50"
                strokeWidth={line.strokeWidth}
                strokeLinecap="round"
                opacity={line.opacity}
              />
            ))}
          </svg>,
          sec.el
        );
      })}
    </>
  );
}
