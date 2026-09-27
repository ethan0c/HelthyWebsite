import type { Metadata } from "next";
import { SeoPage, PageHero, Section, LinkGrid, DownloadBanner, seoMetadata } from "@/components/seo/SeoPage";
import { EXERCISES, EXERCISE_GROUPS } from "@/lib/content/exercises";

export const metadata: Metadata = seoMetadata({
  title: "Exercise Guides: Form Tips and Strength Standards",
  description:
    "Form tips, common mistakes, breathing cues and strength standards for the most popular gym exercises, from the bench press and squat to curls and planks.",
  path: "/exercises",
});

export default function ExercisesPage() {
  return (
    <SeoPage crumbs={[{ name: "Exercises", href: "/exercises" }]}>
      <PageHero
        eyebrow="Exercise guides"
        title={
          <>
            Lift with better <span className="text-helthy-lemon">form</span>.
          </>
        }
        lede="Coaching cues, common mistakes and how much weight to use for the most popular gym exercises, the same guidance built into the Helthy app."
      />

      {EXERCISE_GROUPS.map((group) => (
        <Section key={group} title={group}>
          <LinkGrid
            links={EXERCISES.filter((e) => e.group === group).map((e) => ({
              href: `/exercises/${e.slug}`,
              title: e.name,
              body: `${e.primaryMuscles.join(", ")} · ${e.equipment}`,
            }))}
          />
        </Section>
      ))}

      <DownloadBanner
        title="1,500 exercises in your pocket"
        body="Helthy's workout tracker has how-to, target muscles and your personal records for every exercise, and logging a set takes seconds."
      />
    </SeoPage>
  );
}
