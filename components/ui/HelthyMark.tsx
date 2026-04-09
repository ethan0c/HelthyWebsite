/**
 * HelthyMark — the brand symbol that represents Helthy AI.
 * Four overlapping petals + center dot. Use anywhere AI is mentioned.
 */
interface HelthyMarkProps {
  size?: number;
  color1?: string;
  color2?: string;
  pulse?: boolean;
  className?: string;
}

export default function HelthyMark({
  size = 32,
  color1 = "#CDFF50",
  color2 = "#7BB820",
  pulse = false,
  className = "",
}: HelthyMarkProps) {
  const gradId = `hg-${color1.replace("#", "")}-${color2.replace("#", "")}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`${pulse ? "animate-helthy-pulse" : ""} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor={color1} stopOpacity="1" />
          <stop offset="100%" stopColor={color2} stopOpacity="1" />
        </radialGradient>
      </defs>
      <path
        d="M32 32 C18 20, 6 26, 8 38 C10 50, 24 54, 32 46"
        fill={`url(#${gradId})`}
        opacity={0.9}
      />
      <path
        d="M32 32 C46 20, 58 26, 56 38 C54 50, 40 54, 32 46"
        fill={`url(#${gradId})`}
        opacity={0.7}
      />
      <path
        d="M32 32 C20 18, 24 6, 32 8 C40 6, 44 18, 32 32"
        fill={`url(#${gradId})`}
        opacity={0.85}
      />
      <path
        d="M32 28 C36 26, 38 30, 36 34 C34 38, 28 38, 26 34 C24 30, 28 26, 32 28Z"
        fill={color1}
        opacity={1}
      />
    </svg>
  );
}
