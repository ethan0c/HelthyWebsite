"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.helthy.app";

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
      style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}
    >
      {/* ── Desktop: phone as left-aligned background ── */}
      <div
        data-hero-phone
        className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block"
        style={{ zIndex: 1 }}
      >
        <Image
          src="/phones/iphone-hero-mockup.png"
          alt="Helthy app home screen on iPhone"
          fill
          priority
          className="object-contain object-left-bottom"
          style={{ transform: "translateY(100px)" }}
        />
      </div>

      {/* ── Desktop layout: text on right half ── */}
      <div
        data-hero-h1
        className="relative hidden lg:flex flex-col justify-center w-1/2 ml-auto text-left"
        style={{
          padding: "0 48px",
          paddingTop: "clamp(180px, 25vh, 320px)",
          paddingBottom: "clamp(240px, 30vh, 440px)",
          zIndex: 3,
          minHeight: "100vh",
        }}
      >
        <HeroContent />
      </div>

      {/* ── Mobile layout: stacked — text centered, phone below ── */}
      <div className="lg:hidden flex flex-col items-center" style={{ zIndex: 3 }}>
        {/* Text block */}
        <div
          data-hero-h1
          className="relative w-full text-center px-6 sm:px-8"
          style={{
            paddingTop: "clamp(120px, 16vh, 180px)",
            paddingBottom: 48,
          }}
        >
          <HeroContent mobile />
        </div>

        {/* Phone image — visible, not background */}
        <div
          data-hero-phone
          className="relative w-full flex justify-center"
          style={{ marginBottom: -60 }}
        >
          <div className="relative w-[280px] sm:w-[320px] aspect-[9/19]">
            <Image
              src="/phones/iphone-hero-mockup.png"
              alt="Helthy app home screen on iPhone"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Fade to bg at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none"
            style={{ background: "linear-gradient(transparent, #0A0A0A)" }}
          />
        </div>
      </div>
    </section>
  );
}

function HeroContent({ mobile = false }: { mobile?: boolean }) {
  const align = mobile ? "center" : "left";

  return (
    <>
      <h1 className="font-heading font-light" style={{
        fontSize: mobile ? "clamp(36px, 10vw, 48px)" : "clamp(52px, 5vw, 80px)",
        letterSpacing: "-0.035em", lineHeight: "0.95em",
        color: "#F9F9F9", margin: 0,
        textAlign: align,
      }}>
        Your AI fitness coach that actually{" "}
        <span className="text-italics text-helthy-lemon">learns you</span>.
      </h1>

      <p data-hero-sub style={{
        fontSize: mobile ? 16 : "clamp(17px, 2vw, 20px)", fontWeight: 400,
        letterSpacing: "-0.01em", lineHeight: "1.6em",
        color: "rgba(249,249,249,0.65)",
        maxWidth: 500, margin: "28px auto 0",
        textAlign: align,
      }}
      className={mobile ? "mx-auto" : "mx-0"}
      >
        Log meals with a photo, track every lift, and get coached by AI
        that connects your nutrition, training, and recovery into one
        clear picture. Stop guessing — Helthy thinks with you.
      </p>

      {/* CTA */}
      <div
        data-hero-cta
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
        style={{ marginTop: mobile ? 32 : 44 }}
      >
        <Link
          href={APP_STORE_URL}
          target="_blank" rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2.5 rounded-full transition-all hover:-translate-y-[2px] hover:shadow-[0_20px_60px_rgba(205,251,80,0.4)]"
          style={{
            padding: mobile ? "12px 28px" : "14px 32px",
            backgroundColor: "#CDFF50",
            color: "#151515", fontSize: mobile ? 14 : 15, fontWeight: 600,
            letterSpacing: "-0.01em", lineHeight: "1.2em",
            textDecoration: "none", boxShadow: CTA_SHADOW,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" fill="#151515" />
          </svg>
          App Store
        </Link>
        <Link
          href={PLAY_STORE_URL}
          target="_blank" rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2.5 rounded-full transition-all hover:-translate-y-[2px] hover:shadow-[0_20px_60px_rgba(205,251,80,0.4)]"
          style={{
            padding: mobile ? "12px 28px" : "14px 32px",
            backgroundColor: "#CDFF50",
            color: "#151515", fontSize: mobile ? 14 : 15, fontWeight: 600,
            letterSpacing: "-0.01em", lineHeight: "1.2em",
            textDecoration: "none", boxShadow: CTA_SHADOW,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.332a1 1 0 0 1 0 1.72L17.698 13.892l-2.467-2.467 2.467-2.467zM5.864 3.458L16.801 9.79l-2.302 2.302-8.635-8.635z" fill="#151515" />
          </svg>
          Google Play
        </Link>
      </div>

      {/* Social proof strip */}
      <div
        data-hero-proof
        className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center"
        style={{ marginTop: mobile ? 28 : 40 }}
      >
        <ProofStat value="4.9" label="App Store" />
        <div className="w-px h-4 bg-white/10" />
        <ProofStat value="10K+" label="meals logged" />
        <div className="w-px h-4 bg-white/10" />
        <ProofStat value="1,500+" label="exercises" />
      </div>
    </>
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
