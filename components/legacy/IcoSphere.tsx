import React, { useEffect, useMemo, useRef } from 'react';

type Vec3 = [number, number, number];

export interface IcoSphereProps {
  size?: number; // CSS size in px
  colorA: string; // base/primary
  colorB: string; // accent/secondary
  subdivisions?: 0 | 1 | 2; // level of detail
  ambient?: number; // 0..1
  lightDir?: Vec3; // direction of light
  rotationSpeed?: number; // radians per second
  animate?: boolean;
  highlighted?: boolean; // add glow ring
  className?: string;
  style?: React.CSSProperties;
}

// Utility: clamp
const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));

// Utility: parse #RGB / #RRGGBB / #RRGGBBAA
function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim();
  if (h.startsWith('#')) h = h.slice(1);
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return [r, g, b];
  }
  if (h.length === 6 || h.length === 8) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return [r, g, b];
  }
  // Fallback to white if unknown
  return [255, 255, 255];
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixColor(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
}

function vecNormalize([x, y, z]: Vec3): Vec3 {
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
}

function vecCross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function matMulVec(m: number[], v: Vec3): Vec3 {
  // 3x3 matrix * vec3
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}

function rotXY(rx: number, ry: number): number[] {
  // R = Ry * Rx (3x3)
  const sx = Math.sin(rx), cx = Math.cos(rx);
  const sy = Math.sin(ry), cy = Math.cos(ry);
  // Rx
  const rxm = [
    1, 0, 0,
    0, cx, -sx,
    0, sx, cx,
  ];
  // Ry
  const rym = [
    cy, 0, sy,
    0, 1, 0,
    -sy, 0, cy,
  ];
  // R = Ry * Rx
  const m = new Array(9).fill(0);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      m[r * 3 + c] = rym[r * 3 + 0] * rxm[0 * 3 + c] + rym[r * 3 + 1] * rxm[1 * 3 + c] + rym[r * 3 + 2] * rxm[2 * 3 + c];
    }
  }
  return m;
}

interface Tri {
  v0: Vec3;
  v1: Vec3;
  v2: Vec3;
}

function createIcosahedron(): { vertices: Vec3[]; faces: [number, number, number][] } {
  const t = (1 + Math.sqrt(5)) / 2; // golden ratio
  let verts: Vec3[] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(v => vecNormalize(v as Vec3));

  const faces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  return { vertices: verts, faces };
}

function midpointCacheKey(a: number, b: number) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function subdivide(vertices: Vec3[], faces: [number, number, number][]): { vertices: Vec3[]; faces: [number, number, number][] } {
  const newVerts = vertices.slice();
  const cache = new Map<string, number>();

  function getMidpoint(i1: number, i2: number): number {
    const key = midpointCacheKey(i1, i2);
    const cached = cache.get(key);
    if (cached !== undefined) return cached;
    const v1 = newVerts[i1];
    const v2 = newVerts[i2];
    const mid: Vec3 = vecNormalize([(v1[0] + v2[0]) / 2, (v1[1] + v2[1]) / 2, (v1[2] + v2[2]) / 2]);
    const idx = newVerts.push(mid) - 1;
    cache.set(key, idx);
    return idx;
  }

  const newFaces: [number, number, number][] = [];
  for (const [a, b, c] of faces) {
    const ab = getMidpoint(a, b);
    const bc = getMidpoint(b, c);
    const ca = getMidpoint(c, a);
    newFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
  }
  return { vertices: newVerts, faces: newFaces };
}

function buildIcoSphere(subdivisions: number): Tri[] {
  let { vertices, faces } = createIcosahedron();
  for (let i = 0; i < subdivisions; i++) {
    ({ vertices, faces } = subdivide(vertices, faces));
  }
  const tris: Tri[] = faces.map(([a, b, c]) => ({ v0: vertices[a], v1: vertices[b], v2: vertices[c] }));
  return tris;
}

