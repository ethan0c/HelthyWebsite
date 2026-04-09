"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import PhoneFrame from "@/components/ui/PhoneFrame";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const PHONE_W = 320;

const CTA_SHADOW =
  "rgba(255,255,255,0.5) 0px 2px 1px 0px inset," +
  "rgba(255,255,255,0.72) 0px 0.6px 0.6px -1.25px inset," +
  "rgba(255,255,255,0.635) 0px 2.29px 2.29px -2.5px inset," +
  "rgba(255,255,255,0.25) 0px 10px 10px -3.75px inset," +
  "rgba(205,251,80,0.35) 0px 14px 6px -8px";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-h1]", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from("[data-hero-phone]", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from("[data-hero-sub]", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      });
      gsap.from("[data-hero-cta]", {
        y: 15,
        opacity: 0,
        duration: 0.7,
        delay: 0.65,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full flex flex-col items-center"
      style={{ paddingBottom: 80 }}
    >
      {/* Noise */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "url(/textures/hero-noise.png)",
        backgroundRepeat: "repeat", backgroundSize: "128px",
        mixBlendMode: "screen", zIndex: 1,
      }} />

      {/* H1 */}
      <div data-hero-h1 className="relative w-full text-center" style={{
        paddingTop: "clamp(100px, 14vh, 160px)", paddingLeft: 44, paddingRight: 44, paddingBottom: 40, zIndex: 3,
      }}>
        <h1 className="font-heading font-light" style={{
          fontSize: "clamp(48px, 6.5vw, 88px)",
          letterSpacing: "-0.035em", lineHeight: "0.97em",
          color: "#F9F9F9", margin: 0,
        }}>
Your fitness, <span className="text-italics text-helthy-lemon">handled</span>.
        </h1>
      </div>

      {/* Phone */}
      <div className="relative w-full flex justify-center" style={{ zIndex: 2 }}>
        <div data-hero-phone style={{ position: "relative", zIndex: 10 }}>
          <PhoneFrame src="/screenshots/hero-app.jpg" alt="Helthy app home screen" width={PHONE_W} priority />
        </div>
      </div>

      {/* Sub + CTA — scroll into view below phone */}
      <div className="relative flex flex-col items-center w-full" style={{ gap: 20, paddingTop: 40, zIndex: 2 }}>
        <p data-hero-sub style={{
          fontSize: 20, fontWeight: 400,
          letterSpacing: "-0.02em", lineHeight: "1.45em",
          color: "rgba(249,249,249,0.85)", textAlign: "center",
          maxWidth: 440, margin: 0,
        }}>
          Your AI fitness and nutrition coach. Track meals, workouts, and
          progress in one app — free forever.
        </p>

        <Link
          data-hero-cta
          href={APP_STORE_URL}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2"
          style={{
            padding: "10px 20px", borderRadius: 14,
            border: "1px solid #CDFF50", backgroundColor: "#CDFF50",
            color: "#0B0B0B", fontSize: 15, fontWeight: 600,
            letterSpacing: "-0.01em", lineHeight: "1.2em",
            textDecoration: "none", boxShadow: CTA_SHADOW,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" fill="#0B0B0B" />
          </svg>
          Download for free
        </Link>

        <p data-hero-bottom style={{
          fontSize: 13, fontWeight: 500,
          color: "rgba(249,249,249,0.5)", letterSpacing: "-0.01em", margin: 0,
        }}>
          Android coming soon
        </p>
      </div>
    </section>
  );
}
