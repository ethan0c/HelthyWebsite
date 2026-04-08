"use client";
import SiteFooter from "@/components/sections/SiteFooter";

export default function DeleteAccountPage() {
  return (
    <>
      <main className="min-h-screen bg-helthy-black pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
          <div className="space-y-8 text-white/90">
            <div className="space-y-4 pb-8 border-b border-white/10">
              <h1 className="font-heading font-light text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-white">
                <span className="text-italics">Delete</span> Your Helthy Account
              </h1>
              <p className="text-white/60">Last Updated: April 2026</p>
              <p className="text-white/80">
                This page explains how to permanently delete your Helthy account and the data associated with it. Helthy is the mobile health and fitness tracking app published by Helthy.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="font-body font-bold text-2xl text-white">Option 1: Delete from inside the Helthy app (recommended)</h2>
              <p>The fastest way to delete your account is from within the Helthy mobile app:</p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>Open the <strong>Helthy</strong> app on your iOS or Android device</li>
                <li>Tap the <strong>Settings</strong> icon</li>
                <li>Go to <strong>Privacy &amp; Security</strong></li>
                <li>Scroll to <strong>Data Management</strong></li>
                <li>Tap <strong>Delete Account</strong></li>
                <li>Follow the confirmation prompts to confirm permanent deletion</li>
              </ol>
              <p className="text-white/70 bg-white/5 p-4 rounded-lg border border-white/10">
                Once confirmed, your account is queued for deletion immediately. You will be signed out of all devices.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-body font-bold text-2xl text-white">Option 2: Request deletion by email</h2>
              <p>If you no longer have access to the app or your device, you can request account deletion by emailing us:</p>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-2">
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@helthy.app?subject=Account%20Deletion%20Request" className="text-helthy-lemon hover:underline">
                    support@helthy.app
                  </a>
                </p>
                <p className="text-sm text-white/70">
                  Subject line: <em>Account Deletion Request</em>
                </p>
                <p className="text-sm text-white/70">
                  Please send the email from the address registered on your Helthy account so we can verify your identity. We will confirm and complete the deletion within 7 business days.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-body font-bold text-2xl text-white">What gets deleted</h2>
              <p>When you delete your Helthy account, the following data is <strong>permanently deleted</strong> within 30 days:</p>
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
              <h2 className="font-body font-bold text-2xl text-white">What may be retained</h2>
              <p>For legal, billing, and security reasons, a small amount of data may be retained after deletion:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Anonymized analytics:</strong> Aggregated, non-identifiable usage data may be retained indefinitely. This data cannot be linked back to you.
                </li>
                <li>
                  <strong>Transaction records:</strong> Purchase receipts and subscription history may be retained for up to 7 years to comply with tax, accounting, and consumer protection laws.
                </li>
                <li>
                  <strong>Security logs:</strong> Server logs containing IP addresses and timestamps may be retained for up to 90 days for fraud prevention and abuse investigation.
                </li>
                <li>
                  <strong>Legal holds:</strong> Data subject to a legal hold or active investigation will be retained until the matter is resolved.
                </li>
              </ul>
              <p className="text-white/70 bg-white/5 p-4 rounded-lg border border-white/10">
                Data stored on third-party platforms you connected to Helthy (such as Apple Health or Google Health Connect) is <strong>not</strong> deleted by us — that data lives on your device and is controlled by you through your device&apos;s settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-body font-bold text-2xl text-white">Cancel your subscription first</h2>
              <p>
                Deleting your Helthy account does <strong>not</strong> automatically cancel an active App Store or Google Play subscription. To avoid further charges, please cancel your subscription before deleting your account:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>iOS:</strong> Settings → [Your Name] → Subscriptions → Helthy → Cancel Subscription
                </li>
                <li>
                  <strong>Android:</strong> Google Play Store → Profile → Payments &amp; subscriptions → Subscriptions → Helthy → Cancel
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-body font-bold text-2xl text-white">This action cannot be undone</h2>
              <p className="text-red-300 bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                <strong>Warning:</strong> Account deletion is permanent. Once your data has been deleted, we cannot recover or restore it. If you only want to take a break, consider signing out of the app instead.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-body font-bold text-2xl text-white">Questions?</h2>
              <p>If you have any questions about deleting your account or what happens to your data, contact us:</p>
              <div className="space-y-2 pl-4">
                <p>
                  <strong>Support:</strong>{" "}
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
      </main>
      <SiteFooter />
    </>
  );
}
