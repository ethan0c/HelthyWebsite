"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, Star } from "lucide-react";

/* ── Real App Store reviews ───────────────────────────────── */
const reviews = [
  {
    title: "Best Fitness I've Used In A While",
    text: "Food logging is the main thing I use. You can type what you had, say it with voice, or scan the nutrition label on the package and it pulls the info in. It's fast — I'll do \"chicken and rice\" or scan a bar and it's done in a few seconds.",
    author: "jasonc1122",
    stars: 5,
    date: "Feb 2025",
  },
  {
    title: "I'm impressed and that's not easy to do",
    text: "Tries to do something you don't see often. The idea is there, an attempt to only make you require one fitness app. It does a great job of not making you feel overwhelmed, very smooth interface.",
    author: "Avarricee",
    stars: 5,
    date: "Feb 2025",
  },
  {
    title: "Only app I've stuck with",
    text: "It syncs with Apple Health so my steps and workouts show up. I track my weight in the app and it ties into the same picture — food, steps, workouts, weight, and progress in one place.",
    author: "jasonc1122",
    stars: 5,
    date: "Feb 2025",
  },
];

/* ── Competitor scattered cards ───────────────────────────── */
const oldWayCards = [
  {
    label: "Nutrition",
    price: "$9.99/mo",
    icon: (
      <svg className="w-8 h-8 text-white/50" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    pos: "top-0 left-[5%] sm:left-[12%]",
    rotate: "-rotate-6",
  },
  {
    label: "Workouts",
    price: "$14.99/mo",
    icon: (
      <svg className="w-8 h-8 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11M6.5 17.5h11M2 12h2M20 12h2M5 8.5V6a1 1 0 011-1h1a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1v-2.5M19 8.5V6a1 1 0 00-1-1h-1a1 1 0 00-1 1v12a1 1 0 001 1h1a1 1 0 001-1v-2.5" />
      </svg>
    ),
    pos: "top-4 right-[5%] sm:right-[12%]",
    rotate: "rotate-6",
  },
  {
    label: "Tracking",
    price: "$6.99/mo",
    icon: (
      <svg className="w-8 h-8 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    pos: "bottom-0 left-1/2 -translate-x-1/2",
    rotate: "-rotate-3",
  },
];

const included = [
  "Workout tracking",
  "Nutrition logging",
  "Barcode scanner",
  "AI Logging",
  "Progress charts",
  "500+ exercises",
  "1M+ foods",
  "Apple Watch",
];

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* Review cards */
      gsap.from("[data-review-card]", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-reviews-grid]",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      /* Old way cards float in */
      gsap.from("[data-old-card]", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-old-way]",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      /* X and total price */
      gsap.from("[data-old-x]", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: "[data-old-way]",
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
        delay: 0.5,
      });

      /* Helthy way section */
      gsap.from("[data-helthy-way]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-helthy-way]",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      /* Price counter $32 → $0 */
      const counter = { value: 32 };
      gsap.to(counter, {
        value: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-helthy-price]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          const el = document.querySelector("[data-helthy-price]");
          if (el) el.textContent = `$${Math.round(counter.value)}`;
        },
      });

      /* Feature chips */
      gsap.from("[data-feature-cell]", {
        scale: 0.85,
        opacity: 0,
        stagger: 0.04,
        duration: 0.4,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: "[data-feature-grid]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 glow-top">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* ══════ App Store reviews ══════ */}
        <div className="text-center mb-12">
          <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">Real Results</p>
          <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-white mb-3">
            Loved on the{" "}
            <span className="accent-serif text-helthy-lemon">App Store.</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-helthy-lemon fill-helthy-lemon" />
              ))}
            </div>
            <span className="text-sm text-white/50 font-mono">4.8 · 20 ratings</span>
          </div>
        </div>

        <div data-reviews-grid className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-28">
          {reviews.map((r, i) => (
            <div
              key={i}
              data-review-card
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.stars)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-helthy-lemon fill-helthy-lemon" />
                ))}
              </div>
              <p className="text-sm font-medium text-white/70 mb-2">{r.title}</p>
              <p className="text-[13px] text-white/40 leading-relaxed mb-4">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/25">{r.author}</span>
                <span className="text-[10px] text-white/15">{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ══════ Pricing comparison ══════ */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-white">
            Stop juggling.{" "}
            <span className="accent-serif text-helthy-lemon">Start thriving.</span>
          </h2>
          <p className="text-sm text-white/30 mt-3">
            Everything you need for fitness in one beautiful app.
          </p>
        </div>

        {/* ─── The old way ─── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-400/30" />
            <span className="text-sm font-medium text-red-400/70">The old way</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-400/30" />
          </div>

          <div data-old-way className="relative h-72 sm:h-80 md:h-96 max-w-3xl mx-auto">
            {oldWayCards.map((card) => (
              <div
                key={card.label}
                data-old-card
                className={`absolute ${card.pos} w-32 sm:w-40 md:w-48 transform ${card.rotate}`}
              >
                <div className="rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-4 sm:p-5 md:p-6 backdrop-blur-sm shadow-xl">
                  {card.icon}
                  <p className="text-xs sm:text-sm text-white/40 mt-3 mb-1">{card.label}</p>
                  <p className="text-sm sm:text-base font-semibold text-white">{card.price}</p>
                </div>
              </div>
            ))}

            {/* Center X with total */}
            <div
              data-old-x
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
              style={{ marginTop: "-2rem" }}
            >
              <X className="w-12 h-12 sm:w-14 sm:h-14 text-red-400/80" strokeWidth={2.5} />
              <span className="text-sm sm:text-base font-semibold text-red-400/80 font-mono">
                $31.97/month
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-16">
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="mx-5 px-5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-white/30 tracking-wider font-medium">
            VS
          </span>
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* ─── The Helthy way ─── */}
        <div data-helthy-way>
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-helthy-lemon/30" />
            <span className="text-sm font-medium text-helthy-lemon/70">The Helthy way</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-helthy-lemon/30" />
          </div>

          <div className="text-center mb-10">
            <h3 className="font-heading font-semibold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] text-white mb-2">
              One app.{" "}
              <span className="accent-serif text-helthy-lemon">Everything.</span>
            </h3>
            <p className="text-sm text-white/30 mb-6">
              All the tools you need to reach your health goals, unified in one beautiful experience.
            </p>
            <span
              data-helthy-price
              className="text-5xl sm:text-6xl font-mono font-bold text-helthy-lemon"
            >
              $0
            </span>
            <span className="text-white/25 text-sm font-mono block mt-1">/month · forever</span>
          </div>

          {/* Feature grid */}
          <div
            data-feature-grid
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
          >
            {included.map((f) => (
              <div
                key={f}
                data-feature-cell
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02]"
              >
                <Check className="w-3.5 h-3.5 text-helthy-lemon/60 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white/45">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
