"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

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
      className="relative section-padding"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Subtle aurora wash */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none left-1/2 -translate-x-1/2"
        style={{
          zIndex: 0,
          top: "20%",
          width: "min(1000px, 110vw)",
          height: 600,
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(205,255,80,0.05) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container-page relative text-center" style={{ zIndex: 1 }}>
        <p
          data-why-eyebrow
          className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-10"
          style={{ color: "rgba(249,249,249,0.45)", fontFamily: "var(--font-body)" }}
        >
          Why helthy
        </p>

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
    </section>
  );
}
