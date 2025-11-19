"use client";

import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("manvqpkz");

  if (state.succeeded) {
    return (
      <div className="space-y-4 text-center py-8">
        <div className="text-6xl">✅</div>
        <p className="text-lg font-medium text-white">Thanks for reaching out!</p>
        <p className="text-white/70">We'll get back to you soon.</p>
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
          required
          className="block w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none ring-0 transition focus:border-helthy-lemon"
          placeholder="Jane Doe"
        />
        <ValidationError 
          prefix="Name" 
          field="name" 
          errors={state.errors}
          className="mt-1 text-sm text-red-400"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-white">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="block w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none ring-0 transition focus:border-helthy-lemon"
          placeholder="jane@domain.com"
        />
        <ValidationError 
          prefix="Email" 
          field="email" 
          errors={state.errors}
          className="mt-1 text-sm text-red-400"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-white">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="block min-h-32 w-full resize-y rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none ring-0 transition focus:border-helthy-lemon"
          placeholder="How can we help?"
        />
        <ValidationError 
          prefix="Message" 
          field="message" 
          errors={state.errors}
          className="mt-1 text-sm text-red-400"
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="inline-flex items-center rounded-full bg-helthy-lemon px-6 py-3 text-sm font-medium text-helthy-black shadow-[0_6px_0_rgba(0,0,0,0.2)] transition-colors hover:bg-helthy-lemon/90 disabled:opacity-60"
      >
        {state.submitting ? "Sending…" : "Send message"}
      </button>
      {state.errors && state.errors.length > 0 && (
        <p className="text-sm text-red-400">Please fix the errors above and try again.</p>
      )}
    </form>
  );
}
