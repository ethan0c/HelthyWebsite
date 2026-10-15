import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Helthy: every meal, every set";

/**
 * A small copy of the homepage hero: the headline over the device row.
 * public/phones/og-devices.jpg is a screenshot of the hero's device row
 * (watch, iPhone, Android) on the canvas colour, so it blends into the
 * background. Re-capture it when the hero devices change.
 */
const CANVAS = "#0F0F0F";

export default async function OgImage() {
  const [devices, fontBold] = await Promise.all([
    readFile(join(process.cwd(), "public/phones/og-devices.jpg")),
    readFile(join(process.cwd(), "public/fonts/unbounded/Unbounded-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 1200,
          height: 630,
          background: CANVAS,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: 54,
            fontFamily: "Unbounded",
            fontWeight: 700,
            fontSize: 72,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
          }}
        >
          Every meal.&nbsp;<span style={{ color: "#CDFB50" }}>Every set.</span>
        </div>

        {/* Devices rise from the bottom edge, like the hero */}
        <img
          src={`data:image/jpeg;base64,${devices.toString("base64")}`}
          style={{ position: "absolute", left: 150, top: 164, width: 900, height: 690 }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Unbounded", data: fontBold, weight: 700 }],
    },
  );
}
