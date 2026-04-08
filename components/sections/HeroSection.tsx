"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

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
        delay: 0.6,
      });

      gsap.from("[data-hero-cta]", {
        y: 24,
        opacity: 0,
        scale: 0.92,
        duration: 1.0,
        ease: "back.out(1.2)",
        delay: 0.8,
      });

      gsap.from("[data-hero-rating]", {
        y: 20,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        delay: 1.0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/*
        Animated lemon mesh-gradient background. Phase 1 of the rebrand —
        replaces the stock running-man video with a pure-CSS, brand-tinted
        atmosphere. No asset, no licensing, infinitely loopable.

        TODO(rebrand-phase-2): swap for a Three.js MomentumRing scene
        (giant slow-rotating training ring) once that component is built.
      */}
      <div className="absolute inset-0 bg-[#060606] overflow-hidden">
        <div className="mesh-blob mesh-blob-1" aria-hidden="true" />
        <div className="mesh-blob mesh-blob-2" aria-hidden="true" />
        <div className="mesh-blob mesh-blob-3" aria-hidden="true" />

        {/* Subtle dot grid for texture */}
        <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

        {/* Soft center vignette so the text always reads cleanly */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 50%, transparent 0%, rgba(0,0,0,0.45) 85%)",
          }}
        />
      </div>

      {/* Centered content stack */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-8 py-32 lg:py-40 text-center">
        {/* Eyebrow pill — AI / Premium announcement */}
        <div data-hero-eyebrow className="mb-8 flex justify-center">
          <span className="pill-badge">
            <Sparkles className="w-3 h-3" />
            Introducing Helthy AI · Premium April 2026
          </span>
        </div>

        {/* Headline — massive Lyon Display, Origin-inspired */}
        <h1 className="font-heading font-light tracking-[-0.035em] leading-[0.92] mb-8">
          <span data-hero-line className="block text-white text-display-2xl">
            <span className="text-italics">Own</span> your fitness.
          </span>
        </h1>

        {/* Subhead */}
        <p
          data-hero-sub
          className="mx-auto max-w-2xl text-base lg:text-lg text-white/75 leading-relaxed mb-10 font-light"
        >
          Helthy is your AI-powered fitness and nutrition coach. Track meals,
          workouts, and progress in one app — free forever, with{" "}
          <span className="text-helthy-lemon">Premium AI</span> launching April
          2026.
        </p>

        {/* CTA row */}
        <div
          data-hero-cta
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[#0B0B0B] text-sm font-semibold tracking-tight transition-all hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)]"
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md px-7 py-3.5 text-white/80 text-sm font-medium transition-all hover:text-white hover:bg-white/[0.08] hover:border-white/25"
          >
            See pricing
          </Link>
        </div>

        {/* Rating — minimal centered row, Origin/Cluely style */}
        <div
          data-hero-rating
          className="flex flex-col items-center gap-2 text-white/70"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-3.5 h-3.5 fill-helthy-lemon"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <p className="text-xs tracking-wide text-white/60">
            <span className="text-numeric text-white font-medium">4.9</span> on
            the App Store · Trusted by{" "}
            <span className="text-numeric text-white font-medium">2,000+</span>{" "}
            users
          </p>
        </div>
      </div>
    </section>
  );
}
