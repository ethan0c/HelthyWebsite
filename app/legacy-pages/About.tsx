import Navbar from "../../components/legacy/Navbar";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-helthy-black text-white">
      <Navbar />

      {/* Hero: Our philosophy */}
      <section className="relative pt-28 md:pt-36 pb-10">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm">
              Our philosophy
            </div>
            <h1 className="text-4xl md:text-6xl font-normal leading-[1.15] text-helthy-lemon">
              Fitness made simple, personal, and sustainable
            </h1>
            <p className="text-white/80 text-lg md:text-2xl">
              Helthy removes the noise so you can focus on what works: clear guidance, consistent habits, and progress you can feel.
            </p>
          </div>

          {/* Principles */}
          <div className="mx-auto max-w-5xl mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-helthy-lemon mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium">Clarity over noise</h3>
                  <p className="text-white/70 text-sm mt-1">Simple plans, plain language, zero fluff.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-helthy-lemon mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium">Consistency beats perfection</h3>
                  <p className="text-white/70 text-sm mt-1">Small wins that stack—one workout, one meal, one day.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-helthy-lemon mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium">Data that helps, not nags</h3>
                  <p className="text-white/70 text-sm mt-1">Insights you can act on—always in your control.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the founders */}
      <section className="pb-4">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="mx-auto max-w-4xl text-center space-y-4 mb-8">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm">
              Meet the founders
            </div>
            <h2 className="text-3xl md:text-5xl font-normal leading-[1.15] text-white">
              Two college students. Two insane transformations.
            </h2>
            <p className="text-white/80 text-lg">
              We built Helthy after living the journey ourselves — Chibu lost 70 lbs in a year, and Ebu gained over 50 lbs in two. With so much fluff online, we wanted fitness to be simple, honest, and effective for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Before / After grid */}
      <section className="pb-16">
        <div className="container mx-auto px-6 lg:px-20 grid gap-8 md:gap-10 md:grid-cols-2 max-w-6xl">
          {/* Chibu card */}
          <article className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
            <header className="flex items-center justify-between mb-3">
              <h2 className="text-xl md:text-2xl font-medium">Chibu</h2>
              <span className="inline-flex items-center gap-2 text-helthy-black bg-helthy-lemon px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                −70 lbs
                <span className="hidden sm:inline text-helthy-black/70">in 12 months</span>
              </span>
            </header>
            <div className="grid grid-cols-2 gap-3">
              {/* Before */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/30 aspect-[3/4]">
                <div className="absolute left-2 top-2 z-10 px-2 py-1 rounded-md bg-white/15 text-xs">Before</div>
                {/* Replace src with /about/chibu-before.jpg */}
                <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs">Add photo</div>
              </div>
              {/* After */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/30 aspect-[3/4]">
                <div className="absolute left-2 top-2 z-10 px-2 py-1 rounded-md bg-white/15 text-xs">After</div>
                {/* Replace src with /about/chibu-after.jpg */}
                <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs">Add photo</div>
              </div>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-white/80">
              <li>Started with daily walks and simple habits.</li>
              <li>Prioritized sleep and protein, tracked progress weekly.</li>
              <li>Built consistency first — intensity later.</li>
            </ul>
          </article>

          {/* Ebu card */}
          <article className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
            <header className="flex items-center justify-between mb-3">
              <h2 className="text-xl md:text-2xl font-medium">Ebu</h2>
              <span className="inline-flex items-center gap-2 text-helthy-black bg-helthy-lemon px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                +50 lbs
                <span className="hidden sm:inline text-helthy-black/70">in 24 months</span>
              </span>
            </header>
            <div className="grid grid-cols-2 gap-3">
              {/* Before */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/30 aspect-[3/4]">
                <div className="absolute left-2 top-2 z-10 px-2 py-1 rounded-md bg-white/15 text-xs">Before</div>
                {/* Replace src with /about/ebu-before.jpg */}
                <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs">Add photo</div>
              </div>
              {/* After */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/30 aspect-[3/4]">
                <div className="absolute left-2 top-2 z-10 px-2 py-1 rounded-md bg-white/15 text-xs">After</div>
                {/* Replace src with /about/ebu-after.jpg */}
                <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs">Add photo</div>
              </div>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-white/80">
              <li>Focused on progressive overload and 3–4 meals/day.</li>
              <li>Logged workouts, measured strength — not just the scale.</li>
              <li>Stayed patient; small wins stacked over time.</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Together photo */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-20 max-w-5xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-medium">From our journey to yours</h3>
            <p className="text-white/80 mt-2">We’re building Helthy to make fitness clear, doable, and personal — so anyone who dreams of change can get there.</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 aspect-[16/9]">
            {/* Replace src with /about/us-together.jpg */}
            <div className="absolute inset-0 bg-gradient-to-br from-helthy-lemon/15 via-white/5 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-white/70">
              <span className="text-sm">Add one photo of us together</span>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="/pricing" className="inline-flex items-center rounded-full bg-helthy-lemon text-helthy-black px-6 py-3 font-medium hover:bg-helthy-lemon/90">
              Start your journey
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
