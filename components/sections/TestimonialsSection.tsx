"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star } from "lucide-react";

function handleDownloadClick(e: React.MouseEvent) {
  if (window.matchMedia("(pointer: fine)").matches) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("helthy:qr-open"));
  }
}

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
    accent: "#CDFB50",
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
    quote: "This is the best app! I use it everyday.",
    name: "arceus208",
    detail: "App Store review · 🇺🇸",
    accent: "#EC4899",
  },
];

const ROW_1 = TESTIMONIALS.slice(0, 3);
const ROW_2 = TESTIMONIALS.slice(3);

const TRANSFORMATIONS = [
  {
    name: "Chibu",
    role: "Co-founder",
    before: "/transformations/chibu-before.jpg",
    after: "/transformations/chibu-after.jpg",
    beforeFace: { cx: 33, cy: 30, r: 13 },
    afterFace: { cx: 51, cy: 42, r: 11 },
    quote:
      "Built Helthy because nothing else would actually tell me what to fix.",
    stats: [{ label: "lost", value: "−50 lb" }],
  },
  {
    name: "Ebu",
    role: "Co-founder",
    before: "/transformations/ebu-before.jpg",
    after: "/transformations/ebu-after.jpg",
    beforeFace: { cx: 57, cy: 26, r: 12 },
    afterFace: { cx: 56, cy: 37, r: 11 },
    quote:
      "I used to forget half my meals. Now Helthy logs them in seconds and the AI coach actually keeps me honest.",
    stats: [{ label: "gained", value: "+50 lb" }],
  },
  {
    name: "",
    role: "Since day one",
    hideName: true,
    before: "/transformations/oma-before.jpg",
    after: "/transformations/oma-after.jpg",
    beforeFace: { cx: 59, cy: 35, r: 11 },
    afterFace: { cx: 49, cy: 25, r: 13 },
    quote:
      "Finally an app that doesn't shame me into logging. I just take a photo and go.",
    stats: [{ label: "lost", value: "−23 kg" }],
  },
];

type FaceBox = { cx: number; cy: number; r: number };

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="card-helthy shrink-0 w-[85vw] max-w-[340px] sm:w-[380px] sm:max-w-none">
      <div className="p-7 flex flex-col h-full">
        <div className="flex gap-0.5 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5" fill="#CDFB50" stroke="none" />
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

/**
 * Drag-to-reveal before/after slider. Drag the handle (or click the
 * image) to wipe between the two states. Keyboard: arrow keys on the
 * focused handle.
 */
