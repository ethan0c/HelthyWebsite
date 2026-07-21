"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import HelthyLogoGlass from "@/components/ui/HelthyLogoGlass";
import AndroidWaitlistButton from "@/components/ui/AndroidWaitlistButton";
import CTAButton from "@/components/ui/CTAButton";

/**
 * Final CTA — bookends the page with the hero's brand line.
 * Same construction as the hero: small line → giant "Get [mark] Helthy."
 * with the glass mark popping in — replayed on scroll into view.
 */

function handleDownloadClick(e: React.MouseEvent) {
  if (window.matchMedia("(pointer: fine)").matches) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("helthy:qr-open"));
  }
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from("[data-cta-kicker]", { y: 16, opacity: 0, duration: 0.6 });
      tl.from(
        "[data-cta-word]",
        { yPercent: 115, duration: 0.9, stagger: 0.1, ease: "power4.out" },
        0.1,
      );
      tl.fromTo(
        "[data-cta-mark]",
        { width: 0, scale: 0, rotation: -120, opacity: 0 },
        {
          width: "0.82em",
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
        },
        0.7,
      );
      tl.from("[data-cta-sub]", { y: 14, opacity: 0, duration: 0.6 }, 1.0);
      tl.from("[data-cta-button]", { y: 15, opacity: 0, duration: 0.6 }, 1.15);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Lemon glow — same bloom language as the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 55%, rgba(205,255,80,0.09) 0%, rgba(205,255,80,0.025) 40%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center z-10 flex flex-col items-center">
        {/* Small line */}
        <p
          data-cta-kicker
          className="font-display"
          style={{
            fontSize: "clamp(16px, 1.8vw, 24px)",
            fontWeight: 500,
            letterSpacing: "-0.015em",
            color: "rgba(249,249,249,0.78)",
            margin: 0,
          }}
        >
          Stop guessing. Start today.
        </p>

        {/* Giant brand line — mirrors the hero */}
        <h2
          className="font-heading flex items-center justify-center flex-nowrap"
          style={{
            fontSize: "clamp(52px, 10vw, 130px)",
            fontWeight: 600,
            letterSpacing: "-0.05em",
            lineHeight: "0.95em",
            color: "#F9F9F9",
            margin: "clamp(8px, 1.4vh, 16px) 0 0",
            gap: "0.14em",
          }}
        >
          <span
            className="inline-block overflow-hidden"
            style={{ padding: "0.08em 0.05em 0.14em", margin: "-0.08em -0.05em -0.14em" }}
          >
            <span data-cta-word className="inline-block">Get</span>
          </span>

          <span
            data-cta-mark
            aria-hidden="true"
            className="inline-flex items-center justify-center flex-shrink-0"
            style={{ width: "0.82em", height: "0.82em", marginTop: "0.06em" }}
          >
            <HelthyLogoGlass size={1} style={{ width: "100%", height: "100%" }} />
          </span>

          <span
            className="inline-block overflow-hidden"
            style={{ padding: "0.08em 0.05em 0.14em", margin: "-0.08em -0.05em -0.14em" }}
          >
            <span data-cta-word className="inline-block text-helthy-lemon">Helthy.</span>
          </span>
        </h2>

        {/* Quiet reassurance line */}
        <p
          data-cta-sub
          style={{
            fontSize: "clamp(14px, 1.2vw, 16px)",
            color: "rgba(249,249,249,0.55)",
            fontWeight: 300,
            margin: "clamp(18px, 2.4vh, 28px) 0 0",
          }}
        >
          Free on iOS &amp; Android. The free plan is free forever — no credit card.
        </p>

        {/* CTA buttons */}
        <div
          data-cta-button
          className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-center gap-4"
          style={{ marginTop: "clamp(28px, 3.6vh, 40px)" }}
        >
          <CTAButton
            href="/download"
            variant="primary"
            size="md"
            onClick={handleDownloadClick}
          >
            Download free
          </CTAButton>
          <AndroidWaitlistButton />
        </div>
      </div>
    </section>
  );
}
