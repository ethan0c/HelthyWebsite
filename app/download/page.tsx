import type { Metadata } from "next";
import StoreButtons from "@/components/ui/StoreButtons";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Download Helthy",
  description: "Get Helthy free on the App Store or Google Play.",
  alternates: { canonical: "https://helthy.app/download" },
};

export default function DownloadPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center bg-canvas px-5 pt-40 pb-24 text-center text-fg md:pt-48 md:pb-32">
        <h1 className="text-display-xl text-fg">
          Download <span className="text-accent-ink">Helthy</span>
        </h1>

        <p className="mx-auto mt-5 max-w-sm text-lede">
          Free on iOS & Android. No card required.
        </p>

        <div className="mt-10">
          <StoreButtons align="center" />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
