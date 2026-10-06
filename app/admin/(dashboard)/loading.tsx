/** Content skeleton under the section pills, shown when a section first loads. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Bone className="h-3 w-80 max-w-full" />
        <Bone className="h-10 w-64 rounded-full" />
      </div>
      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="tile p-4">
            <Bone className="h-3 w-20" />
            <Bone className="mt-3 h-7 w-14" />
          </div>
        ))}
      </section>
      <section className="mt-8 grid gap-3 xl:grid-cols-[3fr_2fr]">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="card p-5">
            <Bone className="h-4 w-44" />
            <Bone className="mt-2 h-3 w-28" />
            <Bone className="mt-6 h-[200px] w-full" />
          </div>
        ))}
      </section>
    </div>
  );
}

function Bone({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-md bg-surface-2 ${className}`} />;
}
