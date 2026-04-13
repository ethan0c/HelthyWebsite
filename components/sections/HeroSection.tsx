"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import FloatingIcons from "@/components/ui/FloatingIcons";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const CTA_SHADOW =
  "rgba(255,255,255,0.5) 0px 2px 1px 0px inset," +
  "rgba(255,255,255,0.72) 0px 0.6px 0.6px -1.25px inset," +
  "rgba(255,255,255,0.635) 0px 2.29px 2.29px -2.5px inset," +
  "rgba(255,255,255,0.25) 0px 10px 10px -3.75px inset," +
  "rgba(205,255,80,0.35) 0px 14px 6px -8px";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-h1]", {
        y: 30, opacity: 0, duration: 1, ease: "power3.out",
      });
      gsap.from("[data-hero-sub]", {
        y: 20, opacity: 0, duration: 0.8, delay: 0.3, ease: "power3.out",
      });
      gsap.from("[data-hero-cta]", {
        y: 15, opacity: 0, duration: 0.7, delay: 0.5, ease: "power3.out",
      });
      gsap.from("[data-hero-phone]", {
        y: 60, opacity: 0, duration: 1.2, delay: 0.4, ease: "power3.out",
      });
      gsap.from("[data-hero-proof]", {
        y: 10, opacity: 0, duration: 0.6, delay: 0.7, ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Giant thin decorative icons */}
      <FloatingIcons
        positions={[
          [5, 60, 280, -15],
          [25, 78, 220, 20],
          [55, 65, 320, -30],
          [70, 85, 200, 10],
          [15, 92, 180, 45],
        ]}
        icons={[0, 3, 2, 6, 7]}
        opacity={0.03}
      />

      {/* Phone image as background — fills entire section */}
      <div data-hero-phone className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <Image
          src="/phones/iPhone 15 Pro mockup with textured rock base.png"
          alt="Helthy app home screen on iPhone"
          fill
          priority
          className="object-contain object-left-bottom"
          style={{ transform: "translateY(100px)" }}
        />
      </div>

      {/* Text content — overlaid on right */}
      <div
        data-hero-h1
        className="relative w-full lg:w-1/2 lg:ml-auto text-center lg:text-left"
        style={{
          padding: "0 32px",
          paddingTop: "clamp(140px, 18vh, 220px)",
          paddingBottom: "clamp(180px, 20vh, 300px)",
          zIndex: 3,
        }}
      >
        <h1 className="font-heading font-light" style={{
          fontSize: "clamp(44px, 6vw, 80px)",
          letterSpacing: "-0.035em", lineHeight: "0.95em",
          color: "#F9F9F9", margin: 0,
        }}>
          Track calories with a <span className="text-italics text-helthy-lemon">photo</span>.
        </h1>

        <p data-hero-sub style={{
          fontSize: "clamp(17px, 2vw, 20px)", fontWeight: 400,
          letterSpacing: "-0.01em", lineHeight: "1.6em",
          color: "rgba(249,249,249,0.65)",
          maxWidth: 480, margin: "24px 0 0",
        }}
        className="mx-auto lg:mx-0"
        >
          Snap a meal, get instant macros. Your AI coach connects nutrition,
          training, and recovery — so you never guess again.
        </p>

        {/* CTA */}
        <div data-hero-cta className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3" style={{ marginTop: 32 }}>
          <Link
            href={APP_STORE_URL}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2"
            style={{
              padding: "14px 28px", borderRadius: 14,
              border: "1px solid #CDFF50", backgroundColor: "#CDFF50",
              color: "#151515", fontSize: 15, fontWeight: 600,
              letterSpacing: "-0.01em", lineHeight: "1.2em",
              textDecoration: "none", boxShadow: CTA_SHADOW,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" fill="#151515" />
            </svg>
            Download for free
          </Link>
          <span style={{ fontSize: 13, color: "rgba(249,249,249,0.35)" }}>
            iOS &amp; Android
          </span>
        </div>

        {/* Social proof strip */}
        <div data-hero-proof className="flex items-center justify-center lg:justify-start gap-6 flex-wrap" style={{ marginTop: 28 }}>
          <ProofStat value="4.9" label="App Store" />
          <div className="w-px h-4 bg-white/10" />
          <ProofStat value="10K+" label="meals logged" />
          <div className="w-px h-4 bg-white/10" />
          <ProofStat value="1,500+" label="exercises" />
        </div>
      </div>
    </section>
  );
}

function ProofStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-numeric text-[18px] font-semibold text-white">{value}</span>
      <span className="text-[13px] text-white/45">{label}</span>
    </div>
  );
}
