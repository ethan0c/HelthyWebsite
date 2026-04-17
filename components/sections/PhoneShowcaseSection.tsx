"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function PhoneShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        ["[data-phone-eyebrow]", "[data-phone-heading]", "[data-phone-sub]"],
        {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-phone-heading]",
            start: "top 85%",
          },
        }
      );
      gsap.from("[data-phone-img]", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-phone-img]",
          start: "top 85%",
        },
      });
      gsap.from("[data-phone-stat]", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-phone-stats]",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="phone-showcase"
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0F0F0F 0%, #1A2024 35%, #1F282E 65%, #0F0F0F 100%)",
        paddingTop: "clamp(72px, 10vh, 120px)",
        paddingBottom: "clamp(72px, 10vh, 120px)",
      }}
    >
      {/* Soft teal pool — positioned behind phone (lower in the section) */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none left-1/2 -translate-x-1/2"
        style={{
          top: "40%",
          width: "min(1100px, 115vw)",
          height: "min(820px, 90vw)",
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(100,170,210,0.32) 0%, rgba(80,140,180,0.12) 40%, rgba(80,140,180,0.04) 65%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* Top fade — blends hero's bottom #0A0A0A into this gradient */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 140, background: "linear-gradient(#0A0A0A, transparent)" }}
      />

      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/hero-noise.png)",
          backgroundSize: "260px",
          opacity: 0.18,
          mixBlendMode: "overlay",
        }}
      />

      <div className="container-page relative flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span
          data-phone-eyebrow
          className="font-heading uppercase"
          style={{
            fontSize: "clamp(11px, 0.85vw, 13px)",
            letterSpacing: "0.22em",
            color: "rgba(205,255,80,0.8)",
            fontWeight: 500,
          }}
        >
          Built to adapt
        </span>

        {/* Heading */}
        <h2
          data-phone-heading
          className="font-heading"
          style={{
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: "1.08em",
            color: "#F9F9F9",
            margin: "clamp(12px, 1.4vh, 18px) 0 0",
            maxWidth: "18ch",
          }}
        >
          Every log makes it{" "}
          <span className="text-helthy-lemon">smarter</span>.
        </h2>

        <p
          data-phone-sub
          className="mx-auto"
          style={{
            fontSize: "clamp(15px, 1.2vw, 18px)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: "1.6em",
            color: "rgba(249,249,249,0.62)",
            maxWidth: 540,
            margin: "clamp(16px, 2vh, 24px) auto 0",
          }}
        >
          Helthy connects what you eat, how you train, and how you recover —
          then tunes the plan to you, not the other way around.
        </p>

        {/* Proof stats */}
        <div
          data-phone-stats
          className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap"
          style={{ marginTop: "clamp(28px, 3.4vh, 40px)" }}
        >
          <ProofStat target={4.9} decimals={1} label="App Store" />
          <div data-phone-stat className="w-px h-4 bg-white/10" />
          <ProofStat target={10} suffix="K+" label="meals logged" />
          <div data-phone-stat className="w-px h-4 bg-white/10" />
          <ProofStat target={1500} suffix="+" label="exercises" />
        </div>

        {/* Phone */}
        <div
          data-phone-img
          className="relative mt-10 sm:mt-14"
        >
          {/* Close halo — tight light behind phone so top edge blends into bg */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            style={{
              width: "min(440px, 80vw)",
              height: "min(640px, 120vw)",
              background:
                "radial-gradient(ellipse 45% 55% at 50% 45%, rgba(120,180,215,0.35) 0%, rgba(90,150,190,0.14) 40%, rgba(80,140,180,0.04) 65%, transparent 80%)",
              filter: "blur(40px)",
            }}
          />
          {/* Wide ambient glow — spreads the brightness into the section bg */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            style={{
              width: "min(820px, 110vw)",
              height: "min(820px, 110vw)",
              background:
                "radial-gradient(ellipse at center, rgba(80,140,180,0.18) 0%, rgba(80,140,180,0.05) 45%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />
          {/* Soft tinted shadow pool — blends phone into section floor */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none left-1/2 -translate-x-1/2"
            style={{
              bottom: "-40px",
              width: "min(620px, 85vw)",
              height: 160,
              background:
                "radial-gradient(ellipse at center, rgba(15,20,28,0.75) 0%, rgba(15,20,28,0.3) 50%, transparent 75%)",
              filter: "blur(28px)",
            }}
          />
          <div
            className="relative aspect-[1368/2828]"
            style={{ width: "min(400px, 74vw)" }}
          >
            <Image
              src="/phones/hero-home-transparent.png"
              alt="Helthy app home screen on iPhone"
              fill
              sizes="(max-width: 640px) 74vw, 400px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStat({
  target,
  decimals = 0,
  suffix = "",
  prefix = "",
  label,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const counter = { val: 0 };
    const format = (v: number) =>
      `${prefix}${v
        .toFixed(decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`;

    const tween = gsap.to(counter, {
      val: target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = format(counter.val);
      },
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });
    // initialize
    el.textContent = format(0);
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, decimals, suffix, prefix]);

  return (
    <div data-phone-stat className="flex items-center gap-2">
      <span
        ref={spanRef}
        className="text-numeric text-[16px] sm:text-[18px] font-semibold text-white tabular-nums"
      >
        {`${prefix}${(0).toFixed(decimals)}${suffix}`}
      </span>
      <span className="text-[12px] sm:text-[13px] text-white/45">{label}</span>
    </div>
  );
}
