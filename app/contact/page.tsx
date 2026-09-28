import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Helthy team about support, partnerships, or product questions.",
  alternates: { canonical: "https://helthy.app/contact" },
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
      <main className="theme-light relative bg-canvas text-fg">
        <section className="container-page pb-24 pt-32 lg:pt-40">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <h1 className="max-w-xl text-display-xl text-fg">
                Let&apos;s make your next move{" "}
                <span className="text-highlight">clear</span>
              </h1>
              <p className="mt-6 max-w-lg text-lede">
                Reach out for product support, partnerships, or anything else on your mind.
                Your message goes straight into the team&apos;s contact queue.
              </p>

              <div className="mt-10 grid gap-3">
                {CONTACT_REASONS.map((reason) => (
                  <div key={reason.title} className="card p-5">
                    <p className="text-title">{reason.title}</p>
                    <p className="mt-1.5 text-[15px] leading-6 text-fg-muted">{reason.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 sm:p-8">
              <h2 className="mb-8 text-xl font-semibold tracking-[-0.01em] text-fg">
                We&apos;ll route it to the right person
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
