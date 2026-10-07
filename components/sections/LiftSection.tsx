import FeatureBand from "@/components/sections/FeatureBand";
import PhoneVideo from "@/components/ui/PhoneVideo";
import DeviceFrame from "@/components/ui/DeviceFrame";
import WatchScreen from "@/components/ui/WatchScreen";

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
            label="Screen recording: the Exercise tab in Helthy, with the next session, training progress, personal records and a finished workout"
            className="w-[min(280px,60vw)]"
          />
          {/* Same photo watch as the hero. The hero's shows the strength
              workout; this one shows cardio */}
          <div
            role="img"
            aria-label="Helthy on Apple Watch: a live outdoor run showing heart rate, distance, pace and calories"
            className="hidden w-[180px] shrink-0 sm:block"
          >
            <DeviceFrame device="watch" sizes="180px">
              <WatchScreen screen="cardio" />
            </DeviceFrame>
          </div>
        </div>
      }
    />
  );
}
