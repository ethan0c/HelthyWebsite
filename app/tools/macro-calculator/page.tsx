import type { Metadata } from "next";
import { SeoPage, PageHero, Section, Prose, FaqList, LinkGrid, DownloadBanner, seoMetadata } from "@/components/seo/SeoPage";
import { MacroCalculator } from "@/components/tools/Calculators";

export const metadata: Metadata = seoMetadata({
  title: "Macro Calculator: Protein, Carbs and Fat for Your Goal",
  description:
    "Free macro calculator for fat loss, maintenance or muscle gain. Get daily calories plus protein, carb and fat grams, with balanced, low-carb and high-protein options.",
  path: "/tools/macro-calculator",
});

const FAQS = [
  {
    q: "What are macros?",
    a: "Macronutrients are the three nutrients that provide calories: protein and carbohydrates (4 calories per gram) and fat (9 calories per gram). Tracking them, not just calories, shapes whether weight you lose or gain is fat or muscle.",
  },
  {
    q: "What macro split is best for fat loss?",
    a: "The most important part is enough protein, around 0.85 g per lb of bodyweight when cutting, to protect muscle. Beyond that, the carb and fat split matters far less than total calories, so choose the style you can stick to.",
  },
  {
    q: "Do I need to hit my macros exactly?",
    a: "No. Landing within about 10 grams of protein and roughly on your calories most days is plenty. Consistency over weeks beats precision on any single day.",
  },
  {
    q: "Is low carb better than balanced?",
    a: "For fat loss, studies comparing diets with equal protein and calories find similar results. Low carb suits some people's appetite; others train better with more carbs.",
  },
];

export default function MacroPage() {
  return (
    <SeoPage
      crumbs={[
        { name: "Free tools", href: "/tools" },
        { name: "Macro calculator", href: "/tools/macro-calculator" },
      ]}
    >
      <PageHero
        title={
          <>
            Macro <span className="text-highlight">calculator</span>
          </>
        }
        lede="Get your daily calories and exactly how many grams of protein, carbs and fat to eat for your goal."
      />

      <div className="mt-10">
        <MacroCalculator />
      </div>

      <Section title="How your macros are calculated">
        <Prose
          paragraphs={[
            "Calories come from your TDEE (Mifflin-St Jeor or Katch-McArdle BMR multiplied by your activity level), adjusted for your goal: 20% below it to lose fat (up to 500 calories a day) or 10% above it to build muscle.",
            "Protein is set from bodyweight first: 0.85 g per lb (about 1.9 g/kg) when losing fat and 0.8 g per lb (about 1.8 g/kg) otherwise, plus 0.3 g/kg on the high-protein style.",
            "The calories left after protein are split between carbs and fat: 55/45 on balanced, 30/70 on low carb and 50/50 on high protein, with minimums of 100 g of carbs and 40 g of fat (35 g for women).",
          ]}
        />
      </Section>

      <Section
        title="Track your macros automatically"
        intro="Helthy sets these targets for you and tracks protein, carbs, fat and fiber every time you log, whether you search, scan a barcode or snap a photo of your plate."
      />

      <Section title="Macro questions">
        <FaqList faqs={FAQS} />
      </Section>

      <Section title="Related tools">
        <LinkGrid
          links={[
            { href: "/tools/tdee-calculator", title: "TDEE calculator", body: "See your daily calorie burn." },
            { href: "/tools/protein-calculator", title: "Protein calculator", body: "Your daily and per-meal protein." },
            { href: "/calorie-tracker", title: "Macro tracker app", body: "Log meals in seconds." },
          ]}
        />
      </Section>

      <DownloadBanner title="Hit your macros without the math" />
    </SeoPage>
  );
}
