import type { Metadata } from "next";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "How to permanently delete your Helthy account and the data associated with it.",
};

export default function DeleteAccountPage() {
  return (
    <>
      <main className="relative min-h-screen bg-canvas text-fg">
        <section className="container-narrow pb-24 pt-32 lg:pt-40">
          <div className="max-w-3xl space-y-12">
            {/* Header */}
            <div className="space-y-5 pb-10 border-b border-line">
              <h1 className="text-display-xl text-fg">
                <span className="text-accent-ink">Delete</span> Your Helthy Account
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-fg-subtle">
                <span>Last Updated: April 2026</span>
              </div>
              <p className="text-lede max-w-2xl">
                This page explains how to permanently delete your Helthy account and the data associated with it. Helthy is the mobile health and fitness tracking app published by Helthy.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-12 text-base leading-7 text-fg-muted">

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">Option 1: Delete from inside the Helthy app <span className="text-sm font-normal text-fg-subtle">(recommended)</span></h2>
                <p>The fastest way to delete your account is from within the Helthy mobile app:</p>
                <ol className="list-decimal list-inside marker:text-fg-subtle space-y-2 pl-4">
                  <li>Open the <strong className="font-medium text-fg">Helthy</strong> app on your iOS or Android device</li>
                  <li>Tap the <strong className="font-medium text-fg">Settings</strong> icon</li>
                  <li>Go to <strong className="font-medium text-fg">Privacy &amp; Security</strong></li>
                  <li>Scroll to <strong className="font-medium text-fg">Data Management</strong></li>
                  <li>Tap <strong className="font-medium text-fg">Delete Account</strong></li>
                  <li>Follow the confirmation prompts to confirm permanent deletion</li>
                </ol>
                <div className="card p-5">
                  <p className="text-fg-muted">
                    Once confirmed, your account is queued for deletion immediately. You will be signed out of all devices.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">Option 2: Request deletion by email</h2>
                <p>If you no longer have access to the app or your device, you can request account deletion by emailing us:</p>
                <div className="card p-5 space-y-2">
                  <p>
                    <strong className="font-medium text-fg">Email:</strong>{" "}
                    <a href="mailto:support@helthy.app?subject=Account%20Deletion%20Request" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">
                      support@helthy.app
                    </a>
                  </p>
                  <p className="text-sm text-fg-muted">
                    Subject line: <em>Account Deletion Request</em>
                  </p>
                  <p className="text-sm text-fg-muted">
                    Please send the email from the address registered on your Helthy account so we can verify your identity. We will confirm and complete the deletion within 7 business days.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">What gets deleted</h2>
                <p>When you delete your Helthy account, the following data is <strong className="font-medium text-fg">permanently deleted</strong> within 30 days:</p>
                <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                  <li>Your account profile (name, email, profile picture, authentication credentials)</li>
                  <li>Body measurements, goals, and dietary preferences</li>
                  <li>Workout history (exercises, sets, reps, weights, durations)</li>
                  <li>Nutrition logs (meals, foods, calories, macros)</li>
                  <li>Meal photos and progress photos</li>
                  <li>Step counts and activity data stored on our servers</li>
                  <li>AI coach chat history</li>
                  <li>Personal records and achievements</li>
                  <li>Subscription and entitlement records linked to your account</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">What may be retained</h2>
                <p>For legal, billing, and security reasons, a small amount of data may be retained after deletion:</p>
                <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                  <li>
                    <strong className="font-medium text-fg">Anonymized analytics:</strong> Aggregated, non-identifiable usage data may be retained indefinitely. This data cannot be linked back to you.
                  </li>
                  <li>
                    <strong className="font-medium text-fg">Transaction records:</strong> Purchase receipts and subscription history may be retained for up to 7 years to comply with tax, accounting, and consumer protection laws.
                  </li>
                  <li>
                    <strong className="font-medium text-fg">Security logs:</strong> Server logs containing IP addresses and timestamps may be retained for up to 90 days for fraud prevention and abuse investigation.
                  </li>
                  <li>
                    <strong className="font-medium text-fg">Legal holds:</strong> Data subject to a legal hold or active investigation will be retained until the matter is resolved.
                  </li>
                </ul>
                <div className="card p-5">
                  <p className="text-fg-muted">
                    Data stored on third-party platforms you connected to Helthy (such as Apple Health or Google Health Connect) is <strong className="font-medium text-fg">not</strong> deleted by us — that data lives on your device and is controlled by you through your device&apos;s settings.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">Cancel your subscription first</h2>
                <p>
                  Deleting your Helthy account does <strong className="font-medium text-fg">not</strong> automatically cancel an active App Store or Google Play subscription. To avoid further charges, please cancel your subscription before deleting your account:
                </p>
                <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                  <li>
                    <strong className="font-medium text-fg">iOS:</strong> Settings → [Your Name] → Subscriptions → Helthy → Cancel Subscription
                  </li>
                  <li>
                    <strong className="font-medium text-fg">Android:</strong> Google Play Store → Profile → Payments &amp; subscriptions → Subscriptions → Helthy → Cancel
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">This action cannot be undone</h2>
                <div className="card border-line-strong p-5">
                  <p className="text-fg-muted">
                    <strong className="text-fg">Warning:</strong> Account deletion is permanent. Once your data has been deleted, we cannot recover or restore it. If you only want to take a break, consider signing out of the app instead.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">Questions?</h2>
                <p>If you have any questions about deleting your account or what happens to your data, contact us:</p>
                <div className="card p-5 space-y-2">
                  <p>
                    <strong className="font-medium text-fg">Support:</strong>{" "}
                    <a href="mailto:support@helthy.app" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">
                      support@helthy.app
                    </a>
                  </p>
                  <p>
                    See also our{" "}
                    <a href="/privacy" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">
                      Privacy Policy
                    </a>{" "}
                    for full details about how we handle your data.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
