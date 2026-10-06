"use client";

import { useFormStatus } from "react-dom";
import { logout } from "@/app/admin/actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-secondary btn-sm">
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}

export default function SignOutButton() {
  return (
    <form action={logout}>
      <Submit />
    </form>
  );
}
