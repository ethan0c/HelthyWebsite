"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const people = [
  {
    src: "/images/stock/healthy-eating.jpg",
    alt: "Healthy meal prep",
    stat: "1,847",
    unit: "kcal",
    label: "logged today",
  },
  {
    src: "/images/stock/athlete-portrait.jpg",
    alt: "Athlete training",
    stat: "12",
    unit: "wk",
    label: "streak",
    tall: true,
  },
  {
    src: "/images/stock/running-outdoor.jpg",
    alt: "Outdoor running",
    stat: "315",
    unit: "lb",
    label: "bench PR",
  },
];

export default function LifestyleBreak() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-person]").forEach((el, i) => {
        gsap.from(el, {
          y: 60 + i * 20,
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.12,
        });

        /* Subtle parallax per card */
        gsap.to(el.querySelector("[data-person-img]"), {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Three portrait photos with data overlays — MyHealthPrac style */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {people.map((p, i) => (
            <div
              key={p.label}
              data-person
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl ${
                p.tall
                  ? "row-span-2 col-span-2 md:col-span-1"
                  : "aspect-[3/4]"
              }`}
              style={p.tall ? { aspectRatio: "3/5" } : undefined}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  data-person-img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-[115%] object-cover object-center -mt-[5%] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {/* Stat overlay — top left, like MyHealthPrac */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-mono font-medium text-white">
                    {p.stat}
                  </span>
                  <span className="text-sm sm:text-base font-mono text-white/50">
                    {p.unit}
                  </span>
                </div>
                <p className="text-[11px] text-white/40 font-mono uppercase tracking-wider mt-0.5">
                  {p.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
