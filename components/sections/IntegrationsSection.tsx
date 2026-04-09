"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Heart, Activity, Watch, Footprints, Scale, Flame } from "lucide-react";

const PARTNERS = [
  { icon: Heart, name: "Apple Health", color: "#FF2D55" },
  { icon: Activity, name: "Google Health Connect", color: "#34A853" },
  { icon: Watch, name: "Apple Watch", color: "#A1A1A6" },
  { icon: Footprints, name: "Steps", color: "var(--helthy-steps)" },
  { icon: Scale, name: "Weight scales", color: "var(--helthy-carbs)" },
  { icon: Flame, name: "Active energy", color: "var(--helthy-fats)" },
];

export default function IntegrationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-int-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        rotateX: 12,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // 3D tilt on hover
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-4px)`;
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section
      ref={sectionRef}
      className="relative section-padding px-6 lg:px-8 bg-[#080808]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-display-xl font-heading font-light tracking-tight">
            Plays nice with{" "}
            <span className="text-italics text-helthy-lemon">your gear</span>.
          </h2>
          <p className="mt-5 text-base text-white/60 leading-relaxed font-light">
            Helthy auto-syncs steps, weight, workouts, and heart rate with
            Apple Health and Google Health Connect. No manual entry, no
            duplicate data.
          </p>
        </div>

        <div className="perspective-container grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PARTNERS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                data-int-card
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className="card-helthy p-6 flex flex-col items-center text-center transition-transform duration-300 ease-out [transform-style:preserve-3d] cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: `${p.color}1A`,
                    border: `1px solid ${p.color}33`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: p.color }} />
                </div>
                <p className="text-sm text-white font-medium">{p.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
