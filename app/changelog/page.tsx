import React from "react";
import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "See every feature added to Helthy — AI photo logging, voice logging, AI coach, workout routines, Apple Health sync, and more.",
  alternates: { canonical: "https://helthy.app/changelog" },
};

const V2_1_3_SECTIONS = [
  {
    label: "Added",
    items: [
      "Free plan now shown on the upgrade screen with a clear side-by-side comparison of free vs Premium",
      "A \"+1\" animation plays on your streak ring on the Home tab when you keep it going",
    ],
  },
  {
    label: "Fixed",
    items: [
      "Fixed a pop-up that could appear every time you opened the app asking about your app icon",
      "You can now finish a workout even if you forgot to mark your sets as done — the app offers to save the sets you filled in",
      "The week dates on your weekly recap now match everywhere they appear: the Home card, the magazine rack, and the issue itself",
      "Weekly recap notifications no longer arrive before the recap is actually ready to read",
    ],
  },
];

const V2_2_SECTIONS = [
  {
    label: "Added",
    items: [
      "Global leaderboards — rank against other Helthy users on Steps (daily or weekly), Workouts, Activity minutes, and Calories burned. Open from the podium icon on Home and share your rank. Opt-in via Settings > Profile.",
      "Usernames — set one in Settings > Profile, used on leaderboards and shared cards",
      "Smart action cards on Home — a meal card near your usual meal times and a workout card near your usual workout time, so logging is one tap away. Swipe to dismiss for the day.",
      "Your frequently logged meals — one-tap logging of the meals you log most often around that time of day, right inside the smart meal card (Premium)",
      "Weight trend card on the Home tab showing your recent weight progress",
      "Live reading of today's steps from Apple Health for immediate display on Home",
      "+/- steppers for reps and weight during a workout — nudge a value without retyping it, hold to repeat quickly",
      "Swipe an exercise's header right during a workout to replace it with a different exercise",
      "Meal and workout reminders now open straight into the logging screen instead of just the tab",
      "Voice-logged and described foods that aren't in the database now get an AI nutrition estimate instead of logging at zero",
    ],
  },
  {
    label: "Changed",
    items: [
      "Silky-smooth throughout — refined animations and transitions for a faster, more responsive feel across the whole app",
      "Fewer taps to log — meal, weight, and exercise logging are now quicker and more streamlined",
      "New swipe gestures for faster logging and navigation",
      "New Premium color themes: Oat Milk, Matcha, and Concrete",
      "Home screen redesigned around goal progress and today's activity",
      "Create Food — name and brand fields now auto-advance to the next field",
      "Faster loading for exercise demo GIFs and the Exercise Info screen",
    ],
  },
  {
    label: "Fixed",
    items: [
      "Adding a new set during a workout now copies the reps and weight you actually logged on the previous set, instead of a stale default",
      "Volume personal records are no longer falsely triggered for exercises with no prior volume history",
      "Voice logging now requires the \"Hey Helthy\" wake word instead of firing on any speech",
    ],
  },
  {
    label: "Removed",
    items: [
      "Deep Abyss and Crimson Volcanic color themes",
      "Home layout customization (Bento/Stacked layouts and card customization)",
    ],
  },
];

const V2_1_SECTIONS = [
  {
    label: "Added",
    items: [
      "AI Coach Tone — choose how your coach talks to you: Direct, Balanced, or Warm (Settings > AI Coach Tone)",
      "Helthy Weekly — your week as a full-screen magazine in the Insights tab, with a hero highlight, quiet win, honest look, and narrative summary",
      "New issue card on the Home tab so you never miss a weekly recap",
      "Trends screen — weight projection toward your goal, 30-day nutrition charts, goal ETA, plateau alerts, and muscle imbalance data",
      "A quick, optional \"How did you hear about us?\" step during setup",
    ],
  },
  {
    label: "Changed",
    items: [
      "Settings now has a search bar",
      "Exercise Library filters redesigned — muscle group and equipment filters open in a modal",
    ],
  },
];

