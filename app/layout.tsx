import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import TopBar from "@/components/sections/TopBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://helthy.app"),
  title: {
    default: "Helthy AI - The Best Free Calorie and Workout Tracker",
    template: "%s · Helthy AI",
  },
  description:
    "Your AI fitness coach that actually learns you. Log meals with a photo, track every lift, and get coached by AI that connects nutrition, training, and recovery.",
  keywords: [
    "calorie tracker",
    "workout tracker",
    "AI fitness app",
    "free calorie counter",
    "macro tracker",
    "AI meal logging",
    "photo food logging",
    "AI personal trainer",
    "fitness app",
    "nutrition tracker",
    "weight loss app",
    "muscle building app",
    "free workout app",
  ],
  alternates: {
    canonical: "https://helthy.app",
  },
  openGraph: {
    title: "Helthy AI - The Best Free Calorie and Workout Tracker",
    description:
      "Your AI fitness coach that actually learns you. Log meals with a photo, track every lift, and get coached by AI that connects nutrition, training, and recovery.",
    url: "https://helthy.app",
    siteName: "Helthy AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helthy AI - The Best Free Calorie and Workout Tracker",
    description:
      "Your AI fitness coach that actually learns you. Photo logging, workouts, insights & more.",
    site: "@helthyapp",
    creator: "@helthyapp",
  },
  icons: {
    icon: [
      { url: "/helthy-favicon.png", sizes: "717x717", type: "image/png" },
    ],
    apple: "/helthy-apple-touch-icon.png",
    shortcut: "/helthy-favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Helthy AI",
              applicationCategory: "HealthApplication",
              operatingSystem: "iOS, Android",
              description:
                "Helthy is a free AI-powered fitness app that unifies calorie tracking, workout logging, weight tracking, and AI coaching in one place. Features include AI photo meal logging, voice logging, 1,500+ exercise library, and an AI coach.",
              url: "https://helthy.app",
              downloadUrl:
                "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974",
              screenshot: "https://helthy.app/phones/home.png",
              offers: [
                {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                  name: "Free Plan",
                  description:
                    "Unlimited calorie and workout logging, barcode scanner, 1,500+ exercises, Apple Health sync, weight tracking — free forever.",
                },
                {
                  "@type": "Offer",
                  price: "10",
                  priceCurrency: "USD",
                  name: "Premium Monthly",
                  description:
                    "AI photo logging, voice logging, unlimited AI coach, AI workout routines, full health sync, advanced analytics.",
                },
                {
                  "@type": "Offer",
                  price: "83",
                  priceCurrency: "USD",
                  name: "Premium Yearly",
                  description: "All Premium features at $6.92/month — save 30%.",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.7",
                ratingCount: "100",
                bestRating: "5",
                worstRating: "1",
              },
              publisher: {
                "@type": "Organization",
                name: "Helthy AI",
                url: "https://helthy.app",
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "support@helthy.app",
                  contactType: "customer support",
                },
                sameAs: [
                  "https://x.com/helthyapp",
                  "https://instagram.com/helthy.app",
                  "https://tiktok.com/@helthyapp",
                  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974",
                ],
              },
              featureList: [
                "AI photo meal logging",
                "AI voice meal logging",
                "AI personal coach",
                "AI-generated workout routines",
                "Unlimited calorie and macro tracking",
                "Barcode scanner for food logging",
                "1,500+ exercise library",
                "Unlimited workout tracking",
                "Personal record (PR) detection",
                "Weight tracking with trend graphs",
                "Apple Health sync",
                "Google Health Connect sync",
                "Full offline support",
                "Achievements and gamification",
              ],
            }),
          }}
        />
        <GSAPProvider>
          <LenisProvider>
            <TopBar />
            {children}
          </LenisProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
