import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { SITE_CONFIG, COMPANY } from "@/lib/site-config";
import { getActiveCategories } from "@/lib/products";

const helpLinks = [
  { name: "Help & FAQs", href: "/support" },
  { name: "Contact us", href: "/contact" },
  { name: "Track an order", href: "/track-order" },
  { name: "Installation", href: "/installation" },
  { name: "Guides & advice", href: "/blog" },
  { name: "About ARF Commerce", href: "/about" },
  { name: "Suppliers & brands", href: "/suppliers" },
];

const policyLinks = [
  { name: "Returns & refunds", href: "/returns" },
  { name: "Warranty", href: "/warranty" },
  { name: "Terms & conditions", href: "/terms" },
  { name: "Privacy policy", href: "/privacy" },
];

function LinkColumn({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const shopLinks = [
    { name: "All products", href: "/shop" },
    { name: "New arrivals", href: "/shop?sort=newest" },
    ...getActiveCategories().map((c) => ({ name: c.name, href: `/shop/${c.id}` })),
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8 lg:pt-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block" aria-label="ARF Commerce home">
              <Image
                src="/logo-white.svg"
                alt="ARF Commerce"
                width={1381}
                height={524}
                unoptimized
                className="h-10 lg:h-12 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              {SITE_CONFIG.tagline}. Professional fitting available on selected products through{" "}
              <a
                href={SITE_CONFIG.fitting.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 underline-offset-2 hover:text-white hover:underline"
              >
                FixNow Mechanics
              </a>
              .
            </p>
            <a
              href={`mailto:${SITE_CONFIG.emails.info}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              {SITE_CONFIG.emails.info}
            </a>
          </div>

          <div className="lg:col-span-3">
            <LinkColumn title="Shop" links={shopLinks} />
          </div>
          <div className="lg:col-span-3">
            <LinkColumn title="Help" links={helpLinks} />
          </div>
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <LinkColumn title="Policies" links={policyLinks} />
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-800 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-end sm:justify-between">
          <address className="not-italic leading-relaxed">
            <span className="text-neutral-400">{COMPANY.legalName}</span>
            <br />
            Registered in {COMPANY.registeredIn}
            <br />
            Company number {COMPANY.companyNumber}
            {COMPANY.registeredOffice && (
              <>
                <br />
                Registered office: {COMPANY.registeredOffice}
              </>
            )}
          </address>
          <div className="flex flex-col gap-1 sm:items-end">
            <p>
              Also on{" "}
              <a
                href={SITE_CONFIG.ebay.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white"
              >
                eBay
              </a>
            </p>
            <p>&copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
