import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Download Helthy",
  description: "Get Helthy free on the App Store or Google Play.",
};

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.helthy.mobile";

export default function DownloadPage() {
  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#0A0A0A" }}
    >
      {/* Logo */}
      <Image
        src="/logos/logo-white.png"
        alt="Helthy"
        width={48}
        height={48}
        priority
      />

      <h1
        className="font-heading mt-8"
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
      <div className="flex flex-col gap-3 mt-10 w-full" style={{ maxWidth: 300 }}>
        {/* App Store */}
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full"
          style={{
            padding: "14px 20px",
            borderRadius: 999,
            background: "#F9F9F9",
            color: "#0A0A0A",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: "-0.005em",
            textDecoration: "none",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 256 256" aria-hidden="true" fill="currentColor">
            <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" />
          </svg>
          App Store
        </a>

        {/* Google Play */}
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full"
          style={{
            padding: "14px 20px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.07)",
            border: "1.5px solid rgba(255,255,255,0.1)",
            color: "#F9F9F9",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: "-0.005em",
            textDecoration: "none",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.332a1 1 0 0 1 0 1.72L17.698 13.892l-2.467-2.467 2.467-2.467zM5.864 3.458L16.801 9.79l-2.302 2.302-8.635-8.635z" />
          </svg>
          Google Play
        </a>
      </div>

      <Link
        href="/"
        style={{
          marginTop: 40,
          fontSize: 13,
          color: "rgba(249,249,249,0.35)",
          fontFamily: "var(--font-body)",
          textDecoration: "none",
        }}
      >
        Back to helthy.app
      </Link>
    </main>
  );
}
