"use client";
import SiteFooter from "../../components/legacy/SiteFooter";

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen bg-helthy-black pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
          <div className="space-y-8 text-white/90">
            <div className="space-y-4 pb-8 border-b border-white/10">
              <h1 className="text-4xl lg:text-5xl font-bold text-white">Terms of Service</h1>
              <p className="text-white/60">Last Updated: January 2025</p>
              <p className="text-white/60">Effective Date: January 2025</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
              <p>
                By downloading, installing, accessing, or using the Helthy mobile application ("App") and services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.
              </p>
              <p>
                Helthy ("we," "us," or "our") reserves the right to modify these Terms at any time. We will notify you of material changes via email or in-app notification. Your continued use of the Service after changes become effective constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">2. Description of Service</h2>
              <p>Helthy is a health and fitness tracking application that allows users to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Log workouts and exercises</li>
                <li>Track nutrition and meals</li>
                <li>Monitor health metrics (weight, steps, etc.)</li>
                <li>Set and track fitness goals</li>
                <li>Receive AI-powered insights and recommendations</li>
                <li>Sync data with Apple HealthKit</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">3. Eligibility</h2>
              <p>
                You must be at least 13 years old to use Helthy. If you are under 18, you represent that you have your parent's or guardian's permission to use the Service.
              </p>
              <p>By using the Service, you represent and warrant that:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>You are at least 13 years old</li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>You will provide accurate and complete information</li>
                <li>You will not use the Service for any illegal purpose</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">4. Account Registration and Security</h2>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white/90">4.1 Account Creation</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>You must create an account to use most features of the Service</li>
                  <li>You must provide accurate, current, and complete information</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You are responsible for all activities that occur under your account</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white/90">4.2 Account Security</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>You must immediately notify us of any unauthorized use of your account</li>
                  <li>We are not liable for any loss or damage arising from unauthorized account access</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 bg-red-500/10 border border-red-500/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-red-400">5. Medical Disclaimer and Limitation of Liability</h2>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-red-300">5.1 NOT MEDICAL ADVICE</h3>
                <p className="text-red-200 font-semibold">
                  CRITICAL: Helthy is NOT a medical device and does NOT provide medical advice, diagnosis, or treatment. The Service is for general health and fitness tracking purposes only.
                </p>
                <p className="font-semibold">YOU ACKNOWLEDGE AND AGREE THAT:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Helthy is not a substitute for professional medical advice, diagnosis, or treatment</li>
                  <li>You should always seek the advice of qualified health providers with any medical questions</li>
                  <li>You should never disregard professional medical advice because of information from Helthy</li>
                  <li>Nutritional information and calculations are estimates and may not be accurate for your specific needs</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-red-300">5.2 Health Risks</h3>
                <p>Physical exercise and dietary changes can be dangerous. You acknowledge that:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>You are using Helthy at your own risk</li>
                  <li>You should consult a healthcare provider before starting any exercise or diet program</li>
                  <li>You are responsible for your own health and safety</li>
                  <li>We are not responsible for any injuries or health issues resulting from use of the Service</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-red-300">5.3 Limitation of Liability</h3>
                <p className="font-semibold">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Helthy is provided "AS IS" and "AS AVAILABLE" without warranties of any kind</li>
                  <li>We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose</li>
                  <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Our total liability shall not exceed the amount you paid us in the past 12 months, or $100, whichever is greater</li>
                  <li>We are not liable for any loss of data, profits, or business opportunities</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">6. User Responsibilities and Acceptable Use</h2>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white/90">6.1 Acceptable Use</h3>
                <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Violate Laws:</strong> Use the Service in violation of any applicable laws or regulations</li>
                  <li><strong>Harm Others:</strong> Harass, abuse, or harm other users or third parties</li>
                  <li><strong>Impersonate:</strong> Impersonate any person or entity or misrepresent your affiliation</li>
                  <li><strong>Interfere:</strong> Interfere with or disrupt the Service or servers</li>
                  <li><strong>Reverse Engineer:</strong> Attempt to reverse engineer, decompile, or disassemble the Service</li>
                  <li><strong>Scrape Data:</strong> Use automated systems to scrape or collect data from the Service</li>
                  <li><strong>Abuse AI Features:</strong> Use AI features to generate harmful, illegal, or inappropriate content</li>
                  <li><strong>Spam:</strong> Send unsolicited communications or spam</li>
                  <li><strong>Malicious Code:</strong> Introduce viruses, malware, or other harmful code</li>
                  <li><strong>Circumvent Security:</strong> Attempt to circumvent security measures or access unauthorized areas</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">7. Intellectual Property</h2>
              <p>
                The Service, including all software, designs, text, graphics, and logos, is owned by Helthy or our licensors. You may not copy, modify, distribute, or create derivative works without our permission. "Helthy" is a trademark of Helthy. All rights reserved.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">8. Account Suspension and Termination</h2>
              <p>
                We may suspend or terminate your account immediately if you violate these Terms, engage in fraudulent or illegal activity, abuse the Service or other users, or violate any applicable laws.
              </p>
              <p>
                Upon termination, your right to use the Service immediately ceases, and we will delete your account and data according to our Privacy Policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">9. Third-Party Services</h2>
              <p>
                The Service may contain links to third-party websites or integrate with third-party services. We are not responsible for the content or practices of third-party websites or services. Your use of third-party services is subject to their terms and privacy policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">10. Dispute Resolution</h2>
              <p>
                Before filing a claim, you agree to contact us at <a href="mailto:support@helthy.app" className="text-helthy-lemon hover:underline">support@helthy.app</a> to attempt to resolve the dispute informally.
              </p>
              <p>
                These Terms are governed by the laws of Ohio, United States, without regard to conflict of law principles.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">11. Contact Information</h2>
              <p>If you have questions about these Terms, please contact us:</p>
              <div className="space-y-2 pl-4">
                <p><strong>Email:</strong> <a href="mailto:legal@helthy.app" className="text-helthy-lemon hover:underline">legal@helthy.app</a></p>
                <p><strong>Support:</strong> <a href="mailto:support@helthy.app" className="text-helthy-lemon hover:underline">support@helthy.app</a></p>
                <p><strong>Website:</strong> <a href="https://helthy.app" className="text-helthy-lemon hover:underline">https://helthy.app</a></p>
              </div>
            </section>

            <div className="pt-8 mt-8 border-t border-white/10">
              <p className="text-white/60 italic">
                By using Helthy, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
