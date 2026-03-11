"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're in! Check your inbox.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(
          data.error || data.errors?.fieldErrors?.email?.[0] || "Something went wrong."
        );
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-helthy-lemon px-6 py-16 sm:px-16 sm:py-20 text-center">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/[0.08]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-black/[0.04]" />

          <div className="relative z-10 mx-auto max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-black/[0.06] text-[11px] font-medium tracking-[0.15em] uppercase text-helthy-black mb-5">
              Newsletter
            </span>
            <h2 className="font-heading font-light text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-helthy-black mb-4">
              <span className="text-italics">Stay</span> in the{" "}
              <span className="accent-serif">loop.</span>
            </h2>
            <p className="text-base text-black/50 max-w-md mx-auto leading-relaxed mb-10">
              Product updates, new features, and health tips — straight to your
              inbox. No spam, ever.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                required
                disabled={status === "loading" || status === "success"}
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/80 border border-black/[0.08] text-sm text-helthy-black placeholder-black/30 outline-none transition-colors focus:border-black/20 focus:bg-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-helthy-black text-helthy-lemon text-sm font-medium hover:bg-black transition-colors disabled:opacity-50 cursor-pointer shrink-0"
              >
                {status === "loading" && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {status === "success" && <Check className="w-4 h-4" />}
                {status === "idle" || status === "error" ? (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : status === "loading" ? (
                  "Subscribing…"
                ) : (
                  "Subscribed!"
                )}
              </button>
            </form>

            {message && (
              <p
                className={`text-sm mt-4 ${
                  status === "success" ? "text-helthy-black font-medium" : "text-red-700"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-[11px] text-black/25 mt-6">
              Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
