"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

const featuredTestimonial = {
  quote: "Finally an app that just works. No subscription nonsense, no hidden paywalls. I've tried every tracking app out there—MacroFactor, MyFitnessPal, Cronometer—and Helthy is the one I'm sticking with.",
  author: "Sarah Mitchell",
  role: "Lost 32 lbs in 4 months",
  avatar: "SM",
};

const testimonials = [
  {
    quote: "The AI food scanner is incredibly accurate. I point my phone at my lunch and it knows exactly what I'm eating.",
    author: "James K.",
    role: "Fitness enthusiast",
    avatar: "JK",
  },
  {
    quote: "I've been tracking macros for years. This app makes it feel effortless. The interface is so clean and fast.",
    author: "Mike R.",
    role: "Personal trainer",
    avatar: "MR",
  },
  {
    quote: "Best free nutrition app period. No ads, no premium features locked behind a paywall. Just great design.",
    author: "Emma L.",
    role: "Marathon runner",
    avatar: "EL",
  },
  {
    quote: "The workout tracking is fantastic. Being able to see my progress over months keeps me motivated.",
    author: "David P.",
    role: "Bodybuilding competitor",
    avatar: "DP",
  },
];

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-helthy-lemon text-helthy-lemon" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Rating badge
      gsap.from("[data-rating-badge]", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Heading
      gsap.from("[data-testimonial-heading] > *", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      // Featured testimonial
      gsap.from("[data-featured-testimonial]", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-featured-testimonial]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Grid testimonials
      gsap.from("[data-testimonial-card]", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-testimonial-grid]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 lg:py-40 bg-[#060606] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-helthy-lemon/[0.015] blur-[150px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* App Store rating badge */}
        <div data-rating-badge className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <StarRating />
            <span className="text-white/60 text-sm font-medium">4.9 on the App Store</span>
          </div>
        </div>

        {/* Section heading */}
        <div data-testimonial-heading className="text-center mb-16 lg:mb-24">
          <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-white">
            Real people,
            <br />
            <span className="text-white/30">real results</span>
          </h2>
        </div>

        {/* Featured testimonial */}
        <div data-featured-testimonial className="mb-12">
          <div className="relative max-w-4xl mx-auto p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-helthy-lemon/[0.08] to-transparent border border-helthy-lemon/20">
            {/* Quote icon */}
            <Quote className="w-10 h-10 text-helthy-lemon/30 mb-6" />
            
            {/* Quote text */}
            <blockquote className="text-xl lg:text-2xl font-medium text-white leading-relaxed mb-8">
              "{featuredTestimonial.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-helthy-lemon to-helthy-lemon/50 flex items-center justify-center">
                <span className="text-[#0B0B0B] font-bold text-lg">{featuredTestimonial.avatar}</span>
              </div>
              <div>
                <p className="font-semibold text-white">{featuredTestimonial.author}</p>
                <p className="text-white/50 text-sm">{featuredTestimonial.role}</p>
              </div>
              <div className="ml-auto hidden sm:block">
                <StarRating />
              </div>
            </div>
          </div>
        </div>

        {/* Grid testimonials */}
        <div data-testimonial-grid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-testimonial-card
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
            >
              {/* Stars */}
              <div className="mb-4">
                <StarRating />
              </div>

              {/* Quote */}
              <p className="text-white/50 text-sm leading-relaxed mb-6">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                  <span className="text-white/60 text-xs font-medium">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{testimonial.author}</p>
                  <p className="text-xs text-white/40">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
