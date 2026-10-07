import type { Metadata } from "next";
import {
  SeoPage,
  PageHero,
  DownloadButton,
  Section,
  Prose,
  FeatureGrid,
  Steps,
  FaqList,
  LinkGrid,
  DownloadBanner,
  seoMetadata,
} from "@/components/seo/SeoPage";
import DeviceFrame from "@/components/ui/DeviceFrame";
import WatchScreen from "@/components/ui/WatchScreen";
import PhoneVideo from "@/components/ui/PhoneVideo";
import { PRO_PRICE } from "@/lib/site";

export const metadata: Metadata = seoMetadata({
  title: "Free Workout Tracker & Gym Log App",
  description:
    "Log every set, rep and weight across 1,500 exercises. Helthy is a free workout tracker with automatic PR detection, an Apple Watch app and an AI coach that builds your routine.",
  path: "/workout-tracker",
  image: "/videos/app/workout-log-poster.jpg",
});

const FAQS = [
  {
    q: "Is the Helthy workout tracker free?",
    a: `Yes. Unlimited workout logging, the 1,500-exercise library and automatic PRs are free forever, and you can keep up to 4 saved workouts. Helthy Premium ($${PRO_PRICE.monthly}/month or $${PRO_PRICE.yearly}/year) adds unlimited saved workouts, full history, AI-generated routines and the workout coach.`,
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
    a: "With Helthy Premium, tell the AI your goal, experience and schedule and it builds a structured routine you can start logging right away. You can edit any day or exercise.",
  },
  {
    q: "Does Helthy work on Apple Watch?",
    a: "Yes. Helthy has its own Apple Watch app. Track runs, walks, rides and HIIT with heart rate and calories, and log meals by voice. With Helthy Premium, the watch also follows your strength workout live, so you can complete sets and start rest timers from your wrist.",
  },
  {
    q: "Why track workouts and food in the same app?",
    a: "Progress in the gym depends on what you eat and how you recover. When your lifts and your nutrition live in one place, Helthy's coach can tell you whether a stalled bench is a programming problem or a protein problem.",
  },
];

export default function WorkoutTrackerPage() {
  return (
    <SeoPage
      closing={<DownloadBanner title="Log your next workout free" />}
      crumbs={[{ name: "Workout tracker", href: "/workout-tracker" }]}
    >
      <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <PageHero
          title={
            <>
              The free workout tracker for people who want to{" "}
              <span className="text-highlight">progress</span>
            </>
          }
          lede="Log every set, rep and weight in seconds, see your PRs as they happen, and know exactly what to lift next time. 1,500 exercises and unlimited workouts, free."
        >
          <DownloadButton />
        </PageHero>
        <div className="flex justify-center md:justify-end">
          <PhoneVideo
            src="/videos/app/workout-log.mp4"
            poster="/videos/app/workout-log-poster.jpg"
            label="Screen recording: the Exercise tab in Helthy, with the next session, training progress, personal records and a finished workout"
            className="w-[min(280px,70vw)]"
          />
        </div>
      </div>

      <Section
        tone="light"
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
              body: "Track cardio with heart rate from your wrist. With Premium, complete sets and start rests without touching your phone.",
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

      <Section title="Progressive overload, made obvious">
        <Prose
          paragraphs={[
            "Muscle and strength come from doing a little more over time: another rep, a few more pounds, one more set. The problem is remembering what you did last week.",
            "Helthy shows your previous numbers as you log and flags new records automatically, and every exercise has its own how-to and target muscles, with form tips on popular lifts. You walk into every session knowing the target.",
          ]}
        />
      </Section>

      <div className="mt-24 grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="flex flex-wrap items-center gap-3 text-display-md text-fg">
            Log sets from your wrist
            <span className="badge badge-accent">
              Pro
            </span>
          </h2>
          <div className="mt-6">
            <Prose
              paragraphs={[
                "Leave your phone in your bag. The Helthy Apple Watch app follows your workout live: see the current exercise and every set, tap Complete Set, and start your rest timer without picking up your phone.",
                "On any plan, the watch also tracks runs, walks, rides and HIIT with heart rate and calories, and lets you log a meal by voice. Everything syncs straight to your phone.",
              ]}
            />
          </div>
        </div>
        {/* Both halves of the watch app: lifting and cardio. The second
            watch drops on narrow screens, where they would be too small. */}
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <div
            role="img"
            aria-label="Helthy on Apple Watch: a live bench press workout with completed sets, the current set and a Complete Set button"
            className="w-[min(270px,70vw)]"
          >
            <DeviceFrame device="watch" sizes="270px">
              <WatchScreen screen="workout" />
            </DeviceFrame>
          </div>
          <div
            role="img"
            aria-label="Helthy on Apple Watch: a live outdoor run showing heart rate, distance, pace and calories"
            className="hidden w-[270px] sm:block"
          >
            <DeviceFrame device="watch" sizes="270px">
              <WatchScreen screen="cardio" />
            </DeviceFrame>
          </div>
        </div>
      </div>

      <Section title="Start tracking your workouts">
        <Steps
          items={[
            {
              title: "Pick or build a routine",
              body: "Save your own workout, start an empty one, or have the AI build a full program (Premium).",
            },
            {
              title: "Log as you lift",
              body: "Tap in weight and reps after each set. Rest, repeat. Your session is saved on your phone as you go.",
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
    </SeoPage>
  );
}
