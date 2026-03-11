"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Download",
    subtitle: "Get started in seconds",
    description: "Free on iOS. No credit card required. Set your goals and you're ready to go.",
    image: "/phones/homescreen.png",
    accent: "#CDFB50",
  },
  {
    number: "02",
    title: "Track",
    subtitle: "Log meals & workouts", 
    description: "AI-powered food scanner, voice logging, barcode scanning—whatever works for you.",
    image: "/phones/foodmainscreen.png",
    accent: "#4CAF50",
  },
  {
    number: "03",
    title: "Transform",
    subtitle: "See real results",
    description: "Watch your progress unfold. Hit goals. Build habits that stick.",
    image: "/phones/weightscreen.png",
    accent: "#2196F3",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading with smooth fade and scale
      gsap.from("[data-hiw-heading] > *", {
        y: 60,
        opacity: 0,
        scale: 0.95,
        stagger: 0.12,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Steps with smooth cascade and rotation
      gsap.from("[data-hiw-step]", {
        y: 100,
        opacity: 0,
        rotateY: -15,
        stagger: 0.2,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-hiw-steps]",
          start: "top 70%",
          once: true,
        },
      });

      // Add floating animation to phone images
      gsap.utils.toArray("[data-hiw-step] img").forEach((img: any) => {
        gsap.to(img, {
          y: -15,
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 lg:py-40 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-helthy-lemon/[0.015] blur-[120px] rounded-full -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-500/[0.01] blur-[100px] rounded-full -translate-y-1/2" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section heading - editorial style */}
        <div data-hiw-heading className="mb-20 lg:mb-28">
          <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            How it works
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-white max-w-3xl">
              <span className="text-italics">Three</span> steps to a
              <br />
              <span className="text-white/30">healthier you</span>
            </h2>
            <a
              href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 text-white/50 hover:text-helthy-lemon transition-colors group"
            >
              <span className="text-sm font-medium tracking-wide uppercase">Start free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Steps - horizontal layout on desktop */}
        <div data-hiw-steps className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              data-hiw-step
              className="relative group"
            >
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 items-center justify-center z-10">
                  <ArrowRight className="w-4 h-4 text-white/20" />
                </div>
              )}

              {/* Card */}
              <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] p-6 lg:p-8 transition-all duration-500 hover:border-white/[0.12]">
                {/* Large step number */}
                <div className="flex items-center gap-4 mb-6">
                  <span 
                    className="text-[4rem] sm:text-[5rem] font-body font-normal leading-none tracking-[-0.04em] opacity-20"
                    style={{ color: step.accent }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="font-heading text-2xl lg:text-3xl font-light text-white mb-2 tracking-[-0.02em]">
                    <span className="text-italics">{step.title}</span>
                  </h3>
                  <p className="text-white/50 text-sm font-medium mb-3">{step.subtitle}</p>
                  <p className="text-white/40 leading-relaxed">{step.description}</p>
                </div>

                {/* Phone mockup */}
                <div className="relative flex justify-center">
                  <div className="relative w-[160px] sm:w-[180px]">
                    <div className="relative w-full aspect-[9/19] rounded-[2rem] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-1.5 shadow-2xl shadow-black/30 transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-[#0B0B0B]">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                          sizes="180px"
                        />
                      </div>
                    </div>
                    {/* Glow */}
                    <div 
                      className="absolute -inset-4 rounded-full blur-2xl -z-10 opacity-20"
                      style={{ background: step.accent }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
