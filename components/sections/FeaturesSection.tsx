"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Zap, TrendingUp, Dumbbell, Target, Sparkles } from "lucide-react";
import Image from "next/image";

const mainFeatures = [
  {
    icon: Camera,
    title: "AI Food Scanner",
    subtitle: "Snap. Scan. Done.",
    description: "Point your camera at any meal and get instant, accurate nutrition data. Our AI recognizes thousands of foods—no more manual searching.",
    color: "#FF6B6B",
    image: "/phones/foodmainscreen.png",
    stats: [
      { value: "2s", label: "Scan time" },
      { value: "98%", label: "Accuracy" },
    ],
  },
  {
    icon: Dumbbell,
    title: "Workout Tracking",
    subtitle: "Every rep counts.",
    description: "500+ exercises with guided tracking. Log sets, reps, and watch your personal records climb over time.",
    color: "#4CAF50",
    image: "/phones/newworkoutscreen.png",
    stats: [
      { value: "500+", label: "Exercises" },
      { value: "∞", label: "Custom workouts" },
    ],
  },
];

const gridFeatures = [
  {
    icon: Target,
    title: "Smart Macro Goals",
    description: "Custom targets that adapt to your progress and preferences.",
    color: "#2196F3",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Beautiful charts showing weight, measurements, and trends.",
    color: "#FF9800",
  },
  {
    icon: Sparkles,
    title: "AI Coaching",
    description: "Personalized insights based on your unique data.",
    color: "#9C27B0",
  },
  {
    icon: Zap,
    title: "Quick Logging",
    description: "Voice input, barcode scanning, and 1M+ food database.",
    color: "#CDFB50",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial states - elements start hidden
      gsap.set("[data-features-heading] > *", { y: 20, opacity: 0 });
      gsap.set("[data-main-feature]", { y: 30, opacity: 0 });
      gsap.set("[data-grid-feature]", { y: 20, opacity: 0 });

      // Section heading - fast
      gsap.to("[data-features-heading] > *", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-features-heading]",
          start: "top 85%",
          once: true,
        },
      });

      // Main feature cards - fast
      gsap.to("[data-main-feature]", {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-main-features]",
          start: "top 85%",
          once: true,
        },
      });

      // Grid features - fast
      gsap.to("[data-grid-feature]", {
        y: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.35,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-grid-features]",
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 lg:py-40 bg-[#060606] relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-helthy-lemon/[0.02] blur-[150px] rounded-full" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section heading - editorial style */}
        <div data-features-heading className="mb-20 lg:mb-28">
          <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            Features
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-white max-w-4xl">
            Tools that make tracking
            <br />
            <span className="text-white/30">feel effortless</span>
          </h2>
        </div>

        {/* Main features - large cards */}
        <div data-main-features className="grid lg:grid-cols-2 gap-6 mb-6">
          {mainFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                data-main-feature
                className="group relative rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.06] p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:border-white/[0.12]"
              >
                {/* Background glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 70%, ${feature.color}08, transparent 70%)` }}
                />

                <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div>
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    
                    <p className="text-white/40 text-sm font-medium tracking-wide uppercase mb-2">
                      {feature.subtitle}
                    </p>
                    <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-4 tracking-[-0.02em]">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-8">
                      {feature.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                          <p className="text-xs text-white/40 uppercase tracking-wide">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phone mockup */}
                  <div className="relative flex justify-center lg:justify-end">
                    <div className="relative w-[180px] sm:w-[200px]">
                      <div className="relative w-full aspect-[9/19] rounded-[2rem] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-1.5 shadow-2xl shadow-black/30 transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-2">
                        <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden bg-[#0B0B0B]">
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>
                      </div>
                      {/* Phone glow */}
                      <div 
                        className="absolute -inset-4 rounded-full blur-2xl -z-10 opacity-30"
                        style={{ background: feature.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grid features - smaller cards */}
        <div data-grid-features className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gridFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                data-grid-feature
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${feature.color}12` }}
                >
                  <Icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <h3 className="text-white font-semibold mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
