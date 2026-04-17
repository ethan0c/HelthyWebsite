"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star } from "lucide-react";

/** iOS Contacts-style: first two capitalized letters of the handle/name. */
function initialsOf(name: string): string {
  const clean = name.replace(/[^a-zA-Z]/g, "");
  if (!clean) return "?";
  return clean.slice(0, 2).toUpperCase();
}

/**
 * Real App Store reviews. Do NOT paraphrase — these are verbatim
 * (trimmed only where noted with […]) and must stay accurate.
 */
const TESTIMONIALS = [
  {
    quote:
      "I used to hate logging food because it felt like homework. This app makes it surprisingly simple. The barcode scanner works well, and the AI meal logging is way more accurate than I expected. […] It feels like it was built for real people, not just bodybuilders or hardcore macro trackers.",
    name: "Tasshtfxv",
    detail: "App Store review · 🇳🇬",
    accent: "#22C55E",
  },
  {
    quote:
      "I've been using Helthy for about 3 months since it first launched. I was around 195 when I started and wanted to drop some weight and actually understand what I was eating instead of guessing. […] I'll do \"chicken and rice\" or scan a bar and it's done in a few seconds. […] Only food/health app I've stuck with and I recommend.",
    name: "jasonc1122",
    detail: "App Store review · 🇺🇸",
    accent: "#CDFF50",
  },
  {
    quote:
      "Tries to do something you don't see often. The idea is there, an attempt to only make you require one fitness app. It does a great job of not making you feel overwhelmed, very smooth interface. […] All in all great app.",
    name: "Avarricee",
    detail: "App Store review · 🇺🇸",
    accent: "#2563EB",
  },
  {
    quote:
      "This app might just be better than Apple's native fitness logging app. Not just fitness but also health! Can't wait to see the app support connecting to an Apple Watch. 👏🏻👏🏻👏🏻",
    name: "noirvaze",
    detail: "App Store review · 🇨🇦",
    accent: "#DC2626",
  },
  {
    quote:
      "My guy has made the most reliable and flexible workout and food app! It's so easy to use, especially when tracking your meals and workouts! Highly recommended!",
    name: "Obianuju8",
    detail: "App Store review · 🇺🇸",
    accent: "#059669",
  },
  {
    quote: "The fitness app of all time.",
    name: "Melliciousness",
    detail: "App Store review · 🇻🇳",
    accent: "#B45309",
  },
  {
    quote: "Great user experience.",
    name: "iRobin78",
    detail: "App Store review · 🇮🇳",
    accent: "#8B5CF6",
  },
  {
    quote: "This is the best app! I use it everyday.",
    name: "arceus208",
    detail: "App Store review · 🇺🇸",
    accent: "#EC4899",
  },
  {
    quote: "Very amazing app.",
    name: "caakino",
    detail: "App Store review · 🇺🇸",
    accent: "#14B8A6",
  },
];

