# ARF Motors – BMW Parts Store

Next.js 14 ecommerce site for ARF Motors, a trading name of **ARF Commerce Ltd** (registered in
England and Wales, company no. 17432383). The site sells BMW styling and performance parts direct.
Many of the same parts are also listed on our eBay store, and eligible parts can be fitted by
**FixNow Mechanics**.

There is no admin dashboard, CRM or database. Products live in the repo, Stripe holds the
order records, and emails go out through Resend.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in the keys you have
npm run dev                  # http://localhost:3000
```

The site runs without any keys. Checkout says "Payments are not configured yet" and emails are
skipped (with a warning in the logs) until the keys are set.

## Adding your products

### Option A — import a spreadsheet or eBay export (recommended)

1. **From eBay:** Seller Hub → Listings → Active → *Download report* (CSV).
   **From a spreadsheet:** fill in [`data/product-import-template.csv`](data/product-import-template.csv)
   in Excel or Google Sheets and save as CSV.
2. Run:
   ```bash
   npm run import-products -- path/to/your-file.csv
   ```
3. This writes `data/imported-products.json`. Commit it and redeploy.

The importer:
- recognises eBay's columns (Item number, Title, Current price, Available quantity, Custom label)
  as well as the template's columns;
- guesses the category and BMW chassis codes (F30, G20, X5…) from the title when they aren't given;
- links each product to its eBay listing using the item number;
- hides products with 0 quantity.

It also reports which products still need images or BMW models. eBay exports don't include
fitting info or photos, so add those in the spreadsheet: separate multiple values with `|`, and
put `yes` in the Fitting column for parts FixNow can fit. Re-running the import replaces the
whole file.

### Option B — edit by hand

[`data/products.ts`](data/products.ts) holds the 14 sample products. Copy an entry, change it
and redeploy. If an imported product has the same `id` or `slug`, it replaces the hand-written
one. Delete the sample entries once your real stock is imported.

| Field | Purpose |
| --- | --- |
| `installationAvailable` | Eligible for FixNow fitting (adds the fitting option + postcode check) |
| `fittingFrom` | Optional "fitting from £X" guide price |
| `ebayListed` / `ebayItemId` | Shows "View on eBay" (a direct link when the item number is set) |
| `isFeatured` | Shown in "Featured Products" on the home page |
| `discountType` / `discountValue` | `"percentage"` or `"fixed"` sale price |
| `inStockUK` / `imported` / `deliveryEstimate` | Stock badge and delivery messaging |

Put product photos in `public/images/products/` and reference them as
`/images/products/name.jpg`, or use any `https://` image URL.

## Settings

| What | Where |
| --- | --- |
| Brand name, contact emails, FixNow link, eBay store | [`lib/site-config.ts`](lib/site-config.ts) + env vars |
| Discount codes (`WELCOME10`, `ARFMOTORS10`) and £50 minimum | `lib/site-config.ts` |
| Newsletter popup text | `lib/site-config.ts` |
| FixNow fitting postcode areas | [`lib/postcode-checker.ts`](lib/postcode-checker.ts) |

## How an order works

1. The customer adds parts, optionally ticks **Add fitting by FixNow Mechanics** (after a postcode
   check), and checks out.
2. `/api/checkout` re-prices everything from the catalogue, re-checks the discount code, and
   opens a Stripe Checkout page with an `ARF-…` order number.
3. When the payment succeeds, Stripe calls `/api/webhooks/stripe`, which sends:
   - an order confirmation to the customer;
   - a new-order email to `ADMIN_NOTIFICATION_EMAIL`;
   - if fitting was requested, a **fitting job email to `FIXNOW_EMAIL`** with the customer's name,
     phone, postcode and the parts to fit.
4. You dispatch the parts. FixNow quotes the fitting and books it directly with the customer.

Look up and refund orders in the Stripe dashboard.

## Launch checklist

1. **Registered office:** set `NEXT_PUBLIC_REGISTERED_OFFICE` to the address on Companies House.
   UK law requires the company name, number and registered office on the site. The name and
   number are already shown in the footer, policies and emails.
2. **Domain and brand:** set `NEXT_PUBLIC_SITE_URL`, `BUSINESS_EMAIL`, `SUPPORT_EMAIL` and
   `ADMIN_NOTIFICATION_EMAIL`. The defaults assume `arfmotors.co.uk`. The contact addresses shown
   on the policy pages are also `@arfmotors.co.uk`; search and replace them if your domain differs.
3. **eBay:** set `NEXT_PUBLIC_EBAY_SELLER` to your eBay username (and optionally
   `NEXT_PUBLIC_EBAY_STORE_URL`).
4. **Products:** import your stock (see above) and add photos.
5. **Stripe:** create an account → Developers → API keys → set `STRIPE_SECRET_KEY` and
   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
6. **Resend:** create an account, verify your domain, and set `RESEND_API_KEY` and
   `RESEND_FROM_EMAIL`.
7. **FixNow:** set `FIXNOW_EMAIL` to the inbox that should receive fitting jobs.
8. **Mailchimp (optional):** set `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID` and
   `MAILCHIMP_SERVER_PREFIX` for the newsletter popup.
9. **Deploy on Vercel:** import this repo at vercel.com/new, paste the variables from
   `.env.example`, deploy, then add your domain.
10. **Stripe webhook:** Developers → Webhooks → add
   `https://yourdomain.com/api/webhooks/stripe` for `checkout.session.completed`. Copy the signing
   secret into `STRIPE_WEBHOOK_SECRET` and redeploy.
11. **Test order:** with test keys, buy something with card `4242 4242 4242 4242` and fitting
    ticked. Check that all three emails arrive, then switch to live keys.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint |
| `npm run import-products -- file.csv` | Import products from CSV |
| `npm run test:orders` | Runs the checkout + webhook flow against a fake Stripe and email server |
