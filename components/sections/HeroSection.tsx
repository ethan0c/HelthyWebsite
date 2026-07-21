"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import AndroidWaitlistButton from "@/components/ui/AndroidWaitlistButton";
import CTAButton from "@/components/ui/CTAButton";
import HelthyLogoGlass from "@/components/ui/HelthyLogoGlass";
import HeroAIDemo from "@/components/sections/HeroAIDemo";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

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
      className="relative w-full overflow-hidden bg-[#101012]"
      style={{ minHeight: "clamp(620px, 82svh, 900px)" }}
    >
      {/* Lemon glow — soft brand-tinted radial bloom behind the headline */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(120% 90% at 50% 32%, rgba(205,255,80,0.10) 0%, rgba(205,255,80,0.03) 34%, transparent 62%)",
        }}
      />

      {/* Bottom vignette — settles the glow into the section fade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(180deg, transparent 55%, rgba(16,16,18,0.85) 100%)",
        }}
      />

      {/* Grain */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, backgroundImage: "url(/textures/hero-noise.png)", backgroundSize: "260px", opacity: 0.18, mixBlendMode: "overlay" }} />

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
          className="font-display"
          style={{
            fontSize: "clamp(17px, 1.9vw, 26px)",
            fontWeight: 500,
            letterSpacing: "-0.015em",
            lineHeight: "1.2em",
            color: "rgba(249,249,249,0.78)",
            margin: 0,
            maxWidth: "22ch",
          }}
        >
          Every meal, every lift, one&nbsp;app
        </p>

        {/* Giant brand line — mark pops in between the words */}
        <h1
          className="font-heading flex items-center justify-center flex-nowrap"
          style={{
            fontSize: "clamp(64px, 13vw, 168px)",
            fontWeight: 600,
            letterSpacing: "-0.05em",
            lineHeight: "0.95em",
            color: "#F9F9F9",
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
            <span data-hero-word className="inline-block text-helthy-lemon">Helthy.</span>
          </span>
        </h1>

        <div
          data-hero-cta
          className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-center gap-3"
          style={{ marginTop: "clamp(36px, 5vh, 60px)" }}
        >
          <CTAButton
            href={APP_STORE_URL}
            variant="primary"
            size="md"
            icon={
              <svg width="14" height="14" viewBox="0 0 256 256" aria-hidden="true">
                <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" fill="#0B0B0B" />
              </svg>
            }
          >
            App Store
          </CTAButton>
          <AndroidWaitlistButton />
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
        style={{ height: 180, background: "linear-gradient(transparent, #101012)", zIndex: 5 }}
      />
    </section>
  );
}
