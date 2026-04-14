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
  showNotify = true,
}: {
  size?: "sm" | "md";
  showNotify?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center sm:items-start gap-1.5">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Android coming ${LAUNCH_DATE} — join the waitlist`}
        className={`btn-secondary group ${size === "sm" ? "text-[13px]" : "text-[14px] sm:text-[15px]"}`}
        style={{
          cursor: "pointer",
          opacity: 0.72,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.332a1 1 0 0 1 0 1.72L17.698 13.892l-2.467-2.467 2.467-2.467zM5.864 3.458L16.801 9.79l-2.302 2.302-8.635-8.635z" fill="currentColor" />
        </svg>
        Coming to Android
      </button>

      {showNotify && (
        <a
          href="/#pricing"
          className="inline-flex items-center gap-1 text-[12px] text-white/55 hover:text-white/85 transition-colors"
        >
          Notify me
          <span aria-hidden="true">→</span>
        </a>
      )}

      {open && (
        <AndroidWaitlistModal launchDate={LAUNCH_DATE} onClose={() => setOpen(false)} />
      )}
    </div>
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
