import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="theme-light flex min-h-screen items-center bg-canvas text-fg">
      <div className="container-page flex justify-center py-32">
        <div className="card w-full max-w-[400px] p-8">
          <h1 className="text-display-md">Sign in</h1>
          <p className="mt-2 text-[15px] leading-7 text-fg-muted">The usage dashboard is for the Helthy team.</p>
          <LoginForm next={typeof next === "string" ? next : undefined} />
        </div>
      </div>
    </main>
  );
}
