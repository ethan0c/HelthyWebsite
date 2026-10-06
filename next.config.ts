import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // The dashboard holds user data: never cache it, frame it or index it
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 75 is the default for everything; 90 is for faces (the About page
    // headshots), where compression softness shows most.
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // lib/blog.ts reads content/blog at runtime (scheduled posts render on
  // demand), so ship the files with every route that lists posts.
  outputFileTracingIncludes: {
    "/blog/**": ["./content/blog/**/*"],
    "/sitemap.xml": ["./content/blog/**/*"],
    "/exercises/**": ["./content/exercises/**/*"],
  },
};

// Blog posts are .mdx files in content/blog, imported by app/blog/[slug].
// Plugins are passed by name so they work under Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
