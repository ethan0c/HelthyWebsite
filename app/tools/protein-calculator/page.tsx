import type { Metadata } from "next";
import { SeoPage, PageHero, Section, Prose, FaqList, LinkGrid, DownloadBanner, seoMetadata } from "@/components/seo/SeoPage";
import { ProteinCalculator } from "@/components/tools/Calculators";

export const metadata: Metadata = seoMetadata({
  title: "Protein Calculator: How Much Protein Do I Need?",
  description:
    "Free protein calculator. Find how many grams of protein you need a day to lose fat, maintain or build muscle, and how much to eat per meal.",
  path: "/tools/protein-calculator",
});

const FAQS = [
  {
    q: "How much protein do I need to build muscle?",
    a: "Research on resistance training generally supports around 1.6–2.2 g of protein per kg of bodyweight a day (about 0.7–1 g per lb). This calculator uses 0.8 g per lb (about 1.8 g/kg) when you're building muscle, the same target the Helthy app sets.",
  },
  {
    q: "Why is protein higher when losing fat?",
    a: "In a calorie deficit your body is more likely to break down muscle for energy. Higher protein, around 0.85 g per lb (about 1.9 g/kg), together with strength training helps you keep muscle while you lose fat. It also keeps you fuller.",
  },
  {
    q: "How much protein can I absorb in one meal?",
    a: "Your body absorbs almost all the protein you eat; the question is how much is used for muscle building at once. Spreading intake over 3–5 meals of roughly 25–50 g each is a practical approach for most people.",
  },
  {
    q: "Is too much protein bad for you?",
    a: "For healthy adults, intakes in this range are considered safe. If you have kidney disease or another medical condition, check with your doctor before increasing protein.",
  },
];

export default function ProteinPage() {
  return (
    <SeoPage
      crumbs={[
        { name: "Free tools", href: "/tools" },
        { name: "Protein calculator", href: "/tools/protein-calculator" },
      ]}
    >
      <PageHero
        title={
          <>
            Protein <span className="text-helthy-lemon">calculator</span>
          </>
        }
        lede="Work out how much protein to eat each day for your goal, and how to split it across your meals."
      />

      <div className="mt-10">
        <ProteinCalculator />
      </div>

      <Section title="How much protein you need">
        <Prose
          paragraphs={[
            "Protein targets here are based on bodyweight: 0.85 g per lb (about 1.9 g/kg) when losing fat, and 0.8 g per lb (about 1.8 g/kg) to maintain or build muscle. They're the same targets the Helthy app sets, and they sit within the range sports nutrition research supports for people who train.",
          ]}
        />
      </Section>

      <Section title="Protein questions">
        <FaqList faqs={FAQS} />
      </Section>

      <Section title="Related tools">
        <LinkGrid
          links={[
            { href: "/tools/macro-calculator", title: "Macro calculator", body: "Protein, carbs and fat together." },
            { href: "/tools/tdee-calculator", title: "TDEE calculator", body: "Your daily calorie burn." },
            { href: "/ai-fitness-coach", title: "AI fitness coach", body: "Ask if you're hitting your protein." },
          ]}
        />
      </Section>

      <DownloadBanner title="See your protein every time you log" />
    </SeoPage>
  );
}
