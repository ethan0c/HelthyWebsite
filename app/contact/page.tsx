import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import SiteFooter from "@/components/sections/SiteFooter";

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
    <>
      <main className="relative overflow-hidden bg-background text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 55% 40% at 50% 10%, rgba(205,255,80,0.06), transparent 70%)",
          }}
        />

        <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p
                className="text-[11px] font-semibold uppercase text-white/45"
                style={{ fontFamily: "var(--font-body)", letterSpacing: "0.2em" }}
              >
                Contact Helthy
              </p>
              <h1
                className="mt-6 max-w-xl font-heading text-white"
                style={{
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 500,
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                }}
              >
                Let&apos;s make your next move{" "}
                <span className="text-helthy-lemon">clear</span>.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/62 sm:text-lg">
                Reach out for product support, partnerships, or anything else on your mind.
                Your message goes straight into the team&apos;s contact queue.
              </p>

              <div className="mt-10 grid gap-4">
                {CONTACT_REASONS.map((reason) => (
                  <div key={reason.title} className="card-helthy p-5">
                    <p className="text-sm font-semibold text-white">{reason.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/55">{reason.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-helthy p-6 sm:p-8">
              <div className="mb-8">
                <p
                  className="text-[11px] font-semibold uppercase text-white/45"
                  style={{ letterSpacing: "0.2em", fontFamily: "var(--font-body)" }}
                >
                  Send a message
                </p>
                <h2
                  className="mt-3 font-heading text-white"
                  style={{
                    fontSize: "clamp(22px, 2.4vw, 28px)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  We&apos;ll route it to the right person.
                </h2>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
