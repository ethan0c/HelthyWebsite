import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import SiteFooter from "@/components/sections/SiteFooter";
import CTAButton from "@/components/ui/CTAButton";
import JsonLd from "@/components/seo/JsonLd";
import { APP_STORE_URL, PLAY_STORE_URL, absoluteUrl } from "@/lib/site";

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
}: {
  crumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <>
      <main className="relative overflow-hidden bg-background text-white">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[520px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 50% 0%, rgba(205,251,80,0.07), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8 lg:pt-40">
          <Breadcrumbs crumbs={crumbs} />
          {children}
        </div>
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
        <ol className="flex flex-wrap items-center gap-2 text-[12px] text-white/45">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-white/70">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-white transition-colors">
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
      <h1
        className="font-heading text-white"
        style={{
          fontSize: "clamp(34px, 5.2vw, 60px)",
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
        }}
      >
        {title}
      </h1>
      <p className="mt-6 text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
        {lede}
      </p>
      {children && <div className="mt-8">{children}</div>}
    </header>
  );
}

export function StoreButtons() {
  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <CTAButton href={APP_STORE_URL} variant="primary">
        Download on iOS
      </CTAButton>
      <CTAButton href={PLAY_STORE_URL} variant="secondary">
        Get it on Android
      </CTAButton>
    </div>
  );
}

export function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="mt-20 md:mt-24">
      <h2 className="text-display-md text-white max-w-3xl">{title}</h2>
      {intro && (
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/65 sm:text-base">
          {intro}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}

/** Long-form body copy. Paragraph strings, rendered with readable measure. */
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-5 text-[15px] leading-7 text-white/70 sm:text-base sm:leading-8">
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
        <div key={f.title} className="card-helthy p-6">
          <h3 className="flex items-center gap-2 text-[16px] font-medium tracking-tight text-white">
            {f.title}
            {f.pro && (
              <span className="rounded-full border border-helthy-lemon/30 bg-helthy-lemon/10 px-2 py-0.5 text-[11px] font-semibold text-helthy-lemon">
                Pro
              </span>
            )}
          </h3>
          <p className="mt-3 text-[14px] leading-6 text-white/60">{f.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {items.map((s, i) => (
        <li key={s.title} className="card-helthy p-6">
          <span className="text-numeric text-[36px] leading-none text-helthy-lemon/80">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-[16px] font-medium tracking-tight text-white">{s.title}</h3>
          <p className="mt-2 text-[14px] leading-6 text-white/60">{s.body}</p>
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
      className="h-auto w-full max-w-[320px] rounded-[28px] border border-white/10"
    />
  );
}

/** Two-column comparison table. `true`/`false` render as check / dash. */
export function CompareTable({
  columns,
  rows,
}: {
  columns: [string, string, string];
  rows: { label: string; values: [ReactNode, ReactNode] }[];
}) {
  const cell = (v: ReactNode) =>
    v === true ? (
      <span className="text-helthy-lemon" aria-label="Yes">✓</span>
    ) : v === false ? (
      <span className="text-white/30" aria-label="No">—</span>
    ) : (
      v
    );
  return (
    <div className="card-helthy overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-white/10 text-white/50">
            {columns.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`px-5 py-4 font-medium ${i === 1 ? "text-helthy-lemon" : ""}`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-white/5 last:border-0">
              <th scope="row" className="px-5 py-4 font-normal text-white/75">
                {r.label}
              </th>
              <td className="px-5 py-4 text-white">{cell(r.values[0])}</td>
              <td className="px-5 py-4 text-white/70">{cell(r.values[1])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** FAQ list using native <details>, plus FAQPage structured data. */
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
      <div className="max-w-3xl divide-y divide-white/10 border-y border-white/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[16px] font-medium text-white [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden="true"
                className="mt-0.5 text-helthy-lemon transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-7 text-white/65">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}

export function LinkGrid({
  links,
}: {
  links: { href: string; title: string; body?: string }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="card-helthy card-helthy-hover block p-5"
        >
          <span className="text-[15px] font-medium text-white">{l.title} →</span>
          {l.body && <span className="mt-2 block text-[13px] leading-6 text-white/55">{l.body}</span>}
        </Link>
      ))}
    </div>
  );
}

export function DownloadBanner({
  title = "Track it all in one free app",
  body = "Calories, macros, workouts, weight and an AI coach that sees all of it. Free forever, with Helthy Pro when you want the AI extras.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="card-helthy-glow card-helthy mt-24 p-8 md:p-12">
      <h2 className="text-display-md text-white">{title}</h2>
      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/70">{body}</p>
      <div className="mt-8">
        <StoreButtons />
      </div>
    </section>
  );
}

/** Standard metadata for an SEO page: canonical, OG and Twitter all agree. */
export function seoMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" as const },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}
