import HeroSection from "@/components/sections/HeroSection";
import LogoStrip from "@/components/sections/LogoStrip";
import FeaturesRow from "@/components/sections/FeaturesRow";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import TransformationsSection from "@/components/sections/TransformationsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <LogoStrip />
      <FeaturesRow />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <TransformationsSection />
      <FAQSection />
      <CTASection />
      <SiteFooter />
    </main>
  );
}
