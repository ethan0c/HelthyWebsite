"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import HelthyLogoGlass from "@/components/ui/HelthyLogoGlass";
import HeroAIDemo from "@/components/sections/HeroAIDemo";

/**
 * "Meet [clover] Helthy AI" on a light band, then the interactive chat demo.
 * On scroll-in the words rise out of their masks and the glass clover pops in
 * between them (the same move as the hero), then the demo panel rises and
 * auto-plays its first question. The chat keeps the app's dark look
 * (theme-dark), like an app window on the page.
 */
export default function CoachDemoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: "[data-coach-title]", start: "top 80%", once: true },
      });
      tl.from("[data-coach-eyebrow]", { y: 12, opacity: 0, duration: 0.5 });
      tl.from("[data-coach-word]", { yPercent: 115, duration: 0.8, stagger: 0.1, ease: "power4.out" }, 0.05);
      tl.fromTo(
        "[data-coach-mark]",
        { width: 0, scale: 0, rotation: -120, opacity: 0 },
        { width: "1.05em", scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
        0.55,
      );
      tl.from("[data-coach-sub]", { y: 12, opacity: 0, duration: 0.5 }, 0.8);
      tl.from("[data-coach-demo]", { y: 32, opacity: 0, duration: 0.8 }, 0.9);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const mask = "-mb-[0.14em] -mt-[0.08em] inline-block overflow-hidden pb-[0.14em] pt-[0.08em]";

  return (
    <section ref={sectionRef} id="coach" className="theme-light section">
      <div className="container-page flex flex-col items-center text-center">
        <p data-coach-eyebrow className="mb-4 text-[13px] font-medium text-fg-muted">
          AI coach · Helthy Pro
        </p>
        <h2
          data-coach-title
          className="text-display-xl flex flex-wrap items-center justify-center gap-x-[0.22em] text-fg"
        >
          <span className={mask}>
            <span data-coach-word className="inline-block">Meet</span>
          </span>
          <span
            data-coach-mark
            aria-hidden="true"
            className="inline-flex h-[1.05em] w-[1.05em] shrink-0 items-center justify-center"
          >
            <HelthyLogoGlass size={1} className="animate-helthy-float" style={{ width: "100%", height: "100%" }} />
          </span>
          <span className={mask}>
            <span data-coach-word className="inline-block text-highlight">Helthy AI</span>
          </span>
        </h2>
        <p data-coach-sub className="mt-5 max-w-2xl text-lede">
          It reads your meals, lifts and weight trend, so the answer is about you, not everyone.
        </p>

        <div data-coach-demo className="theme-dark mt-12 flex w-full justify-center bg-transparent md:mt-16">
          <HeroAIDemo />
        </div>
      </div>
    </section>
  );
}
