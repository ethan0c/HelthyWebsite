"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const founders = [
  {
    name: "Chibu",
    badge: "−70 lbs · 12 months",
    before: "/images/transform/chibu-before.jpg",
    after: "/images/transform/chibu-after2.png",
  },
  {
    name: "Ebuka",
    badge: "+50 lbs · 24 months",
    before: "/images/transform/ebu-before.jpg",
    after: "/images/transform/ebu-after.jpg",
  },
];

const reviews = [
  {
    text: "Best fitness app I've ever used. Everything in one place and it's actually free.",
    author: "Jake M.",
    stars: 5,
  },
  {
    text: "The barcode scanner is insanely fast. Switched from MFP and never looked back.",
    author: "Sarah K.",
    stars: 5,
  },
  {
    text: "Clean design, no annoying ads. This is what a health app should be.",
    author: "David R.",
    stars: 5,
  },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-proof-heading]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-transform-card]").forEach(
        (el, i) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.2,
          });
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-review-card]").forEach(
        (el, i) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          });
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <div data-proof-heading className="text-center mb-16 sm:mb-20">
          <h2 className="text-display-lg mb-3">
            Built by lifters,<br />
            <span className="text-helthy-lemon">for lifters.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/35 font-light">
            The founders used Helthy to transform their own bodies.
          </p>
        </div>

        {/* Before/After cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {founders.map((f) => (
            <div
              key={f.name}
              data-transform-card
              className="group relative rounded-2xl overflow-hidden border border-white/[0.06]"
            >
              <div className="grid grid-cols-2">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={f.before}
                    alt={`${f.name} before`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs text-white/50 font-mono uppercase tracking-wider">
                    Before
                  </span>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={f.after}
                    alt={`${f.name} after`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs text-helthy-lemon font-mono uppercase tracking-wider">
                    After
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-white">{f.name}</span>
                  <span className="px-3 py-1.5 rounded-full bg-helthy-lemon text-[#0B0B0B] text-xs font-semibold">
                    {f.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* App Store reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              data-review-card
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.stars)].map((_, j) => (
                  <svg key={j} className="w-3.5 h-3.5 text-helthy-lemon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <p className="text-xs text-white/25 font-mono">{r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
