import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import type { ReactNode } from "react";

/**
 * Shared layout for per-page link preview cards (opengraph-image.tsx in a
 * route folder). Wordmark top left, eyebrow and big title bottom left, and a
 * page-specific visual on the right. Satori can't read CSS variables, so the
 * dark theme tokens from globals.css are repeated here.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export const OG = {
  canvas: "#0F0F0F",
  surface: "#171717",
  line: "#262626",
  fg: "#FFFFFF",
  fgMuted: "#A3A3A3",
  fgSubtle: "#8A8A8A",
  accent: "#CDFB50",
};

const file = (path: string) => readFile(join(process.cwd(), "public", path));

/** A framed iPhone render as a data URI, 735×1500. */
export async function ogPhone(screen: "food" | "workout") {
  const png = await file(screen === "food" ? "phones/hero-iphone.png" : "phones/iphone-workout.png");
  return `data:image/png;base64,${png.toString("base64")}`;
}

export async function ogCard({
  eyebrow,
  lines,
  titleSize = 64,
  side,
}: {
  eyebrow: string;
  titleSize?: number;
  /** Title lines. Satori doesn't lay out fragments or mixed-colour inline text, so each line is its own flex row. */
  lines: ReactNode[];
  /** Absolutely positioned visual for the right of the card. */
  side: ReactNode;
}) {
  const [logo, unbounded, geist] = await Promise.all([
    file("logos/logo-long-white.png"),
    file("fonts/unbounded/Unbounded-Bold.ttf"),
    file("fonts/geist/Geist-Medium.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          background: OG.canvas,
          position: "relative",
          overflow: "hidden",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 680,
            padding: "52px 0 64px 72px",
          }}
        >
          {/* The wordmark's letters sit at two-thirds of the file height */}
          <img
            src={`data:image/png;base64,${logo.toString("base64")}`}
            style={{ width: 150, height: 44 }}
          />
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <span style={{ color: OG.fgMuted, fontSize: 26, marginBottom: 20 }}>{eyebrow}</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Unbounded",
                fontSize: titleSize,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: OG.fg,
              }}
            >
              {lines.map((line, i) => (
                <div key={i} style={{ display: "flex" }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
        {side}
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Unbounded", data: unbounded, weight: 700 },
        { name: "Geist", data: geist, weight: 500 },
      ],
    },
  );
}
