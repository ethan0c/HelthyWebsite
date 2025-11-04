"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartPulse, Leaf, Sparkles } from "lucide-react";

const features = [
  {
    title: "Smooth by default",
    desc: "Lenis-powered smooth scrolling that plays nicely with ScrollTrigger.",
    icon: Leaf,
  },
  {
    title: "Scroll-linked motion",
    desc: "GSAP timelines that respond to scroll with buttery performance.",
    icon: Sparkles,
  },
  {
    title: "Wellness-first UI",
    desc: "Accessible primitives and micro-interactions with shadcn/ui + Motion.",
    icon: HeartPulse,
  },
];

export default function Features() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray<HTMLElement>("[data-feature]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.05,
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="py-24 sm:py-28">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                data-feature
                className="rounded-2xl border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
