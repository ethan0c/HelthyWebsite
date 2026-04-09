"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import HelthyMark from "@/components/ui/HelthyMark";
import PhoneFrame from "@/components/ui/PhoneFrame";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-eyebrow]", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from("[data-hero-line]", {
        y: 50,
        opacity: 0,
        scale: 0.96,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.25,
      });
      gsap.from("[data-hero-sub]", {
        y: 24,
        opacity: 0,
        duration: 1.0,
        ease: "power4.out",
        delay: 0.55,
      });
      gsap.from("[data-hero-cta]", {
        y: 24,
        opacity: 0,
        scale: 0.92,
        duration: 1.0,
        ease: "back.out(1.2)",
        delay: 0.75,
      });
      gsap.from("[data-hero-rating]", {
        y: 20,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.95,
      });
      gsap.from("[data-hero-phone]", {
        y: 80,
        opacity: 0,
        scale: 0.94,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.5,
      });
      // gentle floating loop on the phone
      gsap.to("[data-hero-phone]", {
        y: -12,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Silver-blue light background with soft orb blobs */}
      <div className="absolute inset-0 bg-[#EAF0FA] overflow-hidden">
        {/* Soft blue orb — top left */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "rgba(148, 190, 235, 0.45)" }}
        />
        {/* Lavender-silver orb — top right */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: "rgba(185, 200, 230, 0.35)" }}
        />
        {/* Periwinkle orb — bottom center */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[130px]"
          style={{ background: "rgba(160, 185, 230, 0.30)" }}
        />
        <div className="absolute inset-0 dot-grid opacity-[0.18]" aria-hidden="true" />
        {/* Subtle edge vignette to ground the section */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(210,220,240,0.20) 100%)",
          }}
        />
      </div>

      {/*
        Layout matches Wallet for Framer hero proportions:
          min-height: 800px, padding 160/44/100, gap 80 between text and phone.
        Vertical flex column, centered. Phone is 400px wide on desktop.
      */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-11 pt-40 pb-16 lg:pb-24 text-center flex flex-col items-center gap-16 lg:gap-20 min-h-[800px] justify-center">
        {/* Eyebrow */}
        <div data-hero-eyebrow>
          <span className="pill-badge">
            <HelthyMark size={14} />
            Helthy AI · Premium April 2026
          </span>
        </div>

        {/* Text block (compact) */}
        <div className="flex flex-col items-center gap-6 max-w-[820px]">
          <h1 className="font-heading font-light tracking-[-0.04em] leading-[0.97]">
            <span data-hero-line className="block text-[#0B0B0B] text-display-2xl">
              <span className="text-italics">Own</span> your fitness.
            </span>
          </h1>

          <p
            data-hero-sub
            className="text-base lg:text-lg text-[#374151] leading-relaxed font-light max-w-xl"
          >
            Your AI fitness and nutrition coach. Track meals, workouts, and
            progress in one app — free forever.
          </p>

          {/* CTA row */}
          <div
            data-hero-cta
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2"
          >
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-helthy-lemon px-7 py-3.5 text-helthy-black text-sm font-semibold tracking-tight transition-all hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(205,251,80,0.35)]"
            >
              Download free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.05] backdrop-blur-md px-7 py-3.5 text-[#374151] text-sm font-medium transition-all hover:text-[#0B0B0B] hover:bg-black/[0.09] hover:border-black/25"
            >
              See pricing
            </Link>
          </div>

          {/* Rating row — compact */}
          <div
            data-hero-rating
            className="flex items-center gap-2 text-[#374151]/70 text-xs"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3 fill-helthy-lemon"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span>
              <span className="text-numeric text-[#0B0B0B]">4.9</span> · Trusted by{" "}
              <span className="text-numeric text-[#0B0B0B]">2,000+</span> users
            </span>
          </div>
        </div>

        {/* Phone mockup — 400px to match wallet template */}
        <div
          data-hero-phone
          className="flex justify-center [transform-style:preserve-3d]"
        >
          <PhoneFrame
            src="/phones/homescreen.png"
            alt="Helthy app home screen"
            width={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}
