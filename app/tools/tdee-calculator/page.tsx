import Link from "next/link";
import type { Metadata } from "next";
import { SeoPage, PageHero, Section, Prose, FaqList, LinkGrid, DownloadBanner, seoMetadata } from "@/components/seo/SeoPage";
import { TdeeCalculator } from "@/components/tools/Calculators";

export const metadata: Metadata = seoMetadata({
  title: "Free TDEE Calculator: Maintenance & Weight-Loss Calories",
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
    a: "A formula gives you a starting estimate, not an exact calorie budget. Activity level, body composition and individual variation affect the result. Compare your logged intake and average weight over two to three weeks rather than judging a single weigh-in.",
  },
  {
    q: "Should I eat at my TDEE to lose weight?",
    a: "Eating at your actual TDEE roughly maintains weight. Fat loss requires an energy deficit, but a fixed daily deficit does not guarantee a particular weekly weight change. Start with a modest target and use your longer-term trend to assess it.",
  },
  {
    q: "Why is my TDEE different in other calculators?",
    a: "Different calculators use different BMR formulas and activity multipliers. If you enter your body fat percentage, this calculator switches to Katch-McArdle, which uses estimated lean mass. A guessed body fat percentage can make the result less useful; leave it blank if you do not have a reliable estimate.",
  },
];

export default function TdeePage() {
  return (
    <SeoPage
      closing={<DownloadBanner title="Turn your TDEE into a daily plan" />}
      crumbs={[
        { name: "Free tools", href: "/tools" },
        { name: "TDEE calculator", href: "/tools/tdee-calculator" },
      ]}
    >
      <PageHero
        title={
          <>
            TDEE <span className="text-highlight">calculator</span>
          </>
        }
        lede="Estimate your maintenance calories, BMR and starting targets for fat loss or muscle gain. Free, with lb/ft and kg/cm units. No signup required."
      />

      <div className="mt-10">
        <TdeeCalculator />
      </div>

      <p className="mt-4 max-w-3xl text-[14px] leading-6 text-fg-muted">
        For adults 18 and older. These estimates are not designed for pregnancy, breastfeeding or a prescribed medical diet.
        Created by <Link href="/about#editorial" className="underline underline-offset-4">the Helthy team</Link>.
      </p>

      <Section title="Which activity level should I choose?">
        <p className="max-w-3xl text-base leading-7 text-fg-muted">Count your whole day, including work and walking. Three short gym sessions do not automatically make a mostly seated week highly active. If you are between levels, start with the lower estimate and check your trend.</p>
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">Examples to help choose an activity level</caption>
            <thead><tr className="border-b border-line"><th scope="col" className="p-4">Level</th><th scope="col" className="p-4">A typical week</th></tr></thead>
            <tbody className="divide-y divide-line text-fg-muted">
              {[
                ["Sedentary", "Mostly seated work, little walking and little planned exercise."],
                ["Light", "Mostly seated work with some walking and 1–3 exercise sessions."],
                ["Moderate", "Regular movement through the day and 3–5 exercise sessions."],
                ["Very active", "A physically demanding day plus hard training most days."],
                ["Athlete", "Sustained high training volume, such as two demanding sessions a day."],
              ].map(([level, example]) => <tr key={level}><th scope="row" className="p-4 font-medium text-fg">{level}</th><td className="p-4">{example}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="How this TDEE calculator works" tone="light">
        <Prose
          paragraphs={[
            "First it estimates your BMR, the calories you burn at complete rest. By default it uses the Mifflin-St Jeor equation, which is based on weight, height, age and sex. If you enter your body fat percentage it uses Katch-McArdle instead, which works from lean body mass.",
            "Your chosen activity level adds an allowance for movement and exercise to estimate daily energy expenditure. That allowance is the least personal part of the calculation: two people with the same gym schedule can have very different activity outside it.",
            "The goal results give a starting deficit for fat loss or surplus for muscle gain. A lower intake limit is a calculator guardrail, not proof that a target is appropriate for every person.",
          ]}
        />
      </Section>

      <section id="check-your-estimate" className="mt-20 scroll-mt-24 md:mt-24">
        <h2 className="text-display-md text-fg">Check your estimate against real life</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-7 text-fg-muted">
          <p>For example, a 30-year-old man weighing 80 kg (176 lb), at 180 cm (5 ft 11 in) and a moderate activity level gets about 2,760 maintenance calories a day. That is an illustrative estimate, not a recommendation for everyone at that weight.</p>
          <p>Log food consistently and compare weekly average weights for two to three weeks. If your average weight stays roughly stable, your average logged intake is a useful maintenance reference. Water retention, menstrual cycles, changes in training and incomplete food logs can obscure the trend.</p>
          <p>Avoid adding workout calories to this estimate again: your activity level already includes exercise. Read <Link href="/blog/how-many-calories-to-lose-weight" className="underline underline-offset-4">how to set a calorie target for weight loss</Link> for the next step.</p>
        </div>
      </section>

      <Section title="Sources and limits">
        <ul className="max-w-3xl list-disc space-y-4 pl-5 text-base leading-7 text-fg-muted">
          <li><a className="underline underline-offset-4" href="https://pubmed.ncbi.nlm.nih.gov/2305711/">Mifflin and colleagues, 1990</a> developed their resting-energy equation from 498 healthy adults aged 19–78. It predicts resting expenditure, not an individual&apos;s measured daily activity.</li>
          <li>The <a className="underline underline-offset-4" href="https://www.niddk.nih.gov/bwp">NIDDK Body Weight Planner</a> models how calorie needs change over time. It is useful when planning a weight-change timeline; this calculator gives a current starting estimate.</li>
        </ul>
      </Section>

      <Section
        title="Get a TDEE that learns from you"
        intro="A calculator gives you a starting point. The Helthy app keeps your TDEE up to date from your real steps and workouts, free. Premium adds Smart Calories, an adaptive TDEE that learns from your weight trend and intake."
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
    </SeoPage>
  );
}
