import HeroSection from "@/components/sections/HeroSection";
import FeatureReel from "@/components/sections/FeatureReel";
import ScannerDemo from "@/components/sections/ScannerDemo";
import ProofSection from "@/components/sections/ProofSection";
import ClosingSection from "@/components/sections/ClosingSection";
import FAQSection from "@/components/sections/FAQSection";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureReel />
      <ScannerDemo />
      <ProofSection />
      <ClosingSection />
      <FAQSection />
      <SiteFooter />
    </>
  );
}
