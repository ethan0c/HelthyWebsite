import Image from "next/image";
import type { ReactNode } from "react";

type ImageScreen = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  children?: never;
};
type CustomScreen = { children: ReactNode; src?: never; priority?: boolean; sizes?: string };

/**
 * Photographic device renders for the homepage hero (see the hero exception
 * in DESIGN.md). Each frame PNG has its screen punched out; the screen box
 * below is where that hole sits, as percentages of the frame, and the mask
 * is the hole's exact shape (corners, Dynamic Island, punch-hole camera)
 * grown 4px so no page colour shows between screen and bezel.
 */
const DEVICES = {
  iphone: {
    // Black titanium, made from the gold render (iphone-frame-photo.png)
    frame: "/phones/iphone-frame-photo-dark.png",
    mask: "/phones/iphone-frame-photo-mask.png",
    width: 1470,
    height: 3000,
    screen: { left: 4.898, top: 2.1, width: 90.204, height: 95.8 },
  },
  android: {
    frame: "/phones/android-frame-photo.png",
    mask: "/phones/android-frame-photo-mask.png",
    width: 1462,
    height: 2998,
    screen: { left: 3.146, top: 1.434, width: 93.639, height: 97.131 },
  },
  watch: {
    frame: "/phones/watch-frame-photo.png",
    mask: "/phones/watch-frame-photo-mask.png",
    width: 753,
    height: 1199,
    screen: { left: 13.135, top: 21.732, width: 73.73, height: 56.509 },
  },
} as const;

/**
 * Our screenshots are iPhone captures with the status bar in them (the top
 * 13% of the screenshot's width), including a Dynamic Island that would poke
 * out from under the frame's own. It's cropped off, and the app starts just
 * below the device's camera cutout instead, like a clean marketing render.
 */
const IOS_STATUS_BAR = "-13%";
const CONTENT_TOP = { iphone: "6%", android: "4.5%", watch: "0%" } as const;

export default function DeviceFrame(
  props: (ImageScreen | CustomScreen) & { device: keyof typeof DEVICES; className?: string },
) {
  const { device, className = "" } = props;
  const d = DEVICES[device];
  const mask = `url(${d.mask}) center / 100% 100% no-repeat`;
  const sizes = props.sizes ?? "(min-width: 1024px) 300px, 60vw";

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${d.width} / ${d.height}` }}>
      <div
        className="absolute overflow-hidden bg-[#0F0F0F]"
        style={{
          left: `${d.screen.left}%`,
          top: `${d.screen.top}%`,
          width: `${d.screen.width}%`,
          height: `${d.screen.height}%`,
          mask,
          WebkitMask: mask,
        }}
      >
        {"src" in props && props.src ? (
          <div
            className="absolute inset-x-0 bottom-0 overflow-hidden"
            style={{ top: CONTENT_TOP[device] }}
          >
            <Image
              src={props.src}
              alt={props.alt}
              width={props.width}
              height={props.height}
              priority={props.priority}
              sizes={sizes}
              className="block h-auto w-full"
              style={{ marginTop: IOS_STATUS_BAR }}
            />
          </div>
        ) : (
          props.children
        )}
      </div>
      {/* Device art last, so the bezel covers the screen edges */}
      <Image
        src={d.frame}
        alt=""
        width={d.width}
        height={d.height}
        priority={props.priority}
        sizes={sizes}
        className="pointer-events-none relative block h-auto w-full select-none"
      />
    </div>
  );
}
