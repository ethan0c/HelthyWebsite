"use client";

import { useCallback, useState } from "react";
import TurnstileWidget from "@/components/ui/TurnstileWidget";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  // Load the bot check only once someone starts on the form, so pages that
  // show the footer signup don't pay for the third-party script up front.
  const [armed, setArmed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onToken = useCallback((token: string) => setTurnstileToken(token), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          website,
          turnstileToken: turnstileToken ?? undefined,
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
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      {/* Honeypot — bots fill, humans don't see it */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10000px] h-px w-px opacity-0"
      />
      <div className="flex w-full max-w-[440px] flex-col gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setArmed(true)}
          required
          aria-label="Email address"
          placeholder="you@email.com"
          disabled={status === "loading" || status === "success"}
          className="input min-w-0 rounded-full sm:flex-1 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success" || !email}
          className="btn-primary shrink-0"
          aria-label="Subscribe"
        >
          {status === "loading"
            ? "…"
            : status === "success"
              ? "Thanks ✓"
              : "Subscribe"}
        </button>
      </div>

      {/* Invisible Turnstile (emits a token automatically) */}
      {armed && (
        <div className="mt-2">
          <TurnstileWidget onToken={onToken} theme="dark" />
        </div>
      )}

      {/* Inline status */}
      <p
        className={`mt-2 min-h-4 text-[13px] ${
          status === "error"
            ? "font-medium text-danger"
            : status === "success"
              ? "text-accent-ink"
              : "text-fg-subtle"
        }`}
        role={status === "error" ? "alert" : undefined}
        aria-live="polite"
      >
        {status === "error"
          ? errorMsg
          : status === "success"
            ? "You're in. Check your inbox."
            : "One good thing a month. No spam."}
      </p>
    </form>
  );
}
