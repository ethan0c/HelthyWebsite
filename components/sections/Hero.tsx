"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero=eyebrow]", { y: 20, opacity: 0, duration: 0.6 })
        .from(
          "[data-hero=title]",
          { y: 24, opacity: 0, duration: 0.8 },
          "<0.05"
        )
        .from(
          "[data-hero=sub]",
          { y: 20, opacity: 0, duration: 0.6 },
          "<0.05"
        )
        .from(
          "[data-hero=cta]",
          { y: 14, opacity: 0, duration: 0.5 },
          "<0.05"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate overflow-hidden py-28 sm:py-36">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p data-hero="eyebrow" className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Wellness, reimagined
          </p>
          <h1
            data-hero="title"
            className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl"
          >
            Build a healthy site with modern motion
          </h1>
          <p
            data-hero="sub"
            className="mt-5 text-pretty text-lg leading-8 text-zinc-600 dark:text-zinc-400"
          >
            Next.js 16 + Tailwind v4 + GSAP + Lenis + Framer Motion. Smooth scroll, scroll-linked
            animations, and accessible UI primitives.
          </p>
          <div data-hero="cta" className="mt-8 flex items-center justify-center gap-3">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </motion.a>
            <a
              href="#learn-more"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
