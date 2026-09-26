import Link from "next/link";
import { COMPANY, SITE_CONFIG } from "@/lib/site-config";

// Update this when any policy text changes.
export const POLICY_LAST_UPDATED = "26 September 2026";

const POLICIES = [
  { href: "/terms", label: "Terms & conditions" },
  { href: "/returns", label: "Returns & refunds" },
  { href: "/warranty", label: "Warranty" },
  { href: "/privacy", label: "Privacy policy" },
];

export function PolicyPage({ title, intro, current, children }: {
  title: string;
  intro?: React.ReactNode;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid gap-10 lg:grid-cols-[200px_1fr]">
        <nav aria-label="Policies" className="order-last lg:order-first">
          <ul className="lg:sticky lg:top-32 flex flex-wrap gap-2 lg:block lg:space-y-1">
            {POLICIES.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className={
                    p.href === current
                      ? "block rounded-lg bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-900"
                      : "block rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article className="max-w-3xl">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">{title}</h1>
          <p className="mt-2 text-sm text-neutral-500">Last updated: {POLICY_LAST_UPDATED}</p>
          {intro && <div className="mt-5 text-neutral-700 leading-relaxed">{intro}</div>}
          <div className="mt-8 space-y-8 text-neutral-700 leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mb-3 [&_a]:underline">
            {children}
          </div>
          <div className="mt-10 rounded-xl bg-neutral-50 p-5 text-sm text-neutral-700">
            <p className="font-semibold text-neutral-900">Contact us</p>
            <p className="mt-1">
              {COMPANY.legalName} · Registered in {COMPANY.registeredIn} · Company number {COMPANY.companyNumber}
              {COMPANY.registeredOffice && <> · Registered office: {COMPANY.registeredOffice}</>}
            </p>
            <p className="mt-1">
              Email:{" "}
              <a href={`mailto:${SITE_CONFIG.emails.support}`} className="underline">
                {SITE_CONFIG.emails.support}
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
