"use client";

const FAQS = [
  {
    q: "Is Helthy really free?",
    a: "Yes — calorie logging, workouts, TDEE, and form tips are unlimited and free forever. Premium ($10/mo) unlocks unlimited AI photo & voice logging, the AI coach, generated routines, full analytics, and all-time history.",
  },
  {
    q: "How accurate is the AI photo logging?",
    a: "Helthy uses a vision model trained on millions of meals plus the USDA and Open Food Facts databases. For most common meals it's within 5–10% of a hand-logged entry. You can always tap to adjust before saving.",
  },
  {
    q: "Does it sync with Apple Health & Google Fit?",
    a: "Yes. Free users get steps and weight sync. Premium users get full two-way sync — heart rate, workouts, active energy, and nutrition data flow both directions.",
  },
  {
    q: "Is my data private?",
    a: "Your data is yours. We never sell it, never use it to train AI models, and you can export or delete everything from inside the app at any time.",
  },
  {
    q: "What's the AI coach actually like?",
    a: "It's powered by Claude and has full context on your goals, recent meals, lifts, sleep, and weight trend. So it can answer questions like \"should I push squats today?\" with your actual numbers, not generic advice.",
  },
  {
    q: "When is Android coming?",
    a: "iOS is live now. Android is on the roadmap — join the waitlist on the homepage to be notified the moment it drops.",
  },
  {
    q: "Can I cancel Premium?",
    a: "Anytime. Manage your subscription in Settings → Subscription, or directly through the App Store. Cancel and you keep Free forever.",
  },
  {
    q: "Does it work offline?",
    a: "Logging meals, workouts, and weight works fully offline. Your data syncs automatically when you're back online. AI features need a connection.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="relative section-padding px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-display-xl font-heading font-light tracking-tight">
            Questions,{" "}
            <span className="text-italics text-helthy-lemon">answered</span>.
          </h2>
        </div>

        {/* 4 columns × 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className="relative rounded-3xl p-7 flex flex-col overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                minHeight: 300,
              }}
            >
              {/* Big numeric */}
              <span
                className="text-numeric text-white/10 leading-none mb-5 select-none"
                style={{ fontSize: 84, letterSpacing: -4 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="text-[17px] font-semibold text-white mb-3 tracking-tight leading-snug">
                {faq.q}
              </h3>
              <p className="text-[13px] text-white/55 leading-relaxed font-light">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
