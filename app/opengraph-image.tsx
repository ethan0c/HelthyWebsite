import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [phoneData, logoData, fontBold] = await Promise.all([
    readFile(join(process.cwd(), "public/phones/mobile-hero.png")),
    readFile(join(process.cwd(), "public/logos/logo-long-white.png")),
    readFile(join(process.cwd(), "public/fonts/unbounded/Unbounded-Bold.ttf")),
  ]);

  const phoneSrc = `data:image/png;base64,${phoneData.toString("base64")}`;
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: 1200,
          height: 630,
          background: "#0A0A0A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle lemon glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(205,255,80,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Left content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "56px 48px 56px 64px",
            flex: 1,
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <img
            src={logoSrc}
            style={{ height: 34, width: "auto", objectFit: "contain", objectPosition: "left" }}
          />

          {/* Text block pushed to bottom */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "auto",
            }}
          >
            <span
              style={{
                color: "#CDFF50",
                fontSize: 14,
                fontFamily: "Unbounded",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              A coach that learns you
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: 50,
                fontFamily: "Unbounded",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              The Best Free Fitness App
            </span>
            <span
              style={{
                color: "#9CA3AF",
                fontSize: 18,
                marginTop: 22,
                lineHeight: 1.5,
                maxWidth: 540,
              }}
            >
              Photo meal logging · 1,500 exercises · AI coach · Free forever
            </span>
            {/* Rating pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 28,
                background: "#1A1A1A",
                border: "1px solid #2E2E30",
                borderRadius: 999,
                padding: "8px 18px",
                width: "fit-content",
                gap: 8,
              }}
            >
              <span style={{ color: "#CDFF50", fontSize: 16 }}>★ 4.7</span>
              <span style={{ color: "#6B7280", fontSize: 14 }}>App Store · iOS & Android</span>
            </div>
          </div>
        </div>

        {/* Right phone */}
        <div
          style={{
            position: "absolute",
            right: -30,
            top: -40,
            display: "flex",
          }}
        >
          <img
            src={phoneSrc}
            style={{ height: 720, width: "auto" }}
          />
        </div>

        {/* Fade on right edge of left panel so phone blends in */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 280,
            width: 160,
            height: 630,
            background: "linear-gradient(to right, transparent, #0A0A0A)",
            zIndex: 2,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Unbounded",
          data: fontBold,
          weight: 700,
        },
      ],
    }
  );
}
