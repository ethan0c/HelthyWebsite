import Link from "next/link";
import Image from "next/image";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/contact" },
      { label: "Download", href: APP_STORE_URL },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Delete account", href: "/delete-account" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/logos/logo-long-white.png"
                alt="Helthy"
                width={162}
                height={32}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed font-light">
              AI-powered fitness and nutrition coach. Track meals, workouts,
              and progress in one app.
            </p>
            {/* TODO(user): drop social links once they're live */}
            <div className="mt-4 flex items-center gap-3 text-white/40 text-xs">
              <span>helthy.app</span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35 font-semibold mb-3">
                {col.title}
              </p>
              <ul className="space-y-0.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/65 hover:text-white transition-colors inline-block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>© {new Date().getFullYear()} Helthy. All rights reserved.</p>
          <p>Built with <span className="text-helthy-lemon">●</span> by the Helthy team</p>
        </div>
      </div>
    </footer>
  );
}
