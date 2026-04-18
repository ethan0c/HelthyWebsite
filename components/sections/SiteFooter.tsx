import Link from "next/link";
import Image from "next/image";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Why Helthy", href: "/#why-helthy" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "App Store", href: APP_STORE_URL },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Delete account", href: "/delete-account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const SOCIAL_LINKS: { label: string; href: string; path: string }[] = [
  {
    label: "X / Twitter",
    href: "https://x.com/helthyapp",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/helthy.app",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@helthyapp",
    path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z",
  },
];

export default function SiteFooter() {
  return (
    <footer
      className="relative"
      style={{
        backgroundColor: "#111111",
        color: "rgba(255,255,255,0.65)",
      }}
    >
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
                style={{ width: "auto" }}
              />
            </Link>
            <p
              className="text-[13px] leading-relaxed max-w-[320px]"
              style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}
            >
              One AI coach that connects nutrition, training, and recovery —
              so you stop guessing and start knowing.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p
                className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[13px] transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.65)" }}
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

        {/* Email-style hairline */}
        <div
          className="mt-16"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* Disclaimer */}
        <div className="mt-8">
          <p
            className="text-[11px] leading-relaxed max-w-3xl"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            Helthy is a fitness and nutrition tracking app. The information
            provided is for educational purposes only and is not a substitute
            for professional medical advice, diagnosis, or treatment. Always
            consult a qualified healthcare provider before starting any new
            diet, exercise, or supplement program. AI-generated suggestions
            may be inaccurate — use your judgment.
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.38)" }}>
            © {new Date().getFullYear()} Helthy. All rights reserved. 
            {" "}•{" "}
            Built by{" "}
            <a
              href="https://ocelabs.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white underline underline-offset-2"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Ocelabs
            </a>
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Massive HELTHY wordmark — footer closer. Bleeds edge-to-edge. */}
      <div
        aria-hidden="true"
        className="w-full pt-8 pb-6"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="px-2 sm:px-4">
          <img
            src="/footer.svg"
            alt=""
            className="block w-full h-auto select-none"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </footer>
  );
}
