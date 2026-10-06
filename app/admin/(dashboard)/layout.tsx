import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminTabs from "@/components/admin/AdminTabs";
import { AdminNavProvider, PendingContent } from "@/components/admin/AdminNav";
import SignOutButton from "@/components/admin/SignOutButton";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Usage",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // proxy.ts gates /admin too; this keeps the pages safe if the matcher ever changes
  if (!(await verifySession((await cookies()).get(ADMIN_COOKIE)?.value))) redirect("/admin/login");

  return (
    <main className="theme-light min-h-screen bg-canvas text-fg">
      <AdminNavProvider>
        <div className="container-page pb-16 pt-28 md:pt-32">
          <header className="flex items-center justify-between gap-4">
            <h1 className="text-display-md">Usage</h1>
            <SignOutButton />
          </header>
          <div className="mt-6">
            <Suspense>
              <AdminTabs />
            </Suspense>
          </div>
          <PendingContent>{children}</PendingContent>
        </div>
      </AdminNavProvider>
    </main>
  );
}
