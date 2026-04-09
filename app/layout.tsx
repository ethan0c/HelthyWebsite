import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import SiteNav from "@/components/sections/SiteNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://helthy.app"),
  title: {
    default: "Helthy — AI Fitness & Nutrition Coach",
    template: "%s · Helthy",
  },
  description:
    "Track meals, workouts, and progress in one app. AI-powered logging via photo or voice, with a Claude-powered coach in your pocket.",
  openGraph: {
    title: "Helthy — AI Fitness & Nutrition Coach",
    description:
      "Track meals, workouts, and progress in one app. AI-powered logging via photo or voice, with a Claude-powered coach in your pocket.",
    url: "https://helthy.app",
    siteName: "Helthy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helthy — AI Fitness & Nutrition Coach",
    description:
      "Track meals, workouts, and progress. AI coach in your pocket.",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#060606] text-white grain">
        <GSAPProvider>
          <LenisProvider>
            <SiteNav />
            {children}
          </LenisProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