const ROW_1 = TESTIMONIALS.slice(0, 5);
const ROW_2 = TESTIMONIALS.slice(5);

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

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="card-helthy shrink-0 w-[85vw] max-w-[340px] sm:w-[380px] sm:max-w-none">
      <div className="p-7 flex flex-col h-full">
        <div className="flex gap-0.5 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5" fill="#CDFF50" stroke="none" />
          ))}
        </div>
        <p className="text-[15px] leading-[1.65] font-light mb-6 text-white/70 flex-1">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative"
            style={{
              background: `linear-gradient(180deg, ${t.accent} 0%, ${t.accent}CC 100%)`,
              boxShadow:
                `inset 0 1px 0 rgba(255,255,255,0.35),` +
                `inset 0 -1px 2px rgba(0,0,0,0.15),` +
                `0 2px 6px -2px ${t.accent}55`,
            }}
          >
            <span
              className="text-[13px] font-medium"
              style={{
                color: "#fff",
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "-0.01em",
                textShadow: "0 1px 1px rgba(0,0,0,0.15)",
              }}
            >
              {initialsOf(t.name)}
            </span>
          </div>
          <div>
            <p className="text-[14px] font-medium text-white">{t.name}</p>
            <p className="text-[12px] text-white/40">{t.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransformationCard({ t }: { t: (typeof TRANSFORMATIONS)[number] }) {
  return (
    <div className="card-helthy shrink-0 w-[480px] sm:w-[560px] overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="relative aspect-[3/4] bg-black overflow-hidden">
          <Image
            src={t.before}
            alt={`${t.name} before`}
            fill
            className="object-cover grayscale-[30%]"
            sizes="280px"
          />
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
          <div
            className="absolute inset-x-0 top-0 h-[38%]"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          />
          <span className="absolute bottom-3 left-3 text-[11px] tracking-[0.18em] uppercase text-helthy-black bg-helthy-lemon px-2.5 py-1 rounded-full font-semibold">
            After
          </span>
        </div>
      </div>
      <div className="p-7">
        <p className="text-[15px] text-white/70 italic leading-relaxed mb-4">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div>
          <p className="text-[15px] font-medium text-white">{t.name}</p>
          <p className="text-[13px] text-white/45">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Simple seamless marquee. Uses a wrap modifier on `x` so the loop is
 * truly continuous — no visible reset. Re-measures after images load.
 */
function useMarquee(
  trackRef: React.RefObject<HTMLDivElement | null>,
  opts: { duration: number; direction?: 1 | -1 }
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const dir = opts.direction ?? -1;
      let half = track.scrollWidth / 2;
      let tween: gsap.core.Tween;

      const build = () => {
        if (tween) tween.kill();
        gsap.set(track, { x: 0 });
        const wrap = gsap.utils.wrap(-half, 0);
        tween = gsap.to(track, {
          x: `+=${dir * half}`,
          duration: opts.duration,
          ease: "none",
          repeat: -1,
          modifiers: { x: (x) => `${wrap(parseFloat(x))}px` },
        });
      };

      build();

      const imgs = Array.from(track.querySelectorAll("img"));
      let remaining = imgs.filter((i) => !i.complete).length;
      if (remaining > 0) {
        imgs.forEach((img) => {
          if (img.complete) return;
          const done = () => {
            remaining -= 1;
            img.removeEventListener("load", done);
            img.removeEventListener("error", done);
            if (remaining <= 0) {
              half = track.scrollWidth / 2;
              build();
            }
          };
          img.addEventListener("load", done);
          img.addEventListener("error", done);
        });
      }
    }, track);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function TransformationCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  useMarquee(trackRef, { duration: 40, direction: -1 });
  const items = [...TRANSFORMATIONS, ...TRANSFORMATIONS];

  return (
    <div className="relative mb-12 overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--background) 0%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
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

function TestimonialRow({
  row,
  duration,
  direction,
  keyPrefix,
}: {
  row: typeof TESTIMONIALS;
  duration: number;
  direction: 1 | -1;
  keyPrefix: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  useMarquee(trackRef, { duration, direction });

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--background) 0%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, var(--background) 0%, transparent 100%)" }}
      />
      <div ref={trackRef} className="flex gap-5 w-max">
        {[...row, ...row].map((t, i) => (
          <TestimonialCard key={`${keyPrefix}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden section-glow-cyan"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-[1200px] h-[60%] rounded-full blur-[160px] opacity-40"
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
            subtitle="4.7★ on the App Store. Here's what Helthy users are saying."
          />
        </div>

        <TransformationCarousel />

        <div className="flex flex-col gap-5">
          <TestimonialRow row={ROW_1} duration={50} direction={-1} keyPrefix="r1" />
          <TestimonialRow row={ROW_2} duration={55} direction={1} keyPrefix="r2" />
        </div>
      </div>
    </section>
  );
}
