import type { Metadata } from "next";
import {
  SeoPage,
  PageHero,
  StoreButtons,
  Section,
  Prose,
  FeatureGrid,
  Steps,
  Screenshot,
  FaqList,
  LinkGrid,
  DownloadBanner,
  seoMetadata,
} from "@/components/seo/SeoPage";
import { PRO_PRICE } from "@/lib/site";

export const metadata: Metadata = seoMetadata({
  title: "Free Calorie Tracker App with AI Photo Logging",
  description:
    "Helthy is a free calorie and macro tracker. Search foods, scan barcodes, or snap a photo and let AI log the meal. Unlimited calorie and macro logging, free.",
  path: "/calorie-tracker",
});

const FAQS = [
  {
    q: "Is Helthy's calorie tracker really free?",
    a: `Yes. Food search, quick-add, calorie and macro tracking and nutrition goals are free with no limit and no trial. Free users also get 2 camera scans (photo, barcode or label), 2 voice logs and 2 typed descriptions a week. Helthy Pro ($${PRO_PRICE.monthly}/month or $${PRO_PRICE.yearly}/year) makes all of those unlimited and adds the AI coach.`,
  },
  {
    q: "How accurate is AI photo calorie counting?",
    a: "For most common meals, Helthy's photo logging lands within 5–10% of a carefully hand-logged entry. You see every item it detected and can adjust portions before you save, so you stay in control of the numbers.",
  },
  {
    q: "Does Helthy track macros as well as calories?",
    a: "Yes. Every entry records protein, carbs, fat and fiber, and you can see totals per meal and per day against your targets.",
  },
  {
    q: "How does Helthy set my calorie goal?",
    a: "During setup Helthy estimates your daily energy needs (TDEE) from your age, height, weight, activity and goal, then sets calorie and macro targets. With Pro, it recalculates your TDEE every week from your real data so targets stay accurate. Try the free TDEE calculator on this site to see the math.",
  },
  {
    q: "Can I log food offline?",
    a: "Yes. You can keep logging without a connection, and everything syncs automatically once you're back online. AI photo and voice logging need a connection.",
  },
  {
    q: "Does it sync with Apple Health and Google Health Connect?",
    a: "Yes. Free users sync steps and weight. Helthy Pro adds full two-way sync, including nutrition, workouts, heart rate and active energy.",
  },
];

export default function CalorieTrackerPage() {
  return (
    <SeoPage crumbs={[{ name: "Calorie tracker", href: "/calorie-tracker" }]}>
      <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <PageHero
          eyebrow="Calorie tracker"
          title={
            <>
              The free calorie tracker that logs a meal from a{" "}
              <span className="text-helthy-lemon">photo</span>.
            </>
          }
          lede="Count calories and macros without the homework. Search the food database, scan a barcode, or snap a picture and let AI break the plate down for you. Logging is free and unlimited, and you get free AI scans every week."
        >
          <StoreButtons />
        </PageHero>
        <div className="flex justify-center md:justify-end">
          <Screenshot
            src="/phones/ai-meal-scan.png"
            alt="Helthy AI meal scan identifying the foods on a plate and their calories and macros"
            width={1321}
            height={2572}
            priority
          />
        </div>
      </div>

      <Section
        title="Three ways to log, all in seconds"
        intro="Most people quit calorie counting because logging takes too long. Helthy gives you the fastest option for whatever you're eating."
      >
        <FeatureGrid
          items={[
            {
              title: "Snap a photo",
              body: "Point your camera at the plate. Helthy identifies each item, estimates portions and fills in calories and macros. 2 free scans a week, unlimited with Pro.",
            },
            {
              title: "Scan a barcode or label",
              body: "The same camera detects barcodes and nutrition labels as you aim. Scan several items, then log them all at once.",
            },
            {
              title: "Search, type or say it",
              body: "Search the food database free and unlimited, or just type or say \"chicken, rice and broccoli\" and AI logs it. Quick-add calories when you're in a hurry.",
            },
          ]}
        />
      </Section>

      <Section title="Everything a calorie counter should track">
        <FeatureGrid
          items={[
            {
              title: "Calories and macros",
              body: "Daily calories remaining plus protein, carbs, fat and fiber, per meal and per day.",
            },
            {
              title: "Goals that fit you",
              body: "Targets built from your TDEE and goal, whether that's losing fat, maintaining or building muscle.",
            },
            {
              title: "Weight trend",
              body: "Log weigh-ins and see a 7-day trend, so one salty dinner doesn't look like a failed week.",
            },
            {
              title: "Saved meals",
              body: "Copy a meal from yesterday or save your regulars, so repeat meals take one tap.",
            },
            {
              title: "Offline logging",
              body: "Log on a plane or in a basement gym. Everything syncs when you reconnect.",
            },
            {
              title: "AI coach that sees your food",
              body: "Ask \"am I eating enough protein on training days?\" and get an answer from your actual logs.",
              pro: true,
            },
          ]}
        />
      </Section>

      <Section title="How to start counting calories with Helthy">
        <Steps
          items={[
            {
              title: "Set your goal",
              body: "Tell Helthy about you and your goal. It works out your daily calories and macros in under two minutes.",
            },
            {
              title: "Log what you eat",
              body: "Photo, barcode, search or voice. Pick whatever is fastest for the meal in front of you.",
            },
            {
              title: "Watch the trend",
              body: "Check your weekly averages and weight trend, and adjust. With Pro, ask the AI coach what to change.",
            },
          ]}
        />
      </Section>

      <Section title="Why a calorie tracker works">
        <Prose
          paragraphs={[
            "Body weight follows energy balance over time: eat less than you burn and you lose weight, eat more and you gain. The hard part isn't the science, it's knowing what you actually eat. Studies of food diaries consistently find that people underestimate their intake when they guess, which is why tracking even for a few weeks changes results.",
            "A good calorie tracker makes the true number easy to see. Helthy's job is to get logging down to a few seconds per meal, so you keep doing it long enough for the habit and the results to stick.",
            "Because Helthy also tracks your workouts and weight, it can connect the dots most calorie apps can't: whether you're eating enough to recover from training, and whether your weight trend matches what your intake says it should be.",
          ]}
        />
      </Section>

      <Section title="Calorie tracker questions">
        <FaqList faqs={FAQS} />
      </Section>

      <Section title="Keep exploring">
        <LinkGrid
          links={[
            { href: "/tools/tdee-calculator", title: "TDEE calculator", body: "Find how many calories you burn a day." },
            { href: "/tools/macro-calculator", title: "Macro calculator", body: "Turn your calories into protein, carbs and fat." },
            { href: "/compare/helthy-vs-myfitnesspal", title: "Helthy vs MyFitnessPal", body: "How the free tiers compare." },
            { href: "/workout-tracker", title: "Workout tracker", body: "Log every lift in the same app." },
            { href: "/ai-fitness-coach", title: "AI fitness coach", body: "Coaching that reads your food and training." },
            { href: "/compare/helthy-vs-cal-ai", title: "Helthy vs Cal AI", body: "Photo logging, with a free tier." },
          ]}
        />
      </Section>

      <DownloadBanner title="Start tracking calories free" />
    </SeoPage>
  );
}
