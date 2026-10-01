"use client";

import Link from "next/link";
import { handleDownloadClick } from "@/lib/download";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

// A menu opens after a short pause so brushing past a trigger doesn't flash
// it, and closes after a longer one so a diagonal move into the panel is safe.
const OPEN_DELAY = 60;
const CLOSE_DELAY = 180;

const isCurrent = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const ITEM = "px-3 py-2 text-[15px] font-medium";
const itemClass = (lit: boolean) =>
  `${ITEM} rounded-full transition-colors duration-150 ${lit ? "text-fg" : "text-fg-muted"}`;

// How far the hover marker sits inside a link's box, so it hugs the label
// like the highlighter band behind a heading's highlighted phrase.
const MARKER_INSET = { x: 6, y: 7 };

/**
 * Full-width flat top bar (64px). Positioned by TopBar (fixed, flush under
 * the launch banner). Product and Resources open full-width menu panels on
 * desktop, on hover (click still works for touch and keyboard); on mobile
 * everything folds into one panel under the bar.
 *
 * Links are muted at rest and white for the current page. Hover is the
 * heading highlight: one lemon marker with black text glides between the
 * hovered links and rests on the open menu's trigger.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const [menu, setMenu] = useState<MenuKey | null>(null);
  // The menu whose content the panel shows. Outlives `menu` so the content
  // stays put while the panel closes.
  const [shown, setShown] = useState<MenuKey>(MENUS[0].key);
  // True when moving between two open menus (content slides sideways), false
  // when the panel opens from closed (content is already in place).
  const [swap, setSwap] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // True while the open menu was opened by mouse hover, so a click on the
  // same trigger doesn't immediately toggle it shut.
  const openedByHover = useRef(false);

  const cancelTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const close = () => {
    cancelTimer();
    setMenu(null);
    setMobileOpen(false);
  };

  const openMenu = (key: MenuKey) => {
    setSwap(menu !== null && menu !== key);
    setShown(key);
    setMenu(key);
  };

  // Hovering an item moves the marker to it. Menu triggers also open their
  // menu; every other item closes whichever menu is open.
  const hoverItem = (key: string | null, menuKey: MenuKey | null = null) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cancelTimer();
    if (key) setHovered(key);
    openedByHover.current = menuKey !== null;
    if (menuKey === null) setMenu(null);
    else if (menu !== null) openMenu(menuKey);
    else timer.current = setTimeout(() => openMenu(menuKey), OPEN_DELAY);
  };

  const unhover = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(null);
  };

  const scheduleClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cancelTimer();
    timer.current = setTimeout(() => setMenu(null), CLOSE_DELAY);
  };

  useEffect(() => cancelTimer, []);

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

  // Place the marker on the hovered item, or on the open menu's trigger. It
  // slides between neighbours; it fades in where it is needed when it was
  // hidden or when the target is in the other group across the bar.
  const markerKey = hovered ?? menu;
  useLayoutEffect(() => {
    const marker = markerRef.current;
    const nav = navRef.current;
    if (!marker || !nav) return;
    const target = markerKey ? itemRefs.current[markerKey] : null;
    if (!target) {
      marker.style.opacity = "0";
      return;
    }
    const navBox = nav.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    const group = target.dataset.group ?? "";
    const { x, y } = MARKER_INSET;
    marker.dataset.slide = String(marker.style.opacity === "1" && marker.dataset.group === group);
    marker.dataset.group = group;
    marker.style.clipPath = `inset(${box.top - navBox.top + y}px ${navBox.right - box.right + x}px ${
      navBox.bottom - box.bottom + y
    }px ${box.left - navBox.left + x}px round 4px)`;
    marker.style.opacity = "1";
  }, [markerKey]);

  const setItemRef = (key: string) => (el: HTMLElement | null) => {
    itemRefs.current[key] = el;
  };

  const shownIndex = MENUS.findIndex((m) => m.key === shown);

  return (
    <header
      ref={headerRef}
      onPointerEnter={(e) => e.pointerType === "mouse" && cancelTimer()}
      onPointerLeave={scheduleClose}
      className="pointer-events-auto relative w-full border-b border-line bg-canvas"
    >
      <div className="container-page flex h-16 items-center gap-8">
        <Link
          href="/"
          aria-label="Helthy home"
          className="flex shrink-0 items-center"
          onClick={close}
          onPointerEnter={hoverItem(null)}
        >
          <HelthyWordmark className="h-6 w-auto text-fg" />
        </Link>

        {/* Desktop */}
        <nav ref={navRef} aria-label="Primary" className="relative hidden flex-1 items-center lg:flex">
          <ul className="flex items-center gap-1" onPointerLeave={unhover}>
            {MENUS.map((m) => {
              const isOpen = menu === m.key;
              const hasCurrent = m.links.some((l) => isCurrent(pathname, l.href));
              return (
                <li key={m.key} onPointerEnter={hoverItem(m.key, m.key)}>
                  <button
                    ref={setItemRef(m.key)}
                    data-group="links"
                    type="button"
                    onClick={() => {
                      cancelTimer();
                      if (isOpen && openedByHover.current) {
                        openedByHover.current = false;
                        return;
                      }
                      openedByHover.current = false;
                      if (isOpen) setMenu(null);
                      else openMenu(m.key);
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`menu-${m.key}`}
                    className={`inline-flex items-center gap-1 ${itemClass(hasCurrent)}`}
                  >
                    {m.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </li>
              );
            })}
            {LINKS.map((l) => {
              const current = isCurrent(pathname, l.href);
              return (
                <li key={l.label} onPointerEnter={hoverItem(l.href)}>
                  <Link
                    ref={setItemRef(l.href)}
                    data-group="links"
                    href={l.href}
                    onClick={close}
                    aria-current={current ? "page" : undefined}
                    className={`inline-block ${itemClass(current)}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2" onPointerLeave={unhover}>
            <Link
              ref={setItemRef("/contact")}
              data-group="aside"
              href="/contact"
              onClick={close}
              onPointerEnter={hoverItem("/contact")}
              aria-current={isCurrent(pathname, "/contact") ? "page" : undefined}
              className={itemClass(isCurrent(pathname, "/contact"))}
            >
              Contact
            </Link>
            <span onPointerEnter={hoverItem(null)} className="flex">
              <CTAButton href="/download" variant="primary" size="sm" onClick={handleDownloadClick}>
                Download
              </CTAButton>
            </span>
          </div>

          {/* Hover marker: a lemon copy of the links above, laid out the same
              way and clipped to one band. Clipping a copy keeps the text
              black exactly where the lemon is, even mid-slide. */}
          <div ref={markerRef} aria-hidden="true" className="nav-marker">
            <ul className="flex items-center gap-1">
              {MENUS.map((m) => (
                <li key={m.key}>
                  <span className={`inline-flex items-center gap-1 ${ITEM}`}>
                    {m.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ease-out ${menu === m.key ? "rotate-180" : ""}`}
                    />
                  </span>
                </li>
              ))}
              {LINKS.map((l) => (
                <li key={l.label}>
                  <span className={`inline-block ${ITEM}`}>{l.label}</span>
                </li>
              ))}
            </ul>
            <div className="ml-auto flex items-center gap-2">
              <span className={ITEM}>Contact</span>
              <span className="btn-primary btn-sm invisible">Download</span>
            </div>
          </div>
        </nav>

        {/* Mobile: menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="-mr-2 ml-auto flex h-10 w-10 items-center justify-center rounded-full text-fg transition-colors duration-150 hover:bg-surface-2 active:bg-surface-3 lg:hidden"
        >
          <span aria-hidden="true" className="relative h-5 w-5">
            <Menu
              className={`absolute inset-0 h-5 w-5 transition duration-200 ease-out ${mobileOpen ? "rotate-90 opacity-0" : ""}`}
            />
            <X
              className={`absolute inset-0 h-5 w-5 transition duration-200 ease-out ${mobileOpen ? "" : "-rotate-90 opacity-0"}`}
            />
          </span>
        </button>
      </div>

      {/* Dims the page under an open menu so the panel reads as its own layer */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-full h-screen bg-canvas/60 transition-opacity duration-200 ${
          menu || mobileOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Desktop menu panel: full width under the bar */}
      <div
        data-open={menu !== null}
        data-swap={swap}
        inert={menu === null}
        className="nav-panel absolute inset-x-0 top-full hidden border-b border-line bg-canvas lg:block"
      >
        <div className="nav-panel-body container-page grid py-5">
          {MENUS.map((m, i) => (
            <div
              key={m.key}
              id={`menu-${m.key}`}
              data-active={m.key === shown}
              data-side={i < shownIndex ? "start" : "end"}
              inert={m.key !== shown}
              className="nav-pane grid grid-cols-[1fr_1fr_0.9fr] gap-x-3 gap-y-1"
            >
              {m.links.map(({ label, description, href, Icon }) => {
                const current = isCurrent(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    aria-current={current ? "page" : undefined}
                    className="group flex gap-3 rounded-2xl p-3 transition-colors duration-150 hover:bg-surface"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-150 group-hover:bg-fg group-hover:text-canvas group-focus-visible:bg-fg group-focus-visible:text-canvas ${
                        current ? "bg-fg text-canvas" : "bg-surface-2 text-fg"
                      }`}
                    >
                      <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="flex items-center gap-1.5 text-[14px] font-medium text-fg">
                        {label}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 -translate-x-1 text-fg-muted opacity-0 transition duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                        />
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-5 text-fg-muted">{description}</span>
                    </span>
                  </Link>
                );
              })}
              <div className="card col-start-3 row-span-2 row-start-1 flex flex-col justify-between gap-4 p-5">
                <div>
                  <p className="text-[14px] font-medium text-fg">{m.feature.title}</p>
                  <p className="mt-1 text-[13px] leading-5 text-fg-muted">{m.feature.body}</p>
                </div>
                <CTAButton
                  href={m.feature.href}
                  variant="secondary"
                  size="sm"
                  className="self-start"
                  onClick={(e) => {
                    if (m.feature.download) handleDownloadClick(e);
                    close();
                  }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {m.feature.cta}
                    <ArrowRight aria-hidden="true" className="nudge h-3.5 w-3.5" />
                  </span>
                </CTAButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile menu: full-width panel under the bar */}
      <div
        id="mobile-menu"
        data-open={mobileOpen}
        inert={!mobileOpen}
        data-lenis-prevent
        className="nav-panel absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-line bg-canvas lg:hidden"
      >
        <div className="nav-panel-body container-page pb-6">
          {MENUS.map((m) => (
            <div key={m.key} className="border-b border-line py-4">
              <p className="pb-2 text-[13px] font-medium text-fg-subtle">{m.label}</p>
              <ul>
                {m.links.map(({ label, href, Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={isCurrent(pathname, href) ? "page" : undefined}
                      className="flex items-center gap-3 py-2.5 text-[16px] font-medium text-fg transition-colors duration-150 active:text-fg-muted"
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
                  aria-current={isCurrent(pathname, l.href) ? "page" : undefined}
                  className="block py-4 text-[16px] font-medium text-fg transition-colors duration-150 active:text-fg-muted"
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
    </header>
  );
}
