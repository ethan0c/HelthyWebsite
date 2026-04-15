import SiteFooter from "@/components/sections/SiteFooter";
import CTAButton from "@/components/ui/CTAButton";

export default function NotFound() {
  return (
    <>
      <main className="relative overflow-hidden min-h-screen bg-background text-white flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(205,255,80,0.07), transparent 70%)",
          }}
        />

        <div className="relative text-center px-6">
          <p
            className="font-numeric text-[clamp(7rem,22vw,14rem)] font-medium leading-none tracking-tight"
            style={{ color: "rgba(205,255,80,0.15)" }}
          >
            404
          </p>

          <h1
            className="font-heading text-white -mt-4"
            style={{
              fontSize: "clamp(32px, 4.6vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Page not <span className="text-helthy-lemon">found</span>.
          </h1>

          <p className="mt-5 text-base text-white/50 max-w-sm mx-auto leading-relaxed">
            This page doesn&apos;t exist or may have moved. Head back home to keep going.
          </p>

          <div className="mt-10 flex justify-center">
            <CTAButton href="/" variant="primary" size="md">
              Back to home
            </CTAButton>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
