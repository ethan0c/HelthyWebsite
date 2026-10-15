"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

export default function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="mt-8 space-y-5">
      <input type="hidden" name="next" value={next ?? ""} />
      <div>
        <label htmlFor="user" className="mb-2 block text-[14px] font-medium text-fg-muted">
          Username
        </label>
        <input
          id="user"
          name="user"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          autoFocus
          // React resets the form after each attempt; this keeps the username
          defaultValue={state.user}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-[14px] font-medium text-fg-muted">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? "true" : "false"}
          aria-describedby={state.error ? "login-error" : undefined}
          className="input"
        />
      </div>

      <p id="login-error" role="alert" className="min-h-5 text-sm text-danger">
        {state.error}
      </p>

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
