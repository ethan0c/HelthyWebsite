"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import StoreButtons from "@/components/ui/StoreButtons";
import HelthyLogoGlass from "@/components/ui/HelthyLogoGlass";
import HeroAIDemo from "@/components/sections/HeroAIDemo";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1 — tagline settles in
      tl.from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.7 });

      // 2 — the two big words rise out of their masks
      tl.from(
        "[data-hero-word]",
        { yPercent: 115, duration: 0.9, stagger: 0.1, ease: "power4.out" },
        0.15,
      );

      // 3 — the mark pops in between and pushes the words apart
      tl.fromTo(
        "[data-hero-mark]",
        { width: 0, scale: 0, rotation: -120, opacity: 0 },
        {
          width: "0.82em",
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
        },
        0.8,
      );

      // 4 — CTAs, then the AI demo panel
      tl.from("[data-hero-cta]", { y: 15, opacity: 0, duration: 0.6 }, 1.15);
      tl.from("[data-hero-demo]", { y: 20, opacity: 0, duration: 0.7 }, 1.35);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden bg-canvas"
      style={{ minHeight: "clamp(620px, 82svh, 900px)" }}
    >
      {/* Centered content */}
      <div
        className="w-full px-4 sm:px-6 md:px-8 relative flex flex-col items-center justify-center text-center"
        style={{
          zIndex: 4,
          minHeight: "clamp(620px, 82svh, 900px)",
          paddingTop: "clamp(100px, 12vh, 140px)",
          paddingBottom: "clamp(32px, 4vh, 60px)",
        }}
      >
        {/* Small tagline — carries the description */}
        <p
          data-hero-sub
          className="font-body text-fg/80"
          style={{
            fontSize: "clamp(17px, 1.9vw, 26px)",
            fontWeight: 500,
            letterSpacing: "-0.015em",
            lineHeight: "1.2em",
            margin: 0,
            maxWidth: "22ch",
          }}
        >
          Every meal, every lift, one&nbsp;app
        </p>

        {/* Giant brand line — mark pops in between the words */}
        <h1
          className="font-heading text-fg flex items-center justify-center flex-nowrap"
          style={{
            fontSize: "clamp(40px, 13vw, 168px)",
            fontWeight: 600,
            letterSpacing: "-0.05em",
            lineHeight: "0.95em",
            margin: "clamp(8px, 1.4vh, 18px) 0 0",
            gap: "0.14em",
          }}
        >
          {/* Mask — clips the word as it rises in; padding keeps descenders visible */}
          <span
            className="inline-block overflow-hidden"
            style={{ padding: "0.08em 0.05em 0.14em", margin: "-0.08em -0.05em -0.14em" }}
          >
            <span data-hero-word className="inline-block">Get</span>
          </span>

          <span
            data-hero-mark
            aria-hidden="true"
            className="inline-flex items-center justify-center flex-shrink-0"
            style={{ width: "0.82em", height: "0.82em", marginTop: "0.06em" }}
          >
            <HelthyLogoGlass size={1} style={{ width: "100%", height: "100%" }} />
          </span>

          <span
            className="inline-block overflow-hidden"
            style={{ padding: "0.08em 0.05em 0.14em", margin: "-0.08em -0.05em -0.14em" }}
          >
            <span data-hero-word className="inline-block text-accent-ink">Helthy.</span>
          </span>
        </h1>

        <div data-hero-cta style={{ marginTop: "clamp(36px, 5vh, 60px)" }}>
          <StoreButtons align="center" />
        </div>

        {/* AI chat demo — try Helthy AI right in the hero */}
        <div data-hero-demo className="w-full flex justify-center">
          <HeroAIDemo />
        </div>

      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 180, background: "linear-gradient(transparent, var(--canvas))", zIndex: 5 }}
      />
    </section>
  );
}
