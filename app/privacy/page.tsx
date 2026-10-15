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
      <main className="theme-light relative min-h-screen bg-canvas text-fg">
        <section className="container-page pb-24 pt-32 lg:pt-40">
          <div className="max-w-3xl space-y-12">
            {/* Header */}
            <div className="space-y-5 pb-10 border-b border-line">
              <h1 className="text-display-xl text-fg">
                <span className="text-highlight">Privacy</span> Policy
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-fg-subtle">
                <span>Last Updated: September 2026</span>
                <span>Effective Date: March 2026</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-12 text-base leading-7 text-fg-muted">

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">1. Introduction</h2>
                <p>
                  Helthy (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services (collectively, the &quot;Service&quot;).
                </p>
                <p>
                  By using Helthy, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, do not use our Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">2. Information We Collect</h2>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">2.1 Personal Information</h3>
                  <p>We collect the following personal information when you create an account and use our Service:</p>
                  <div className="space-y-3 pl-4">
                    <div>
                      <p className="font-medium text-fg">Account Information:</p>
                      <ul className="list-disc list-inside marker:text-fg-subtle space-y-1 pl-4">
                        <li>Email address</li>
                        <li>First name and last name (optional)</li>
                        <li>Profile picture (optional)</li>
                        <li>Authentication credentials (managed by our authentication provider)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-fg">Health and Fitness Data:</p>
                      <ul className="list-disc list-inside marker:text-fg-subtle space-y-1 pl-4">
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
                  <h3 className="text-[17px] font-medium text-fg">2.2 Health Data from Apple HealthKit &amp; Google Health Connect</h3>
                  <p>If you grant permission, we may access and store the following data from Apple HealthKit (iOS) or Google Health Connect (Android):</p>
                  <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                    <li>Steps and activity data</li>
                    <li>Weight measurements</li>
                    <li>Workout data</li>
                    <li>Other health metrics you choose to share</li>
                  </ul>
                  <div className="card p-5">
                    <p className="text-fg-muted">
                      <strong className="font-medium text-fg">Important: </strong> We only read and write health platform data with your explicit permission. On iOS you can revoke this through iOS Settings → Privacy &amp; Security → Health. On Android you can revoke this through Android Settings → Apps → Health Connect.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                  <li>Track your workouts and nutrition</li>
                  <li>Calculate your TDEE (Total Daily Energy Expenditure)</li>
                  <li>Generate personalized insights and recommendations</li>
                  <li>Sync data across your devices</li>
                  <li>Send you notifications about meal logging, your weekly progress and milestones</li>
                  <li>Parse food descriptions and meal photos using AI</li>
                  <li>Provide an AI health coaching chat assistant</li>
                  <li>Estimate body fat percentage from progress photos using AI vision analysis (with your explicit consent)</li>
                  <li>Provide workout recommendations</li>
                  <li>Improve our features and user experience</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">4. Third-Party Services and Data Sharing</h2>
                <p>We use the following third-party services that may process your data:</p>
                <div className="space-y-3">
                  <div className="card p-5">
                    <p className="font-medium text-fg">Authentication Provider</p>
                    <p className="text-sm text-fg-muted mt-1">Data shared: Email, name, authentication tokens</p>
                    <p className="text-sm text-fg-muted">Purpose: Secure user authentication</p>
                  </div>
                  <div className="card p-5">
                    <p className="font-medium text-fg">Cloud Hosting & Infrastructure Providers</p>
                    <p className="text-sm text-fg-muted mt-1">Data shared: Encrypted user data, profile images, and meal/progress photos</p>
                    <p className="text-sm text-fg-muted">Purpose: Secure database storage, media hosting, and search functionality</p>
                  </div>
                  <div className="card p-5">
                    <p className="font-medium text-fg">AI Service Providers</p>
                    <p className="text-sm text-fg-muted mt-1">Data shared: Meal photos, nutrition label photos, progress photos (for body fat estimates, with your consent), coach chat messages, typed and spoken food descriptions, and the information the coach needs to answer you (such as your profile, targets, recent meals, workouts and weight trend)</p>
                    <p className="text-sm text-fg-muted">Purpose: AI coach chat, meal photo and label analysis, nutrition estimates, body fat estimates, AI-built workouts and meal ideas, and personalized insights</p>
                  </div>
                  <div className="card p-5">
                    <p className="font-medium text-fg">Speech Recognition Providers</p>
                    <p className="text-sm text-fg-muted mt-1">Data shared: Audio while you voice-log a meal</p>
                    <p className="text-sm text-fg-muted">Purpose: Transcribing what you say into a food log</p>
                  </div>
                  <div className="card p-5">
                    <p className="text-sm text-accent-ink"><strong>Important:</strong> None of our AI or speech providers may use your data, photos or recordings to train their models. We use their business services under terms that exclude training, and we opt out of any model-improvement programs. Providers may keep data for a limited period for abuse monitoring before deleting it.</p>
                  </div>
                  <div className="card p-5">
                    <p className="font-medium text-fg">Subscription Management Provider</p>
                    <p className="text-sm text-fg-muted mt-1">Data shared: Anonymous user ID, purchase receipts, subscription status</p>
                    <p className="text-sm text-fg-muted">Purpose: Manage premium subscriptions and entitlements</p>
                  </div>
                </div>
                <p>A current list of the service providers we use is available on request at <a href="mailto:support@helthy.app" className="text-accent-ink underline underline-offset-2">support@helthy.app</a>.</p>
                <p className="font-medium text-accent-ink">We do not sell your personal information to third parties.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">5. Data Storage and Retention</h2>
                <p>
                  Your data is stored on secure servers provided by our hosting partners. Data may be stored in the United States or other countries where our service providers operate.
                </p>
                <p>We retain your personal information for as long as your account is active or as needed to provide you services. We will delete or anonymize your data:</p>
                <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                  <li><strong className="font-medium text-fg">Upon Account Deletion:</strong> All your data is permanently deleted within 30 days of account deletion request</li>
                  <li><strong className="font-medium text-fg">Inactive Accounts:</strong> We may delete accounts that have been inactive for 3 years</li>
                  <li><strong className="font-medium text-fg">Legal Requirements:</strong> We may retain certain data as required by law</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">6. Your Rights and Choices</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[17px] font-medium text-fg">6.1 Access and Correction</h3>
                    <p className="mt-1">You can access and update your personal information through the app settings or by contacting us.</p>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-medium text-fg">6.2 Data Export</h3>
                    <p className="mt-1">Helthy Premium members can export a ZIP of all their data, or CSV files of their workouts or nutrition, from Settings → Privacy → Export Data. Anyone can request a copy of their data by emailing support@helthy.app.</p>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-medium text-fg">6.3 Account Deletion</h3>
                    <p className="mt-1">You can delete your account and all associated data at any time:</p>
                    <ol className="list-decimal list-inside marker:text-fg-subtle space-y-1 pl-4 mt-2">
                      <li>Go to Settings → Privacy &amp; Security</li>
                      <li>Scroll to &quot;Data Management&quot;</li>
                      <li>Tap &quot;Delete Account&quot;</li>
                      <li>Follow the confirmation prompts</li>
                    </ol>
                    <div className="mt-3 card border-line-strong p-4">
                      <p className="text-sm text-fg-muted">
                        <strong className="text-fg">Warning:</strong> Account deletion is permanent and cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-medium text-fg">6.4 GDPR Rights (EU Users)</h3>
                    <p className="mt-1">If you are located in the European Economic Area (EEA), you have additional rights:</p>
                    <ul className="list-disc list-inside marker:text-fg-subtle space-y-1 pl-4 mt-2">
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
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">7. Children&apos;s Privacy</h2>
                <p>
                  Helthy is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">8. Permissions We Request</h2>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg mb-1">iOS Permissions</h3>
                  <div className="space-y-3">
                    <div className="card p-5">
                      <p className="font-medium text-fg">HealthKit (Read/Write)</p>
                      <p className="text-sm text-fg-muted mt-1">Usage: To sync health data (steps, weight, workouts)</p>
                      <p className="text-sm text-fg-muted">Revoke: iOS Settings → Privacy &amp; Security → Health</p>
                    </div>
                    <div className="card p-5">
                      <p className="font-medium text-fg">Camera</p>
                      <p className="text-sm text-fg-muted mt-1">Usage: To scan barcodes and take meal photos</p>
                      <p className="text-sm text-fg-muted">Revoke: iOS Settings → Privacy &amp; Security → Camera</p>
                    </div>
                    <div className="card p-5">
                      <p className="font-medium text-fg">Photo Library</p>
                      <p className="text-sm text-fg-muted mt-1">Usage: To attach meal images and save photos</p>
                      <p className="text-sm text-fg-muted">Revoke: iOS Settings → Privacy &amp; Security → Photos</p>
                    </div>
                    <div className="card p-5">
                      <p className="font-medium text-fg">Microphone &amp; Speech Recognition</p>
                      <p className="text-sm text-fg-muted mt-1">Usage: To voice-log meals with speech-to-text</p>
                      <p className="text-sm text-fg-muted">Revoke: iOS Settings → Privacy &amp; Security → Microphone</p>
                    </div>
                    <div className="card p-5">
                      <p className="font-medium text-fg">Notifications</p>
                      <p className="text-sm text-fg-muted mt-1">Usage: To notify you about meal logging, weekly progress and milestones</p>
                      <p className="text-sm text-fg-muted">Revoke: iOS Settings → Notifications</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <h3 className="text-[17px] font-medium text-fg mb-1">Android Permissions</h3>
                  <div className="space-y-3">
                    <div className="card p-5">
                      <p className="font-medium text-fg">Health Connect (Read/Write)</p>
                      <p className="text-sm text-fg-muted mt-1">Usage: To sync health data (steps, weight, workouts)</p>
                      <p className="text-sm text-fg-muted">Revoke: Android Settings → Apps → Health Connect → App permissions</p>
                    </div>
                    <div className="card p-5">
                      <p className="font-medium text-fg">Camera</p>
                      <p className="text-sm text-fg-muted mt-1">Usage: To scan barcodes and take meal photos</p>
                      <p className="text-sm text-fg-muted">Revoke: Android Settings → Apps → Helthy → Permissions → Camera</p>
                    </div>
                    <div className="card p-5">
                      <p className="font-medium text-fg">Photo Library / Media</p>
                      <p className="text-sm text-fg-muted mt-1">Usage: To attach meal images and save photos</p>
                      <p className="text-sm text-fg-muted">Revoke: Android Settings → Apps → Helthy → Permissions → Photos &amp; Videos</p>
                    </div>
                    <div className="card p-5">
                      <p className="font-medium text-fg">Microphone</p>
                      <p className="text-sm text-fg-muted mt-1">Usage: To voice-log meals with speech-to-text</p>
                      <p className="text-sm text-fg-muted">Revoke: Android Settings → Apps → Helthy → Permissions → Microphone</p>
                    </div>
                    <div className="card p-5">
                      <p className="font-medium text-fg">Notifications</p>
                      <p className="text-sm text-fg-muted mt-1">Usage: To notify you about meal logging, weekly progress and milestones</p>
                      <p className="text-sm text-fg-muted">Revoke: Android Settings → Apps → Helthy → Notifications</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="card card-accent space-y-4 p-6 sm:p-7">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">9. Medical Disclaimer</h2>
                <p className="text-fg">
                  <strong>IMPORTANT:</strong> Helthy is not a medical device and does not provide medical advice, diagnosis, or treatment. The information provided by Helthy is for general health and fitness purposes only and is not intended to replace professional medical advice, diagnosis, or treatment.
                </p>
                <p>
                  Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of information provided by Helthy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">10. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page, updating the &quot;Last Updated&quot; date, and sending you an email notification for material changes.
                </p>
                <p>
                  Your continued use of the Service after changes become effective constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">11. Contact Us</h2>
                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="card p-5 space-y-2">
                  <p><strong className="font-medium text-fg">Email:</strong> <a href="mailto:support@helthy.app" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">support@helthy.app</a></p>
                  <p><strong className="font-medium text-fg">Website:</strong> <a href="https://helthy.app" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">https://helthy.app</a></p>
                </div>
              </section>

              <div className="pt-6 mt-6 border-t border-line">
                <p className="text-sm text-fg-subtle">
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
