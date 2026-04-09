import Link from "next/link";
import Image from "next/image";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how" },
      { label: "Pricing", href: "#pricing" },
      { label: "Download", href: APP_STORE_URL },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      // TODO(user): add a /press page if/when you have press coverage
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
    <footer className="relative border-t border-white/[0.05] bg-[#050505]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logos/helthylogo.png"
                alt="Helthy"
                width={32}
                height={32}
              />
              <span className="font-display font-semibold text-white tracking-tight text-lg">
                helthy
              </span>
            </Link>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed font-light">
              AI-powered fitness and nutrition coach. Track meals, workouts,
              and progress in one app.
            </p>
            {/* TODO(user): drop social links once they're live */}
            <div className="mt-5 flex items-center gap-3 text-white/40 text-xs">
              <span>helthy.app</span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35 font-semibold mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>© {new Date().getFullYear()} Helthy. All rights reserved.</p>
          <p>Built with <span className="text-helthy-lemon">●</span> by the Helthy team</p>
        </div>
      </div>
    </footer>
  );
}
