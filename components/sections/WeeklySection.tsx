import type { ReactNode } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import PhoneFrame from "@/components/ui/PhoneFrame";

/**
 * Helthy Weekly: five pages of a sample issue, rebuilt from the app's
 * yearbook pages (helthy_app/mobile/components/insights/issue/yearbook) with
 * their real palettes, type scale and copy templates. Sizes are the app's
 * point sizes converted to container units against a 390pt-wide screen
 * (1pt = 0.2564cqw), so every page scales with its phone.
 *
 * These are app mockups, so they keep the app's own colours, not site tokens.
 */

type Palette = { bg: string; ink: string; inkSoft: string; accent: string };

// From palettePicker.ts POOL
const LIME: Palette = { bg: "#CDFB50", ink: "#0A0A0A", inkSoft: "#1A1A1A99", accent: "#FF3D8A" };
const ULTRAVIOLET: Palette = { bg: "#5B4DFF", ink: "#FAFAF7", inkSoft: "#FFFFFFB3", accent: "#CDFB50" };
const YELLOW: Palette = { bg: "#FFD400", ink: "#0A0A0A", inkSoft: "#0A0A0A99", accent: "#2855FF" };
const NAVY: Palette = { bg: "#102A56", ink: "#F4EFE6", inkSoft: "#F4EFE6B3", accent: "#FFB940" };
const PINK: Palette = { bg: "#FF3D8A", ink: "#FAFAF7", inkSoft: "#FFFFFFB3", accent: "#CDFB50" };

/** YearbookPage chrome: full-bleed colour, eyebrow under the status bar. */
function Page({ p, eyebrow, children }: { p: Palette; eyebrow?: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col px-[7.2cqw] pb-[10cqw] pt-[20cqw]" style={{ background: p.bg, color: p.ink }}>
      {eyebrow && (
        <p className="font-heading text-[3.1cqw] uppercase tracking-[0.13em]" style={{ color: p.inkSoft }}>
          {eyebrow}
        </p>
      )}
      <div className="my-auto">{children}</div>
    </div>
  );
}

function Rows({ p, rows }: { p: Palette; rows: [string, string][] }) {
  return (
    <div className="mt-[6cqw]">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-baseline justify-between gap-[3cqw] border-t py-[2.6cqw]"
          style={{ borderColor: p.inkSoft }}
        >
          <span className="font-body text-[3.3cqw] uppercase tracking-[0.06em]" style={{ color: p.inkSoft }}>
            {label}
          </span>
          <span className="font-heading text-[4.4cqw] tabular-nums">{value}</span>
        </div>
      ))}
    </div>
  );
}

