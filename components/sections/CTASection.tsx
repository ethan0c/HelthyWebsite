"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HelthyMark from "@/components/ui/HelthyMark";
import SectionHeading from "@/components/ui/SectionHeading";
import FloatingIcons from "@/components/ui/FloatingIcons";


const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

export default function CTASection() {
  return (
    <section className="relative section-padding px-6 lg:px-8 overflow-hidden bg-helthy-surface">
      <FloatingIcons
        positions={[
          [5, 2, 300, 10],
          [10, 88, 350, -25],
          [75, 5, 280, 35],
          [80, 92, 250, -40],
          [50, 1, 320, 20],
        ]}
        icons={[0, 3, 2, 0, 3]}
        opacity={0.04}
        colorClass="text-white"
      />
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
        <SectionHeading
          eyebrow={<HelthyMark size={56} pulse />}
          title="Stop guessing,"
          italicTail="start today"
          subtitle="Free forever. No credit card. Unlock unlimited AI with Premium whenever you're ready."
          className="mb-10"
        />
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
        </div>
        <p className="mt-5 text-xs text-white/40">
          Android coming soon.
        </p>
      </div>
    </section>
  );
}
