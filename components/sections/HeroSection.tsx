"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import PhoneFrame from "@/components/ui/PhoneFrame";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

// Phone dimensions — iPhone 15 Pro ratio 9:19.5
const PHONE_W = 320;

// Card dimensions (scaled from reference 320×68 @ 400px phone)
const CARD_W = 260;
const CARD_H = 56;

// Gap from phone center to inner card edge
const CARD_GAP = PHONE_W / 2 + 16;

const FLOATING_CARDS = [
  { id: "c1", side: "right" as const, bottom: 420, rotate:  1 },
  { id: "c2", side: "right" as const, bottom: 300, rotate: -4 },
  { id: "c3", side: "right" as const, bottom: 180, rotate:  2 },
  { id: "c4", side: "left"  as const, bottom: 420, rotate: -2 },
  { id: "c5", side: "left"  as const, bottom: 300, rotate:  3 },
  { id: "c6", side: "left"  as const, bottom: 180, rotate: -3 },
];

const CTA_SHADOW =
  "rgba(255,255,255,0.5) 0px 2px 1px 0px inset, " +
  "rgba(255,255,255,0.72) 0px 0.6px 0.6px -1.25px inset, " +
  "rgba(255,255,255,0.635) 0px 2.29px 2.29px -2.5px inset, " +
  "rgba(255,255,255,0.25) 0px 10px 10px -3.75px inset, " +
  "rgba(205,251,80,0.35) 0px 14px 6px -8px";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enter animations
      gsap.from("[data-hero-h1]",      { y: 24, opacity: 0, duration: 1.0, ease: "power3.out", delay: 0.1 });
      gsap.from("[data-hero-phone]",   { opacity: 0, scale: 0.97, duration: 1.1, ease: "power4.out", delay: 0.2 });
      gsap.from("[data-hero-sub]",     { y: 20, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.45 });
      gsap.from("[data-hero-cta]",     { y: 20, opacity: 0, scale: 0.95, duration: 0.9, ease: "back.out(1.2)", delay: 0.7 });
      gsap.from("[data-hero-bottom]",  { y: 20, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.85 });

      // Cards — hidden until scroll
      const cards = gsap.utils.toArray<HTMLElement>("[data-hero-card]");
      gsap.set(cards, { autoAlpha: 0 });

      cards.forEach((el) => {
        const fromX = Number(el.dataset.fromX || 0);
        const rotate = Number(el.dataset.rotate || 0);

        gsap.fromTo(
          el,
          { x: fromX, y: 40, rotate: 0, autoAlpha: 0 },
          {
            x: 0, y: 0, rotate, autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 5%",
              end: "bottom 75%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full"
      style={{ backgroundColor: "#607C8A", minHeight: "180vh" }}
    >
      {/* Noise texture */}
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

      {/* ── Sticky content block ── */}
      <div
        className="sticky top-0 flex flex-col items-center w-full overflow-hidden"
        style={{ height: "100vh", zIndex: 2 }}
      >
        {/* H1 */}
        <div
          data-hero-h1
          className="w-full text-center"
          style={{ paddingTop: 120, paddingLeft: 44, paddingRight: 44 }}
        >
          <h1
            style={{
              fontFamily: "var(--font-heading, serif)",
              fontSize: "clamp(48px, 6.5vw, 88px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: "0.97em",
              color: "#F9F9F9",
              margin: 0,
            }}
          >
            <em style={{ fontStyle: "italic" }}>Own</em> your fitness.
          </h1>
        </div>

        {/* Phone + cards stage — fills remaining space */}
        <div className="relative flex-1 w-full flex items-start justify-center" style={{ marginTop: 40 }}>

          {/* Cards LEFT */}
          {FLOATING_CARDS.filter(c => c.side === "left").map((card) => (
            <div
              key={card.id}
              data-hero-card
              data-from-x={-280}
              data-rotate={card.rotate}
              aria-hidden="true"
              className="absolute hidden lg:block"
              style={{
                right: `calc(50% + ${CARD_GAP}px)`,
                bottom: card.bottom,
                width: CARD_W,
                height: CARD_H,
                borderRadius: 14,
                backgroundColor: "#111",
                zIndex: 5,
              }}
            />
          ))}

          {/* Phone */}
          <div
            data-hero-phone
            className="relative flex-shrink-0"
            style={{ zIndex: 10 }}
          >
            <PhoneFrame src="" alt="" width={PHONE_W} />
          </div>

          {/* Cards RIGHT */}
          {FLOATING_CARDS.filter(c => c.side === "right").map((card) => (
            <div
              key={card.id}
              data-hero-card
              data-from-x={280}
              data-rotate={card.rotate}
              aria-hidden="true"
              className="absolute hidden lg:block"
              style={{
                left: `calc(50% + ${CARD_GAP}px)`,
                bottom: card.bottom,
                width: CARD_W,
                height: CARD_H,
                borderRadius: 14,
                backgroundColor: "#111",
                zIndex: 5,
              }}
            />
          ))}
        </div>

        {/* Sub + CTA pinned to bottom of sticky viewport */}
        <div
          className="flex flex-col items-center w-full"
          style={{ paddingBottom: 48, gap: 20 }}
        >
          <p
            data-hero-sub
            style={{
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: "1.45em",
              color: "rgba(249,249,249,0.85)",
              textAlign: "center",
              maxWidth: 440,
              margin: 0,
            }}
          >
            Your AI fitness and nutrition coach. Track meals, workouts, and
            progress in one app — free forever.
          </p>

          <div data-hero-cta>
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2"
              style={{
                padding: "10px 20px",
                borderRadius: 14,
                border: "1px solid #CDFB50",
                backgroundColor: "#CDFB50",
                color: "#0B0B0B",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: "1.2em",
                textDecoration: "none",
                boxShadow: CTA_SHADOW,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" fill="#0B0B0B" />
              </svg>
              Download for free
            </Link>
          </div>

          <div data-hero-bottom style={{ fontSize: 13, fontWeight: 500, color: "rgba(249,249,249,0.5)", letterSpacing: "-0.01em" }}>
            Also available on web &amp; Android
          </div>
        </div>
      </div>
    </section>
  );
}
