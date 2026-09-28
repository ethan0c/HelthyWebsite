import FeatureBand from "@/components/sections/FeatureBand";
import PhoneVideo from "@/components/ui/PhoneVideo";

export default function EatSection() {
  return (
    <FeatureBand
      id="nutrition"
      tone="light"
      eyebrow="Nutrition"
      title="Log a meal in"
      accent="seconds"
      lede="Calories and macros without the homework. Pick whichever way is fastest for the meal in front of you."
      points={[
        "Snap a photo and Helthy identifies each item, estimates portions and fills in the macros",
        "Scan a barcode or nutrition label",
        "Search the food database, or just type or say what you ate",
      ]}
      footnote="Calorie and macro tracking is free and unlimited. 2 AI scans a week are free, unlimited with Pro."
      visual={
        <PhoneVideo
          src="/videos/app/food-log.mp4"
          poster="/videos/app/food-log-poster.jpg"
          label="Screen recording: scanning a plate of shrimp and chicken noodles with the camera, then logging it"
          className="w-[min(300px,70vw)]"
        />
      }
    />
  );
}
