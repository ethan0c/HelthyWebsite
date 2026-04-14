"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I've tried MyFitnessPal, Cronometer, MacroFactor — Helthy is the first one that stuck. Snap a photo and it's logged. That's it.",
    name: "Marcus T.",
    detail: "Lost 14 kg in 5 months",
    accent: "#22C55E",
  },
  {
    quote:
      "Built Helthy because nothing else would actually tell me what to fix. Down 28 lb, up 50 lb on bench.",
    name: "Chibu",
    detail: "Co-founder",
    accent: "#CDFF50",
  },
  {
    quote:
      "The AI coach told me to skip legs after a bad sleep night. No other app connects my data like that.",
    name: "Sarah K.",
    detail: "Training 4x/week for 8 months",
    accent: "#2563EB",
  },
  {
    quote:
      "I opened the app to log a meal and it already knew what I was eating. Genuinely felt like magic.",
    name: "James R.",
    detail: "200+ meals logged",
    accent: "#DC2626",
  },
  {
    quote:
      "I used to forget half my meals. Now Helthy logs them in seconds and the AI coach actually keeps me honest.",
    name: "Ebu",
    detail: "Co-founder",
    accent: "#CDFF50",
  },
  {
    quote:
      "Finally an app that doesn't make me feel like I'm filling out a spreadsheet. The weight trend chart alone is worth it.",
    name: "Priya M.",
    detail: "Goal weight reached in 12 weeks",
    accent: "#059669",
  },
  {
    quote:
      "I showed the insights screen to my PT and she said 'this is better than what I give my clients.' Switching her whole gym over.",
    name: "Olivia W.",
    detail: "Personal trainer, 12 clients on Helthy",
    accent: "#C2410C",
  },
  {
    quote:
      "My coach suggested I add Greek yogurt to hit my protein target. Tapped one button and it was logged. Unreal.",
    name: "Alex D.",
    detail: "Hitting 180g protein daily",
    accent: "#B45309",
  },
];

// Split into two rows for dual-marquee
const ROW_1 = TESTIMONIALS.slice(0, 4);
const ROW_2 = TESTIMONIALS.slice(4);

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

function TestimonialCard({
  t,
}: {
  t: (typeof TESTIMONIALS)[number];
}) {
  return (
    <div
      className="shrink-0 w-[85vw] max-w-[340px] sm:w-[380px] sm:max-w-none p-[1.5px] rounded-[1.5rem]"
      style={{
        background: `linear-gradient(135deg, ${t.accent}30 0%, transparent 50%, rgba(255,255,255,0.06) 100%)`,
      }}
    >
      <div className="h-full rounded-[calc(1.5rem-1.5px)] p-7 flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Stars */}
        <div className="flex gap-0.5 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5"
              fill={t.accent}
              stroke="none"
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-[15px] leading-[1.65] font-light mb-6 text-white/70 flex-1">
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Attribution */}
        <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium shrink-0"
            style={{
              background: `linear-gradient(135deg, ${t.accent}25 0%, ${t.accent}10 100%)`,
              color: t.accent,
              border: `1px solid ${t.accent}20`,
            }}
          >
            {t.name.charAt(0)}
          </div>
          <div>
            <p className="text-[14px] font-medium text-white">
              {t.name}
            </p>
            <p className="text-[12px] text-white/40">{t.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransformationCard({ t }: { t: (typeof TRANSFORMATIONS)[number] }) {
  return (
    <div className="shrink-0 w-[480px] sm:w-[560px] rounded-[1.5rem] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Before / After images */}
      <div className="grid grid-cols-2">
        <div className="relative aspect-[3/4] bg-black overflow-hidden">
          <Image
            src={t.before}
            alt={`${t.name} before`}
            fill
            className="object-cover grayscale-[30%]"
            sizes="280px"
          />
          {/* Face blur overlay */}
          <div
            className="absolute inset-x-0 top-0 h-[38%]"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          />
          <span className="absolute bottom-3 left-3 text-[11px] tracking-[0.18em] uppercase text-white/80 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
            Before
          </span>
        </div>
        <div className="relative aspect-[3/4] bg-black overflow-hidden">
          <Image
            src={t.after}
            alt={`${t.name} after`}
            fill
            className="object-cover"
            sizes="280px"
          />
          {/* Face blur overlay */}
          <div
            className="absolute inset-x-0 top-0 h-[38%]"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          />
          <span className="absolute bottom-3 left-3 text-[11px] tracking-[0.18em] uppercase text-helthy-black bg-helthy-lemon px-2.5 py-1 rounded-full font-semibold">
            After
          </span>
        </div>
      </div>

      {/* Quote + attribution */}
      <div className="p-7">
        <p className="text-[15px] text-white/70 italic leading-relaxed mb-4">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div>
          <p className="text-[15px] font-semibold text-white">{t.name}</p>
          <p className="text-[13px] text-white/45">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function TransformationCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const ctx = gsap.context(() => {
      const halfWidth = track.scrollWidth / 2;
      gsap.to(track, {
        x: -halfWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, track);
    return () => ctx.revert();
  }, []);

  // Duplicate for seamless loop (2x is sufficient)
  const items = [...TRANSFORMATIONS, ...TRANSFORMATIONS];

  return (
    <div className="relative mb-12">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--background) 0%, transparent 100%)" }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, var(--background) 0%, transparent 100%)" }}
      />

      <div ref={trackRef} className="flex gap-6 w-max">
        {items.map((t, i) => (
          <TransformationCard key={`tf-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in the whole section
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      // Infinite marquee — row 1 scrolls left, row 2 scrolls right
      if (row1Ref.current) {
        const row1Width = row1Ref.current.scrollWidth / 2;
        gsap.to(row1Ref.current, {
          x: -row1Width,
          duration: 50,
          ease: "none",
          repeat: -1,
        });
      }
      if (row2Ref.current) {
        const row2Width = row2Ref.current.scrollWidth / 2;
        gsap.set(row2Ref.current, { x: -row2Width });
        gsap.to(row2Ref.current, {
          x: 0,
          duration: 55,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[120vw] max-w-[1200px] h-[60%] rounded-full blur-[160px] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse, rgba(205,255,80,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative">
        <div className="container-page">
          <SectionHeading
            title="Real people,"
            italicTail="real results"
            subtitle="Don't take our word for it. Here's what Helthy users are saying."
          />
        </div>

        {/* Transformation carousel */}
        <TransformationCarousel />

        {/* Marquee rows */}
        <div className="flex flex-col gap-5">
          {/* Row 1 — scrolls left */}
          <div className="relative">
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, var(--background) 0%, transparent 100%)" }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(270deg, var(--background) 0%, transparent 100%)" }}
            />

            <div ref={row1Ref} className="flex gap-5 w-max">
              {/* Duplicate for seamless loop */}
              {[...ROW_1, ...ROW_1].map((t, i) => (
                <TestimonialCard key={`r1-${i}`} t={t} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, var(--background) 0%, transparent 100%)" }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(270deg, var(--background) 0%, transparent 100%)" }}
            />

            <div ref={row2Ref} className="flex gap-5 w-max">
              {[...ROW_2, ...ROW_2].map((t, i) => (
                <TestimonialCard key={`r2-${i}`} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
