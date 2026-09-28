import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  SeoPage,
  PageHero,
  Section,
  Prose,
  FeatureGrid,
  DownloadBanner,
  seoMetadata,
} from "@/components/seo/SeoPage";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = seoMetadata({
  title: "About Helthy",
  description:
    "Helthy is made by co-founders Chibudom and Chiebuka Onyejesi, who use it every day. Why we built one app for food, lifts and coaching.",
  path: "/about",
});

// Quotes and stats are the founders' own, as they appear in the homepage's
// TestimonialsSection. Keep the two in sync, and don't add a story, date or
// credential here that isn't confirmed (see content/WRITING.md).
const FOUNDERS = [
  {
    name: "Chibudom Onyejesi",
    role: "Co-founder",
    photo: "/team/chibudom-onyejesi.png",
    width: 800,
    height: 800,
    stat: "247 → 188 lb",
    quote: "Built Helthy because nothing else would actually tell me what to fix.",
  },
  {
    name: "Chiebuka Onyejesi",
    role: "Co-founder",
    photo: "/team/chiebuka-onyejesi.jpg",
    width: 800,
    height: 800,
    stat: "Gained 50 lb",
    quote:
      "I used to forget half my meals. Now Helthy logs them in seconds and the AI coach actually keeps me honest.",
  },
];

const PRINCIPLES = [
  {
    title: "Logging stays free",
    body: "Food and workout logging are free and unlimited, with no trial and no card. Premium adds the AI extras on top; it never takes the basics away.",
  },
  {
    title: "Your data isn't for sale",
    body: "We never sell your data and never use it to train AI models. You can delete your account from inside the app at any time.",
  },
  {
    title: "Built in the open",
    body: "Every update is listed on the changelog, so you can see exactly what's changed and when.",
  },
];

export default function AboutPage() {
  return (
    <SeoPage
      tone="light"
      crumbs={[{ name: "About", href: "/about" }]}
      closing={<DownloadBanner tone="dark" title="Try what we use every day" />}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absoluteUrl("/about"),
          name: "About Helthy",
          mainEntity: { "@id": `${SITE_URL}/#organization` },
        }}
      />

      <PageHero
        title={
          <>
            We built the fitness app <span className="text-highlight">we needed</span>
          </>
        }
        lede="Helthy is made by two co-founders, Chibudom and Chiebuka Onyejesi (Chibu and Ebu). We use it every day for our own training and eating, which keeps us honest about what works and what doesn't."
      />

      <Section title="Why one app">
        <Prose
          paragraphs={[
            "Most people who train end up with three apps: one to count calories, one to log lifts, and a chat window or a forum for advice. None of them can see the others, so none of them can tell you whether a stalled bench is a programming problem or a protein problem.",
            "Helthy puts all of it in one place. You log food by search, barcode, photo or voice, log workouts set by set, and the coach answers from your own meals, workouts, personal records and weight trend. That last part is the point. Advice about your numbers beats tips written for everyone.",
          ]}
        />
      </Section>

      <Section title="Who we are">
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          {FOUNDERS.map((f) => (
            <figure key={f.name} className="card overflow-hidden">
              <div className="relative aspect-square bg-surface-2">
                <Image
                  src={f.photo}
                  alt={`${f.name}, Helthy co-founder`}
                  width={f.width}
                  height={f.height}
                  sizes="(min-width: 640px) 380px, 90vw"
                  quality={90}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="p-6">
                <p className="text-title">
                  {f.name} <span className="font-normal text-fg-subtle">· {f.role}</span>
                </p>
                <p className="mt-1 text-[13px] font-medium text-fg-muted">{f.stat}</p>
                <blockquote className="mt-4 text-[15px] leading-6 text-fg-muted">
                  &ldquo;{f.quote}&rdquo;
                </blockquote>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section title="How we run it">
        <FeatureGrid items={PRINCIPLES} />
      </Section>

      <Section title="Get in touch">
        <p className="max-w-3xl text-base leading-8 text-fg-muted">
          Found a bug, want a feature, or just want to tell us what you think? Use the{" "}
          <Link href="/contact" className="text-accent-ink underline decoration-accent-line underline-offset-4 hover:decoration-current">
            contact form
          </Link>{" "}
          or email{" "}
          <a href="mailto:support@helthy.app" className="text-accent-ink underline decoration-accent-line underline-offset-4 hover:decoration-current">
            support@helthy.app
          </a>
          . It comes straight to us. You can also see what we&apos;ve shipped lately on the{" "}
          <Link href="/changelog" className="text-accent-ink underline decoration-accent-line underline-offset-4 hover:decoration-current">
            changelog
          </Link>
          .
        </p>
      </Section>
    </SeoPage>
  );
}
