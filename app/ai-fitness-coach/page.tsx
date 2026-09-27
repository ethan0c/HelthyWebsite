import type { Metadata } from "next";
import {
  SeoPage,
  PageHero,
  StoreButtons,
  Section,
  Prose,
  FeatureGrid,
  Screenshot,
  CompareTable,
  FaqList,
  LinkGrid,
  DownloadBanner,
  seoMetadata,
} from "@/components/seo/SeoPage";
import { PRO_PRICE } from "@/lib/site";

export const metadata: Metadata = seoMetadata({
  title: "AI Fitness Coach & AI Personal Trainer App",
  description:
    "An AI coach that reads your meals, workouts, PRs and weight trend, then tells you what to change. Helthy's AI personal trainer builds routines, logs meals and answers from your real data.",
  path: "/ai-fitness-coach",
});

const QUESTIONS = [
  "Should I push squats today or take a rest day?",
  "Am I eating enough protein on training days?",
  "Why has my weight stopped dropping?",
  "Build me a 4-day upper/lower split for my schedule.",
  "What should I eat tonight to hit my macros?",
  "Is my bench actually progressing?",
];

const FAQS = [
  {
    q: "What is an AI fitness coach?",
    a: "An AI fitness coach is software that gives personalised training and nutrition guidance. The useful ones base their advice on your own data. Helthy's coach reads your goals, targets, meals, recent workouts, PRs and weight trend before answering, so it responds like a coach who has seen your log.",
  },
  {
    q: "Which AI model powers the Helthy coach?",
    a: "Helthy's coach runs on Claude by Anthropic, with your Helthy data supplied as context for each conversation. A backup provider takes over during outages.",
  },
  {
    q: "How much does the AI coach cost?",
    a: `The unlimited AI coach is part of Helthy Pro: $${PRO_PRICE.monthly}/month or $${PRO_PRICE.yearly}/year. Food and workout logging stay free forever.`,
  },
  {
    q: "Can an AI coach replace a personal trainer?",
    a: "For programming, accountability and everyday questions it covers a lot of what people hire a trainer for, at a fraction of the price. It can't watch your form in person or replace medical advice, so check with a professional if you have an injury or health condition.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "No. Helthy never sells your data and never uses it to train AI models. You can delete your account from inside the app at any time, and Pro members can export their data.",
  },
];

export default function AICoachPage() {
  return (
    <SeoPage crumbs={[{ name: "AI fitness coach", href: "/ai-fitness-coach" }]}>
      <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <PageHero
          title={
            <>
              An AI coach that has actually{" "}
              <span className="text-helthy-lemon">read your log</span>.
            </>
          }
          lede="Most AI fitness apps give generic advice. Helthy's coach sees your meals, lifts, PRs and weight trend, so when you ask what to change, the answer is about you."
        >
          <StoreButtons />
        </PageHero>
        <div className="flex justify-center md:justify-end">
          <Screenshot
            src="/phones/see-insights.png"
            alt="Helthy insights screen connecting nutrition, training and recovery"
            width={1243}
            height={1529}
            priority
          />
        </div>
      </div>

      <Section
        title="Ask it what you'd ask a coach"
        intro="Every answer uses your own numbers: what you ate, what you lifted, what you hit last time and where your weight is heading."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {QUESTIONS.map((q) => (
            <li
              key={q}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[15px] text-white/80"
            >
              &ldquo;{q}&rdquo;
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What the coach knows about you">
        <FeatureGrid
          items={[
            { title: "Your targets", body: "Your TDEE, calorie and macro targets, deficit or surplus, and today's remaining budget." },
            { title: "Your food", body: "Today's meals food by food, plus your nutrition averages for the last two weeks." },
            { title: "Your training", body: "Your recent sessions, top weights, PRs and the full history of any exercise you ask about." },
            { title: "Your body", body: "Weight history and weekly rate of change, steps, goals and streaks." },
            { title: "It takes action", body: "Ask it to log a meal, log your weight, schedule a workout or update a goal, and it does it." },
            { title: "It builds your plan", body: "It creates structured workouts and programs for your goal, equipment and schedule." },
          ]}
        />
      </Section>

      <Section title="AI coach vs a generic chatbot">
        <CompareTable
          columns={["", "Helthy AI coach", "General AI chatbot"]}
          rows={[
            { label: "Knows what you ate this week", values: [true, false] },
            { label: "Knows your lifts and PRs", values: [true, false] },
            { label: "Sees your weight trend and PRs", values: [true, false] },
            { label: "Can log meals and schedule workouts for you", values: [true, false] },
            { label: "Builds a routine you can log immediately", values: [true, false] },
            { label: "Needs you to re-explain yourself", values: [false, true] },
          ]}
        />
      </Section>

      <Section title="Why context makes coaching work">
        <Prose
          paragraphs={[
            "A human coach is valuable because they remember. They know you skipped leg day, that your squat stalled, that your protein has been low all week. Advice without that context is just a blog post.",
            "Helthy logs your food, training and body data in one place, which means its coach starts every conversation already knowing all of it. That's the difference between \"eat more protein\" and \"you've averaged 92 g on training days, about 40 g short of your target, so add a shake after your evening sessions.\"",
          ]}
        />
      </Section>

      <Section title="AI coach questions">
        <FaqList faqs={FAQS} />
      </Section>

      <Section title="Keep exploring">
        <LinkGrid
          links={[
            { href: "/calorie-tracker", title: "Calorie tracker", body: "AI photo logging and free macro tracking." },
            { href: "/workout-tracker", title: "Workout tracker", body: "Log every lift, see every PR." },
            { href: "/tools/protein-calculator", title: "Protein calculator", body: "How much protein you need a day." },
          ]}
        />
      </Section>

      <DownloadBanner
        title="Meet your AI coach"
        body={`Download Helthy free and log for a few days. Then ask the coach anything. The unlimited AI coach is part of Helthy Pro, from $${PRO_PRICE.yearly}/year.`}
      />
    </SeoPage>
  );
}
