import { FaGooglePlay } from "react-icons/fa";
import CTAButton from "@/components/ui/CTAButton";
import { PLAY_STORE_URL } from "@/lib/site";

/** Google Play button. Kept as its own export for existing call sites; prefer <StoreButtons />. */
export default function AndroidWaitlistButton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <CTAButton
      href={PLAY_STORE_URL}
      variant="secondary"
      size={size}
      icon={<FaGooglePlay aria-hidden="true" className="h-[15px] w-[15px]" />}
      aria-label="Get Helthy on Google Play"
    >
      Google Play
    </CTAButton>
  );
}
