"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import HelthyMark from "@/components/ui/HelthyMark";
import AndroidWaitlistButton from "@/components/ui/AndroidWaitlistButton";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.from("[data-cta-mark]", {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(2)",
      })
        .from(
          "[data-cta-heading]",
          { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          "[data-cta-sub]",
          { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          "[data-cta-button]",
          { y: 15, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
;

      // Slowly rotate the glow ring
      gsap.to("[data-glow-ring]", {
        rotation: 360,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden section-glow-lemon"
    >
      {/* Layered ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary lemon glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] aspect-square rounded-full blur-[180px]"
          style={{
            background:
              "radial-gradient(circle, rgba(205,255,80,0.18) 0%, rgba(205,255,80,0.04) 40%, transparent 65%)",
          }}
        />
        {/* Secondary warm glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[30%] w-[60vw] max-w-[600px] aspect-square rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(233,108,44,0.06) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Rotating gradient ring */}
      <div
        data-glow-ring
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[700px] max-h-[700px] lg:max-w-[900px] lg:max-h-[900px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(205,255,80,0.08) 15%, transparent 30%, transparent 50%, rgba(205,255,80,0.05) 65%, transparent 80%, transparent 100%)",
          mask: "radial-gradient(circle, transparent 48%, black 49%, black 51%, transparent 52%)",
          WebkitMask:
            "radial-gradient(circle, transparent 48%, black 49%, black 51%, transparent 52%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Mark */}
        <div data-cta-mark className="flex justify-center mb-10">
          <HelthyMark size={64} pulse />
        </div>

        {/* Heading — big display */}
        <h2
          data-cta-heading
          className="text-display-xl font-heading font-light tracking-tight mb-6"
        >
          Stop guessing,{" "}
          <span className="text-italics text-helthy-lemon">start today</span>.
        </h2>

        <p
          data-cta-sub
          className="text-[15px] sm:text-[17px] lg:text-[19px] text-white/55 font-light leading-relaxed max-w-lg mx-auto mb-8 sm:mb-10"
        >
          Free forever. No credit card. Unlock unlimited AI with Premium
          whenever you&apos;re ready.
        </p>

        {/* CTA buttons */}
        <div data-cta-button className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-center gap-4">
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group text-[14px] sm:text-[15px]"
          >
            <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" fill="#151515" />
            </svg>
            App Store
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <AndroidWaitlistButton />
        </div>
      </div>
    </section>
  );
}
