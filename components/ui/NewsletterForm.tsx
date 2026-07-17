"use client";

import { useCallback, useState } from "react";
import TurnstileWidget from "@/components/ui/TurnstileWidget";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
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
        className="flex items-stretch w-full max-w-[380px] rounded-full overflow-hidden transition-colors"
        style={{
          background: "rgba(10,10,10,0.06)",
          border: "1px solid rgba(10,10,10,0.14)",
        }}
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address"
          placeholder="you@email.com"
          disabled={status === "loading" || status === "success"}
          className="flex-1 bg-transparent outline-none px-4 py-2.5 text-[13px] placeholder:text-black/40 disabled:opacity-60"
          style={{ color: "#101012", minWidth: 0 }}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success" || !email}
          className="inline-flex items-center justify-center px-5 text-[13px] font-medium transition-all disabled:cursor-not-allowed"
          style={{
            background: "#101012",
            color: "#CDFF50",
            opacity: status === "loading" || !email ? 0.6 : 1,
          }}
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
      <div className="mt-2">
        <TurnstileWidget onToken={onToken} theme="light" />
      </div>

      {/* Inline status */}
      <p
        className="mt-2 text-[12px]"
        style={{
          color:
            status === "error"
              ? "#B00020"
              : status === "success"
                ? "rgba(10,10,10,0.75)"
                : "rgba(10,10,10,0.55)",
          minHeight: 16,
        }}
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
