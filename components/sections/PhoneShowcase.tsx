"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const phones = [
  { src: "/phones/homescreen.png", alt: "Home dashboard", rotate: -8, x: -60 },
  { src: "/phones/foodmainscreen.png", alt: "Nutrition tracking", rotate: 0, x: 0 },
  { src: "/phones/newworkoutscreen.png", alt: "Workout logging", rotate: 8, x: 60 },
];

export default function PhoneShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Heading fade */
      gsap.from("[data-showcase-heading]", {
        y: 30,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      /* Phones fan out from stacked center */
      gsap.utils.toArray<HTMLElement>("[data-showcase-phone]").forEach((el, i) => {
        const targetRotate = phones[i].rotate;
        const targetX = phones[i].x;

        gsap.fromTo(
          el,
          {
            rotateZ: 0,
            x: 0,
            y: 80,
            opacity: 0,
            scale: 0.85,
          },
          {
            rotateZ: targetRotate,
            x: targetX,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.52,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: "[data-showcase-phones]",
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      /* Parallax depth on scroll */
      gsap.utils.toArray<HTMLElement>("[data-showcase-phone]").forEach((el, i) => {
        const depth = i === 1 ? 0 : (i === 0 ? 30 : -30);
        gsap.to(el, {
          y: depth,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-showcase-phones]",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden glow-center">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        {/* Heading */}
        <div data-showcase-heading className="text-center mb-16">
          <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">The App</p>
          <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-white">
            Your Next Best Self{" "}
            <span className="accent-serif text-helthy-lemon">Starts Here</span>
          </h2>
          <p className="text-sm text-white/40 mt-3 max-w-md mx-auto">
            Three screens. Everything you need. Zero cost.
          </p>
        </div>

        {/* Phone fan layout */}
        <div
          data-showcase-phones
          className="perspective-container relative flex items-center justify-center h-[420px] sm:h-[520px] lg:h-[600px]"
        >
          {phones.map((phone, i) => (
            <div
              key={phone.alt}
              data-showcase-phone
              className="absolute w-[200px] sm:w-[240px] lg:w-[280px]"
              style={{ zIndex: i === 1 ? 3 : i === 0 ? 2 : 1 }}
            >
              <img
                src={phone.src}
                alt={phone.alt}
                className="w-full rounded-[2rem] shadow-2xl shadow-black/60"
                loading="lazy"
              />
            </div>
          ))}

          {/* Glow behind center phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] rounded-full bg-helthy-lemon/[0.06] blur-[120px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