function FaceBlur({ face }: { face: FaceBox }) {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${face.cx - face.r}%`,
        top: `${face.cy - face.r}%`,
        width: `${face.r * 2}%`,
        height: `${face.r * 2}%`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        // Soft-edged mask so the blur fades at the boundary instead of
        // hard-cutting — much less "sticker on the face" than a flat disc.
        maskImage:
          "radial-gradient(circle at 50% 50%, #000 55%, rgba(0,0,0,0.6) 75%, transparent 95%)",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 50%, #000 55%, rgba(0,0,0,0.6) 75%, transparent 95%)",
      }}
    />
  );
}

function BeforeAfterSlider({
  before,
  after,
  name,
  beforeFace,
  afterFace,
}: {
  before: string;
  after: string;
  name: string;
  beforeFace?: FaceBox;
  afterFace?: FaceBox;
}) {
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => setFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, setFromClientX]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 4));
    else if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 4));
    else if (e.key === "Home") setPct(0);
    else if (e.key === "End") setPct(100);
  };

  return (
    <div
      ref={frameRef}
      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden select-none bg-black"
      onPointerDown={(e) => {
        e.preventDefault();
        setDragging(true);
        setFromClientX(e.clientX);
      }}
      style={{ cursor: dragging ? "grabbing" : "ew-resize", touchAction: "none" }}
    >
      {/* After (base layer) */}
      <Image
        src={after}
        alt={`${name} after`}
        fill
        className="object-cover pointer-events-none"
        sizes="(max-width: 768px) 92vw, 1100px"
        priority={false}
      />
      {afterFace && <FaceBlur face={afterFace} />}
      {/* After label — glossy lemon pill */}
      <span
        className="font-body absolute bottom-4 right-4 text-[10px] uppercase z-20 pointer-events-none rounded-full"
        style={{
          padding: "5px 12px",
          color: "#0B0B0B",
          letterSpacing: "0.14em",
          fontWeight: 700,
          background: "#CDFB50",
          boxShadow:
            "inset 0 1.5px 1px 0 rgba(255,255,255,0.5)," +
            "inset 0 8px 8px -4px rgba(255,255,255,0.25)," +
            "0 6px 16px -4px rgba(205,251,80,0.45)," +
            "0 2px 6px rgba(0,0,0,0.35)",
        }}
      >
        After
      </span>

      {/* Before (clipped by pct) */}
      <div
        className="absolute inset-0 overflow-hidden z-10"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${name} before`}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 768px) 92vw, 1100px"
        />
        {beforeFace && <FaceBlur face={beforeFace} />}
        {/* Before label — dark glass pill */}
        <span
          className="font-body absolute bottom-4 left-4 text-[10px] uppercase pointer-events-none rounded-full backdrop-blur-md"
          style={{
            padding: "5px 12px",
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.14em",
            fontWeight: 600,
            background: "rgba(10,10,12,0.55)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.12)," +
              "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          Before
        </span>
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
      >
        <div
          className="w-[2px] h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(205,251,80,0) 0%, rgba(205,251,80,0.9) 20%, rgba(205,251,80,0.9) 80%, rgba(205,251,80,0) 100%)",
            boxShadow: "0 0 18px rgba(205,251,80,0.55)",
          }}
        />
        <button
          type="button"
          role="slider"
          aria-label={`${name} before/after slider`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          tabIndex={0}
          onKeyDown={onKey}
          onPointerDown={(e) => {
            e.stopPropagation();
            setDragging(true);
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center pointer-events-auto"
          style={{
            width: 44,
            height: 44,
            background: "#CDFB50",
            border: "none",
            cursor: dragging ? "grabbing" : "grab",
            boxShadow:
              "inset 0 2px 1px 0 rgba(255,255,255,0.5)," +
              "inset 0 0.6px 0.6px -1.25px rgba(255,255,255,0.72)," +
              "inset 0 2.29px 2.29px -2.5px rgba(255,255,255,0.635)," +
              "inset 0 10px 10px -3.75px rgba(255,255,255,0.25)," +
              "0 10px 24px -6px rgba(205,251,80,0.5)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 4L1 8l3 4M12 4l3 4-3 4"
              stroke="#0B0B0B"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function TransformationRow({
  t,
  flip = false,
}: {
  t: (typeof TRANSFORMATIONS)[number];
  flip?: boolean;
}) {
  return (
    <article
      className={`card-helthy p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${
        flip ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="lg:col-span-5">
        <BeforeAfterSlider
          before={t.before}
          after={t.after}
          name={t.name}
          beforeFace={t.beforeFace}
          afterFace={t.afterFace}
        />
      </div>

      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Eyebrow — DM Sans, standard metadata label */}
        <p
          className="font-body text-[11px] uppercase"
          style={{
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.2em",
            fontWeight: 600,
          }}
        >
          {t.hideName ? t.role : `${t.role} · ${t.name}`}
        </p>

        {/* Hero title — Unbounded display, mirrors mobile heroTitle */}
        <h3
          className="font-heading"
          style={{
            fontSize: "clamp(26px, 3vw, 34px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: "1.15",
            color: "#F9F9F9",
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </h3>

        {/* Hero stat — solid lemon, the confident takeaway number */}
        <div className="flex flex-wrap gap-5 items-end">
          {t.stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span
                className="font-body text-[10px] uppercase"
                style={{
                  color: "#0B0B0B",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                  background: "#CDFB50",
                  padding: "4px 10px",
                  borderRadius: 999,
                  alignSelf: "flex-start",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.4)," +
                    "0 6px 14px -6px rgba(205,251,80,0.45)",
                }}
              >
                {s.label}
              </span>
              <span
                className="text-numeric"
                style={{
                  fontSize: "clamp(40px, 5.5vw, 64px)",
                  fontWeight: 500,
                  color: "#CDFB50",
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  marginTop: 10,
                }}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
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

      // Pause on hover — ease the speed down/up instead of hard-stopping,
      // so readers can actually finish a testimonial.
      const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.5, ease: "power2.out", overwrite: true });
      const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6, ease: "power2.out", overwrite: true });
      track.addEventListener("pointerenter", slow);
      track.addEventListener("pointerleave", resume);

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

function TransformationStack() {
  return (
    <div className="container-page mb-16 sm:mb-20">
      <div className="flex flex-col gap-5 sm:gap-6">
        {TRANSFORMATIONS.map((t, i) => (
          <TransformationRow key={t.name} t={t} flip={i % 2 === 1} />
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center gap-3">
        <a
          href="/download"
          onClick={handleDownloadClick}
          className="btn-primary"
        >
          Start your transformation
        </a>
        <p
          className="text-[11px] uppercase"
          style={{
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          Drag the handle to reveal before / after
        </p>
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
              "radial-gradient(ellipse, rgba(205,251,80,0.04) 0%, transparent 70%)",
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

        <TransformationStack />

        <div className="flex flex-col gap-5">
          <TestimonialRow row={ROW_1} duration={90} direction={-1} keyPrefix="r1" />
          <TestimonialRow row={ROW_2} duration={100} direction={1} keyPrefix="r2" />
        </div>
      </div>
    </section>
  );
}
