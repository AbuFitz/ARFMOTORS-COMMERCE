export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-display text-5xl font-bold mb-4">Terms & Conditions</h1>
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
              These Terms and Conditions ("Terms") govern your use of the ARFMODS Automotive website (arfmods.co.uk) and the purchase of products and services from us.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              ARFMODS Automotive is a trading division of ARF Automotive Group, operating in the United Kingdom. By placing an order or using our services, you agree to be bound by these Terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">2. Definitions</h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li><strong>"We", "Our", "Us":</strong> ARFMODS Automotive, part of ARF Automotive Group</li>
              <li><strong>"You", "Customer":</strong> The person or entity placing an order</li>
              <li><strong>"Products":</strong> BMW automotive parts, accessories, and upgrades</li>
              <li><strong>"Services":</strong> Fitting of eligible products via FixNow Mechanics</li>
              <li><strong>"Website":</strong> arfmods.co.uk</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">3. Orders and Acceptance</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              3.1. When you place an order through our website, you are making an offer to purchase products/services.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              3.2. We will send you an order confirmation email acknowledging receipt of your order. This does not constitute acceptance.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              3.3. A contract is formed when we dispatch the products or confirm the service booking.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              3.4. We reserve the right to refuse any order at our discretion (e.g., due to stock unavailability, pricing errors, or suspected fraud).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">4. Pricing and Payment</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              4.1. All prices are in British Pounds Sterling (GBP) and include VAT at the applicable rate.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              4.2. Delivery charges are additional and displayed at checkout.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              4.3. We reserve the right to change prices at any time. Your order will be charged at the price displayed at the time of purchase.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              4.4. If a pricing error occurs, we will contact you before processing the order.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              4.5. Payment is processed securely via Stripe. We do not store your card details.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">5. Product Descriptions and Compatibility</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              5.1. We strive to ensure product descriptions and images are accurate. However, we do not guarantee that descriptions are error-free or that images precisely represent the product.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              5.2. BMW model compatibility information is provided as a guide. You are responsible for verifying that products fit your specific vehicle before purchasing.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              5.3. If you are unsure about compatibility, contact us before ordering.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">6. Delivery</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              6.1. <strong>UK Stock Items:</strong> Dispatched within 1 working day. Delivery typically 1-3 working days.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              6.2. <strong>Imported Items:</strong> Delivery typically 10-14 working days from order confirmation.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              6.3. Delivery estimates are not guaranteed. We are not liable for delays caused by couriers or customs.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              6.4. Risk passes to you upon delivery. Ensure someone is available to sign for the package.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              6.5. If a delivery fails due to incorrect address information provided by you, re-delivery charges may apply.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">7. Fitting Services (FixNow Mechanics)</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              7.1. Fitting is available for eligible products (marked on the product page) via FixNow Mechanics in London and surrounding areas (up to Peterborough).
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              7.2. You must provide a valid postcode to check availability before booking.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              7.3. Fitting is priced and paid separately from your parts order. Any guide price shown is confirmed before work is booked.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              7.4. You must provide access to your vehicle and a safe working environment.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              7.5. Fitting services are subject to separate terms provided by FixNow Mechanics.
            </p>
            <p className="text-neutral-700 leading-relaxed mt-3">
              7.6. Products bought through our eBay store are sold under eBay&apos;s terms and policies. FixNow fitting can still be arranged by contacting us.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">8. Consumer Rights (UK)</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              8.1. Under the Consumer Rights Act 2015, goods must be:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4 mb-3">
              <li>Of satisfactory quality</li>
              <li>Fit for purpose</li>
              <li>As described</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mb-3">
              8.2. If goods are faulty, you may be entitled to a repair, replacement, or refund. See our Returns & Refunds Policy for details.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              8.3. You have a 14-day cooling-off period to cancel your order (subject to exclusions). See Returns Policy.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">9. Warranty</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              9.1. Products are covered by the manufacturer's warranty (typically 12-24 months).
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              9.2. Warranty claims must be made in accordance with the manufacturer's terms.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              9.3. Warranty does not cover damage caused by improper installation, misuse, or modifications.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              10.1. We are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4 mb-3">
              <li>Incorrect fitment due to inaccurate vehicle information provided by you</li>
              <li>Damage caused during self-installation</li>
              <li>Consequential losses (e.g., loss of use, towing costs)</li>
              <li>Delays in delivery caused by third parties</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mb-3">
              10.2. Our total liability for any claim shall not exceed the amount you paid for the product or service.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              10.3. Nothing in these Terms excludes liability for death/personal injury caused by negligence or fraudulent misrepresentation.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">11. Intellectual Property</h2>
            <p className="text-neutral-700 leading-relaxed">
              All content on this website (including text, images, logos, and design) is owned by ARF Automotive Group. You may not reproduce, distribute, or use our content without permission.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">12. Force Majeure</h2>
            <p className="text-neutral-700 leading-relaxed">
              We are not liable for delays or failures caused by events beyond our reasonable control (e.g., natural disasters, strikes, pandemics, supplier issues).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">13. Governing Law</h2>
            <p className="text-neutral-700 leading-relaxed">
              These Terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">14. Changes to Terms</h2>
            <p className="text-neutral-700 leading-relaxed">
              We may update these Terms from time to time. Changes will be posted on this page with an updated date. Continued use of our services constitutes acceptance of the updated Terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">15. Contact Us</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              If you have questions about these Terms, contact us:
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
        </div>
      </section>
    </div>
  );
}
