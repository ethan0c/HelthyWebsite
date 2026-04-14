/**
 * Decorative flowing line art — large sweeping arcs, loops, and curves
 * scattered across section backgrounds. Inspired by organic golden curves.
 */

// Each curve is an SVG path drawn inside a 200×200 viewBox
const CURVES = [
  // Large open arc sweeping right
  "M10,180 Q50,10 190,60",
  // S-curve
  "M20,20 C60,180 140,20 180,180",
  // Wide parabolic arc
  "M10,150 Q100,-20 190,150",
  // Tight loop
  "M30,100 C30,10 170,10 170,100 C170,190 30,190 30,100Z",
  // Diagonal sweep with curve
  "M10,190 Q80,80 190,10",
  // Double wave
  "M10,100 C50,30 80,170 120,100 C160,30 180,170 190,100",
  // Large circle arc (partial)
  "M20,120 A80,80 0 0,1 180,120",
  // Flowing ribbon
  "M10,40 C60,10 60,190 120,100 C180,10 190,160 190,160",
];

interface FloatingIconsProps {
  /** Which curve indices to render */
  curves?: number[];
  /** Positions as [top%, left%, widthPx, heightPx, rotation deg] */
  positions: [number, number, number, number, number][];
  /** Stroke opacity */
  opacity?: number;
  /** Stroke color (hex or CSS color) */
  color?: string;
  className?: string;
}

export default function FloatingIcons({
  curves,
  positions,
  opacity = 0.06,
  color = "#CDFF50",
  className,
}: FloatingIconsProps) {
  const selected = curves
    ? curves.map((i) => CURVES[i % CURVES.length])
    : CURVES;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {positions.map(([top, left, w, h, rotate], i) => (
        <svg
          key={i}
          width={w}
          height={h}
          viewBox="0 0 200 200"
          fill="none"
          preserveAspectRatio="none"
          className="absolute"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            opacity,
            transform: `rotate(${rotate}deg)`,
          }}
        >
          <path
            d={selected[i % selected.length]}
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      ))}
    </div>
  );
}
