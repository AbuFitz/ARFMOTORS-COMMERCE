// Central store settings. Everything that used to live in the admin dashboard /
// database (popup copy, discount codes, eBay + fitting links) is configured here.

const EBAY_SELLER = process.env.NEXT_PUBLIC_EBAY_SELLER || "arfcommerce";

export const COMPANY = {
  brandName: "ARF Commerce",
  legalName: "ARF Commerce Ltd",
  companyNumber: "17432383",
  registeredIn: "England and Wales",
  // Companies House registered office. Set NEXT_PUBLIC_REGISTERED_OFFICE to show it on the site
  registeredOffice: process.env.NEXT_PUBLIC_REGISTERED_OFFICE || "",
};

/** "ARF Commerce Ltd. Registered in England and Wales. Company number 17432383." (+ registered office when set) */
export const COMPANY_STATEMENT = `${COMPANY.legalName}. Registered in ${COMPANY.registeredIn}. Company number ${COMPANY.companyNumber}.${
  COMPANY.registeredOffice ? ` Registered office: ${COMPANY.registeredOffice}.` : ""
}`;

export const SITE_CONFIG = {
  name: "ARF Commerce",
  tagline: "Car accessories, in-car tech and tools, delivered from the UK",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://arfcommerce.co.uk",
  emails: {
    info: "info@arfcommerce.co.uk",
    support: process.env.SUPPORT_EMAIL || "support@arfcommerce.co.uk",
    orders: process.env.BUSINESS_EMAIL || "orders@arfcommerce.co.uk",
  },
  fitting: {
    partner: "FixNow Mechanics",
    url: "https://fixnowmechanics.co.uk",
    coverage: "London and surrounding areas up to Peterborough",
  },
  ebay: {
    seller: EBAY_SELLER,
    storeUrl: process.env.NEXT_PUBLIC_EBAY_STORE_URL || `https://www.ebay.co.uk/usr/${EBAY_SELLER}`,
  },
};

/**
 * Link to a product's eBay listing, or null if it isn't listed there.
 * Uses the item number when we have one, otherwise searches our eBay store.
 */
export function getEbayListingUrl(product: {
  title: string;
  ebayListed?: boolean;
  ebayItemId?: string;
}): string | null {
  if (product.ebayItemId) return `https://www.ebay.co.uk/itm/${product.ebayItemId}`;
  if (!product.ebayListed) return null;
  const query = encodeURIComponent(product.title);
  return `https://www.ebay.co.uk/sch/i.html?_ssn=${encodeURIComponent(EBAY_SELLER)}&_nkw=${query}`;
}

// ─── Newsletter popup ────────────────────────────────────────────────────────

export const POPUP_CONFIG = {
  enabled: true,
  delay_seconds: 10,
  dismiss_days: 7,
  heading: "Welcome Gift!",
  subheading: "Get 10% off your first order",
  discount_code: "WELCOME10",
  discount_percent: 10,
  min_order_gbp: 50,
  cta_text: "Get My 10% Off",
  terms_text: "Min. order £50 · All products · No expiry",
  footer_text: "No spam. Unsubscribe any time.",
  success_message: "Check your inbox for a welcome email! Here's your code:",
  success_cta: "Start Shopping →",
};

// ─── Discount codes ──────────────────────────────────────────────────────────
// Used by the cart (client) and re-checked by /api/checkout (server).

export const DISCOUNT_MINIMUM_ORDER = 50;

export const DISCOUNT_CODES: Record<string, number> = {
  WELCOME10: 10,
  ARF10: 10,
};

/** Returns the percentage off for a valid code, or 0 if invalid / below minimum. */
export function getDiscountPercent(code: string | null | undefined, subtotal: number): number {
  if (!code) return 0;
  const percent = DISCOUNT_CODES[code.toUpperCase().trim()];
  if (!percent || subtotal < DISCOUNT_MINIMUM_ORDER) return 0;
  return percent;
}
