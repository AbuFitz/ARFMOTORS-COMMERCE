import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/policy-page";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = { title: "Returns & Refunds" };

export default function ReturnsPage() {
  return (
    <PolicyPage
      title="Returns & refunds"
      current="/returns"
      intro={
        <p>
          We want you to be happy with what you buy. This policy explains how to return an item and how refunds work.
          It doesn&apos;t affect your statutory rights under UK consumer law, including the Consumer Rights Act 2015
          and the Consumer Contracts Regulations 2013.
        </p>
      }
    >
      <section>
        <h2>1. Changed your mind? 14 days to return</h2>
        <p>
          You can cancel your order and return most items within 14 days of the day you receive them, for any
          reason. To be accepted, items must be:
        </p>
        <ul>
          <li>unused, and not installed or fitted;</li>
          <li>in their original packaging, with all parts, accessories and paperwork;</li>
          <li>in the condition you received them.</li>
        </ul>
        <p>
          If an item has been used more than you&apos;d need to check it in a shop, we may reduce your refund to reflect
          that.
        </p>
      </section>

      <section>
        <h2>2. Items we can&apos;t accept back</h2>
        <p>Unless they are faulty, we can&apos;t accept change-of-mind returns for:</p>
        <ul>
          <li>products that have been installed or fitted;</li>
          <li>sealed items that aren&apos;t suitable for return for hygiene or health reasons once unsealed;</li>
          <li>items made or personalised to your specification.</li>
        </ul>
      </section>

      <section>
        <h2>3. How to return an item</h2>
        <ul>
          <li>
            Email <a href={`mailto:${SITE_CONFIG.emails.support}`}>{SITE_CONFIG.emails.support}</a> with your order number
            and the item(s) you want to return.
          </li>
          <li>We&apos;ll reply with the returns address and any instructions.</li>
          <li>Pack the item securely and send it using a tracked service. Keep your proof of postage.</li>
        </ul>
        <p>For change-of-mind returns, you pay the return postage. If an item is faulty or we sent the wrong item, we cover it.</p>
      </section>

      <section>
        <h2>4. Refunds</h2>
        <p>
          Once we&apos;ve received and checked your return we&apos;ll refund you to your original payment method, within 14
          days. For a full-order cancellation we also refund the standard delivery cost you paid. Your bank may take a
          few extra days to show the refund.
        </p>
      </section>

      <section>
        <h2>5. Faulty, damaged or incorrect items</h2>
        <p>
          If something arrives damaged, is faulty, or isn&apos;t what you ordered, contact us with your order number and
          photos. Please let us know about visible delivery damage within 48 hours so we can raise it with the courier.
        </p>
        <ul>
          <li>Within 30 days of delivery you&apos;re entitled to a full refund for a faulty item.</li>
          <li>After 30 days we&apos;ll offer a repair or replacement first, and a refund if that isn&apos;t possible.</li>
        </ul>
        <p>See our <Link href="/warranty">warranty information</Link> for more detail.</p>
      </section>

      <section>
        <h2>6. Professional fitting</h2>
        <p>
          Fitting is booked and carried out by FixNow Mechanics and paid for separately, so cancellations and refunds for
          fitting appointments are handled by them. A product that has been fitted can still be returned if it is
          faulty.
        </p>
      </section>

      <section>
        <h2>7. eBay orders</h2>
        <p>Items bought through our eBay store are returned through eBay&apos;s returns process.</p>
      </section>
    </PolicyPage>
  );
}
