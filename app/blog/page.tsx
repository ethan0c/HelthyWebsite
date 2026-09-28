import type { Metadata } from "next";
import Link from "next/link";
import { SeoPage, PageHero, DownloadBanner, seoMetadata } from "@/components/seo/SeoPage";
import { getPosts, formatDate } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  ...seoMetadata({
    title: "Blog: Nutrition, Training and AI Coaching",
    description:
      "A new article every week from the Helthy team on calorie tracking, strength training, nutrition and getting results with AI coaching.",
    path: "/blog",
  }),
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: { "application/rss+xml": absoluteUrl("/blog/rss.xml") },
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <SeoPage crumbs={[{ name: "Blog", href: "/blog" }]} tone="light">
      <PageHero
        title={
          <>
            The Helthy <span className="text-highlight">blog</span>
          </>
        }
        lede="A new article every week on eating, training and making progress you can see. Straight answers, backed by evidence."
      />

      <div className="mt-14 grid max-w-3xl gap-4">
        {posts.map((p) => (
          <article key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="card card-hover block p-6 md:p-8">
              <p className="text-[13px] text-fg-subtle">
                <time dateTime={p.meta.date}>{formatDate(p.meta.date)}</time> · {p.readingMinutes} min read
              </p>
              <h2 className="mt-3 text-[20px] font-medium leading-snug tracking-[-0.01em] text-fg md:text-[22px]">
                {p.meta.title}
              </h2>
              <p className="mt-2 text-[15px] leading-7 text-fg-muted">{p.meta.description}</p>
              <span className="mt-5 inline-block text-[14px] font-medium text-accent-ink">Read article →</span>
            </Link>
          </article>
        ))}
        {posts.length === 0 && <p className="card p-6 text-fg-muted">The first article is on its way.</p>}
      </div>

      <DownloadBanner />
    </SeoPage>
  );
}
