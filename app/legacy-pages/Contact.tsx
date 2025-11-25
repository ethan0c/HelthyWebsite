import ContactForm from "../../components/forms/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-helthy-black text-white">
      <section className="relative pt-28 md:pt-36 pb-16">
        <div className="container mx-auto px-6 lg:px-20 max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm">
              Contact us
            </div>
            <h1 className="text-4xl md:text-5xl font-normal leading-[1.15] text-helthy-lemon mt-4">
              We'd love to hear from you
            </h1>
            <p className="text-white/80 mt-3">Questions, partnerships, or feedback—drop us a line.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
            <ContactForm />
          </div>

          <div className="mt-10 text-center text-white/70 text-sm">
            Prefer email? Reach us at <a href="mailto:support@helthy.app" className="underline hover:text-white">support@helthy.app</a>
          </div>
        </div>
      </section>
    </div>
  );
}
