import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./legacy.css";
import { GSAPProvider } from "../components/providers/GSAPProvider";
import { LenisProvider } from "../components/providers/LenisProvider";
import { ScrollRevealProvider } from "../components/providers/ScrollRevealProvider";
import Navbar from "../components/legacy/Navbar";
import MobileSidebar from "../components/legacy/MobileSidebar";
import AlignedLogo from "../components/legacy/AlignedLogo";
import HollowCirclesOverlay from "../components/HollowCirclesOverlay";

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
    default: "Helthy — Your Health, Your Power",
    template: "%s — Helthy",
  },
  description: "Your Health, Your Power",
  icons: {
    icon: "/logos/logo-green-black.svg",
    apple: "/logos/logo-green-black.svg",
    shortcut: "/logos/logo-green-black.svg",
  },
  themeColor: "#0B0B0B",
  openGraph: {
    title: "Helthy — Your Health, Your Power",
    description: "All‑in‑one workouts, nutrition, and progress tracking — free forever.",
    url: "https://helthy.app/",
    siteName: "Helthy",
    images: [
      {
        url: "/logos/logo-green-black.svg",
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
          <LenisProvider>
            <ScrollRevealProvider>
              {/* Global navigation and mobile sidebar, visible on all pages */}
              <Navbar />
              <MobileSidebar />
              <AlignedLogo />
              {children}
            </ScrollRevealProvider>
          </LenisProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
