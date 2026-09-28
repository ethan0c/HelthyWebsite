import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { COMPARISONS } from "@/lib/content/comparisons";
import { EXERCISES } from "@/lib/content/exercises";
import { getPosts } from "@/lib/blog";

export const revalidate = 86400;

type Entry = MetadataRoute.Sitemap[number];

const page = (
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"] = "monthly",
  images?: string[],
): Entry => ({ url: absoluteUrl(path), priority, changeFrequency, ...(images && { images }) });

// No lastModified on static pages: stamping every URL with the build time
// tells search engines nothing, and Google ignores lastmod once it proves
// unreliable. Blog posts use their real publish date.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    page("/", 1, "weekly", [absoluteUrl("/phones/mobile-hero.png")]),
    page("/calorie-tracker", 0.9, "monthly", [absoluteUrl("/videos/app/food-log-poster.jpg")]),
    page("/workout-tracker", 0.9, "monthly", [absoluteUrl("/videos/app/workout-log-poster.jpg")]),
    page("/ai-fitness-coach", 0.9),
    page("/features", 0.8),
    page("/pricing", 0.8),
    page("/compare", 0.7),
    ...COMPARISONS.map((c) => page(`/compare/${c.slug}`, 0.8)),
    page("/tools", 0.7),
    page("/tools/tdee-calculator", 0.8),
    page("/tools/macro-calculator", 0.8),
    page("/tools/protein-calculator", 0.8),
    page("/tools/one-rep-max-calculator", 0.8),
    page("/exercises", 0.7),
    ...EXERCISES.map((e) => page(`/exercises/${e.slug}`, 0.6)),
    page("/blog", 0.8, "weekly"),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.meta.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      ...(p.meta.image && { images: [absoluteUrl(p.meta.image)] }),
    })),
    page("/download", 0.6),
    page("/changelog", 0.5, "weekly"),
    page("/about", 0.5, "yearly"),
    page("/contact", 0.4, "yearly"),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
