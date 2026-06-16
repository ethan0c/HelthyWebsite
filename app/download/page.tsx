import type { Metadata } from "next";
import CTAButton from "@/components/ui/CTAButton";
import AndroidWaitlistButton from "@/components/ui/AndroidWaitlistButton";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Download Helthy",
  description: "Get Helthy free on the App Store or Google Play.",
};

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

export default function DownloadPage() {
  return (
    <>
      <main
        className="relative flex flex-col items-center justify-center px-6 text-center pt-40 pb-24"
        style={{
          background: "linear-gradient(180deg, #080d10 10%, #41515a 45%, #3f4e56 65%, #0A0A0A 100%)",
        }}
      >
        {/* Grain texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: "url(/textures/hero-noise.png)",
            backgroundSize: "260px",
            opacity: 0.35,
          }}
        />
        {/* Top fade */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: 160, background: "linear-gradient(#0A0A0A 0%, transparent 100%)", zIndex: 1 }}
        />
        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: 160, background: "linear-gradient(transparent 0%, #0A0A0A 100%)", zIndex: 1 }}
        />
        <h1
          className="font-heading"
          style={{
            fontSize: "clamp(28px, 7vw, 40px)",
            fontWeight: 500,
            letterSpacing: "-0.035em",
            lineHeight: "1.08em",
            color: "#F9F9F9",
          }}
        >
          Download{" "}
          <span style={{ color: "#CDFF50" }}>Helthy</span>
        </h1>

        <p
          className="mt-4"
          style={{
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "-0.005em",
            lineHeight: "1.5em",
            color: "rgba(249,249,249,0.55)",
            fontFamily: "var(--font-body)",
            maxWidth: 300,
          }}
        >
          Free on iOS & Android. No card required.
        </p>

        {/* Store buttons */}
        <div className="flex flex-col items-center gap-3 mt-10">
          <CTAButton
            href={APP_STORE_URL}
            variant="primary"
            size="md"
            icon={
              <svg width="14" height="14" viewBox="0 0 256 256" aria-hidden="true">
                <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" fill="#0B0B0B" />
              </svg>
            }
          >
            App Store
          </CTAButton>
          <AndroidWaitlistButton size="md" />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
