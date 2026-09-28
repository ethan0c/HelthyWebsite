import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoPage, DownloadBanner, seoMetadata } from "@/components/seo/SeoPage";
import JsonLd from "@/components/seo/JsonLd";
import { EXERCISES, getExercise, type Exercise } from "@/lib/content/exercises";
import { getExerciseArticle } from "@/lib/content/exerciseArticles";
import { formatDate } from "@/lib/blog";
import { LB_PER_KG } from "@/lib/calc";
import { SITE_URL, absoluteUrl } from "@/lib/site";

// Scheduled posts go live on their date (and links to them start working)
// without a redeploy: re-render at most once an hour.
export const revalidate = 3600;

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
  const article = await getExerciseArticle(slug);
  const standards = e.ratios ? ", Common Mistakes & Strength Standards" : " & Common Mistakes";
  return seoMetadata({
    title: `${e.name}: Form Tips${standards}`,
    description:
      article?.meta.description ??
      `How to do the ${e.name.toLowerCase()} with good form. Works the ${list(e.primaryMuscles)}. Form cues, common mistakes, breathing${e.ratios ? " and how much weight to use" : ""}.`,
    path: `/exercises/${e.slug}`,
  });
}

function list(items: string[]) {
  const lower = items.map((i) => i.toLowerCase());
  return lower.length <= 1 ? lower.join("") : `${lower.slice(0, -1).join(", ")} and ${lower.at(-1)}`;
}

const BODYWEIGHTS_LB = [130, 160, 190, 220, 250];
const LEVELS = ["beginner", "intermediate", "advanced"] as const;

/** Rendered where the article writes <StrengthTable />. */
function StrengthTable({ e }: { e: Exercise }) {
  if (!e.ratios) return null;
  const perDumbbell = e.equipment.startsWith("Dumbbell");
  const r = e.ratios;
  const fmt = (bwLb: number, ratio: number) => {
    const lb = Math.round((bwLb * ratio) / 5) * 5;
    return `${lb} lb (${Math.round(lb / LB_PER_KG)} kg)`;
  };

  return (
    <figure className="my-8">
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-[15px]">
          <caption className="sr-only">
            {e.name} working weights by bodyweight and experience{perDumbbell ? ", per dumbbell" : ""}
          </caption>
          <thead>
            <tr className="border-b border-line text-fg-subtle">
              <th scope="col" className="px-5 py-3 text-[14px] font-medium">Bodyweight</th>
              {LEVELS.map((l) => (
                <th key={l} scope="col" className="px-5 py-3 text-[14px] font-medium capitalize">
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BODYWEIGHTS_LB.map((bw) => (
              <tr key={bw} className="border-b border-line last:border-0">
                <th scope="row" className="px-5 py-3 font-normal text-fg-muted">
                  {bw} lb ({Math.round(bw / LB_PER_KG)} kg)
                </th>
                {LEVELS.map((l) => (
                  <td key={l} className="px-5 py-3 tabular-nums text-fg">
                    {fmt(bw, r[l])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-[13px] leading-6 text-fg-subtle">
        Working weights for your normal sets, not one-rep maxes: about {r.beginner}× bodyweight for
        beginners, {r.intermediate}× for intermediate and {r.advanced}× for advanced lifters
        {perDumbbell ? ", per dumbbell" : ""}.
      </figcaption>
    </figure>
  );
}

export default async function ExercisePage({ params }: PageProps<"/exercises/[slug]">) {
  const { slug } = await params;
  const e = getExercise(slug);
  const article = e && (await getExerciseArticle(slug));
  if (!e || !article) notFound();
  const { meta, Content, readingMinutes } = article;

  const related = EXERCISES.filter((x) => x.group === e.group && x.slug !== e.slug).slice(0, 5);

  return (
    <SeoPage
      tone="light"
      closing={
        <DownloadBanner
          tone="dark"
          title={`Track your ${e.name.toLowerCase()} in Helthy`}
          body="Log every set, see your PRs automatically, and browse 1,500 exercises with how-to and target muscles. Free on iOS and Android."
        />
      }
      crumbs={[
        { name: "Exercises", href: "/exercises" },
        { name: e.name, href: `/exercises/${e.slug}` },
      ]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `How to do the ${e.name.toLowerCase()}`,
          description: meta.description,
          dateModified: meta.updated,
          author: { "@type": "Organization", name: "Helthy" },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: absoluteUrl(`/exercises/${e.slug}`),
        }}
      />

      <article className="max-w-3xl">
        <header>
          <h1 className="text-display-xl text-fg">
            How to do the <span className="text-highlight">{e.name.toLowerCase()}</span>
          </h1>
          <p className="mt-6 text-lede">{meta.description}</p>
          <p className="mt-6 text-[13px] text-fg-subtle">
            The Helthy team · Updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time> ·{" "}
            {readingMinutes} min read
          </p>
        </header>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-4">
          {[
            { k: "Works", v: e.primaryMuscles.join(", ") },
            { k: "Also works", v: e.secondaryMuscles.join(", ") || "None" },
            { k: "Equipment", v: e.equipment },
            { k: "Level", v: e.difficulty[0].toUpperCase() + e.difficulty.slice(1) },
          ].map((f) => (
            <div key={f.k}>
              <dt className="text-[13px] text-fg-subtle">{f.k}</dt>
              <dd className="mt-1 text-[15px] font-medium text-fg">{f.v}</dd>
            </div>
          ))}
        </dl>

        <div className="pt-2">
          <Content components={{ StrengthTable: () => <StrengthTable e={e} /> }} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-24 max-w-3xl">
          <h2 className="text-display-md text-fg">More {e.group.toLowerCase()} exercises</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {related.map((x) => (
              <li key={x.slug}>
                <Link href={`/exercises/${x.slug}`} className="group block py-5">
                  <span className="text-[16px] font-medium text-fg underline-offset-4 group-hover:underline">
                    {x.name}
                  </span>
                  <span className="mt-1 block text-[13px] text-fg-subtle">
                    {x.primaryMuscles.join(", ")} · {x.equipment}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </SeoPage>
  );
}
