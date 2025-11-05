import Navbar from "../../components/legacy/Navbar";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string; // ISO or readable
  tag: string;
};

const posts: Post[] = [
  {
    id: "product-vision",
    title: "Why we’re building Helthy (and why it’s free)",
    excerpt: "The story behind Helthy, our mission, and how we’ll keep it free for everyone.",
    date: "2025-10-12",
    tag: "Product",
  },
  {
    id: "training-basics",
    title: "Training basics: the only 3 things that matter",
    excerpt: "Focus on progressive overload, consistency, and recovery — the rest is noise.",
    date: "2025-09-28",
    tag: "Training",
  },
  {
    id: "simple-nutrition",
    title: "Simple nutrition: eat without overthinking",
    excerpt: "A practical framework for protein, portions, and planning — no fads.",
    date: "2025-09-06",
    tag: "Nutrition",
  },
  {
    id: "habits-that-stick",
    title: "Habits that stick: making progress automatic",
    excerpt: "Small wins that compound — how we design Helthy to make consistency easy.",
    date: "2025-08-22",
    tag: "Mindset",
  },
  {
    id: "design-system",
    title: "Designing for clarity: our UI principles",
    excerpt: "How we strip friction from logging workouts and meals.",
    date: "2025-08-01",
    tag: "Design",
  },
  {
    id: "roadmap",
    title: "What’s next for Helthy: public roadmap",
    excerpt: "A peek at features we’re building and how you can influence them.",
    date: "2025-07-15",
    tag: "Product",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-helthy-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-8">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm">
              Blog
            </div>
            <h1 className="text-4xl md:text-6xl font-normal leading-[1.15]">
              Ideas to move, eat, and grow better
            </h1>
            <p className="text-white/80 text-lg md:text-2xl max-w-2xl mx-auto">
              Simple guides on training, nutrition, and mindset — without the fluff.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 flex flex-col">
                <div className="flex items-center justify-between text-xs md:text-sm text-white/60 mb-2">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/80">{p.tag}</span>
                  </span>
                  <time className="filter blur-sm" dateTime={p.date}>{new Date(p.date).toLocaleDateString()}</time>
                </div>
                <h2 className="text-xl md:text-2xl font-medium leading-tight mb-2">{p.title}</h2>
                <p className="text-white/80 text-sm md:text-base mb-4 flex-1">{p.excerpt}</p>
                <div>
                  <a href="#waitlist" className="inline-flex items-center text-helthy-lemon hover:opacity-90 font-medium">Read — coming soon</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
