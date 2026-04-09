/**
 * "As featured in / Trusted by" marquee strip.
 *
 * NOTE: Using fake placeholder logos for now — DO NOT LIE about press
 * coverage. Replace with real outlets when available.
 *
 * TODO(user): Drop real press logos in /public/logos/press/ and update
 * the LOGOS array below.
 */
const LOGOS = [
  "Product Hunt",
  "TechCrunch",
  "The Verge",
  "Lifehacker",
  "9to5Mac",
  "MacStories",
  "Wired",
  "Engadget",
];

export default function LogoStrip() {
  return (
    <section
      aria-label="Featured in"
      className="relative py-14 border-y border-white/[0.05] bg-[#080808]"
    >
      <p className="text-center text-eyebrow text-white/40 mb-8 px-6">
        {/* TODO(user): replace with real press attribution */}
        As loved by 2,000+ users worldwide
      </p>
      <div className="overflow-hidden">
        <div
          className="flex gap-14 whitespace-nowrap animate-marquee"
          style={{ ["--marquee-duration" as string]: "40s" }}
        >
          {[...LOGOS, ...LOGOS, ...LOGOS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-lg lg:text-xl font-medium text-white/35 hover:text-white/60 transition-colors tracking-tight"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
