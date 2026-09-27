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
    <SeoPage crumbs={[{ name: "Blog", href: "/blog" }]}>
      <PageHero
        title={
          <>
            The Helthy <span className="text-helthy-lemon">blog</span>
          </>
        }
        lede="A new article every week on eating, training and making progress you can see. Straight answers, backed by evidence."
      />

      <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
        {posts.map((p) => (
          <article key={p.slug} className="py-8">
            <p className="text-[13px] text-white/45">
              <time dateTime={p.meta.date}>{formatDate(p.meta.date)}</time> · {p.readingMinutes} min read
            </p>
            <h2 className="mt-3 text-display-md">
              <Link href={`/blog/${p.slug}`} className="text-white transition-colors hover:text-helthy-lemon">
                {p.meta.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-white/60">{p.meta.description}</p>
          </article>
        ))}
        {posts.length === 0 && <p className="py-8 text-white/60">The first article is on its way.</p>}
      </div>

      <DownloadBanner />
    </SeoPage>
  );
}
