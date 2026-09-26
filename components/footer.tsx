import Link from "next/link";
import { Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Interior", href: "/shop?category=interior" },
    { name: "Exterior", href: "/shop?category=exterior" },
    { name: "Lighting", href: "/shop?category=lighting" },
    { name: "Performance", href: "/shop?category=performance" },
  ],
  company: [
    { name: "About ARFMODS", href: "/about" },
    { name: "FixNow Fitting", href: "/#fitting" },
    { name: "Track Order", href: "/track-order" },
    { name: "Support", href: "/support" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Returns & Refunds", href: "/returns" },
    { name: "Warranty Info", href: "/warranty" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Mobile: Simple Compact Footer */}
      <div className="lg:hidden mx-auto max-w-7xl px-4 py-6">
        {/* Brand */}
        <div className="text-center pb-4 border-b border-neutral-800">
          <Link href="/" className="inline-block">
            <span className="text-lg font-display font-bold tracking-tight text-white">ARFMODS</span>
            <span className="ml-2 text-[9px] font-medium text-neutral-400 tracking-wide">AUTOMOTIVE</span>
          </Link>
          <p className="text-[10px] text-neutral-500 mt-2">Premium BMW Retrofits & Performance</p>
        </div>

        {/* Key Links - Horizontal */}
        <div className="py-4 flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs">
          <Link href="/shop" className="text-neutral-400 hover:text-primary-400 transition-colors">Shop</Link>
          <span className="text-neutral-700">•</span>
          <a href={SITE_CONFIG.ebay.storeUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-400 transition-colors">eBay Store</a>
          <span className="text-neutral-700">•</span>
          <Link href="/about" className="text-neutral-400 hover:text-primary-400 transition-colors">About</Link>
          <span className="text-neutral-700">•</span>
          <Link href="/support" className="text-neutral-400 hover:text-primary-400 transition-colors">Support</Link>
        </div>

        {/* Policies - Compact Row */}
        <div className="py-3 flex flex-wrap justify-center gap-x-3 gap-y-2 text-[10px] border-t border-neutral-800">
          <Link href="/privacy" className="text-neutral-500 hover:text-primary-400 transition-colors">Privacy</Link>
          <span className="text-neutral-700">•</span>
          <Link href="/terms" className="text-neutral-500 hover:text-primary-400 transition-colors">Terms</Link>
          <span className="text-neutral-700">•</span>
          <Link href="/returns" className="text-neutral-500 hover:text-primary-400 transition-colors">Returns</Link>
          <span className="text-neutral-700">•</span>
          <Link href="/warranty" className="text-neutral-500 hover:text-primary-400 transition-colors">Warranty</Link>
        </div>

        {/* Contact */}
        <div className="py-3 flex justify-center border-t border-neutral-800">
          <a href="mailto:info@arfmods.co.uk" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-primary-400 transition-colors">
            <Mail className="h-3 w-3" />
            info@arfmods.co.uk
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-3 border-t border-neutral-800">
          <p className="text-[10px] text-neutral-500 text-center leading-relaxed">
            &copy; {new Date().getFullYear()} ARFMODS<br />
            Official ARF Automotive Division
          </p>
        </div>
      </div>

      {/* Desktop: Full Footer */}
      <div className="hidden lg:block mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-4 gap-8">
          {/* Brand section */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-display font-bold tracking-tight text-white">ARFMODS</span>
              <span className="ml-2 text-xs font-medium text-neutral-400 tracking-wide">AUTOMOTIVE</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              The official BMW retrofit, styling, and performance division of ARF Automotive Group.
            </p>
            <p className="mt-4 text-xs text-neutral-500">
              Official fitting division:<br />
              <a
                href={SITE_CONFIG.fitting.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 font-medium hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                FixNow Mechanics
              </a>
            </p>
            <p className="mt-3 text-xs text-neutral-500">
              Also selling on{" "}
              <a
                href={SITE_CONFIG.ebay.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 font-medium hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                eBay
              </a>
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Shop</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a href="mailto:info@arfmods.co.uk" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                <Mail className="h-4 w-4" />
                info@arfmods.co.uk
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} ARFMODS Automotive. Part of ARF Automotive Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
