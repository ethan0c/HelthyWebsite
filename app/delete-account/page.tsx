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
      <main className="relative overflow-hidden min-h-screen bg-background text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(205,255,80,0.05), transparent 70%)",
          }}
        />

        <section className="relative mx-auto max-w-4xl px-6 lg:px-8 pb-20 pt-32 lg:pb-28 lg:pt-40">
          <div className="space-y-10">
            {/* Header */}
            <div className="space-y-5 pb-10 border-b border-white/10">
              <p
                className="text-[11px] font-semibold uppercase text-white/45"
                style={{ fontFamily: "var(--font-body)", letterSpacing: "0.2em" }}
              >
                Account
              </p>
              <h1
                className="font-heading text-white"
                style={{
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 500,
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                }}
              >
                <span className="text-helthy-lemon">Delete</span> Your Helthy Account
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/50">
                <span>Last Updated: April 2026</span>
              </div>
              <p className="text-white/65 text-base leading-7 max-w-2xl">
                This page explains how to permanently delete your Helthy account and the data associated with it. Helthy is the mobile health and fitness tracking app published by Helthy.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-10 text-white/80">

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">Option 1: Delete from inside the Helthy app <span className="text-sm font-normal text-white/50">(recommended)</span></h2>
                <p>The fastest way to delete your account is from within the Helthy mobile app:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Open the <strong className="text-white">Helthy</strong> app on your iOS or Android device</li>
                  <li>Tap the <strong className="text-white">Settings</strong> icon</li>
                  <li>Go to <strong className="text-white">Privacy &amp; Security</strong></li>
                  <li>Scroll to <strong className="text-white">Data Management</strong></li>
                  <li>Tap <strong className="text-white">Delete Account</strong></li>
                  <li>Follow the confirmation prompts to confirm permanent deletion</li>
                </ol>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-white/70">
                    Once confirmed, your account is queued for deletion immediately. You will be signed out of all devices.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">Option 2: Request deletion by email</h2>
                <p>If you no longer have access to the app or your device, you can request account deletion by emailing us:</p>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 space-y-2">
                  <p>
                    <strong className="text-white">Email:</strong>{" "}
                    <a href="mailto:support@helthy.app?subject=Account%20Deletion%20Request" className="text-helthy-lemon hover:underline">
                      support@helthy.app
                    </a>
                  </p>
                  <p className="text-sm text-white/60">
                    Subject line: <em>Account Deletion Request</em>
                  </p>
                  <p className="text-sm text-white/60">
                    Please send the email from the address registered on your Helthy account so we can verify your identity. We will confirm and complete the deletion within 7 business days.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">What gets deleted</h2>
                <p>When you delete your Helthy account, the following data is <strong className="text-white">permanently deleted</strong> within 30 days:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
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
                <h2 className="font-body font-semibold text-xl text-white">What may be retained</h2>
                <p>For legal, billing, and security reasons, a small amount of data may be retained after deletion:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    <strong className="text-white">Anonymized analytics:</strong> Aggregated, non-identifiable usage data may be retained indefinitely. This data cannot be linked back to you.
                  </li>
                  <li>
                    <strong className="text-white">Transaction records:</strong> Purchase receipts and subscription history may be retained for up to 7 years to comply with tax, accounting, and consumer protection laws.
                  </li>
                  <li>
                    <strong className="text-white">Security logs:</strong> Server logs containing IP addresses and timestamps may be retained for up to 90 days for fraud prevention and abuse investigation.
                  </li>
                  <li>
                    <strong className="text-white">Legal holds:</strong> Data subject to a legal hold or active investigation will be retained until the matter is resolved.
                  </li>
                </ul>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-white/70">
                    Data stored on third-party platforms you connected to Helthy (such as Apple Health or Google Health Connect) is <strong className="text-white">not</strong> deleted by us — that data lives on your device and is controlled by you through your device&apos;s settings.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">Cancel your subscription first</h2>
                <p>
                  Deleting your Helthy account does <strong className="text-white">not</strong> automatically cancel an active App Store or Google Play subscription. To avoid further charges, please cancel your subscription before deleting your account:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    <strong className="text-white">iOS:</strong> Settings → [Your Name] → Subscriptions → Helthy → Cancel Subscription
                  </li>
                  <li>
                    <strong className="text-white">Android:</strong> Google Play Store → Profile → Payments &amp; subscriptions → Subscriptions → Helthy → Cancel
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">This action cannot be undone</h2>
                <div className="rounded-2xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.07)] p-5">
                  <p className="text-white/85">
                    <strong className="text-[#f87171]">Warning:</strong> Account deletion is permanent. Once your data has been deleted, we cannot recover or restore it. If you only want to take a break, consider signing out of the app instead.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">Questions?</h2>
                <p>If you have any questions about deleting your account or what happens to your data, contact us:</p>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 space-y-2">
                  <p>
                    <strong className="text-white">Support:</strong>{" "}
                    <a href="mailto:support@helthy.app" className="text-helthy-lemon hover:underline">
                      support@helthy.app
                    </a>
                  </p>
                  <p>
                    See also our{" "}
                    <a href="/privacy" className="text-helthy-lemon hover:underline">
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
