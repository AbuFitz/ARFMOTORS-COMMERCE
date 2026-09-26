#!/usr/bin/env node
// End-to-end check of the order flow without real Stripe or Resend accounts.
//
//   npm run test:orders
//
// Starts a fake Stripe + Resend API on a local port, runs the built site
// against it, then:
//   1. posts a cart to /api/checkout (with a tampered price) and checks Stripe
//      receives catalogue prices, the discount and the fitting details;
//   2. sends signed checkout.session.completed webhooks and checks the customer,
//      shop and FixNow emails are sent.

import http from "node:http";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import Stripe from "stripe";

const FAKE_PORT = 4010;
const SITE_PORT = 3210;
const SITE = `http://localhost:${SITE_PORT}`;
const WEBHOOK_SECRET = "whsec_test_secret";

const checkoutSessions = [];
const couponsCreated = [];
const emails = [];

// ─── Fake Stripe + Resend ────────────────────────────────────────────────────
function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => resolve(data));
  });
}

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const fake = http.createServer(async (req, res) => {
  const body = await readBody(req);
  const url = new URL(req.url, `http://localhost:${FAKE_PORT}`);

  if (req.method === "POST" && url.pathname === "/v1/checkout/sessions") {
    const params = Object.fromEntries(new URLSearchParams(body));
    const id = `cs_test_${checkoutSessions.length + 1}`;
    checkoutSessions.push({ id, params });
    return json(res, 200, { id, object: "checkout.session", url: `https://checkout.stripe.test/${id}` });
  }
  if (req.method === "GET" && url.pathname.startsWith("/v1/coupons/")) {
    return json(res, 404, { error: { type: "invalid_request_error", code: "resource_missing", message: "No such coupon" } });
  }
  if (req.method === "POST" && url.pathname === "/v1/coupons") {
    const params = Object.fromEntries(new URLSearchParams(body));
    couponsCreated.push(params);
    return json(res, 200, { id: params.id, object: "coupon", percent_off: Number(params.percent_off) });
  }
  const lineItemsMatch = url.pathname.match(/^\/v1\/checkout\/sessions\/(cs_test_\d+)\/line_items$/);
  if (req.method === "GET" && lineItemsMatch) {
    const session = checkoutSessions.find((s) => s.id === lineItemsMatch[1]);
    const data = [];
    for (let i = 0; session && session.params[`line_items[${i}][quantity]`]; i++) {
      const p = (k) => session.params[`line_items[${i}][price_data][${k}]`];
      const quantity = Number(session.params[`line_items[${i}][quantity]`]);
      data.push({
        id: `li_${i}`,
        object: "item",
        description: p("product_data][name"),
        quantity,
        amount_total: Number(p("unit_amount")) * quantity,
        price: {
          id: `price_${i}`,
          object: "price",
          product: {
            id: `prod_${i}`,
            object: "product",
            name: p("product_data][name"),
            metadata: { fitting: p("product_data][metadata][fitting") },
          },
        },
      });
    }
    return json(res, 200, { object: "list", data, has_more: false, url: url.pathname });
  }
  if (req.method === "POST" && url.pathname === "/emails") {
    emails.push(JSON.parse(body));
    return json(res, 200, { id: `email_${emails.length}` });
  }

  json(res, 404, { error: { message: `Fake server has no route for ${req.method} ${url.pathname}` } });
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function waitForSite() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(SITE);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Site did not start — run `npm run build` first");
}

async function postCheckout(body) {
  const r = await fetch(`${SITE}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: r.status, body: await r.json() };
}

const stripe = new Stripe("sk_test_fake");

async function sendWebhook(session, { signed = true } = {}) {
  const payload = JSON.stringify({
    id: "evt_test",
    object: "event",
    type: "checkout.session.completed",
    data: { object: session },
  });
  const header = signed
    ? stripe.webhooks.generateTestHeaderString({ payload, secret: WEBHOOK_SECRET })
    : "t=1,v1=bad";
  const r = await fetch(`${SITE}/api/webhooks/stripe`, {
    method: "POST",
    headers: { "stripe-signature": header, "Content-Type": "application/json" },
    body: payload,
  });
  return r.status;
}

function paidSession(checkout, overrides = {}) {
  return {
    id: checkout.id,
    object: "checkout.session",
    payment_status: "paid",
    amount_total: 23508,
    total_details: { amount_discount: 2612 },
    customer_email: checkout.params.customer_email,
    customer_details: {
      name: "Sam Driver",
      email: checkout.params.customer_email,
      phone: "07700 900123",
      address: { line1: "1 Test Street", city: "London", postal_code: "SW1A 1AA" },
    },
    metadata: {
      orderNumber: checkout.params["metadata[orderNumber]"],
      deliveryMessage: checkout.params["metadata[deliveryMessage]"],
      discountCode: checkout.params["metadata[discountCode]"],
      fittingPostcode: checkout.params["metadata[fittingPostcode]"],
    },
    ...overrides,
  };
}

// ─── Tests ───────────────────────────────────────────────────────────────────
const results = [];
async function test(name, fn) {
  try {
    await fn();
    results.push(`  ✓ ${name}`);
  } catch (err) {
    results.push(`  ✗ ${name}\n      ${err.message.split("\n").join("\n      ")}`);
    process.exitCode = 1;
  }
}

const customerInfo = {
  email: "sam@example.com",
  firstName: "Sam",
  lastName: "Driver",
  phone: "07700 900123",
  address: "1 Test Street",
  city: "London",
  postcode: "SW1A 1AA",
};

async function run() {
  await test("checkout uses catalogue prices, applies the discount and keeps fitting details", async () => {
    const { status, body } = await postCheckout({
      items: [
        {
          productId: "arf-001", slug: "m-performance-carbon-fibre-mirror-caps", title: "Mirror caps",
          price: 1, discountedPrice: 1, quantity: 2, image: "", inStockUK: true, imported: false,
          installationRequested: true, installationPostcode: "SW1A 1AA", installationAvailable: true,
        },
        {
          productId: "arf-013", slug: "m-logo-aluminium-tyre-valve-caps", title: "Valve caps",
          price: 0.01, quantity: 1, image: "", inStockUK: true, imported: false,
        },
      ],
      customerInfo,
      discountCode: "welcome10",
    });
    assert.equal(status, 200, JSON.stringify(body));
    assert.match(body.sessionUrl, /checkout\.stripe\.test/);

    const { params } = checkoutSessions.at(-1);
    assert.equal(params["line_items[0][price_data][unit_amount]"], "11699", "mirror caps should be £116.99 (10% sale)");
    assert.equal(params["line_items[0][quantity]"], "2");
    assert.equal(params["line_items[0][price_data][product_data][metadata][fitting]"], "true");
    assert.equal(params["line_items[1][price_data][unit_amount]"], "1299", "valve caps should be £12.99");
    assert.equal(params["line_items[1][price_data][product_data][metadata][fitting]"], "false");
    assert.equal(params["metadata[fittingPostcode]"], "SW1A 1AA");
    assert.equal(params["metadata[discountCode]"], "WELCOME10");
    assert.match(params["metadata[orderNumber]"], /^ARF-[A-Z0-9]{8}$/);
    assert.equal(couponsCreated.at(-1)?.percent_off, "10");
    assert.equal(params["discounts[0][coupon]"], couponsCreated.at(-1).id);
  });

  await test("checkout rejects products that aren't in the catalogue", async () => {
    const { status } = await postCheckout({
      items: [{ productId: "does-not-exist", title: "Fake", price: 1, quantity: 1 }],
      customerInfo,
      discountCode: null,
    });
    assert.equal(status, 400);
  });

  await test("checkout ignores invalid discount codes and orders under the £50 minimum", async () => {
    const before = checkoutSessions.length;
    const { status } = await postCheckout({
      items: [{ productId: "arf-013", title: "Valve caps", price: 12.99, quantity: 1 }],
      customerInfo,
      discountCode: "WELCOME10",
    });
    assert.equal(status, 200);
    assert.equal(checkoutSessions.length, before + 1);
    assert.equal(checkoutSessions.at(-1).params["discounts[0][coupon]"], undefined);
    assert.equal(checkoutSessions.at(-1).params["metadata[fittingPostcode]"], "");
  });

  await test("webhook rejects an unsigned request", async () => {
    const status = await sendWebhook(paidSession(checkoutSessions[0]), { signed: false });
    assert.equal(status, 400);
    assert.equal(emails.length, 0);
  });

  await test("paid order with fitting emails the customer, the shop and FixNow", async () => {
    const status = await sendWebhook(paidSession(checkoutSessions[0]));
    assert.equal(status, 200);
    const to = emails.map((e) => [].concat(e.to)[0]);
    assert.deepEqual(to.sort(), ["fixnow@test.local", "orders@test.local", "sam@example.com"].sort(), `emails sent to: ${to.join(", ")}`);

    const customer = emails.find((e) => [].concat(e.to)[0] === "sam@example.com");
    assert.match(customer.subject, /Order confirmed – ARF-/);
    assert.match(customer.html, /FixNow fitting/);
    assert.match(customer.html, /£235\.08/);

    const fixnow = emails.find((e) => [].concat(e.to)[0] === "fixnow@test.local");
    assert.match(fixnow.subject, /Fitting job: ARF-.* – SW1A 1AA/);
    assert.match(fixnow.html, /07700 900123/);
    assert.match(fixnow.html, /M Performance Style Carbon Fibre Mirror Caps × 2/);
    assert.doesNotMatch(fixnow.html, /Valve Caps/, "FixNow should only get the parts to fit");
  });

  await test("paid order without fitting only emails the customer and the shop", async () => {
    emails.length = 0;
    const status = await sendWebhook(paidSession(checkoutSessions.at(-1), { amount_total: 1299, total_details: { amount_discount: 0 } }));
    assert.equal(status, 200);
    assert.equal(emails.length, 2, `emails sent to: ${emails.map((e) => e.to).join(", ")}`);
  });

  await test("unpaid sessions don't send emails", async () => {
    emails.length = 0;
    const status = await sendWebhook(paidSession(checkoutSessions[0], { payment_status: "unpaid" }));
    assert.equal(status, 200);
    assert.equal(emails.length, 0);
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────
await new Promise((r) => fake.listen(FAKE_PORT, r));
const site = spawn("npx", ["next", "start", "-p", String(SITE_PORT)], {
  env: {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: "1",
    STRIPE_SECRET_KEY: "sk_test_fake",
    STRIPE_API_BASE: `http://localhost:${FAKE_PORT}`,
    STRIPE_WEBHOOK_SECRET: WEBHOOK_SECRET,
    RESEND_API_KEY: "re_test_fake",
    RESEND_BASE_URL: `http://localhost:${FAKE_PORT}`,
    ADMIN_NOTIFICATION_EMAIL: "orders@test.local",
    FIXNOW_EMAIL: "fixnow@test.local",
  },
  stdio: ["ignore", "ignore", process.env.DEBUG ? "inherit" : "ignore"],
  detached: true,
});

try {
  await waitForSite();
  await run();
} finally {
  try { process.kill(-site.pid); } catch {}
  fake.close();
}

console.log(`\nOrder flow tests\n${results.join("\n")}\n`);
