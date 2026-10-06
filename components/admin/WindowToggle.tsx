"use client";

import { useRouter } from "next/navigation";
import Segmented from "@/components/ui/Segmented";

const OPTIONS = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
] as const;

export default function WindowToggle({ days }: { days: number }) {
  const router = useRouter();
  return (
    <Segmented
      label="Time window for screens and events"
      options={OPTIONS}
      value={String(days) as "7" | "30" | "90"}
      onChange={(v) => router.push(`/admin?days=${v}`)}
    />
  );
}
