"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import AndroidWaitlistButton from "@/components/ui/AndroidWaitlistButton";

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
      gsap.from("[data-hero-proof]", {
        y: 10, opacity: 0, duration: 0.6, delay: 0.6, ease: "power3.out",
      });
      gsap.from("[data-hero-phone]", {
        y: 80, opacity: 0, duration: 1.3, delay: 0.5, ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* ── Aurora bloom behind phone ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none left-1/2 -translate-x-1/2"
        style={{
          zIndex: 0,
          top: "38%",
          width: "min(1400px, 130vw)",
          height: "min(1100px, 110vw)",
          background: [
            "radial-gradient(ellipse 55% 40% at 30% 35%, rgba(120,170,255,0.22) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 35% at 72% 45%, rgba(255,170,120,0.18) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 45% at 50% 65%, rgba(205,255,80,0.14) 0%, transparent 60%)",
          ].join(","),
          filter: "blur(40px)",
          opacity: 0.9,
        }}
      />
      {/* Soft grain overlay — kept subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: "url(/textures/hero-noise.png)",
          backgroundSize: "260px",
          opacity: 0.22,
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Centered vertical stack ── */}
      <div
        className="container-page relative flex flex-col items-center text-center"
        style={{
          zIndex: 3,
          paddingTop: "clamp(40px, 8vh, 96px)",
          paddingBottom: "clamp(40px, 6vh, 80px)",
        }}
      >
        <h1
          data-hero-h1
          className="font-heading font-light"
          style={{
            fontSize: "clamp(56px, 8.2vw, 128px)",
            letterSpacing: "-0.04em",
            lineHeight: "0.94em",
            color: "#F9F9F9",
            margin: 0,
            maxWidth: "14ch",
          }}
        >
          A coach that{" "}
          <span className="text-italics text-helthy-lemon">learns you</span>.
        </h1>

        <p
          data-hero-sub
          className="mx-auto"
          style={{
            fontSize: "clamp(16px, 1.4vw, 19px)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: "1.55em",
            color: "rgba(249,249,249,0.62)",
            maxWidth: 560,
            margin: "clamp(20px, 2.4vh, 32px) auto 0",
          }}
        >
          Log meals with a photo, track every lift, and get coached by AI that
          connects nutrition, training, and recovery.
        </p>

        <div
          data-hero-cta
          className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-center gap-3"
          style={{ marginTop: "clamp(28px, 3.6vh, 44px)" }}
        >
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-[15px]"
          >
            <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" fill="#151515" />
            </svg>
            App Store
          </Link>
          <AndroidWaitlistButton />
        </div>

        {/* Proof strip */}
        <div
          data-hero-proof
          className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap"
          style={{ marginTop: "clamp(28px, 3.4vh, 40px)" }}
        >
          <ProofStat value="4.9" label="App Store" />
          <div className="w-px h-4 bg-white/10" />
          <ProofStat value="10K+" label="meals logged" />
          <div className="w-px h-4 bg-white/10" />
          <ProofStat value="1,500+" label="exercises" />
        </div>

        {/* Phone — centered, floating */}
        <div
          data-hero-phone
          className="relative w-full flex justify-center"
          style={{ marginTop: "clamp(48px, 7vh, 96px)" }}
        >
          {/* Radial shadow pool beneath phone */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none left-1/2 -translate-x-1/2"
            style={{
              bottom: "-40px",
              width: "min(560px, 70vw)",
              height: 120,
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <div
            className="relative aspect-[1368/2828]"
            style={{
              width: "min(380px, 72vw)",
            }}
          >
            <Image
              src="/phones/hero-home-transparent.png"
              alt="Helthy app home screen on iPhone"
              fill
              sizes="(max-width: 640px) 72vw, 380px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Fade to bg at section bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 140, background: "linear-gradient(transparent, #0A0A0A)", zIndex: 2 }}
      />
    </section>
  );
}

function ProofStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-numeric text-[16px] sm:text-[18px] font-semibold text-white">{value}</span>
      <span className="text-[12px] sm:text-[13px] text-white/45">{label}</span>
    </div>
  );
}
