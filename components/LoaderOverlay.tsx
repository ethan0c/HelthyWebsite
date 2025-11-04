"use client";

import { useEffect, useState } from "react";

/**
 * LoaderOverlay — simple brand loader shown until first client render.
 * Fades out on hydration to keep perceived load smooth without blocking SSR.
 */
export default function LoaderOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Give the UI a brief moment to render, then fade out the loader
    const t = setTimeout(() => setVisible(false), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0B0B] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Inline styles for hollow circles loader (namespaced) */}
      <style>{`
        .hc-loader { display: inline-flex; align-items: center; gap: var(--gap, 10px); }
        .hc-dot { width: var(--size, 14px); height: var(--size, 14px); border-radius: 50%; border: var(--border, 2px) solid var(--color, #CDFB50); background: transparent; opacity: 1; transform: scale(1); animation: hc-pulse var(--duration, 1.1s) ease-in-out infinite; }
        .hc-dot:nth-child(1) { animation-delay: 0ms; }
        .hc-dot:nth-child(2) { animation-delay: calc(var(--duration, 1.1s) * 0.15); }
        .hc-dot:nth-child(3) { animation-delay: calc(var(--duration, 1.1s) * 0.30); }
        .hc-dot:nth-child(4) { animation-delay: calc(var(--duration, 1.1s) * 0.45); }
        .hc-dot:nth-child(5) { animation-delay: calc(var(--duration, 1.1s) * 0.60); }
        @keyframes hc-pulse { 0%, 100% { transform: scale(0.9); opacity: 1; } 50% { transform: scale(1.12); opacity: var(--fade, 0.35); } }
        @media (prefers-reduced-motion: reduce) { .hc-dot { animation: none; } }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
      `}</style>

      <div className="flex flex-col items-center gap-8">
        {/* Brand logo (black/green) */}
        <img
          src="/logos/logo-green-black.svg"
          alt="Helthy"
          className="w-[120px] h-auto select-none"
          draggable={false}
        />

        {/* Hollow circles loader (Helthy Lemon on black) */}
        <div
          className="hc-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          style={{
            // tune sizes/spacing/colors here
            // @ts-ignore - CSS variables allowed
            "--size": "16px",
            // @ts-ignore
            "--border": "2px",
            // @ts-ignore
            "--gap": "10px",
            // @ts-ignore
            "--color": "#CDFB50",
            // @ts-ignore
            "--fade": 0.35 as unknown as string,
            // @ts-ignore
            "--duration": "1.05s",
          } as React.CSSProperties}
        >
          <span className="sr-only">Loading…</span>
          <div className="hc-dot" />
          <div className="hc-dot" />
          <div className="hc-dot" />
          <div className="hc-dot" />
          <div className="hc-dot" />
        </div>
      </div>
    </div>
  );
}
