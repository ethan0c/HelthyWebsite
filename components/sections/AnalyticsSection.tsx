"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Recreated stat cards from the helthy_app dashboard. Numbers count
 * up on scroll. Uses the semantic color tokens (protein/carbs/fats/
 * steps) so the website "speaks the same UI language" as the app.
 */

function CountUp({
  value,
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obj = { v: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: value,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v).toLocaleString()}${suffix}`;
          },
        });
      },
    });
    return () => {
      trigger.kill();
    };
  }, [value, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

/** SVG ring — matches the activity rings on the home screen */
function MacroRing({
  value,
  goal,
  color,
  label,
}: {
  value: number;
  goal: number;
  color: string;
  label: string;
}) {
  const size = 88;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / goal, 1);
  const dashRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!dashRef.current) return;
    const el = dashRef.current;
    gsap.set(el, { strokeDashoffset: c });
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          strokeDashoffset: c * (1 - pct),
          duration: 1.4,
          ease: "power2.out",
        });
      },
    });
  }, [c, pct]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            ref={dashRef}
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={c}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-numeric text-white text-base font-semibold">
            {value}
          </span>
          <span className="text-[9px] text-white/40">/ {goal}g</span>
        </div>
      </div>
      <p className="mt-2 text-[11px] uppercase tracking-wider text-white/55 font-medium">
        {label}
      </p>
    </div>
  );
}

export default function AnalyticsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-stat-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-eyebrow mb-4">Analytics</p>
          <h2 className="text-display-xl font-heading font-light tracking-tight max-w-3xl mx-auto">
            See the progress{" "}
            <span className="text-italics text-helthy-lemon">
              you can&apos;t feel yet
            </span>
            .
          </h2>
        </div>

        {/* Bento grid of fake-but-realistic stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {/* Today macros */}
          <div data-stat-card className="card-helthy p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/45">
                  Today · Macros
                </p>
                <p className="text-numeric text-white text-2xl font-semibold mt-1">
                  <CountUp value={1842} /> <span className="text-white/40 text-sm">/ 2300 kcal</span>
                </p>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-helthy-success/10 border border-helthy-success/20 text-helthy-success">
                On track
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <MacroRing value={142} goal={200} color="var(--helthy-protein)" label="Protein" />
              <MacroRing value={186} goal={250} color="var(--helthy-carbs)" label="Carbs" />
              <MacroRing value={62} goal={80} color="var(--helthy-fats)" label="Fats" />
              <MacroRing value={28} goal={35} color="var(--helthy-fiber)" label="Fiber" />
            </div>
          </div>

          {/* Steps */}
          <div data-stat-card className="card-helthy p-6">
            <p className="text-[11px] uppercase tracking-wider text-white/45 mb-1">
              Today · Steps
            </p>
            <p className="text-numeric text-white text-3xl font-semibold">
              <CountUp value={8421} />
            </p>
            <p className="text-xs text-white/40 mt-1">/ 10,000 goal</p>
            {/* Tiny bar chart */}
            <div className="mt-5 flex items-end gap-1.5 h-12">
              {[40, 65, 50, 80, 72, 90, 84].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: "var(--helthy-steps)",
                    opacity: i === 6 ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Streak */}
          <div data-stat-card className="card-helthy p-6">
            <p className="text-[11px] uppercase tracking-wider text-white/45 mb-1">
              Logging Streak
            </p>
            <p className="text-numeric text-white text-3xl font-semibold flex items-baseline gap-1">
              <CountUp value={42} />
              <span className="text-white/40 text-sm">days</span>
            </p>
            <p className="text-xs text-helthy-lemon mt-1">🔥 Personal best</p>
          </div>

          {/* Weight trend */}
          <div data-stat-card className="card-helthy p-6">
            <p className="text-[11px] uppercase tracking-wider text-white/45 mb-1">
              Weight · 30d trend
            </p>
            <p className="text-numeric text-white text-3xl font-semibold">
              184<span className="text-white/40 text-sm">.2 lb</span>
            </p>
            <p className="text-xs text-helthy-success mt-1">↓ 3.4 lb this month</p>
            {/* Tiny line chart */}
            <svg viewBox="0 0 100 30" className="w-full mt-4 h-10">
              <polyline
                fill="none"
                stroke="var(--helthy-steps)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,8 10,12 20,10 30,15 40,14 50,18 60,16 70,22 80,20 90,25 100,24"
              />
            </svg>
          </div>

          {/* PRs */}
          <div data-stat-card className="card-helthy p-6 md:col-span-2 lg:col-span-1">
            <p className="text-[11px] uppercase tracking-wider text-white/45 mb-1">
              This week · PRs
            </p>
            <div className="space-y-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Bench Press</span>
                <span className="text-numeric text-helthy-lemon font-semibold">
                  225 lb × 5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Deadlift</span>
                <span className="text-numeric text-helthy-lemon font-semibold">
                  365 lb × 3
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Pull-ups</span>
                <span className="text-numeric text-helthy-lemon font-semibold">
                  +25 lb × 8
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
