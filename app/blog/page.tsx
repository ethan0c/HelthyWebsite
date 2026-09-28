import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    <SeoPage
      closing={<DownloadBanner tone="dark" />}
      crumbs={[{ name: "Blog", href: "/blog" }]}
      tone="light"
    >
      <PageHero
        title={
          <>
            The Helthy <span className="text-highlight">blog</span>
          </>
        }
        lede="A new article every week on eating, training and making progress you can see. Straight answers, backed by evidence."
      />

      <ul className="mt-14 divide-y divide-line border-y border-line">
        {posts.map((p) => (
          <li key={p.slug}>
            <article>
              <Link href={`/blog/${p.slug}`} className="group flex gap-5 py-6 sm:gap-8 md:py-8">
                {p.meta.image && (
                  <Image
                    src={p.meta.image}
                    alt={p.meta.imageAlt ?? ""}
                    width={1200}
                    height={800}
                    sizes="(min-width: 640px) 280px, 112px"
                    className="aspect-square w-28 shrink-0 rounded-2xl object-cover sm:aspect-[3/2] sm:w-[280px]"
                  />
                )}
                <div className="min-w-0 self-center">
                  <p className="text-[13px] text-fg-subtle">
                    <time dateTime={p.meta.date}>{formatDate(p.meta.date)}</time> · {p.readingMinutes} min read
                  </p>
                  <h2 className="mt-2 text-[18px] font-medium leading-snug tracking-[-0.01em] text-fg underline-offset-4 group-hover:underline md:text-[22px]">
                    {p.meta.title}
                  </h2>
                  <p className="mt-2 hidden max-w-2xl text-[15px] leading-7 text-fg-muted sm:block">{p.meta.description}</p>
                </div>
              </Link>
            </article>
          </li>
        ))}
        {posts.length === 0 && <li className="py-6 text-fg-muted">The first article is on its way.</li>}
      </ul>
    </SeoPage>
  );
}
