import { notFound } from "next/navigation";
import { COMPARISONS, getComparison } from "@/lib/content/comparisons";
import { OG, OG_SIZE, ogCard, ogPhone } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Helthy compared with another fitness app";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  return ogCard({
    titleSize: c.competitor.length > 10 ? 68 : 88,
    eyebrow: c.category === "nutrition" ? "Calorie tracker comparison" : "Workout tracker comparison",
    lines: [
      [
        <span key="helthy" style={{ color: OG.accent }}>Helthy</span>,
        <span key="vs" style={{ marginLeft: "0.3em" }}>vs</span>,
      ],
      c.competitor,
    ],
    side: (
      // The phone shows the screen the comparison is about, and runs off the bottom edge
      <img
        src={await ogPhone(c.category === "nutrition" ? "food" : "workout")}
        style={{ position: "absolute", left: 790, top: 64, width: 320, height: 653 }}
      />
    ),
  });
}
