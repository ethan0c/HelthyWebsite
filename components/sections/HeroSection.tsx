"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

// Six floating cards, positioned relative to the phone's bottom-center (matches reference).
// { side, width, aspectRatio, bottom/top, offset, rotate, initialX, mask }
const FLOATING_CARDS = [
  {
    id: "img-01",
    side: "right" as const,
    bottom: 302,
    offset: -123,
    rotate: 1,
    initialX: -200,
    mask: "radial-gradient(100% 441% at -11.1% 60%, #0000 19.5453%, #000 100%)",
  },
  {
    id: "img-02",
    side: "right" as const,
    bottom: 429,
    offset: -153,
    rotate: -6,
    initialX: -140,
    mask: "radial-gradient(100% 441% at -11.1% 60%, #0000 19.5453%, #000 100%)",
  },
  {
    id: "img-03",
    side: "right" as const,
    bottom: 567,
    offset: -123,
    rotate: 2,
    initialX: -200,
    mask: "radial-gradient(100% 441% at -11.1% 60%, #0000 19.5453%, #000 100%)",
  },
  {
    id: "img-04",
    side: "left" as const,
    bottom: 579,
    offset: -124,
    rotate: 2,
    initialX: 80,
    mask: "radial-gradient(95% 301% at 2.7% 57.7%, #000 0%, #0000 100%)",
  },
  {
    id: "img-05",
    side: "left" as const,
    bottom: 452,
    offset: -154,
    rotate: -2,
    initialX: 140,
    mask: "radial-gradient(100% 301% at 2.7% 57.7%, #000 0%, #0000 100%)",
  },
  {
    id: "img-06",
    side: "left" as const,
    bottom: 325,
    offset: -124,
    rotate: 5,
    initialX: 80,
    mask: "radial-gradient(92% 301% at 2.7% 57.7%, #000 0%, #0000 100%)",
  },
];

