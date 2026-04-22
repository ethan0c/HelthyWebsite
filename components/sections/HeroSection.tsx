"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import AndroidWaitlistButton from "@/components/ui/AndroidWaitlistButton";
import CTAButton from "@/components/ui/CTAButton";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-h1]", {
        y: 30, opacity: 0, duration: 1, ease: "power3.out",
      });
      gsap.from("[data-hero-sub]", {
        y: 20, opacity: 0, duration: 0.8, delay: 0.25, ease: "power3.out",
      });
      gsap.from("[data-hero-cta]", {
        y: 15, opacity: 0, duration: 0.7, delay: 0.45, ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden bg-[#0F0F0F]"
      style={{ minHeight: "clamp(680px, 92svh, 980px)" }}
    >
      {/* Background video — shown on all breakpoints */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src="/videos/hero-man-running.mp4" type="video/mp4" />
      </video>

      {/* Video overlay — even darken so centered text stays legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.48) 45%, rgba(10,10,10,0.80) 100%)",
        }}
      />

      {/* Grain */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, backgroundImage: "url(/textures/hero-noise.png)", backgroundSize: "260px", opacity: 0.18, mixBlendMode: "overlay" }} />

      {/* Centered content */}
      <div
        className="w-full px-4 sm:px-6 md:px-8 relative flex flex-col items-center justify-center text-center"
        style={{
          zIndex: 4,
          minHeight: "clamp(680px, 92svh, 980px)",
          paddingTop: "clamp(100px, 12vh, 140px)",
          paddingBottom: "clamp(60px, 8vh, 100px)",
        }}
      >
        <h1
          data-hero-h1
          className="font-heading"
          style={{
            fontSize: "clamp(44px, 6vw, 88px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: "1.02em",
            color: "#F9F9F9",
            margin: 0,
            maxWidth: "14ch",
          }}
        >
          A coach that{" "}
          <span className="text-helthy-lemon">learns you</span>.
        </h1>

        <p
          data-hero-sub
          className="mx-auto"
          style={{
            fontSize: "clamp(16px, 1.4vw, 20px)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: "1.55em",
            color: "rgba(249,249,249,0.72)",
            maxWidth: 580,
            margin: "clamp(22px, 2.6vh, 32px) auto 0",
            textShadow: "0 2px 16px rgba(0,0,0,0.4)",
          }}
        >
          Log meals with a photo, track every lift, and get coached by AI that
          connects nutrition, training, and recovery.
        </p>

        <div
          data-hero-cta
          className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-center gap-3"
          style={{ marginTop: "clamp(28px, 3.6vh, 44px)" }}
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

        <p
          style={{
            marginTop: "clamp(16px, 2vh, 24px)",
            fontSize: "clamp(13px, 1.1vw, 15px)",
            color: "rgba(249,249,249,0.45)",
            letterSpacing: "-0.01em",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
          }}
        >
          Our core features will always be free. Download Helthy and get started.
        </p>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 180, background: "linear-gradient(transparent, #0A0A0A)", zIndex: 5 }}
      />
    </section>
  );
}
