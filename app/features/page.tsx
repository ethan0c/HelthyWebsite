import type { Metadata } from "next";
import EatSection from "@/components/sections/EatSection";
import LiftSection from "@/components/sections/LiftSection";
import CoachDemoSection from "@/components/sections/CoachDemoSection";
import WeeklySection from "@/components/sections/WeeklySection";
import FeatureBand from "@/components/sections/FeatureBand";
import CTASection from "@/components/sections/CTASection";
import SiteFooter from "@/components/sections/SiteFooter";
import SectionHeading from "@/components/ui/SectionHeading";
import PhoneFrame from "@/components/ui/PhoneFrame";
import StoreButtons from "@/components/ui/StoreButtons";
import { FeatureGrid } from "@/components/seo/SeoPage";

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

const MORE = [
  { title: "Barcode and label scans", body: "Scan a packaged food or point the camera at a nutrition label." },
  { title: "Voice and typed logging", body: "Say or type what you ate and it's broken down into calories and macros." },
  { title: "Custom foods and meals", body: "Save your own foods, meals and workouts so logging them again takes one tap." },
  { title: "Apple Watch", body: "Log cardio and food by voice from your wrist. Pro adds live strength workouts." },
  { title: "Health sync", body: "Connects with Apple Health and Google Health Connect." },
  { title: "Smart Calories", body: "Your calorie target learns from your weight trend, so it keeps up as you change.", pro: true },
  { title: "AI-built routines", body: "Ask for a routine and get a full plan built around your goal.", pro: true },
  { title: "Body fat estimate", body: "An AI estimate of your body fat from progress photos.", pro: true },
  { title: "Data export", body: "Download everything you've logged as a ZIP or CSV file.", pro: true },
];

/** Bands alternate dark / light (see DESIGN.md), same rhythm as the homepage. */
export default function FeaturesPage() {
  return (
    <>
      <main className="relative bg-canvas text-fg">
        {/* dark */}
        <section className="pb-20 pt-32 md:pb-28 lg:pt-40">
          <div className="container-page">
            <div className="max-w-3xl">
              <h1 className="text-display-xl text-fg">
                Everything you track, in <span className="text-highlight">one app</span>
              </h1>
              <p className="mt-6 max-w-xl text-lede">
                Calories, macros, workouts, weight and an AI coach that sees all of it. Free on iOS and
                Android, with Helthy Premium when you want the AI extras.
              </p>
              <div className="mt-8">
                <StoreButtons />
              </div>
            </div>
          </div>
        </section>

        <EatSection /> {/* light */}
        <LiftSection /> {/* dark */}
        <CoachDemoSection /> {/* light */}
        <WeeklySection /> {/* dark */}

        {/* light */}
        <FeatureBand
          id="progress"
          tone="light"
          eyebrow="Progress"
          title="See where you're"
          accent="heading"
          lede="Every weigh-in, meal and workout adds up to a picture of your progress, not just today's number."
          points={[
            "Weight chart by week, month or six months, with every entry in your history",
            "Calories eaten, burned and left for the day, with a breakdown of your burn",
            "Streaks and achievements that reward showing up",
          ]}
          footnote="Meal and workout history covers the last 7 days on the free plan, and everything with Pro."
          visual={
            <PhoneFrame
              src="/phones/weight.png"
              alt="Helthy weight screen with a six-month trend chart and weigh-in history"
              width={1320}
              height={2868}
              className="w-[min(280px,70vw)]"
            />
          }
        />

        {/* dark */}
        <section id="more" className="section">
          <div className="container-page">
            <SectionHeading
              eyebrow="And more"
              title="The details that"
              italicTail="add up"
              subtitle="Smaller features that make logging faster and your numbers more useful."
            />
            <FeatureGrid items={MORE} />
          </div>
        </section>

        <CTASection /> {/* light */}
      </main>
      <SiteFooter />
    </>
  );
}
