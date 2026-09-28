import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";

/**
 * The written guide for each exercise lives in content/exercises/<slug>.mdx,
 * next to its facts in lib/content/exercises.ts (muscles, equipment,
 * strength ratios). The facts drive the index, metadata and strength table;
 * the MDX is the article. See content/WRITING.md before editing one.
 */

export type ExerciseArticleMeta = {
  /** One or two sentences under the title, also the meta description. */
  description: string;
  /** Last reviewed, YYYY-MM-DD. */
  updated: string;
};

const DIR = path.join(process.cwd(), "content/exercises");

export async function getExerciseArticle(slug: string) {
  if (!fs.existsSync(path.join(DIR, `${slug}.mdx`))) return null;
  const mod: {
    default: ComponentType<{ components?: MDXComponents }>;
    meta: ExerciseArticleMeta;
  } = await import(`@/content/exercises/${slug}.mdx`);
  const raw = fs.readFileSync(path.join(DIR, `${slug}.mdx`), "utf8");
  const words = raw.replace(/export const meta[\s\S]*?\n};?\n/, "").split(/\s+/).length;
  return { meta: mod.meta, Content: mod.default, readingMinutes: Math.max(1, Math.round(words / 230)) };
}
