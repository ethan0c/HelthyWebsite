import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import SiteFooter from "@/components/sections/SiteFooter";
import DownloadButton from "@/components/ui/DownloadButton";
import JsonLd from "@/components/seo/JsonLd";
import FaqItem from "@/components/ui/FaqItem";
import { absoluteUrl } from "@/lib/site";

/**
 * Building blocks for the search landing pages (/calorie-tracker, /compare,
 * /tools, /exercises …). Server components only, no scroll animation:
 * these pages exist to load fast and read cleanly.
 */

export type Crumb = { name: string; href: string };
export type Faq = { q: string; a: string };

export function SeoPage({
  crumbs,
  children,
  tone = "dark",
  closing,
}: {
  crumbs: Crumb[];
  children: ReactNode;
  /** Full-bleed block after the content, flush against the footer */
  closing?: ReactNode;
  /** "light" makes the whole page one white band (single-block pages like hubs) */
  tone?: "dark" | "light";
}) {
  return (
    <>
      <main className={`relative bg-canvas text-fg ${tone === "light" ? "theme-light" : ""}`}>
        <div className="container-page pb-24 pt-32 lg:pt-40">
          <Breadcrumbs crumbs={crumbs} />
          {children}
        </div>
        {closing}
      </main>
      <SiteFooter />
    </>
  );
}

function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...crumbs];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.href),
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-fg-subtle">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-fg-muted">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-fg transition-colors">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function PageHero({
  title,
  lede,
  children,
}: {
  title: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      <h1 className="text-display-xl text-fg">
        {title}
      </h1>
      <p className="mt-6 text-lede">
        {lede}
      </p>
      {children && <div className="mt-8">{children}</div>}
    </header>
  );
}

/** One Download button, never the store pair: that lives in the nav only. */
export { DownloadButton };

export function Section({
  title,
  intro,
  children,
  tone = "dark",
}: {
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  /** "light" renders a full-bleed light band (MacroFactor-style rhythm) */
  tone?: "dark" | "light";
}) {
  const body = (
    <>
      <h2 className="text-display-md text-fg max-w-3xl">{title}</h2>
      {intro && (
        <p className="mt-4 max-w-3xl text-base leading-7 text-fg-muted">
          {intro}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </>
  );
  if (tone === "light") {
    return (
      <section className="theme-light mt-20 mx-[calc(50%-50vw)] py-20 md:mt-24 md:py-24">
        <div className="container-page">{body}</div>
      </section>
    );
  }
  return <section className="mt-20 md:mt-24">{body}</section>;
}

/** Long-form body copy. Paragraph strings, rendered with readable measure. */
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-5 text-base leading-8 text-fg-muted">
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function FeatureGrid({
  items,
}: {
  items: { title: string; body: string; pro?: boolean }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <div key={f.title} className="card p-6">
          <h3 className="text-title flex items-center gap-2">
            {f.title}
            {f.pro && (
              <span className="badge badge-accent">Premium</span>
            )}
          </h3>
          <p className="mt-2 text-[15px] leading-6 text-fg-muted">{f.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {items.map((s, i) => (
        <li key={s.title} className="card p-6">
          <span className="text-numeric text-[15px] text-fg-subtle">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-title mt-4">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-6 text-fg-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Screenshot({
  src,
  alt,
  width,
  height,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(min-width: 768px) 320px, 70vw"
      className="h-auto w-full max-w-[320px] rounded-3xl border border-line"
    />
  );
}

/** Two-column comparison table. `true`/`false` render as check / dash. */
export function CompareTable({
  columns,
  rows,
  highlightFirst = true,
}: {
  columns: [string, string, string];
  rows: { label: string; values: [ReactNode, ReactNode] }[];
  /** Emphasise the first value column (Helthy on comparison pages) */
  highlightFirst?: boolean;
}) {
  const cell = (v: ReactNode) =>
    v === true ? (
      <span className="text-fg" aria-label="Yes">✓</span>
    ) : v === false ? (
      <span className="text-fg-subtle" aria-label="No">—</span>
    ) : (
      v
    );
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-[15px]">
        <thead>
          <tr className="border-b border-line text-fg-subtle">
            {columns.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`px-5 py-4 text-[14px] font-medium ${highlightFirst && i === 1 ? "text-fg" : ""}`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line last:border-0">
              <th scope="row" className="px-5 py-4 font-normal text-fg-muted">
                {r.label}
              </th>
              <td className="px-5 py-4 text-fg">{cell(r.values[0])}</td>
              <td className={`px-5 py-4 ${highlightFirst ? "text-fg-muted" : "text-fg"}`}>{cell(r.values[1])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** FAQ accordion (native <details> rows), plus FAQPage structured data. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </>
  );
}

export function LinkGrid({
  links,
  columns = 3,
}: {
  links: { href: string; title: string; body?: string }[];
  /** 2 keeps an even set of four from leaving one card on its own row */
  columns?: 2 | 3;
}) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="card card-hover block p-5"
        >
          <span className="text-title text-[15px]">
            {l.title} <span aria-hidden="true" className="nudge">→</span>
          </span>
          {l.body && <span className="mt-1.5 block text-[14px] leading-6 text-fg-muted">{l.body}</span>}
        </Link>
      ))}
    </div>
  );
}

/**
 * Closing download band, full width and flush against the footer. Goes in
 * SeoPage's `closing` slot. Its tone is the opposite of the page's, so it
 * always reads as a new band: light on dark pages, dark on light pages.
 * Text only: the heading sits left, the line and store buttons right.
 */
export function DownloadBanner({
  title = "Track it all in one free app",
  body = "Calories, macros, workouts, weight and an AI coach that sees all of it. Free forever, with Helthy Premium when you want the AI extras.",
  tone = "light",
}: {
  title?: string;
  body?: string;
  tone?: "light" | "dark";
}) {
  return (
    <section className={tone === "light" ? "theme-light" : "theme-dark"}>
      <div className="container-page grid items-end gap-6 py-20 md:grid-cols-2 md:gap-16 md:py-24">
        <h2 className="max-w-xl text-display-lg text-fg">{title}</h2>
        <div>
          <p className="max-w-lg text-base leading-7 text-fg-muted">{body}</p>
          <div className="mt-8">
            <DownloadButton />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Standard metadata for an SEO page: canonical, OG and Twitter all agree. */
export function seoMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  /** Page-specific OG/Twitter image, e.g. "/videos/app/food-log-poster.jpg". Falls back to the global OG image when omitted. */
  image?: string;
}) {
  const url = absoluteUrl(path);
  const images = image ? [absoluteUrl(image)] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" as const, ...(images && { images }) },
    twitter: { card: "summary_large_image" as const, title, description, ...(images && { images }) },
  };
}
