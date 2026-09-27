import { Suspense } from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import PhoneShowcaseSection from "@/components/sections/PhoneShowcaseSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import NewsletterSection from "@/components/sections/NewsletterSection";
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
      <HeroSection />
      <PhoneShowcaseSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <NewsletterSection />
      <SiteFooter />
    </main>
  );
}
