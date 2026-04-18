"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Icon from "@mdi/react";
import {
  mdiDna,
  mdiInfinity
} from "@mdi/js";

export default function WhyHelthySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 70%" };

      gsap.from("[data-why-eyebrow]", {
        opacity: 0, y: 10, duration: 0.5, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-why-line]", {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: "power3.out",
        delay: 0.15, scrollTrigger: trigger,
      });
      gsap.from("[data-why-body]", {
        opacity: 0, y: 16, duration: 0.8, ease: "power3.out",
        delay: 0.6, scrollTrigger: trigger,
      });
      gsap.from("[data-why-proof]", {
        opacity: 0, y: 10, duration: 0.6, ease: "power3.out",
        delay: 0.85, scrollTrigger: trigger,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-helthy"
      className="relative section-padding overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #080d10 10%, #41515a 45%, #3f4e56 65%, #0A0A0A 100%)",
      }}
    >
      {/* Top fade — blends features bottom into this gradient */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 180, zIndex: 1, background: "linear-gradient(#0A0A0A 0%, rgba(10,10,10,0) 100%)" }}
      />

      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          zIndex: 2,
          backgroundImage: "url(/textures/hero-noise.png)",
          backgroundSize: "260px",
          opacity: 0.35,
        }}
      />

      {/* Abstract floating background icons */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {/* Foundation - The code */}
        <Icon
          path={mdiDna}
          size="420px"
          className="absolute text-[#CDFF50]"
          style={{ top: "30%", right: "-12%", opacity: 0.04, transform: "rotate(35deg)" }}
        />
        
        {/* Whole Picture - Infinite integration */}
        <Icon
          path={mdiInfinity}
          size="420px"
          className="absolute text-white"
          style={{ top: "60%", left: "-15%", opacity: 0.04, transform: "rotate(-35deg)" }}
        />
      </div>

      {/* Deep lime aurora to give it that "Helthy" signature glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none left-1/2 -translate-x-1/2"
        style={{
          zIndex: 0,
          top: "15%",
          width: "min(1200px, 150vw)",
          height: 800,
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(205,255,80,0.06) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-page relative text-center z-10 py-10 md:py-20">
        <span
          data-why-eyebrow
          className="inline-block font-heading text-[11px] font-bold uppercase tracking-[0.25em] mb-10"
          style={{ color: "rgba(249,249,249,0.3)" }}
        >
          Why Helthy
        </span>

        <h2
          className="font-heading"
          style={{
            fontSize: "clamp(36px, 5vw, 68px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: "1.05em",
            color: "#F9F9F9",
            margin: 0,
          }}
        >
          <span data-why-line className="block">One body.</span>
          <span data-why-line className="block">One app.</span>
          <span data-why-line className="block">
            <span className="text-helthy-lemon">Whole picture.</span>
          </span>
        </h2>

        <p
          data-why-body
          className="mx-auto"
          style={{
            marginTop: "clamp(32px, 4vh, 56px)",
            fontSize: "clamp(17px, 1.5vw, 21px)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: "1.6em",
            color: "rgba(249,249,249,0.7)",
            maxWidth: 640,
          }}
        >
          Most people juggle four apps to understand one body — a macro tracker here,
          a lifting log there, a scale that talks to nothing. Helthy connects nutrition,
          training, and recovery into one coach that sees the whole picture.
        </p>

        <p
          data-why-proof
          className="mx-auto"
          style={{
            marginTop: "clamp(20px, 2.4vh, 32px)",
            fontSize: 14,
            letterSpacing: "0.02em",
            color: "rgba(249,249,249,0.4)",
            fontFamily: "var(--font-body)",
          }}
        >
          Because one number never tells the story.
        </p>
      </div>

      {/* Bottom fade — melts back into black */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 240, zIndex: 10, background: "linear-gradient(to bottom, transparent, #0A0A0A)" }}
      />
    </section>
  );
}
