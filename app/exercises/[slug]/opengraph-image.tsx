import { notFound } from "next/navigation";
import { EXERCISES, getExercise } from "@/lib/content/exercises";
import { OG, OG_SIZE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Exercise guide from Helthy";

export function generateStaticParams() {
  return EXERCISES.map((e) => ({ slug: e.slug }));
}

const LEVELS = ["beginner", "intermediate", "advanced"] as const;

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 756,
        top: 120,
        width: 372,
        height: 390,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 36px",
        background: OG.surface,
        border: `1px solid ${OG.line}`,
        borderRadius: 24,
      }}
    >
      {children}
    </div>
  );
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getExercise(slug);
  if (!e) notFound();

  // Strength standards when the guide has them, otherwise the muscles worked
  const side = e.ratios ? (
    <Panel>
      <span style={{ color: OG.fgMuted, fontSize: 22 }}>Working weight</span>
      {LEVELS.map((l, i) => (
        <div
          key={l}
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            padding: "18px 0",
            borderBottom: i < LEVELS.length - 1 ? `1px solid ${OG.line}` : "none",
          }}
        >
          <span style={{ color: OG.fg, fontSize: 24, textTransform: "capitalize" }}>{l}</span>
          <span style={{ color: OG.fg, fontSize: 40, fontFamily: "Unbounded" }}>
            {e.ratios![l]}×
          </span>
        </div>
      ))}
      <span style={{ color: OG.fgSubtle, fontSize: 20, marginTop: 6 }}>
        {e.equipment.startsWith("Dumbbell") ? "bodyweight, per dumbbell" : "bodyweight"}
      </span>
    </Panel>
  ) : (
    <Panel>
      <span style={{ color: OG.fgMuted, fontSize: 22 }}>Works</span>
      <span style={{ color: OG.fg, fontSize: 36, fontFamily: "Unbounded", marginTop: 12, lineHeight: 1.2 }}>
        {e.primaryMuscles.join(", ")}
      </span>
      {e.secondaryMuscles.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", marginTop: 36 }}>
          <span style={{ color: OG.fgMuted, fontSize: 22 }}>Also</span>
          <span style={{ color: OG.fg, fontSize: 26, marginTop: 10, lineHeight: 1.35 }}>
            {e.secondaryMuscles.join(", ")}
          </span>
        </div>
      )}
    </Panel>
  );

  return ogCard({
    eyebrow: `Exercise guide · ${e.group}`,
    lines: [e.name],
    titleSize: e.name.length > 16 ? 64 : 80,
    side,
  });
}
