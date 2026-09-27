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
  title: "Free Workout Tracker & Gym Log App",
  description:
    "Log every set, rep and weight across 1,500 exercises. Helthy is a free workout tracker with automatic PR detection, an Apple Watch app and an AI coach that builds your routine.",
  path: "/workout-tracker",
});

const FAQS = [
  {
    q: "Is the Helthy workout tracker free?",
    a: `Yes. Unlimited workout logging, the 1,500-exercise library and automatic PRs are free forever, and you can keep up to 4 saved workouts. Helthy Pro ($${PRO_PRICE.monthly}/month or $${PRO_PRICE.yearly}/year) adds unlimited saved workouts, full history, AI-generated routines and the workout coach.`,
  },
  {
    q: "Can I track cardio as well as weights?",
    a: "Yes. Log strength sets with weight and reps, bodyweight movements, and cardio sessions with duration, distance and calories.",
  },
  {
    q: "Does Helthy track personal records?",
    a: "Automatically. Helthy tracks max weight, max reps and max volume for every exercise, and highlights any new record when you finish a session.",
  },
  {
    q: "Can Helthy build a workout plan for me?",
    a: "With Helthy Pro, tell the AI your goal, experience and schedule and it builds a structured routine you can start logging right away. You can edit any day or exercise.",
  },
  {
    q: "Does Helthy work on Apple Watch?",
    a: "Yes. Helthy has its own Apple Watch app: start and control a workout from your wrist, and sets you log there sync to your phone live.",
  },
  {
    q: "Does it work without signal in the gym?",
    a: "Yes. Workout logging works fully offline and syncs automatically when you're back online.",
  },
  {
    q: "Why track workouts and food in the same app?",
    a: "Progress in the gym depends on what you eat and how you recover. When your lifts and your nutrition live in one place, Helthy's coach can tell you whether a stalled bench is a programming problem or a protein problem.",
  },
];

export default function WorkoutTrackerPage() {
  return (
    <SeoPage crumbs={[{ name: "Workout tracker", href: "/workout-tracker" }]}>
      <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <PageHero
          eyebrow="Workout tracker"
          title={
            <>
              The free workout tracker for people who want to{" "}
              <span className="text-helthy-lemon">progress</span>.
            </>
          }
          lede="Log every set, rep and weight in seconds, see your PRs as they happen, and know exactly what to lift next time. 1,500 exercises and unlimited workouts, free."
        >
          <StoreButtons />
        </PageHero>
        <div className="flex justify-center md:justify-end">
          <Screenshot
            src="/phones/step-2/workout-log.png"
            alt="Helthy workout log showing sets, reps and weight for an exercise"
            width={1320}
            height={2166}
            priority
          />
        </div>
      </div>

      <Section
        title="A gym log that keeps up with you"
        intro="Between sets you have about ten seconds of attention. Helthy is built so logging fits inside them."
      >
        <FeatureGrid
          items={[
            {
              title: "1,500 exercises",
              body: "Barbell, dumbbell, machine, cable, bodyweight, cardio and more, each with how-to and target muscles.",
            },
            {
              title: "Sets, reps and weight",
              body: "Log a set in a couple of taps. Your last session's numbers are right there to beat.",
            },
            {
              title: "Automatic PRs",
              body: "Helthy spots every personal record and celebrates it, so progress is impossible to miss.",
            },
            {
              title: "Apple Watch app",
              body: "Start a workout and log sets from your wrist. Everything syncs to your phone live.",
            },
            {
              title: "AI-built routines",
              body: "Get a structured plan for your goal, level and schedule, then start logging right away.",
              pro: true,
            },
            {
              title: "Coaching between sessions",
              body: "Ask \"should I push squats today?\" and get an answer from your recent sessions, PRs and food.",
              pro: true,
            },
          ]}
        />
      </Section>

      <div className="mt-20 grid items-center gap-12 md:grid-cols-[1fr_1.3fr]">
        <div className="order-2 flex justify-center md:order-1 md:justify-start">
          <Screenshot
            src="/phones/exercise-info-screen.png"
            alt="Helthy exercise detail screen with form tips and history"
            width={1328}
            height={2707}
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-display-md text-white">Progressive overload, made obvious</h2>
          <div className="mt-6">
            <Prose
              paragraphs={[
                "Muscle and strength come from doing a little more over time: another rep, a few more pounds, one more set. The problem is remembering what you did last week.",
                "Helthy shows your previous numbers as you log and flags new records automatically, and every exercise has its own how-to and target muscles, with form tips on popular lifts. You walk into every session knowing the target.",
              ]}
            />
          </div>
        </div>
      </div>

      <Section title="Start tracking your workouts">
        <Steps
          items={[
            {
              title: "Pick or build a routine",
              body: "Save your own workout, start an empty one, or have the AI build a full program (Pro).",
            },
            {
              title: "Log as you lift",
              body: "Tap in weight and reps after each set. Rest, repeat. It works offline.",
            },
            {
              title: "Beat last time",
              body: "Check your records, beat last week's numbers, and let progress compound.",
            },
          ]}
        />
      </Section>

      <Section title="Workout tracker questions">
        <FaqList faqs={FAQS} />
      </Section>

      <Section title="Keep exploring">
        <LinkGrid
          links={[
            { href: "/exercises", title: "Exercise guides", body: "Form tips and strength standards for 45 lifts." },
            { href: "/tools/one-rep-max-calculator", title: "One-rep max calculator", body: "Estimate your 1RM from any set." },
            { href: "/compare/helthy-vs-hevy", title: "Helthy vs Hevy", body: "Two free workout trackers compared." },
            { href: "/compare/helthy-vs-strong", title: "Helthy vs Strong", body: "What you get without paying." },
            { href: "/calorie-tracker", title: "Calorie tracker", body: "Fuel your training in the same app." },
            { href: "/ai-fitness-coach", title: "AI fitness coach", body: "A coach that reads your logs." },
          ]}
        />
      </Section>

      <DownloadBanner title="Log your next workout free" />
    </SeoPage>
  );
}