export default function IcoSphere({
  size = 96,
  colorA,
  colorB,
  subdivisions = 1,
  ambient = 0.25,
  lightDir = [-0.4, 0.8, 0.4],
  rotationSpeed = Math.PI / 8,
  animate = true,
  highlighted = false,
  className,
  style,
}: IcoSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tris = useMemo(() => buildIcoSphere(subdivisions), [subdivisions]);
  const baseA = useMemo(() => hexToRgb(colorA), [colorA]);
  const baseB = useMemo(() => hexToRgb(colorB), [colorB]);
  const light = useMemo(() => vecNormalize(lightDir), [lightDir]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const context = ctx as CanvasRenderingContext2D;

    let mounted = true;
    let raf = 0;
    const dpr = (typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1;
    const cssSize = size;
    canvas.width = Math.max(1, Math.floor(cssSize * dpr));
    canvas.height = Math.max(1, Math.floor(cssSize * dpr));
    canvas.style.width = `${cssSize}px`;
    canvas.style.height = `${cssSize}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const r = cssSize / 2;

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const startTime = performance.now();

    function drawFrame(now: number) {
      if (!mounted) return;
      const t = (now - startTime) / 1000;
      
      // Smooth vertical bounce animation
      let rotX = 0.2;
      let rotY = 0.4;
      let offsetY = 0;
      
      if (animate && !prefersReduced) {
        // Gentle vertical bounce - eased sine wave
        offsetY = Math.abs(Math.sin(t * 2.5)) * -8; // bounce up 8px max
      }
      
      const R = rotXY(rotX, rotY);

      context.clearRect(0, 0, cssSize, cssSize);

      // Soft outer glow if highlighted
      if (highlighted) {
        const glowGrad = context.createRadialGradient(r, r, r * 0.65, r, r, r);
        const [g0r, g0g, g0b] = baseA;
        glowGrad.addColorStop(0, `rgba(${g0r}, ${g0g}, ${g0b}, 0.25)`);
        glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
        context.fillStyle = glowGrad;
        context.beginPath();
        context.arc(r, r, r, 0, Math.PI * 2);
        context.fill();
      }

      // Apply vertical offset for bounce
      context.save();
      context.translate(0, offsetY);

      // Clip to circle so edges are perfect
      context.save();
      context.beginPath();
      context.arc(r, r, r * 0.98, 0, Math.PI * 2);
      context.clip();

      // Project + sort tris by depth (orthographic)
      const projected: Array<{ p0: [number, number]; p1: [number, number]; p2: [number, number]; nz: number; shade: number; mixT: number; zAvg: number; }> = [];
      for (const tri of tris) {
        const v0 = matMulVec(R, tri.v0);
        const v1 = matMulVec(R, tri.v1);
        const v2 = matMulVec(R, tri.v2);

        // normal
        const e1: Vec3 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
        const e2: Vec3 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];
        const n = vecNormalize(vecCross(e1, e2));
        // backface cull slightly (but keep some for fullness)
        const facing = n[2] > -0.6; // allow some back to show for roundness
        if (!facing) continue;

        const lambert = clamp(ambient + Math.max(0, n[0] * light[0] + n[1] * light[1] + n[2] * light[2]), 0, 1);
        const mixT = clamp(0.5 + 0.5 * n[1], 0, 1); // vary color by latitude

        const s = r * 0.95; // scale to canvas
        const p0: [number, number] = [r + v0[0] * s, r + v0[1] * s];
        const p1: [number, number] = [r + v1[0] * s, r + v1[1] * s];
        const p2: [number, number] = [r + v2[0] * s, r + v2[1] * s];
        const zAvg = (v0[2] + v1[2] + v2[2]) / 3;
        projected.push({ p0, p1, p2, nz: n[2], shade: lambert, mixT, zAvg });
      }
      projected.sort((a, b) => a.zAvg - b.zAvg); // back to front

      // Fill tris
      for (const tTri of projected) {
        const base = mixColor(baseA, baseB, tTri.mixT);
        const cr = Math.round(base[0] * tTri.shade);
        const cg = Math.round(base[1] * tTri.shade);
        const cb = Math.round(base[2] * tTri.shade);
  context.fillStyle = `rgb(${cr}, ${cg}, ${cb})`;
  context.beginPath();
  context.moveTo(tTri.p0[0], tTri.p0[1]);
  context.lineTo(tTri.p1[0], tTri.p1[1]);
  context.lineTo(tTri.p2[0], tTri.p2[1]);
  context.closePath();
  context.fill();
      }

      // Specular-ish highlight overlay
  const spec = context.createRadialGradient(r - r * 0.25, r - r * 0.25, r * 0.05, r - r * 0.25, r - r * 0.25, r * 0.5);
      spec.addColorStop(0, 'rgba(255,255,255,0.35)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = spec;
  context.beginPath();
  context.arc(r, r, r, 0, Math.PI * 2);
  context.fill();

      context.restore();

      // Inner shadow for depth
      const inner = context.createRadialGradient(r + r * 0.2, r + r * 0.25, r * 0.2, r, r, r * 0.95);
      inner.addColorStop(0, 'rgba(0,0,0,0)');
      inner.addColorStop(1, 'rgba(0,0,0,0.25)');
      context.fillStyle = inner;
      context.beginPath();
      context.arc(r, r, r, 0, Math.PI * 2);
      context.fill();

      // Restore transforms (clip + vertical offset)
      context.restore();
      context.restore();

      raf = requestAnimationFrame(drawFrame);
    }

    raf = requestAnimationFrame(drawFrame);
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [animate, ambient, baseA, baseB, light, rotationSpeed, size, tris, highlighted]);  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '9999px',
        boxShadow: highlighted
          ? `0 8px 32px rgba(0,0,0,0.2), 0 0 0 4px rgba(${hexToRgb(colorA).join(',')},0.25), inset 0 0 20px rgba(${hexToRgb(colorA).join(',')},0.35)`
          : `0 6px 20px rgba(0,0,0,0.15)`,
        ...style,
      }}
      aria-hidden
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
