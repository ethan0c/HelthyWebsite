import { getPosts } from "@/lib/blog";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const revalidate = 86400;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      return `    <item>
      <title>${esc(p.meta.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${esc(p.meta.description)}</description>
      <pubDate>${new Date(`${p.meta.date}T12:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Helthy blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Weekly articles on nutrition, training and AI coaching from the Helthy team.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
