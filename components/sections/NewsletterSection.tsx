"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        [
          "[data-newsletter-eyebrow]",
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
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative"
      style={{
        backgroundColor: "#CDFF50",
        color: "#101012",
      }}
    >
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: heading + copy */}
          <div>
            <p
              data-newsletter-eyebrow
              className="text-[11px] font-semibold uppercase mb-5"
              style={{
                letterSpacing: "0.2em",
                color: "rgba(10,10,10,0.55)",
                fontFamily: "var(--font-body)",
              }}
            >
              Newsletter
            </p>
            <h2
              data-newsletter-heading
              className="font-heading"
              style={{
                fontSize: "clamp(30px, 3.6vw, 48px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: "1.05em",
                color: "#101012",
                margin: 0,
              }}
            >
              One email.<br />
              Every month.
            </h2>
            <p
              data-newsletter-sub
              className="mt-5 max-w-md"
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: "rgba(10,10,10,0.7)",
                fontFamily: "var(--font-body)",
              }}
            >
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
