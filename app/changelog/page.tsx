import React from "react";
import type { Metadata } from "next";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "See every feature added to Helthy — Apple Watch, programs, AI photo logging, voice logging, the AI coach, Apple Health sync and more.",
  alternates: { canonical: "https://helthy.app/changelog" },
};

const V2_7_SECTIONS = [
  {
    label: "Added",
    items: [
      "Helthy for Apple Watch: track runs, walks, rides and HIIT with heart rate and calories, and log a meal by voice from your wrist. With Pro, the watch also follows your strength workout live, so you can complete sets and start rest timers without your phone",
      "Programs: group your workouts into the order you train them, like Push, Pull, Legs. Helthy tells you which one is up next and moves you along as you finish each one. Build one from your library or let the AI generator create the whole program. Free for everyone",
      "Allergen warnings: pick from 14 allergens in Food settings and foods that contain them are flagged in search, on food cards and on the food's own screen. Your coach knows your allergens too",
      "A new workout editor: rename, reorder, add, replace or remove exercises on a saved workout and start it from the same screen. It saves as you go",
      "Your records on the You tab: your best lifts with each exercise's animation, and a full Personal Records screen. Free for everyone",
      "Your trends on the You tab: a weight trend chart with your goal arrival date, 12 weeks of training volume, and a plateau alert when progress stalls (Pro)",
      "A Quick option when logging food: enter calories on their own, or calories plus macros, without searching",
      "Notes mode when describing food: write your whole day out under Breakfast, Lunch, Dinner and Snacks and log it in one go",
      "An optional fiber target, shown as a fiber bar next to protein, carbs and fat",
      "Share your weekly issue as a story-sized card, and preview your leaderboard rank card before you post it",
      "A breakdown of where your calorie target comes from: maintenance, steps, workouts and your deficit or surplus, line by line",
      "A \"Like You\" coach tone (experimental) that writes back the way you write"
    ]
  },
  {
    label: "Changed",
    items: [
      "The coach can now act for you: log a meal or a weight, schedule a workout, set a goal, save a custom meal and build a routine",
      "Logging food is now one screen with six ways in: Library, Search, Scan, Describe, Voice and Quick",
      "Meal photo scans show each food as the AI recognises it, and the review screen opens before the scan has finished",
      "The Home tab was redesigned: your streak is a flame in the header, the week shows as seven dots, and Today's Goals is a grid of calories, protein, active days and steps",
      "The Exercise tab was redesigned around one Up next card that follows your program, or picks the workout whose muscles have rested longest",
      "A rebuilt welcome tour that highlights the real app on screen, one step at a time. Replay it from Settings",
      "Step history now follows your own calendar day, so evening steps no longer spill into tomorrow",
      "Free accounts now get 2 scans a week, alongside 2 voice logs and 2 describes",
      "Onboarding is shorter, and goal setup explains an unusual calorie target instead of blocking it"
    ]
  },
  {
    label: "Removed",
    items: [
      "Workout, rest day, meal time and step reminders. Notifications now has three switches: meal logging, weekly progress and milestones"
    ]
  }
];

const V2_5_SECTIONS = [
  {
    label: "Added",
    items: [
      "One Scan camera for everything: point it at a meal, a barcode or a nutrition label and it works out which one it is. Scanned items collect in one list you can adjust and log together",
      "Meal ideas on the Food tab: suggestions that fit your remaining macros, with ingredients and step-by-step cooking instructions",
      "Thousands of new foods: restaurant chain menus, more branded products, and dishes from Nigeria, Ghana and India. Verified foods now rank first in search",
      "A welcome tour for new users, replayable from Settings > Replay App Guide"
    ]
  },
  {
    label: "Changed",
    items: [
      "Free accounts can now use the scanner: 4 scans each week, plus 2 voice logs and 2 describes each week",
      "The Food, Exercise and You tabs were redesigned, with an Up next card to start your next routine in one tap",
      "Photo scans now identify what's on the plate first, then fill in nutrition from your own logging history and the food database",
      "Reading a nutrition label is noticeably faster, and voice quantities like \"2 slices\" convert to more accurate grams",
      "Popups take turns instead of stacking, and the rating request no longer interrupts your first meal or workout celebration"
    ]
  }
];

