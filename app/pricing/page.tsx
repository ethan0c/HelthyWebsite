import type { Metadata } from "next";
import {
  SeoPage,
  PageHero,
  Section,
  CompareTable,
  FaqList,
  LinkGrid,
  DownloadBanner,
  seoMetadata,
} from "@/components/seo/SeoPage";
import PricingPlans from "@/components/sections/PricingPlans";
import { PRO_PRICE } from "@/lib/site";

export const metadata: Metadata = seoMetadata({
  title: `Pricing: Free Forever, Pro from $${PRO_PRICE.monthly}`,
  description: `Helthy is free forever for food and workout tracking. Helthy Pro adds the AI coach and unlimited AI logging for $${PRO_PRICE.monthly}/month or $${PRO_PRICE.yearly}/year.`,
  path: "/pricing",
});

// Plan limits match public/llms.txt and the in-app paywall
const ROWS = [
  { label: "Food logging: search, saved meals, quick add", values: ["Unlimited", "Unlimited"] },
  { label: "Calorie, macro and fiber tracking", values: [true, true] },
  { label: "AI photo, barcode and label scans", values: ["2 a week", "Unlimited"] },
  { label: "Voice and typed food logging", values: ["2 each a week", "Unlimited"] },
  { label: "Workout logging: sets, reps, weight and cardio", values: ["Unlimited", "Unlimited"] },
  { label: "1,500-exercise library with form tips", values: [true, true] },
  { label: "Automatic personal records", values: [true, true] },
  { label: "Weight tracking with trend chart", values: [true, true] },
  { label: "Helthy Weekly", values: ["This week's issue", "Every issue"] },
  { label: "AI coach chat", values: [false, true] },
  { label: "AI-built workout routines", values: [false, true] },
  { label: "Smart Calories (adaptive TDEE)", values: [false, true] },
  { label: "AI body fat estimate from photos", values: [false, true] },
  { label: "Meal and workout history", values: ["Last 7 days", "Full history and trends"] },
  { label: "Saved workouts / custom foods / custom meals", values: ["4 / 10 / 5", "Unlimited"] },
  { label: "Apple Watch", values: ["Cardio and voice logging", "Plus live strength workouts"] },
  { label: "Apple Health and Health Connect sync", values: [true, true] },
  { label: "Data export (ZIP or CSV)", values: [false, true] },
] as const;

const FAQS = [
  {
    q: "Is Helthy really free?",
    a: "Yes. The free plan has no trial and no expiry. Food and workout logging, calorie and macro targets, personal records and weight tracking are all free, with 2 AI scans a week.",
  },
  {
    q: "How much does Helthy Pro cost?",
    a: `Helthy Pro is $${PRO_PRICE.monthly} a month or $${PRO_PRICE.yearly} a year in the US. The App Store and Google Play show the price in your local currency.`,
  },
  {
    q: "What is the founders price?",
    a: "It's the price early members pay for Helthy Pro, shown above next to the regular price. Your founders price is locked in for life.",
  },
  {
    q: "How do I cancel Helthy Pro?",
    a: "Cancel any time in Settings → Subscription in the app, or through the App Store or Google Play. You keep the free plan.",
  },
  {
    q: "Why does the app say Premium?",
    a: "Helthy Pro is called Premium inside the app. It's the same plan.",
  },
];

export default function PricingPage() {
  return (
    <SeoPage crumbs={[{ name: "Pricing", href: "/pricing" }]}>
      <PageHero
        title={
          <>
            Free forever. <span className="text-highlight">Pro</span> when you want the AI
          </>
        }
        lede="Track food and workouts for free, with no trial and no card. Helthy Pro adds the AI coach, unlimited AI logging and your full history."
      />

      <div className="mt-12">
        <PricingPlans />
      </div>

      <Section title="Free vs Pro, feature by feature">
        <CompareTable
          columns={["Feature", "Free", "Pro"]}
          rows={ROWS.map((r) => ({ label: r.label, values: [r.values[0], r.values[1]] }))}
        />
      </Section>

      <Section title="Pricing questions">
        <FaqList faqs={FAQS} />
      </Section>

      <Section title="See how Helthy compares">
        <LinkGrid
          links={[
            { href: "/compare/helthy-vs-myfitnesspal", title: "Helthy vs MyFitnessPal", body: "How the free tiers compare." },
            { href: "/compare/helthy-vs-cal-ai", title: "Helthy vs Cal AI", body: "Photo logging, with a free tier." },
            { href: "/compare/helthy-vs-hevy", title: "Helthy vs Hevy", body: "Workout logging plus nutrition." },
          ]}
        />
      </Section>

      <DownloadBanner title="Start free today" />
    </SeoPage>
  );
}