const V2_0_SECTIONS = [
  {
    label: "AI & Logging",
    items: [
      "Photo meal logging — snap a meal and AI identifies foods and estimates nutrition",
      "AI meal logging, planning, and creation via Helthy AI",
      "AI routine creation and guided routine logging via Helthy AI",
      "AI coach chat on workout screens for in-context questions",
      "Food suggestions in describe and voice screens for common foods",
      "Nutrition label scanner — scan any nutrition facts panel to log instantly",
      "Voice meal logging with speech-to-text",
    ],
  },
  {
    label: "Insights & Analytics",
    items: [
      "Dynamic TDEE that updates weekly based on your actual activity",
      "Option to auto-adjust macros weekly when TDEE changes",
      "Personalized insights, stats, and contextual tips across screens",
      "Body fat trend tracking with AI-estimated body composition over time",
      "Plateau detection with an AI-generated fix plan",
      "Weight trend tracking",
      "Goal ETA predictor",
      "Weekly physique report",
      "Strength progression forecast (4-week outlook)",
      "Momentum Ring with momentum insights",
      "Signal cards in insights",
      "Week narrative — natural language summary of your weekly performance",
      "Monthly activity timeline in insights",
    ],
  },
  {
    label: "Streaks & Achievements",
    items: [
      "Workout streak tracking",
      "Protein target streak",
      "Adherence score",
      "Habit streaks and habit score",
      "Over 30 achievements with rarity tiers, unlock animations, and progress tracking in settings",
    ],
  },
  {
    label: "Workouts",
    items: [
      "Dynamic Island and Live Activity during workouts — see your active set, rest timer, and elapsed time without opening the app",
      "Muscle imbalance detection via left/right logging for unilateral exercises (Premium)",
      "Form tips and weight suggestions on every exercise info screen",
      "Workout history stats on exercise detail screens",
      "Workout calendar view",
      "Workout share screen",
    ],
  },
  {
    label: "Nutrition",
    items: [
      "Quick Meal entry for fast meal logging",
      "Macro percentage bar on meal detail screens",
      "Swipe to delete foods; swipe meal headers to clear a meal",
      "Meal share screen",
      "Food image support on logged meals",
    ],
  },
  {
    label: "Customization & UI",
    items: [
      "Custom app icons",
      "Layout customization options",
      "Redesigned settings with search",
      "First-time home tour and contextual milestone hints",
      "First-time meal and workout celebration overlays",
      "Improved icon matching for hundreds of foods",
    ],
  },
  {
    label: "Imports & Integrations",
    items: [
      "Import history from Apple Fitness, Hevy, Strong, MyFitnessPal, MacroFactor, and more",
      "Background health sync with Apple HealthKit and Health Connect",
    ],
  },
  {
    label: "Platform",
    items: [
      "Android support",
      "Full multi-language support (Arabic, German, Spanish, French, Hindi, Chinese)",
      "In-app feature request system",
      "References screen with icon and data source attributions",
    ],
  },
];

function ReleaseBlock({
  version,
  date,
  sections,
}: {
  version: string;
  date: string;
  sections: { label: string; items: string[] }[];
}) {
  return (
    <div className="card-helthy p-8 sm:p-10">
      <h2
        className="font-heading text-white mb-2"
        style={{
          fontSize: "clamp(22px, 2.6vw, 30px)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        {version}
      </h2>
      <p className="text-white/50 mb-8 text-[13px]">{date}</p>
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.label}>
            <p
              className="text-[11px] font-semibold uppercase text-white/35 mb-3"
              style={{ fontFamily: "var(--font-body)", letterSpacing: "0.18em" }}
            >
              {section.label}
            </p>
            <ul className="space-y-2.5 text-white/75 text-[14px] leading-relaxed">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="shrink-0 mt-[0.55em] w-1 h-1 rounded-full"
                    style={{ background: "#CDFB50", opacity: 0.55 }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <>
      <main className="relative min-h-screen bg-background text-white pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(205,251,80,0.05), transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <SectionHeading
            title="What's"
            italicTail="new"
            trailingPunctuation=""
          />

          <div className="mt-16 space-y-12">
            <ReleaseBlock
              version="Helthy 2.2"
              date="July 2026"
              sections={V2_2_SECTIONS}
            />
            <ReleaseBlock
              version="Helthy 2.1.3"
              date="June 2026"
              sections={V2_1_3_SECTIONS}
            />
            <ReleaseBlock
              version="Helthy 2.1"
              date="June 2026"
              sections={V2_1_SECTIONS}
            />
            <ReleaseBlock
              version="Helthy 2.0"
              date="April 2026"
              sections={V2_0_SECTIONS}
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
