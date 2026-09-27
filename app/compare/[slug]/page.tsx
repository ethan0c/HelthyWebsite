import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SeoPage,
  PageHero,
  StoreButtons,
  Section,
  CompareTable,
  FaqList,
  LinkGrid,
  DownloadBanner,
  seoMetadata,
} from "@/components/seo/SeoPage";
import { COMPARISONS, CHECKED_ON, getComparison } from "@/lib/content/comparisons";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return seoMetadata({ title: c.title, description: c.description, path: `/compare/${c.slug}` });
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-7 text-white/70">
          <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-helthy-lemon" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default async function ComparisonPage({ params }: PageProps<"/compare/[slug]">) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const others = COMPARISONS.filter((o) => o.slug !== c.slug);

  return (
    <SeoPage
      crumbs={[
        { name: "Compare", href: "/compare" },
        { name: `Helthy vs ${c.competitor}`, href: `/compare/${c.slug}` },
      ]}
    >
      <PageHero
        title={
          <>
            Helthy vs <span className="text-helthy-lemon">{c.competitor}</span>
          </>
        }
        lede={c.lede}
      >
        <StoreButtons />
      </PageHero>

      <Section title="Side by side">
        <CompareTable
          columns={["", "Helthy", c.competitor]}
          rows={c.rows.map((r) => ({ label: r.label, values: [r.helthy, r.them] }))}
        />
        <p className="mt-4 text-[12px] leading-5 text-white/40">
          {`Checked ${CHECKED_ON} against each app's US App Store listing and website. Prices and features change, so check the store listing before you buy.`}
        </p>
      </Section>

      <div className="mt-20 grid gap-6 md:grid-cols-2">
        <div className="card-helthy p-7">
          <h2 className="text-[18px] font-medium text-white">Where Helthy is better</h2>
          <div className="mt-5">
            <Bullets items={c.helthyWins} />
          </div>
        </div>
        <div className="card-helthy p-7">
          <h2 className="text-[18px] font-medium text-white">Where {c.competitor} is better</h2>
          <div className="mt-5">
            <Bullets items={c.theyWin} />
          </div>
        </div>
      </div>

      <Section title="The verdict">
        <p className="max-w-3xl text-[16px] leading-8 text-white/75">{c.verdict}</p>
      </Section>

      <Section title={`Helthy vs ${c.competitor} questions`}>
        <FaqList faqs={c.faqs} />
      </Section>

      <Section title="More comparisons">
        <LinkGrid
          links={[
            ...others.map((o) => ({ href: `/compare/${o.slug}`, title: `Helthy vs ${o.competitor}` })),
            c.category === "nutrition"
              ? { href: "/calorie-tracker", title: "Helthy calorie tracker" }
              : { href: "/workout-tracker", title: "Helthy workout tracker" },
          ]}
        />
      </Section>

      <DownloadBanner title={`Switching from ${c.competitor}? Try Helthy free`} />

      <p className="mt-10 text-[11px] leading-5 text-white/35">
        {c.competitor} is a trademark of {c.owner.replace(/\.$/, "")}. Helthy is not affiliated with or endorsed by{" "}
        {c.competitor}.
      </p>
    </SeoPage>
  );
}
