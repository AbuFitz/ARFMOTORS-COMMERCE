import { COMPANY } from "@/lib/site-config";
export default function ReturnsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-display text-5xl font-bold mb-4">Returns & Refunds Policy</h1>
          <p className="text-lg text-neutral-300">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">1. Your Consumer Rights</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              ARF Motors is committed to complying with UK consumer protection law, including the Consumer Rights Act 2015 and the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              This policy outlines your rights to return products and request refunds.
            </p>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">Quick Summary</h3>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span><strong>14-day cooling-off period</strong> for online purchases (exclusions apply)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span><strong>30-day right to reject</strong> faulty goods for full refund</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span><strong>Up to 6 years</strong> to claim for goods not as described or faulty (England/Wales)</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">2. 14-Day Cooling-Off Period (Change of Mind)</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              2.1. Under the Consumer Contracts Regulations, you have the right to cancel your order within <strong>14 calendar days</strong> of receiving the product, without giving a reason.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              2.2. To exercise this right, you must inform us of your decision to cancel by email to{" "}
              <a href="mailto:info@arfmotors.co.uk" className="text-primary-500 hover:underline">
                info@arfmotors.co.uk
              </a>
              , including your order number.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              2.3. You then have <strong>14 days</strong> to return the product to us.
            </p>

            <h3 className="font-semibold text-lg text-neutral-900 mt-6 mb-3">Conditions for Returns:</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Products must be unused, in original packaging, and in resalable condition</li>
              <li>All accessories, manuals, and documentation must be included</li>
              <li>Products must not be damaged, marked, or show signs of installation</li>
              <li>You are responsible for return shipping costs (unless the product is faulty)</li>
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> You may inspect the product to verify it matches the description, but not test or use it. Any diminished value due to handling beyond what is necessary will be deducted from your refund.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">3. Exclusions from 14-Day Returns</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              The following items <strong>cannot</strong> be returned under the 14-day cooling-off period:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>
                <strong>Custom-made or personalized products:</strong> Items specifically made to your specifications (e.g., custom-coded parts)
              </li>
              <li>
                <strong>Installed products:</strong> Products that have been fitted to your vehicle
              </li>
              <li>
                <strong>Sealed products opened for hygiene reasons:</strong> E.g., cabin air filters, if packaging is opened
              </li>
              <li>
                <strong>Products mixed with other items:</strong> E.g., fluids or consumables that cannot be separated
              </li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-3">
              <strong>Note:</strong> These exclusions do not affect your rights if the product is faulty or not as described.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">4. Faulty or Incorrect Products</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              If a product is faulty, not as described, or does not match the compatibility information provided, you have additional rights under the Consumer Rights Act 2015:
            </p>

            <h3 className="font-semibold text-lg text-neutral-900 mt-4 mb-2">Within 30 Days of Receipt:</h3>
            <p className="text-neutral-700 leading-relaxed mb-3">
              You have the right to <strong>reject the product and receive a full refund</strong>, including delivery costs.
            </p>

            <h3 className="font-semibold text-lg text-neutral-900 mt-4 mb-2">After 30 Days:</h3>
            <p className="text-neutral-700 leading-relaxed mb-3">
              You are entitled to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4 mb-3">
              <li>One opportunity for us to <strong>repair</strong> the product</li>
              <li>One opportunity for us to <strong>replace</strong> the product</li>
              <li>If repair/replacement is not possible or fails, you can claim a <strong>price reduction or refund</strong></li>
            </ul>

            <p className="text-neutral-700 leading-relaxed mb-3">
              4.1. Contact us immediately at{" "}
              <a href="mailto:info@arfmotors.co.uk" className="text-primary-500 hover:underline">
                info@arfmotors.co.uk
              </a>{" "}
              if you receive a faulty or incorrect product.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              4.2. We will arrange collection or provide a prepaid returns label at no cost to you.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              4.3. Refunds for faulty products include the cost of standard delivery.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">5. Compatibility Issues</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              5.1. We provide BMW model compatibility information for all products. You must verify compatibility with your specific vehicle before ordering.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              5.2. If we provide <strong>incorrect compatibility information</strong> and the product does not fit your vehicle as a result, this is treated as a faulty product, and you are entitled to a full refund.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              5.3. If you order a product that is <strong>incompatible with your vehicle</strong> due to incorrect information provided by you or failure to verify compatibility, returns are subject to the standard 14-day policy (conditions apply).
            </p>
            <p className="text-neutral-700 leading-relaxed">
              5.4. We recommend contacting us before ordering if you are unsure about fitment.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">6. How to Return a Product</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              To return a product, follow these steps:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-neutral-700 ml-4">
              <li>
                <strong>Contact us:</strong> Email{" "}
                <a href="mailto:info@arfmotors.co.uk" className="text-primary-500 hover:underline">
                  info@arfmotors.co.uk
                </a>{" "}
                with your order number and reason for return
              </li>
              <li>
                <strong>Receive authorization:</strong> We will provide a Return Merchandise Authorization (RMA) number
              </li>
              <li>
                <strong>Package the product:</strong> Use original packaging if possible. Include all accessories and documentation
              </li>
              <li>
                <strong>Label the package:</strong> Clearly mark the RMA number on the outside
              </li>
              <li>
                <strong>Ship the product:</strong>
                <ul className="list-disc list-inside mt-2 ml-6 space-y-1">
                  <li><strong>Faulty products:</strong> We will arrange collection or provide a prepaid label</li>
                  <li><strong>14-day returns:</strong> You are responsible for return postage</li>
                </ul>
              </li>
              <li>
                <strong>Proof of postage:</strong> Keep your tracking number or postal receipt
              </li>
            </ol>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> Products returned without an RMA number may be refused or delayed. We are not responsible for items lost in transit without tracking.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">7. Refund Processing</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              7.1. Once we receive your returned product, we will inspect it and notify you of the approval or rejection of your refund.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              7.2. If approved, refunds will be processed within <strong>14 days</strong> of receiving the returned product.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              7.3. Refunds will be issued to the original payment method used for purchase.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              7.4. For 14-day returns, <strong>delivery costs are not refunded</strong> unless the product was faulty or we made an error.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              7.5. Deductions may apply if the product is not in resalable condition due to excessive handling.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">8. Exchanges</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              8.1. We do not offer direct exchanges. If you wish to exchange a product for a different item:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-neutral-700 ml-4">
              <li>Return the original product following our returns process</li>
              <li>Place a new order for the desired item</li>
            </ol>
            <p className="text-neutral-700 leading-relaxed mt-3">
              8.2. If the original product was faulty or incorrect, we will refund your delivery costs and prioritize shipping the replacement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">9. Fitting Refunds (FixNow Mechanics)</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              9.1. If you cancel a booked fitting appointment with <strong>48 hours or more notice</strong>, you will receive a full refund.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              9.2. Cancellations with <strong>less than 48 hours notice</strong> may incur a 50% cancellation fee.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              9.3. If fitting cannot be completed due to issues with your vehicle (not product fault), the service fee is non-refundable, but a partial credit may be offered.
            </p>
            <p className="text-neutral-700 leading-relaxed mt-3">
              9.4. Returns for products bought on our eBay store are handled through eBay&apos;s returns process and eBay Money Back Guarantee.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">10. Imported Products</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              10.1. Products imported from overseas suppliers may take longer to process returns due to shipping times.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              10.2. Your statutory rights remain the same, but allow additional time for inspection and refund processing (up to 30 days).
            </p>
            <p className="text-neutral-700 leading-relaxed">
              10.3. For faulty imported products, we may offer a partial refund or credit as an alternative to avoid long return shipping times (at your discretion).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">11. Manufacturer Warranty Claims</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              11.1. Products are covered by manufacturer warranty (typically 12-24 months).
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              11.2. For warranty claims <strong>beyond 30 days from purchase</strong>, you may need to deal directly with the manufacturer.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              11.3. We will assist with warranty claims where possible by providing proof of purchase and liaising with suppliers.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              11.4. Warranty does not cover damage caused by incorrect installation, misuse, or modifications.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">12. Damaged in Transit</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              12.1. Inspect your package immediately upon delivery.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              12.2. If the packaging is damaged, note this with the courier and take photos before signing.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              12.3. Report transit damage within <strong>48 hours</strong> to{" "}
              <a href="mailto:info@arfmotors.co.uk" className="text-primary-500 hover:underline">
                info@arfmotors.co.uk
              </a>{" "}
              with photos.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              12.4. We will arrange a replacement or full refund, including delivery costs.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">13. Restocking Fees</h2>
            <p className="text-neutral-700 leading-relaxed">
              We <strong>do not charge</strong> restocking fees for standard returns, provided products are returned in resalable condition. However, we reserve the right to deduct costs for products returned damaged or incomplete.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">14. Contact Us</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              For all returns and refund queries, contact us:
            </p>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <p className="font-semibold text-neutral-900 mb-2">ARF Motors Returns Department</p>
              <p className="text-neutral-700">{COMPANY.legalName} (company no. {COMPANY.companyNumber})</p>
              {COMPANY.registeredOffice && <p className="text-neutral-700">{COMPANY.registeredOffice}</p>}
              <p className="text-neutral-700">
                Email:{" "}
                <a href="mailto:info@arfmotors.co.uk" className="text-primary-500 hover:underline">
                  info@arfmotors.co.uk
                </a>
              </p>
              <p className="text-sm text-neutral-600 mt-2">
                Please include your order number in all correspondence
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 text-white rounded-lg p-6">
            <h3 className="font-display text-xl font-bold mb-3">Your Statutory Rights</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              This Returns & Refunds Policy does not affect your statutory rights under UK consumer law. If you believe your rights have not been honored, you may seek advice from Citizens Advice or contact Trading Standards. You also have the right to use Alternative Dispute Resolution (ADR) services or take legal action.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
