import type { Metadata } from "next";
import Image from "next/image";
import FeatureBand from "@/components/sections/FeatureBand";
import WeeklySection from "@/components/sections/WeeklySection";
import CTASection from "@/components/sections/CTASection";
import SiteFooter from "@/components/sections/SiteFooter";
import SectionHeading from "@/components/ui/SectionHeading";
import PhoneFrame from "@/components/ui/PhoneFrame";
import DownloadButton from "@/components/ui/DownloadButton";
import { FeatureGrid } from "@/components/seo/SeoPage";

export const metadata: Metadata = {
  title: "Features · AI Food Logging, Workout Tracking & Coaching",
  description:
    "Everything Helthy does: snap a photo to log meals, track every lift across 1,500 exercises, plot your weight, and get coached by AI that connects nutrition, training, and recovery.",
  alternates: {
    canonical: "https://helthy.app/features",
  },
  openGraph: {
    title: "Helthy Features · AI Food Logging, Workout Tracking & Coaching",
    description:
      "Snap a photo to log meals, track every lift across 1,500 exercises, plot your weight, and get coached by AI. Free on iOS & Android.",
    url: "https://helthy.app/features",
    type: "website",
  },
};

const MORE = [
  { title: "Barcode and label scans", body: "Scan a packaged food or point the camera at a nutrition label." },
  { title: "Voice and typed logging", body: "Say or type what you ate and it's broken down into calories and macros." },
  { title: "Custom foods and meals", body: "Save your own foods, meals and workouts so logging them again takes one tap." },
  { title: "Apple Watch", body: "Log cardio and food by voice from your wrist. Premium adds live strength workouts." },
  { title: "Health sync", body: "Connects with Apple Health and Google Health Connect." },
  { title: "Smart Calories", body: "Your calorie target learns from your weight trend, so it keeps up as you change.", pro: true },
  { title: "AI-built routines", body: "Ask for a routine and get a full plan built around your goal.", pro: true },
  { title: "Body fat estimate", body: "An AI estimate of your body fat from progress photos.", pro: true },
  { title: "Data export", body: "Download everything you've logged as a ZIP or CSV file.", pro: true },
];

/**
 * Bands alternate dark / light (see DESIGN.md), same rhythm as the homepage,
 * but none of the homepage's sections or screenshots are reused here: each
 * band has its own screen, so the two pages don't repeat each other. Helthy
 * Weekly's section lives here rather than on the homepage.
 */
