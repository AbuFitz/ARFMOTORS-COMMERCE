import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/policy-page";
import { COMPANY, SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & conditions"
      current="/terms"
      intro={
        <p>
          These terms apply to orders placed on this website. The website is operated by {COMPANY.legalName}, a company
          registered in {COMPANY.registeredIn} (company number {COMPANY.companyNumber})
          {COMPANY.registeredOffice ? `, registered office ${COMPANY.registeredOffice}` : ""}. In these terms, &quot;we&quot;,
          &quot;us&quot; and &quot;ARF Commerce&quot; mean {COMPANY.legalName}.
        </p>
      }
    >
      <section>
        <h2>1. Ordering</h2>
        <p>
          When you place an order you are offering to buy the products in your cart. We&apos;ll email you to confirm we
          have received it. The contract between us is formed when we dispatch your order. If we can&apos;t accept your
          order — for example because an item is out of stock or a price was shown incorrectly — we&apos;ll tell you and
          refund any payment in full.
        </p>
      </section>

      <section>
        <h2>2. Prices and payment</h2>
        <p>
          Prices are shown in pounds sterling. Payment is taken at checkout by our payment provider, Stripe. We never
          see or store your full card details. Discount codes are subject to the conditions shown with them, including
          any minimum order value, and cannot be exchanged for cash.
        </p>
      </section>

      <section>
        <h2>3. Product information</h2>
        <p>
          We aim to describe every product accurately, including what it works with. Images are for illustration and
          packaging may differ. Where a product lists compatibility information, please check it against your own
          vehicle or device before ordering, and contact us if you&apos;re unsure.
        </p>
      </section>

      <section>
        <h2>4. Delivery</h2>
        <ul>
          <li>We currently deliver to UK addresses only.</li>
          <li>Estimated delivery times are shown on each product page and are estimates, not guarantees.</li>
          <li>Items that ship from our supplier take longer to arrive; this is shown before you buy.</li>
          <li>Risk in the products passes to you on delivery.</li>
        </ul>
      </section>

      <section>
        <h2>5. Returns and faulty items</h2>
        <p>
          You can cancel and return most items within 14 days of delivery, and you have legal rights if something is
          faulty. See our <Link href="/returns">returns policy</Link> and <Link href="/warranty">warranty information</Link>.
        </p>
      </section>

      <section>
        <h2>6. Professional fitting</h2>
        <ul>
          <li>
            Fitting is an optional service available only on products marked as eligible, and only within the coverage
            area ({SITE_CONFIG.fitting.coverage}).
          </li>
          <li>
            Fitting is carried out by our fitting partner, FixNow Mechanics, who will contact you to confirm the price
            and book a time. Any &quot;fitting from&quot; price shown is a guide.
          </li>
          <li>Fitting is priced and paid for separately from your ARF Commerce order.</li>
          <li>
            The fitting work is provided by FixNow Mechanics under their own terms. Our responsibility is for the
            products we sell you.
          </li>
          <li>We do not provide vehicle servicing, repairs or diagnostics.</li>
        </ul>
      </section>

      <section>
        <h2>7. Marketplace orders</h2>
        <p>
          Some products are also sold through our eBay store. Orders placed on eBay are also subject to eBay&apos;s own
          terms and policies.
        </p>
      </section>

      <section>
        <h2>8. Our liability</h2>
        <p>
          We are responsible for loss or damage you suffer that is a foreseeable result of us breaking these terms or
          failing to use reasonable care. We are not responsible for loss that is not foreseeable, or for business
          losses. Nothing in these terms limits our liability for death or personal injury caused by our negligence,
          for fraud, or for anything else that cannot be limited by law, and nothing affects your statutory rights.
        </p>
      </section>

      <section>
        <h2>9. General</h2>
        <p>
          We may update these terms from time to time; the version in force when you place your order applies. These
          terms are governed by the law of England and Wales. If you live in Scotland or Northern Ireland you may also
          bring proceedings in your local courts.
        </p>
      </section>
    </PolicyPage>
  );
}
