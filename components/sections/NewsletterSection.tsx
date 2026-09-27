"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(
        [
          "[data-newsletter-heading]",
          "[data-newsletter-sub]",
        ],
        {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
      gsap.from("[data-newsletter-form]", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="newsletter" className="section">
      <div className="container-page">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: heading + copy */}
          <div>
            <h2 data-newsletter-heading className="text-display-lg text-fg">
              One email.
              <br />
              Every month
            </h2>
            <p data-newsletter-sub className="mt-5 max-w-md text-base leading-7 text-fg-muted">
              New features, progress experiments, and what we&apos;re learning
              building Helthy. No filler, no spam.
            </p>
          </div>

          {/* Right: form */}
          <div data-newsletter-form className="md:pt-2">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
