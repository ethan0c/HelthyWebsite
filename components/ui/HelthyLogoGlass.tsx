import React from "react";

interface HelthyLogoGlassProps {
  size?: number;
  className?: string;
}

export default function HelthyLogoGlass({
  size = 64,
  className = "",
}: HelthyLogoGlassProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Lime tinted base — lit from top-left */}
        <linearGradient id="lg_base" x1="20%" y1="8%" x2="82%" y2="92%">
          <stop offset="0%" stopColor="#D9F99D" stopOpacity="1" />
          <stop offset="45%" stopColor="#84CC16" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#3F6212" stopOpacity="0.9" />
        </linearGradient>

        {/* Primary specular hotspot — top-left */}
        <radialGradient id="lg_spec" cx="26%" cy="22%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="28%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* Depth shadow on unlit lobe */}
        <radialGradient id="lg_shadow" cx="70%" cy="72%" r="48%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Center core glow */}
        <radialGradient id="lg_core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="42%" stopColor="#D9F99D" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Semi-transparent lime petal fills ── */}
      <path
        d="M32 32 C18 20, 6 26, 8 38 C10 50, 24 54, 32 46"
        fill="url(#lg_base)"
        opacity={0.72}
      />
      <path
        d="M32 32 C46 20, 58 26, 56 38 C54 50, 40 54, 32 46"
        fill="url(#lg_base)"
        opacity={0.54}
      />
      <path
        d="M32 32 C20 18, 24 6, 32 8 C40 6, 44 18, 32 32"
        fill="url(#lg_base)"
        opacity={0.82}
      />

      {/* ── Depth shadow on right lobe ── */}
      <path
        d="M32 32 C46 20, 58 26, 56 38 C54 50, 40 54, 32 46"
        fill="url(#lg_shadow)"
      />

      {/* ── Specular overlay on lit lobes ── */}
      <path
        d="M32 32 C18 20, 6 26, 8 38 C10 50, 24 54, 32 46"
        fill="url(#lg_spec)"
      />
      <path
        d="M32 32 C20 18, 24 6, 32 8 C40 6, 44 18, 32 32"
        fill="url(#lg_spec)"
        opacity={0.72}
      />

      {/* ── Rim light on upper edges ── */}
      <path
        d="M32 32 C24 24, 12 27, 9 36"
        stroke="rgba(190,242,100,0.78)"
        strokeWidth={1.8}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M32 32 C25 20, 28 11, 32 9"
        stroke="rgba(255,255,255,0.68)"
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
      />

      {/* ── Center glint ── */}
      <circle cx={31} cy={27} r={5.5} fill="url(#lg_core)" />
      <circle cx={29} cy={25} r={2} fill="rgba(255,255,255,0.96)" />

      {/* ── Caustic scatter ── */}
      <circle cx={13} cy={37} r={1.5} fill="rgba(190,242,100,0.48)" />
      <circle cx={29} cy={12} r={1.2} fill="rgba(255,255,255,0.58)" />
    </svg>
  );
}