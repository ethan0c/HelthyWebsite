import type { Metadata } from "next";
import "./globals.css";
import { GSAPProvider } from "../components/providers/GSAPProvider";
import { LenisProvider } from "../components/providers/LenisProvider";
import Navbar from "../components/nav/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Helthy — Track Food & Workouts, Free Forever",
    template: "%s — Helthy",
  },
  description:
    "All-in-one workout tracking, smart nutrition logging, AI coach, barcode & voice logging — on iOS, Android & Apple Watch. Free forever.",
  keywords: [
    "fitness app",
    "workout tracker",
    "nutrition tracker",
    "calorie counter",
    "macro tracker",
    "AI fitness coach",
    "barcode food scanner",
    "voice food logging",
    "free fitness app",
    "Apple Health sync",
    "meal planner",
  ],
  authors: [{ name: "Helthy" }],
  creator: "Helthy",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.png",
  },
  metadataBase: new URL("https://helthy.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Helthy — Your Health, Your Power",
    description:
      "All-in-one workouts, nutrition, and progress tracking — free forever.",
    url: "https://helthy.app/",
    siteName: "Helthy",
    images: [
      {
        url: "/logo-green-black.svg",
        width: 512,
        height: 512,
        alt: "Helthy logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helthy — Track Food & Workouts, Free Forever",
    description:
      "AI-powered fitness & nutrition tracking on iOS, Android & Apple Watch.",
    creator: "@helthyapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased grain">
        <GSAPProvider>
          <LenisProvider>
            <Navbar />
            {children}
          </LenisProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
