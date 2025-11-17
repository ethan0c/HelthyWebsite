"use client";
import SiteFooter from "../../components/legacy/SiteFooter";

export default function LicensePage() {
  return (
    <>
      <main className="min-h-screen bg-helthy-black pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
          <div className="space-y-8 text-white/90">
            <div className="space-y-4 pb-8 border-b border-white/10">
              <h1 className="text-4xl lg:text-5xl font-bold text-white">License</h1>
              <p className="text-white/60">Copyright © 2024 Helthy</p>
            </div>

            <section className="space-y-6 bg-white/5 p-8 rounded-lg border border-white/10">
              <h2 className="text-2xl font-semibold text-white">All Rights Reserved</h2>
              
              <p>
                This software and associated documentation files (the "Software") are the proprietary 
                and confidential property of Helthy.
              </p>

              <p>
                Unauthorized copying, modification, distribution, or use of this Software, via any medium, 
                is strictly prohibited without the express written permission of Helthy.
              </p>

              <div className="mt-6 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Disclaimer</h3>
                <p className="text-yellow-200 text-sm leading-relaxed">
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
                  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
                  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
                  FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
                  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
                  DEALINGS IN THE SOFTWARE.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-white/70">
                  For licensing inquiries, please contact:{" "}
                  <a href="mailto:legal@helthy.app" className="text-helthy-lemon hover:underline">
                    legal@helthy.app
                  </a>
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Third-Party Licenses</h2>
              <p className="text-white/70">
                Helthy uses various open-source libraries and dependencies. Each third-party library 
                maintains its own license terms. For a complete list of third-party licenses, please 
                refer to the respective package documentation.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Related Legal Documents</h2>
              <div className="grid gap-3">
                <a 
                  href="/terms" 
                  className="block p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                >
                  <h3 className="font-semibold text-white mb-1">Terms of Service</h3>
                  <p className="text-sm text-white/60">View our terms and conditions for using the Helthy app</p>
                </a>
                <a 
                  href="/privacy" 
                  className="block p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                >
                  <h3 className="font-semibold text-white mb-1">Privacy Policy</h3>
                  <p className="text-sm text-white/60">Learn how we collect, use, and protect your data</p>
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
