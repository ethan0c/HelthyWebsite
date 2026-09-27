/**
 * Competitor comparisons published at /compare/[slug].
 *
 * Competitor facts were checked on 2026-09-27 against each app's US App
 * Store listing, its website and help docs. Re-check before changing a
 * claim, and bump CHECKED_ON when you do. Helthy's own limits come from
 * helthy_app/backend/src/ai/prompts/appKnowledge.ts.
 */

import { PRO_PRICE } from "@/lib/site";

export const CHECKED_ON = "September 2026";

type Cell = string | boolean;

export type Comparison = {
  slug: string;
  competitor: string;
  owner: string;
  category: "nutrition" | "workout";
  title: string;
  description: string;
  lede: string;
  rows: { label: string; helthy: Cell; them: Cell }[];
  helthyWins: string[];
  theyWin: string[];
  verdict: string;
  faqs: { q: string; a: string }[];
};

const HELTHY_PRO = `$${PRO_PRICE.monthly}/mo or $${PRO_PRICE.yearly}/yr`;

export const COMPARISONS: Comparison[] = [
  {
    slug: "helthy-vs-myfitnesspal",
    competitor: "MyFitnessPal",
    owner: "MyFitnessPal, Inc.",
    category: "nutrition",
    title: "Helthy vs MyFitnessPal: Free Calorie Tracker Compared",
    description:
      "Helthy vs MyFitnessPal in 2026: barcode scanning, AI photo logging, workout tracking, AI coach and price. See which calorie tracker fits you.",
    lede: "MyFitnessPal is the biggest name in calorie counting, with a huge food database. Helthy is newer: it adds real strength tracking and a far cheaper AI tier, and it doesn't put the basics behind a paywall.",
    rows: [
      { label: "Premium price", helthy: HELTHY_PRO, them: "$19.99/mo or $79.99/yr list price" },
      { label: "Free calorie and macro logging", helthy: true, them: true },
      { label: "Barcode scanning on the free plan", helthy: "2 scans a week", them: "Premium only" },
      { label: "AI photo meal logging", helthy: "2 a week free, unlimited with Pro", them: "Premium only" },
      { label: "Voice food logging", helthy: "2 a week free, unlimited with Pro", them: "Premium only" },
      { label: "Strength log with sets, reps and PRs", helthy: true, them: "Basic exercise logging" },
      { label: "AI coach", helthy: "Pro", them: "Premium (US, UK, CA, AU, NZ)" },
      { label: "AI-built workout programs", helthy: "Pro", them: false },
      { label: "Web app", helthy: false, them: true },
    ],
    helthyWins: [
      "Real workout tracking: sets, reps, weight, automatic PRs and an Apple Watch app, in the same app as your food.",
      `Much cheaper AI: Helthy Pro is $${PRO_PRICE.yearly} a year against MyFitnessPal Premium's $79.99 list price.`,
      "Free users can try barcode, photo and voice logging every week. MyFitnessPal keeps all three behind Premium.",
      "The AI coach reads your lifts as well as your food, so it can connect training and nutrition.",
    ],
    theyWin: [
      "A much larger food database (20.5 million+ foods), especially for branded and regional products.",
      "A web app and a long list of connected devices and apps.",
      "A large community and more than a decade of history.",
    ],
    verdict:
      "Pick MyFitnessPal if you mostly log packaged foods and want the biggest database or a web app. Pick Helthy if you lift, want food and training in one place, or want AI logging and coaching without paying MyFitnessPal Premium prices.",
    faqs: [
      {
        q: "Is Helthy a good MyFitnessPal alternative?",
        a: "Yes, especially if you also train. Helthy covers calorie and macro tracking free, includes a full strength tracker, and its Pro tier costs a fraction of MyFitnessPal Premium.",
      },
      {
        q: "Is MyFitnessPal's barcode scanner free?",
        a: `No. As of ${CHECKED_ON}, MyFitnessPal lists barcode scanning as a Premium feature. Helthy's free plan includes 2 camera scans a week (barcode, nutrition label or meal photo), and Pro makes them unlimited.`,
      },
      {
        q: "Does MyFitnessPal have an AI coach?",
        a: "MyFitnessPal launched an AI Coach for Premium subscribers in June 2026 in a handful of countries. Helthy's AI coach is included in Helthy Pro and also sees your workouts and PRs, not just your food.",
      },
    ],
  },
  {
    slug: "helthy-vs-cal-ai",
    competitor: "Cal AI",
    owner: "Viral Development LLC (owned by MyFitnessPal)",
    category: "nutrition",
    title: "Helthy vs Cal AI: AI Photo Calorie Trackers Compared",
    description:
      "Helthy vs Cal AI: both log meals from a photo. Compare free tiers, price, workout tracking and AI coaching to pick the right AI calorie tracker.",
    lede: "Cal AI made photo calorie counting mainstream and is now owned by MyFitnessPal. Helthy logs meals from a photo too, but it also has a free tier, a full workout tracker and an AI coach.",
    rows: [
      { label: "AI photo meal logging", helthy: true, them: true },
      { label: "Free plan", helthy: "Unlimited manual logging + 2 free scans a week", them: "3-day trial; scan results need a subscription" },
      { label: "Premium price", helthy: HELTHY_PRO, them: "Subscription; price varies by offer" },
      { label: "Barcode and nutrition-label scanning", helthy: true, them: true },
      { label: "Strength log with sets, reps and PRs", helthy: true, them: "Exercise and calorie-burn logging" },
      { label: "AI coach you can chat with", helthy: "Pro", them: "Not advertised" },
      { label: "Apple Watch app", helthy: "Yes (set logging with Pro)", them: true },
    ],
    helthyWins: [
      "A real free tier: unlimited search and manual logging, plus free AI scans every week.",
      "A complete workout tracker with PRs and AI-built programs, not just exercise calories.",
      "An AI coach that answers from your food and training logs, and can log meals or schedule workouts for you.",
      `Clear pricing: ${HELTHY_PRO}.`,
    ],
    theyWin: [
      "Photo-first design that many people find the fastest way to log.",
      "Uses the phone's depth sensor to help estimate portion size.",
      "A very large user base and hundreds of thousands of App Store ratings.",
    ],
    verdict:
      "Pick Cal AI if you only want photo calorie counting and don't mind paying from day one. Pick Helthy if you want photo logging plus a free tier, workout tracking and a coach in one app.",
    faqs: [
      {
        q: "Is Cal AI free?",
        a: "Cal AI offers a 3-day free trial, and its App Store listing states that food scanning results require a subscription. Helthy is free to use indefinitely, with 2 AI scans a week on the free plan.",
      },
      {
        q: "Who owns Cal AI?",
        a: "MyFitnessPal acquired Cal AI; the deal was announced in March 2026. Cal AI still runs as a separate app.",
      },
      {
        q: "Is Helthy's photo logging as accurate as Cal AI?",
        a: "Helthy uses Claude's vision model to identify each item, then grounds the nutrition in the food database and your own logging history. Both apps let you review and correct items before saving.",
      },
    ],
  },
  {
    slug: "helthy-vs-hevy",
    competitor: "Hevy",
    owner: "Hevy Studios S.L.",
    category: "workout",
    title: "Helthy vs Hevy: Free Workout Trackers Compared",
    description:
      "Helthy vs Hevy: compare free workout logging, routine limits, price, nutrition tracking and AI coaching to find the best gym log for you.",
    lede: "Hevy is one of the most popular free gym logs, with a big social community. Helthy is a workout tracker too, but it also tracks your food and includes an AI coach that reads both.",
    rows: [
      { label: "Unlimited free workout logging", helthy: true, them: true },
      { label: "Saved routines on the free plan", helthy: "4", them: "4" },
      { label: "Automatic PRs", helthy: true, them: true },
      { label: "Apple Watch app", helthy: "Yes (set logging with Pro)", them: true },
      { label: "Calorie and macro tracking", helthy: true, them: false },
      { label: "AI photo meal logging", helthy: true, them: false },
      { label: "Built-in AI coach", helthy: "Pro", them: "Export workouts to ChatGPT or Claude" },
      { label: "Premium price", helthy: HELTHY_PRO, them: "$2.99/mo, $23.99/yr or $74.99 lifetime" },
      { label: "Web app", helthy: false, them: true },
    ],
    helthyWins: [
      "Nutrition built in: calories, macros and AI photo logging next to your lifts.",
      "An AI coach inside the app that sees your training and your food, and can build and schedule workouts.",
      "One app instead of a gym log plus a separate calorie counter.",
    ],
    theyWin: [
      "A social feed and a large lifting community.",
      "A lifetime plan, a slightly cheaper yearly price, and a web app plus Wear OS support.",
      "A long track record, with tens of thousands of App Store ratings.",
    ],
    verdict:
      "Pick Hevy if you only want a gym log with a social feed. Pick Helthy if you want your training and your nutrition in one place, with an AI coach that can see both.",
    faqs: [
      {
        q: "Is Helthy a good Hevy alternative?",
        a: "Yes, if you also want to track food. Workout logging is free and unlimited in both apps, but only Helthy adds calorie tracking, AI photo logging and a built-in coach.",
      },
      {
        q: "How many routines can you save for free?",
        a: "Both Helthy and Hevy let free users keep 4 saved routines. Pro or paid plans make them unlimited.",
      },
    ],
  },
  {
    slug: "helthy-vs-strong",
    competitor: "Strong",
    owner: "Strong Fitness PTE Ltd.",
    category: "workout",
    title: "Helthy vs Strong: Workout Tracker Apps Compared",
    description:
      "Helthy vs Strong: free routine limits, price, nutrition tracking and AI features compared. Find out which workout tracker is right for you.",
    lede: "Strong is a clean, focused lifting log that has been around for years. Helthy logs your workouts just as simply, and adds nutrition tracking and an AI coach.",
    rows: [
      { label: "Unlimited free workout logging", helthy: true, them: true },
      { label: "Saved routines on the free plan", helthy: "4", them: "3" },
      { label: "Apple Watch app", helthy: "Yes (set logging with Pro)", them: true },
      { label: "Calorie and macro tracking", helthy: true, them: false },
      { label: "AI photo meal logging", helthy: true, them: false },
      { label: "AI coach and AI-built programs", helthy: "Pro", them: false },
      { label: "Premium price", helthy: HELTHY_PRO, them: "$4.99/mo or $29.99/yr, lifetime available" },
    ],
    helthyWins: [
      "Food tracking and AI photo logging in the same app as your training.",
      "An AI coach and AI-built programs based on your real sessions.",
      `A cheaper yearly plan: $${PRO_PRICE.yearly} against $29.99.`,
    ],
    theyWin: [
      "A very focused, minimal logger if you never want to track food.",
      "Built-in plate and warm-up calculators, and a lifetime purchase option.",
      "More than a hundred thousand App Store ratings over many years.",
    ],
    verdict:
      "Pick Strong if you want a pure lifting log and nothing else. Pick Helthy if you want your workouts, food and an AI coach together, for less per year.",
    faqs: [
      {
        q: "Is Strong free?",
        a: "Strong's free version saves unlimited workouts but limits you to 3 custom routines. Strong PRO removes the limit. Helthy's free plan allows 4 saved workouts, plus free nutrition tracking.",
      },
      {
        q: "Does Strong track calories?",
        a: "No. Strong is a workout logger only. Helthy tracks both workouts and nutrition.",
      },
    ],
  },
];

export function getComparison(slug: string) {
  return COMPARISONS.find((c) => c.slug === slug);
}
