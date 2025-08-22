import React from "react";

const Privacy = () => {
  return (
    <div className="bg-background text-foreground min-h-screen py-12 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="mb-8">Effective Date: August 2025</p>

        <p className="mb-6 ">
          At <span className="text-primary">DataRepo</span>, your privacy is important to us. This Privacy Policy outlines how we collect, use, protect, and disclose your information when you use our website and services.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="font-semibold text-lg mb-2">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, business details, and other contact information provided by you.
              </li>
              <li>
                <strong>Usage Data:</strong> Information on how you interact with our website and services, including IP addresses, browser types, pages visited, and other analytics.
              </li>
              <li>
                <strong>Payment Information:</strong> When you make a purchase, we may collect payment details through secure third-party payment gateways.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide and manage our services</li>
              <li>Communicate with you regarding your projects, inquiries, or support requests</li>
              <li>Improve and personalize your experience on our website</li>
              <li>Process transactions securely</li>
              <li>Send marketing or promotional materials (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">3. Data Sharing & Disclosure</h2>
            <p className="mb-2">
              We do not sell or rent your personal data. We may share your information:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>With trusted service providers for payment processing, hosting, and analytics</li>
              <li>When required by law or to protect our rights</li>
              <li>With your consent or as part of a business transfer (e.g., merger or acquisition)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">4. Data Security</h2>
            <p className="">
              We implement industry-standard measures to safeguard your personal data. However, no method of transmission or storage is 100% secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">5. Your Rights</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request details about how your data is used</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">6. Third-Party Links</h2>
            <p className="">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those sites.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">7. Changes to This Policy</h2>
            <p className="">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