const PAGES: { caption: string; screen: ReactNode }[] = [
  {
    caption: "The cover",
    screen: (
      <Page p={LIME}>
        <p className="font-body text-[20.5cqw] font-bold leading-[0.98] tracking-[-0.04em]">
          THE
          <br />
          HELTHY
          <br />
          WEEKLY.
        </p>
        <span
          className="mt-[6cqw] inline-block -rotate-3 px-[3cqw] py-[1.4cqw] font-heading text-[3.6cqw] uppercase tracking-[0.15em]"
          style={{ background: LIME.accent, color: LIME.bg }}
        >
          Issue No. 22
        </span>
        <div className="mt-[24cqw] h-px" style={{ background: LIME.ink }} />
        <p className="mt-[2cqw] font-heading text-[3.1cqw] uppercase tracking-[0.15em]" style={{ color: LIME.inkSoft }}>
          Sep 21 – Sep 27
        </p>
      </Page>
    ),
  },
  {
    caption: "Your biggest win",
    screen: (
      <Page p={ULTRAVIOLET} eyebrow="Week 22 · your biggest win">
        <p className="font-body text-[5.6cqw]" style={{ color: ULTRAVIOLET.inkSoft }}>
          Most likely to
        </p>
        <p className="mt-[2cqw] font-body text-[15cqw] font-bold leading-[1.02] tracking-[-0.04em]">
          NAIL THE PROTEIN
        </p>
        <p className="mt-[5cqw] max-w-[85%] font-body text-[4.9cqw] leading-snug" style={{ color: ULTRAVIOLET.inkSoft }}>
          You hit your protein target 6 of 7 days and averaged 148g a day.
        </p>
        <p className="mt-[6cqw] font-heading text-[24.6cqw] leading-none tracking-[-0.04em]" style={{ color: ULTRAVIOLET.accent }}>
          6
        </p>
        <p className="mt-[1.5cqw] font-body text-[4.4cqw]">days on protein · 148g average</p>
      </Page>
    ),
  },
  {
    caption: "A quiet win",
    screen: (
      <Page p={YELLOW} eyebrow="Week 22 · meals">
        <p className="-ml-[1.5cqw] font-heading text-[27cqw] leading-none tracking-[-0.05em] tabular-nums">148</p>
        <p className="mt-[2cqw] font-body text-[4.4cqw]">g protein a day</p>
        <Rows
          p={YELLOW}
          rows={[
            ["Protein days", "6 of 7"],
            ["Calorie accuracy", "94%"],
            ["Your go-to food", "Greek yogurt (5x)"],
          ]}
        />
      </Page>
    ),
  },
  {
    caption: "Weight",
    screen: (
      <Page p={NAVY} eyebrow="Week 22 · weight">
        <p className="font-body text-[5.6cqw]" style={{ color: NAVY.inkSoft }}>
          On the scale
        </p>
        <p className="mt-[1cqw] font-heading text-[24cqw] leading-[1.1] tracking-[-0.04em] tabular-nums" style={{ color: NAVY.accent }}>
          −1.4
        </p>
        <p className="font-body text-[4.4cqw]">lb this week</p>
        <Rows
          p={NAVY}
          rows={[
            ["Started the week", "182.6 lb"],
            ["Ended the week", "181.2 lb"],
            ["Recent pace", "−1.1 lb a week"],
          ]}
        />
      </Page>
    ),
  },
  {
    caption: "An honest look",
    screen: (
      <Page p={PINK} eyebrow="Week 22 · training">
        <p className="font-body text-[5.6cqw]" style={{ color: PINK.inkSoft }}>
          The honest look
        </p>
        <p className="mt-[2cqw] font-body text-[15cqw] font-bold leading-[1.02] tracking-[-0.04em]">
          ONE SESSION SHORT
        </p>
        <p className="mt-[5cqw] max-w-[88%] font-body text-[4.9cqw] leading-snug" style={{ color: PINK.inkSoft }}>
          You trained 3 of your 4 planned days, so 1 session went unused. Get that one in next week and the picture
          changes.
        </p>
      </Page>
    ),
  },
];

export default function WeeklySection() {
  return (
    <section id="weekly" className="section overflow-hidden">
      <div className="container-page">
        <SectionHeading
          eyebrow="Helthy Weekly"
          title="Your week, as a"
          italicTail="magazine"
          subtitle="Every Sunday a new issue lands in the app: your week told in full-screen pages, from your biggest win to an honest look at what slipped."
        />
      </div>

      {/* Five pages of a sample issue. Scrolls sideways on small screens. */}
      <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:justify-center md:gap-5 md:overflow-visible">
        {PAGES.map((page) => (
          <figure key={page.caption} className="w-[min(58vw,210px)] shrink-0 snap-center md:w-[clamp(160px,15vw,210px)]">
            <PhoneFrame>{page.screen}</PhoneFrame>
            <figcaption className="mt-3 text-center text-[13px] text-fg-subtle">{page.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="container-page">
        <ul className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-x-6 gap-y-2 text-center text-[14px] text-fg-muted sm:flex-row sm:flex-wrap sm:justify-center">
          <li>New issue every Sunday</li>
          <li aria-hidden="true" className="hidden text-fg-subtle sm:block">·</li>
          <li>Share any issue as a story card</li>
          <li aria-hidden="true" className="hidden text-fg-subtle sm:block">·</li>
          <li>This week&apos;s issue is free, back issues with Pro</li>
        </ul>
      </div>
    </section>
  );
}
