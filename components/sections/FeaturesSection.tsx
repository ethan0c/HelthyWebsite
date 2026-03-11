"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// 3D Tilt Card Component
function TiltCard({ 
  children, 
  className,
  dataAttr = "data-bento-card"
}: { 
  children: React.ReactNode; 
  className?: string;
  dataAttr?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.6,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      {...{ [dataAttr]: true }}
    >
      {children}
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading with smooth reveal and blur
      gsap.from("[data-features-heading] > *", {
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-features-heading]",
          start: "top 80%",
          once: true,
        },
      });

      // Bento cards with scale and parallax
      gsap.from("[data-bento-card]", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        stagger: 0.15,
        duration: 1.0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-bento-grid]",
          start: "top 75%",
          once: true,
        },
      });

      // Add parallax to cards
      gsap.utils.toArray("[data-bento-card]").forEach((card: any, i) => {
        gsap.to(card, {
          y: -30 * (i % 2 === 0 ? 1 : -1),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 lg:py-40 bg-[#060606] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section heading */}
        <div data-features-heading className="mb-12 lg:mb-16">
          <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            Features
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-white max-w-4xl">
            <span className="text-italics">Tools</span> that make tracking
            <br />
            <span className="text-white/30">feel effortless</span>
          </h2>
        </div>

        {/* Bento Grid - Large cards */}
        <div data-bento-grid className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* Row 1: Large Hero Card - Food Scanner */}
          <TiltCard className="relative lg:col-span-2 rounded-3xl overflow-hidden h-[500px] sm:h-[600px] lg:h-[700px] group cursor-pointer">
            <Image
              src="/images/stock/person-taking-photo-bowls-with-food-with-smartphone.jpg"
              alt="AI-powered nutrition tracking"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            
            <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-end" style={{ transform: "translateZ(40px)" }}>
              <p className="text-white/50 text-sm font-medium tracking-wide uppercase mb-4">AI Food Scanner</p>
              <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-[-0.02em] max-w-2xl">
                <span className="text-italics">Snap</span> a photo. Know your macros instantly.
              </h3>
              <p className="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed">
                Point your camera at any meal and get instant, accurate nutrition data. Our AI recognizes thousands of foods—no more manual searching or guesswork.
              </p>
            </div>
          </TiltCard>

          {/* Row 2: Two equal cards */}
          {/* Workout tracking */}
          <TiltCard className="relative rounded-3xl overflow-hidden h-[400px] sm:h-[500px] group cursor-pointer">
            <Image
              src="/images/stock/workout-pullup.jpg"
              alt="Workout tracking"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            
            <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end" style={{ transform: "translateZ(30px)" }}>
              <p className="text-white/50 text-sm font-medium tracking-wide uppercase mb-3">Workout Tracking</p>
              <h3 className="font-heading text-2xl sm:text-3xl font-light text-white mb-3 tracking-[-0.02em]">
                <span className="text-italics">Track</span> every rep
              </h3>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-sm">
                500+ exercises with guided tracking. Log sets, reps, and watch your personal records climb over time.
              </p>
            </div>
          </TiltCard>

          {/* Movement flexibility */}
          <TiltCard className="relative rounded-3xl overflow-hidden h-[400px] sm:h-[500px] group cursor-pointer">
            <Image
              src="/images/stock/runner-trail.jpg"
              alt="Your movement, your way"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            
            <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end" style={{ transform: "translateZ(30px)" }}>
              <p className="text-white/50 text-sm font-medium tracking-wide uppercase mb-3">Your Movement</p>
              <h3 className="font-heading text-2xl sm:text-3xl font-light text-white mb-3 tracking-[-0.02em]">
                <span className="text-italics">Your</span> way, your pace
              </h3>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-sm">
                Whether it&apos;s heavy lifting or morning yoga, track it all in one place. We adapt to your routine.
              </p>
            </div>
          </TiltCard>

          {/* Row 3: Text card + accent card */}
          {/* Dark text card */}
          <TiltCard className="relative rounded-3xl overflow-hidden h-[300px] sm:h-[350px] bg-[#111] border border-white/[0.06] p-8 sm:p-12 flex flex-col justify-center cursor-pointer">
            <div style={{ transform: "translateZ(25px)" }}>
              <p className="text-white/50 text-sm font-medium tracking-wide uppercase mb-4">Progress Analytics</p>
              <h3 className="font-heading text-2xl sm:text-3xl font-light text-white mb-4 tracking-[-0.02em]">
                <span className="text-italics">See</span> your transformation unfold
              </h3>
              <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-md">
                Beautiful charts showing weight, measurements, and trends. Watch the numbers change as you put in the work.
              </p>
            </div>
          </TiltCard>

          {/* Accent card - Lemon */}
          <TiltCard className="relative rounded-3xl overflow-hidden h-[300px] sm:h-[350px] bg-helthy-lemon p-8 sm:p-12 flex flex-col justify-center cursor-pointer">
            <div style={{ transform: "translateZ(25px)" }}>
              <p className="text-[#0B0B0B]/50 text-sm font-medium tracking-wide uppercase mb-4">No Strings Attached</p>
              <h3 className="font-heading text-2xl sm:text-3xl font-light text-[#0B0B0B] mb-4 tracking-[-0.02em]">
                <span className="text-italics">100%</span> free. Forever.
              </h3>
              <p className="text-[#0B0B0B]/60 text-sm sm:text-base leading-relaxed max-w-md">
                No subscriptions, no paywalls, no tricks. Everything you need to reach your goals without spending a dime.
              </p>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
