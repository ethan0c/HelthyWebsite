"use client";

import Link from "next/link";
import Image from "next/image";
import type { IconType } from "react-icons";
import { FaXTwitter, FaInstagram, FaTiktok } from "react-icons/fa6";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Calorie tracker", href: "/calorie-tracker" },
      { label: "Workout tracker", href: "/workout-tracker" },
      { label: "AI fitness coach", href: "/ai-fitness-coach" },
      { label: "Pricing", href: "/?section=pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Free tools",
    links: [
      { label: "TDEE calculator", href: "/tools/tdee-calculator" },
      { label: "Macro calculator", href: "/tools/macro-calculator" },
      { label: "Protein calculator", href: "/tools/protein-calculator" },
      { label: "1RM calculator", href: "/tools/one-rep-max-calculator" },
      { label: "Exercise guides", href: "/exercises" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "vs MyFitnessPal", href: "/compare/helthy-vs-myfitnesspal" },
      { label: "vs Cal AI", href: "/compare/helthy-vs-cal-ai" },
      { label: "vs Hevy", href: "/compare/helthy-vs-hevy" },
      { label: "vs Strong", href: "/compare/helthy-vs-strong" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/?section=faq" },
      { label: "App Store", href: APP_STORE_URL },
      { label: "Google Play", href: PLAY_STORE_URL },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Delete account", href: "/delete-account" },
    ],
  },
];

const SOCIAL_LINKS: { label: string; href: string; Icon: IconType }[] = [
  { label: "X / Twitter", href: "https://x.com/helthyapp", Icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com/helthy.app", Icon: FaInstagram },
  { label: "TikTok", href: "https://tiktok.com/@helthyapp", Icon: FaTiktok },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-canvas text-fg-muted">
      <div className="container-page pt-16 pb-10">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-block mb-5" aria-label="Helthy home">
              <Image
                src="/logos/logo-long-white.png"
                alt="Helthy"
                width={162}
                height={32}
                className="h-7 w-auto"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <p className="max-w-[320px] text-[14px] leading-6 text-fg-muted">
              One AI coach that connects nutrition, training, and recovery —
              so you stop guessing and start knowing.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="mb-4 text-[13px] font-medium text-fg-subtle">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[14px] text-fg-muted transition-colors duration-150 hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 border-t border-line pt-8">
          <p className="max-w-3xl text-[12px] leading-relaxed text-fg-subtle">
            Helthy is a fitness and nutrition tracking app. The information
            provided is for educational purposes only and is not a substitute
            for professional medical advice, diagnosis, or treatment. Always
            consult a qualified healthcare provider before starting any new
            diet, exercise, or supplement program. AI-generated suggestions
            may be inaccurate — use your judgment.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[13px] text-fg-subtle">
            © {new Date().getFullYear()} Helthy. All rights reserved.
            {" "}•{" "}
            Built by{" "}
            <a
              href="https://ocelabs.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted underline underline-offset-2 transition-colors duration-150 hover:text-fg"
            >
              Ocelabs
            </a>
          </p>

          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
              >
                <Icon aria-hidden="true" className="h-[15px] w-[15px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* HELTHY wordmark, edge to edge. The SVG is used as a mask so the
          fill comes from a token (quiet, not lime). */}
      <div aria-hidden="true" className="w-full px-2 pt-8 pb-6 sm:px-4">
        <div
          className="w-full select-none bg-surface-2"
          style={{
            aspectRatio: "1281 / 248",
            maskImage: "url(/footer.svg)",
            WebkitMaskImage: "url(/footer.svg)",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </div>
    </footer>
  );
}
