import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPosts } from "@/lib/blog";

const TOOLS = [
  { href: "/tools/tdee-calculator", title: "TDEE calculator", body: "How many calories you burn in a day." },
  { href: "/tools/macro-calculator", title: "Macro calculator", body: "Split your calories into protein, carbs and fat." },
  { href: "/tools/protein-calculator", title: "Protein calculator", body: "How much protein you need each day." },
  { href: "/tools/one-rep-max-calculator", title: "One-rep max calculator", body: "Estimate your 1RM from any set." },
  { href: "/exercises", title: "Exercise guides", body: "Form tips and strength standards for popular lifts." },
];

/** Free calculators, guides and the newest blog post (MacroFactor "Level up" / Hevy "Our guides"). */
export default async function GuidesSection() {
  const [latest] = await getPosts();
  const links = latest
    ? [...TOOLS, { href: `/blog/${latest.slug}`, title: latest.meta.title, body: "Latest from the blog" }]
    : TOOLS;

  return (
    <section id="guides" className="theme-light section">
      <div className="container-page">
        <SectionHeading
          title="Free tools and"
          italicTail="guides"
          subtitle="Calculators and guides you can use without the app. No sign-up."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="card card-hover block p-6">
              <span className="text-title">{l.title} →</span>
              <span className="mt-1.5 block text-[15px] leading-6 text-fg-muted">{l.body}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
