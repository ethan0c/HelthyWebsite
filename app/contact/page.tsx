import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Helthy team about support, partnerships, or product questions.",
};

const CONTACT_REASONS = [
  {
    title: "Support",
    body: "Questions about your account, subscriptions, or anything in the app.",
  },
  {
    title: "Partnerships",
    body: "Creators, gyms, brands, and communities interested in working with Helthy.",
  },
  {
    title: "Press or feedback",
    body: "Feature requests, launch coverage, or anything you'd like the team to see.",
  },
];

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-background text-white">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 20% 18%, rgba(205,255,80,0.08), transparent 70%), radial-gradient(ellipse 45% 34% at 85% 24%, rgba(34,211,238,0.06), transparent 72%)",
        }}
      />

      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-44 lg:px-8 lg:pb-28 lg:pt-52">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white/65">
              Contact Helthy
            </div>
            <h1 className="mt-6 max-w-xl font-heading text-[clamp(48px,7vw,78px)] font-light leading-[0.95] tracking-[-0.04em] text-white">
              Let&apos;s make your next move{" "}
              <span className="text-italics text-helthy-lemon">clear</span>.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/62 sm:text-lg">
              Reach out for product support, partnerships, or anything else on your mind.
              Your message goes straight into the team&apos;s contact queue.
            </p>

            <div className="mt-10 grid gap-4">
              {CONTACT_REASONS.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.6)]"
                >
                  <p className="text-sm font-semibold text-white">{reason.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/55">{reason.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_40px_100px_-42px_rgba(0,0,0,0.85)] sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/45">
                Send a message
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-white">
                We&apos;ll route it to the right person.
              </h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
