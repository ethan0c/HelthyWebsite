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

const SECTIONS = [
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
      "Simple Mode — a streamlined UI for users who want less noise",
      "Layout customization options",
      "Redesigned settings with search",
      "iOS Live Activity during active workouts",
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
              <div className="space-y-8">
                {SECTIONS.map((section) => (
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
                            style={{ background: "#CDFF50", opacity: 0.55 }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
