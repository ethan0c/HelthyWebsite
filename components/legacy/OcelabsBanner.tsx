import Link from "next/link";

type OcelabsBannerProps = {
  variant?: "fixed" | "inline" | "button";
  label?: string;
  className?: string;
};

export default function OcelabsBanner({ variant = "fixed", label, className }: OcelabsBannerProps) {
  const basePill = (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full",
        variant === "button"
          ? "px-8 py-6 text-base shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/15 transition-all"
          : "px-2.5 py-1.5 text-xs shadow-[0_12px_30px_rgba(0,0,0,0.35)] border border-white/15 bg-black/30 backdrop-blur-md",
        "ring-1 ring-helthy-lemon/20",
        className || "",
      ].join(" ")}
    >
      {/* Brand accent */}
      <span className={variant === "button" ? "inline-flex h-10 w-10 items-center justify-center rounded-full bg-helthy-lemon" : "inline-flex h-5 w-5 items-center justify-center rounded-full bg-helthy-lemon"}>
        <img src="/figma-components/hero/logo.png" alt="Helthy" className={variant === "button" ? "h-5 w-5" : "h-3.5 w-3.5"} />
      </span>

      {/* Label / Links */}
      {variant === "button" ? (
        <span className="text-white font-medium">{label || "Our Core Features"}</span>
      ) : (
        <>
          <a
            href="https://ocelabs.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-white transition-colors"
          >
            {label || "Built by Ocelabs"}
          </a>
          {variant === "fixed" && (
            <>
              <span className="mx-1 inline-block h-1 w-1 rounded-full bg-white/30" aria-hidden />
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-helthy-lemon text-helthy-black px-2.5 py-1 font-medium hover:bg-helthy-lemon/90"
              >
                Home
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );

  if (variant === "fixed") {
    return (
      <div
        className="fixed z-40 left-1/2 -translate-x-1/2"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 14px)" }}
        aria-label="Built by Ocelabs banner"
      >
        {basePill}
      </div>
    );
  }

  // inline or button variants render without fixed positioning
  return <div aria-label="Ocelabs banner">{basePill}</div>;
}
