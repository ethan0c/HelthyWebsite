"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

/**
 * Founder transformation photos. Real before/after shots from the
 * Helthy founders (Chibu and Ebu) — already in
 * /public/transformations/.
 *
 * TODO(user): add more user transformations as you collect them.
 */

const TRANSFORMATIONS = [
  {
    name: "Chibu",
    role: "Co-founder",
    before: "/transformations/chibu-before.jpg",
    after: "/transformations/chibu-after.jpg",
    quote:
      "Built Helthy because nothing else would actually tell me what to fix. Down 28 lb, up 50 lb on bench.",
  },
  {
    name: "Ebu",
    role: "Co-founder",
    before: "/transformations/ebu-before.jpg",
    after: "/transformations/ebu-after.jpg",
    quote:
      "I used to forget half my meals. Now Helthy logs them in seconds and the AI coach actually keeps me honest.",
  },
];

export default function TransformationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-transform-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-2 lg:px-3 py-2 lg:py-3"
    >
      <div
        className="relative mx-auto bg-[#0F0F0F] overflow-hidden border border-white/[0.06]"
        style={{
          borderRadius: "40px",
          boxShadow:
            "0 -40px 100px -40px rgba(205,251,80,0.12), 0 1px 0 0 rgba(255,255,255,0.05) inset",
        }}
      >
        <div className="px-6 lg:px-8 py-24 lg:py-32 max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-display-xl font-heading font-light tracking-tight">
            We use it{" "}
            <span className="text-italics text-helthy-lemon">every day</span>.
          </h2>
          <p className="mt-5 text-base text-white/60 leading-relaxed font-light">
            Helthy started because the founders couldn&apos;t find a tracker
            that actually worked for them. Here&apos;s what it looks like when
            you stick with it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TRANSFORMATIONS.map((t) => (
            <div
              key={t.name}
              data-transform-card
              className="card-helthy overflow-hidden"
            >
              <div className="grid grid-cols-2">
                <div className="relative aspect-[4/5] bg-black">
                  <Image
                    src={t.before}
                    alt={`${t.name} before`}
                    fill
                    className="object-cover grayscale-[30%]"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                  <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.18em] uppercase text-white/80 bg-black/60 backdrop-blur px-2 py-1 rounded-full">
                    Before
                  </span>
                </div>
                <div className="relative aspect-[4/5] bg-black">
                  <Image
                    src={t.after}
                    alt={`${t.name} after`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                  <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.18em] uppercase text-helthy-black bg-helthy-lemon px-2 py-1 rounded-full font-semibold">
                    After
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-white/80 italic font-light leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/45">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TODO(user): add a "submit your transformation" CTA once you
            decide how you want to collect them */}
        </div>
      </div>
    </section>
  );
}
