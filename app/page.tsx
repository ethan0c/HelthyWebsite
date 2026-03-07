import HeroSection from "@/components/sections/HeroSection";
import LogoStrip from "@/components/sections/LogoStrip";
import PhotoShowcase from "@/components/sections/PhotoShowcase";
import PhoneShowcase from "@/components/sections/PhoneShowcase";
import FeatureReel from "@/components/sections/FeatureReel";
import ScannerDemo from "@/components/sections/ScannerDemo";
import ProofSection from "@/components/sections/ProofSection";
import ClosingSection from "@/components/sections/ClosingSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import FAQSection from "@/components/sections/FAQSection";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoStrip />
      <PhotoShowcase />
      <PhoneShowcase />
      <FeatureReel />
      <ScannerDemo />
      <ProofSection />
      <ClosingSection />
      <NewsletterSection />
      <FAQSection />
      <SiteFooter />
    </>
  );
}
