"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";

// Apple App Store icon
function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

// Split text into individual characters for animation
function SplitText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={className}>
      {children.split("").map((char, i) => (
        <span
          key={i}
          data-char
          className="inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Eyebrow fade in
      gsap.from("[data-cta-eyebrow]", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Character-by-character text reveal with smooth 3D rotation
      const chars = headingRef.current?.querySelectorAll("[data-char]");
      if (chars) {
        gsap.set(chars, { 
          y: 100, 
          opacity: 0,
          rotateX: -90,
          transformOrigin: "50% 100%",
        });
        
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: {
            amount: 0.8,
            ease: "power2.in",
          },
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        });
      }

      // Smooth lemon text glow pulse
      gsap.to("[data-lemon-text]", {
        textShadow: "0 0 60px rgba(205, 251, 80, 0.8), 0 0 100px rgba(205, 251, 80, 0.4)",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Subtext fade in
      gsap.from("[data-cta-subtext]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      // Buttons stagger in
      gsap.from("[data-cta-buttons] > *", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        delay: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      // Phone entrance with bounce
      gsap.from("[data-cta-phone]", {
        y: 150,
        opacity: 0,
        scale: 0.8,
        rotation: 10,
        duration: 1.2,
        delay: 0.4,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      });

      // Subtle phone float animation (continuous)
      gsap.to("[data-cta-phone]", {
        y: -15,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Glow pulse
      gsap.to("[data-phone-glow]", {
        scale: 1.2,
        opacity: 0.3,
        duration: 2.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 lg:py-40 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-helthy-lemon/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-helthy-lemon/[0.04] blur-[150px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Main heading */}
          <div className="mb-12">
            <p data-cta-eyebrow className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">
              Ready to start?
            </p>
            <h2 
              ref={headingRef}
              className="font-heading text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white mb-6"
              style={{ perspective: "1000px" }}
            >
              <SplitText>Your journey</SplitText>
              <br />
              <span data-lemon-text className="text-helthy-lemon inline-block">
                <SplitText>starts now</SplitText>
              </span>
            </h2>
            <p data-cta-subtext className="text-lg sm:text-xl text-white/40 max-w-xl mx-auto mb-10">
              Free forever. No credit card. No subscriptions.
              <br className="hidden sm:block" />
              Just results.
            </p>

            {/* CTA buttons */}
            <div data-cta-buttons className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-full bg-helthy-lemon text-[#0B0B0B] font-medium text-base tracking-wide uppercase hover:bg-white hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(205,251,80,0.3)] transition-all duration-300"
                strength={0.4}
              >
                <AppStoreIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                Download Free
              </MagneticButton>
              <MagneticButton
                href="/pricing"
                className="px-6 py-4 text-white/60 hover:text-white transition-colors group"
                strength={0.3}
              >
                <span className="text-sm font-medium tracking-wide uppercase">See what's included</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </div>
          </div>

          {/* Phone showcase */}
          <div data-cta-phone className="relative max-w-lg mx-auto mt-12">
            <div className="flex justify-center gap-4">
              {/* Main phone */}
              <div className="relative w-[200px] sm:w-[240px]">
                <div className="relative w-full aspect-[9/19] rounded-[2.5rem] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-2 shadow-2xl shadow-black/40">
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0B0B0B]">
                    <Image
                      src="/phones/homescreen.png"
                      alt="Helthy app home"
                      fill
                      className="object-cover"
                      sizes="240px"
                    />
                  </div>
                </div>
                {/* Glow */}
                <div data-phone-glow className="absolute -inset-6 bg-helthy-lemon/20 blur-3xl rounded-full -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
