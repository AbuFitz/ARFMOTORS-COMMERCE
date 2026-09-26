#!/usr/bin/env node
// Import products from a CSV file into data/imported-products.json.
//
//   npm run import-products -- path/to/listings.csv
//
// Works with:
//   - the eBay Seller Hub "Active listings" report (Listings → Download report)
//   - data/product-import-template.csv (fill it in with Excel / Google Sheets)
//
// Column names are matched loosely (case/spacing/punctuation ignored), so
// "Current price", "price" and "Price (£)" all work. Anything the file doesn't
// provide is guessed from the title (BMW chassis codes, category) or defaulted.
// Re-running the import replaces data/imported-products.json completely.

import fs from "node:fs";
import path from "node:path";

const COLUMNS = {
  title: ["title", "itemtitle", "name", "productname"],
  price: ["price", "currentprice", "startprice", "buyitnowprice", "priceGBP", "pricegbp"],
  ebayItemId: ["itemnumber", "itemid", "ebayitemid", "ebayitemnumber", "ebayid"],
  sku: ["customlabelsku", "customlabel", "sku", "id"],
  quantity: ["availablequantity", "quantity", "quantityavailable", "stock"],
  category: ["category", "storecategory"],
  models: ["bmwmodels", "models", "fits", "compatiblemodels", "compatibility"],
  description: ["description", "shortdescription", "subtitle"],
  longDescription: ["longdescription", "fulldescription"],
  images: ["images", "imageurls", "image", "imageurl", "pictureurl", "pictureurls", "photos"],
  fitting: ["fitting", "fittingavailable", "fixnowfitting", "installationavailable"],
  fittingFrom: ["fittingfrom", "fittingprice"],
  ebayListed: ["ebaylisted", "onebay"],
  inStockUK: ["instockuk", "ukstock"],
  delivery: ["delivery", "deliveryestimate", "dispatchtime", "handlingtime"],
  featured: ["featured", "isfeatured"],
  salePercent: ["salepercent", "discountpercent"],
  warranty: ["warranty"],
  features: ["features"],
};

const CATEGORY_KEYWORDS = [
  ["lighting", ["led", "light", "lamp", "angel eye", "halo", "headlight", "tail light", "rear light", "bulb", "xenon", "drl"]],
  ["interior", ["interior", "trim", "steering wheel", "gear", "shift", "seat", "floor mat", "ambient", "dashboard", "paddle"]],
  ["audio", ["carplay", "android auto", "speaker", "audio", "stereo", "screen", "head unit", "subwoofer"]],
  ["wheels-tyres", ["wheel", "alloy", "tyre", "tire", "bolt", "spacer", "centre cap", "center cap"]],
  ["performance", ["exhaust", "intake", "air filter", "downpipe", "intercooler", "tips", "brake", "suspension", "coilover", "strut brace"]],
  ["exterior", ["spoiler", "diffuser", "grille", "grill", "mirror", "splitter", "lip", "side skirt", "bumper", "carbon", "badge", "kidney", "wing"]],
  ["accessories", ["valve cap", "key", "cover", "cleaning", "tool"]],
];

const VALID_CATEGORIES = new Set([
  "interior", "exterior", "lighting", "oem-plus", "performance", "wheels-tyres", "audio", "accessories",
]);

