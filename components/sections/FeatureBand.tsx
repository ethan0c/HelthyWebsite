import type { ReactNode } from "react";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * One product feature per band (the MacroFactor / Hevy pattern): heading,
 * a short line, up to three points, and one visual. `reverse` puts the
 * visual on the left so consecutive bands alternate sides.
 */
export default function FeatureBand({
  id,
  tone,
  eyebrow,
  title,
  accent,
  lede,
  points,
  footnote,
  visual,
  reverse = false,
}: {
  id: string;
  tone: "dark" | "light";
  eyebrow?: string;
  title: string;
  accent?: string;
  lede: string;
  points: string[];
  footnote?: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section id={id} className={`section ${tone === "light" ? "theme-light" : ""}`}>
      <div className="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className={reverse ? "md:order-2" : ""}>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            italicTail={accent}
            subtitle={lede}
            align="left"
            className="mb-8 md:mb-8"
          />
          <ul className="grid gap-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-base leading-7 text-fg-muted">
                <Check aria-hidden="true" className="mt-1.5 h-4 w-4 shrink-0 text-fg" strokeWidth={2.5} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {footnote && <p className="mt-6 text-[14px] text-fg-subtle">{footnote}</p>}
        </div>
        <div className={`flex justify-center ${reverse ? "md:order-1" : ""}`}>{visual}</div>
      </div>
    </section>
  );
}
