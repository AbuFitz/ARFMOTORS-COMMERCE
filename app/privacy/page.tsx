import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { COMPANY, SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      current="/privacy"
      intro={
        <p>
          This policy explains what personal information we collect when you use this website, how we use it, and your
          rights. The data controller is {COMPANY.legalName} (company number {COMPANY.companyNumber}). We handle personal
          data in line with the UK GDPR and the Data Protection Act 2018.
        </p>
      }
    >
      <section>
        <h2>1. What we collect</h2>
        <ul>
          <li>Your name, email address, phone number and delivery address when you place an order.</li>
          <li>Your order history and any messages you send us.</li>
          <li>Your postcode, if you check fitting availability or request fitting.</li>
          <li>Your email address if you sign up to our newsletter.</li>
          <li>
            Basic technical information such as browser type and pages visited, if you allow analytics cookies.
          </li>
        </ul>
        <p>We don&apos;t see or store your full card details. Payments are processed by Stripe.</p>
      </section>

      <section>
        <h2>2. How we use it</h2>
        <ul>
          <li>To process, deliver and support your orders (contract).</li>
          <li>To arrange professional fitting when you request it (contract).</li>
          <li>To reply to your messages (legitimate interests).</li>
          <li>To keep records we&apos;re legally required to keep, such as for tax (legal obligation).</li>
          <li>To send you marketing emails, only if you&apos;ve signed up (consent).</li>
          <li>To improve the website and prevent fraud (legitimate interests).</li>
        </ul>
      </section>

      <section>
        <h2>3. Who we share it with</h2>
        <ul>
          <li><strong>Stripe</strong>, to take payments.</li>
          <li><strong>Delivery companies</strong>, to deliver your order.</li>
          <li>
            <strong>FixNow Mechanics</strong>, only if you request fitting: your name, contact details, postcode and the
            products to be fitted.
          </li>
          <li><strong>Resend</strong>, to send order and contact emails.</li>
          <li><strong>Mailchimp</strong>, to send our newsletter if you sign up.</li>
          <li>Authorities, where we&apos;re required to by law.</li>
        </ul>
        <p>We don&apos;t sell your personal information.</p>
      </section>

      <section>
        <h2>4. How long we keep it</h2>
        <p>
          We keep order records for six years for tax and accounting purposes. Newsletter subscriptions are kept until
          you unsubscribe. Other messages are kept for as long as needed to deal with your enquiry.
        </p>
      </section>

      <section>
        <h2>5. International transfers</h2>
        <p>
          Some of our service providers may process data outside the UK. Where they do, we rely on appropriate
          safeguards such as UK adequacy regulations or standard contractual clauses.
        </p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          We use essential cookies and browser storage to run the website, for example to remember your cart. We only
          use analytics or marketing cookies if you accept them in the cookie banner, and you can change your choice at
          any time.
        </p>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>
          You can ask to see, correct or delete the personal information we hold about you, object to or restrict how
          we use it, or ask for a copy to take elsewhere. You can withdraw consent to marketing at any time. To make a
          request, email <a href={`mailto:${SITE_CONFIG.emails.support}`}>{SITE_CONFIG.emails.support}</a>.
        </p>
        <p>
          If you&apos;re unhappy with how we&apos;ve handled your information, you can complain to the Information
          Commissioner&apos;s Office (ico.org.uk).
        </p>
      </section>
    </PolicyPage>
  );
}
