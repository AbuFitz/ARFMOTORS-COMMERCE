import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/policy-page";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = { title: "Warranty" };

export default function WarrantyPage() {
  return (
    <PolicyPage
      title="Warranty"
      current="/warranty"
      intro={
        <p>
          Everything we sell is covered by your rights under UK consumer law. Some products also come with a
          manufacturer&apos;s warranty, which is shown on the product page or packaging where it applies.
        </p>
      }
    >
      <section>
        <h2>1. Your legal rights</h2>
        <p>Under the Consumer Rights Act 2015, products must be of satisfactory quality, fit for purpose and as described. If they aren&apos;t:</p>
        <ul>
          <li>within 30 days of delivery, you can ask for a full refund;</li>
          <li>within 6 months, we&apos;ll repair or replace the item, and if that isn&apos;t possible, refund you;</li>
          <li>after 6 months you&apos;re still protected, but you may need to show the fault was there when you received it.</li>
        </ul>
      </section>

      <section>
        <h2>2. Manufacturer warranties</h2>
        <p>
          Where a product comes with a manufacturer&apos;s warranty, its length and terms are set by the manufacturer. A
          manufacturer&apos;s warranty is in addition to your legal rights, not instead of them.
        </p>
      </section>

      <section>
        <h2>3. What isn&apos;t covered</h2>
        <ul>
          <li>normal wear and tear;</li>
          <li>accidental damage, misuse, or use not in line with the instructions;</li>
          <li>damage caused by incorrect installation (other than fitting carried out by FixNow Mechanics, covered below);</li>
          <li>items that have been modified or repaired by someone else.</li>
        </ul>
      </section>

      <section>
        <h2>4. Products fitted by FixNow Mechanics</h2>
        <p>
          If you chose professional fitting, the installation work is carried out and guaranteed by FixNow Mechanics
          under their own terms. If you think a problem is caused by the fitting rather than the product, contact us
          and we&apos;ll help put you in touch.
        </p>
      </section>

      <section>
        <h2>5. Making a claim</h2>
        <ul>
          <li>
            Email <a href={`mailto:${SITE_CONFIG.emails.support}`}>{SITE_CONFIG.emails.support}</a> with your order number, a
            description of the problem, and photos or a short video if you can.
          </li>
          <li>We&apos;ll reply with the next steps, which may include returning the item to us for inspection.</li>
          <li>If the claim is accepted we&apos;ll repair, replace or refund the item and cover the return postage.</li>
        </ul>
        <p>See also our <Link href="/returns">returns policy</Link>.</p>
      </section>
    </PolicyPage>
  );
}
