import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./legacy.css";
import { GSAPProvider } from "../components/providers/GSAPProvider";
import { LenisProvider } from "../components/providers/LenisProvider";
import LoaderHollowCircles from "../components/legacy/LoaderHollowCircles";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0B0B] transition-opacity duration-500">
          <LoaderHollowCircles
            color="#CDFB50"
            background="transparent"
            size={16}
            border={2}
            gap={10}
            fade={0.35}
            durationMs={1050}
          />
        </div>
        <GSAPProvider>
          <LenisProvider>{children}</LenisProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