export default function FeaturesPage() {
  return (
    <>
      <main className="relative bg-canvas text-fg">
        {/* dark */}
        <section className="pb-20 pt-32 md:pb-28 lg:pt-40">
          <div className="container-page">
            <div className="max-w-3xl">
              <h1 className="text-display-xl text-fg">
                Everything you track, in <span className="text-highlight">one app</span>
              </h1>
              <p className="mt-6 max-w-xl text-lede">
                Calories, macros, workouts, weight and an AI coach that sees all of it. Free on iOS and
                Android, with Helthy Premium when you want the AI extras.
              </p>
              <div className="mt-8">
                <DownloadButton />
              </div>
            </div>
          </div>
        </section>

        <FeatureBand
          id="today"
          tone="light"
          eyebrow="Today"
          title="Your whole day on"
          accent="one screen"
          lede="Open the app and you know where you stand, before you log anything."
          points={[
            "Calories left for the day, with eaten against your target",
            "Protein, active days this week and steps, each one tap from the details",
            "A streak and a dot for every day you showed up this week",
          ]}
          visual={
            <PhoneFrame
              src="/phones/home-today.png"
              alt="Helthy home screen showing 214 calories left, 79 of 135 g protein, 1 of 5 active days and 2,277 steps"
              width={1320}
              height={2208}
              statusBar="crop"
              className="w-[min(280px,70vw)]"
            />
          }
        />

        <FeatureBand
          id="photo-logging"
          tone="dark"
          reverse
          eyebrow="AI food logging"
          title="Log a meal from a"
          accent="photo"
          lede="Point the camera at your plate. Helthy names each item, estimates the portion and fills in the calories and macros."
          points={[
            "Every item is listed separately, with its own calories, protein, carbs and fat",
            "Check and edit anything before you save it",
            "Or scan a barcode or label, or just say or type what you ate",
          ]}
          footnote="2 AI scans a week are free. Unlimited with Premium."
          visual={
            <PhoneFrame
              src="/phones/ai-meal-scan.png"
              alt="Helthy AI photo scan of a pancake breakfast, split into pancakes, blueberries and honey with calories and macros for each"
              width={1321}
              height={2572}
              className="w-[min(280px,70vw)]"
            />
          }
        />

        <FeatureBand
          id="exercise-library"
          tone="light"
          eyebrow="Exercise library"
          title="1,500 exercises, with"
          accent="form tips"
          lede="Search by name and every result tells you the equipment and the muscle it works."
          points={[
            "Barbell, dumbbell, Smith machine and bodyweight versions of the lifts you know",
            "Step-by-step how-to for each exercise, with the muscles it targets",
            "Can't find one? Add your own",
          ]}
          visual={
            <PhoneFrame
              src="/phones/exercise-library-screen.png"
              alt="Helthy exercise library searched for bench, listing barbell, dumbbell, incline and smith machine bench press variations"
              width={1321}
              height={2659}
              statusBar="pad"
              className="w-[min(280px,70vw)]"
            />
          }
        />

        <FeatureBand
          id="workout-logging"
          tone="dark"
          reverse
          eyebrow="Workouts"
          title="Rest timers that"
          accent="start themselves"
          lede="Log a set and the rest timer is already running, so you only touch your phone to log the next one."
          points={[
            "Reps and weight with plus and minus buttons, no keyboard needed",
            "Tick each set off as you finish it",
            "Personal records spotted automatically when you finish",
          ]}
          footnote="Unlimited workout logging on the free plan."
          visual={
            <PhoneFrame
              src="/phones/new-workout-visible-rest-timer.png"
              alt="Helthy workout in progress: incline dumbbell bench press with three sets logged and a rest timer counting down"
              width={1320}
              height={2868}
              statusBar="crop"
              className="w-[min(280px,70vw)]"
            />
          }
        />

        <FeatureBand
          id="coach"
          tone="light"
          eyebrow="AI coach"
          title="A coach that reads"
          accent="your numbers"
          lede="Insights come from what you actually logged, and they connect your eating to your training."
          points={[
            "Flags what needs attention, like eating well under your calorie target",
            "Links problems across your data: missed workouts next to a weight plateau",
            "Ask it anything about your meals, lifts or weight trend",
          ]}
          footnote="AI coach chat is part of Helthy Premium."
          visual={
            <Image
              src="/phones/see-insights.png"
              alt="Helthy insights: a needs-attention card on low calorie intake and a card connecting missed workouts to a weight plateau"
              width={1243}
              height={1529}
              sizes="(min-width: 768px) 380px, 85vw"
              className="h-auto w-[min(380px,85vw)]"
            />
          }
        />

        <WeeklySection /> {/* dark */}

        {/* light */}
        <FeatureBand
          id="progress"
          tone="light"
          eyebrow="Progress"
          title="See where you're"
          accent="heading"
          lede="Every weigh-in, meal and workout adds up to a picture of your progress, not just today's number."
          points={[
            "Weight chart by week, month or six months, with every entry in your history",
            "Calories eaten, burned and left for the day, with a breakdown of your burn",
            "Streaks and achievements that reward showing up",
          ]}
          footnote="Meal and workout history covers the last 7 days on the free plan, and everything with Premium."
          visual={
            <PhoneFrame
              src="/phones/calories.png"
              alt="Helthy calories screen showing calories consumed, left and burned, a weekly chart and a burn breakdown"
              width={1320}
              height={2868}
              className="w-[min(280px,70vw)]"
            />
          }
        />

        {/* dark */}
        <section id="more" className="section">
          <div className="container-page">
            <SectionHeading
              eyebrow="And more"
              title="The details that"
              italicTail="add up"
              subtitle="Smaller features that make logging faster and your numbers more useful."
            />
            <FeatureGrid items={MORE} />
          </div>
        </section>

        <CTASection /> {/* light */}
      </main>
      <SiteFooter />
    </>
  );
}
