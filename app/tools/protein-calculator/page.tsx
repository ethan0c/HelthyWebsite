import Link from "next/link";
import { proteinGrams } from "@/lib/calc";
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
    a: "Research on resistance training generally supports around 1.6–2.2 g of protein per kg of bodyweight a day (about 0.7–1 g per lb). This calculator uses 0.8 g per lb (about 1.8 g/kg) when you're building muscle.",
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
      closing={<DownloadBanner title="See your protein every time you log" />}
      crumbs={[
        { name: "Free tools", href: "/tools" },
        { name: "Protein calculator", href: "/tools/protein-calculator" },
      ]}
    >
      <PageHero
        title={
          <>
            Protein <span className="text-highlight">calculator</span>
          </>
        }
        lede="Work out how much protein to eat each day for your goal, and how to split it across your meals."
      />

      <div className="mt-10">
        <ProteinCalculator />
      </div>

      <Section title="How much protein you need" tone="light">
        <Prose
          paragraphs={[
            "Protein targets here are based on bodyweight: 0.85 g per lb (about 1.9 g/kg) when losing fat, and 0.8 g per lb (about 1.8 g/kg) to maintain or build muscle. They sit within the range sports nutrition research supports for people who train.",
          ]}
        />
      </Section>

      <Section title="Protein targets by bodyweight">
        <p className="max-w-3xl text-base leading-7 text-fg-muted">These examples use the same targets as the calculator for adults who strength train. The per-meal number divides the daily total across four meals; it is not an absorption limit.</p>
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">Example daily protein targets in grams</caption>
            <thead><tr className="border-b border-line">{["Weight", "Maintain / build", "Lose fat", "Per meal (build, 4 meals)"].map(label => <th scope="col" className="p-4" key={label}>{label}</th>)}</tr></thead>
            <tbody className="divide-y divide-line text-fg-muted">{[60, 70, 80, 90, 100].map(kg => <tr key={kg}><th scope="row" className="p-4 font-medium text-fg">{kg} kg / {Math.round(kg * 2.20462)} lb</th><td className="p-4">{Math.round(proteinGrams(kg, "gain"))} g</td><td className="p-4">{Math.round(proteinGrams(kg, "lose"))} g</td><td className="p-4">{Math.round(proteinGrams(kg, "gain") / 4)} g</td></tr>)}</tbody>
          </table>
        </div>
      </Section>

      <Section title="Evidence behind the targets">
        <p className="max-w-3xl text-base leading-7 text-fg-muted">
          <a href="https://pubmed.ncbi.nlm.nih.gov/28698222/" className="underline underline-offset-4">Morton and colleagues&apos; 2018 meta-analysis</a> combined 49 resistance-training studies with 1,863 participants. Average gains in fat-free mass did not increase further beyond roughly 1.6 g/kg/day. That finding is not an individual ceiling or a prescription for people with medical conditions.
          Our <Link href="/blog/how-much-protein-to-build-muscle" className="underline underline-offset-4">guide to protein for muscle growth</Link> explains the range, meal examples and limitations.
        </p>
        <p className="mt-4 text-[14px] text-fg-muted">Created by <Link href="/about#editorial" className="underline underline-offset-4">the Helthy team</Link>. Intended for adults who train.</p>
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
    </SeoPage>
  );
}
