import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/delete-account"],
      },
    ],
    sitemap: "https://helthy.app/sitemap.xml",
    host: "https://helthy.app",
  };
}
