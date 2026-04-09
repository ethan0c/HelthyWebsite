"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Heart, Activity, Watch, Footprints, Scale, Flame } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const PARTNERS = [
  { icon: Heart, name: "Apple Health" },
  { icon: Activity, name: "Google Health Connect" },
  { icon: Watch, name: "Apple Watch" },
  { icon: Footprints, name: "Steps" },
  { icon: Scale, name: "Weight scales" },
  { icon: Flame, name: "Active energy" },
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
      className="relative section-padding px-6 lg:px-8 bg-helthy-surface"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Plays nice with your gear"
          trailingPunctuation=""
          subtitle="Helthy auto-syncs steps, weight, workouts, and heart rate with Apple Health and Google Health Connect. No manual entry, no duplicate data."
        />

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
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Icon className="w-6 h-6 text-white/80" />
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
