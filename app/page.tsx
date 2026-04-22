import { Suspense } from "react";
import HeroSection from "@/components/sections/HeroSection";
import PhoneShowcaseSection from "@/components/sections/PhoneShowcaseSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesRow from "@/components/sections/FeaturesRow";
import WhyHelthySection from "@/components/sections/WhyHelthySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import SiteFooter from "@/components/sections/SiteFooter";
import FlowingLine from "@/components/ui/FlowingLine";
import SectionScroller from "@/components/ui/SectionScroller";

export default function Home() {
  return (
    <main className="relative">
      <Suspense fallback={null}>
        <SectionScroller />
      </Suspense>
      <FlowingLine />
      <HeroSection />
      <PhoneShowcaseSection />
      <FeaturesRow />
      <div aria-hidden="true" className="section-beam" />
      <HowItWorksSection />
      <WhyHelthySection />
      <div aria-hidden="true" className="section-beam" />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <NewsletterSection />
      <SiteFooter />
    </main>
  );
}
