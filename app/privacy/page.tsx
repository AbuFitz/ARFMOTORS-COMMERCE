export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-display text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-neutral-300">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">1. Introduction</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              ARFMODS Automotive ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website arfmods.co.uk or make a purchase from us.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              We are part of ARF Automotive Group and operate in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">2. Information We Collect</h2>
            <h3 className="font-semibold text-lg text-neutral-900 mb-2">Personal Data</h3>
            <p className="text-neutral-700 leading-relaxed mb-3">
              When you place an order or contact us, we may collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4 mb-4">
              <li>Name and contact details (email address, postal address, postcode)</li>
              <li>Vehicle information (BMW model, registration or VIN to confirm part compatibility)</li>
              <li>Payment information (processed securely via Stripe - we do not store card details)</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>

            <h3 className="font-semibold text-lg text-neutral-900 mb-2">Automatically Collected Data</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Browser type and version</li>
              <li>IP address and location data</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website addresses</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Processing and fulfilling your orders</li>
              <li>Arranging fitting of eligible parts via FixNow Mechanics</li>
              <li>Communicating order updates and delivery information</li>
              <li>Responding to customer enquiries</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
              <li>Fraud prevention and security</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">4. Legal Basis for Processing</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              Under UK GDPR, we process your data based on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li><strong>Contract Performance:</strong> Processing orders and providing services</li>
              <li><strong>Legitimate Interests:</strong> Improving our services, fraud prevention</li>
              <li><strong>Legal Obligation:</strong> Tax records, warranty claims</li>
              <li><strong>Consent:</strong> Marketing communications (where applicable, with opt-in)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">5. Data Sharing and Third Parties</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li><strong>FixNow Mechanics:</strong> Our fitting division, when you request fitting</li>
              <li><strong>Payment Processors:</strong> Stripe (for secure payment processing)</li>
              <li><strong>Email Providers:</strong> Resend (order emails) and Mailchimp (newsletter, if you sign up)</li>
              <li><strong>Delivery Partners:</strong> DPD, Royal Mail, or other courier services</li>
              <li><strong>Suppliers:</strong> For order fulfillment (limited to necessary information)</li>
              <li><strong>Legal Authorities:</strong> If required by law or to protect our rights</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-3">
              We do not sell your personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">6. Data Retention</h2>
            <p className="text-neutral-700 leading-relaxed">
              We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, typically:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4 mt-3">
              <li>Order data: 7 years (for tax and warranty purposes)</li>
              <li>Enquiry data: 2 years from last contact</li>
              <li>Website analytics: 26 months</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">7. Your Rights</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              Under UK GDPR, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> For marketing communications</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-3">
              To exercise these rights, contact us at{" "}
              <a href="mailto:info@arfmods.co.uk" className="text-primary-500 hover:underline">
                info@arfmods.co.uk
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">8. Cookies</h2>
            <p className="text-neutral-700 leading-relaxed">
              We use essential cookies to enable shopping cart functionality. We do not use marketing or tracking cookies without your explicit consent. For more details, see our Cookie Policy.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">9. Security</h2>
            <p className="text-neutral-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data. All payment transactions are processed securely via Stripe using industry-standard encryption (TLS/SSL). However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">10. International Transfers</h2>
            <p className="text-neutral-700 leading-relaxed">
              Your data is primarily stored within the UK. Where we use third-party services (e.g., Stripe), data may be transferred outside the UK to countries with adequate data protection standards or under appropriate safeguards.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">11. Children's Privacy</h2>
            <p className="text-neutral-700 leading-relaxed">
              Our services are not directed at individuals under 18. We do not knowingly collect personal data from children.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">12. Changes to This Policy</h2>
            <p className="text-neutral-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">13. Contact Us</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              If you have questions about this Privacy Policy or wish to exercise your data rights, contact us:
            </p>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <p className="font-semibold text-neutral-900 mb-2">ARFMODS Automotive</p>
              <p className="text-neutral-700">Part of ARF Automotive Group</p>
              <p className="text-neutral-700">
                Email:{" "}
                <a href="mailto:info@arfmods.co.uk" className="text-primary-500 hover:underline">
                  info@arfmods.co.uk
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">14. Complaints</h2>
            <p className="text-neutral-700 leading-relaxed">
              If you believe we have not handled your data correctly, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):
            </p>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mt-3">
              <p className="font-semibold text-neutral-900 mb-2">Information Commissioner's Office</p>
              <p className="text-neutral-700">Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF</p>
              <p className="text-neutral-700">Tel: 0303 123 1113</p>
              <p className="text-neutral-700">
                Website:{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                  ico.org.uk
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
