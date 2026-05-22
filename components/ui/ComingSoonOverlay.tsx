"use client";

/**
 * Blur-locks a section behind a "Dropping [date]" waitlist CTA.
 * The underlying content remains visible at a soft blur — users can
 * almost read it, which creates the "I need to know" pull.
 *
 * Usage:
 *   <ComingSoonOverlay label="Premium drops June 1" source="waitlist-pricing" />
 *
 * Place as the FIRST child of a section with `position: relative`.
 */

import { useCallback, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ComingSoonOverlay({
  label,
  source,
  theme = "dark",
  blurPx = 10,
}: {
  label: string;
  source: string;
  theme?: "light" | "dark";
  blurPx?: number;
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (status === "loading") return;

      setStatus("loading");
      setErrorMsg(null);

      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            firstName: source,
            website,
          }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) {
          throw new Error(json.error || "Something went wrong.");
        }
        setStatus("success");
        setEmail("");
      } catch (err) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      }
    },
    [email, website, status, source]
  );

  const isLight = theme === "light";
  const bgGradient = isLight
    ? "linear-gradient(180deg, rgba(242,239,235,0.55) 0%, rgba(242,239,235,0.85) 100%)"
    : "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.85) 100%)";
  const textColor = isLight ? "#0A0A0A" : "#F9F9F9";
  const subTextColor = isLight ? "rgba(10,10,10,0.6)" : "rgba(249,249,249,0.6)";
  const pillBg = isLight ? "rgba(10,10,10,0.06)" : "rgba(205,255,80,0.08)";
  const pillBorder = isLight ? "rgba(10,10,10,0.12)" : "rgba(205,255,80,0.25)";
  const pillText = isLight ? "rgba(10,10,10,0.7)" : "#CDFF50";
  const inputBg = isLight ? "rgba(10,10,10,0.06)" : "rgba(255,255,255,0.06)";
  const inputBorder = isLight ? "rgba(10,10,10,0.14)" : "rgba(255,255,255,0.14)";
  const inputText = isLight ? "#0A0A0A" : "#FFFFFF";
  const inputPlaceholder = isLight ? "rgba(10,10,10,0.4)" : "rgba(255,255,255,0.4)";
  const btnBg = isLight ? "#0A0A0A" : "#CDFF50";
  const btnText = isLight ? "#CDFF50" : "#0A0A0A";

  return (
    <>
      {/* Blur layer — applied via a sibling sitting on top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          backdropFilter: `blur(${blurPx}px)`,
          WebkitBackdropFilter: `blur(${blurPx}px)`,
          background: bgGradient,
        }}
      />

      {/* Interactive card */}
      <div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{ zIndex: 6 }}
      >
        <div className="w-full max-w-[440px] text-center">
          <span
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase rounded-full"
            style={{
              background: pillBg,
              border: `1px solid ${pillBorder}`,
              color: pillText,
              letterSpacing: "0.18em",
              fontFamily: "var(--font-body)",
              padding: "6px 14px 6px 12px",
              lineHeight: 1,
            }}
          >
            <span
              aria-hidden="true"
              className="relative inline-flex"
              style={{ width: 6, height: 6 }}
            >
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: pillText, opacity: 0.4 }}
              />
              <span
                className="relative rounded-full"
                style={{ width: 6, height: 6, background: pillText }}
              />
            </span>
            {label}
          </span>

          <h3
            className="font-heading mt-6"
            style={{
              fontSize: "clamp(26px, 3.2vw, 38px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: "1.08em",
              color: textColor,
              margin: "22px 0 0",
            }}
          >
            Get on the list.
          </h3>

          <p
            className="mx-auto mt-3 text-[14px] leading-relaxed"
            style={{ color: subTextColor, maxWidth: 360, fontFamily: "var(--font-body)" }}
          >
            Be first to unlock this when we drop — no spam, just one email on launch day.
          </p>

          <form onSubmit={handleSubmit} className="mt-6" noValidate>
            {/* Honeypot */}
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                width: 1,
                height: 1,
                opacity: 0,
                pointerEvents: "none",
              }}
            />
            <div
              className="flex items-stretch w-full overflow-hidden p-1"
              style={{
                background: inputBg,
                border: `1px solid ${inputBorder}`,
                borderRadius: 999,
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
                placeholder="you@email.com"
                disabled={status === "loading" || status === "success"}
                className="flex-1 bg-transparent outline-none px-4 text-[13px] disabled:opacity-60"
                style={{
                  color: inputText,
                  minWidth: 0,
                  fontFamily: "var(--font-body)",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success" || !email}
                className="inline-flex items-center justify-center px-5 py-2 text-[13px] font-medium transition-opacity disabled:cursor-not-allowed"
                style={{
                  background: btnBg,
                  color: btnText,
                  opacity: status === "loading" || !email ? 0.6 : 1,
                  borderRadius: 999,
                  fontFamily: "var(--font-body)",
                  letterSpacing: "-0.005em",
                }}
              >
                {status === "loading"
                  ? "…"
                  : status === "success"
                    ? "You're in ✓"
                    : "Notify me"}
              </button>
            </div>
            <style>{`input::placeholder { color: ${inputPlaceholder}; }`}</style>

            <p
              className="mt-3 text-[12px]"
              style={{
                color: status === "error" ? "#FF6B6B" : subTextColor,
                minHeight: 16,
              }}
              role={status === "error" ? "alert" : undefined}
              aria-live="polite"
            >
              {status === "error"
                ? errorMsg
                : status === "success"
                  ? "We'll email you on launch day."
                  : "Reusing your email from a previous signup is fine."}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
