import type { Metadata } from "next";
import { SeoPage, PageHero, Section, Prose, FaqList, LinkGrid, DownloadBanner, seoMetadata } from "@/components/seo/SeoPage";
import { TdeeCalculator } from "@/components/tools/Calculators";

export const metadata: Metadata = seoMetadata({
  title: "TDEE Calculator: How Many Calories Do I Burn a Day?",
  description:
    "Free TDEE calculator. Work out your BMR and total daily energy expenditure with Mifflin-St Jeor or Katch-McArdle, plus calorie targets to lose fat, maintain or build muscle.",
  path: "/tools/tdee-calculator",
});

const FAQS = [
  {
    q: "What is TDEE?",
    a: "TDEE (total daily energy expenditure) is the number of calories you burn in a day. It is your BMR, the energy to keep you alive at rest, plus everyday movement, exercise and the energy used to digest food.",
  },
  {
    q: "How accurate is a TDEE calculator?",
    a: "Any formula is an estimate, typically within about 10% for most people. The most accurate TDEE comes from your own data: track your intake and weight for two to three weeks and see what intake keeps your weight stable.",
  },
  {
    q: "Should I eat at my TDEE to lose weight?",
    a: "No. Eating at your TDEE maintains your weight. To lose fat you eat below it; a deficit of about 550 calories a day works out to roughly 0.5 kg (1.1 lb) a week.",
  },
  {
    q: "Why is my TDEE different in other calculators?",
    a: "Different calculators use different BMR formulas and activity multipliers. If you enter your body fat percentage, this calculator switches to Katch-McArdle, which accounts for lean mass and is usually more accurate for lean or very muscular people.",
  },
];

export default function TdeePage() {
  return (
    <SeoPage
      crumbs={[
        { name: "Free tools", href: "/tools" },
        { name: "TDEE calculator", href: "/tools/tdee-calculator" },
      ]}
    >
      <PageHero
        title={
          <>
            TDEE <span className="text-accent-ink">calculator</span>
          </>
        }
        lede="Find out how many calories you burn each day, and how much to eat to lose fat, maintain or build muscle."
      />

      <div className="mt-10">
        <TdeeCalculator />
      </div>

      <Section title="How this TDEE calculator works">
        <Prose
          paragraphs={[
            "First it estimates your BMR, the calories you burn at complete rest. By default it uses the Mifflin-St Jeor equation, which is based on weight, height, age and sex. If you enter your body fat percentage it uses Katch-McArdle instead, which works from lean body mass.",
            "It then multiplies your BMR by an activity factor, from 1.2 for a desk job with little exercise up to 1.9 for athletes, to estimate your total daily energy expenditure.",
            "The calorie targets are 20% below your TDEE to lose fat (never more than 500 calories a day), and 10% above it to build muscle. Fat-loss targets aren't set below 1,500 calories for men or 1,200 for women.",
          ]}
        />
      </Section>

      <Section
        title="Get a TDEE that learns from you"
        intro="A calculator gives you a starting point. The Helthy app keeps your TDEE up to date from your real steps and workouts, free. Pro adds Smart Calories, an adaptive TDEE that learns from your weight trend and intake."
      />

      <Section title="TDEE questions">
        <FaqList faqs={FAQS} />
      </Section>

      <Section title="Related tools">
        <LinkGrid
          links={[
            { href: "/tools/macro-calculator", title: "Macro calculator", body: "Split your calories into protein, carbs and fat." },
            { href: "/tools/protein-calculator", title: "Protein calculator", body: "How much protein you need each day." },
            { href: "/calorie-tracker", title: "Free calorie tracker", body: "Hit your new target every day." },
          ]}
        />
      </Section>

      <DownloadBanner title="Turn your TDEE into a daily plan" />
    </SeoPage>
  );
}
