import { Suspense } from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import EatSection from "@/components/sections/EatSection";
import LiftSection from "@/components/sections/LiftSection";
import CoachDemoSection from "@/components/sections/CoachDemoSection";
import WeeklySection from "@/components/sections/WeeklySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingStrip from "@/components/sections/PricingStrip";
import GuidesSection from "@/components/sections/GuidesSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SiteFooter from "@/components/sections/SiteFooter";
import SectionScroller from "@/components/ui/SectionScroller";

export const metadata: Metadata = {
  alternates: { canonical: "https://helthy.app" },
};

export default function Home() {
  return (
    <main className="relative">
      <Suspense fallback={null}>
        <SectionScroller />
      </Suspense>
      {/* One feature per band; bands alternate dark / light (see DESIGN.md) */}
      <HeroSection /> {/* dark */}
      <EatSection /> {/* light */}
      <LiftSection /> {/* dark */}
      <CoachDemoSection /> {/* light */}
      <WeeklySection /> {/* dark */}
      <TestimonialsSection /> {/* light */}
      <PricingStrip /> {/* dark */}
      <GuidesSection /> {/* light */}
      <FAQSection /> {/* dark */}
      <CTASection /> {/* light */}
      <SiteFooter />
    </main>
  );
}
