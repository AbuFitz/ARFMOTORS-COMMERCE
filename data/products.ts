import { Product } from "@/types/product";

// ============================================================
// Product catalogue: DEMO SEED DATA
// ------------------------------------------------------------
// Neutral placeholder products for development. They are deliberately
// unbranded and their specs are illustrative only. Replace them with real
// stock, either by editing this file or with
// `npm run import-products -- file.csv` (see README).
//
//  category         "in-car-tech" | "accessories" | "roadside" | "tools"
//  fittingEligible  can be fitted by FixNow Mechanics
//  fittingFrom      optional "fitting from £X" guide price
//  compatibility    optional list of what the product works with
//  ebayListed       also listed on our eBay store
//  isFeatured       shown in "Featured products"
// ============================================================

// Demo photos are Creative Commons images (see docs/DEMO-PHOTO-CREDITS.md). Replace
// them with your own product photos before launch.
const demo = (slug: string) => [`/images/products/${slug}.jpg`];

type Seed = Omit<Product, "images" | "isActive" | "discountType" | "discountValue" | "inStockUK" | "imported" | "deliveryEstimate" | "fittingEligible" | "updatedAt"> &
  Partial<Pick<Product, "discountType" | "discountValue" | "inStockUK" | "imported" | "deliveryEstimate" | "fittingEligible">>;

// Fills in the defaults shared by most products
const product = (p: Seed): Product => ({
  images: demo(p.slug),
  isActive: true,
  discountType: "none",
  discountValue: 0,
  inStockUK: true,
  imported: false,
  deliveryEstimate: "1-3 business days",
  fittingEligible: false,
  updatedAt: p.createdAt,
  ...p,
});

