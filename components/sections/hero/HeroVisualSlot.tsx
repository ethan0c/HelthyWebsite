import { ReactNode } from "react";

interface HeroVisualSlotProps {
  children: ReactNode;
}

/**
 * Pluggable visual frame for the hero. Owns the aspect ratio, glow,
 * border, and grain overlay so the inner fill (video, phone mockup,
 * Lottie, etc.) doesn't have to repeat the chrome.
 *
 * Swap the child to change the hero visual without touching HeroSection.
 * Currently fed by HeroVisualVideo; HeroVisualPhone is a stub for the
 * future CSS/SVG mockup approach.
 */
export default function HeroVisualSlot({ children }: HeroVisualSlotProps) {
  return (
    <div
      data-hero-visual
      className="relative mx-auto w-full max-w-[440px] aspect-[9/16]"
    >
      {/* Lemon glow halo behind the frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-12 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(205,251,80,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Frame */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-helthy-card-section shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        {children}

        {/* Subtle grain inside the frame for texture parity with the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
        />
      </div>
    </div>
  );
}
