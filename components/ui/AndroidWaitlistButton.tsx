"use client";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.helthy.mobile";

export default function AndroidWaitlistButton({
  size = "md",
}: {
  size?: "sm" | "md";
}) {
  const s =
    size === "sm"
      ? { padY: 6, padL: 16, padR: 6, font: 13, chip: 22, icon: 13 }
      : { padY: 8, padL: 22, padR: 8, font: 15, chip: 28, icon: 16 };

  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Helthy on Google Play"
      className="group hover:scale-[1.02]"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? 10 : 12,
        borderRadius: 999,
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: s.font,
        letterSpacing: "-0.005em",
        padding: `${s.padY}px ${s.padR}px ${s.padY}px ${s.padL}px`,
        whiteSpace: "nowrap",
        background: "rgba(20,20,20,0.62)",
        color: "#FFFFFF",
        border: "1.5px solid rgba(46,46,48,0.9)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06)," +
          "0 8px 24px rgba(0,0,0,0.3)",
        transition:
          "transform 220ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms ease",
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      {/* Google Play triangle icon */}
      <svg
        width={s.icon - 2}
        height={s.icon - 2}
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.332a1 1 0 0 1 0 1.72L17.698 13.892l-2.467-2.467 2.467-2.467zM5.864 3.458L16.801 9.79l-2.302 2.302-8.635-8.635z"
          fill="currentColor"
        />
      </svg>
      <span>Google Play</span>
      <span
        className="flex items-center justify-center shrink-0"
        style={{
          width: s.chip,
          height: s.chip,
          borderRadius: 999,
          background: "rgba(255,255,255,0.14)",
        }}
      >
        <svg
          width={s.icon - 2}
          height={s.icon - 2}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 17L17 7M17 7H8M17 7V16"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
