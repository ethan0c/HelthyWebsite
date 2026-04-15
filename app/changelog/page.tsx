import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import SiteFooter from "@/components/sections/SiteFooter";

const UPDATES = [
  "Dynamic weekly TDEE updating based on activity",
  "Form, tips, and weight suggestions for each workout on info screen",
  "Option to auto-adjust macros weekly based on updated TDEE",
  "Personalized insights and stats",
  "Insights and tips on each screen",
  "Helthy AI: Routine creation and routine logging",
  "Helthy AI: Meal logging, planning and creation",
  "Coach chat on workout screens for questions",
  "Photo meal logging",
  "Custom app icons",
  "Fat trend tracking with AI BF estimates",
  "Plateau detection + fix plan",
  "Weight trend tracking",
  "Goal ETA predictor",
  "Weekly physique report",
  "Adherence score",
  "Protein target streak",
  "Workout streak tracking",
  "Habit streaks + score",
  "Strength progression forecast (4 weeks)",
  "Muscle imbalance detection (LvsR logging)",
  "Layout customization options",
  "Gatekeep themes",
  "Limit free users to one describe a day",
  "Limit free users to 2 themes",
  "Limit free users to 4 routines",
  "Fixed streaks",
  "Finished Androids",
  "Added iOS Live Activity on D.I. and Notifications",
  "Full achievement unlock logic, badges, rarity tiers, unlock overlay animation",
  "Achievement progress tracking in settings",
  "Meal share screen",
  "Workout share screen",
  "Unilateral exercise handling (L vs R logging for premium users)",
  "Exercise library filter UI redesign (muscle group + equipment modal filters)",
  "ExerciseInfoScreen workout history stats",
  "First-time home tour modal + contextual milestone hints",
  "Macro percentage bar on meal detail screens",
  "Premium badge in home banner + settings",
  "Quick actions on LogFoodScreen",
  "Food image handling for meals",
  "Exercise library versioning + cache invalidation endpoint",
  "Onboarding step tracking (re-engagement)",
  "Added swipe to delete foods + swipe meal headers to clear meal (B, L, D, S)",
  "Fixed workout saving",
  "Added toasts in more relevant places",
  "Redesigned settings modal and added search bar",
  "Made HelthyAIBadge customizable",
  "Added over 30 achievements",
  "Fully fixed and polished TDEE recommendation system and dynamic TDEE engine",
  "Allow imports from other apps (Apple Fitness, Hevy, Strong, MFP, MacroFactor, etc)",
  "Polished app UI",
  "Fixed security, architectural gaps",
  "Hid cloudinary links and made sure they’re never stored",
  "Cleaned up console logs (for sensitive data) and disabled in Production mode",
  "Improved encryption and made app safe",
  "Made a custom feature request system for users",
  "Added several new icons and improved icon matching for foods",
  "Refactored Health Citations to References screen to include attributions for icons",
  "Nudge users to take progress pics when it’s been over 7 days",
  "Progress photos side-by-side comparisons (earliest vs latest in shareable grid)",
  "Food suggestions in describe/voice screen (top picks for common non-branded foods like plantain, eggs, etc)",
  "Nutrition label scanner (OCR scan of nutrition facts panels)",
  "Quick Meal entry (fast meal logging option)",
  "Simple Mode (simplified UI mode with nudge modal and toggle)",
  "Workout calendar view",
  "Momentum Ring + momentum insights",
  "Signal cards in insights",
  "Week narrative card (natural language weekly performance summary)",
  "Monthly timeline in insights",
  "First-time meal and workout celebration overlays",
  "Contextual hints system across screens",
  "Trial countdown banner",
  "Cancellation intercept modal",
  "Background health sync (passive HealthKit / Health Connect)",
  "Bot detection and abuse protection",
  "App rating prompt system",
  "Full multi-language support (Arabic, German, Spanish, French, Hindi, Chinese)",
];

export default function ChangelogPage() {
  return (
    <>
      <main className="relative min-h-screen bg-background text-white pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(205,255,80,0.05), transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <SectionHeading
            title="What's new since"
            italicTail="1.2.7"
            trailingPunctuation=""
          />

          <div className="mt-16 space-y-12">
            <div className="card-helthy p-8 sm:p-10">
              <h2
                className="font-heading text-white mb-2"
                style={{
                  fontSize: "clamp(22px, 2.6vw, 30px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Helthy v2.0
              </h2>
              <p className="text-white/50 mb-8 text-[13px]">Released April 2026</p>
              <ul className="space-y-2.5 text-white/75 text-[14px] leading-relaxed">
                {UPDATES.map((update, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-[0.55em] w-1 h-1 rounded-full"
                      style={{ background: "#CDFF50", opacity: 0.55 }}
                    />
                    <span>{update}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
