import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import AIScanner from "@/components/sections/AIScanner";
import WhyFree from "@/components/sections/WhyFree";
import SocialProof from "@/components/sections/SocialProof";
import PremiumTease from "@/components/sections/PremiumTease";
import PlatformCTA from "@/components/sections/PlatformCTA";
import FAQSection from "@/components/sections/FAQSection";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <FeatureShowcase />
      <AIScanner />
      <WhyFree />
      <SocialProof />
      <PremiumTease />
      <PlatformCTA />
      <FAQSection />
      <SiteFooter />
    </>
  );
}
