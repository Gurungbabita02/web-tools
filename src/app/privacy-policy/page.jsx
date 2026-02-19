export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: February 18, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
          <p>
            FileToolsPro (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website
            web-tool-tawny.vercel.app. This Privacy Policy explains how we collect, use, and
            protect your information when you use our website and tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
          <p>We do not require user registration or collect personal information such as names, emails, or passwords. However, the following data may be collected automatically:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, device type, and referring URLs.</li>
            <li><strong>Cookies:</strong> We use cookies for analytics and advertising purposes.</li>
            <li><strong>Files Uploaded:</strong> Files you upload for processing (e.g., PDF compression, image conversion) are processed in your browser and are never stored on our servers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Google AdSense & Advertising</h2>
          <p>
            We use Google AdSense to display advertisements. Google may use cookies and web beacons
            to serve ads based on your prior visits to our website or other websites. You can opt out
            of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </p>
          <p className="mt-2">
            Third-party vendors, including Google, use cookies to serve ads based on your visits.
            Google&apos;s use of advertising cookies enables it and its partners to serve ads based on
            your visit to our site and/or other sites on the Internet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our free online tools</li>
            <li>To analyze website usage and improve our services</li>
            <li>To display relevant advertisements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
          <p>
            All file processing happens directly in your browser. We do not upload, store, or
            have access to your files. Your files never leave your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h2>
          <p>Our website may use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Google AdSense</strong> — for displaying advertisements</li>
            <li><strong>Google Analytics</strong> — for website traffic analysis</li>
            <li><strong>Vercel</strong> — for website hosting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 13. We do not knowingly
            collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this
            page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through
            our website.
          </p>
        </section>
      </div>
    </main>
  );
}
