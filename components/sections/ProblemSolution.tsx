"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const competitors = [
  { name: "Cal AI", price: "$9.99/mo", category: "Nutrition only", image: "/cal-ai.webp" },
  { name: "Strong", price: "$14.99/mo", category: "Workouts only", image: "/strong.webp" },
  { name: "MyFitnessPal", price: "$19.99/mo", category: "Nutrition + ads", image: null },
];

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* Competitor cards stagger in */
      gsap.utils.toArray<HTMLElement>("[data-comp-card]").forEach((el, i) => {
        gsap.from(el, {
          x: -40,
          opacity: 0,
          rotation: -3 + i * 2,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.15,
        });
      });

      /* Helthy reveal */
      gsap.from("[data-helthy-reveal]", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-helthy-reveal]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      /* Counter */
      const counter = { value: 15 };
      gsap.to(counter, {
        value: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-price-counter]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          const el = document.querySelector("[data-price-counter]");
          if (el) el.textContent = `$${Math.round(counter.value)}`;
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding geo-grid">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-eyebrow mb-3">The problem</p>
          <h2 className="text-display-lg">
            Health apps are <span className="text-white/40">fragmented</span>{" "}
            <br className="hidden sm:block" />
            and <span className="text-white/40">expensive.</span>
          </h2>
        </div>

        {/* Competitor cards */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 sm:mb-20">
          {competitors.map((c, i) => (
            <div
              data-comp-card
              key={c.name}
              className="glass-card p-6 sm:p-8 w-56 sm:w-64 text-center"
              style={{
                transform: `rotate(${-3 + i * 3}deg)`,
              }}
            >
              {c.image && (
                <div className="w-12 h-12 rounded-2xl overflow-hidden mx-auto mb-3 bg-white/5">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              {!c.image && (
                <div className="w-12 h-12 rounded-2xl mx-auto mb-3 bg-white/5 flex items-center justify-center">
                  <span className="text-lg font-bold text-white/20">M</span>
                </div>
              )}
              <p className="text-sm text-white/40 mb-2">{c.category}</p>
              <p className="text-lg font-medium text-white mb-1">{c.name}</p>
              <p className="text-2xl font-mono text-white/70">{c.price}</p>
            </div>
          ))}
        </div>

        {/* Helthy solution */}
        <div
          data-helthy-reveal
          className="relative mx-auto max-w-2xl text-center"
        >
          <img
            src="/images/logos/helthy-green.png"
            alt="Helthy"
            className="h-16 sm:h-20 mx-auto mb-5"
            loading="lazy"
          />
          <p className="text-eyebrow mb-4 text-helthy-lemon">The solution</p>
          <h3 className="text-display-md !text-white mb-3">
            Or just use <span className="text-helthy-lemon">Helthy.</span>
          </h3>
          <p className="text-body-lg mb-6">
            Workouts + nutrition + progress + AI — all in one app.
          </p>
          <div className="inline-flex items-end gap-2">
            <span
              data-price-counter
              className="text-6xl sm:text-8xl font-mono font-medium text-helthy-lemon"
            >
              $15
            </span>
            <span className="text-xl text-white/40 mb-2">/mo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
