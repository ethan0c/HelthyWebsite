import HeroSection from "@/components/sections/HeroSection";
import LogoStrip from "@/components/sections/LogoStrip";
import FeaturesRow from "@/components/sections/FeaturesRow";
import PhoneShowcaseFood from "@/components/sections/PhoneShowcaseFood";
import AICoachSection from "@/components/sections/AICoachSection";
import PhoneShowcaseWorkout from "@/components/sections/PhoneShowcaseWorkout";
import AnalyticsSection from "@/components/sections/AnalyticsSection";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
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
      <PhoneShowcaseFood />
      <AICoachSection />
      <PhoneShowcaseWorkout />
      <AnalyticsSection />
      <IntegrationsSection />
      <PricingSection />
      <TransformationsSection />
      <FAQSection />
      <CTASection />
      <SiteFooter />
    </main>
  );
}
