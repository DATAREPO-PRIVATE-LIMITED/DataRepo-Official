import React from "react";

const Terms = () => {
  return (
    <div className="bg-background text-foreground min-h-screen py-12 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Terms & Conditions
        </h1>
        <p className="mb-8">Effective Date: August 2025</p>

        <p className="mb-6 ">
          Welcome to <span className="text-primary">DataRepo</span>! By
          accessing and using our website and services, you agree to comply with
          and be bound by the following Terms & Conditions. Please read them
          carefully.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="font-semibold text-lg mb-2">1. Acceptance of Terms</h2>
            <p className="">
              By accessing our website or using any of our services, you agree
              to be bound by these Terms & Conditions and any applicable laws
              and regulations.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">2. Services Offered</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Web Development:</strong> HTML websites, WordPress
                development, e-commerce, portfolio websites, Amazon store setup,
                website management
              </li>
              <li>
                <strong>SaaS Development:</strong> Micro SaaS, SaaS management
              </li>
              <li>
                <strong>Content Writing:</strong> SEO articles, web content, blogs
              </li>
              <li>
                <strong>Market Research:</strong> Industry insights, competitor
                analysis
              </li>
              <li>Free logo design with select services</li>
            </ul>
            <p className="mt-2">
              We reserve the right to modify or discontinue any service at any
              time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">3. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide accurate and complete information when using our services.</li>
              <li>Not to misuse our website or services in any unlawful or fraudulent manner.</li>
              <li>To respect the intellectual property rights of DataRepo and third parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">4. Payments & Refunds</h2>
            <p className="">
              Payments for our services are to be made upfront or as per the
              terms outlined in your project proposal. Refunds are handled on a
              case-by-case basis, and DataRepo reserves the right to deny
              refunds for completed services.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">5. Intellectual Property</h2>
            <p className="">
              All content, logos, designs, and materials provided by DataRepo
              are the property of DataRepo unless otherwise stated. You may not
              reproduce, distribute, or modify them without our written consent.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">6. Limitation of Liability</h2>
            <p className="">
              DataRepo shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our services or
              website. We provide our services “as is” without warranties of any
              kind.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">7. Termination</h2>
            <p className="">
              We reserve the right to terminate your access to our services if
              you breach these terms or engage in unlawful or harmful activities.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">8. Governing Law</h2>
            <p className="">
              These Terms & Conditions shall be governed by and construed in
              accordance with the laws of India. Any disputes arising from these
              terms will be subject to the exclusive jurisdiction of the courts
              in Noida, Uttar Pradesh.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">9. Changes to Terms</h2>
            <p className="">
              We reserve the right to update or change these Terms & Conditions
              at any time. The latest version will always be available on our
              website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
