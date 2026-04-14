import NewsletterForm from "@/components/ui/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="relative"
      style={{
        backgroundColor: "#CDFF50",
        color: "#0A0A0A",
      }}
    >
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: heading + copy */}
          <div>
            <p
              className="text-[11px] font-semibold uppercase mb-5"
              style={{
                letterSpacing: "0.2em",
                color: "rgba(10,10,10,0.55)",
                fontFamily: "var(--font-body)",
              }}
            >
              Newsletter
            </p>
            <h2
              className="font-heading"
              style={{
                fontSize: "clamp(32px, 4.4vw, 56px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: "1.05em",
                color: "#0A0A0A",
                margin: 0,
              }}
            >
              One email.<br />
              Every month.
            </h2>
            <p
              className="mt-5 max-w-md"
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: "rgba(10,10,10,0.7)",
                fontFamily: "var(--font-body)",
              }}
            >
              New features, progress experiments, and what we&apos;re learning
              building Helthy. No filler, no spam.
            </p>
          </div>

          {/* Right: form */}
          <div className="md:pt-2">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
