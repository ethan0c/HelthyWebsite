import type { Metadata } from "next";
import { SeoPage, PageHero, Section, Prose, FaqList, LinkGrid, DownloadBanner, seoMetadata } from "@/components/seo/SeoPage";
import { OneRepMaxCalculator } from "@/components/tools/Calculators";

export const metadata: Metadata = seoMetadata({
  title: "One-Rep Max Calculator (1RM) with Percentage Chart",
  description:
    "Free one-rep max calculator. Estimate your 1RM from any set of 1–12 reps using the Epley and Brzycki formulas, with a training percentage chart.",
  path: "/tools/one-rep-max-calculator",
});

const FAQS = [
  {
    q: "What is a one-rep max?",
    a: "Your one-rep max (1RM) is the heaviest weight you can lift for a single rep with good form. Programs often prescribe weights as a percentage of it, such as 3 sets of 5 at 80%.",
  },
  {
    q: "How accurate is a 1RM calculator?",
    a: "Estimates are most accurate from heavy sets of about 3–8 reps taken close to failure. Above 10–12 reps the formulas drift, because muscular endurance varies a lot between people.",
  },
  {
    q: "Which 1RM formula is best?",
    a: "Epley and Brzycki are the most widely used and give very similar answers at low reps. This calculator averages the two.",
  },
  {
    q: "Should I test my real one-rep max?",
    a: "You don't need to. Testing a true max carries more risk and fatigue, and an estimate from a hard set of 3–5 is accurate enough to program from.",
  },
];

export default function OneRepMaxPage() {
  return (
    <SeoPage
      closing={<DownloadBanner title="Log your next PR in Helthy" />}
      crumbs={[
        { name: "Free tools", href: "/tools" },
        { name: "One-rep max calculator", href: "/tools/one-rep-max-calculator" },
      ]}
    >
      <PageHero
        title={
          <>
            One-rep max <span className="text-highlight">calculator</span>
          </>
        }
        lede="Enter a set you've done and get your estimated one-rep max, plus the weights to use at common training percentages."
      />

      <div className="mt-10">
        <OneRepMaxCalculator />
      </div>

      <Section title="How your 1RM is estimated">
        <Prose
          paragraphs={[
            "The calculator averages two standard formulas. Epley: 1RM = weight × (1 + reps ÷ 30). Brzycki: 1RM = weight × 36 ÷ (37 − reps).",
            "Use your hardest recent set, ideally between 3 and 8 reps. The percentage chart lets you plan sessions: roughly 85–95% for heavy strength work, 70–80% for classic hypertrophy sets, and 60% for technique or warm-ups.",
          ]}
        />
      </Section>

      <Section
        title="Track your PRs automatically"
        intro="Helthy logs every set and automatically detects new records for max weight, max reps and max volume on every exercise, so you always know when you've got stronger."
      />

      <Section title="One-rep max questions">
        <FaqList faqs={FAQS} />
      </Section>

      <Section title="Related">
        <LinkGrid
          links={[
            { href: "/exercises/barbell-bench-press", title: "Bench press guide", body: "Form tips and strength standards." },
            { href: "/exercises/barbell-squat", title: "Squat guide", body: "Form tips and strength standards." },
            { href: "/workout-tracker", title: "Workout tracker", body: "Log sets and see every PR." },
          ]}
        />
      </Section>
    </SeoPage>
  );
}
