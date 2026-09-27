import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Styles for blog posts (content/blog/*.mdx). Required by @next/mdx in the
 * App Router. Internal links use next/link; external ones open in a new tab.
 */

function A({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const cls = "text-helthy-lemon underline underline-offset-4 decoration-helthy-lemon/40 hover:decoration-helthy-lemon";
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={cls} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props} />;
}

const components: MDXComponents = {
  h2: (p) => <h2 className="mt-14 mb-4 text-display-md text-white" {...p} />,
  h3: (p) => <h3 className="mt-10 mb-3 text-[19px] font-medium tracking-tight text-white" {...p} />,
  p: (p) => <p className="my-5 text-[16px] leading-8 text-white/75" {...p} />,
  ul: (p) => <ul className="my-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-white/75 marker:text-helthy-lemon" {...p} />,
  ol: (p) => <ol className="my-5 list-decimal space-y-2 pl-6 text-[16px] leading-8 text-white/75 marker:text-helthy-lemon" {...p} />,
  li: (p) => <li className="pl-1" {...p} />,
  a: A,
  strong: (p) => <strong className="font-semibold text-white" {...p} />,
  blockquote: (p) => (
    <blockquote className="my-8 border-l-2 border-helthy-lemon/60 pl-5 text-[17px] italic leading-8 text-white/80" {...p} />
  ),
  hr: () => <hr className="my-12 border-white/10" />,
  table: (p) => (
    <div className="card-helthy my-8 overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-[14px]" {...p} />
    </div>
  ),
  th: (p) => <th className="border-b border-white/10 px-5 py-3 font-medium text-white/60" {...p} />,
  td: (p) => <td className="border-b border-white/5 px-5 py-3 text-white/80" {...p} />,
  code: (p) => <code className="rounded bg-white/10 px-1.5 py-0.5 text-[14px] text-white" {...p} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
