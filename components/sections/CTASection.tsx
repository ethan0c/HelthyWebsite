"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import StoreButtons from "@/components/ui/StoreButtons";

/**
 * Final CTA — light band that bookends the page with the hero's brand line.
 */

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(["[data-cta-kicker]", "[data-cta-heading]", "[data-cta-sub]", "[data-cta-button]"], {
        y: 16,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="theme-light section">
      <div className="container-page flex flex-col items-center text-center">
        <p data-cta-kicker className="text-[15px] font-medium text-fg-muted">
          Stop guessing. Start today.
        </p>

        <h2 data-cta-heading className="mt-4 text-display-xl text-fg">
          Get <span className="text-highlight">Helthy</span>
        </h2>

        <p data-cta-sub className="mt-5 max-w-2xl text-lede">
          Free on iOS &amp; Android. The free plan is free forever — no credit card.
        </p>

        <div data-cta-button className="mt-10">
          <StoreButtons align="center" />
        </div>
      </div>
    </section>
  );
}