export const PRODUCTS: Product[] = [
  // ─── In-Car Tech ────────────────────────────────────────────
  product({
    id: "arf-auto-001",
    title: "Front & Rear Dash Cam Kit",
    slug: "front-rear-dash-cam-kit",
    description:
      "Two-channel dash cam that records the road ahead and behind, with a compact windscreen unit and a separate rear camera.",
    longDescription:
      "A two-camera dash cam kit for everyday driving. The front unit mounts behind the rear-view mirror and the rear camera fits to the back window. It can be powered from a 12V socket, or hardwired into the fuse box for parking mode. Hardwiring is included with professional fitting.",
    category: "in-car-tech",
    price: 129.99,
    fittingEligible: true,
    fittingFrom: 60,
    compatibilityNotes: [
      "Fits most cars and vans with a 12V socket",
      "Parking mode needs hardwiring (available with fitting)",
      "Memory card sold separately",
    ],
    discountType: "percentage",
    discountValue: 10,
    isFeatured: true,
    ebayListed: true,
    features: ["Front and rear recording", "Loop recording", "Adhesive windscreen mount", "12V power cable included"],
    specifications: { Cameras: "Front and rear", Power: "12V socket or hardwire", Storage: "microSD (not included)" },
    createdAt: "2026-09-18T09:00:00Z",
  }),
  product({
    id: "arf-auto-002",
    title: "Wireless Reversing Camera Kit",
    slug: "wireless-reversing-camera-kit",
    description: "Rear-view camera with a dash-mounted display to help with reversing and parking.",
    longDescription:
      "A reversing camera kit with a number-plate camera and a separate dashboard display. The camera connects to the reversing light circuit so it switches on when you select reverse. Wiring into the reversing light is included with professional fitting.",
    category: "in-car-tech",
    price: 89.99,
    fittingEligible: true,
    fittingFrom: 70,
    compatibilityNotes: ["Suitable for most cars and small vans", "Connects to the reversing light circuit"],
    isFeatured: true,
    ebayListed: true,
    features: ["Number-plate mounted camera", "Dash-mounted display", "Switches on automatically in reverse"],
    specifications: { Display: "Dash-mounted monitor", Power: "12V" },
    createdAt: "2026-09-12T09:00:00Z",
  }),
  product({
    id: "arf-auto-003",
    title: "Dash Cam Hardwire Kit",
    slug: "dash-cam-hardwire-kit",
    description:
      "Fuse-box power kit for dash cams. Frees up your 12V socket and enables parking mode on supported cameras.",
    category: "in-car-tech",
    price: 19.99,
    fittingEligible: true,
    fittingFrom: 45,
    compatibilityNotes: ["Check your dash cam's power connector before ordering", "We recommend professional fitting"],
    ebayListed: true,
    features: ["Fuse tap connectors included", "Frees up your 12V socket"],
    createdAt: "2026-08-20T09:00:00Z",
  }),
  product({
    id: "arf-auto-004",
    title: "Wireless CarPlay Adapter",
    slug: "wireless-carplay-adapter",
    description:
      "Plug-in adapter that turns wired Apple CarPlay into wireless CarPlay. Plugs into your car's USB port.",
    category: "in-car-tech",
    price: 49.99,
    compatibility: ["Cars with factory wired Apple CarPlay", "iPhone with CarPlay support"],
    compatibilityNotes: ["Does not add CarPlay to cars that don't already have wired CarPlay"],
    isFeatured: true,
    ebayListed: true,
    features: ["Plug and play via USB", "Reconnects automatically when you start the car"],
    createdAt: "2026-09-22T09:00:00Z",
  }),
  product({
    id: "arf-auto-006",
    title: "Bluetooth OBD2 Code Reader",
    slug: "bluetooth-obd2-code-reader",
    description: "Plug-in OBD2 reader that pairs with a phone app to read and clear engine warning codes.",
    category: "in-car-tech",
    price: 24.99,
    compatibility: ["Petrol cars from 2001 and diesel cars from 2004 with an OBD2 port"],
    compatibilityNotes: ["Needs a compatible phone app (not included)"],
    ebayListed: true,
    features: ["Bluetooth connection", "Reads and clears fault codes", "Live data in compatible apps"],
    createdAt: "2026-06-14T09:00:00Z",
  }),

  // ─── Car Accessories ────────────────────────────────────────
  product({
    id: "arf-auto-007",
    title: "Magnetic Phone Mount",
    slug: "magnetic-phone-mount",
    description: "Vent-clip phone mount with a magnetic holder and adhesive plates for most phones.",
    category: "accessories",
    price: 14.99,
    ebayListed: true,
    features: ["Clips to most air vents", "Includes metal plates for your phone or case"],
    createdAt: "2026-05-02T09:00:00Z",
  }),
  product({
    id: "arf-acc-001",
    title: "Dual USB-C Car Charger",
    slug: "dual-usb-c-car-charger",
    description: "Compact 12V socket charger with two USB-C ports for charging phones and tablets on the move.",
    category: "accessories",
    price: 17.99,
    isFeatured: true,
    ebayListed: true,
    features: ["Two USB-C ports", "Fits standard 12V sockets", "Low-profile design"],
    specifications: { Ports: "2 x USB-C", Input: "12V / 24V" },
    createdAt: "2026-09-20T09:00:00Z",
  }),
  product({
    id: "arf-elec-003",
    title: "Braided USB-C Cable 2m (2 Pack)",
    slug: "braided-usb-c-cable-2m-2-pack",
    description: "Two 2-metre braided USB-C to USB-C cables, long enough to reach the back seats.",
    category: "accessories",
    price: 12.99,
    ebayListed: true,
    features: ["Braided outer", "2 metres long", "Pack of 2"],
    createdAt: "2026-08-11T09:00:00Z",
  }),
  product({
    id: "arf-acc-002",
    title: "Bluetooth AUX Car Adapter",
    slug: "bluetooth-aux-car-adapter",
    description: "Adds Bluetooth music streaming and hands-free calls to car stereos with a 3.5mm AUX input.",
    category: "accessories",
    price: 16.99,
    compatibility: ["Car stereos with a 3.5mm AUX input"],
    features: ["3.5mm AUX output", "USB powered", "Built-in microphone for hands-free calls"],
    createdAt: "2026-07-08T09:00:00Z",
  }),
  product({
    id: "arf-acc-003",
    title: "Collapsible Boot Organiser",
    slug: "collapsible-boot-organiser",
    description: "Folding boot organiser with three compartments to stop shopping and kit sliding around.",
    category: "accessories",
    price: 19.99,
    ebayListed: true,
    features: ["Three compartments", "Folds flat when not in use", "Carry handles"],
    createdAt: "2026-09-24T09:00:00Z",
  }),

  // ─── Roadside & Emergency ───────────────────────────────────
  product({
    id: "arf-auto-005",
    title: "Portable Jump Starter & Power Bank",
    slug: "portable-jump-starter-power-bank",
    description: "Compact jump starter for 12V vehicles that doubles as a USB power bank, with a built-in torch.",
    category: "roadside",
    price: 69.99,
    compatibilityNotes: ["For 12V vehicles. Check the engine size guidance on the packaging"],
    discountType: "fixed",
    discountValue: 10,
    isFeatured: true,
    ebayListed: true,
    features: ["Jump leads with clamps included", "USB charging output", "Built-in LED torch"],
    createdAt: "2026-07-30T09:00:00Z",
  }),
  product({
    id: "arf-tool-001",
    title: "Cordless Digital Tyre Inflator",
    slug: "cordless-digital-tyre-inflator",
    description: "Rechargeable tyre inflator with a digital gauge that stops automatically at your set pressure.",
    category: "roadside",
    price: 44.99,
    isFeatured: true,
    ebayListed: true,
    features: ["Set a pressure and it stops automatically", "USB-C rechargeable", "Adapters for bikes and balls"],
    createdAt: "2026-09-15T09:00:00Z",
  }),
  product({
    id: "arf-road-001",
    title: "Roadside Emergency Kit",
    slug: "roadside-emergency-kit",
    description: "Breakdown essentials in one bag: warning triangle, hi-vis vest, tow rope and booster cables.",
    category: "roadside",
    price: 34.99,
    ebayListed: true,
    features: ["Warning triangle", "Hi-vis vest", "Tow rope", "Booster cables", "Storage bag"],
    createdAt: "2026-08-28T09:00:00Z",
  }),
  product({
    id: "arf-road-002",
    title: "Digital Tyre Pressure Gauge",
    slug: "digital-tyre-pressure-gauge",
    description: "Pocket-sized digital gauge that reads tyre pressure in PSI, BAR or kPa.",
    category: "roadside",
    price: 9.99,
    features: ["Backlit display", "PSI, BAR and kPa", "Batteries included"],
    createdAt: "2026-06-02T09:00:00Z",
  }),

  // ─── Tools & Garage ─────────────────────────────────────────
  product({
    id: "arf-tool-002",
    title: "Rechargeable LED Work Light",
    slug: "rechargeable-led-work-light",
    description: "Folding LED work light with a magnetic base and hanging hook, ideal for under the bonnet.",
    category: "tools",
    price: 22.99,
    ebayListed: true,
    features: ["Magnetic base", "Hanging hook", "USB rechargeable"],
    createdAt: "2026-08-02T09:00:00Z",
  }),
  product({
    id: "arf-tool-003",
    title: "Digital Multimeter",
    slug: "digital-multimeter",
    description: "Handheld multimeter for checking car batteries, fuses and wiring.",
    category: "tools",
    price: 19.99,
    ebayListed: true,
    features: ["Voltage, current and resistance", "Continuity buzzer", "Test leads included"],
    createdAt: "2026-06-25T09:00:00Z",
  }),
  product({
    id: "arf-tool-004",
    title: "Compact Car Tool Kit",
    slug: "compact-car-tool-kit",
    description: "Everyday tool kit in a carry case with sockets, screwdriver bits, pliers and a tyre gauge.",
    category: "tools",
    price: 34.99,
    inStockUK: false,
    imported: true,
    deliveryEstimate: "7-10 business days",
    shippingDays: 10,
    features: ["Carry case", "Sockets and screwdriver bits", "Pliers and tyre gauge"],
    createdAt: "2026-05-20T09:00:00Z",
  }),
];
