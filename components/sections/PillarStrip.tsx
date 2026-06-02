"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Icon from "@mdi/react";
import { mdiCameraOutline, mdiDumbbell, mdiRobotHappyOutline, mdiSleep } from "@mdi/js";

/**
 * Slim value-pillar band that bridges the hero and the phone showcase.
 * Lives on the black canvas so it melts into the hero's bottom fade above and
 * the phone section's top fade below — gives the four pillars room to breathe
 * in the gap instead of crowding the bottom of the hero.
 */

const PILLARS = [
  { icon: mdiCameraOutline, label: "Snap a photo, log a meal" },
  { icon: mdiDumbbell, label: "Track every lift" },
  { icon: mdiRobotHappyOutline, label: "AI coach that learns you" },
  { icon: mdiSleep, label: "Recovery-aware plans" },
];

export default function PillarStrip() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-pillar]", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.7,
        scrollTrigger: { trigger: ref.current, start: "top 98%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="What Helthy does"
      className="relative w-full bg-[#0A0A0A] overflow-hidden"
      style={{
        paddingTop: "clamp(28px, 4vh, 48px)",
        paddingBottom: "clamp(40px, 6vh, 72px)",
      }}
    >
      <div
        className="container-page relative flex items-center justify-center flex-wrap"
        style={{ gap: "clamp(20px, 4vw, 56px)" }}
      >
        {PILLARS.map((p) => (
          <div
            key={p.label}
            data-pillar
            className="flex items-center gap-2.5"
            style={{ color: "rgba(249,249,249,0.62)" }}
          >
            <Icon path={p.icon} size="22px" color="#CDFF50" />
            <span
              style={{
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {p.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
