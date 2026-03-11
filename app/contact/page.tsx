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
      <section className="relative section-padding pt-36 sm:pt-44 glow-center">
        <div className="relative z-10 mx-auto max-w-2xl px-5 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">Contact</p>
            <h1 className="font-heading font-light text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-white mb-4">
              <span className="text-italics">Let&apos;s</span> <span className="text-helthy-lemon">talk.</span>
            </h1>
            <p className="text-base text-white/35 leading-relaxed">
              Bug report, feature request, or just want to say hi — we read
              every message.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-10">
            <ContactForm />
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-white/25">
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
