import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string; // e.g. "/logos/foo.png" or "/images/bar.jpg"; .svg supported with optional webpSrc
  webpSrc?: string; // optional explicit webp path; default derives for png/jpg/jpeg
};

/**
 * Picture renders a WebP <source> with an <img> fallback.
 * If webpSrc is provided, it will be used regardless of the original src extension (works for SVG too).
 * Otherwise, for PNG/JPG/JPEG, a .webp path is derived automatically.
 */
export default function Picture({ src, webpSrc, alt, ...imgProps }: Props) {
  const lower = src.toLowerCase();
  const isRaster = lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg');
  const derivedWebp = isRaster ? src.replace(/\.(png|jpg|jpeg)$/i, '.webp') : undefined;
  const finalWebp = webpSrc ?? derivedWebp;

  if (!finalWebp) {
    return <img src={src} alt={alt} {...imgProps} />;
  }

  return (
    <picture>
      <source srcSet={finalWebp} type="image/webp" />
      <img src={src} alt={alt} {...imgProps} />
    </picture>
  );
}
