import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./legacy.css";
import { GSAPProvider } from "../components/providers/GSAPProvider";
import { ScrollRevealProvider } from "../components/providers/ScrollRevealProvider";
import Navbar from "../components/legacy/Navbar";
import MobileSidebar from "../components/legacy/MobileSidebar";
import AlignedLogo from "../components/legacy/AlignedLogo";
import HollowCirclesOverlay from "../components/HollowCirclesOverlay";
import { CookieBanner } from "../components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Helthy - Track Food and Workouts",
    template: "%s — Helthy",
  },
  description: "Track Food and Workouts",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.png",
  },
  themeColor: "#0B0B0B",
  openGraph: {
    title: "Helthy — Your Health, Your Power",
    description: "All‑in‑one workouts, nutrition, and progress tracking — free forever.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HollowCirclesOverlay />
        <GSAPProvider>
          <ScrollRevealProvider>
            {/* Global navigation and mobile sidebar, visible on all pages */}
            <Navbar />
            <MobileSidebar />
            <AlignedLogo />
            {children}
          </ScrollRevealProvider>
        </GSAPProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
