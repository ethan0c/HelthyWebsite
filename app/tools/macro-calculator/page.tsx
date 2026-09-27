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
    a: "The most important part is enough protein, around 2.2 g per kg of bodyweight when cutting, to protect muscle. Beyond that, the carb and fat split matters far less than total calories, so choose the style you can stick to.",
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
        eyebrow="Free tool"
        title={
          <>
            Macro <span className="text-helthy-lemon">calculator</span>
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
            "Calories come from your TDEE (Mifflin-St Jeor or Katch-McArdle BMR multiplied by your activity level), adjusted for your goal: about 0.5 kg a week of fat loss, or a smaller surplus for muscle gain.",
            "Protein is set from bodyweight first: about 2.2 g per kg when losing fat, 1.8 g/kg at maintenance and 2.0 g/kg when building muscle, with 0.3 g/kg more on the high-protein style. These are the same targets the Helthy app uses.",
            "Fat takes roughly a quarter of calories (40% on low carb), never dropping below a healthy minimum, and carbohydrates fill the rest.",
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
