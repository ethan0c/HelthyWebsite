"use client";

import Link from "next/link";
import { handleDownloadClick } from "@/lib/download";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronDown,
  Dumbbell,
  GitCompareArrows,
  History,
  LayoutGrid,
  Menu,
  Sparkles,
  Utensils,
  X,
  type LucideIcon,
} from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import StoreButtons from "@/components/ui/StoreButtons";
import HelthyWordmark from "@/components/ui/HelthyWordmark";

type MenuLink = { label: string; description: string; href: string; Icon: LucideIcon };
type MenuKey = "product" | "resources";
type NavMenu = {
  key: MenuKey;
  label: string;
  links: MenuLink[];
  feature: { title: string; body: string; cta: string; href: string; download?: boolean };
};

const MENUS: NavMenu[] = [
  {
    key: "product",
    label: "Product",
    links: [
      { label: "AI coach", description: "Ask about your meals, training and weight trend.", href: "/ai-fitness-coach", Icon: Sparkles },
      { label: "Calorie tracker", description: "Log meals and stay on top of your macros.", href: "/calorie-tracker", Icon: Utensils },
      { label: "Workout tracker", description: "Plan sessions and track every set.", href: "/workout-tracker", Icon: Dumbbell },
      { label: "All features", description: "Everything the app does, in one place.", href: "/features", Icon: LayoutGrid },
    ],
    feature: {
      title: "Get Helthy on your phone",
      body: "Free to download on iOS and Android.",
      cta: "Download",
      href: "/download",
      download: true,
    },
  },
  {
    key: "resources",
    label: "Resources",
    links: [
      { label: "Free tools", description: "TDEE, macro, protein and one-rep max calculators.", href: "/tools", Icon: Calculator },
      { label: "Exercise guides", description: "How to do the main lifts, with form tips.", href: "/exercises", Icon: BookOpen },
      { label: "Compare", description: "How Helthy compares with other apps.", href: "/compare", Icon: GitCompareArrows },
      { label: "Changelog", description: "What's new in each update.", href: "/changelog", Icon: History },
    ],
    feature: {
      title: "From the blog",
      body: "Guides on eating, training and staying consistent.",
      cta: "Read the blog",
      href: "/blog",
    },
  },
];

const LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

/**
 * Full-width flat top bar (72px), fixed to the top of the viewport by
 * TopBar. Product and Resources open full-width menu panels on desktop, on
 * hover (click still works for touch and keyboard); on mobile everything
 * folds into one panel under the bar.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // True while the open menu was opened by mouse hover, so a click on the
  // same trigger doesn't immediately toggle it shut.
  const openedByHover = useRef(false);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const close = () => {
    cancelClose();
    setMenu(null);
    setMobileOpen(false);
  };

  const openOnHover = (key: MenuKey | null) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cancelClose();
    openedByHover.current = key !== null;
    setMenu(key);
  };

  const scheduleClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cancelClose();
    closeTimer.current = setTimeout(() => setMenu(null), 150);
  };

  useEffect(() => cancelClose, []);

  // Close everything on navigation.
  useEffect(() => {
    close();
  }, [pathname]);

  useEffect(() => {
    if (!menu && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menu, mobileOpen]);

  const active = MENUS.find((m) => m.key === menu);

  return (
    <header
      ref={headerRef}
      onPointerEnter={(e) => e.pointerType === "mouse" && cancelClose()}
      onPointerLeave={scheduleClose}
      className="pointer-events-auto relative w-full border-b border-line bg-canvas"
    >
      <div className="container-page flex h-[72px] items-center gap-8">
        <Link
          href="/"
          aria-label="Helthy home"
          className="flex shrink-0 items-center"
          onClick={close}
          onPointerEnter={openOnHover(null)}
        >
          <HelthyWordmark className="h-7 w-auto text-fg" />
        </Link>

        {/* Desktop */}
        <nav aria-label="Primary" className="hidden flex-1 items-center lg:flex">
          <ul className="flex items-center gap-1">
            {MENUS.map((m) => {
              const isOpen = menu === m.key;
              return (
                <li key={m.key} onPointerEnter={openOnHover(m.key)}>
                  <button
                    type="button"
                    onClick={() => {
                      if (isOpen && openedByHover.current) {
                        openedByHover.current = false;
                        return;
                      }
                      openedByHover.current = false;
                      setMenu(isOpen ? null : m.key);
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`menu-${m.key}`}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-[16px] font-medium transition-colors duration-150 hover:bg-surface-2 hover:text-fg ${
                      isOpen ? "bg-surface-2 text-fg" : "text-fg"
                    }`}
                  >
                    {m.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </li>
              );
            })}
            {LINKS.map((l) => (
              <li key={l.label} onPointerEnter={openOnHover(null)}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="inline-block rounded-full px-3 py-2 text-[16px] font-medium text-fg transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2" onPointerEnter={openOnHover(null)}>
            <Link
              href="/contact"
              onClick={close}
              className="rounded-full px-3 py-2 text-[16px] font-medium text-fg transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
            >
              Contact
            </Link>
            <StoreButtons size="sm" />
          </div>
        </nav>

        {/* Mobile: menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="-mr-2 ml-auto flex h-10 w-10 items-center justify-center rounded-full text-fg transition-colors duration-150 hover:bg-surface-2 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop menu panel: full width under the bar */}
      {active && (
        <div
          id={`menu-${active.key}`}
          className="absolute left-0 right-0 top-full hidden border-b border-line bg-canvas lg:block"
        >
          <div className="container-page grid grid-cols-[1fr_1fr_0.9fr] gap-x-3 gap-y-1 py-5">
            {active.links.map(({ label, description, href, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className="flex gap-3 rounded-2xl p-3 transition-colors duration-150 hover:bg-surface"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-fg">
                  <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                </span>
                <span>
                  <span className="block text-[14px] font-medium text-fg">{label}</span>
                  <span className="mt-0.5 block text-[13px] leading-5 text-fg-muted">{description}</span>
                </span>
              </Link>
            ))}
            <div className="card col-start-3 row-span-2 row-start-1 flex flex-col justify-between gap-4 p-5">
              <div>
                <p className="text-[14px] font-medium text-fg">{active.feature.title}</p>
                <p className="mt-1 text-[13px] leading-5 text-fg-muted">{active.feature.body}</p>
              </div>
              <CTAButton
                href={active.feature.href}
                variant="secondary"
                size="sm"
                className="self-start"
                onClick={(e) => {
                  if (active.feature.download) handleDownloadClick(e);
                  close();
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  {active.feature.cta}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
              </CTAButton>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu: full-width panel under the bar */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-canvas lg:hidden"
        >
          <div className="container-page pb-6">
            {MENUS.map((m) => (
              <div key={m.key} className="border-b border-line py-4">
                <p className="pb-2 text-[13px] font-medium text-fg-subtle">{m.label}</p>
                <ul>
                  {m.links.map(({ label, href, Icon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={close}
                        className="flex items-center gap-3 py-2.5 text-[16px] font-medium text-fg transition-colors duration-150 hover:text-fg"
                      >
                        <Icon aria-hidden="true" className="h-[18px] w-[18px] text-fg-subtle" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className="divide-y divide-line">
              {[...LINKS, { label: "Contact", href: "/contact" }].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={close}
                    className="block py-4 text-[16px] font-medium text-fg transition-colors duration-150 hover:text-fg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-line pt-6 [&_a]:w-full">
              <StoreButtons />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
