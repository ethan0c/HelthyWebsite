import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface PhoneFrameProps {
  src: string;
  alt: string;
  /** Width in px of the rendered frame. Aspect is locked at iPhone 15 Pro. */
  width?: number;
  className?: string;
  priority?: boolean;
}

/**
 * iPhone-style chrome around an in-app screenshot. Pure CSS frame —
 * no asset dependency, retina sharp at any size.
 */
export default function PhoneFrame({
  src,
  alt,
  width = 320,
  className,
  priority,
}: PhoneFrameProps) {
  // iPhone 15 Pro is ~9:19.5
  const height = Math.round(width * (19.5 / 9));
  return (
    <div
      className={cn("relative select-none", className)}
      style={{ width, height }}
    >
      {/* Outer titanium ring */}
      <div
        className="absolute inset-0 rounded-[3rem] p-[3px]"
        style={{
          background:
            "linear-gradient(135deg, #2a2a2c 0%, #444446 25%, #1c1c1e 50%, #3a3a3c 75%, #1a1a1c 100%)",
          boxShadow:
            "0 50px 80px -30px rgba(0,0,0,0.6), 0 30px 50px -25px rgba(205,251,80,0.18), inset 0 1px 0 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Inner bezel */}
        <div className="relative w-full h-full rounded-[2.85rem] bg-black overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`${width}px`}
            className="object-cover"
            priority={priority}
          />
          {/* Dynamic island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-[22px] w-[100px] rounded-full bg-black z-10" />
        </div>
      </div>
    </div>
  );
}
