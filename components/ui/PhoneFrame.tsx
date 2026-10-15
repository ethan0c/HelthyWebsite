import Image from "next/image";
import type { ReactNode } from "react";

type ImageScreen = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  /**
   * How the screenshot's top meets the Dynamic Island. Leave unset for
   * screens whose top is fine under it (a full-bleed photo).
   * - "crop": an iPhone capture with the status bar in it; the bar (and its
   *   own island, which pokes out from under the frame's) is cropped off.
   * - "pad": a capture that starts right at the app's content; it's pushed
   *   down so the island doesn't cover the first line.
   */
  statusBar?: "crop" | "pad";
  children?: never;
};
type CustomScreen = { children: ReactNode; src?: never };

/**
 * Device frame geometry, measured off the 944x1902 frame render in
 * `/phones/iphone-frame.png`. The screen cut-out sits at x 51-892,
 * y 48-1853, all at 2x. Everything below is those numbers as percentages of
 * the frame, so the screen stays registered to the bezel at any width.
 */
const FRAME = { width: 944, height: 1902 };

/**
 * The screen box runs 4px past the cut-out on every side, under the bezel,
 * and is clipped by `/phones/iphone-screen-mask.png`: the bezel's exact
 * interior (Dynamic Island included), traced from the frame's alpha channel
 * and grown 3px. A CSS radius can't follow the squircle corner, and any gap
 * between the clip and the bezel shows the page through the transparent
 * frame, which reads as a white edge on light bands.
 */
const SCREEN_BOX = { x: 47, y: 44, width: 850, height: 1814 };

const SCREEN = {
  left: (SCREEN_BOX.x / FRAME.width) * 100,
  top: (SCREEN_BOX.y / FRAME.height) * 100,
  width: (SCREEN_BOX.width / FRAME.width) * 100,
  height: (SCREEN_BOX.height / FRAME.height) * 100,
};

const MASK = "url(/phones/iphone-screen-mask.png) center / 100% 100% no-repeat";

/**
 * An iPhone rendered from a real device frame, with the screenshot or live
 * mockup composited into the cut-out behind it. No tilt or drop shadow —
 * the frame art carries all the depth there is. Screens are top-aligned, so
 * a screenshot cropped shorter than a full screen just ends in app
 * background rather than stretching.
 *
 * Pass `children` instead of `src` to render a live mockup screen.
 */
export default function PhoneFrame(props: (ImageScreen | CustomScreen) & { className?: string }) {
  const { className = "" } = props;
  return (
    <div className={`relative aspect-[944/1902] ${className}`}>
      <div
        className="@container absolute overflow-hidden bg-[#0F0F0F]"
        style={{
          left: `${SCREEN.left}%`,
          top: `${SCREEN.top}%`,
          width: `${SCREEN.width}%`,
          height: `${SCREEN.height}%`,
          mask: MASK,
          WebkitMask: MASK,
        }}
      >
        {"src" in props && props.src ? (
          <div
            className="absolute inset-x-0 bottom-0 overflow-hidden"
            // 6% of the screen height clears the island
            style={{ top: props.statusBar ? "6%" : 0 }}
          >
            <Image
              src={props.src}
              alt={props.alt}
              width={props.width}
              height={props.height}
              priority={props.priority}
              sizes={props.sizes ?? "(min-width: 1024px) 300px, 60vw"}
              className="block h-auto w-full"
              // The iOS status bar is the top 13% of the screenshot's width
              style={props.statusBar === "crop" ? { marginTop: "-13%" } : undefined}
            />
          </div>
        ) : (
          props.children
        )}
      </div>
      {/* Bezel art last, so it covers the screen edges */}
      <Image
        src="/phones/iphone-frame.png"
        alt=""
        width={FRAME.width}
        height={FRAME.height}
        priority={"priority" in props ? props.priority : undefined}
        sizes={("sizes" in props && props.sizes) || "(min-width: 1024px) 300px, 60vw"}
        className="pointer-events-none relative block w-full select-none"
      />
    </div>
  );
}
