"use client";
import SiteFooter from "../../components/legacy/SiteFooter";

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-helthy-black pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
          <div className="space-y-8 text-white/90">
            <div className="space-y-4 pb-8 border-b border-white/10">
              <h1 className="text-4xl lg:text-5xl font-bold text-white">Privacy Policy</h1>
              <p className="text-white/60">Last Updated: January 2025</p>
              <p className="text-white/60">Effective Date: January 2025</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
              <p>
                Helthy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services (collectively, the "Service").
              </p>
              <p>
                By using Helthy, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, do not use our Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white/90">2.1 Personal Information</h3>
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
                <h3 className="text-xl font-semibold text-white/90">2.2 Health Data from Apple HealthKit</h3>
                <p>If you grant permission, we may access and store the following data from Apple HealthKit:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Steps and activity data</li>
                  <li>Weight measurements</li>
                  <li>Workout data</li>
                  <li>Other health metrics you choose to share</li>
                </ul>
                <p className="text-white/70 bg-white/5 p-4 rounded-lg border border-white/10">
                  <strong>Important:</strong> We only read and write HealthKit data with your explicit permission. You can revoke this permission at any time through your iOS Settings.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Track your workouts and nutrition</li>
                <li>Calculate your TDEE (Total Daily Energy Expenditure)</li>
                <li>Generate personalized insights and recommendations</li>
                <li>Sync data across your devices</li>
                <li>Send you notifications and reminders</li>
                <li>Parse food descriptions using AI</li>
                <li>Provide workout recommendations</li>
                <li>Improve our features and user experience</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">4. Third-Party Services and Data Sharing</h2>
              <p>We use the following third-party services that may process your data:</p>
              <div className="space-y-3 pl-4">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="font-semibold text-white">Clerk - Authentication</p>
                  <p className="text-sm text-white/70">Data shared: Email, name, authentication tokens</p>
                  <p className="text-sm text-white/70">Purpose: Secure user authentication</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="font-semibold text-white">Cloudinary - Media Storage</p>
                  <p className="text-sm text-white/70">Data shared: Profile pictures, meal photos, progress photos</p>
                  <p className="text-sm text-white/70">Purpose: Store and serve images</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="font-semibold text-white">Neon - Database Hosting</p>
                  <p className="text-sm text-white/70">Data shared: All user data stored in our database</p>
                  <p className="text-sm text-white/70">Purpose: Data storage and management</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="font-semibold text-white">Typesense - Search Engine</p>
                  <p className="text-sm text-white/70">Data shared: Food library data, exercise data, user search queries</p>
                  <p className="text-sm text-white/70">Purpose: Fast search functionality</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="font-semibold text-white">OpenAI - AI Services</p>
                  <p className="text-sm text-white/70">Data shared: Food descriptions, meal images, user queries</p>
                  <p className="text-sm text-white/70">Purpose: Parse food intake, generate insights, provide chat assistance</p>
                  <p className="text-sm text-red-300 mt-2"><strong>Important:</strong> OpenAI may use your data to improve their models unless you opt out</p>
                </div>
              </div>
              <p className="font-semibold text-helthy-lemon">We do not sell your personal information to third parties.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">5. Data Storage and Retention</h2>
              <p>
                Your data is stored on secure servers provided by our hosting partners. Data may be stored in the United States or other countries where our service providers operate.
              </p>
              <p>We retain your personal information for as long as your account is active or as needed to provide you services. We will delete or anonymize your data:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Upon Account Deletion:</strong> All your data is permanently deleted within 30 days of account deletion request</li>
                <li><strong>Inactive Accounts:</strong> We may delete accounts that have been inactive for 3 years</li>
                <li><strong>Legal Requirements:</strong> We may retain certain data as required by law</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">6. Your Rights and Choices</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white/90">6.1 Access and Correction</h3>
                  <p>You can access and update your personal information through the app settings or by contacting us.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white/90">6.2 Data Export</h3>
                  <p>You can request a copy of your data in JSON, CSV, or PDF format through the app settings (Settings → Privacy & Security → Export My Data).</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white/90">6.3 Account Deletion</h3>
                  <p>You can delete your account and all associated data at any time:</p>
                  <ol className="list-decimal list-inside space-y-1 pl-4">
                    <li>Go to Settings → Privacy & Security</li>
                    <li>Scroll to "Data Management"</li>
                    <li>Tap "Delete Account"</li>
                    <li>Follow the confirmation prompts</li>
                  </ol>
                  <p className="text-red-300 mt-2">
                    <strong>Warning:</strong> Account deletion is permanent and cannot be undone. All your data will be permanently deleted.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white/90">6.4 GDPR Rights (EU Users)</h3>
                  <p>If you are located in the European Economic Area (EEA), you have additional rights:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Right to access your data</li>
                    <li>Right to rectification</li>
                    <li>Right to erasure ("right to be forgotten")</li>
                    <li>Right to restrict processing</li>
                    <li>Right to data portability</li>
                    <li>Right to object to processing</li>
                    <li>Right to withdraw consent</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">7. Children's Privacy</h2>
              <p>
                Helthy is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">8. Permissions We Request</h2>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white/90">iOS Permissions</h3>
                <div className="space-y-3 pl-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="font-semibold text-white">HealthKit (Read/Write)</p>
                    <p className="text-sm text-white/70">Usage: To sync health data (steps, weight, workouts)</p>
                    <p className="text-sm text-white/70">Revoke: iOS Settings → Privacy & Security → Health</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="font-semibold text-white">Camera</p>
                    <p className="text-sm text-white/70">Usage: To scan barcodes and take meal photos</p>
                    <p className="text-sm text-white/70">Revoke: iOS Settings → Privacy & Security → Camera</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="font-semibold text-white">Photo Library</p>
                    <p className="text-sm text-white/70">Usage: To attach meal images and save photos</p>
                    <p className="text-sm text-white/70">Revoke: iOS Settings → Privacy & Security → Photos</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="font-semibold text-white">Microphone & Speech Recognition</p>
                    <p className="text-sm text-white/70">Usage: To voice-log meals with speech-to-text</p>
                    <p className="text-sm text-white/70">Revoke: iOS Settings → Privacy & Security → Microphone</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="font-semibold text-white">Notifications</p>
                    <p className="text-sm text-white/70">Usage: To send reminders and updates</p>
                    <p className="text-sm text-white/70">Revoke: iOS Settings → Notifications</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-yellow-400">9. Medical Disclaimer</h2>
              <p className="text-yellow-200">
                <strong>IMPORTANT:</strong> Helthy is not a medical device and does not provide medical advice, diagnosis, or treatment. The information provided by Helthy is for general health and fitness purposes only and is not intended to replace professional medical advice, diagnosis, or treatment.
              </p>
              <p>
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of information provided by Helthy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page, updating the "Last Updated" date, and sending you an email notification for material changes.
              </p>
              <p>
                Your continued use of the Service after changes become effective constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">11. Contact Us</h2>
              <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="space-y-2 pl-4">
                <p><strong>Email:</strong> <a href="mailto:privacy@helthy.app" className="text-helthy-lemon hover:underline">privacy@helthy.app</a></p>
                <p><strong>Support:</strong> <a href="mailto:support@helthy.app" className="text-helthy-lemon hover:underline">support@helthy.app</a></p>
                <p><strong>Website:</strong> <a href="https://helthy.app" className="text-helthy-lemon hover:underline">https://helthy.app</a></p>
              </div>
            </section>

            <div className="pt-8 mt-8 border-t border-white/10">
              <p className="text-white/60 italic">
                Your Consent: By using Helthy, you consent to our Privacy Policy and agree to its terms.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
