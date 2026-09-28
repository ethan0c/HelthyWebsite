import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import TopBar from "@/components/sections/TopBar";
import FloatingQRCode from "@/components/ui/FloatingQRCode";
import JsonLd from "@/components/seo/JsonLd";
import { getAppRating, type AppRating } from "@/lib/app-rating";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  PRO_PRICE,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://helthy.app"),
  title: {
    default: "Helthy: Free AI Calorie Tracker, Workout Tracker & Coach",
    template: "%s · Helthy",
  },
  description:
    "Your AI fitness coach that actually learns you. Log meals with a photo, track every lift, and get coached by AI that connects nutrition, training, and recovery.",
  openGraph: {
    title: "Helthy: Free AI Calorie Tracker, Workout Tracker & Coach",
    description:
      "Your AI fitness coach that actually learns you. Log meals with a photo, track every lift, and get coached by AI that connects nutrition, training, and recovery.",
    url: "https://helthy.app",
    siteName: "Helthy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helthy: Free AI Calorie Tracker, Workout Tracker & Coach",
    description:
      "Your AI fitness coach that actually learns you. Photo logging, workouts, insights & more.",
    site: "@helthyapp",
    creator: "@helthyapp",
  },
  icons: {
    icon: [
      { url: "/helthy-icon.svg", type: "image/svg+xml" },
      { url: "/helthy-favicon-96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/helthy-apple-touch-icon.png",
    shortcut: "/helthy-favicon-96.png",
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

/**
 * Organization + WebSite + app entities. Consistent names and @ids help
 * search engines treat "Helthy" as a brand instead of a typo of "healthy".
 * Plan descriptions must match appKnowledge.ts in the app repo.
 */
function siteJsonLd(rating: AppRating | null) {
  const org = `${SITE_URL}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: "Helthy",
        alternateName: "Helthy AI",
        url: SITE_URL,
        logo: `${SITE_URL}/logos/helthylogo.png`,
        sameAs: SOCIAL_PROFILES,
        contactPoint: {
          "@type": "ContactPoint",
          email: "support@helthy.app",
          contactType: "customer support",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Helthy",
        alternateName: ["Helthy AI", "helthy.app"],
        url: SITE_URL,
        publisher: { "@id": org },
      },
      {
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#app`,
        name: "Helthy",
        alternateName: "Helthy AI",
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android",
        description:
          "Helthy is a free AI fitness app that combines calorie and macro tracking, workout logging, weight tracking and an AI coach. Log meals by search, barcode, photo or voice, track every set across 1,500 exercises, and get coaching based on your own data.",
        url: SITE_URL,
        installUrl: [APP_STORE_URL, PLAY_STORE_URL],
        screenshot: `${SITE_URL}/phones/mobile-hero.png`,
        publisher: { "@id": org },
        offers: [
          {
            "@type": "Offer",
            name: "Free",
            price: "0",
            priceCurrency: "USD",
            description:
              "Unlimited food search and manual logging, calorie and macro tracking, unlimited workout logging, 1,500 exercises, automatic PRs, weight tracking and 2 free AI scans, voice logs and typed descriptions a week.",
          },
          {
            "@type": "Offer",
            name: "Helthy Premium (monthly)",
            price: String(PRO_PRICE.monthly),
            priceCurrency: "USD",
            description:
              "Unlimited AI photo, barcode, voice and text logging, AI coach chat, AI-built workout programs, Smart Calories, Apple Watch workout control, full history and trends.",
          },
          {
            "@type": "Offer",
            name: "Helthy Premium (yearly)",
            price: String(PRO_PRICE.yearly),
            priceCurrency: "USD",
            description: "Everything in Helthy Premium, billed yearly.",
          },
        ],
        ...(rating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(rating.value),
            ratingCount: String(rating.count),
            bestRating: "5",
            worstRating: "1",
          },
        }),
        featureList: [
          "AI photo meal logging",
          "Barcode and nutrition label scanning",
          "AI voice and text meal logging",
          "Calorie and macro tracking",
          "Workout tracking with sets, reps and weight",
          "Automatic personal record (PR) detection",
          "1,500 exercise library with how-to and target muscles",
          "AI fitness coach that reads your own data",
          "AI-generated workout programs",
          "Weight tracking with trend graphs",
          "Apple Watch app",
          "Apple Health sync",
        ],
      },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rating = await getAppRating();

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Preload critical fonts to avoid FOIT/FOUT */}
        <link
          rel="preload"
          href="/fonts/unbounded/Unbounded-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-fg">
        <JsonLd data={siteJsonLd(rating)} />
        <GSAPProvider>
          <LenisProvider>
            <TopBar />
            {children}
            <FloatingQRCode />
          </LenisProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
