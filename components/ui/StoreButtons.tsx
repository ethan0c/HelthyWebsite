import { FaApple, FaGooglePlay } from "react-icons/fa";
import CTAButton from "@/components/ui/CTAButton";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

/** App Store (primary) + Google Play (secondary). Use this everywhere we link to the stores. */
export default function StoreButtons({
  size = "md",
  align = "start",
}: {
  size?: "sm" | "md" | "lg";
  align?: "start" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row ${
        align === "center" ? "items-center justify-center" : "items-start sm:items-center"
      }`}
    >
      <CTAButton
        href={APP_STORE_URL}
        size={size}
        icon={<FaApple aria-hidden="true" className="h-[18px] w-[18px] -mt-0.5" />}
        aria-label="Download Helthy on the App Store"
      >
        App Store
      </CTAButton>
      <CTAButton
        href={PLAY_STORE_URL}
        variant="secondary"
        size={size}
        icon={<FaGooglePlay aria-hidden="true" className="h-[15px] w-[15px]" />}
        aria-label="Get Helthy on Google Play"
      >
        Google Play
      </CTAButton>
    </div>
  );
}
