import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

// Install / "Add to Home screen" icon: the app's lime H on black.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    start_url: "/",
    display: "browser",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/helthy-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/helthy-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
