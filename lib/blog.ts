import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

/**
 * Blog posts live in content/blog/<slug>.mdx and export a `meta` object.
 * Files starting with "_" are ignored (use them for templates). A post with
 * a future `date` stays hidden until that day, so a week's article can be
 * merged early and go live on schedule.
 */

export type PostMeta = {
  title: string;
  description: string;
  /** Publish date, YYYY-MM-DD. */
  date: string;
  author: string;
  tags?: string[];
  /** Cover photo in public/blog, e.g. "/blog/<slug>.jpg" (3:2, 1200px wide). */
  image?: string;
  /** Describes the photo for screen readers. */
  imageAlt?: string;
  draft?: boolean;
};

export type Post = {
  slug: string;
  meta: PostMeta;
  readingMinutes: number;
};

const DIR = path.join(process.cwd(), "content/blog");

function isPublished(meta: PostMeta) {
  const today = new Date().toISOString().slice(0, 10);
  return !meta.draft && meta.date <= today;
}

/**
 * Whether /blog/<slug> is live right now. Read from the file's meta without
 * importing it, so article links can check it while rendering: a link to a
 * post that's scheduled for later renders as plain text until its date.
 */
export function isPostLive(slug: string) {
  const file = path.join(DIR, `${slug}.mdx`);
  if (slug.startsWith("_") || !fs.existsSync(file)) return false;
  const head = fs.readFileSync(file, "utf8").slice(0, 2000);
  const date = head.match(/date:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  const draft = /draft:\s*true/.test(head);
  return !!date && !draft && isPublished({ date, draft } as PostMeta);
}

function readingMinutes(slug: string) {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.mdx`), "utf8");
  const words = raw.replace(/export const meta[\s\S]*?\n};?\n/, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

function allSlugs() {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

async function load(slug: string) {
  if (!allSlugs().includes(slug)) return null;
  const mod: { default: ComponentType; meta: PostMeta } = await import(`@/content/blog/${slug}.mdx`);
  return mod;
}

/** A published post and its rendered component, or null. */
export async function getPost(slug: string) {
  const mod = await load(slug);
  if (!mod || !isPublished(mod.meta)) return null;
  return { slug, meta: mod.meta, readingMinutes: readingMinutes(slug), Content: mod.default };
}

/** Published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    allSlugs().map(async (slug) => {
      const mod = await load(slug);
      return mod && isPublished(mod.meta)
        ? { slug, meta: mod.meta, readingMinutes: readingMinutes(slug) }
        : null;
    }),
  );
  return posts
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
