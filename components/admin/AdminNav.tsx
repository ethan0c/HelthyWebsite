"use client";

import { createContext, useContext, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";

/**
 * Keeps the dashboard on screen while a new time window loads: navigation
 * runs in a transition, and the content dims instead of being swapped for
 * the loading skeleton.
 */
const Nav = createContext<{ pending: boolean; go: (href: string) => void }>({
  pending: false,
  go: () => {},
});

export function AdminNavProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const go = (href: string) => start(() => router.push(href, { scroll: false }));
  return <Nav.Provider value={{ pending, go }}>{children}</Nav.Provider>;
}

export const useAdminNav = () => useContext(Nav);

export function PendingContent({ children }: { children: ReactNode }) {
  const { pending } = useAdminNav();
  return (
    <div
      aria-busy={pending}
      className={`transition-opacity duration-150 ${pending ? "pointer-events-none opacity-50" : ""}`}
    >
      {children}
    </div>
  );
}
