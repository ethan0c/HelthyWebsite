import { useEffect, useRef } from "react";

interface MouseRingsProps {
  color?: string;       // stroke color
  minSize?: number;     // px
  maxSize?: number;     // px
  fadeMs?: number;      // life duration
  lineWidth?: number;   // stroke thickness
  density?: number;     // 0..1, lower = fewer spawns
  minDistance?: number; // px travel before next ring spawns
  maxRings?: number;    // cap the number of rings kept
  excludeSelector?: string; // CSS selector under which rings should not appear
}

// Draws fading hollow circles following the mouse, confined to the component bounds.
export default function MouseRings({
  color = "#CDFB50",
  minSize = 10,
  maxSize = 22,
  fadeMs = 900,
  lineWidth = 2,
  density = 1,
  minDistance = 18,
  maxRings = 64,
  excludeSelector,
}: MouseRingsProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ringsRef = useRef<Array<{x:number;y:number;r:number;born:number}> | null>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const lastSpawnRef = useRef<{x:number;y:number}|null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to wrapper size
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Helpers
    const now = () => performance.now();
    const randomBetween = (a:number,b:number) => a + Math.random()*(b-a);
    const spawn = (x:number, y:number) => {
      const rect = wrap.getBoundingClientRect();
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return;
      const r = randomBetween(minSize, maxSize);
      ringsRef.current!.push({ x: x - rect.left, y: y - rect.top, r, born: now() });
    };

    // Mouse/touch listeners on window; we filter by wrap bounds
    let throttle = 0;
    const shouldSpawn = (cx:number, cy:number) => {
      const last = lastSpawnRef.current;
      if (!last) return true;
      const dx = cx - last.x;
      const dy = cy - last.y;
      const dist = Math.hypot(dx, dy);
      return dist >= minDistance;
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      const t = now();
      const throttleMs = 24 * (1 / Math.max(0.2, Math.min(1, density))); // fewer spawns => higher throttle
      if (t - throttle < throttleMs) return;
      throttle = t;
      let cx = 0, cy = 0;
      if (e instanceof MouseEvent) { cx = e.clientX; cy = e.clientY; }
      else if (e.touches && e.touches[0]) { cx = e.touches[0].clientX; cy = e.touches[0].clientY; }
      else return;

      // If pointer is over an excluded region, skip spawning (do NOT clear existing rings)
      if (excludeSelector) {
        const el = document.elementFromPoint(cx, cy) as HTMLElement | null;
        if (el && el.closest(excludeSelector)) {
          return;
        }
      }

      if (!shouldSpawn(cx, cy)) return;
      spawn(cx, cy);
      lastSpawnRef.current = { x: cx, y: cy };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    // Draw loop
    const draw = () => {
      const t = now();
      const rect = wrap.getBoundingClientRect();
      if (canvas.width === 0 || canvas.height === 0) resize();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;

  const rings = ringsRef.current!;
      const keep: typeof rings = [];

      for (let i = 0; i < rings.length; i++) {
        const ring = rings[i];
        const life = (t - ring.born) / fadeMs; // 0..1
        if (life >= 1) continue;
        const alpha = 1 - life;
        ctx.globalAlpha = alpha * 0.9;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.stroke();
        keep.push(ring);
      }

      // Cap total rings to avoid buildup
      if (keep.length > maxRings) keep.splice(0, keep.length - maxRings);
      ringsRef.current = keep;
      ctx.globalAlpha = 1;
      lastTimeRef.current = t;
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove as any);
      window.removeEventListener("touchmove", onMove as any);
      ro.disconnect();
    };
  }, [color, minSize, maxSize, fadeMs, lineWidth, density, minDistance, maxRings, excludeSelector]);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-10">
      <canvas ref={canvasRef} />
    </div>
  );
}
