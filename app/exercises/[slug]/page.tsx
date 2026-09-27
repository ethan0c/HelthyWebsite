import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SeoPage,
  PageHero,
  Section,
  LinkGrid,
  DownloadBanner,
  seoMetadata,
} from "@/components/seo/SeoPage";
import { EXERCISES, getExercise, type Exercise } from "@/lib/content/exercises";
import { LB_PER_KG } from "@/lib/calc";

export const dynamicParams = false;

export function generateStaticParams() {
  return EXERCISES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/exercises/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = getExercise(slug);
  if (!e) return {};
  const standards = e.ratios ? ", Common Mistakes & Strength Standards" : " & Common Mistakes";
  return seoMetadata({
    title: `${e.name}: Form Tips${standards}`,
    description: `How to do the ${e.name.toLowerCase()} with good form. Works the ${list(e.primaryMuscles)}. Form cues, common mistakes, breathing${e.ratios ? " and how much weight to use" : ""}.`,
    path: `/exercises/${e.slug}`,
  });
}

function list(items: string[]) {
  const lower = items.map((i) => i.toLowerCase());
  return lower.length <= 1 ? lower.join("") : `${lower.slice(0, -1).join(", ")} and ${lower.at(-1)}`;
}

const BODYWEIGHTS_LB = [130, 160, 190, 220, 250];
const LEVELS = ["beginner", "intermediate", "advanced"] as const;

function StrengthTable({ e }: { e: Exercise }) {
  if (!e.ratios) return null;
  const perDumbbell = e.equipment.startsWith("Dumbbell");
  const r = e.ratios;
  const fmt = (bwLb: number, ratio: number) => {
    const lb = Math.round((bwLb * ratio) / 5) * 5;
    return `${lb} lb (${Math.round(lb / LB_PER_KG)} kg)`;
  };

  return (
    <Section
      title={`How much weight should you use on the ${e.name.toLowerCase()}?`}
      intro={`These are typical working weights by experience level: the weight for your normal sets, not a one-rep max. Beginner is about ${r.beginner}× bodyweight, intermediate ${r.intermediate}× and advanced ${r.advanced}×${perDumbbell ? ", per dumbbell" : ""}. Helthy uses the same ratios to suggest your starting weight.`}
    >
      <div className="card-helthy overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-[14px]">
          <caption className="sr-only">
            {e.name} working weights by bodyweight and experience{perDumbbell ? ", per dumbbell" : ""}
          </caption>
          <thead>
            <tr className="border-b border-white/10 text-white/50">
              <th scope="col" className="px-5 py-4 font-medium">Bodyweight</th>
              {LEVELS.map((l) => (
                <th key={l} scope="col" className="px-5 py-4 font-medium capitalize">
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BODYWEIGHTS_LB.map((bw) => (
              <tr key={bw} className="border-b border-white/5 last:border-0">
                <th scope="row" className="px-5 py-4 font-normal text-white/75">
                  {bw} lb ({Math.round(bw / LB_PER_KG)} kg)
                </th>
                {LEVELS.map((l) => (
                  <td key={l} className="px-5 py-4 text-numeric text-white">
                    {fmt(bw, r[l])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export default async function ExercisePage({ params }: PageProps<"/exercises/[slug]">) {
  const { slug } = await params;
  const e = getExercise(slug);
  if (!e) notFound();

  const related = EXERCISES.filter((x) => x.group === e.group && x.slug !== e.slug).slice(0, 6);

  return (
    <SeoPage
      crumbs={[
        { name: "Exercises", href: "/exercises" },
        { name: e.name, href: `/exercises/${e.slug}` },
      ]}
    >
      <PageHero
        eyebrow={`${e.group} exercise`}
        title={
          <>
            How to do the <span className="text-helthy-lemon">{e.name.toLowerCase()}</span>
          </>
        }
        lede={e.tips}
      />

      <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: "Primary muscles", v: e.primaryMuscles.join(", ") },
          { k: "Also works", v: e.secondaryMuscles.join(", ") || "None" },
          { k: "Equipment", v: e.equipment },
          { k: "Difficulty", v: e.difficulty[0].toUpperCase() + e.difficulty.slice(1) },
        ].map((f) => (
          <div key={f.k} className="card-helthy p-5">
            <dt className="text-[12px] uppercase tracking-[0.14em] text-white/45">{f.k}</dt>
            <dd className="mt-2 text-[15px] text-white">{f.v}</dd>
          </div>
        ))}
      </dl>

      <Section title="Common mistakes">
        <ul className="max-w-3xl space-y-3">
          {e.commonMistakes.map((m) => (
            <li key={m} className="flex gap-3 text-[15px] leading-7 text-white/70">
              <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-helthy-lemon" />
              {m}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="How to breathe">
        <p className="max-w-3xl text-[15px] leading-7 text-white/70 sm:text-base">{e.breathing}</p>
      </Section>

      <StrengthTable e={e} />

      {related.length > 0 && (
        <Section title={`More ${e.group.toLowerCase()} exercises`}>
          <LinkGrid links={related.map((x) => ({ href: `/exercises/${x.slug}`, title: x.name }))} />
        </Section>
      )}

      <DownloadBanner
        title={`Track your ${e.name.toLowerCase()} in Helthy`}
        body="Log every set, see your PRs automatically, and browse 1,500 exercises with how-to and target muscles. Free on iOS and Android."
      />
    </SeoPage>
  );
}
