import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { COMPARISONS } from "@/lib/content/comparisons";
import { EXERCISES } from "@/lib/content/exercises";

type Entry = MetadataRoute.Sitemap[number];

const page = (
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"] = "monthly",
): Entry => ({ url: absoluteUrl(path), priority, changeFrequency });

// No lastModified: stamping every URL with the build time tells search
// engines nothing, and Google ignores lastmod once it proves unreliable.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", 1, "weekly"),
    page("/calorie-tracker", 0.9),
    page("/workout-tracker", 0.9),
    page("/ai-fitness-coach", 0.9),
    page("/features", 0.8),
    page("/compare", 0.7),
    ...COMPARISONS.map((c) => page(`/compare/${c.slug}`, 0.8)),
    page("/tools", 0.7),
    page("/tools/tdee-calculator", 0.8),
    page("/tools/macro-calculator", 0.8),
    page("/tools/protein-calculator", 0.8),
    page("/tools/one-rep-max-calculator", 0.8),
    page("/exercises", 0.7),
    ...EXERCISES.map((e) => page(`/exercises/${e.slug}`, 0.6)),
    page("/download", 0.6),
    page("/changelog", 0.5, "weekly"),
    page("/contact", 0.4, "yearly"),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
