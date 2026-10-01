import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [phoneData, logoData, fontBold] = await Promise.all([
    readFile(join(process.cwd(), "public/phones/hero-iphone.png")),
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
            background: "radial-gradient(circle, rgba(205,251,80,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Left content: fixed width so text never runs under the phone */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "56px 0 56px 64px",
            width: 720,
          }}
        >
          <img src={logoSrc} style={{ height: 34, width: 116 }} />

          {/* Text block pushed to bottom */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <span
              style={{
                color: "#CDFB50",
                fontSize: 20,
                fontFamily: "Unbounded",
                fontWeight: 700,
                marginBottom: 18,
              }}
            >
              A coach that learns you
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: 56,
                fontFamily: "Unbounded",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              The Best Free Fitness App
            </span>
            <span style={{ color: "#9CA3AF", fontSize: 22, marginTop: 22, lineHeight: 1.5 }}>
              Photo meal logging · 1,500 exercises · AI coach
            </span>
            {/* Rating pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                marginTop: 28,
                background: "#1A1A1A",
                border: "1px solid #2E2E30",
                borderRadius: 999,
                padding: "10px 20px",
                gap: 10,
              }}
            >
              {/* SVG star: the font has no ★ glyph */}
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#CDFB50"
                  d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7L12 17.5 5.8 21.2l1.6-7L2 9.5l7.1-.6z"
                />
              </svg>
              <span style={{ color: "#CDFB50", fontSize: 18 }}>4.9</span>
              <span style={{ color: "#9CA3AF", fontSize: 16 }}>Free on iOS & Android</span>
            </div>
          </div>
        </div>

        {/* Phone bleeds off the bottom edge. Satori needs explicit width and height. */}
        <img
          src={phoneSrc}
          style={{ position: "absolute", right: 90, top: 56, width: 372, height: 760 }}
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
