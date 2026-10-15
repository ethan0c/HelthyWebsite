"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Segmented from "@/components/ui/Segmented";
import { useAdminNav } from "@/components/admin/AdminNav";

const OPTIONS = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
] as const;

type Value = (typeof OPTIONS)[number]["value"];

export default function WindowToggle({ days }: { days: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const { go } = useAdminNav();
  // The pill moves on click, before the new window has loaded
  const [value, setValue] = useState(String(days) as Value);
  useEffect(() => setValue(String(days) as Value), [days]);

  // Warm the other windows so switching is quick
  useEffect(() => {
    for (const o of OPTIONS) if (o.value !== String(days)) router.prefetch(`${pathname}?days=${o.value}`);
  }, [days, pathname, router]);

  return (
    <Segmented
      label="Time window"
      options={OPTIONS}
      value={value}
      onChange={(v) => {
        setValue(v);
        go(`${pathname}?days=${v}`);
      }}
    />
  );
}
