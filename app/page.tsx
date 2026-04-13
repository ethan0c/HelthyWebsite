import HeroSection from "@/components/sections/HeroSection";
import SocialProofBar from "@/components/sections/SocialProofBar";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesRow from "@/components/sections/FeaturesRow";
import CredibilitySection from "@/components/sections/CredibilitySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <SocialProofBar />
      <FeaturesRow />
      <HowItWorksSection />
      <CredibilitySection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <SiteFooter />
    </main>
  );
}
