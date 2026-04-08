"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const slides = [
  {
    image: "/images/stock/meal-overhead.jpg",
    label: "Nutrition",
    headline: "Every meal,\naccounted for.",
  },
  {
    image: "/images/stock/workout-pullup.jpg",
    label: "Strength",
    headline: "Lift heavier.\nRecover smarter.",
  },
  {
    image: "/images/stock/trail-runner.jpg",
    label: "Cardio",
    headline: "Run further.\nFeel better.",
  },
  {
    image: "/images/stock/runner-trail.jpg",
    label: "Recovery",
    headline: "Rest is part\nof the plan.",
  },
  {
    image: "/images/stock/healthy-eating.jpg",
    label: "Habits",
    headline: "Small changes.\nBig results.",
  },
];

export default function PhotoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      /* Horizontal scroll with smoother scrubbing */
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* Each slide's content with smooth fade and scale */
      gsap.utils.toArray<HTMLElement>("[data-photo-slide]").forEach((slide) => {
        const content = slide.querySelector("[data-photo-content]");
        if (content) {
          gsap.from(content, {
            y: 80,
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: slide,
              containerAnimation: gsap.getById?.("horizontalScroll") || undefined,
              start: "left 70%",
              once: true,
              scroller: undefined,
            },
          });
        }
      });

      /* Image scale with smoother parallax */
      gsap.utils.toArray<HTMLElement>("[data-photo-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex h-[100dvh] w-max"
      >
        {/* Intro panel */}
        <div className="flex items-center justify-center w-screen h-full px-8 shrink-0">
          <div className="text-center max-w-lg">
            <p className="text-eyebrow mb-6">What We Cover</p>
            <h2 className="font-body font-normal text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-white">
              Built for every part of{" "}
              <span className="accent-serif text-helthy-lemon">your journey</span>
            </h2>
            <p className="text-sm text-white/40 mt-4">
              Scroll to explore →
            </p>
          </div>
        </div>

        {/* Photo slides */}
        {slides.map((slide, i) => (
          <div
            key={slide.label}
            data-photo-slide
            className="relative w-[85vw] sm:w-[70vw] lg:w-[50vw] h-full shrink-0 flex items-end p-6 sm:p-10 overflow-hidden"
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                data-photo-img
                src={slide.image}
                alt={slide.label}
                className="w-full h-full object-cover will-change-transform"
                loading={i < 2 ? "eager" : "lazy"}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div data-photo-content className="relative z-10 mb-4 sm:mb-8">
              <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-helthy-lemon/80 font-medium mb-3">
                {slide.label}
              </span>
              <h3 className="font-body font-normal text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-white whitespace-pre-line">
                {slide.headline}
              </h3>
            </div>

            {/* Side number */}
            <span className="absolute top-6 right-6 sm:top-10 sm:right-10 text-[10px] font-mono text-white/20">
              {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
