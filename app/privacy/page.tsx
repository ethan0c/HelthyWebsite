import type { Metadata } from "next";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Helthy collects, uses, and protects your information when you use our app and services.",
  alternates: { canonical: "https://helthy.app/privacy" },
};

export default function PrivacyPage() {
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
                Legal
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
                <span className="text-helthy-lemon">Privacy</span> Policy
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/50">
                <span>Last Updated: May 2026</span>
                <span>Effective Date: March 2026</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-10 text-white/80">

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">1. Introduction</h2>
                <p>
                  Helthy (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services (collectively, the &quot;Service&quot;).
                </p>
                <p>
                  By using Helthy, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, do not use our Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">2. Information We Collect</h2>
                <div className="space-y-3">
                  <h3 className="font-body font-normal text-lg text-white/90">2.1 Personal Information</h3>
                  <p>We collect the following personal information when you create an account and use our Service:</p>
                  <div className="space-y-3 pl-4">
                    <div>
                      <p className="font-semibold text-white">Account Information:</p>
                      <ul className="list-disc list-inside space-y-1 pl-4">
                        <li>Email address</li>
                        <li>First name and last name (optional)</li>
                        <li>Profile picture (optional)</li>
                        <li>Authentication credentials (managed by Clerk)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Health and Fitness Data:</p>
                      <ul className="list-disc list-inside space-y-1 pl-4">
                        <li>Height, weight, and body measurements</li>
                        <li>Date of birth and gender</li>
                        <li>Activity level and fitness goals</li>
                        <li>Workout history (exercises, sets, reps, weights, duration)</li>
                        <li>Nutrition data (meals, foods, calories, macronutrients)</li>
                        <li>Meal photos and progress photos</li>
                        <li>Step counts and activity data</li>
                        <li>Health goals and targets</li>
                        <li>Dietary preferences and allergens</li>
                        <li>Body fat percentage history</li>
                        <li>Personal records and achievements</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-body font-normal text-lg text-white/90">2.2 Health Data from Apple HealthKit &amp; Google Health Connect</h3>
                  <p>If you grant permission, we may access and store the following data from Apple HealthKit (iOS) or Google Health Connect (Android):</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Steps and activity data</li>
                    <li>Weight measurements</li>
                    <li>Workout data</li>
                    <li>Other health metrics you choose to share</li>
                  </ul>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                    <p className="text-white/70">
                      <strong className="text-white">Important: </strong> We only read and write health platform data with your explicit permission. On iOS you can revoke this through iOS Settings → Privacy &amp; Security → Health. On Android you can revoke this through Android Settings → Apps → Health Connect.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Track your workouts and nutrition</li>
                  <li>Calculate your TDEE (Total Daily Energy Expenditure)</li>
                  <li>Generate personalized insights and recommendations</li>
                  <li>Sync data across your devices</li>
                  <li>Send you notifications and reminders</li>
                  <li>Parse food descriptions and meal photos using AI</li>
                  <li>Provide an AI health coaching chat assistant</li>
                  <li>Estimate body fat percentage from progress photos using AI vision analysis (with your explicit consent)</li>
                  <li>Provide workout recommendations</li>
                  <li>Improve our features and user experience</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">4. Third-Party Services and Data Sharing</h2>
                <p>We use the following third-party services that may process your data:</p>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                    <p className="font-semibold text-white">Clerk — Authentication</p>
                    <p className="text-sm text-white/60 mt-1">Data shared: Email, name, authentication tokens</p>
                    <p className="text-sm text-white/60">Purpose: Secure user authentication</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                    <p className="font-semibold text-white">Cloud Hosting & Infrastructure Providers</p>
                    <p className="text-sm text-white/60 mt-1">Data shared: Encrypted user data, profile images, and meal/progress photos</p>
                    <p className="text-sm text-white/60">Purpose: Secure database storage, media hosting, and search functionality</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                    <p className="font-semibold text-white">Third-Party AI Partners</p>
                    <p className="text-sm text-white/60 mt-1">Data shared: Food descriptions, meal images, progress photos, user chat queries, biometric context (height, weight, age, gender)</p>
                    <p className="text-sm text-white/60">Purpose: Power our AI health coaching chat, analyze meal photos for nutrition estimation, generate personalized insights, and estimate body composition.</p>
                    <p className="text-sm text-helthy-lemon mt-2"><strong>Important:</strong> Our AI infrastructure partners are strictly prohibited from using your data or images to train their models. Photos are processed temporarily for analysis and are not retained by these external AI services.</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                    <p className="font-semibold text-white">RevenueCat — Subscription Management</p>
                    <p className="text-sm text-white/60 mt-1">Data shared: Anonymous user ID, purchase receipts, subscription status</p>
                    <p className="text-sm text-white/60">Purpose: Manage premium subscriptions and entitlements</p>
                  </div>
                </div>
                <p className="font-semibold text-helthy-lemon">We do not sell your personal information to third parties.</p>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">5. Data Storage and Retention</h2>
                <p>
                  Your data is stored on secure servers provided by our hosting partners. Data may be stored in the United States or other countries where our service providers operate.
                </p>
                <p>We retain your personal information for as long as your account is active or as needed to provide you services. We will delete or anonymize your data:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong className="text-white">Upon Account Deletion:</strong> All your data is permanently deleted within 30 days of account deletion request</li>
                  <li><strong className="text-white">Inactive Accounts:</strong> We may delete accounts that have been inactive for 3 years</li>
                  <li><strong className="text-white">Legal Requirements:</strong> We may retain certain data as required by law</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">6. Your Rights and Choices</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-body font-normal text-lg text-white/90">6.1 Access and Correction</h3>
                    <p className="mt-1">You can access and update your personal information through the app settings or by contacting us.</p>
                  </div>
                  <div>
                    <h3 className="font-body font-normal text-lg text-white/90">6.2 Data Export</h3>
                    <p className="mt-1">You can request a copy of your data in JSON, CSV, or PDF format through the app settings (Settings → Privacy &amp; Security → Export My Data).</p>
                  </div>
                  <div>
                    <h3 className="font-body font-normal text-lg text-white/90">6.3 Account Deletion</h3>
                    <p className="mt-1">You can delete your account and all associated data at any time:</p>
                    <ol className="list-decimal list-inside space-y-1 pl-4 mt-2">
                      <li>Go to Settings → Privacy &amp; Security</li>
                      <li>Scroll to &quot;Data Management&quot;</li>
                      <li>Tap &quot;Delete Account&quot;</li>
                      <li>Follow the confirmation prompts</li>
                    </ol>
                    <div className="mt-3 rounded-2xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.07)] p-4">
                      <p className="text-sm text-white/80">
                        <strong className="text-[#f87171]">Warning:</strong> Account deletion is permanent and cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-body font-normal text-lg text-white/90">6.4 GDPR Rights (EU Users)</h3>
                    <p className="mt-1">If you are located in the European Economic Area (EEA), you have additional rights:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                      <li>Right to access your data</li>
                      <li>Right to rectification</li>
                      <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
                      <li>Right to restrict processing</li>
                      <li>Right to data portability</li>
                      <li>Right to object to processing</li>
                      <li>Right to withdraw consent</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">7. Children&apos;s Privacy</h2>
                <p>
                  Helthy is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">8. Permissions We Request</h2>
                <div className="space-y-3">
                  <h3 className="font-body font-normal text-lg text-white/90 mb-1">iOS Permissions</h3>
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="font-semibold text-white">HealthKit (Read/Write)</p>
                      <p className="text-sm text-white/60 mt-1">Usage: To sync health data (steps, weight, workouts)</p>
                      <p className="text-sm text-white/60">Revoke: iOS Settings → Privacy &amp; Security → Health</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="font-semibold text-white">Camera</p>
                      <p className="text-sm text-white/60 mt-1">Usage: To scan barcodes and take meal photos</p>
                      <p className="text-sm text-white/60">Revoke: iOS Settings → Privacy &amp; Security → Camera</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="font-semibold text-white">Photo Library</p>
                      <p className="text-sm text-white/60 mt-1">Usage: To attach meal images and save photos</p>
                      <p className="text-sm text-white/60">Revoke: iOS Settings → Privacy &amp; Security → Photos</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="font-semibold text-white">Microphone &amp; Speech Recognition</p>
                      <p className="text-sm text-white/60 mt-1">Usage: To voice-log meals with speech-to-text</p>
                      <p className="text-sm text-white/60">Revoke: iOS Settings → Privacy &amp; Security → Microphone</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="font-semibold text-white">Notifications</p>
                      <p className="text-sm text-white/60 mt-1">Usage: To send reminders and updates</p>
                      <p className="text-sm text-white/60">Revoke: iOS Settings → Notifications</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <h3 className="font-body font-normal text-lg text-white/90 mb-1">Android Permissions</h3>
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="font-semibold text-white">Health Connect (Read/Write)</p>
                      <p className="text-sm text-white/60 mt-1">Usage: To sync health data (steps, weight, workouts)</p>
                      <p className="text-sm text-white/60">Revoke: Android Settings → Apps → Health Connect → App permissions</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="font-semibold text-white">Camera</p>
                      <p className="text-sm text-white/60 mt-1">Usage: To scan barcodes and take meal photos</p>
                      <p className="text-sm text-white/60">Revoke: Android Settings → Apps → Helthy → Permissions → Camera</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="font-semibold text-white">Photo Library / Media</p>
                      <p className="text-sm text-white/60 mt-1">Usage: To attach meal images and save photos</p>
                      <p className="text-sm text-white/60">Revoke: Android Settings → Apps → Helthy → Permissions → Photos &amp; Videos</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="font-semibold text-white">Microphone</p>
                      <p className="text-sm text-white/60 mt-1">Usage: To voice-log meals with speech-to-text</p>
                      <p className="text-sm text-white/60">Revoke: Android Settings → Apps → Helthy → Permissions → Microphone</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="font-semibold text-white">Notifications</p>
                      <p className="text-sm text-white/60 mt-1">Usage: To send reminders and updates</p>
                      <p className="text-sm text-white/60">Revoke: Android Settings → Apps → Helthy → Notifications</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4 rounded-2xl border border-helthy-lemon/15 bg-helthy-lemon/[0.04] p-7">
                <h2 className="font-body font-semibold text-xl text-helthy-lemon">9. Medical Disclaimer</h2>
                <p className="text-helthy-lemon/80">
                  <strong>IMPORTANT:</strong> Helthy is not a medical device and does not provide medical advice, diagnosis, or treatment. The information provided by Helthy is for general health and fitness purposes only and is not intended to replace professional medical advice, diagnosis, or treatment.
                </p>
                <p>
                  Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of information provided by Helthy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">10. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page, updating the &quot;Last Updated&quot; date, and sending you an email notification for material changes.
                </p>
                <p>
                  Your continued use of the Service after changes become effective constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-body font-semibold text-xl text-white">11. Contact Us</h2>
                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 space-y-2">
                  <p><strong className="text-white">Email:</strong> <a href="mailto:support@helthy.app" className="text-helthy-lemon hover:underline">support@helthy.app</a></p>
                  <p><strong className="text-white">Website:</strong> <a href="https://helthy.app" className="text-helthy-lemon hover:underline">https://helthy.app</a></p>
                </div>
              </section>

              <div className="pt-6 mt-6 border-t border-white/10">
                <p className="text-white/50 italic text-sm">
                  Your Consent: By using Helthy, you consent to our Privacy Policy and agree to its terms.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
