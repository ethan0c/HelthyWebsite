"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import CTAButton from "@/components/ui/CTAButton";
import { handleDownloadClick } from "@/lib/download";
import DeviceFrame from "@/components/ui/DeviceFrame";
import WatchScreen from "@/components/ui/WatchScreen";

/**
 * Hero, laid out like MacroFactor's: a one-line centered headline, one line
 * under it and a single Download button (the store buttons are in the nav),
 * in a compact block (~160px tall on desktop) so the devices start high.
 * Then the app on all three platforms in a row, shown whole: the Apple Watch
 * (left) and iPhone (middle) straight on, and the Android phone (right)
 * turned in 3D so its outer edge recedes. Everything is sized off the
 * iPhone's width, so the row scales as one. See the hero exception in
 * DESIGN.md.
 */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // The headline rises out of its mask
      tl.from("[data-hero-line]", { yPercent: 110, duration: 0.9, ease: "power4.out" });
      tl.from("[data-hero-sub]", { y: 16, opacity: 0, duration: 0.6 }, 0.35);
      tl.from("[data-hero-cta]", { y: 16, opacity: 0, duration: 0.6 }, 0.45);
      tl.from(
        "[data-hero-device]",
        { y: 90, opacity: 0, duration: 1.1, stagger: 0.08, ease: "power4.out" },
        0.6,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full overflow-hidden bg-canvas">
      <div className="container-page flex flex-col items-center pt-[clamp(104px,13vh,120px)] text-center">
        <h1 className="text-balance text-display-2xl text-fg">
          {/* The mask clips the line as it rises; padding keeps descenders visible */}
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-hero-line className="block">
              Food, lifts and a coach <span className="text-highlight">in one app</span>
            </span>
          </span>
        </h1>

        <p
          data-hero-sub
          className="mt-3 max-w-[64ch] text-balance font-body text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-snug text-fg-muted"
        >
          The free AI calorie tracker and workout tracker for iPhone, Android and Apple Watch.
        </p>

        {/* One button, like MacroFactor's. The store buttons live in the nav. */}
        <div data-hero-cta className="mt-5">
          <CTAButton href="/download" size="lg" onClick={handleDownloadClick}>
            Download
          </CTAButton>
        </div>
      </div>

      {/* The devices, shown whole. Side devices are positioned in
          percentages of the iPhone's width. Each 3D turn is on an inner
          wrapper so it doesn't fight the entrance animation's transform. */}
      <div
        role="img"
        aria-label="Helthy on Apple Watch, iPhone and Android: a live bench press workout on the watch, the food search on the iPhone, and a weight trend chart on Android"
        className="container-page mt-[clamp(40px,6vh,64px)] pb-[clamp(56px,8vh,96px)]"
      >
        <div className="relative mx-auto w-[clamp(250px,26vw,390px)]">
          {/* Apple Watch, left, straight on, level with the middle of the phones */}
          <div data-hero-device className="absolute right-[112%] top-[26%] hidden w-[62%] lg:block">
            <DeviceFrame device="watch" sizes="250px">
              <WatchScreen screen="workout" />
            </DeviceFrame>
          </div>

          <div data-hero-device className="relative z-10">
            <DeviceFrame
              device="iphone"
              src="/phones/food-search.png"
              alt=""
              width={1320}
              height={2868}
              priority
              sizes="(min-width: 1500px) 390px, (min-width: 962px) 26vw, 250px"
            />
          </div>

          {/* Android, right */}
          <div
            data-hero-device
            className="absolute left-[112%] top-[2%] hidden w-full [perspective:1600px] lg:block"
          >
            <div className="origin-left [transform:rotateY(24deg)]">
              <DeviceFrame
                device="android"
                src="/phones/weight.png"
                alt=""
                width={1320}
                height={2868}
                sizes="(min-width: 1024px) 390px, 1px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
