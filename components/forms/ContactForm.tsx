"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details?.fieldErrors) {
          // Handle zod validation errors
          setFieldErrors(data.details.fieldErrors);
        }
        throw new Error(data.error || "Failed to submit form");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-helthy-lemon to-green-400 opacity-20 blur-xl animate-in fade-in zoom-in duration-500" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-helthy-lemon to-green-400 animate-in fade-in zoom-in duration-700 shadow-[0_0_30px_rgba(189,224,59,0.5)]" />
          <div className="relative rounded-full bg-gradient-to-br from-helthy-lemon to-green-400 p-5 animate-in zoom-in duration-500">
            <Check className="w-10 h-10 text-helthy-black animate-in zoom-in duration-700 delay-150" strokeWidth={3} />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-helthy-lemon/30 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <p className="text-xl font-medium text-white">Thanks for reaching out!</p>
          <p className="text-white/70">We'll get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-white">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isSubmitting}
          className="block w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none ring-0 transition focus:border-helthy-lemon disabled:opacity-50"
          placeholder="Jane Doe"
        />
        {fieldErrors.name && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-white">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={isSubmitting}
          className="block w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none ring-0 transition focus:border-helthy-lemon disabled:opacity-50"
          placeholder="jane@domain.com"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-white">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          disabled={isSubmitting}
          className="block min-h-32 w-full resize-y rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none ring-0 transition focus:border-helthy-lemon disabled:opacity-50"
          placeholder="How can we help?"
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-full bg-helthy-lemon px-6 py-3 text-sm font-medium text-helthy-black shadow-[0_6px_0_rgba(0,0,0,0.2)] transition-colors hover:bg-helthy-lemon/90 disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
