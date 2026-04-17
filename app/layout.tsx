import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import SiteNav from "@/components/sections/SiteNav";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://helthy.app"),
  title: {
    default: "Helthy AI - The Best Free Calorie and Workout Tracker",
    template: "%s · Helthy AI",
  },
  description:
    "Your AI fitness coach that actually learns you. Log meals with a photo, track every lift, and get coached by AI that connects nutrition, training, and recovery.",
  openGraph: {
    title: "Helthy AI - The Best Free Calorie and Workout Tracker",
    description:
      "Your AI fitness coach that actually learns you. Log meals with a photo, track every lift, and get coached by AI that connects nutrition, training, and recovery.",
    url: "https://helthy.app",
    siteName: "Helthy AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helthy AI - The Best Free Calorie and Workout Tracker",
    description:
      "Your AI fitness coach that actually learns you. Photo logging, workouts, insights & more.",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Preload critical fonts to avoid FOIT/FOUT */}
        <link
          rel="preload"
          href="/fonts/unbounded/Unbounded-Medium.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.prod.website-files.com"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-white grain">
        <GSAPProvider>
          <LenisProvider>
            <CustomCursor />
            <div
              className="fixed top-0 left-0 w-full pointer-events-none"
              style={{ zIndex: 50 }}
            >
              <SiteNav />
            </div>
            {children}
          </LenisProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
