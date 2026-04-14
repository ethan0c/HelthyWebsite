import Link from "next/link";
import SiteFooter from "@/components/sections/SiteFooter";

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

          <h1 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-white -mt-4">
            Page not <span className="text-italics text-helthy-lemon">found</span>.
          </h1>

          <p className="mt-5 text-base text-white/50 max-w-sm mx-auto leading-relaxed">
            This page doesn&apos;t exist or may have moved. Head back home to keep going.
          </p>

          <div className="mt-10">
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
