import { COMPANY } from "@/lib/site-config";
export default function WarrantyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-display text-5xl font-bold mb-4">Warranty Information</h1>
          <p className="text-lg text-neutral-300">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">1. Overview</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              All products sold by ARF Motors come with warranty protection. This page explains the types of warranties available, what they cover, and how to make a claim.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Your warranty rights are <strong>in addition to</strong> your statutory rights under UK consumer law.
            </p>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">Warranty at a Glance</h3>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span><strong>Manufacturer Warranty:</strong> 12-24 months on most products</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span><strong>Fitting Warranty:</strong> 12 months on FixNow Mechanics labour</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span><strong>Consumer Rights Act:</strong> Up to 6 years for faulty goods (England/Wales)</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">2. Manufacturer Warranty</h2>
            <h3 className="font-semibold text-lg text-neutral-900 mb-3">Coverage Period</h3>
            <p className="text-neutral-700 leading-relaxed mb-3">
              Unless otherwise stated, products are covered by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4 mb-4">
              <li><strong>Standard parts:</strong> 12 months from date of purchase</li>
              <li><strong>Premium/performance parts:</strong> 24 months from date of purchase</li>
              <li><strong>Electronic components:</strong> 12 months manufacturer warranty</li>
              <li><strong>Carbon fiber parts:</strong> 24 months against manufacturing defects</li>
            </ul>

            <h3 className="font-semibold text-lg text-neutral-900 mb-3 mt-6">What's Covered</h3>
            <p className="text-neutral-700 leading-relaxed mb-3">
              Manufacturer warranties cover:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Manufacturing defects in materials or workmanship</li>
              <li>Premature failure under normal use</li>
              <li>Parts that do not perform as described</li>
              <li>Finish defects (peeling, cracking, fading) on coated parts</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">3. What's NOT Covered</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              Warranties do <strong>not</strong> cover:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li><strong>Normal wear and tear:</strong> Brake pads, wiper blades, consumables</li>
              <li><strong>Incorrect installation:</strong> Damage caused during fitting (unless installed by FixNow Mechanics)</li>
              <li><strong>Misuse or abuse:</strong> Racing, off-road use (unless part is designed for it), overloading</li>
              <li><strong>Modifications:</strong> Alterations to the product after purchase</li>
              <li><strong>Lack of maintenance:</strong> Failure to maintain the product as per instructions</li>
              <li><strong>Environmental damage:</strong> Stone chips, road debris, corrosion from road salt (unless defect in coating)</li>
              <li><strong>Accidents or impacts:</strong> Collision damage, curb strikes</li>
              <li><strong>Incompatibility:</strong> Using parts with incompatible vehicles or software versions</li>
              <li><strong>Cosmetic issues:</strong> Minor variations in color, texture (if not affecting function)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">4. Fitting Warranty (FixNow Mechanics)</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              If your parts are fitted by FixNow Mechanics, you receive:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4 mb-4">
              <li><strong>12-month labor warranty</strong> on workmanship</li>
              <li>Coverage for installation-related issues (e.g., leaks, loose fittings, wiring faults)</li>
              <li>Free re-installation if a part fails under manufacturer warranty</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mb-3">
              The installation warranty does <strong>not</strong> cover:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Product failure (covered by manufacturer warranty)</li>
              <li>Damage caused by you or third parties after installation</li>
              <li>Issues arising from vehicle faults unrelated to installation</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">5. Extended Warranty Options</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              For high-value products, we may offer optional extended warranty coverage:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Extended to 36 or 48 months</li>
              <li>Available at checkout for eligible products</li>
              <li>Covers all manufacturer warranty terms plus accidental damage (conditions apply)</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-3">
              Contact us for details on extended warranty plans.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">6. How to Make a Warranty Claim</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              To make a warranty claim, follow these steps:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-neutral-700 ml-4">
              <li>
                <strong>Contact us:</strong> Email{" "}
                <a href="mailto:info@arfmotors.co.uk" className="text-primary-500 hover:underline">
                  info@arfmotors.co.uk
                </a>{" "}
                with:
                <ul className="list-disc list-inside mt-2 ml-6 space-y-1">
                  <li>Order number</li>
                  <li>Product name and SKU</li>
                  <li>Description of the fault</li>
                  <li>Photos/videos showing the issue</li>
                  <li>Installation details (self-installed or FixNow Mechanics)</li>
                </ul>
              </li>
              <li>
                <strong>Assessment:</strong> We will review your claim and may request additional information
              </li>
              <li>
                <strong>Resolution options:</strong>
                <ul className="list-disc list-inside mt-2 ml-6 space-y-1">
                  <li><strong>Repair:</strong> Return product for repair (where possible)</li>
                  <li><strong>Replacement:</strong> We'll send a new product</li>
                  <li><strong>Refund:</strong> If repair/replacement is not viable</li>
                </ul>
              </li>
              <li>
                <strong>Return shipping:</strong> We will provide a prepaid returns label for warranty claims
              </li>
              <li>
                <strong>Processing time:</strong> Most claims resolved within 14 days of receiving the product
              </li>
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">7. Proof of Purchase</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              To make a warranty claim, you must provide proof of purchase:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Original order confirmation email</li>
              <li>Invoice or receipt</li>
              <li>Order number from your account</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-3">
              We recommend keeping all purchase documentation for at least 2 years.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">8. Consumer Rights Act Protection</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              Under the Consumer Rights Act 2015, you have additional rights beyond manufacturer warranty:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li><strong>Up to 6 years</strong> to claim for goods that were faulty at the time of purchase (England/Wales)</li>
              <li><strong>Up to 5 years</strong> in Scotland</li>
              <li>Within the first <strong>6 months</strong>, it's assumed the fault was present at purchase (unless proven otherwise)</li>
              <li>After 6 months, you may need to provide evidence the fault was present at purchase</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-3">
              These rights apply even if the manufacturer warranty has expired.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">9. Goodwill Considerations</h2>
            <p className="text-neutral-700 leading-relaxed">
              Even if a product is outside warranty or damage is not covered, we may offer goodwill assistance on a case-by-case basis. This could include discounted replacements, partial refunds, or repair services. Contact us to discuss your situation.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">10. Warranty Transferability</h2>
            <p className="text-neutral-700 leading-relaxed">
              Manufacturer warranties are <strong>non-transferable</strong>. If you sell your vehicle with ARF Motors parts installed, the warranty does not transfer to the new owner. Installation warranty by FixNow Mechanics also does not transfer.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">11. Limitations</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              11.1. Warranties cover the cost of repair or replacement of defective products only.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-3">
              11.2. We are <strong>not liable</strong> for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Consequential losses (e.g., loss of vehicle use, towing costs, alternative transport)</li>
              <li>Labor costs for removal/installation of warranty parts (unless FixNow Mechanics installed)</li>
              <li>Damage to your vehicle caused by a defective part (unless caused by our negligence)</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-3">
              11.3. Nothing in this warranty excludes our liability for death or personal injury caused by negligence or fraudulent misrepresentation.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">12. Contact Us</h2>
            <p className="text-neutral-700 leading-relaxed mb-3">
              For warranty claims or questions, contact us:
            </p>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <p className="font-semibold text-neutral-900 mb-2">ARF Motors Warranty Department</p>
              <p className="text-neutral-700">{COMPANY.legalName} (company no. {COMPANY.companyNumber})</p>
              {COMPANY.registeredOffice && <p className="text-neutral-700">{COMPANY.registeredOffice}</p>}
              <p className="text-neutral-700">
                Email:{" "}
                <a href="mailto:info@arfmotors.co.uk" className="text-primary-500 hover:underline">
                  info@arfmotors.co.uk
                </a>
              </p>
              <p className="text-sm text-neutral-600 mt-2">
                Please include your order number and photos of the issue
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 text-white rounded-lg p-6">
            <h3 className="font-display text-xl font-bold mb-3">Your Rights Are Protected</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              This warranty information is provided in addition to your statutory rights under UK consumer law. For independent advice on consumer rights, contact Citizens Advice or visit{" "}
              <a href="https://www.which.co.uk" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">
                Which?
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
