import type { Metadata } from "next";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the Helthy app and services.",
  alternates: { canonical: "https://helthy.app/terms" },
};

export default function TermsPage() {
  return (
    <>
      <main className="relative min-h-screen bg-canvas text-fg">
        <section className="container-narrow pb-24 pt-32 lg:pt-40">
          <div className="max-w-3xl space-y-12">
            {/* Header */}
            <div className="space-y-5 pb-10 border-b border-line">
              <h1 className="text-display-xl text-fg">
                <span className="text-accent-ink">Terms</span> of Service
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-fg-subtle">
                <span>Last Updated: May 2026</span>
                <span>Effective Date: March 2026</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-12 text-base leading-7 text-fg-muted">

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">1. Acceptance of Terms</h2>
                <p>
                  By downloading, installing, accessing, or using the Helthy mobile application (&quot;App&quot;) and services (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service.
                </p>
                <p>
                  Helthy (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) reserves the right to modify these Terms at any time. We will notify you of material changes via email or in-app notification. Your continued use of the Service after changes become effective constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">2. Description of Service</h2>
                <p>Helthy is a health and fitness tracking application that allows users to:</p>
                <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                  <li>Log workouts and exercises</li>
                  <li>Track nutrition and meals</li>
                  <li>Monitor health metrics (weight, steps, etc.)</li>
                  <li>Set and track fitness goals</li>
                  <li>Receive AI-powered insights and recommendations</li>
                  <li>Get AI-estimated body fat percentage from progress photos</li>
                  <li>Chat with an AI health coaching assistant</li>
                  <li>Sync data with Apple HealthKit</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">3. Eligibility</h2>
                <p>
                  You must be at least 13 years old to use Helthy. If you are under 18, you represent that you have your parent&apos;s or guardian&apos;s permission to use the Service.
                </p>
                <p>By using the Service, you represent and warrant that:</p>
                <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                  <li>You are at least 13 years old</li>
                  <li>You have the legal capacity to enter into these Terms</li>
                  <li>You will provide accurate and complete information</li>
                  <li>You will not use the Service for any illegal purpose</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">4. Account Registration and Security</h2>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">4.1 Account Creation</h3>
                  <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                    <li>You must create an account to use most features of the Service</li>
                    <li>You must provide accurate, current, and complete information</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You are responsible for all activities that occur under your account</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">4.2 Account Security</h3>
                  <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                    <li>You must immediately notify us of any unauthorized use of your account</li>
                    <li>We are not liable for any loss or damage arising from unauthorized account access</li>
                    <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">5. Payments &amp; Subscriptions</h2>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">5.1 In-App Purchases via Apple &amp; Google</h3>
                  <p>
                    Helthy Pro is sold as an in-app purchase through Apple&apos;s App Store (iOS) and Google Play (Android). All transactions are processed by the respective platform and are subject to their terms: <a href="https://www.apple.com/legal/internet-services/itunes/us/terms.html" target="_blank" rel="noopener noreferrer" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">Apple Media Services Terms</a> and <a href="https://play.google.com/about/play-terms/" target="_blank" rel="noopener noreferrer" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">Google Play Terms of Service</a>. We do not collect or store your payment information.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">5.2 Subscription Plans</h3>
                  <p>Helthy Pro is available on two billing cycles:</p>
                  <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                    <li><strong className="font-medium text-fg">Monthly:</strong> billed once per month</li>
                    <li><strong className="font-medium text-fg">Annual:</strong> billed once per year — the lower effective monthly rate</li>
                  </ul>
                  <p>Current pricing is displayed in the app and on our website. Prices are in USD and may vary by region as determined by Apple.</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">5.3 Auto-Renewal</h3>
                  <p>
                    Subscriptions automatically renew at the end of each billing period unless cancelled at least 24 hours before the renewal date. Your Apple ID or Google account will be charged upon confirmation of purchase and at renewal. You can manage or cancel your subscription at any time: on iOS via Settings &rarr; Apple ID &rarr; Subscriptions; on Android via Google Play &rarr; Subscriptions.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">5.4 Free Tier</h3>
                  <p>
                    A free tier is available with no time limit. No credit card is required to use free features. Free tier features may change over time, but we will provide notice of any material reductions in free functionality.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">5.5 Refunds</h3>
                  <p>
                    All purchases are final and non-refundable except as required by applicable law or the platform&apos;s own refund policies. To request a refund on iOS, visit <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">reportaproblem.apple.com</a>; on Android, request a refund through Google Play. We do not issue refunds directly.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">5.6 Price Changes</h3>
                  <p>
                    We reserve the right to change subscription prices at any time. If we increase the price of your active subscription, Apple or Google will notify you before the change takes effect and your subscription will not auto-renew at the new price without your consent.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">5.7 Cancellation &amp; Access After Cancellation</h3>
                  <p>
                    Cancelling your subscription stops future charges. You retain access to Pro features until the end of your current paid period, after which your account reverts to the free tier. No prorated refunds are issued for unused time. On Android, cancellation takes effect at the end of the current billing cycle per Google Play policy.
                  </p>
                </div>
              </section>

              <section className="card card-accent space-y-5 p-6 sm:p-7">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">6. Medical Disclaimer and Limitation of Liability</h2>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">6.1 NOT MEDICAL ADVICE</h3>
                  <p className="font-medium text-fg">
                    CRITICAL: Helthy is NOT a medical device and does NOT provide medical advice, diagnosis, or treatment. The Service is for general health and fitness tracking purposes only.
                  </p>
                  <p className="font-medium text-fg">YOU ACKNOWLEDGE AND AGREE THAT:</p>
                  <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                    <li>Helthy is not a substitute for professional medical advice, diagnosis, or treatment</li>
                    <li>You should always seek the advice of qualified health providers with any medical questions</li>
                    <li>You should never disregard professional medical advice because of information from Helthy</li>
                    <li>Nutritional information and calculations are estimates and may not be accurate for your specific needs</li>
                    <li>AI body fat estimates are approximations and should not be used for medical decisions — consult a professional for precise measurements</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">6.2 Health Risks</h3>
                  <p>Physical exercise and dietary changes can be dangerous. You acknowledge that:</p>
                  <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                    <li>You are using Helthy at your own risk</li>
                    <li>You should consult a healthcare provider before starting any exercise or diet program</li>
                    <li>You are responsible for your own health and safety</li>
                    <li>We are not responsible for any injuries or health issues resulting from use of the Service</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">6.3 Limitation of Liability</h3>
                  <p className="font-medium text-fg">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                  <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                    <li>Helthy is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind</li>
                    <li>We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose</li>
                    <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Our total liability shall not exceed the amount you paid us in the past 12 months, or $100, whichever is greater</li>
                    <li>We are not liable for any loss of data, profits, or business opportunities</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">7. User Responsibilities and Acceptable Use</h2>
                <div className="space-y-3">
                  <h3 className="text-[17px] font-medium text-fg">7.1 Acceptable Use</h3>
                  <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
                  <ul className="list-disc list-inside marker:text-fg-subtle space-y-2 pl-4">
                    <li><strong className="font-medium text-fg">Violate Laws:</strong> Use the Service in violation of any applicable laws or regulations</li>
                    <li><strong className="font-medium text-fg">Harm Others:</strong> Harass, abuse, or harm other users or third parties</li>
                    <li><strong className="font-medium text-fg">Impersonate:</strong> Impersonate any person or entity or misrepresent your affiliation</li>
                    <li><strong className="font-medium text-fg">Interfere:</strong> Interfere with or disrupt the Service or servers</li>
                    <li><strong className="font-medium text-fg">Reverse Engineer:</strong> Attempt to reverse engineer, decompile, or disassemble the Service</li>
                    <li><strong className="font-medium text-fg">Scrape Data:</strong> Use automated systems to scrape or collect data from the Service</li>
                    <li><strong className="font-medium text-fg">Abuse AI Features:</strong> Use AI features to generate harmful, illegal, or inappropriate content</li>
                    <li><strong className="font-medium text-fg">Spam:</strong> Send unsolicited communications or spam</li>
                    <li><strong className="font-medium text-fg">Malicious Code:</strong> Introduce viruses, malware, or other harmful code</li>
                    <li><strong className="font-medium text-fg">Circumvent Security:</strong> Attempt to circumvent security measures or access unauthorized areas</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">8. Intellectual Property</h2>
                <p>
                  The Service, including all software, designs, text, graphics, and logos, is owned by Helthy or our licensors. You may not copy, modify, distribute, or create derivative works without our permission. &quot;Helthy&quot; is a trademark of Helthy. All rights reserved.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">9. Account Suspension and Termination</h2>
                <p>
                  We may suspend or terminate your account immediately if you violate these Terms, engage in fraudulent or illegal activity, abuse the Service or other users, or violate any applicable laws.
                </p>
                <p>
                  Upon termination, your right to use the Service immediately ceases, and we will delete your account and data according to our Privacy Policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">10. Third-Party Services</h2>
                <p>
                  The Service may contain links to third-party websites or integrate with third-party services. We are not responsible for the content or practices of third-party websites or services. Your use of third-party services is subject to their terms and privacy policies.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">11. Dispute Resolution</h2>
                <p>
                  Before filing a claim, you agree to contact us at <a href="mailto:support@helthy.app" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">support@helthy.app</a> to attempt to resolve the dispute informally.
                </p>
                <p>
                  These Terms are governed by the laws of Ohio, United States, without regard to conflict of law principles.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">12. Contact Information</h2>
                <p>If you have questions about these Terms, please contact us:</p>
                <div className="card p-5 space-y-2">
                  <p><strong className="font-medium text-fg">Email:</strong> <a href="mailto:support@helthy.app" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">support@helthy.app</a></p>
                  <p><strong className="font-medium text-fg">Website:</strong> <a href="https://helthy.app" className="text-accent-ink underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-current">https://helthy.app</a></p>
                </div>
              </section>

              <div className="pt-6 mt-6 border-t border-line">
                <p className="text-sm text-fg-subtle">
                  By using Helthy, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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
