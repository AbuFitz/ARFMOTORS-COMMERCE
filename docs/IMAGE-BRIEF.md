# Image brief

Every image slot on the site, where to upload it and what to shoot.

**How uploading works:** put the file at the path shown (under `public/`). `.jpg`, `.png` and `.webp` all work, so `hero.jpg` also finds `hero.png`. Images are picked up when the site builds, so uploading through GitHub (which triggers a new deploy) is all you need. Until a photo is uploaded, a branded placeholder or the category photo is shown. When you run the site locally with `npm run dev`, each placeholder is labelled with its upload path.

**General style:** dark neutral backgrounds, real products, a touch of the brand orange (#EF4F35) in lighting or props where it looks natural. No stock photos with visible car brand badges. Landscape, sharp, well lit, under 500KB each (export JPG at about 80% quality).

## About page (`/about`)

| Upload to | Size (px) | What to shoot |
|---|---|---|
| `public/images/about/hero.jpg` | 2400 x 1000 | Wide banner. Your range laid out or stacked neatly, dark background, orange accent lighting. Keep the left third plain, because the headline sits there. |
| `public/images/about/range.jpg` | 1600 x 1200 | Flat lay from above of 6 to 10 products across the four categories: dash cam, phone mount, jump starter, tool kit. |
| `public/images/about/stock.jpg` | 1600 x 1200 | Shelving with boxed stock, labelled and organised. Shows you hold real UK stock. |
| `public/images/about/packing.jpg` | 1600 x 1200 | Hands packing an order into a box, with a packing slip visible. Warm and real, not staged. |
| `public/images/about/fitting.jpg` | 1600 x 1200 | A FixNow Mechanics technician fitting a dash cam or routing a cable behind trim. Close-up of hands and tools. |

## Suppliers page (`/suppliers`)

| Upload to | Size (px) | What to shoot |
|---|---|---|
| `public/images/suppliers/hero.jpg` | 2400 x 1000 | Wide banner. Pallets or cartons of product, or a shelf of boxed stock. Dark, moody, orange accent. Keep the left side calm for the headline. |
| `public/images/suppliers/listing.jpg` | 1600 x 1200 | A product being photographed on a clean background, or a laptop showing a product page. |
| `public/images/suppliers/dispatch.jpg` | 1600 x 1200 | A stack of packed parcels with shipping labels, or a courier collection. |
| `public/images/suppliers/fitting.jpg` | 1600 x 1200 | An in-car product being installed: dash cam, reversing camera or wiring. |

## Guides (`/blog`)

Each guide has a **hero** (shown at the top of the article, on guide cards and when shared on social media) and one **inline** photo in the body.

- Hero: `hero.jpg`, **1600 x 900** (16:9). Keep the subject central, because cards crop slightly.
- Inline: `1.jpg`, **1500 x 1000** (3:2). If this isn't uploaded, it's simply left out of the article.

Until a hero is uploaded, the guide uses its category photo.

| Guide | Hero: `public/images/blog/<slug>/hero.jpg` | Inline: `public/images/blog/<slug>/1.jpg` |
|---|---|---|
| `how-to-choose-a-dash-cam` | Dash cam mounted behind a car's rear-view mirror, road visible through the windscreen | Rear dash cam fitted to the top of a car's back window |
| `dash-cam-hardwiring-explained` | Dash cam hardwire kit connected to a car fuse box | Close-up of a fuse tap fitted in a fuse box |
| `wireless-carplay-adapters-explained` | Car infotainment screen showing Apple CarPlay (no car brand badge in shot) | The wireless adapter plugged into a car's USB port |
| `car-breakdown-kit-checklist` | Breakdown kit laid out in an open car boot: triangle, hi-vis, jump starter, torch | Breakdown essentials packed neatly in a boot organiser |
| `how-to-check-tyre-pressure` | Digital tyre gauge being used on a tyre valve | Cordless tyre inflator connected to a car tyre |
| `how-to-use-a-jump-starter` | Portable jump starter connected to a car battery, bonnet open | Close-up of red and black clamps on the battery terminals |
| `phone-mounts-and-the-law` | Phone in a vent mount showing navigation, driver's view | Phone showing a map in a dashboard vent mount, close-up |
| `basic-car-tool-kit` | Compact car tool kit open on a garage floor or in a boot | Socket set and screwdriver bits in the carry case |
| `test-car-battery-with-multimeter` | Multimeter probes on a car battery's terminals | Multimeter display showing a voltage reading (about 12.6V) |

## Products

| Upload to | Size (px) | Notes |
|---|---|---|
| `public/images/products/<slug>/...` or a URL in the product data | 1200 x 1200 (square) | Clean light or white background, product centred, plus 2 to 4 extra angles or in-use shots. Update `images` in `data/products.ts` (or the CSV import). |

## Categories

Already uploaded to `public/images/categories/` (in-car-tech, accessories, roadside, tools). Replace any at **1600 x 1200** to update the homepage, categories page, shop category pages and guide fallbacks.

## Social sharing and icons

| File | Size (px) | Notes |
|---|---|---|
| `public/og-default.jpg` | 1200 x 630 | Shown when a page without its own image is shared. A branded version is already in place; replace it with a product photo plus logo if you like. |
| `public/favicon.svg` | Square | Browser tab icon. |
| `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png` | 180, 192, 512 | Home screen icons, generated from the favicon. |
