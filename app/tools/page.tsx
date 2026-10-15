import type { Metadata } from "next";
import { SeoPage, PageHero, LinkGrid, DownloadBanner, seoMetadata } from "@/components/seo/SeoPage";

export const metadata: Metadata = seoMetadata({
  title: "Free Fitness Calculators: TDEE, Macros, Protein and 1RM",
  description:
    "Free fitness and nutrition calculators from Helthy: TDEE, macros, protein intake and one-rep max. No sign-up needed.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <SeoPage
      closing={<DownloadBanner tone="dark" />}
      crumbs={[{ name: "Free tools", href: "/tools" }]}
      tone="light"
    >
      <PageHero
        title={
          <>
            Fitness calculators, <span className="text-highlight">free</span>
          </>
        }
        lede="Free, private and no sign-up. Work out your calories, macros, protein and strength numbers in seconds."
      />
      <div className="mt-12">
        <LinkGrid
          columns={2}
          links={[
            { href: "/tools/tdee-calculator", title: "TDEE calculator", body: "How many calories you burn a day, and what to eat for your goal." },
            { href: "/tools/macro-calculator", title: "Macro calculator", body: "Daily protein, carbs and fat for fat loss, maintenance or muscle gain." },
            { href: "/tools/protein-calculator", title: "Protein calculator", body: "How much protein you need a day and per meal." },
            { href: "/tools/one-rep-max-calculator", title: "One-rep max calculator", body: "Estimate your 1RM from any set, with a percentage chart." },
          ]}
        />
      </div>
    </SeoPage>
  );
}
