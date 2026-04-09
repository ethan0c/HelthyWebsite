"use client";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const PLATFORMS = [
  {
    id: "ios",
    label: "App Store",
    rotate: 2,
    href: APP_STORE_URL,
    icon: (
      <svg width="28" height="28" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
        <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" />
      </svg>
    ),
  },
  {
    id: "android",
    label: "Google Play",
    rotate: -2,
    href: "https://play.google.com/store/apps/details?id=com.helthy.app",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 0 1-.61-1.21V3.024c0-.483.23-.912.609-1.21zm10.89 10.893l2.302 2.302-9.937 5.613 7.635-7.915zm3.199-1.578c.47.272.76.77.76 1.307a1.5 1.5 0 0 1-.76 1.307l-1.754.991-2.536-2.536 2.536-2.536 1.754.467zm-12.235-9.95l9.937 5.613-2.302 2.302-7.635-7.915z" />
      </svg>
    ),
  },
  {
    id: "web",
    label: "Web App",
    rotate: 2,
    href: "https://app.helthy.com",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function LogoStrip() {
  return (
    <section
      aria-label="Available platforms"
      className="relative py-12 border-y border-white/[0.05] bg-[#080808] flex flex-col items-center gap-5"
    >
      <div className="flex items-center gap-3">
        {PLATFORMS.map((p) => (
          <a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={p.label}
            style={{
              transform: `rotate(${p.rotate}deg)`,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.65)",
              boxShadow:
                "rgba(0,0,0,0.3) 0px 4px 12px -4px, rgba(0,0,0,0.15) 0px 1px 3px -1px",
              transition: "border-color 0.2s ease, color 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,251,80,0.3)";
              (e.currentTarget as HTMLElement).style.color = "#CDFB50";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
            }}
          >
            {p.icon}
          </a>
        ))}
      </div>

      <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "-0.01em" }}>
        Available on iOS, Android &amp; Web — free forever
      </p>
    </section>
  );
}
