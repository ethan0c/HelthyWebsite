import type { Metadata } from "next";
import FeaturesRow from "@/components/sections/FeaturesRow";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CTASection from "@/components/sections/CTASection";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Features · AI Food Logging, Workout Tracking & Coaching",
  description:
    "Everything Helthy does: snap a photo to log meals, track every lift across 1,500 exercises, plot your weight, and get coached by AI that connects nutrition, training, and recovery.",
  alternates: {
    canonical: "https://helthy.app/features",
  },
  openGraph: {
    title: "Helthy Features · AI Food Logging, Workout Tracking & Coaching",
    description:
      "Snap a photo to log meals, track every lift across 1,500 exercises, plot your weight, and get coached by AI. Free on iOS & Android.",
    url: "https://helthy.app/features",
    type: "website",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <main className="relative pt-24 md:pt-28">
        <FeaturesRow />
        <div aria-hidden="true" className="section-beam" />
        <HowItWorksSection />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
