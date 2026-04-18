"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Sparkles, Brain, MessageCircle, LineChart } from "lucide-react";
import Icon from "@mdi/react";
import { mdiCertificateOutline } from "@mdi/js";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const PREMIUM_FEATURES = [
  { icon: Sparkles, label: "Unlimited AI photo & voice meal logging" },
  { icon: MessageCircle, label: "Unlimited AI Coach powered by Claude" },
  { icon: Brain, label: "AI-generated workout routines" },
  { icon: LineChart, label: "Full analytics, trends & all-time history" },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isYearly, setIsYearly] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 70%" };
      gsap.from("[data-price-eyebrow]", {
        opacity: 0, y: 10, duration: 0.5, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-price-head]", {
        opacity: 0, y: 20, duration: 0.8, delay: 0.15, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-price-belief]", {
        opacity: 0, y: 12, duration: 0.6, delay: 0.35, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-price-card]", {
        opacity: 0, y: 30, duration: 0.9, delay: 0.45, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-price-free]", {
        opacity: 0, y: 10, duration: 0.5, delay: 0.75, ease: "power3.out", scrollTrigger: trigger,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-light relative section-padding overflow-hidden rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] mx-2 sm:mx-4 lg:mx-8 my-10"
      style={{
        boxShadow: "0px -10px 40px rgba(255,255,255,0.02), 0px 20px 40px rgba(0,0,0,0.6)",
      }}
    >
      {/* Light Watermark Icon */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <Icon
          path={mdiCertificateOutline}
          size="680px"
          color="#000000"
          className="absolute -right-64 top-1/2 -translate-y-1/2 opacity-[0.03] -rotate-12"
        />
      </div>

      <div
        className="container-page relative text-center"
        aria-hidden="false"
      >
  
        <h2
          data-price-head
          className="font-heading font-light"
          style={{
            fontSize: "clamp(44px, 7vw, 96px)",
            letterSpacing: "-0.04em",
            lineHeight: "0.98em",
            color: "#111",
            margin: 0,
          }}
        >
          Fair pricing.{" "}
          <span className="text-italics" style={{ color: "rgba(17,17,17,0.45)" }}>
            No games.
          </span>
        </h2>

        <p
          data-price-belief
          className="mx-auto"
          style={{
            marginTop: "clamp(24px, 3vh, 36px)",
            fontSize: "clamp(16px, 1.3vw, 19px)",
            letterSpacing: "-0.01em",
            lineHeight: "1.55em",
            color: "rgba(17,17,17,0.55)",
            maxWidth: 580,
          }}
        >
          One plan unlocks everything. Lock in your founder's price today and keep it for life. The free tier is actually free — forever.
        </p>

        {/* Premium card — the only card */}
        <div
          data-price-card
          className="relative mx-auto mt-14 md:mt-20 rounded-[1.5rem] text-left overflow-hidden border border-white/10"
          style={{
            maxWidth: 520,
            background: "linear-gradient(145deg, #1A1A1A 0%, #0A0A0A 100%)",
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.05), " +
              "0 2px 4px rgba(0,0,0,0.4)," +
              "0 12px 32px -12px rgba(0,0,0,0.6)," +
              "0 40px 80px -30px rgba(0,0,0,0.8)",
          }}
        >
          {/* Subtle reflection overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[1.5rem]"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%)",
            }}
          />
          {/* Header row: label + toggle */}
          <div className="flex items-center justify-between px-8 pt-8 md:px-10 md:pt-10">
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Helthy Pro
            </p>

            <div className="flex items-center gap-2.5">
              <span
                className="text-[12px] font-medium"
                style={{ color: isYearly ? "rgba(255,255,255,0.4)" : "#fff" }}
              >
                Monthly
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isYearly}
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-[44px] h-[24px] rounded-full transition-colors duration-200 focus:outline-none"
                style={{
                  background: isYearly ? "#CDFF50" : "rgba(255,255,255,0.18)",
                }}
                aria-label="Toggle yearly/monthly pricing"
              >
                <span
                  className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    left: "3px",
                    transform: isYearly ? "translateX(20px)" : "translateX(0)",
                  }}
                />
              </button>
              <span
                className="text-[12px] font-medium"
                style={{ color: isYearly ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                Yearly
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="px-8 md:px-10 mt-8 relative">
            <div className="mb-5 text-center">
              <span
                className="font-heading text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ color: "#CDFF50" }}
              >
                Founders Special
              </span>
            </div>

            <div
              key={isYearly ? "yearly" : "monthly"}
              className="animate-in fade-in slide-in-from-bottom-2 duration-[400ms] ease-out"
            >
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span
                  className="text-numeric"
                  style={{
                    fontSize: "clamp(46px, 12vw, 84px)",
                    color: "#fff",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {isYearly ? "$19.99" : "$2.99"}
                </span>
                
                <span
                  className="text-numeric line-through"
                  style={{
                    fontSize: "clamp(24px, 5.5vw, 36px)",
                    color: "rgba(255,255,255,0.25)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {isYearly ? "$79.99" : "$9.99"}
                </span>

                <span
                  className="text-sm font-light ml-0.5"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {isYearly ? "/year" : "/mo"}
                </span>
              </div>
              <p
                className="text-[14px] mt-2 font-medium"
                style={{ color: "rgba(205,255,80,0.85)" }}
              >
                {isYearly 
                  ? "That's just $1.66 a month · Price locked in for life" 
                  : "Cancel anytime · Price locked in for life"
                }
              </p>
            </div>
          </div>

          {/* Features */}
          <ul className="mt-10 px-8 md:px-10 space-y-4">
            {PREMIUM_FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(205,255,80,0.16)" }}
                >
                  <Icon
                    className="w-3 h-3"
                    style={{ color: "#CDFF50" }}
                    strokeWidth={2}
                  />
                </div>
                <span
                  className="text-[14px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="px-8 md:px-10 pt-10 pb-8 md:pb-10">
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-[14px] w-full justify-center opacity-80"
              onClick={(e) => e.preventDefault()}
            >
              Pro Unlocks April 28
            </Link>
          </div>
        </div>

        {/* Free tier link */}
        <p
          data-price-free
          className="mt-10 text-[14px]"
          style={{ color: "rgba(17,17,17,0.55)" }}
        >
          Or{" "}
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-black"
            style={{ color: "rgba(17,17,17,0.85)" }}
          >
            use Helthy free, forever
          </Link>
          {" "}— manual logging, macros, Apple Health sync, all included.
        </p>
      </div>
    </section>
  );
}
