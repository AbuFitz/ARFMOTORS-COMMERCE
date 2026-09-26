# ARFMODS – BMW Parts Store

Next.js 14 ecommerce site for ARFMODS: BMW styling and performance parts sold direct.
Many of the same parts are also listed on our eBay store, and eligible parts can be fitted by
**FixNow Mechanics**.

There is no admin dashboard, CRM or database. The product catalogue is a TypeScript file,
Stripe holds the order records, and order/contact emails go out through Resend.

## Quick start

```bash
npm install
cp .env.example .env.local   # add Stripe / Resend / Mailchimp keys
npm run dev                  # http://localhost:3000
```

The site runs without any keys. Checkout returns "Payments are not configured yet" and emails
are skipped (a warning is logged) until the keys are set.

## Managing products

Every product lives in [`data/products.ts`](data/products.ts). To add one, copy an entry, give
it a unique `id` and `slug`, and redeploy.

| Field | Purpose |
| --- | --- |
| `installationAvailable` | Part is eligible for FixNow Mechanics fitting (adds the fitting option + postcode check) |
| `fittingFrom` | Optional "fitting from £X" guide price |
| `ebayListed` | Shows "View on eBay" (searches our eBay store for the product title) |
| `ebayItemId` | Optional eBay item number, which links straight to the listing |
| `isFeatured` | Shown in "Featured Products" on the home page |
| `discountType` / `discountValue` | `"percentage"` or `"fixed"` sale price |
| `inStockUK` / `imported` / `deliveryEstimate` | Stock badge and delivery messaging |

Product images go in `public/images/products/` (reference them as `/images/products/name.jpg`)
or can be any `https://` URL. The seed products currently reuse the category/model photos as
placeholders.

## Other settings

[`lib/site-config.ts`](lib/site-config.ts) holds:

- the eBay seller name and store link (`NEXT_PUBLIC_EBAY_SELLER`, `NEXT_PUBLIC_EBAY_STORE_URL`)
- FixNow Mechanics link and coverage text
- newsletter popup copy
- discount codes (`WELCOME10`, `ARFMODS10`) and the £50 minimum order

The FixNow fitting postcode areas are in [`lib/postcode-checker.ts`](lib/postcode-checker.ts).

## How orders work

1. The cart posts to `/api/checkout`. Prices and discount codes are re-checked on the server
   against the catalogue, then a Stripe Checkout session is created with an `ARF-…` order number.
2. Stripe calls `/api/webhooks/stripe` on `checkout.session.completed`. That route emails the
   customer and the shop inbox (`ADMIN_NOTIFICATION_EMAIL`), including whether fitting was requested.
3. Fitting is quoted and booked separately by FixNow Mechanics. The order email flags it.

Look up and refund orders in the Stripe dashboard.

## Deploying (Vercel)

1. Import the repo into Vercel and add the variables from `.env.example`.
2. In Stripe, create a webhook to `https://yourdomain.com/api/webhooks/stripe` for
   `checkout.session.completed` and put its signing secret in `STRIPE_WEBHOOK_SECRET`.
3. Verify your sending domain in Resend.
