import FeatureBand from "@/components/sections/FeatureBand";
import PhoneVideo from "@/components/ui/PhoneVideo";
import AppleWatch from "@/components/ui/AppleWatch";

export default function LiftSection() {
  return (
    <FeatureBand
      id="workouts"
      tone="dark"
      reverse
      eyebrow="Workouts"
      title="Track every"
      accent="set"
      lede="A gym log that keeps up with you, from your phone or your wrist. Unlimited on the free plan."
      points={[
        "Log sets, reps and weight, plus cardio",
        "Personal records are detected automatically",
        "1,500 exercises with how-to steps and form tips",
      ]}
      footnote="Syncs with Apple Health and Google Health Connect."
      visual={
        <div className="flex items-end gap-5">
          <PhoneVideo
            src="/videos/app/workout-log.mp4"
            poster="/videos/app/workout-log-poster.jpg"
            label="Screen recording: starting a push workout, adding an exercise from the library and logging sets"
            className="w-[min(280px,60vw)]"
          />
          <div className="hidden sm:block">
            {/* The hero's watch shows the strength workout; this one shows cardio */}
            <AppleWatch width={150} screen="cardio" />
          </div>
        </div>
      }
    />
  );
}