// ─── CSV parsing (handles quotes, commas and newlines inside quotes) ─────────
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  text = text.replace(/^﻿/, "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((v) => v.trim() !== "")) rows.push(row);
  return rows;
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function slugify(s) {
  return s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function parseBool(v, fallback) {
  if (v === undefined || v.trim() === "") return fallback;
  return /^(y|yes|true|1|x)$/i.test(v.trim());
}

function parseNumber(v) {
  if (v === undefined) return undefined;
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

function splitList(v) {
  if (!v) return [];
  return v.split(/[|;\n]|,(?=\s*\S)/).map((s) => s.trim()).filter(Boolean);
}

function guessModels(title) {
  const codes = new Set();
  for (const m of title.toUpperCase().matchAll(/\b([EFG]\d{2})\b/g)) codes.add(m[1]);
  for (const m of title.toUpperCase().matchAll(/\bX([1-7])\b/g)) codes.add(`X${m[1]}`);
  return [...codes];
}

function guessCategory(title) {
  const t = title.toLowerCase();
  for (const [category, words] of CATEGORY_KEYWORDS) {
    if (words.some((w) => t.includes(w))) return category;
  }
  return "accessories";
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: npm run import-products -- path/to/file.csv");
    process.exit(1);
  }
  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  if (rows.length < 2) {
    console.error("The CSV has no product rows.");
    process.exit(1);
  }

  const header = rows[0].map(norm);
  const colIndex = {};
  for (const [key, aliases] of Object.entries(COLUMNS)) {
    const idx = header.findIndex((h) => aliases.map(norm).includes(h));
    if (idx !== -1) colIndex[key] = idx;
  }
  if (colIndex.title === undefined || colIndex.price === undefined) {
    console.error(`Couldn't find a title and price column. Columns found: ${rows[0].join(", ")}`);
    process.exit(1);
  }

  const now = new Date().toISOString();
  const products = [];
  const slugs = new Set();
  const skipped = [];

  rows.slice(1).forEach((cells, i) => {
    const get = (key) => (colIndex[key] !== undefined ? (cells[colIndex[key]] ?? "").trim() : undefined);
    const title = get("title");
    const price = parseNumber(get("price"));
    if (!title || !price) {
      skipped.push(`row ${i + 2}: missing title or price`);
      return;
    }

    let slug = slugify(title);
    while (slugs.has(slug)) slug = `${slug}-${i + 2}`;
    slugs.add(slug);

    const ebayItemId = (get("ebayItemId") || "").replace(/[^0-9]/g, "") || undefined;
    const quantity = parseNumber(get("quantity"));
    const rawCategory = (get("category") || "").toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-");
    const category = VALID_CATEGORIES.has(rawCategory) ? rawCategory : guessCategory(title);
    const models = splitList(get("models"));
    const fitting = parseBool(get("fitting"), false);
    const salePercent = parseNumber(get("salePercent"));
    const inStockUK = parseBool(get("inStockUK"), true);
    const description = get("description") || title;

    products.push({
      id: `imp-${get("sku") || ebayItemId || slug}`,
      title,
      slug,
      description,
      longDescription: get("longDescription") || undefined,
      images: splitList(get("images")),
      bmwModels: models.length ? models : guessModels(title),
      category,
      price,
      inStockUK,
      imported: !inStockUK,
      deliveryEstimate: get("delivery") || (inStockUK ? "1-3 business days" : "10-14 business days"),
      installationAvailable: fitting,
      fittingFrom: fitting ? parseNumber(get("fittingFrom")) : undefined,
      discountType: salePercent ? "percentage" : "none",
      discountValue: salePercent || 0,
      isActive: quantity === undefined || quantity > 0,
      isFeatured: parseBool(get("featured"), false),
      ebayListed: parseBool(get("ebayListed"), Boolean(ebayItemId)),
      ebayItemId,
      warranty: get("warranty") || undefined,
      features: splitList(get("features")),
      createdAt: now,
      updatedAt: now,
    });
  });

  const out = path.join(process.cwd(), "data", "imported-products.json");
  fs.writeFileSync(out, JSON.stringify(products, null, 2) + "\n");

  const noImages = products.filter((p) => !p.images.length).length;
  const noModels = products.filter((p) => !p.bmwModels.length).length;
  console.log(`Imported ${products.length} products into data/imported-products.json`);
  if (skipped.length) console.log(`Skipped ${skipped.length}:\n  ${skipped.join("\n  ")}`);
  if (noImages) console.log(`${noImages} product(s) have no images — add image URLs or files in public/images/products/`);
  if (noModels) console.log(`${noModels} product(s) have no BMW models — add a "BMW Models" column or edit the JSON`);
  console.log(`${products.filter((p) => p.installationAvailable).length} product(s) marked for FixNow fitting`);
}

main();