const V2_4_3_SECTIONS = [
  {
    label: "Added",
    items: [
      "Meal photo scans show each food as the AI identifies it, instead of a spinner",
      "A redesigned photo review screen where you can type or dictate what the meal is before analyzing, for much better results on tricky dishes",
      "Body fat scans now use 2 to 3 photos from different angles",
      "Quick reply chips under AI chat replies, and a summary card when you ask for your day so far",
      "Swipe an exercise card left during a workout to remove it"
    ]
  },
  {
    label: "Changed",
    items: [
      "Meal photo scans take about half as long, and saving a scanned meal is instant",
      "Scan portions are better calibrated, so small plates and light meals no longer come back with inflated calories",
      "AI chat replies that look up your meals, workouts or weight respond faster"
    ]
  },
  {
    label: "Fixed",
    items: [
      "Tapping the rest timer notification no longer restarts the timer or inflates your workout duration",
      "Body fat scans no longer hang on a bad connection",
      "The AI chat input bar no longer overlaps the tab bar",
      "Android: yearbook swiping and live step counting work again",
      "Lock screen Live Activity display issues"
    ]
  }
];

const V2_4_1_SECTIONS = [
  {
    label: "Changed",
    items: [
      "Picking your date of birth during signup is much quicker: the year list covers only realistic ages, and Android uses a wheel picker instead of a calendar",
      "The issue rack now shows a live \"Drops in X hours\" countdown on Sundays, and tells you the drop day on other days",
      "Dismissing the weekly issue card on Home now sticks instead of the card coming back",
    ],
  },
  {
    label: "Fixed",
    items: [
      "Android: typing numbers that end in 0 (like 10) into the reps and weight fields during a workout now works reliably",
      "Android: the resume bar after minimizing a workout responds to taps again",
      "Android: the selected label on the Monthly and Yearly toggle and the imperial and metric toggle is visible again",
      "Android: the reps and weight fields during a workout no longer look squeezed",
      "The big price on the upgrade screen now fits on one line on small screens",
      "Leaderboard filter names like \"Workouts\" no longer wrap onto a second line",
      "Meals you log by voice or description now keep every food: items not found in the database get an AI nutrition estimate instead of being dropped from the meal",
      "Editing or deleting an AI-logged meal with several foods now works correctly: edit lets you pick which item to change, and delete removes the whole meal",
      "Sharing a progress photo from the weight screen now works",
      "The weight graph now appears from your first entry instead of needing two",
      "Weekly issue pages about calories and protein no longer show the steps chart",
      "The weekly issue's new and read state stays correct across week boundaries",
      "The one-time survey for Pro members no longer reappears after you have answered it",
    ],
  },
];

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
      "AI chat and coaching are more reliable and keep working through service hiccups",
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
      "Photo meal scanning is more accurate and more reliable",
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
      "15 achievements across four rarity tiers, with unlock animations and progress tracking in settings",
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
    <article className="border-t border-line py-12 md:py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="text-display-md text-fg">{version}</h2>
        <p className="text-[13px] text-fg-subtle">{date}</p>
      </div>
      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <div key={section.label}>
            <span className={`badge ${section.label === "Added" ? "badge-accent" : ""}`}>
              {section.label}
            </span>
            <ul className="mt-4 space-y-3 text-[15px] leading-7 text-fg-muted">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ink"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

const RELEASES = [
  { version: "Helthy 2.7", date: "September 2026", sections: V2_7_SECTIONS },
  { version: "Helthy 2.5", date: "August 2026", sections: V2_5_SECTIONS },
  { version: "Helthy 2.4.3", date: "July 2026", sections: V2_4_3_SECTIONS },
  { version: "Helthy 2.4.1", date: "July 2026", sections: V2_4_1_SECTIONS },
  { version: "Helthy 2.4", date: "July 2026", sections: V2_4_SECTIONS },
  { version: "Helthy 2.3", date: "July 2026", sections: V2_3_SECTIONS },
  { version: "Helthy 2.2", date: "July 2026", sections: V2_2_SECTIONS },
  { version: "Helthy 2.1.3", date: "June 2026", sections: V2_1_3_SECTIONS },
  { version: "Helthy 2.1", date: "June 2026", sections: V2_1_SECTIONS },
  { version: "Helthy 2.0", date: "April 2026", sections: V2_0_SECTIONS },
];

export default function ChangelogPage() {
  return (
    <>
      <main className="relative min-h-screen bg-canvas text-fg">
        <div className="container-narrow pb-24 pt-32 lg:pt-40">
          <div className="max-w-3xl">
            <h1 className="text-display-xl text-fg">
              What&apos;s <span className="text-accent-ink">new</span>
            </h1>
            <div className="mt-12 md:mt-16">
              {RELEASES.map((r) => (
                <ReleaseBlock key={r.version} version={r.version} date={r.date} sections={r.sections} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
