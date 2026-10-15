"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSegmentedThumb } from "@/components/ui/Segmented";
import { useAdminNav } from "@/components/admin/AdminNav";

export const TABS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/features", label: "Features" },
  { href: "/admin/screens", label: "Screens" },
  { href: "/admin/devices", label: "Devices" },
  { href: "/admin/people", label: "People" },
] as const;

/** Section pills. They keep the chosen time window and slide like the site's toggles. */
export default function AdminTabs() {
  const pathname = usePathname();
  const days = useSearchParams().get("days");
  const { go } = useAdminNav();
  const ref = useSegmentedThumb<HTMLElement>();
  // The pill moves on click, before the page has loaded
  const [current, setCurrent] = useState(pathname);
  useEffect(() => setCurrent(pathname), [pathname]);

  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
      <nav ref={ref} aria-label="Dashboard sections" className="segmented">
        {TABS.map((t) => {
          const href = days ? `${t.href}?days=${days}` : t.href;
          return (
            <Link
              key={t.href}
              href={href}
              aria-current={current === t.href ? "page" : undefined}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                setCurrent(t.href);
                go(href);
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
