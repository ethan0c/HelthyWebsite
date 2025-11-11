"use client";
import React from "react";
import Waitlist from "./Waitlist";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="relative bg-helthy-lemon py-12 md:py-20">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <span className="scroll-reveal animate-scale-in inline-flex items-center px-4 py-2 rounded-full bg-black/10 border border-black/10 text-helthy-black text-xs md:text-sm font-medium tracking-wide">
              Early Access
            </span>
            <h2 className="scroll-reveal animate-slide-up stagger-1 text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-helthy-black" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
              Join the waitlist — all-in-one health, free forever
            </h2>
            <p className="scroll-reveal animate-slide-up stagger-2 text-helthy-black/80 text-base md:text-lg max-w-prose">
              Be first to try Helthy’s unified workouts, nutrition, and progress tracking. No spam. No fees.
            </p>
          </div>
          <div className="scroll-reveal animate-scale-in stagger-3 max-w-3xl md:ml-auto mt-4 sm:mt-6 md:mt-8">
            <Waitlist />
          </div>
        </div>
      </div>
    </section>
  );
}
