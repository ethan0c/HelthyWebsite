import Link from "next/link";
import { isPostLive } from "@/lib/blog";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Styles for blog posts (content/blog/*.mdx). Required by @next/mdx in the
 * App Router. Internal links use next/link; external ones open in a new tab.
 * Colours are design tokens only (see DESIGN.md), so prose also works inside
 * a light band.
 */

function A({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const cls =
    "text-accent-ink underline underline-offset-4 decoration-accent-line transition-colors hover:decoration-current";
  // A post scheduled for a later Sunday isn't live yet: show the text, not a 404 link
  const post = href.match(/^\/blog\/([^/?#]+)/)?.[1];
  if (post && !isPostLive(post)) return <span>{props.children}</span>;
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={cls} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props} />;
}

const components: MDXComponents = {
  h2: (p) => <h2 className="mt-14 mb-4 text-display-md text-fg" {...p} />,
  h3: (p) => <h3 className="mt-10 mb-3 text-[19px] font-medium leading-snug tracking-[-0.01em] text-fg" {...p} />,
  p: (p) => <p className="my-5 text-[16px] leading-8 text-fg-muted" {...p} />,
  ul: (p) => <ul className="my-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-fg-muted marker:text-fg-subtle" {...p} />,
  ol: (p) => <ol className="my-5 list-decimal space-y-2 pl-6 text-[16px] leading-8 text-fg-muted marker:text-fg-subtle" {...p} />,
  li: (p) => <li className="pl-1" {...p} />,
  a: A,
  strong: (p) => <strong className="font-semibold text-fg" {...p} />,
  blockquote: (p) => (
    <blockquote
      className="my-8 rounded-2xl border border-line bg-surface px-6 py-5 text-[16px] leading-8 text-fg [&>p]:my-0 [&>p]:text-fg"
      {...p}
    />
  ),
  hr: () => <hr className="my-12 border-line" />,
  table: (p) => (
    <div className="card my-8 overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-[15px] [&_tbody_tr:last-child_td]:border-0" {...p} />
    </div>
  ),
  th: (p) => <th className="border-b border-line px-5 py-3 text-[14px] font-medium text-fg-subtle" {...p} />,
  td: (p) => <td className="border-b border-line px-5 py-3 text-fg-muted" {...p} />,
  code: (p) => (
    <code className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[14px] text-fg" {...p} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
