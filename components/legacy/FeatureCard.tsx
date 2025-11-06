import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Picture from "@/components/ui/Picture";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  leftColor?: string;
  rightColor?: string;
  className?: string;
}

/**
 * FeatureCard — visual card with image and caption.
 * Clean design with improved typography.
 */
export function FeatureCard({
  title,
  subtitle,
  imageSrc,
  leftColor = "#F8CB6E",
  rightColor = "#7FBAD1",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex w-[86vw] sm:w-[78vw] md:w-[520px] lg:w-[529px] h-auto pt-0 pr-0 pb-10 pl-0 flex-col gap-[30px] justify-center items-start shrink-0 bg-[rgba(255,255,255,0.05)] rounded-[40px] border border-[rgba(255,255,255,0.1)] relative snap-center",
        className
      )}
    >
      {/* Image area with exact aspect ratio 529/382 */}
      <div className="w-full h-auto rounded-[40px] relative overflow-hidden">
        <AspectRatio ratio={529 / 382}>
          {(() => {
            const lower = imageSrc.toLowerCase();
            const webpCandidate = lower.endsWith('.svg')
              ? imageSrc.replace(/\.svg(\?.*)?$/i, '.webp')
              : undefined;
            return (
              <Picture
                src={imageSrc}
                webpSrc={webpCandidate}
                alt={title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            );
          })()}
        </AspectRatio>
      </div>

      {/* Caption */}
      <div className="flex flex-col gap-3 items-start self-stretch px-6 lg:px-8">
  <h3 className="text-[26px] lg:text-[32px] font-normal leading-[1.15] text-white tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
          {title}
        </h3>
        <p className="font-sans text-[16px] lg:text-[18px] font-normal leading-[1.4] text-white/70">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;
