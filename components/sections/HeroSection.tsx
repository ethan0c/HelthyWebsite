"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import CTAButton from "@/components/ui/CTAButton";
import { handleDownloadClick } from "@/lib/download";
import HelthyLogoGlass from "@/components/ui/HelthyLogoGlass";
import PhoneFrame from "@/components/ui/PhoneFrame";

/**
 * Hero: brand line, store buttons, then three real app screens
 * that run off the bottom of the band (MacroFactor-style), so the product is
 * visible above the fold.
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.7 });

      // The two big words rise out of their masks
      tl.from(
        "[data-hero-word]",
        { yPercent: 115, duration: 0.9, stagger: 0.1, ease: "power4.out" },
        0.15,
      );

      // The mark pops in between and pushes the words apart
      tl.fromTo(
        "[data-hero-mark]",
        { width: 0, scale: 0, rotation: -120, opacity: 0 },
        { width: "0.82em", scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
        0.8,
      );

      tl.from("[data-hero-cta]", { y: 15, opacity: 0, duration: 0.6 }, 1.1);
      tl.from(
        "[data-hero-phone]",
        { y: 80, opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out" },
        1.1,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full overflow-hidden bg-canvas">
      <div className="container-page flex flex-col items-center pt-[clamp(112px,15vh,152px)] text-center">
        {/* The H1 carries the search terms; the big brand line below is visual */}
        <h1
          data-hero-sub
          className="max-w-[34ch] text-balance font-body text-[clamp(17px,1.7vw,22px)] font-medium leading-snug tracking-[-0.015em] text-fg/80"
        >
          The free AI calorie tracker, workout tracker and&nbsp;coach
        </h1>

        {/* Brand line: the mark pops in between the words */}
        <p className="mt-[clamp(8px,1.2vh,14px)] flex flex-nowrap items-center justify-center gap-[0.14em] font-heading text-[clamp(44px,10vw,128px)] font-semibold leading-[0.95] tracking-[-0.05em] text-fg">
          {/* Masks clip each word as it rises; padding keeps descenders visible */}
          <span className="-mx-[0.05em] -mb-[0.14em] -mt-[0.08em] inline-block overflow-hidden px-[0.05em] pb-[0.14em] pt-[0.08em]">
            <span data-hero-word className="inline-block">Get</span>
          </span>
          <span
            data-hero-mark
            aria-hidden="true"
            className="mt-[0.06em] inline-flex h-[0.82em] w-[0.82em] flex-shrink-0 items-center justify-center"
          >
            <HelthyLogoGlass size={1} style={{ width: "100%", height: "100%" }} />
          </span>
          <span className="-mx-[0.05em] -mb-[0.14em] -mt-[0.08em] inline-block overflow-hidden px-[0.05em] pb-[0.14em] pt-[0.08em]">
            <span data-hero-word className="inline-block text-highlight">Helthy.</span>
          </span>
        </p>

        <div data-hero-cta className="mt-[clamp(28px,4vh,44px)] flex flex-col items-center gap-3">
          <CTAButton href="/download" size="lg" onClick={handleDownloadClick}>
            Download free
          </CTAButton>
          <p className="text-[13px] text-fg-subtle">iPhone, Android and Apple Watch</p>
        </div>

      </div>

      {/* Three real screens, cut off by the bottom of the band */}
      <div
        role="img"
        aria-label="Helthy app screens: calorie breakdown, home dashboard and a workout with the rest timer running"
        className="container-page relative mt-[clamp(40px,6vh,64px)] flex h-[clamp(320px,36vw,500px)] items-start justify-center gap-[clamp(12px,2.5vw,32px)] overflow-hidden"
      >
        <div data-hero-phone className="mt-[8%] hidden w-[clamp(180px,21vw,270px)] shrink-0 sm:block">
          <PhoneFrame
            src="/phones/calories.png"
            alt=""
            width={1320}
            height={2868}
            sizes="(min-width: 640px) 270px, 1px"
          />
        </div>
        <div data-hero-phone className="w-[clamp(230px,25vw,310px)] shrink-0">
          <PhoneFrame
            src="/phones/home.png"
            alt=""
            width={1320}
            height={2868}
            priority
            sizes="(min-width: 640px) 310px, 62vw"
          />
        </div>
        <div data-hero-phone className="mt-[8%] hidden w-[clamp(180px,21vw,270px)] shrink-0 sm:block">
          <PhoneFrame
            src="/phones/new-workout-visible-rest-timer.png"
            alt=""
            width={1320}
            height={2868}
            sizes="(min-width: 640px) 270px, 1px"
          />
        </div>
      </div>
    </section>
  );
}
