import SiteFooter from "@/components/sections/SiteFooter";
import CTAButton from "@/components/ui/CTAButton";

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-5 pt-32 pb-24 text-center text-fg">
        <p aria-hidden="true" className="text-numeric text-[clamp(6rem,20vw,12rem)] leading-none text-surface-3">
          404
        </p>

        <h1 className="mt-6 text-display-xl text-fg">
          Page not <span className="text-accent-ink">found</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-lede">
          This page doesn&apos;t exist or may have moved. Head back home to keep going.
        </p>

        <div className="mt-10 flex justify-center">
          <CTAButton href="/" variant="primary">
            Back to home
          </CTAButton>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
