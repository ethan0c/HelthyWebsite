"use client";

import { useCallback, useState } from "react";
import TurnstileWidget from "@/components/ui/TurnstileWidget";

type ContactResponse = {
  ok: boolean;
  message?: string;
  error?: string;
  details?: {
    fieldErrors?: Record<string, string[] | undefined>;
  };
};

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
  form?: string;
};

const INITIAL_ERRORS: FieldErrors = {};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>(INITIAL_ERRORS);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const onToken = useCallback((token: string) => setTurnstileToken(token), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
      turnstileToken: turnstileToken ?? undefined,
    };

    setIsSubmitting(true);
    setIsSuccess(false);
    setFeedback("");
    setFieldErrors(INITIAL_ERRORS);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.ok) {
        const nextErrors: FieldErrors = {
          name: result.details?.fieldErrors?.name?.[0],
          email: result.details?.fieldErrors?.email?.[0],
          message: result.details?.fieldErrors?.message?.[0],
          form: result.error ?? "Something went wrong. Please try again.",
        };

        setFieldErrors(nextErrors);
        setFeedback(nextErrors.form ?? "Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);
      setFeedback(result.message ?? "Thanks for reaching out! We'll get back to you soon.");
      form.reset();
    } catch {
      setFieldErrors({
        form: "We couldn't send your message right now. Please try again in a moment.",
      });
      setFeedback("We couldn't send your message right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — bots fill, humans don't see it */}
      <input
        type="text"
        name="website"
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          type="text"
          autoComplete="name"
          error={fieldErrors.name}
          placeholder="Your name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={fieldErrors.email}
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/82">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          maxLength={5000}
          placeholder="Tell us how we can help."
          aria-invalid={fieldErrors.message ? "true" : "false"}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className="w-full rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-4 text-[15px] text-white placeholder:text-white/30 transition-colors outline-none focus:border-helthy-lemon/60"
        />
        {fieldErrors.message ? (
          <p id="message-error" className="mt-2 text-sm text-[#ff8f8f]">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {/* Invisible Turnstile (emits a token automatically) */}
      <TurnstileWidget onToken={onToken} theme="dark" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary min-w-[180px] justify-center text-sm disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>

        <p
          className={`text-sm ${
            isSuccess ? "text-helthy-lemon" : feedback ? "text-[#ffb6b6]" : "text-white/45"
          }`}
          aria-live="polite"
        >
          {feedback || "We usually reply within 1-2 business days."}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type,
  autoComplete,
  placeholder,
  error,
}: {
  id: "name" | "email";
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/82">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-3.5 text-[15px] text-white placeholder:text-white/30 transition-colors outline-none focus:border-helthy-lemon/60"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#ff8f8f]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
