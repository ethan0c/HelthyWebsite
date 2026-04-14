"use client";

/**
 * Disabled-looking "Coming to Android" button with an inline waitlist modal.
 * Visually matches btn-secondary so it balances against the App Store CTA.
 */

import { useCallback, useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const LAUNCH_DATE = "April 28";

export default function AndroidWaitlistButton({
  size = "md",
}: {
  size?: "sm" | "md";
}) {
  const [open, setOpen] = useState(false);

  const s =
    size === "sm"
      ? { padY: 6, padL: 16, padR: 6, font: 13, chip: 22, icon: 13 }
      : { padY: 8, padL: 22, padR: 8, font: 15, chip: 28, icon: 16 };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Android coming ${LAUNCH_DATE} — join the waitlist`}
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
        }}
      >
        <svg width={s.icon - 2} height={s.icon - 2} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.332a1 1 0 0 1 0 1.72L17.698 13.892l-2.467-2.467 2.467-2.467zM5.864 3.458L16.801 9.79l-2.302 2.302-8.635-8.635z" fill="currentColor" />
        </svg>
        <span>Coming to Android</span>
        <span
          className="flex items-center justify-center shrink-0"
          style={{
            width: s.chip,
            height: s.chip,
            borderRadius: 999,
            background: "rgba(255,255,255,0.14)",
          }}
        >
          <svg width={s.icon - 2} height={s.icon - 2} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <AndroidWaitlistModal launchDate={LAUNCH_DATE} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

function AndroidWaitlistModal({
  launchDate,
  onClose,
}: {
  launchDate: string;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

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
            firstName: "waitlist-android",
            website,
          }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
        setStatus("success");
        setEmail("");
      } catch (err) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      }
    },
    [email, website, status]
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="android-wl-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: "rgba(5,5,5,0.72)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[440px] rounded-[24px] p-8"
        style={{
          background: "#141414",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 40px 80px -20px rgba(0,0,0,0.6)," +
            "0 0 0 1px rgba(205,255,80,0.06)," +
            "0 0 60px -20px rgba(205,255,80,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/5 text-white/55 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <span
          className="inline-block text-[11px] font-semibold uppercase rounded-full px-3 py-1.5"
          style={{
            background: "rgba(205,255,80,0.12)",
            border: "1px solid rgba(205,255,80,0.35)",
            color: "#CDFF50",
            letterSpacing: "0.14em",
            fontFamily: "var(--font-body)",
          }}
        >
          Android — {launchDate}
        </span>

        <h3
          id="android-wl-title"
          className="font-heading mt-6"
          style={{
            fontSize: "clamp(26px, 3.2vw, 34px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: "1.08em",
            color: "#F9F9F9",
            margin: "22px 0 0",
          }}
        >
          We&apos;ll ping you.
        </h3>

        <p
          className="mt-3 text-[14px] leading-relaxed"
          style={{ color: "rgba(249,249,249,0.62)", fontFamily: "var(--font-body)" }}
        >
          Android drops with v2 on {launchDate}. Drop your email and we&apos;ll
          send a single link the moment it&apos;s live.
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
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999,
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              aria-label="Email address"
              placeholder="you@email.com"
              disabled={status === "loading" || status === "success"}
              className="flex-1 bg-transparent outline-none px-4 text-[13px] text-white placeholder:text-white/40 disabled:opacity-60"
              style={{ minWidth: 0, fontFamily: "var(--font-body)" }}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success" || !email}
              className="inline-flex items-center justify-center px-5 py-2 text-[13px] font-medium transition-opacity disabled:cursor-not-allowed"
              style={{
                background: "#CDFF50",
                color: "#0A0A0A",
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

          <p
            className="mt-3 text-[12px]"
            style={{
              color: status === "error" ? "#FF6B6B" : "rgba(249,249,249,0.5)",
              minHeight: 16,
            }}
            role={status === "error" ? "alert" : undefined}
            aria-live="polite"
          >
            {status === "error"
              ? errorMsg
              : status === "success"
                ? `See you on ${launchDate}.`
                : "No spam. One email on launch day."}
          </p>
        </form>
      </div>
    </div>
  );
}
