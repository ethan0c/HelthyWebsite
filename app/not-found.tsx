import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-5">
      <div className="text-center">
        <p className="text-8xl font-mono font-medium text-helthy-lemon mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-white mb-3">
          Page not found
        </h1>
        <p className="text-sm text-white/50 mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Go home
        </Link>
      </div>
    </section>
  );
}
