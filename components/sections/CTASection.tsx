"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HelthyMark from "@/components/ui/HelthyMark";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

export default function CTASection() {
  return (
    <section className="relative section-padding px-6 lg:px-8 overflow-hidden">
      {/* Big lemon ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-[1100px] aspect-square rounded-full blur-[140px] opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(205,251,80,0.35) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-8 flex justify-center">
          <HelthyMark size={56} pulse />
        </div>
        <h2 className="text-display-xl font-heading font-light tracking-tight mb-6">
          Own your fitness. Stop guessing. Start tracking with{" "}
          <span className="text-italics text-helthy-lemon">Starting today.</span>
        </h2>
        <p className="text-base lg:text-lg text-white/65 leading-relaxed font-light max-w-xl mx-auto mb-10">
          Free forever. No credit card. Premium AI launches April 2026 — join
          early to lock in launch pricing.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-helthy-lemon px-8 py-4 text-helthy-black text-sm font-semibold tracking-tight transition-all hover:-translate-y-[2px] hover:shadow-[0_18px_50px_rgba(205,251,80,0.4)]"
          >
            Download for iOS
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          {/* TODO(user): replace with real Google Play link when Android ships */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md px-8 py-4 text-white/80 text-sm font-medium transition-all hover:text-white hover:bg-white/[0.08] hover:border-white/25"
          >
            Join Android waitlist
          </Link>
        </div>
      </div>
    </section>
  );
}
