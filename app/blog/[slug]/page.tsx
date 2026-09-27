import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoPage, DownloadBanner } from "@/components/seo/SeoPage";
import JsonLd from "@/components/seo/JsonLd";
import { getPost, getPosts, formatDate } from "@/lib/blog";
import { SITE_URL, absoluteUrl } from "@/lib/site";

// Posts dated in the future aren't prerendered; they render on first visit
// once their date arrives (see isPublished in lib/blog.ts).
export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${slug}`);
  return {
    title: post.meta.title,
    description: post.meta.description,
    authors: [{ name: post.meta.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url,
      type: "article",
      publishedTime: post.meta.date,
      authors: [post.meta.author],
    },
    twitter: { card: "summary_large_image", title: post.meta.title, description: post.meta.description },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { meta, Content, readingMinutes } = post;

  const more = (await getPosts()).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <SeoPage
      crumbs={[
        { name: "Blog", href: "/blog" },
        { name: meta.title, href: `/blog/${slug}` },
      ]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: meta.title,
          description: meta.description,
          datePublished: meta.date,
          author: { "@type": "Person", name: meta.author },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
          keywords: meta.tags?.join(", "),
        }}
      />

      <article className="mx-auto max-w-[720px]">
        <header>
          <h1
            className="font-heading text-white"
            style={{ fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.025em" }}
          >
            {meta.title}
          </h1>
          <p className="mt-5 text-[16px] leading-7 text-white/60">{meta.description}</p>
          <p className="mt-6 text-[13px] text-white/45">
            {meta.author} · <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {readingMinutes} min read
          </p>
        </header>

        <div className="mt-10 border-t border-white/10 pt-4">
          <Content />
        </div>
      </article>

      {more.length > 0 && (
        <section className="mx-auto mt-24 max-w-[720px]">
          <h2 className="text-display-md text-white">More from the blog</h2>
          <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {more.map((p) => (
              <li key={p.slug} className="py-5">
                <Link href={`/blog/${p.slug}`} className="text-[16px] font-medium text-white hover:text-helthy-lemon">
                  {p.meta.title}
                </Link>
                <p className="mt-1 text-[13px] text-white/45">{formatDate(p.meta.date)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <DownloadBanner />
    </SeoPage>
  );
}
