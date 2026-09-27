import type { Metadata } from "next";
import { SeoPage, PageHero, Section, LinkGrid, DownloadBanner, seoMetadata } from "@/components/seo/SeoPage";
import { COMPARISONS } from "@/lib/content/comparisons";

export const metadata: Metadata = seoMetadata({
  title: "Helthy vs Other Fitness Apps",
  description:
    "Honest comparisons of Helthy with MyFitnessPal, Cal AI, Hevy and Strong: free tiers, pricing, AI features and workout tracking side by side.",
  path: "/compare",
});

export default function CompareIndexPage() {
  const link = (c: (typeof COMPARISONS)[number]) => ({
    href: `/compare/${c.slug}`,
    title: `Helthy vs ${c.competitor}`,
    body: c.description,
  });

  return (
    <SeoPage crumbs={[{ name: "Compare", href: "/compare" }]}>
      <PageHero
        eyebrow="Compare"
        title={
          <>
            How Helthy compares to the apps you <span className="text-helthy-lemon">already know</span>.
          </>
        }
        lede="Side-by-side comparisons with the most popular calorie counters and workout trackers, including where they beat us."
      />

      <Section title="Calorie trackers">
        <LinkGrid links={COMPARISONS.filter((c) => c.category === "nutrition").map(link)} />
      </Section>

      <Section title="Workout trackers">
        <LinkGrid links={COMPARISONS.filter((c) => c.category === "workout").map(link)} />
      </Section>

      <DownloadBanner />
    </SeoPage>
  );
}
