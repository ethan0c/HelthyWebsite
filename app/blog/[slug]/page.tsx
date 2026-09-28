import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SeoPage, DownloadBanner } from "@/components/seo/SeoPage";
import JsonLd from "@/components/seo/JsonLd";
import { getPost, getPosts, formatDate } from "@/lib/blog";
import { SITE_URL, absoluteUrl } from "@/lib/site";

// Scheduled posts go live on their date (and links to them start working)
// without a redeploy: re-render at most once an hour.
export const revalidate = 3600;

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
      ...(post.meta.image && { images: [{ url: post.meta.image, width: 1200, height: 800, alt: post.meta.imageAlt }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      ...(post.meta.image && { images: [post.meta.image] }),
    },
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
      tone="light"
      closing={<DownloadBanner tone="dark" />}
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
          ...(meta.image && { image: absoluteUrl(meta.image) }),
        }}
      />

      <article className="max-w-3xl">
        <header>
          <h1 className="text-display-xl text-fg">{meta.title}</h1>
          <p className="mt-6 text-lede">{meta.description}</p>
          <p className="mt-6 text-[13px] text-fg-subtle">
            {meta.author} · <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {readingMinutes} min read
          </p>
        </header>

        {meta.image && (
          <Image
            src={meta.image}
            alt={meta.imageAlt ?? ""}
            width={1200}
            height={800}
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="mt-10 aspect-[16/9] w-full rounded-3xl object-cover"
          />
        )}

        <div className={meta.image ? "mt-6" : "mt-10 border-t border-line pt-4"}>
          <Content />
        </div>
      </article>

      {more.length > 0 && (
        <section className="mt-24 max-w-3xl">
          <h2 className="text-display-md text-fg">More from the blog</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block py-5">
                  <span className="text-[16px] font-medium text-fg transition-colors group-hover:text-accent-ink">
                    {p.meta.title}
                  </span>
                  <span className="mt-1 block text-[13px] text-fg-subtle">{formatDate(p.meta.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

    </SeoPage>
  );
}
