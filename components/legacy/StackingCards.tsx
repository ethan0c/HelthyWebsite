import React, { useEffect, useRef, useState } from "react";

type CardItem = {
  title: string;
  text: string;
};

export default function StackingCards({ items }: { items: CardItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll('[data-card]')) as HTMLElement[];

    const onScroll = () => {
      const vh = window.innerHeight;
      let nearestIdx = 0;
      let nearestDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const dist = Math.abs(r.top - vh * 0.4);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      });
      setActive(nearestIdx);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="relative bg-helthy-black">
      <div ref={containerRef} className="container mx-auto px-6 lg:px-20 py-24 md:py-32">
        {/* Pinned title */}
        <div className="sticky top-20 z-20">
          <h2 className="text-white text-4xl md:text-5xl font-normal" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Why this works</h2>
          <p className="text-white/60 mt-2 max-w-2xl">Cards stack as you scroll; no external libraries, smooth and performant.</p>
        </div>

        <div className="relative mt-12">
          {items.map((item, i) => {
            // Simple progressive scale/offset based on index and active card
            const baseTop = 22; // vh
            const topOffset = baseTop + i * 4; // stagger sticky top to create stack
            const isPast = i < active;
            const isActive = i === active;
            const scale = isActive ? 1 : isPast ? 0.94 : 0.98;
            const y = isPast ? i * -2 : 0; // subtle lift for past cards

            return (
              <article
                key={i}
                data-card
                className="relative z-10 will-change-transform"
                style={{
                  transform: `translateY(${y}px) scale(${scale})`,
                  transition: 'transform 220ms ease',
                }}
              >
                <div
                  className="sticky mx-auto w-full max-w-5xl border border-white/10 bg-white text-helthy-black rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                  style={{ top: `${topOffset}vh` }}
                >
                  <div className="p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-medium mb-4" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>{item.title}</h3>
                    <p className="text-base md:text-lg text-black/80 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </article>
            );
          })}

          {/* End spacer to let last sticky card release */}
          <div className="h-[60vh]" />
        </div>
      </div>
    </section>
  );
}