// Inset-highlight shadow stack from the reference primary CTA (adapted to lemon).
const CTA_SHADOW =
  "rgba(255, 255, 255, 0.5) 0px 2px 1px 0px inset, " +
  "rgba(255, 255, 255, 0.72) 0px 0.602187px 0.602187px -1.25px inset, " +
  "rgba(255, 255, 255, 0.635) 0px 2.28853px 2.28853px -2.5px inset, " +
  "rgba(255, 255, 255, 0.25) 0px 10px 10px -3.75px inset, " +
  "rgba(205, 251, 80, 0.35) 0px 14px 6px -8px";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-h1]", { y: 24, opacity: 0, duration: 1.0 }, 0.1)
        .from(
          "[data-hero-phone-inner]",
          { y: 40, opacity: 0, scale: 0.96, duration: 1.2, ease: "power4.out" },
          0.2
        )
        .from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.9 }, 0.45)
        .from(
          "[data-hero-cta]",
          { y: 20, opacity: 0, scale: 0.95, duration: 0.9, ease: "back.out(1.2)" },
          0.75
        )
        .from("[data-hero-browsers]", { y: 20, opacity: 0, duration: 0.9 }, 0.9);

      // Floating cards — each starts at its own translateX offset (preserved via CSS var),
      // tween x from that offset → 0 and opacity 0 → 1. Rotation stays on the element.
      gsap.utils
        .toArray<HTMLElement>("[data-hero-card]")
        .forEach((el) => {
          const fromX = Number(el.dataset.fromX || 0);
          gsap.fromTo(
            el,
            { x: fromX, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 1.4,
              ease: "power4.out",
              delay: 0.55,
            }
          );
        });

      // Gentle floating loop on the phone (wraps the enter animation target)
      gsap.to("[data-hero-phone-float]", {
        y: -10,
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
      data-framer-name="Hero"
      id="hero"
      className="relative flex flex-col items-center justify-center w-full overflow-visible"
      style={{
        minHeight: 800,
        padding: "160px 44px 100px",
        gap: 80,
        // Steel teal base (replacing reference BG image)
        backgroundColor: "#607C8A",
      }}
    >
      {/* Glow blob — mimics reference "framer-vcgj52" */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: 211,
          left: "calc(50% - 235px)",
          width: 470,
          height: 597,
          borderRadius: 888,
          filter: "blur(48px)",
          mixBlendMode: "hard-light",
          background:
            "radial-gradient(closest-side, rgba(236,242,244,0.55), rgba(96,124,138,0) 70%)",
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      {/* Noise texture overlay — copied from reference */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/textures/hero-noise.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
          mixBlendMode: "screen",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-start w-full max-w-[800px]"
        style={{ gap: 22, zIndex: 2 }}
      >
        {/* Top container — H1 + phone + sub + floating cards */}
        <div
          className="relative flex flex-col items-center w-full"
          style={{ gap: 36 }}
        >
          {/* H1 */}
          <div
            data-hero-h1
            className="relative w-full max-w-[640px]"
            style={{ zIndex: 1 }}
          >
            <h1
              className="font-heading text-center"
              style={{
                fontSize: "clamp(48px, 8vw, 88px)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: "0.97em",
                color: "#F9F9F9",
                margin: 0,
              }}
            >
              <span className="text-italics">Own</span> your fitness.
            </h1>
          </div>

          {/* Phone container — 400×772 */}
          <div
            data-hero-phone
            className="relative"
            style={{
              width: 400,
              height: 772,
              zIndex: 2,
              maxWidth: "100%",
            }}
          >
            {/* Device render — homescreen as the phone visual */}
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              style={{ borderRadius: 36 }}
            >
              <Image
                src="/phones/homescreen.png"
                alt="Helthy app home screen"
                width={334}
                height={724}
                priority
                className="object-contain"
                style={{ width: 334, height: 724, maxWidth: "100%" }}
              />
            </div>

            {/* Floating cards */}
            {FLOATING_CARDS.map((card) => {
              const sideStyle =
                card.side === "right"
                  ? { right: card.offset }
                  : { left: card.offset };
              return (
                <div
                  key={card.id}
                  data-hero-card
                  data-from-x={card.initialX}
                  aria-hidden="true"
                  className="absolute hidden lg:block"
                  style={{
                    ...sideStyle,
                    bottom: card.bottom,
                    width: 320,
                    aspectRatio: "4.70588",
                    borderRadius: 12,
                    border: "1px dashed rgba(255,255,255,0.25)",
                    transform: `translateX(${card.initialX}px) rotate(${card.rotate}deg)`,
                    opacity: 0,
                    WebkitMaskImage: card.mask,
                    maskImage: card.mask,
                    zIndex: 1,
                  }}
                />
              );
            })}
          </div>

          {/* Subtext */}
          <p
            data-hero-sub
            className="text-center w-full max-w-[440px]"
            style={{
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: "1.45em",
              color: "rgba(249, 249, 249, 0.85)",
              margin: 0,
            }}
          >
            Your AI fitness and nutrition coach. Track meals, workouts, and
            progress in one app — free forever.
          </p>
        </div>

        {/* Bottom container — CTA + browsers card row */}
        <div
          className="relative flex flex-col items-center w-full"
          style={{ gap: 26 }}
        >
          {/* Primary CTA — embossed lemon */}
          <Link
            data-hero-cta
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2"
            style={{
              padding: "8px 16px",
              borderRadius: 14,
              border: "1px solid #CDFB50",
              backgroundColor: "#CDFB50",
              color: "#0B0B0B",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              textDecoration: "none",
              boxShadow: CTA_SHADOW,
              minHeight: 44,
              minWidth: 180,
            }}
          >
            {/* Lightning icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 256 256"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z"
                fill="#0B0B0B"
              />
            </svg>
            Download for free
          </Link>

          {/* "Also available on" browser-tile row */}
          <div
            data-hero-browsers
            className="flex flex-col items-center"
            style={{ gap: 12 }}
          >
            <div className="flex items-center" style={{ gap: 10 }}>
              {[
                { rotate: 2, label: "iOS" },
                { rotate: -2, label: "Web" },
                { rotate: 2, label: "Android" },
              ].map((tile, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: "rgba(255, 250, 245, 0.95)",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    transform: `rotate(${tile.rotate}deg)`,
                    boxShadow:
                      "rgba(0, 0, 0, 0.216) -0.36px 0.6px 0.7px -1.25px, " +
                      "rgba(0, 0, 0, 0.192) -1.37px 2.29px 2.67px -2.5px, " +
                      "rgba(0, 0, 0, 0.075) -6px 10px 11.66px -3.75px",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#0B0B0B",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tile.label}
                </div>
              ))}
            </div>
            <p
              className="text-center"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(249, 249, 249, 0.65)",
                margin: 0,
              }}
            >
              Also available on web & Android
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
