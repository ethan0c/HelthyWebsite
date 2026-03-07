"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MissionStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLSpanElement>("[data-word]");
      gsap.set(words, { opacity: 0.12 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          words.forEach((word, i) => {
            const wordProgress = i / words.length;
            const diff = progress - wordProgress;
            const opacity = diff > 0 ? Math.min(1, 0.12 + diff * 6) : 0.12;
            gsap.set(word, { opacity });
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const text =
    "We built Helthy because health tools shouldn't cost $15 a month. The basics are free. Forever. But if you want an AI coach in your pocket — that's Premium.";

  return (
    <section
      ref={sectionRef}
      className="relative section-padding geo-grid"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="text-display-md !font-bold !leading-[1.25] text-white">
          {text.split(" ").map((word, i) => (
            <span key={i} data-word className="inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
