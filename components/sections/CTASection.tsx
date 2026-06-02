"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import HelthyLogoGlass from "@/components/ui/HelthyLogoGlass";
import AndroidWaitlistButton from "@/components/ui/AndroidWaitlistButton";
import CTAButton from "@/components/ui/CTAButton";
import AnimatedMesh from "@/components/ui/AnimatedMesh";
import Icon from "@mdi/react";
import { mdiLightningBoltOutline } from "@mdi/js";

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
      {/* Massive subtle background watermark */}
      <div
        className="absolute top-1/2 left-[60%] lg:left-[70%] -translate-y-1/2 opacity-[0.03] text-helthy-lemon pointer-events-none -z-10 blur-[2px]"
        aria-hidden="true"
        style={{ transform: "translateY(-50%) rotate(15deg) scale(1.2)" }}
      >
        <Icon path={mdiLightningBoltOutline} size={50} color="currentColor" />
      </div>

      {/* Constantly-drifting ambient gradient mesh */}
      <AnimatedMesh className="-z-20" />

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

      <div className="relative mx-auto max-w-3xl text-center z-10">
        {/* Glass Mark */}
        <div data-cta-mark className="flex justify-center mb-8 drop-shadow-2xl">
          <HelthyLogoGlass size={72} />
        </div>

        {/* Heading — big display */}
        <h2
          data-cta-heading
          className="text-display-xl font-heading tracking-tight mb-6"
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
        <div data-cta-button className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-center gap-4">
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
      </div>
    </section>
  );
}
