import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Contact – Helthy",
  description:
    "Get in touch with the Helthy team. We'd love to hear from you.",
  openGraph: {
    title: "Contact – Helthy",
    description: "Get in touch with the Helthy team.",
    url: "https://helthy.app/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="section-padding pt-36 sm:pt-44">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-eyebrow mb-3">Contact</p>
            <h1 className="text-display-lg mb-4">
              Let&apos;s <span className="text-helthy-lemon">talk.</span>
            </h1>
            <p className="text-body-lg">
              Bug report, feature request, or just want to say hi — we read
              every message.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-10">
            <ContactForm />
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-white/30">
              You can also reach us at{" "}
              <a
                href="mailto:support@helthy.app"
                className="text-helthy-lemon hover:underline"
              >
                support@helthy.app
              </a>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
