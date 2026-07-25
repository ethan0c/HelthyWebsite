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

const V2_4_SECTIONS = [
  {
    label: "Added",
    items: [
      "A favorites row at the top of the Workout tab for the routines you use most, and a one-tap start button on every routine card",
      "One-tap logging from the barcode scanner, plus a \"Scan another\" button so you can scan several items back to back",
      "Your latest body fat entry now shows next to your weight on the Home tab",
      "Two new pages in your weekly issue: the achievements you earned that week and where you placed on the leaderboards",
      "A workout setting for unilateral exercises — choose whether to log left and right sides separately (Pro)",
      "A celebration overlay when you earn a streak day",
      "The app now offers to help you add Helthy widgets to your home screen, and the streak widget shows a compact calendar of your week",
      "On Android, steps are now counted by the phone's own step sensor, so step tracking works reliably in the background",
    ],
  },
  {
    label: "Changed",
    items: [
      "The quick-log bar on the Food tab (search, describe, scan) is now available to everyone — photo meal scanning is the Pro part",
      "The tab bar on iOS is now the native system tab bar",
      "The sign-in and welcome screens were redesigned to match the app's look, and they load faster",
      "Picking a username is no longer part of sign-up — set one any time in Settings > Profile",
      "Switching plans is clearer: the confirmation says whether you're upgrading or downgrading, and your subscription updates right away",
      "AI chat and coaching now switch to a backup AI provider during outages, so they keep working",
      "Leaderboards now update right after you log activity instead of waiting for the next refresh",
      "Settings search now finds actions inside settings (change plan, restore purchases, units, edit profile), not just screen names",
      "Sections in the workout library can now be collapsed",
    ],
  },
  {
    label: "Fixed",
    items: [
      "The daily steps leaderboard now includes everyone active today and rolls over at your local midnight",
      "The app could get stuck on the splash screen when opening — it now always recovers",
      "Deleted foods and meals no longer reappear after a sync",
      "Music from other apps no longer stays quiet or paused after you use voice logging",
      "Tapping a home-screen widget now opens the exact screen it points to",
      "Top Lifts in Exercise insights now shows your best lifts from the last 30 days, matching its \"this month\" heading",
      "Creating a custom exercise no longer fails when the name has characters like \"/\", \"&\", or accents",
    ],
  },
  {
    label: "Removed",
    items: ["The calorie-burn breakdown pop-up on the TDEE screen"],
  },
];

const V2_3_SECTIONS = [
  {
    label: "Added",
    items: [
      "Streaks leaderboard — see how your current daily streak stacks up against everyone else, ranked longest first",
      "A new Weight page in your weekly issue: your start, end, and change on the scale for the week",
      "Haptics across the app — a light tap when you log, save, or complete a set, and a bigger celebration buzz for personal records, achievements, and streaks",
      "Drag to reorder exercises during a workout using the new handle on each exercise card",
      "Redeem App Store promo and offer codes right from the paywall",
      "The log weight sheet now starts from your last logged weight, so you nudge the number instead of retyping it",
    ],
  },
  {
    label: "Changed",
    items: [
      "Weekly issues now drop every Sunday, and the current week's issue is free for everyone — opening past issues is the Pro part",
      "AI chat replies now stream in smoothly at a steady pace, and chat opens faster",
      "Photo meal scanning is more accurate and more reliable — photos are analyzed at higher resolution by a stronger vision model",
      "The AI coach now answers macro and calorie questions about any food, including fast food and restaurant items",
      "The AI coach can see more of your app data and handle more kinds of requests",
      "Redesigned workout creation, AI routine generator, and exercise screens",
      "Manual macro targets fill themselves in: enter your calories, protein, and carbs, and fat is calculated from what's left",
      "Toasts are quicker and all appear at the top of the screen",
      "Past meals, past workouts, and progress photos all load faster",
    ],
  },
  {
    label: "Fixed",
    items: [
      "Some foods showed a \"logged\" confirmation but weren't actually saved — they now log correctly",
      "Barcode scans no longer save the wrong quantity",
      "Personal records are more reliable, and the \"PR!\" feedback fires the moment you complete the set",
      "Your first body fat scan is now reachable — new users could never log or scan anything before",
      "The Home screen no longer gets stuck behind a pile-up of pop-ups — celebrations and prompts show one at a time",
      "Smoother onboarding, with fixes to profile setup and macro targets",
    ],
  },
  {
    label: "Removed",
    items: [
      "The attachment button and unfinished voice mode in AI chat",
      "The Feature Requests screen (feedback is moving to surveys)",
      "The progress dots under meals on the Food tab",
    ],
  },
];

const V2_1_3_SECTIONS = [
  {
    label: "Added",
    items: [
      "Free plan now shown on the upgrade screen with a clear side-by-side comparison of free vs Helthy Pro",
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
      "Global leaderboards — rank against other Helthy users on Steps (daily or weekly), Workouts, Activity minutes, and your current daily Streak. Open from the podium icon on Home and share your rank. Opt-in via Settings > Profile.",
      "Usernames — set one in Settings > Profile, used on leaderboards and shared cards",
      "Smart action cards on Home — a meal card near your usual meal times and a workout card near your usual workout time, so logging is one tap away. Swipe to dismiss for the day.",
      "Your frequently logged meals — one-tap logging of the meals you log most often around that time of day, right inside the smart meal card (Pro)",
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
      "New Pro color themes: Oat Milk, Matcha, and Concrete",
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
      "Muscle imbalance detection via left/right logging for unilateral exercises (Pro)",
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
              version="Helthy 2.4"
              date="July 2026"
              sections={V2_4_SECTIONS}
            />
            <ReleaseBlock
              version="Helthy 2.3"
              date="July 2026"
              sections={V2_3_SECTIONS}
            />
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
